import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Monitoring({ auth, stats, recentAudits }) {
    const renderStatCard = (title, value, subtitle, icon, colorClass, borderClass) => (
        <div className={`bg-white rounded-3xl p-8 border ${borderClass} shadow-xl shadow-slate-200/20 hover:-translate-y-1 transition-all group`}>
            <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="text-4xl font-black text-slate-800 tracking-tight mb-2">{value}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{title}</p>
            {subtitle && <p className="text-xs text-slate-400 mt-2 font-medium">{subtitle}</p>}
        </div>
    );

    const getActionTheme = (action) => {
        const actionMap = {
            login: { color: 'text-indigo-600 bg-indigo-50 border-indigo-100', text: 'Auth Session' },
            logout: { color: 'text-slate-500 bg-slate-50 border-slate-100', text: 'Auth End' },
            create: { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', text: 'Instantiated' },
            update: { color: 'text-amber-600 bg-amber-50 border-amber-100', text: 'Mutated' },
            delete: { color: 'text-rose-600 bg-rose-50 border-rose-100', text: 'Purged' },
            export: { color: 'text-blue-600 bg-blue-50 border-blue-100', text: 'Extracted' },
            document_download: { color: 'text-cyan-600 bg-cyan-50 border-cyan-100', text: 'Doc Pulled' }
        };
        return actionMap[action] || { color: 'text-slate-600 bg-slate-50 border-slate-100', text: action?.toUpperCase() };
    };

    return (
        <AdminLayout user={auth?.user} title="Monitoring Oversight">
            <Head title="Clinical Monitoring" />
            <div className="space-y-8">
                
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            <span className="text-[#002d5b]">Clinical</span> <span>Monitoring</span>
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-[0.2em]">Source data verification and audit oversight</p>
                    </div>
                    <Link href="/admin/audit" className="px-6 py-4 bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        Full Matrix Ledger
                    </Link>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {renderStatCard(
                        "Audit Actions", 
                        stats?.audit_events || 0,
                        "System operations logged",
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>,
                        "bg-indigo-50 text-indigo-600",
                        "border-indigo-100/50"
                    )}
                    {renderStatCard(
                        "Compliance Index", 
                        stats?.active_studies || 0,
                        "Protocols under supervision",
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>,
                        "bg-emerald-50 text-emerald-600",
                        "border-emerald-100/50"
                    )}
                    {renderStatCard(
                        "Pending Queries", 
                        stats?.open_queries || 0,
                        "Discrepancies flagged for sites",
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>,
                        "bg-rose-50 text-rose-600",
                        "border-rose-100/50"
                    )}
                </div>

                {/* Audit Ledger List */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/20 border border-slate-100 overflow-hidden mt-8">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Real-time Data Verification Stream</h3>
                    </div>
                    {recentAudits && recentAudits.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Audit Timestamp</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">User Identity</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Target Segment</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Operation Vector</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentAudits.map(log => {
                                        const theme = getActionTheme(log.action);
                                        return (
                                            <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-slate-800">{new Date(log.created_at).toLocaleDateString()}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{new Date(log.created_at).toLocaleTimeString()}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-xs font-black text-slate-700">{log.user?.name || 'System Auto'}</p>
                                                    <code className="text-[9px] text-slate-400 tracking-wider bg-slate-50 px-2 py-0.5 rounded">{log.ip_address}</code>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-[10px] font-black uppercase text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50">{log.target_type ? log.target_type.split('\\').pop() : 'Application'}</span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <span className={`text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-xl border ${theme.color}`}>
                                                        {theme.text}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-16 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <h3 className="text-lg font-black text-slate-800">No Audits Found</h3>
                            <p className="text-slate-500 mt-2 text-sm">The electronic data capture network has not registered any events.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
