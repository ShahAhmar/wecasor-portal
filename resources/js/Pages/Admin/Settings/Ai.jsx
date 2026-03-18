import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Ai({ settings, flash }) {
    const { data, setData, post, processing, errors } = useForm({
        groq_api_key: settings.groq_api_key || '',
        groq_model: settings.groq_model || 'llama-3.3-70b-versatile',
        ai_system_knowledge: settings.ai_system_knowledge || '',
        ai_welcome_message: settings.ai_welcome_message || 'Welcome to WeCASOR Portal!',
        group: 'ai'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout title="AI Configuration">
            <Head title="WeCASOR AI Settings" />

            <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
                <div className="flex items-center gap-6 border-b border-slate-200 pb-10">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-[#002d5b] to-emerald-600 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">AI Control Center</h2>
                        <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-[0.2em]">Configure Groq Cloud logic and system awareness</p>
                    </div>
                </div>

                {flash.success && (
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center gap-4 text-emerald-700">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <p className="font-black text-xs uppercase tracking-widest">{flash.success}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* API Connection */}
                    <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                        </div>
                        
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                            <span className="w-8 h-px bg-slate-100"></span>
                            Neural Connection (Groq Cloud)
                        </h3>
                        
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Groq Cloud API Key</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter Groq API Key..."
                                    value={data.groq_api_key} 
                                    onChange={e => setData('groq_api_key', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-600 transition-all font-mono"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Model Selection</label>
                                <select 
                                    value={data.groq_model} 
                                    onChange={e => setData('groq_model', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-600 transition-all appearance-none"
                                >
                                    <option value="llama-3.3-70b-versatile">Llama 3.3 70B (Versatile)</option>
                                    <option value="llama-3.1-8b-instant">Llama 3.1 8B (Instant)</option>
                                    <option value="mixtral-8x7b-32768">Mixtral 8x7B (Power)</option>
                                    <option value="gemma2-9b-it">Gemma 2 9B (Efficient)</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* System Knowledge */}
                    <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                            <span className="w-8 h-px bg-slate-100"></span>
                            Knowledge Architecture
                        </h3>
                        
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Welcome Salutation</label>
                                <input 
                                    type="text" 
                                    value={data.ai_welcome_message} 
                                    onChange={e => setData('ai_welcome_message', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-600 transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Deep System Knowledge (System Prompt)</label>
                                <textarea 
                                    rows="10"
                                    placeholder="Define how the AI should behave and what it knows about the WeCASOR portal..."
                                    value={data.ai_system_knowledge} 
                                    onChange={e => setData('ai_system_knowledge', e.target.value)}
                                    className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-3xl text-[12px] font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-600 transition-all resize-none leading-relaxed"
                                />
                                <p className="text-[10px] text-slate-400 font-medium px-2 italic mt-2 opacity-70">This knowledge is injected into every AI session to provide context-aware assistance.</p>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-between items-center pt-8">
                        <Link href={route('admin.settings')} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors flex items-center gap-2 group">
                            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                            Back to Settings
                        </Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="px-12 py-5 bg-emerald-600 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                        >
                            {processing ? 'Synchronizing Neural Link...' : 'Update WeCASOR AI'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
