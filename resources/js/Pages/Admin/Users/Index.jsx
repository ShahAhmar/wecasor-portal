import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ users }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to archive this user?')) {
            router.delete(`/admin/users/${id}`);
        }
    };

    return (
        <AdminLayout title="System Governance">
            <Head title="User Management" />

            <div className="space-y-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Identity Registry</h2>
                        <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-[0.2em] px-1">Manage personnel access and security clearances</p>
                    </div>
                    <Link 
                        href="/admin/users/create" 
                        className="px-8 py-4 bg-[#002d5b] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#002d5b]/30 hover:bg-[#003d7b] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                        Initiate New Identity
                    </Link>
                </div>

                {/* Identity Cards / Table */}
                <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/40 border border-slate-200/60 overflow-hidden">
                    <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Active Personnel</h3>
                        <div className="flex items-center gap-2">
                             <span className="w-2h-2 rounded-full bg-emerald-500 w-2 h-2 animate-pulse"></span>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Operational</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Identity Details</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Role Authority</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Affiliation</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Access Status</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Protocol</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/60">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/80 transition-all group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-2xl bg-[#002d5b] flex items-center justify-center text-white font-black text-sm shadow-xl shadow-[#002d5b]/20 group-hover:scale-110 transition-transform uppercase">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 tracking-tight text-base group-hover:text-[#002d5b] transition-colors">{user.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-4 py-1.5 bg-blue-50 text-[#002d5b] rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 font-bold text-slate-600 text-sm">
                                            {user.institution?.name || 'Global Governance'}
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : user.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${user.status === 'Active' ? 'text-emerald-600' : user.status === 'Pending' ? 'text-amber-600' : 'text-slate-400'}`}>
                                                    {user.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                <Link 
                                                    href={`/admin/users/${user.id}/edit`} 
                                                    className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:text-[#002d5b] hover:border-[#002d5b] hover:shadow-xl hover:shadow-blue-500/10 transition-all active:scale-95"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-rose-600 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-500/10 transition-all active:scale-95"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
