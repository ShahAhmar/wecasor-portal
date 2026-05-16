import React, { useRef } from 'react';
import StudyWorkspaceLayout from '@/Layouts/StudyWorkspaceLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Protocol({ auth, study, documents }) {
    const fileInputRef = useRef(null);
    const { data, setData, post, progress, processing, reset, errors } = useForm({
        title: '',
        file: null,
        documentable_type: 'App\\Models\\Study',
        documentable_id: study.id,
        expiry_date: '',
        version: '1.0'
    });

    const handleFileChange = (e) => {
        setData('file', e.target.files[0]);
        if(!data.title) {
            setData('title', e.target.files[0]?.name.split('.')[0] || '');
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('/admin/documents/upload-polymorphic', {
            onSuccess: () => {
                reset('file', 'title', 'expiry_date');
                if (fileInputRef.current) fileInputRef.current.value = null;
                alert('Document successfully attached to Study Vault.');
            }
        });
    };

    return (
        <StudyWorkspaceLayout auth={auth} study={study}>
            <Head title={`Master Protocol - ${study.study_code}`} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Upload UI */}
                <div className="lg:col-span-1 border border-slate-100 shadow-sm rounded-3xl bg-white p-6 h-fit">
                    <h3 className="font-bold text-slate-800 mb-4 text-lg">Secure Vault Upload</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Document Title</label>
                            <input 
                                type="text" value={data.title} onChange={e => setData('title', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                                placeholder="E.g. Approved Protocol v1"
                            />
                            {errors.title && <span className="text-xs text-rose-500">{errors.title}</span>}
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Version String</label>
                            <input 
                                type="text" value={data.version} onChange={e => setData('version', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 mt-4">IRB Expiry Date (Optional)</label>
                            <input 
                                type="date" value={data.expiry_date} onChange={e => setData('expiry_date', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                            />
                        </div>

                        <div className="pt-2">
                            <input 
                                type="file" ref={fileInputRef} onChange={handleFileChange}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
                            />
                             {errors.file && <span className="text-xs text-rose-500 mt-1 block">{errors.file}</span>}
                        </div>

                        {progress && (
                            <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                            </div>
                        )}

                        <button 
                            type="submit" disabled={processing || !data.file}
                            className="w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all mt-6 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Encrypting & Uploading...' : 'Upload to Workflow Vault'}
                        </button>
                    </form>
                </div>

                {/* Right Column: List UI */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[500px]">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center justify-between">
                            Protocol & Regulatory Documents
                            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-black uppercase">Level: Study</span>
                        </h2>
                        
                        <div className="space-y-4">
                            {documents && documents.length > 0 ? documents.map(doc => (
                                <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-slate-300 transition-colors bg-slate-50/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{doc.title}</h4>
                                            <div className="flex gap-2 text-xs font-medium text-slate-500 mt-1">
                                                <span>v{doc.version || '1.0'}</span>
                                                <span>•</span>
                                                <span>{(doc.file_size / 1024 / 1024).toFixed(2)} MB</span>
                                            </div>
                                        </div>
                                    </div>
                                    <a href={`/admin/documents/${doc.id}/download`} target="_blank" className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-lg shadow-sm border border-slate-200">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    </a>
                                </div>
                            )) : (
                                <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                    <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    <h3 className="text-lg font-bold text-slate-700">No Regulatory Uploads found</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto mt-2 text-sm">Attach a file via the secure Vault Upload panel to permanently map it to this Study's lifecycle.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </StudyWorkspaceLayout>
    );
}
