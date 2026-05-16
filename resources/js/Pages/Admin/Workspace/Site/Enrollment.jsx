import React from 'react';
import SiteWorkspaceLayout from '@/Layouts/SiteWorkspaceLayout';
import { Head, Link } from '@inertiajs/react';

export default function Enrollment({ auth, site, subjects }) {
    return (
        <SiteWorkspaceLayout auth={auth} site={site}>
            <Head title={`Enrollment Metrics - ${site.name}`} />
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Enrolled Subjects Repository</h2>
                    <Link href={`/admin/subjects/create?site_id=${site.id}`} className="bg-emerald-50 text-emerald-600 px-6 py-2 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors shadow-sm">
                        Register New Patient
                    </Link>
                </div>
                
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Subject ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Enrollment Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {subjects && subjects.data && subjects.data.length > 0 ? subjects.data.map(subject => (
                            <tr key={subject.id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-bold text-slate-700">{subject.subject_code}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">{subject.enrollment_date || subject.screening_date || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest">{subject.status}</span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="py-12 text-center text-slate-400 text-sm">No subjects enrolled at this site yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </SiteWorkspaceLayout>
    );
}
