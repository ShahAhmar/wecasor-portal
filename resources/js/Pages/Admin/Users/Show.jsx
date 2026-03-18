import React, { useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Show({ user, roles, institutions, mode }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || '',
        institution_id: user.institution_id || '',
        status: user.status || 'Active',
    });

    const submit = (e) => {
        e.preventDefault();
        if (mode === 'create') {
            post('/admin/users');
        } else {
            put(`/admin/users/${user.id}`);
        }
    };

    return (
        <AdminLayout title={mode === 'create' ? "Identity Initiation" : "Identity Modification"}>
            <Head title={mode === 'create' ? "Create User" : "Edit User"} />

            <div className="max-w-4xl mx-auto py-12 px-4">
                <form onSubmit={submit} className="space-y-12">
                    {/* Header Summary */}
                    <div className="flex items-center justify-between px-6">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                                {mode === 'create' ? 'Personnel Onboarding' : 'Clearance Update'}
                            </h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 px-1">
                                {mode === 'create' ? 'Registering new system-level credentials' : `Modifying registry for ${user.name}`}
                            </p>
                        </div>
                        <Link href="/admin/users" className="text-[10px] font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-[0.2em] px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 italic">Abort Operation</Link>
                    </div>

                    {/* Registry Data Block */}
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            {/* Personal Details */}
                            <div className="md:col-span-2 flex items-center gap-4 mb-4">
                                <div className="h-0.5 flex-1 bg-slate-100"></div>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Core Credentials</span>
                                <div className="h-0.5 flex-1 bg-slate-100"></div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Full Identity Name</label>
                                <input 
                                    type="text" 
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-[#002d5b] transition-all"
                                    placeholder="e.g., Ahmar Alvi"
                                />
                                {errors.name && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 px-2">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Digital Mailbox</label>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-[#002d5b] transition-all"
                                    placeholder="name@wecasor.org"
                                />
                                {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 px-2">{errors.email}</p>}
                            </div>

                            {/* Access Protocol */}
                            <div className="md:col-span-2 flex items-center gap-4 py-4">
                                <div className="h-0.5 flex-1 bg-slate-100"></div>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Governance & Clearance</span>
                                <div className="h-0.5 flex-1 bg-slate-100"></div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">System Authority Role</label>
                                <select 
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-[11px] font-black uppercase tracking-widest text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-[#002d5b] transition-all appearance-none"
                                >
                                    <option value="">Define Authority</option>
                                    {roles.map(role => (
                                        <option key={role.id} value={role.name}>{role.name}</option>
                                    ))}
                                </select>
                                {errors.role && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 px-2">{errors.role}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Research Affiliation</label>
                                <select 
                                    value={data.institution_id}
                                    onChange={e => setData('institution_id', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-[11px] font-black uppercase tracking-widest text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-[#002d5b] transition-all appearance-none"
                                >
                                    <option value="">Global Governance (Internal)</option>
                                    {institutions.map(inst => (
                                        <option key={inst.id} value={inst.id}>{inst.name}</option>
                                    ))}
                                </select>
                                {errors.institution_id && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 px-2">{errors.institution_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Access Status</label>
                                <select 
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-[11px] font-black uppercase tracking-widest text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-[#002d5b] transition-all appearance-none"
                                >
                                    <option value="Active">Authorized / Active</option>
                                    <option value="Inactive">Restricted / Inactive</option>
                                    <option value="Pending">Conditional / Pending</option>
                                </select>
                                {errors.status && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 px-2">{errors.status}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{mode === 'create' ? 'Security Cipher' : 'Revise Cipher (Optional)'}</label>
                                <input 
                                    type="password" 
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-[#002d5b] transition-all"
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 px-2">{errors.password}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Action Block */}
                    <div className="flex items-center justify-between px-8">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest max-w-[200px]">Identity management is subject to strict governance audit protocols.</p>
                         </div>
                         <button 
                            type="submit" 
                            disabled={processing}
                            className="px-16 py-6 bg-[#002d5b] text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-[#002d5b]/40 hover:bg-[#003d7b] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                        >
                            {mode === 'create' ? 'Commit Identity' : 'Save Protocol'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
