import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ study, investigators }) {
    const { data, setData, put, processing, errors } = useForm({
        title: study.title || '',
        study_code: study.study_code || '',
        description: study.description || '',
        status: study.status || 'planning',
        start_date: study.start_date || '',
        end_date: study.end_date || '',
        pi_name: study.pi_name || '',
        target_enrollment: study.target_enrollment || 100,
        expected_follow_up: study.expected_follow_up || 90,
        lock_status: study.lock_status || 'open',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/studies/${study.id}`);
    };

    return (
        <AdminLayout title={`Refining ${study.study_code}`}>
            <Head title="Edit Study" />

            <div className="max-w-4xl mx-auto py-12">
                <form onSubmit={submit} className="space-y-12">
                    {/* Form Section: Core Information */}
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                        <h3 className="text-xl font-black text-slate-800 mb-10 tracking-tight">Project Governance</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Study Title</label>
                                <input 
                                    type="text" 
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                />
                                {errors.title && <p className="text-rose-500 text-[10px] font-bold uppercase mt-1">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Internal Study Code</label>
                                <input 
                                    type="text" 
                                    value={data.study_code}
                                    onChange={e => setData('study_code', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                />
                                {errors.study_code && <p className="text-rose-500 text-[10px] font-bold uppercase mt-1">{errors.study_code}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Status</label>
                                <select 
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all appearance-none"
                                >
                                    <option value="planning">Phase: Planning</option>
                                    <option value="active">Phase: Active / Recruiting</option>
                                    <option value="closed">Phase: Closed / Analysis</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 space-y-2 pt-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Scientific Description</label>
                                <textarea 
                                    rows="4"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                     {/* Form Section: Metrics & People */}
                     <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                        <h3 className="text-xl font-black text-slate-800 mb-10 tracking-tight">Metrics & Target Parameters</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lead PI Name</label>
                                <select 
                                    value={data.pi_name}
                                    onChange={e => setData('pi_name', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                >
                                    <option value="">-- Select Investigator --</option>
                                    {investigators && investigators.map(inv => (
                                        <option key={inv.id} value={inv.name}>{inv.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Enrollment</label>
                                <input 
                                    type="number" 
                                    value={data.target_enrollment}
                                    onChange={e => setData('target_enrollment', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Section: Lock & Governance */}
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                        <div className="flex items-center gap-4 mb-10">
                            <h3 className="text-xl font-black text-rose-800 tracking-tight">Data Lock Controls</h3>
                            <span className="px-3 py-1 bg-rose-50 text-rose-500 font-bold text-[10px] uppercase tracking-widest rounded-full">Audited Action</span>
                        </div>
                        
                        <div className="space-y-4 max-w-sm">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Study Data Lock Status</label>
                            <select 
                                value={data.lock_status}
                                onChange={e => setData('lock_status', e.target.value)}
                                className={`w-full px-6 py-4 border rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 transition-all cursor-pointer ${
                                    data.lock_status === 'open' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 focus:ring-emerald-100' :
                                    data.lock_status === 'soft_lock' ? 'bg-amber-50 text-amber-800 border-amber-200 focus:ring-amber-100' :
                                    'bg-rose-50 text-rose-800 border-rose-200 focus:ring-rose-100'
                                }`}
                            >
                                <option value="open">Open (Data capture active)</option>
                                <option value="soft_lock">Soft Lock (Queries only, no new data)</option>
                                <option value="hard_lock">Hard Lock (Frozen, analytic state)</option>
                            </select>
                            <p className="text-[10px] text-slate-400 font-bold leading-relaxed px-2">Changing the lock status will enforce restrictions platform-wide. Unlocking will leave a critical alert in the audit trail.</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-6 pt-4">
                        <Link href="/admin/studies" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Abort Changes</Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="px-10 py-5 bg-[#002d5b] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#002d5b]/30 hover:bg-[#003d7b] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                        >
                            Commit Modifications
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
