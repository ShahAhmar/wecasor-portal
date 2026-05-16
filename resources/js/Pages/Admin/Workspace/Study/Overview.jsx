import React from 'react';
import StudyWorkspaceLayout from '@/Layouts/StudyWorkspaceLayout';
import { Head, Link } from '@inertiajs/react';

export default function Overview({ auth, study, stats }) {
    return (
        <StudyWorkspaceLayout auth={auth} study={study}>
            <Head title={`Workspace Overview - ${study.study_code}`} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">Total Participating Sites</h3>
                    <p className="text-4xl font-black text-slate-800 mt-2">{stats.total_sites}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">Globally Enrolled Subjects</h3>
                    <p className="text-4xl font-black text-slate-800 mt-2">{stats.total_subjects}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <h3 className="text-rose-500 text-sm font-medium uppercase tracking-wide">Open Active Queries</h3>
                    <p className="text-4xl font-black text-slate-800 mt-2">{stats.open_queries}</p>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -z-10"></div>
                </div>
            </div>

            <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px] flex items-center justify-center">
                <div className="text-center w-full max-w-xl mx-auto space-y-4">
                    <h3 className="text-2xl font-bold text-slate-700">Study Description & Protocols</h3>
                    <p className="text-slate-500 leading-relaxed">{study.description}</p>
                    <div className="pt-4">
                        <Link href={`/admin/studies/${study.id}/workspace/protocol`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors">View Master Protocol</Link>
                    </div>
                </div>
            </div>
        </StudyWorkspaceLayout>
    );
}
