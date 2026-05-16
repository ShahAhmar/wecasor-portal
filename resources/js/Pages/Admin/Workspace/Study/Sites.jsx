import React from 'react';
import StudyWorkspaceLayout from '@/Layouts/StudyWorkspaceLayout';
import { Head, Link } from '@inertiajs/react';

export default function Sites({ auth, study, sites }) {
    return (
        <StudyWorkspaceLayout auth={auth} study={study}>
            <Head title={`Participating Sites - ${study.study_code}`} />
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Site Name</th>
                            <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Site Code</th>
                            <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Country</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sites.data.length > 0 ? sites.data.map(site => (
                            <tr key={site.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-5 font-semibold text-slate-800">{site.name}</td>
                                <td className="px-8 py-5 text-slate-600 font-mono text-sm">{site.site_code || '-'}</td>
                                <td className="px-8 py-5 text-slate-600">{site.country}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="px-8 py-10 text-center text-slate-500">No active sites mapped to this study yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </StudyWorkspaceLayout>
    );
}
