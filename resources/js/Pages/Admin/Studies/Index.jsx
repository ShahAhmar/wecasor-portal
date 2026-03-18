import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ studies }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this study?')) {
            router.delete(`/admin/studies/${id}`);
        }
    };

    return (
        <AdminLayout title="Research Portfolio">
            <Head title="Studies" />

            <div className="space-y-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Studies Overview</h2>
                        <p class="text-slate-500 font-medium mt-2">Manage all research projects and their statuses.</p>
                    </div>
                    <Link 
                        href="/admin/studies/create" 
                        className="px-6 py-3 bg-[#002d5b] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#002d5b]/20 hover:bg-[#00346a] transition-all flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        New Research Study
                    </Link>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden flex flex-col">
                    <div className="p-10 border-b border-slate-100 bg-slate-50/30">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Active Portfolio</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Study Details</th>
                                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Code</th>
                                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">PI Name</th>
                                    <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {studies.data.length > 0 ? studies.data.map((study) => (
                                    <tr key={study.id} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                                        <td className="px-10 py-6">
                                            <Link href={`/admin/studies/${study.id}`} className="block">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-xs group-hover:bg-[#002d5b] group-hover:text-white transition-all shrink-0 uppercase">
                                                        {study.title.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-700 leading-tight group-hover:text-[#002d5b] transition-colors">{study.title}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{study.study_code}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="font-mono text-xs font-bold text-slate-600 px-3 py-1.5 bg-slate-100 rounded-lg">{study.study_code}</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                                                study.status.toLowerCase() === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                                                study.status.toLowerCase() === 'planning' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                'bg-slate-100 text-slate-600 border border-slate-200'
                                            }`}>
                                                {study.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-sm font-bold text-slate-700">{study.pi_name || 'Not Assigned'}</p>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/studies/${study.id}/edit`} className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(study.id)}
                                                    className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-10 py-24 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                                </div>
                                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No research projects found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {studies.links.length > 3 && (
                        <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex items-center justify-center gap-2">
                            {studies.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                                        link.active ? 'bg-[#002d5b] text-white shadow-lg shadow-[#002d5b]/20' : 
                                        link.url ? 'bg-white border border-slate-200 text-slate-600 hover:border-[#002d5b] hover:text-[#002d5b]' : 'text-slate-300 cursor-not-allowed'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
