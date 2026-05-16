import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, usePage } from '@inertiajs/react';

export default function StudyWorkspaceLayout({ auth, study, children }) {
    const { url } = usePage();
    
    // Study contextual links
    const studyLinks = [
        { name: 'Overview', href: `/admin/studies/${study.id}/workspace`, active: url.endsWith('/workspace') },
        { name: 'Protocol', href: `/admin/studies/${study.id}/workspace/protocol`, active: url.includes('/protocol') },
        { name: 'Sites', href: `/admin/studies/${study.id}/workspace/sites`, active: url.includes('/sites') },
        { name: 'Enrollment', href: `/admin/studies/${study.id}/workspace/enrollment`, active: url.includes('/enrollment') },
        { name: 'Queries', href: `/admin/studies/${study.id}/workspace/queries`, active: url.includes('/queries') },
    ];

    return (
        <AdminLayout user={auth?.user}>
            <div className="flex flex-col h-full bg-slate-50 min-h-[calc(100vh-64px)]">
                {/* Study Header */}
                <div className="bg-white border-b border-slate-200">
                    <div className="px-8 py-6 flex items-center justify-between">
                        <div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Study Workspace</span>
                                <h1 className="text-3xl font-extrabold text-slate-800">{study.title}</h1>
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-sm font-medium text-slate-500">
                                <span className="px-2.5 py-1 bg-slate-100 rounded-md shadow-sm">Code: {study.study_code}</span>
                                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md shadow-sm">{study.status}</span>
                            </div>
                        </div>
                    </div>
                    {/* Contextual Navigation Tabs */}
                    <div className="px-8 flex gap-8">
                        {studyLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`py-4 border-b-2 text-sm font-semibold transition-all ${
                                    link.active
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-8">
                    {children}
                </div>
            </div>
        </AdminLayout>
    );
}
