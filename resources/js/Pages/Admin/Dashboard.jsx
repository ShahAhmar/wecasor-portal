import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, allStudies, recentActivity }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="space-y-16">
                {/* Premium Greeting Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-12">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-2">
                            Good morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002d5b] to-emerald-600">System Administrator</span>
                        </h2>
                        <p className="text-slate-500 font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Portal Status: <span className="text-slate-700 font-bold">Operational</span> • {new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link 
                            href="/admin/studies/create"
                            className="px-6 py-3 bg-[#002d5b] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#002d5b]/20 hover:bg-[#00346a] transition-all flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Launch New Study
                        </Link>
                    </div>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: 'Total Participating Sites', value: stats.total_institutions, icon: 'blue', growth: '+3 Growth' },
                        { label: 'Active Research Projects', value: stats.total_studies, icon: 'emerald', status: 'LIVE NOW' },
                        { label: 'Secured Documents', value: stats.total_documents, icon: 'amber', growth: '+12 New' },
                        { label: 'Compliance Actions', value: stats.pending_applications, icon: 'red' },
                    ].map((card, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <div className={`p-4 rounded-2xl transition-all duration-300 ${
                                    card.icon === 'blue' ? 'bg-blue-50 text-[#002d5b] group-hover:bg-[#002d5b] group-hover:text-white' :
                                    card.icon === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' :
                                    card.icon === 'amber' ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white' :
                                    'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                                }`}>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                </div>
                                {card.growth && (
                                    <div className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                                        <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                        {card.growth}
                                    </div>
                                )}
                                {card.status && (
                                    <div className="text-[10px] font-black text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-lg tracking-widest">{card.status}</div>
                                )}
                            </div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{card.label}</p>
                            <h3 className="text-4xl font-black text-slate-900 leading-none">{card.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 mt-16 pt-8 border-t border-slate-100">
                    {/* Portfolio Table */}
                    <div className="xl:col-span-8 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden flex flex-col">
                        <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                            <div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Research Portfolio</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1">Overview of active projects and clinical trials</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Research Project</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Last Update</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {allStudies.map((study) => (
                                        <tr key={study.id} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-xs group-hover:bg-[#002d5b] group-hover:text-white transition-all shrink-0 uppercase">
                                                        {study.title.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-700 leading-tight group-hover:text-[#002d5b] transition-colors">{study.title}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{study.study_code}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                                                    study.status.toLowerCase() === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                                }`}>
                                                    {study.status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <p className="text-sm font-bold text-slate-800">20 hours ago</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="xl:col-span-4 bg-[#002d5b] rounded-[2.5rem] shadow-xl text-white overflow-hidden flex flex-col relative">
                        <div className="p-8 border-b border-white/5 relative z-10 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">Live Activity</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Audit Stream</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        </div>
                        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
                            {recentActivity.map((activity, idx) => (
                                <div key={idx} className="flex gap-5 group items-start relative before:absolute before:left-[15px] before:top-10 before:bottom-[-35px] before:w-0.5 before:bg-white/5 last:before:hidden">
                                     <div className="shrink-0 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center z-10 p-2 transition-transform group-hover:scale-110">
                                         <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                     </div>
                                     <div>
                                         <p className="text-sm font-bold text-slate-100 leading-snug group-hover:text-emerald-400 transition-colors">{activity.user?.name || 'System'}</p>
                                         <p className="text-xs text-slate-400 font-medium mt-1">{activity.action}</p>
                                     </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
