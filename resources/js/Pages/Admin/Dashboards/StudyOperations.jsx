import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function StudyOperations({ auth }) {
    return (
        <AdminLayout user={auth?.user}>
            <Head title="Study Operations Dashboard" />
            
            <div className="min-h-screen bg-slate-50 p-8 font-sans">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Study Operations Dashboard</h1>
                    <p className="text-slate-500 mt-2 text-lg">Central control for managing study lifecycles and documentation.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 min-h-[400px]">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Study Activities</h2>
                            
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-700">No Recent Activity</h3>
                                <p className="text-slate-500 text-sm max-w-sm mt-2">Study activity logs will automatically populate here as team members update protocol versions and metrics.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:col-span-1 space-y-8">
                        <div className="bg-[#002d5b] text-white rounded-3xl shadow-lg p-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                Quick Actions
                            </h3>
                            <ul className="space-y-3">
                                <li><a href="/admin/studies" className="block px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">Manage Study Protocols</a></li>
                                <li><a href="/admin/documents" className="block px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">Access Document Vault</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

