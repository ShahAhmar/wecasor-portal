import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, subjects }) {
    return (
        <AdminLayout user={auth?.user}>
            <Head title="Subject Registry" />

            <div className="space-y-8 flex flex-col h-full bg-slate-50 min-h-screen px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Subject Registry</h2>
                        <p className="text-slate-500 font-medium mt-2">Global database of all screened and enrolled subjects.</p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Subject ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Study</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Site</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Screening Date</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {subjects.data && subjects.data.length > 0 ? (
                                    subjects.data.map(subject => (
                                        <tr key={subject.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0 shadow-sm border border-blue-100">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                                    </div>
                                                    <div>
                                                        <span className="font-mono text-sm font-black text-slate-800">{subject.subject_code}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-semibold text-slate-600">
                                                {subject.study?.title || 'Unknown Study'}
                                            </td>
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {subject.site?.name || 'Unassigned'}
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                    subject.status === 'enrolled' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                    subject.status === 'screened' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                    'bg-slate-100 text-slate-600 border border-slate-200'
                                                }`}>
                                                    {subject.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-sm text-slate-500 font-medium">
                                                {subject.screening_date ? new Date(subject.screening_date).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <Link 
                                                    href={`/admin/subjects/${subject.id}/timeline`} 
                                                    className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                                                >
                                                    View Profile
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-16 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                                <span className="font-medium text-sm">No Subjects registered yet.</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
