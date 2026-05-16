import React from 'react';
import StudyWorkspaceLayout from '@/Layouts/StudyWorkspaceLayout';
import { Head } from '@inertiajs/react';

export default function Queries({ auth, study }) {
    return (
        <StudyWorkspaceLayout auth={auth} study={study}>
            <Head title={`Data Queries Engine - ${study.study_code}`} />
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[500px]">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Open Discrepancy Workflows</h2>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-500">
                    Active Queries originating from Monitors/Auditors will filter here based on Role permissions.
                </div>
            </div>
        </StudyWorkspaceLayout>
    );
}
