import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Responses({ auth, survey }) {
    
    // Parse config safely incase of older string definitions
    let formFields = [];
    try {
        formFields = typeof survey.config_json === 'string' ? JSON.parse(survey.config_json) : (survey.config_json || []);
    } catch(e) {
        console.error("Failed to parse survey configuration map", e);
    }

    return (
        <AdminLayout user={auth?.user}>
            <Head title={`Responses: ${survey.title}`} />
            <div className="min-h-screen bg-slate-50 p-8 font-sans">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <Link href={route('surveys.index')} className="text-blue-600 font-medium hover:underline text-sm mb-4 inline-block">&larr; Back to Hub</Link>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Campaign Ledger</h1>
                        <p className="text-slate-500 mt-2 text-lg">Viewing public responses for <strong className="text-slate-800">{survey.title}</strong></p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="px-6 py-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3">
                            <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Total Captures</span>
                            <span className="text-lg font-bold text-slate-900">{survey.responses?.length || 0}</span>
                        </div>
                        <a href={route('surveys.public.show', survey.slug)} target="_blank" className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            View Public Form
                        </a>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-[#002d5b] text-white">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-[#8eb6e6]"># ID</th>
                                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-[#8eb6e6]">Timestamp</th>
                                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-[#8eb6e6]">Origin IP</th>
                                    {formFields.map((field, idx) => (
                                        <th key={idx} className="px-6 py-4 font-bold text-xs uppercase tracking-widest">{field.label}</th>
                                    ))}
                                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-right">Ext. Sync</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {(!survey.responses || survey.responses.length === 0) ? (
                                    <tr>
                                        <td colSpan={formFields.length + 4} className="px-6 py-12 text-center text-slate-400">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                                <p className="font-bold text-slate-500">No responses captured yet.</p>
                                                <p className="text-sm mt-1">Share the public URL to start collecting data.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : survey.responses.map(response => {
                                    // payload_json could be array or JSON string depending on cast behavior, standardizing.
                                    const payloadData = typeof response.payload_json === 'string' 
                                            ? JSON.parse(response.payload_json) 
                                            : (response.payload_json || {});

                                    return (
                                        <tr key={response.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-400 text-sm">
                                                {survey.slug.substring(0, 5).toUpperCase()}-{response.id.toString().padStart(4, '0')}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700">
                                                {new Date(response.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
                                                    {response.ip_address}
                                                </span>
                                            </td>
                                            
                                            {formFields.map((field, idx) => (
                                                <td key={idx} className="px-6 py-4 text-sm text-slate-800 break-words max-w-xs">
                                                    {payloadData[field.name]?.toString() || <span className="text-slate-300 italic">Empty</span>}
                                                </td>
                                            ))}

                                            <td className="px-6 py-4 text-right">
                                                {response.synced ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                        Synced
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full" title={survey.google_webhook_url ? "Webhook failed" : "No webhook configured"}>
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                                                        Local Only
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
