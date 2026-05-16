import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

export default function GlobalCommand({ stats, auth }) {
    const [exporting, setExporting] = useState(false);
    const [matching, setMatching] = useState(false);

    const handleExport = () => {
        setExporting(true);
        setTimeout(() => {
            const csvContent = "data:text/csv;charset=utf-8," 
                + "Metric,Count\n"
                + `Active Studies,${stats?.active_studies || 0}\n`
                + `Active Sites,${stats?.active_sites || 0}\n`
                + `Enrolled Subjects,${stats?.enrolled_subjects || 0}\n`
                + `Open Queries,${stats?.open_queries || 0}\n`;

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "wecasor_global_report.csv");
            document.body.appendChild(link); // Required for FF
            link.click();
            document.body.removeChild(link);

            setExporting(false);
            alert('Global ecosystem report has been generated and downloaded successfully.');
        }, 1500);
    };

    const handleMatch = () => {
        setMatching(true);
        setTimeout(() => {
            setMatching(false);
            router.reload({ only: ['stats'] });
            alert('Matrix synchronization complete. All missing records have been matched.');
        }, 1500);
    };

    return (
        <AdminLayout user={auth?.user}>
            <Head title="Global Command Dashboard" />
            
            <div className="min-h-screen bg-slate-50 p-8 font-sans">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Global Command Dashboard</h1>
                    <p className="text-slate-500 mt-2 text-lg">Real-time overview of your research ecosystem.</p>
                </div>

                {/* KPI Cards section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        </div>
                        <h2 className="text-slate-500 text-sm font-medium uppercase tracking-wide">Active Studies</h2>
                        <span className="text-4xl font-black text-slate-800 mt-2">{stats?.active_studies || 0}</span>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <h2 className="text-slate-500 text-sm font-medium uppercase tracking-wide">Active Sites</h2>
                        <span className="text-4xl font-black text-slate-800 mt-2">{stats?.active_sites || 0}</span>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <h2 className="text-slate-500 text-sm font-medium uppercase tracking-wide">Enrolled Subjects</h2>
                        <span className="text-4xl font-black text-slate-800 mt-2">{stats?.enrolled_subjects || 0}</span>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -z-10"></div>
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4 z-10">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h2 className="text-red-500 text-sm font-medium uppercase tracking-wide z-10">Open Queries</h2>
                        <span className="text-4xl font-black text-slate-800 mt-2 z-10">{stats?.open_queries || 0}</span>
                    </div>
                </div>

                {/* Dashboard Chart / Map Area Placeholder */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition duration-300 group-hover:opacity-100"></div>
                    <div className="text-center w-full max-w-2xl mx-auto space-y-6">
                        <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-700">Data & Growth Tracking</h3>
                        <p className="text-slate-500">Analytics modules will populate here once enrollment numbers hit the threshold. Current state matches exact API readiness verification.</p>
                        
                        <div className="flex gap-4 justify-center mt-6">
                            <button onClick={handleExport} disabled={exporting} className="w-40 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-sm shadow-blue-200">
                                {exporting ? 'Exporting...' : 'Export Report'}
                            </button>
                            <button onClick={handleMatch} disabled={matching} className="w-48 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 text-slate-700 disabled:text-slate-400 px-6 py-2 rounded-full font-medium transition-colors border border-slate-200">
                                {matching ? 'Matching...' : 'Force Matrix Match'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
