import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ studies, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        study_id: '',
        document_category_id: '',
        file: null,
    });

    const [dragActive, setDragActive] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post('/admin/documents');
    };

    return (
        <AdminLayout title="Vault Ingestion">
            <Head title="Upload Document" />

            <div className="max-w-4xl mx-auto py-12">
                <form onSubmit={submit} className="space-y-12">
                    {/* Header Summary */}
                    <div className="flex items-center justify-between px-6">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Archive Initiation</h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 px-1">Securely ingest archival research data</p>
                        </div>
                        <Link href="/admin/documents" className="text-[10px] font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-[0.2em] px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">Abort & Return</Link>
                    </div>

                    {/* Meta Data Section */}
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Document Label</label>
                                <input 
                                    type="text" 
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                    placeholder="e.g., Clinical Trial Protocol v2.4 Final"
                                />
                                {errors.title && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Study Context</label>
                                <select 
                                    value={data.study_id}
                                    onChange={e => setData('study_id', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all appearance-none"
                                >
                                    <option value="">Select Research Project</option>
                                    {studies.map(study => (
                                        <option key={study.id} value={study.id}>{study.title}</option>
                                    ))}
                                </select>
                                {errors.study_id && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.study_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Archival Category</label>
                                <select 
                                    value={data.document_category_id}
                                    onChange={e => setData('document_category_id', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all appearance-none"
                                >
                                    <option value="">Select Document Type</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.document_category_id && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2">{errors.document_category_id}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Secure File Ingestion Area */}
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4 block">Secure Binary Data (Max 10MB)</label>
                         <div 
                            className={`relative p-24 border-2 border-dashed rounded-[3rem] transition-all duration-300 flex flex-col items-center justify-center gap-6 ${
                                dragActive ? 'border-[#002d5b] bg-blue-50' : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
                            }`}
                            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={(e) => { e.preventDefault(); setDragActive(false); setData('file', e.dataTransfer.files[0]); }}
                         >
                            <input 
                                type="file" 
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                onChange={e => setData('file', e.target.files[0])}
                            />
                            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#002d5b] group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-black text-slate-800 mb-1">{data.file ? data.file.name : 'Securely Drop Artifact Here'}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">or click to browse local storage</p>
                            </div>
                            {data.file && (
                                <div className="mt-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                                    <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Identity Verified</span>
                                </div>
                            )}
                         </div>
                         {errors.file && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-4 flex justify-center">{errors.file}</p>}
                    </div>

                    {/* Action Block */}
                    <div className="flex items-center justify-between px-8">
                         <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest max-w-[280px]">All archival actions are cryptographically logged for governance audit compliance.</p>
                         <button 
                            type="submit" 
                            disabled={processing}
                            className="px-12 py-5 bg-[#002d5b] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-[#002d5b]/30 hover:bg-[#003d7b] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                        >
                            Commit to Vault
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
