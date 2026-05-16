import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, surveys, success }) {
    const { delete: destroy } = useForm();
    
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this campaign? All isolated responses will be lost.')) {
            destroy(route('surveys.destroy', id));
        }
    };

    return (
        <AdminLayout user={auth?.user}>
            <Head title="Public Surveys Hub" />
            <div className="min-h-screen bg-slate-50 p-8 font-sans">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Surveys Hub</h1>
                        <p className="text-slate-500 mt-2 text-lg">Manage public outreach campaigns and disconnected data capture.</p>
                    </div>
                    <Link href={route('surveys.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold shadow-sm shadow-blue-200 transition-colors">
                        + New Campaign
                    </Link>
                </div>

                {success && (
                    <div className="mb-6 bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {success}
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#002d5b] text-white">
                            <tr>
                                <th className="px-6 py-4 font-bold text-sm tracking-wide">Campaign Title</th>
                                <th className="px-6 py-4 font-bold text-sm tracking-wide">Status</th>
                                <th className="px-6 py-4 font-bold text-sm tracking-wide">Responses</th>
                                <th className="px-6 py-4 font-bold text-sm tracking-wide">Public URL</th>
                                <th className="px-6 py-4 font-bold text-sm tracking-wide text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {surveys.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                        No active surveys found. Create one to start collecting data.
                                    </td>
                                </tr>
                            ) : surveys.map(survey => (
                                <tr key={survey.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-800">{survey.title}</p>
                                        <p className="text-xs text-slate-500 mt-1 max-w-xs truncate">{survey.description}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            survey.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                            survey.status === 'draft' ? 'bg-slate-100 text-slate-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {survey.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link href={route('surveys.responses', survey.id)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm hover:bg-blue-100 hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" title="View Responses">
                                                {survey.responses_count}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={`/s/${survey.slug}`} target="_blank" className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1 group">
                                            /s/{survey.slug}
                                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <Link href={route('surveys.edit', survey.id)} className="text-slate-400 hover:text-blue-600 transition-colors font-medium text-sm">Edit</Link>
                                        <button onClick={() => handleDelete(survey.id)} className="text-slate-400 hover:text-red-500 transition-colors font-medium text-sm">Delete</button>
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
