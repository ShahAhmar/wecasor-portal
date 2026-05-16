import React from 'react';
import SiteWorkspaceLayout from '@/Layouts/SiteWorkspaceLayout';
import { Head } from '@inertiajs/react';

export default function Overview({ auth, site, stats }) {
    return (
        <SiteWorkspaceLayout auth={auth} site={site}>
            <Head title={`Site Overview - ${site.name}`} />
            
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Active Team Users</span>
                        <span className="text-4xl font-extrabold text-blue-600 mt-2">{stats.team_size}</span>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Enrolled Subjects</span>
                        <span className="text-4xl font-extrabold text-emerald-600 mt-2">{stats.active_subjects}</span>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Pending Queries</span>
                        <span className="text-4xl font-extrabold text-rose-500 mt-2">{stats.open_queries}</span>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Facility Profile</h2>
                    <div className="grid grid-cols-2 gap-y-6">
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase">Contact Person</p>
                            <p className="font-medium text-slate-800 mt-1">{site.contact_person || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase">Email</p>
                            <p className="font-medium text-slate-800 mt-1">{site.email || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase">Facility Type</p>
                            <p className="font-medium text-slate-800 mt-1">{site.facility || site.type || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase">Location</p>
                            <p className="font-medium text-slate-800 mt-1">{site.city}, {site.country}</p>
                        </div>
                    </div>
                </div>
            </div>
        </SiteWorkspaceLayout>
    );
}
