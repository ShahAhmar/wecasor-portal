import React from 'react';
import StudyWorkspaceLayout from '@/Layouts/StudyWorkspaceLayout';
import { Head } from '@inertiajs/react';

export default function Enrollment({ auth, study }) {
    return (
        <StudyWorkspaceLayout auth={auth} study={study}>
            <Head title={`Enrollment Timeline - ${study.study_code}`} />
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[500px]">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Subject Enrollment Tracking</h2>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-500">
                    Subject Registry timeline modules and screening logs will aggregate here.
                </div>
            </div>
        </StudyWorkspaceLayout>
    );
}
