import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function SiteWorkspaceLayout({ auth, site, children }) {
    const { url } = usePage();

    // Check routing matching for exact active states
    const isCurrent = (path) => url === path || url.startsWith(path + '/');

    const navigation = [
        { name: 'Site Profile', href: `/admin/institutions/${site.id}/workspace` },
        { name: 'Site Users & Team', href: `/admin/institutions/${site.id}/workspace/team` },
        { name: 'Regulatory Documents', href: `/admin/institutions/${site.id}/workspace/documents` },
        { name: 'Enrollment Metrics', href: `/admin/institutions/${site.id}/workspace/enrollment` },
    ];

    return (
        <AdminLayout user={auth?.user}>
            <div className="flex flex-col min-h-screen bg-slate-50">
                {/* Header Context Bar */}
                <div className="bg-[#002d5b] text-white pt-8 pb-4 px-8 shadow-md">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 text-sm font-bold text-blue-200 mb-2">
                                <Link href="/admin/institutions" className="hover:text-white transition-colors">Sites Registry</Link>
                                <span>/</span>
                                <span className="text-white">Workspace</span>
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight">{site.name}</h1>
                            <p className="opacity-80 mt-1">{site.city}, {site.country} • {site.site_code}</p>
                        </div>
                        <div className="hidden md:flex flex-col items-end">
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                                site.status === 'active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-300'
                            }`}>
                                {site.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Secondary Navigation */}
                <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10 px-8">
                    <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto">
                        {navigation.map((item) => {
                            // Exact match for the base overview route, startsWith for others
                            const active = item.name === 'Site Profile' 
                                            ? url === item.href 
                                            : url.startsWith(item.href);
                                            
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`py-4 px-2 whitespace-nowrap text-sm font-bold border-b-2 transition-all ${
                                        active 
                                        ? 'border-blue-600 text-blue-600' 
                                        : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Active Specific Workspace Content */}
                <div className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
