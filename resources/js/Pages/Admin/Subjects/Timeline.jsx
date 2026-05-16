import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Timeline({ auth, subject }) {
    
    // Determine timeline steps based on status
    const steps = [
        { id: 1, name: 'Screening', status: subject.status === 'screened' || subject.status === 'enrolled' ? 'complete' : 'current' },
        { id: 2, name: 'Baseline eCRF', status: subject.status === 'enrolled' ? 'complete' : 'upcoming' },
        { id: 3, name: 'Discharge', status: 'upcoming' },
        { id: 4, name: 'Follow Up (90 Day)', status: 'upcoming' }
    ];

    return (
        <AdminLayout user={auth?.user}>
            <Head title={`Subject Profile - ${subject.subject_code}`} />

            <div className="min-h-screen bg-slate-50 p-8">
                {/* Profile Header */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-600/30">
                            {subject.subject_code.split('-')[0]}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-800">{subject.subject_code}</h1>
                            <div className="flex items-center gap-3 mt-2 text-sm font-medium text-slate-500">
                                <span>{subject.study?.title || 'Study Undefined'}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                <span>{subject.site?.name || 'Site Undefined'}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                <span className="uppercase text-blue-600 font-bold">{subject.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link href={`/admin/subjects/${subject.id}/crfs`} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-emerald-200">
                            Enter Clinical Data (eCRF)
                        </Link>
                    </div>
                </div>

                {/* Main Dashboard Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Timeline */}
                    <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Clinical Lifecycle</h2>
                        
                        <div className="relative border-l-2 border-slate-100 ml-4 space-y-10">
                            {steps.map((step, idx) => (
                                <div key={step.id} className="relative pl-8">
                                    <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white ${
                                        step.status === 'complete' ? 'bg-blue-600' :
                                        step.status === 'current' ? 'bg-amber-500' :
                                        'bg-slate-200'
                                    }`}></div>
                                    <h3 className={`font-bold ${step.status === 'upcoming' ? 'text-slate-400' : 'text-slate-700'}`}>
                                        {step.name}
                                    </h3>
                                    {step.status === 'complete' && (
                                        <p className="text-xs text-slate-400 font-medium mt-1">Confirmed</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Key Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">Subject Demographics & Key Data</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Screening Date</span>
                                    <span className="text-slate-800 font-medium">{subject.screening_date || 'Not specified'}</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Enrollment Date</span>
                                    <span className="text-slate-800 font-medium">{subject.enrollment_date || 'Pending'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Queries Widget */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full opacity-50"></div>
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-between">
                                Open Discrepancies
                                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-black">0</span>
                            </h2>
                            <div className="text-center py-8 text-slate-500 text-sm">
                                No active queries issued by Monitors for this subject.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
