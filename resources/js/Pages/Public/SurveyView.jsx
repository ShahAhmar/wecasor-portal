import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function SurveyView({ survey, flash, error }) {
    const successMsg = flash?.success;
    
    // Initialize form data dynamically based on the survey config
    const formFields = typeof survey.config_json === 'string' ? JSON.parse(survey.config_json) : (survey.config_json || []);
    const initialData = {};
    formFields.forEach(field => {
        initialData[field.name] = '';
    });

    const { data, setData, post, processing } = useForm(initialData);

    const submit = (e) => {
        e.preventDefault();
        post(route('surveys.public.submit', survey.slug), {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col items-center py-12 px-6">
            <Head title={survey.title} />

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="h-2 bg-[#002d5b] w-full"></div>
                <div className="p-10">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-[#002d5b] tracking-tight">{survey.title}</h1>
                        {survey.description && (
                            <p className="text-slate-500 mt-4 leading-relaxed">{survey.description}</p>
                        )}
                    </div>

                    {successMsg ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full mx-auto flex items-center justify-center mb-6 shadow-sm">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Response Recorded!</h2>
                            <p className="text-slate-500 mt-3">{successMsg}</p>
                            <button onClick={() => window.location.reload()} className="mt-8 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-bold transition-colors">Submit Another Response</button>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="space-y-8">
                            {error && (
                                <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 font-bold mb-6 text-sm">
                                    {error}
                                </div>
                            )}

                            {formFields.map((field, idx) => (
                                <div key={idx} className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            value={data[field.name] || ''}
                                            onChange={e => setData(field.name, e.target.value)}
                                            required={field.required}
                                            rows="4"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-[#002d5b]"
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            value={data[field.name] || ''}
                                            onChange={e => setData(field.name, e.target.value)}
                                            required={field.required}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-[#002d5b]"
                                        >
                                            <option value="">Select an option...</option>
                                            {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            value={data[field.name] || ''}
                                            onChange={e => setData(field.name, e.target.value)}
                                            required={field.required}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-[#002d5b]"
                                        />
                                    )}
                                </div>
                            ))}

                            <div className="pt-6 text-center">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full md:w-auto bg-[#002d5b] hover:bg-blue-900 text-white px-12 py-4 rounded-full font-bold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none"
                                >
                                    {processing ? 'Submitting...' : 'Submit Response'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            
            {!successMsg && (
                <div className="mt-12 text-center text-xs text-slate-400 max-w-sm">
                    <p>Secured by WeCASOR Surveys Hub.</p>
                    <p className="mt-1">This is an outreach portal and responses are processed separately from clinical study operations.</p>
                </div>
            )}
        </div>
    );
}
