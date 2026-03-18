import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ institutions }) {
    const [search, setSearch] = useState('');

    const handleDelete = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(`/admin/institutions/${id}`);
        }
    };

    return (
        <AdminLayout title="Participating Sites">
            <Head title="Institutions" />

            <div className="space-y-12">
                {/* Header & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Institution Registry</h2>
                        <p className="text-slate-500 font-medium mt-2">Global network of research centers and hospitals.</p>
                    </div>
                    <Link 
                        href="/admin/institutions/create" 
                        className="px-8 py-4 bg-[#002d5b] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#002d5b]/20 hover:bg-[#003d7b] hover:-translate-y-1 transition-all flex items-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Onboard New Site
                    </Link>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col lg:flex-row gap-6 bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                    <div className="flex-1 relative group">
                        <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#002d5b] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input 
                            type="text" 
                            placeholder="Search by name, city, or country..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-50 appearance-none min-w-[180px] cursor-pointer">
                            <option>All Countries</option>
                        </select>
                        <select className="px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-50 appearance-none min-w-[180px] cursor-pointer">
                            <option>All Types</option>
                        </select>
                    </div>
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {institutions.data.length > 0 ? institutions.data.map((item) => (
                        <div key={item.id} className="bg-white rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all p-10 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#002d5b]/5 text-[#002d5b] flex items-center justify-center font-black text-xs uppercase group-hover:bg-[#002d5b] group-hover:text-white transition-all">
                                        {item.country.substring(0, 2)}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.country}</span>
                                </div>
                                <span className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-50 text-emerald-600 border border-emerald-100">
                                    Active
                                </span>
                            </div>

                            <div className="mb-10 flex-1 relative z-10">
                                <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-[#002d5b] transition-colors leading-tight mb-4">{item.name}</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                        <span className="text-xs font-bold text-slate-500">{item.city || 'Regional Center'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        <span className="text-xs font-bold text-slate-500">{item.contact_person || 'Lead Investigator'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-50 flex items-center justify-between mb-8 relative z-10">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Ethics Compliance:</span>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                                    <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-[9px] font-black uppercase tracking-widest">Verified</span>
                                </div>
                            </div>

                            <div className="flex gap-4 relative z-10">
                                <Link href={`/admin/institutions/${item.id}`} className="flex-1 text-center py-4 bg-slate-50 text-slate-700 hover:bg-[#002d5b] hover:text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-slate-100">View Profile</Link>
                                <Link href={`/admin/institutions/${item.id}/edit`} className="p-4 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-100 rounded-[1.5rem] transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </Link>
                                <button 
                                    onClick={() => handleDelete(item.id)}
                                    className="p-4 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-100 rounded-[1.5rem] transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-40 text-center bg-white rounded-[3.5rem] border border-slate-200">
                            <div className="w-24 h-24 rounded-full bg-slate-50 mx-auto flex items-center justify-center mb-8">
                                <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            <h3 className="text-xl font-black text-slate-800 capitalize tracking-tight">No participating sites recorded</h3>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-4">Database search returned zero matching institutions</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {institutions.links.length > 3 && (
                    <div className="flex justify-center gap-3 pt-8 pb-12">
                        {institutions.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
                                    link.active ? 'bg-[#002d5b] text-white shadow-xl shadow-[#002d5b]/20 scale-110' : 
                                    link.url ? 'bg-white border border-slate-200 text-slate-500 hover:border-[#002d5b] hover:text-[#002d5b]' : 'text-slate-300 opacity-50 cursor-not-allowed'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
