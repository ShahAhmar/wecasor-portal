import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ institution }) {
    const [activeTab, setActiveTab] = useState('studies');

    const handleDelete = () => {
        if (confirm('Are you sure you want to remove this institution?')) {
            router.delete(`/admin/institutions/${institution.id}`);
        }
    };

    return (
        <AdminLayout title="Institution Profile">
            <Head title={`${institution.name} - Profile`} />

            <div className="space-y-12">
                {/* Breadcrumbs */}
                <nav className="flex text-[10px] font-black text-slate-400 gap-3 items-center uppercase tracking-[0.2em]">
                    <Link href="/admin/dashboard" className="hover:text-[#002d5b] transition-colors">Dashboard</Link>
                    <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                    <Link href="/admin/institutions" className="hover:text-[#002d5b] transition-colors">Institutions</Link>
                    <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                    <span className="text-slate-600">{institution.name}</span>
                </nav>

                {/* Institution Profile Header */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/30 overflow-hidden relative">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-12">
                        <div className="flex-1">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">{institution.name}</h2>
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="px-5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">Active Site</span>
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-5 py-1.5 rounded-xl border border-slate-100 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                    {institution.city}, {institution.country}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <Link href={`/admin/institutions/${institution.id}/edit`} className="px-8 py-5 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-2xl text-[10px] font-black transition-all border border-slate-200 uppercase tracking-[0.2em]">Edit Profile</Link>
                            <Link href={`/admin/users/create?institution_id=${institution.id}`} className="px-8 py-5 bg-[#002d5b] text-white hover:bg-[#003d7b] rounded-2xl text-[10px] font-black shadow-xl shadow-[#002d5b]/20 transition-all uppercase tracking-[0.2em]">Add Staff</Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-12 border-t border-slate-100">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Facility Type</p>
                                <p className="text-xs font-black text-slate-700 uppercase tracking-tight">{institution.type?.replace('_', ' ') || 'Research Center'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 100-4H5a2 2 0 100 4z"></path></svg>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Contact Channel</p>
                                <p className="text-xs font-black text-slate-700 tracking-tight">{institution.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Lead Investigator</p>
                                <p className="text-xs font-black text-slate-700 uppercase tracking-tight">{institution.contact_person}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Direct Dial</p>
                                <p className="text-xs font-black text-slate-700 tracking-tight">{institution.phone || '+N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metrics Horizontal Stripe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                        <div className="flex items-center gap-4 text-emerald-600 mb-6 font-black uppercase tracking-[0.2em] text-[10px]">
                            <div className="p-3 rounded-2xl bg-emerald-50">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            Studies
                        </div>
                        <div className="text-4xl font-black text-slate-900 tracking-tight">{institution.studies.length}</div>
                        <div className="absolute -right-4 -bottom-4 text-slate-50 opacity-10 group-hover:opacity-20 transform -rotate-12 transition-all">
                             <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                        <div className="flex items-center gap-4 text-blue-600 mb-6 font-black uppercase tracking-[0.2em] text-[10px]">
                            <div className="p-3 rounded-2xl bg-blue-50">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            </div>
                            Staff
                        </div>
                        <div className="text-4xl font-black text-slate-900 tracking-tight">{institution.users.length}</div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                        <div className="flex items-center gap-4 text-indigo-600 mb-6 font-black uppercase tracking-[0.2em] text-[10px]">
                            <div className="p-3 rounded-2xl bg-indigo-50">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            Records
                        </div>
                        <div className="text-4xl font-black text-slate-900 tracking-tight">242</div>
                    </div>

                    <div className="bg-[#002d5b] p-8 rounded-[2.5rem] border border-[#002d5b] shadow-2xl shadow-blue-900/20 group overflow-hidden relative">
                        <div className="flex items-center gap-4 text-blue-300 mb-6 font-black uppercase tracking-[0.2em] text-[10px] relative z-10">
                            <div className="p-3 rounded-2xl bg-blue-900/50">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            Compliance
                        </div>
                        <div className="text-4xl font-black text-white tracking-tight relative z-10">Elite</div>
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 rotate-45 transition-all group-hover:scale-110">
                            <svg className="w-48 h-48" fill="white" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Tabs & Tab Content */}
                <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden min-h-[600px]">
                    <div className="border-b border-slate-100 px-12 pt-4">
                        <nav className="flex gap-12">
                            {['studies', 'team', 'ethics'].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-8 text-xs font-black uppercase tracking-[0.2em] border-b-4 transition-all ${
                                        activeTab === tab ? 'border-[#002d5b] text-[#002d5b]' : 'border-transparent text-slate-300 hover:text-slate-500'
                                    }`}
                                >
                                    {tab === 'studies' ? 'Research Portfolio' : tab === 'team' ? 'Research Team' : 'Compliance & Ethics'}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-12">
                        {activeTab === 'studies' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                                {institution.studies.map(study => (
                                    <div key={study.id} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:border-[#002d5b]/20 hover:shadow-xl transition-all flex items-center justify-between group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#002d5b] font-black text-sm shadow-sm group-hover:bg-[#002d5b] group-hover:text-white transition-all">
                                                {study.title.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-800 group-hover:text-[#002d5b] transition-colors leading-tight mb-1">{study.title}</h4>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{study.study_code}</span>
                                            </div>
                                        </div>
                                        <Link href={`/admin/studies/${study.id}`} className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-300 hover:text-[#002d5b] hover:shadow-md transition-all">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </Link>
                                    </div>
                                ))}
                                {institution.studies.length === 0 && (
                                    <div className="col-span-full py-24 text-center opacity-30 italic text-slate-400 font-bold">
                                        No active research projects associated with this site.
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'team' && (
                            <div className="animate-in fade-in duration-500">
                                <div className="overflow-x-auto rounded-3xl border border-slate-100">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <th className="px-10 py-6">Member Profile</th>
                                                <th className="px-8 py-6">Role / Designation</th>
                                                <th className="px-8 py-6">Access Level</th>
                                                <th className="px-10 py-6 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {institution.users.map(user => (
                                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-10 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-2xl bg-[#002d5b] text-white flex items-center justify-center text-xs font-black uppercase">
                                                                {user.name.substring(0, 2)}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black text-slate-800 group-hover:text-[#002d5b] transition-colors">{user.name}</p>
                                                                <p className="text-[10px] font-bold text-slate-400 tracking-tight">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-xs font-black text-slate-600 uppercase tracking-widest">
                                                        {user.roles?.[0]?.name || 'Collaborator'}
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">Full Access</span>
                                                    </td>
                                                    <td className="px-10 py-6 text-right">
                                                        <Link href={`/admin/users/${user.id}/edit`} className="text-[10px] font-black uppercase tracking-widest text-[#002d5b] hover:underline transition-all">Identity Mgmt</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                            {institution.users.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="px-10 py-24 text-center opacity-30 italic text-slate-400 font-bold text-sm">
                                                        No staff members identified for this facility.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'ethics' && (
                            <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-500">
                                {[
                                    { title: 'IRB Protocol Approval #WEC-782', status: 'Verified', date: '24 Sep 2026' },
                                    { title: 'Global Compliance Certification', status: 'Active', date: '12 Jan 2026' },
                                ].map((cert, i) => (
                                    <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-[#002d5b]/20 hover:bg-white hover:shadow-xl transition-all flex items-center justify-between group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white text-emerald-500 flex items-center justify-center shadow-sm group-hover:bg-[#002d5b] group-hover:text-white transition-all">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 leading-tight mb-1">{cert.title}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cert.date} • Ethics Review Board</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                                                {cert.status}
                                            </span>
                                            <button className="text-[10px] font-black uppercase tracking-widest text-[#002d5b] hover:underline">View Proof</button>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-8 flex justify-center">
                                    <button className="px-8 py-4 bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">Refresh Compliance Stream</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
