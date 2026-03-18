import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ settings, flash }) {
    const { data, setData, post, processing, errors } = useForm({
        ...Object.values(settings).flat().reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}),
        group: 'general'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout title="System Configuration">
            <Head title="System Settings" />

            <div className="max-w-5xl mx-auto py-12 px-6 space-y-12">
                <div className="flex justify-between items-end border-b border-slate-200 pb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Mainframe Settings</h2>
                        <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-[0.2em]">Global portal parameters and institutional logic</p>
                    </div>
                    <div className="flex gap-4">
                         <a href={route('admin.settings.ai')} className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            AI Configuration
                        </a>
                    </div>
                </div>

                {flash.success && (
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center gap-4 text-emerald-700 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <p className="font-black text-xs uppercase tracking-widest">{flash.success}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-12">
                    {Object.entries(settings).map(([group, groupSettings]) => (
                        <section key={group} className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/20">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                                <span className="w-8 h-px bg-slate-100"></span>
                                {group} Parameters
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {groupSettings.map((setting) => (
                                    <div key={setting.id} className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">{setting.key.replace(/_/g, ' ')}</label>
                                        <input 
                                            type="text" 
                                            value={data[setting.key] || ''} 
                                            onChange={e => setData(setting.key, e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    <div className="flex justify-end pt-8">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="px-12 py-5 bg-[#002d5b] text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-[#002d5b]/30 hover:bg-[#00346a] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                        >
                            {processing ? 'Synchronizing...' : 'Commit Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
