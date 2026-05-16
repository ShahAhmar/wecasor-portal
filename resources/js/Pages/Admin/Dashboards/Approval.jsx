import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Approval({ auth, stats, myStudies }) {
    const isAssigned = stats?.my_protocols > 0;

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

    return (
        <AdminLayout user={auth?.user} title="PI Approvals">
            <Head title="PI Approvals" />
            <div className="space-y-8">
                
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            <span className="text-[#002d5b]">Principal Investigator</span> <span>Approvals</span>
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-[0.2em]">Electronic signatures, forms review, and study lock controls</p>
                    </div>
                </div>

                {!isAssigned ? (
                    <div className="bg-white rounded-[3rem] p-16 text-center border border-amber-100 shadow-2xl shadow-amber-900/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                        <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-amber-100 transform -rotate-3">
                            <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-4">No Active Protocols</h3>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                            Your account has not been designated as the Lead PI for any active studies. Submission forms and sign-off queues will appear here once you are systematically linked to a protocol.
                        </p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 inline-block px-5 py-3 rounded-full border border-slate-100">Please contact the System Administrator to link your portfolio.</p>
                    </div>
                ) : (
                    <>
                        {/* Statistics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {renderStatCard(
                                "My Protocols", 
                                stats?.my_protocols || 0,
                                "Active studies led by you",
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>,
                                "bg-indigo-50 text-indigo-600",
                                "border-indigo-100/50"
                            )}
                            {renderStatCard(
                                "Pending Sign-Offs", 
                                stats?.pending_signatures || 0,
                                "eCRFs awaiting your signature",
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>,
                                "bg-emerald-50 text-emerald-600",
                                "border-emerald-100/50"
                            )}
                            {renderStatCard(
                                "Open Queries", 
                                stats?.data_queries || 0,
                                "Discrepancy matrices flagged",
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
                                "bg-rose-50 text-rose-600",
                                "border-rose-100/50"
                            )}
                        </div>

                        {/* Recent Protocols List */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/20 border border-slate-100 overflow-hidden mt-8">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Managed Protocols Datatable</h3>
                            </div>
                            {myStudies && myStudies.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-separate border-spacing-0">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Study Designation</th>
                                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Status</th>
                                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Subject Vol.</th>
                                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Temporal Span</th>
                                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {myStudies.map(study => (
                                                <tr key={study.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-800">{study.title}</p>
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{study.study_code}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${study.status?.toLowerCase() === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{study.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className="text-[11px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100/50">
                                                            {study.subjects_count} ENROLLED
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                                                            {study.start_date ? new Date(study.start_date).toLocaleDateString() : 'TBD'} - {study.end_date ? new Date(study.end_date).toLocaleDateString() : 'TBD'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <Link href={`/admin/studies/${study.id}/workspace`} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors shadow-sm">
                                                            Manage
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : null}
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
