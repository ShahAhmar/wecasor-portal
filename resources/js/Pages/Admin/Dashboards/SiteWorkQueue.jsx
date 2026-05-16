import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function SiteWorkQueue({ auth, site, stats, recentSubjects }) {
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
        <AdminLayout user={auth?.user} title="Site Work Queue">
            <Head title="Site Work Queue" />
            <div className="space-y-8">
                
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            <span className="text-[#002d5b]">Site Operations</span> <span>Queue</span>
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-[0.2em]">Direct access to your assigned clinical site tasks</p>
                    </div>
                </div>

                {!site ? (
                    <div className="bg-white rounded-[3rem] p-16 text-center border border-rose-100 shadow-2xl shadow-rose-900/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-rose-600"></div>
                        <div className="w-24 h-24 bg-rose-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-rose-100 transform rotate-3">
                            <svg className="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-4">Unassigned Profile</h3>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                            Your account is not currently linked to any participating Institution/Clinic. You cannot process subjects or respond to queries without an active site binder.
                        </p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 inline-block px-5 py-3 rounded-full border border-slate-100">Please contact your Country Lead to establish linkage.</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm flex items-center gap-6 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-slate-800 leading-tight">Operating Identity Established</h2>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Binded to: <span className="text-emerald-600 font-black">{site.name}</span></p>
                            </div>
                        </div>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {renderStatCard(
                                "Enrolled Subjects", 
                                stats?.enrolled_subjects || 0,
                                "Consented local participants",
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>,
                                "bg-emerald-50 text-emerald-600",
                                "border-emerald-100/50"
                            )}
                            {renderStatCard(
                                "Active Protocols", 
                                stats?.active_studies || 0,
                                "Studies open for deployment",
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>,
                                "bg-purple-50 text-purple-600",
                                "border-purple-100/50"
                            )}
                            {renderStatCard(
                                "Open Queries", 
                                stats?.open_queries || 0,
                                "Pending monitor resolutions",
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
                                "bg-rose-50 text-rose-600",
                                "border-rose-100/50"
                            )}
                        </div>

                        {/* Recent Subjects List */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/20 border border-slate-100 overflow-hidden mt-8">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Recent Subject Log</h3>
                            </div>
                            {recentSubjects && recentSubjects.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-separate border-spacing-0">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Subject Identity</th>
                                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Study</th>
                                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Status</th>
                                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Enrollment Filter</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {recentSubjects.map(subject => (
                                                <tr key={subject.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-800">#{subject.subject_code}</p>
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Screened: {subject.screening_date}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className="text-[11px] font-black uppercase text-[#002d5b] bg-blue-50 px-3 py-1 rounded-lg border border-blue-100/50">{subject.study?.study_code || 'N/A'}</span>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${subject.status?.toLowerCase() === 'enrolled' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{subject.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-right font-medium text-xs text-slate-400">
                                                        {subject.enrollment_date || '--'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-16 text-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                                        <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </div>
                                    <h3 className="text-lg font-black text-slate-800">No Subjects Managed</h3>
                                    <p className="text-slate-500 mt-2 text-sm">You have not registered or screened any participants at this facility yet.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
