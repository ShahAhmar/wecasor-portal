import React, { useState } from 'react';
import SiteWorkspaceLayout from '@/Layouts/SiteWorkspaceLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Team({ auth, site, team, unassignedUsers }) {
    const [showAssignForm, setShowAssignForm] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        user_id: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/admin/institutions/${site.id}/workspace/team/assign`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowAssignForm(false);
                reset('user_id');
            }
        });
    };
    return (
        <SiteWorkspaceLayout auth={auth} site={site}>
            <Head title={`Site Team - ${site.name}`} />
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Site Staff Directory</h2>
                    <button 
                        onClick={() => setShowAssignForm(!showAssignForm)}
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors"
                    >
                        {showAssignForm ? 'Cancel Assignment' : 'Assign Member'}
                    </button>
                </div>

                {showAssignForm && (
                    <form onSubmit={submit} className="mb-8 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-end gap-4">
                        <div className="flex-1">
                            <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Select Unassigned Personnel</label>
                            <select 
                                value={data.user_id}
                                onChange={e => setData('user_id', e.target.value)}
                                className="w-full h-11 bg-white border border-slate-200 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                required
                            >
                                <option value="">-- Choose User to Assign --</option>
                                {unassignedUsers && unassignedUsers.map(u => (
                                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                                ))}
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="h-11 bg-emerald-600 text-white px-6 rounded-xl text-sm font-bold custom-hover-effect disabled:opacity-50"
                        >
                            Commit Assignment
                        </button>
                    </form>
                )}
                
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Name</th>
                            <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                            <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {team.data && team.data.length > 0 ? team.data.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50/50">
                                <td className="py-4 font-bold text-slate-700">{user.name}</td>
                                <td className="py-4 text-sm text-slate-500">{user.roles?.[0]?.name || 'Staff'}</td>
                                <td className="py-4">
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase">Active</span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="py-12 text-center text-slate-400 text-sm">No team members assigned strictly to this site yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </SiteWorkspaceLayout>
    );
}
