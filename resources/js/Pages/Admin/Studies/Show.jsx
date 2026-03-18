import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ study, completenessRate, followUpRate }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [showActions, setShowActions] = useState(false);

    const handleDelete = () => {
        if (confirm('Delete this study?')) {
            router.delete(`/admin/studies/${study.id}`);
        }
    };

    return (
        <AdminLayout title="Study Dashboard">
            <Head title={`${study.title} - Dashboard`} />

            <div className="space-y-12">
                {/* Breadcrumbs */}
                <nav className="flex text-xs font-bold text-slate-400 gap-3 items-center uppercase tracking-widest">
                    <Link href="/admin/dashboard" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
                    <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                    <Link href="/admin/studies" className="hover:text-emerald-600 transition-colors">Studies</Link>
                    <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                    <span className="text-slate-600">{study.study_code}</span>
                </nav>

                {/* Study Header */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/30 overflow-hidden relative">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
                        <div className="flex-1">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">{study.title}</h2>
                            <div className="mt-4 flex flex-wrap items-center gap-4">
                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] shadow-sm ${
                                    study.status.toLowerCase() === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                    'bg-amber-50 text-amber-600 border border-amber-100'
                                }`}>
                                    {study.status}
                                </span>
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-xl border border-slate-100">Code: {study.study_code}</span>
                                <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    PI: {study.pi_name || 'Not Designated'}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <Link href={`/admin/studies/${study.id}/edit`} className="px-6 py-4 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-2xl text-[10px] font-black transition-all border border-slate-200 uppercase tracking-[0.2em]">Edit Study</Link>
                            <div className="relative">
                                <button 
                                    onClick={() => setShowActions(!showActions)}
                                    className="px-6 py-4 bg-[#002d5b] text-white hover:bg-[#003d7b] rounded-2xl text-[10px] font-black shadow-xl shadow-[#002d5b]/20 transition-all flex items-center gap-3 uppercase tracking-[0.2em]"
                                >
                                    Actions
                                    <svg className={`w-3 h-3 transition-transform duration-300 ${showActions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                {showActions && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowActions(false)} />
                                        <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 z-50 overflow-hidden transform origin-top-right transition-all">
                                            <Link href="/admin/data-submissions" className="block px-6 py-3 text-[10px] font-black text-slate-600 hover:bg-slate-50 hover:text-[#002d5b] uppercase tracking-widest transition-colors">View Submissions</Link>
                                            <Link href={`/admin/documents/create?study_id=${study.id}`} className="block px-6 py-3 text-[10px] font-black text-slate-600 hover:bg-slate-50 hover:text-[#002d5b] border-t border-slate-50 uppercase tracking-widest transition-colors">Upload Document</Link>
                                            <button 
                                                onClick={handleDelete}
                                                className="w-full text-left px-6 py-3 text-[10px] font-black text-rose-600 hover:bg-rose-50 border-t border-slate-50 uppercase tracking-widest transition-colors"
                                            >
                                                Delete Project
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="max-w-4xl p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                            {study.description || "No project description has been finalized for this research study."}
                        </p>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group cursor-pointer" onClick={() => setActiveTab('sites')}>
                        <div className="flex items-center gap-4 text-emerald-600 mb-6 font-black uppercase tracking-[0.2em] text-[10px]">
                            <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            Sites
                        </div>
                        <div className="text-4xl font-black text-slate-900 tracking-tight">{study.institutions.length}</div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                         <div className="flex items-center gap-4 text-blue-600 mb-6 font-black uppercase tracking-[0.2em] text-[10px]">
                            <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            Completeness
                        </div>
                        <div className="text-4xl font-black text-slate-900 tracking-tight">{completenessRate}%</div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-4 text-indigo-600 mb-6 font-black uppercase tracking-[0.2em] text-[10px]">
                            <div className="p-3 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            </div>
                            Follow-up
                        </div>
                        <div className="text-4xl font-black text-slate-900 tracking-tight">{followUpRate}%</div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group cursor-pointer" onClick={() => setActiveTab('documents')}>
                        <div className="flex items-center gap-4 text-orange-600 mb-6 font-black uppercase tracking-[0.2em] text-[10px]">
                            <div className="p-3 rounded-2xl bg-orange-50 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            </div>
                            Documents
                        </div>
                        <div className="text-4xl font-black text-slate-900 tracking-tight">{study.documents.length}</div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden min-h-[600px]">
                    <div className="border-b border-slate-100 px-12 pt-4">
                        <nav className="flex gap-12">
                            {['overview', 'sites', 'documents', 'activity'].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-8 text-xs font-black uppercase tracking-[0.2em] border-b-4 transition-all ${
                                        activeTab === tab ? 'border-[#002d5b] text-[#002d5b]' : 'border-transparent text-slate-300 hover:text-slate-500'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-12">
                        {activeTab === 'overview' && (
                            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <section>
                                    <h3 className="text-[10px] font-black text-slate-400 mb-10 uppercase tracking-[0.3em]">Phase Timeline</h3>
                                    <div className="flex items-center w-full max-w-5xl mx-auto px-12">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200 scale-100">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Planning</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 h-1.5 bg-emerald-100 mt-[-24px] mx-1 rounded-full">
                                            <div className="h-full bg-emerald-600 rounded-full w-full"></div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-2xl bg-[#002d5b] text-white flex items-center justify-center ring-8 ring-blue-50 shadow-xl shadow-blue-100">
                                                <span className="font-black text-sm">2</span>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p className="text-[9px] font-black text-[#002d5b] uppercase tracking-widest">Collection</p>
                                                <p className="text-[8px] text-emerald-600 font-bold uppercase mt-1">Live Now</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 h-1.5 bg-slate-100 mt-[-24px] mx-1 rounded-full"></div>
                                        <div className="flex flex-col items-center opacity-30">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center">
                                                <span className="font-black text-sm">3</span>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Analysis</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-12 border-t border-slate-50">
                                    <section>
                                         <h3 className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-[0.2em]">Study Objectives</h3>
                                         <div className="space-y-6">
                                             {[
                                                 { text: 'Finalize baseline metrics across all cohorts', done: true },
                                                 { text: 'Quality assurance sweep of clinical data', done: false },
                                                 { text: 'Interim analysis of primary endpoints', done: false },
                                             ].map((obj, i) => (
                                                 <div key={i} className="flex items-center gap-4 group">
                                                     <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${obj.done ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-50 border-2 border-slate-200 group-hover:border-[#002d5b]/30'}`}>
                                                         {obj.done && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                                     </div>
                                                     <span className={`text-sm font-bold ${obj.done ? 'text-slate-800' : 'text-slate-400 font-medium'}`}>{obj.text}</span>
                                                 </div>
                                             ))}
                                         </div>
                                    </section>
                                    <section>
                                        <h3 className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-[0.2em]">Expected Outcomes</h3>
                                        <div className="space-y-4">
                                            <div className="p-6 bg-[#002d5b] rounded-3xl text-white shadow-xl shadow-blue-900/10">
                                                <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-2">Primary Target</p>
                                                <p className="text-sm font-bold leading-snug">Verification of cardiovascular longitudinal risk markers.</p>
                                            </div>
                                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 border-l-4 border-l-emerald-500">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Secondary Marker</p>
                                                <p className="text-sm font-bold text-slate-700 leading-snug">Correlation between lifestyle factors and recovery rates.</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}

                        {activeTab === 'sites' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-500">
                                {study.institutions.map(site => (
                                    <div key={site.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{site.city}</span>
                                            <span className="px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">Live</span>
                                        </div>
                                        <h4 className="text-lg font-black text-slate-800 group-hover:text-[#002d5b] transition-colors mb-1 leading-tight">{site.name}</h4>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{site.country}</p>
                                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Lead Investigator</p>
                                                <p className="text-xs font-bold text-slate-700">{site.contact_person || 'Syed Yusuf'}</p>
                                            </div>
                                            <Link href={`/admin/institutions/${site.id}`} className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#002d5b] hover:text-white transition-all shadow-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                {study.institutions.length === 0 && (
                                    <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                                        <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                        </div>
                                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">No participating sites linked</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500 overflow-hidden rounded-3xl border border-slate-100">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            <th className="px-10 py-6">Document Title</th>
                                            <th className="px-8 py-6">Category</th>
                                            <th className="px-8 py-6">Uploaded By</th>
                                            <th className="px-10 py-6 text-right">Download</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {study.documents.map(doc => (
                                            <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 transition-all flex items-center justify-center text-slate-400 group-hover:text-[#002d5b]">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                                        </div>
                                                        <span className="text-sm font-bold text-slate-800 group-hover:text-[#002d5b] transition-colors">{doc.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{doc.category?.name || 'Protocol'}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px] font-bold">SY</div>
                                                        <span className="text-[11px] font-bold text-slate-600">{doc.uploader?.name || 'Governance'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6 text-right">
                                                    <a href={`/admin/documents/${doc.id}/download`} className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                        {study.documents.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="px-10 py-32 text-center">
                                                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">No documents uploaded for this study</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 animate-in fade-in duration-500">
                                <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">Audit Stream Pending</h3>
                                <p className="text-slate-400 text-[10px] font-bold mt-4 max-w-xs mx-auto">Live activity logging for individual study projects is currently in synchronization.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
