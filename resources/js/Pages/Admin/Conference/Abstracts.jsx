import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

export default function Abstracts({ abstracts }) {
    const [selectedAbstract, setSelectedAbstract] = React.useState(null);

    const handleStatusChange = (id, status) => {
        if (!confirm('Are you sure you want to change the status to ' + status + '?')) return;
        router.post(route('admin.conference.abstracts.status', id), {
            status: status
        }, {
            preserveScroll: true
        });
    };

    return (
        <AdminLayout title="Conference Abstracts">
            <Head title="Conference Abstracts" />

            {/* View Full Abstract Modal */}
            {selectedAbstract && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                    <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                            <div>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 block">{selectedAbstract.thematic_area}</span>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{selectedAbstract.title}</h3>
                            </div>
                            <button onClick={() => setSelectedAbstract(null)} className="p-3 bg-slate-100 text-slate-400 hover:text-slate-800 rounded-2xl transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Author</p>
                                    <p className="font-bold text-slate-800">{selectedAbstract.name}</p>
                                    <p className="text-xs text-slate-500 font-medium">{selectedAbstract.email}</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Institution</p>
                                    <p className="font-bold text-slate-800">{selectedAbstract.institution}</p>
                                    <p className="text-xs text-slate-500 font-medium">{selectedAbstract.country}</p>
                                </div>
                            </div>
                            <div className="prose prose-slate max-w-none">
                                <h4 className="text-lg font-black text-[#002d5b] mb-4 uppercase tracking-widest">Abstract Content</h4>
                                <p className="text-slate-600 leading-loose whitespace-pre-wrap font-medium">
                                    {selectedAbstract.abstract_content}
                                </p>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                            <button 
                                onClick={() => handleStatusChange(selectedAbstract.id, 'rejected')}
                                className="px-8 py-4 bg-white border border-rose-200 text-rose-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-50"
                            >
                                Reject
                            </button>
                            <button 
                                onClick={() => {
                                    handleStatusChange(selectedAbstract.id, 'reviewed');
                                    setSelectedAbstract(null);
                                }}
                                className="px-8 py-4 bg-[#002d5b] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-900/20"
                            >
                                Approve / Mark Reviewed
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
                <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Academic Submissions</h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">Review and manage conference abstracts</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Author & Title</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Institution</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Area</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Status</th>
                                <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {abstracts.map((abstract) => (
                                <tr key={abstract.id} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="px-10 py-6">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-slate-700 leading-tight group-hover:text-[#002d5b] transition-colors">{abstract.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{abstract.email}</p>
                                            <p className="text-sm text-slate-500 mt-2 font-medium line-clamp-1">{abstract.title}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-sm font-bold text-slate-600">{abstract.institution}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{abstract.country}</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-blue-100">
                                            {abstract.thematic_area}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                                            abstract.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                            abstract.status === 'reviewed' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                            'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                        }`}>
                                            {abstract.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-right space-x-2">
                                        <button 
                                            onClick={() => handleStatusChange(abstract.id, 'reviewed')}
                                            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#002d5b] hover:text-white transition-all shadow-sm"
                                        >
                                            Review
                                        </button>
                                        <button 
                                            onClick={() => setSelectedAbstract(abstract)}
                                            className="px-4 py-2 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200"
                                        >
                                            View Full
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
