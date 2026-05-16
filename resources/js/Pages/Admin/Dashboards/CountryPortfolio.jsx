import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function CountryPortfolio({ auth, stats, recentSites }) {
    const country = auth?.user?.country || 'Territory';

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
        <AdminLayout user={auth?.user} title="Country Portfolio">
            <Head title="Country Portfolio Dashboard" />
            
            <div className="space-y-8">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        <span className="text-[#002d5b]">{country}</span> <span>Portfolio</span>
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-[0.2em]">National oversight and localized metrics view</p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {renderStatCard(
                        "Active Sites", 
                        stats?.active_sites || 0,
                        "Registered research institutions",
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>,
                        "bg-blue-50 text-[#002d5b]",
                        "border-blue-100/50"
                    )}
                    {renderStatCard(
                        "Linked Studies", 
                        stats?.active_studies || 0,
                        "Protocols bound to sites",
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>,
                        "bg-purple-50 text-purple-600",
                        "border-purple-100/50"
                    )}
                    {renderStatCard(
                        "Enrolled Subjects", 
                        stats?.enrolled_subjects || 0,
                        "Total consented participants",
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>,
                        "bg-emerald-50 text-emerald-600",
                        "border-emerald-100/50"
                    )}
                </div>

                {/* Sites List */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/20 border border-slate-100 overflow-hidden mt-8">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Regional Institutions</h3>
                        <Link href="/admin/institutions" className="text-xs font-black text-[#002d5b] hover:underline uppercase tracking-widest">View Directory →</Link>
                    </div>
                    {recentSites && recentSites.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Site Identity</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Status</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentSites.map(site => (
                                        <tr key={site.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black group-hover:bg-[#002d5b] group-hover:text-white transition-colors">
                                                        {site.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800">{site.name}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{site.city || site.facility}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${site.status?.toLowerCase() === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{site.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/institutions/${site.id}/workspace`} className="text-[10px] font-black text-[#002d5b] tracking-widest uppercase bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                                                    Workspace
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-16 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            <h3 className="text-lg font-black text-slate-800">No Sites Found</h3>
                            <p className="text-slate-500 mt-2 text-sm">There are no institutions registered in {country} yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
