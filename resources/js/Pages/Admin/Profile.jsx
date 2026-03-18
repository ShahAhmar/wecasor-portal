import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Profile({ user, userLogs }) {
    return (
        <AdminLayout title="Personal Governance">
            <Head title="My Profile" />

            <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
                {/* Header Summary */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-6">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Identity Profile</h2>
                        <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-[0.2em] px-1">Manage personal credentials and security clearance</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/20">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Clearance Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Core Identity Details */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                                     <span className="w-8 h-px bg-slate-100 italic"></span>
                                     Registry Information
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">Legal Designation</label>
                                        <p className="text-xl font-black text-slate-800 tracking-tight bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">{user.name}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">Registry Mailbox</label>
                                        <p className="text-xl font-black text-slate-800 tracking-tight bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">{user.email}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">Authority Level</label>
                                        <div>
                                            <span className="px-6 py-2 bg-blue-50 text-[#002d5b] rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100/50 inline-block mt-2">
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                    {user.institution && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">Institutional Affiliation</label>
                                            <p className="text-sm font-black text-slate-600 tracking-wide mt-3">{user.institution.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Recent Governance Events */}
                        <section className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/20">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                                <span className="w-8 h-px bg-slate-100"></span>
                                Security Audit Log
                            </h3>
                            
                            <div className="space-y-6">
                                {userLogs.map((log) => (
                                    <div key={log.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#002d5b] shadow-xl shadow-slate-200/50 group-hover:scale-110 transition-transform">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-3.44A9.59 9.59 0 013 12c0-5.247 4.253-9.5 9.5-9.5s9.5 4.253 9.5 9.5a9.59 9.59 0 01-2.181 6.016M18 12.8C18 14.567 16.567 16 14.8 16c-1.767 0-3.2-1.433-3.2-3.2s1.433-3.2 3.2-3.2c1.767 0 3.2 1.433 3.2 3.2z"></path></svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 uppercase tracking-tight capitalize">{log.action.replace(/_/g, ' ')}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Source: {log.ip_address}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{new Date(log.created_at).toLocaleDateString()}</p>
                                            <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-0.5">{new Date(log.created_at).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                ))}
                                {userLogs.length === 0 && (
                                    <div className="text-center py-10">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">No security events found in the current archival period.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Security Management Sidebar */}
                    <div className="space-y-12">
                        <section className="bg-[#002d5b] p-12 rounded-[3.5rem] shadow-2xl shadow-[#002d5b]/40 relative overflow-hidden text-white">
                             <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                             
                             <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.3em] mb-8 italic">Access Protocol</h3>
                             
                             <div className="mb-10">
                                {user.two_factor_confirmed_at ? (
                                    <div className="flex items-center gap-4 py-4 px-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-6">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-widest">Enhanced Security Active</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4 py-4 px-6 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-6">
                                        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white animate-pulse">
                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-widest text-amber-500">Security Compromised</span>
                                    </div>
                                )}
                                <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.1em] leading-relaxed italic px-2">Protect research integrity by maintaining secondary verification layers on your identity.</p>
                             </div>

                             <Link 
                                href="/admin/2fa/setup" 
                                className="block w-full text-center py-6 bg-white text-[#002d5b] text-[11px] font-black uppercase tracking-[0.3em] rounded-[2rem] hover:bg-slate-100 hover:-translate-y-1 active:translate-y-0 transition-all shadow-2xl"
                            >
                                {user.two_factor_confirmed_at ? 'Revise MFA Shield' : 'Initiate MFA Shield'}
                            </Link>
                        </section>

                        <section className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800">
                             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Governance Notice</h4>
                             <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic tracking-wide">
                                All profile modifications are subject to systemic monitoring. Failure to maintain secure cipher protocols may result in conditional account suspension.
                             </p>
                        </section>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
