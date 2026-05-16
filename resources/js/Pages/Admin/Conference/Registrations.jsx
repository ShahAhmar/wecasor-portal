import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Registrations({ registrations }) {
    return (
        <AdminLayout title="Event Registrations">
            <Head title="Event Registrations" />

            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
                <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Attendee List</h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">Manage participants for Abuja 2026</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Participant</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Role</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Institution</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Type</th>
                                <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Registered</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {registrations.map((reg) => (
                                <tr key={reg.id} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-xs group-hover:bg-[#002d5b] group-hover:text-white transition-all uppercase">
                                                {reg.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-700 leading-tight group-hover:text-[#002d5b] transition-colors">{reg.name}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{reg.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-emerald-100">
                                            {reg.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-sm font-bold text-slate-600">{reg.institution}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{reg.country}</p>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                                            reg.attendance_type === 'Physical' ? 'bg-[#002d5b] text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {reg.attendance_type}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <p className="text-sm font-bold text-slate-800">{new Date(reg.created_at).toLocaleDateString()}</p>
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
