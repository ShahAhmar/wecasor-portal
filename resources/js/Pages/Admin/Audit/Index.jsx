import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ logs, filters }) {
    const [action, setAction] = useState(filters.action || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/audit', { action }, { preserveState: true });
    };

    const handleDownload = () => {
        window.location.href = '/admin/audit/export';
    };

    return (
        <AdminLayout title="Governance Audit">
            <Head title="Audit Logs" />

            <div className="space-y-12">
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Archival Ledger</h2>
                        <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-[0.2em] px-1">Institutional Oversight & System Event Log</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-stretch gap-4">
                        <form onSubmit={handleSearch} className="relative group min-w-[300px]">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#002d5b] transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search Protocols..." 
                                value={action}
                                onChange={(e) => setAction(e.target.value)}
                                className="w-full pl-14 pr-8 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] shadow-xl shadow-slate-200/20 transition-all"
                            />
                        </form>
                        
                        <button 
                            onClick={handleDownload}
                            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4-4v12"></path></svg>
                            Export Records
                        </button>
                    </div>
                </div>

                {/* Audit Table */}
                <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/40 border border-slate-200/60 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Identity</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Protocol Action</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Source IP</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Temporal Stamp</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right italic">Metadata</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/60">
                                {logs.data.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50/80 transition-all group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:scale-110 transition-transform">
                                                    {(log.user?.name || 'SYS').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 tracking-tight text-sm uppercase">{log.user?.name || 'System Sovereign'}</p>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{log.user?.email || 'AUTOMATED_TASK'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-4 py-1.5 bg-blue-50 text-[#002d5b] rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border border-blue-100/50">
                                                {log.action.replace(/_/g, ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 font-mono text-slate-400 text-[10px] font-bold tracking-widest">
                                            {log.ip_address}
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="font-bold text-slate-600 text-[11px] uppercase">{new Date(log.created_at).toLocaleDateString()}</p>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{new Date(log.created_at).toLocaleTimeString()}</p>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <button className="text-[10px] font-black text-[#002d5b] hover:text-blue-600 uppercase tracking-widest bg-blue-50/30 px-4 py-2 rounded-xl border border-blue-50 italic transition-all active:scale-95">Inspect Digest</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Block */}
                    <div className="p-12 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Displaying {logs.from}-{logs.to} of {logs.total} archival entries</p>
                         <div className="flex items-center gap-2">
                            {logs.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    disabled={!link.url}
                                    onClick={() => router.get(link.url, { action }, { preserveState: true })}
                                    className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        link.active 
                                        ? 'bg-[#002d5b] text-white shadow-xl shadow-[#002d5b]/20' 
                                        : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300'
                                    } ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
