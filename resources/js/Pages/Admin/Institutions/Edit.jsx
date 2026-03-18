import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ institution }) {
    const { data, setData, put, processing, errors } = useForm({
        name: institution.name || '',
        country: institution.country || '',
        city: institution.city || '',
        type: institution.type || 'hospital',
        contact_person: institution.contact_person || '',
        email: institution.email || '',
        phone: institution.phone || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/institutions/${institution.id}`);
    };

    return (
        <AdminLayout title={`Refining Facility: ${institution.name}`}>
            <Head title="Edit Institution" />

            <div className="max-w-4xl mx-auto py-12">
                <form onSubmit={submit} className="space-y-12">
                    {/* Facility Identification */}
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                        <h3 className="text-xl font-black text-slate-800 mb-10 tracking-tight">Facility Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Legal Entity Name</label>
                                <input 
                                    type="text" 
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                />
                                {errors.name && <p className="text-rose-500 text-[10px] font-bold uppercase mt-1">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Country</label>
                                <input 
                                    type="text" 
                                    value={data.country}
                                    onChange={e => setData('country', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                />
                                {errors.country && <p className="text-rose-500 text-[10px] font-bold uppercase mt-1">{errors.country}</p>}
                            </div>

                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">City / Region</label>
                                <input 
                                    type="text" 
                                    value={data.city}
                                    onChange={e => setData('city', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Facility Classification</label>
                                <select 
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all appearance-none"
                                >
                                    <option value="hospital">Tertiary Hospital</option>
                                    <option value="university">University Research Wing</option>
                                    <option value="private_clinic">Private Medical Center</option>
                                    <option value="government_agency">Governmental Health Agency</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Governance */}
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                        <h3 className="text-xl font-black text-slate-800 mb-10 tracking-tight">Governance & Contact</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lead Contact Person</label>
                                <input 
                                    type="text" 
                                    value={data.contact_person}
                                    onChange={e => setData('contact_person', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Official Email</label>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                />
                                {errors.email && <p className="text-rose-500 text-[10px] font-bold uppercase mt-1">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
                                <input 
                                    type="text" 
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-6 pt-4">
                        <Link href="/admin/institutions" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Discard Edits</Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="px-10 py-5 bg-[#002d5b] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#002d5b]/30 hover:bg-[#003d7b] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                        >
                            Sync Modifications
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
