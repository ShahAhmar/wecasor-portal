import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Builder({ auth, survey }) {
    const isEdit = !!survey;

    const { data, setData, post, put, processing, errors, transform } = useForm({
        title: survey?.title || '',
        description: survey?.description || '',
        status: survey?.status || 'draft',
        google_webhook_url: survey?.google_webhook_url || '',
        config_json: survey?.config_json ? JSON.stringify(survey.config_json, null, 2) : '[\n  {\n    "type": "text",\n    "name": "full_name",\n    "label": "Full Name",\n    "required": true\n  }\n]'
    });

    const submit = (e) => {
        e.preventDefault();
        
        try {
            JSON.parse(data.config_json); // Validate JSON
        } catch(err) {
            alert("Invalid JSON in Form Configuration. Please fix it before deploying.");
            return;
        }

        // Transform intercepts the payload right before sending to Laravel
        transform((data) => ({
            ...data,
            config_json: JSON.parse(data.config_json),
        }));

        if (isEdit) {
            put(route('surveys.update', survey.id));
        } else {
            post(route('surveys.store'));
        }
    };

    return (
        <AdminLayout user={auth?.user}>
            <Head title={isEdit ? "Edit Campaign" : "New Campaign"} />
            <div className="min-h-screen bg-slate-50 p-8 font-sans">
                <div className="mb-8">
                    <Link href={route('surveys.index')} className="text-blue-600 font-medium hover:underline text-sm mb-4 inline-block">&larr; Back to Hub</Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{isEdit ? "Edit Public Campaign" : "Build Public Campaign"}</h1>
                    <p className="text-slate-500 mt-2">Deploy disconnected surveys for public feedback and outreach.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 max-w-4xl">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Campaign Title</label>
                                <input 
                                    type="text" 
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="e.g. Caregiver Experience 2026"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-100 focus:border-[#002d5b]" 
                                    required 
                                />
                                {errors.title && <p className="text-red-500 text-xs px-1">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Status</label>
                                <select 
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-100 focus:border-[#002d5b]"
                                >
                                    <option value="draft">Draft (Hidden)</option>
                                    <option value="active">Active (Live)</option>
                                    <option value="closed">Closed (No new responses)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Description (Public Facing)</label>
                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="3"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#002d5b]" 
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-emerald-500 uppercase tracking-widest px-1 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                                Google Sheets Webhook URL (Optional)
                            </label>
                            <input 
                                type="url" 
                                value={data.google_webhook_url}
                                onChange={e => setData('google_webhook_url', e.target.value)}
                                placeholder="https://script.google.com/macros/s/.../exec"
                                className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm font-medium text-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500" 
                            />
                            <p className="text-xs text-slate-500 px-1">Paste a Google App Script Webhook URL to pipe responses directly into a spreadsheet.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Form Configuration (JSON Structure)</label>
                            <textarea 
                                value={data.config_json}
                                onChange={e => setData('config_json', e.target.value)}
                                rows="8"
                                className="w-full font-mono text-sm leading-relaxed p-4 bg-slate-900 border-none rounded-xl text-green-400 focus:ring-4 focus:ring-blue-500/20" 
                            ></textarea>
                            <p className="text-xs text-slate-400 px-1">Define your public form fields here. Array of objects: type, name, label, required.</p>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                            <Link href={route('surveys.index')} className="px-6 py-3 rounded-full font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</Link>
                            <button type="submit" disabled={processing} className="px-8 py-3 rounded-full font-bold text-white bg-[#002d5b] hover:bg-blue-900 shadow-md shadow-blue-200 transition-colors disabled:opacity-70">
                                {isEdit ? 'Update Campaign' : 'Deploy Campaign'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
