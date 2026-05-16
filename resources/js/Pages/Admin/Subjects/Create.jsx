import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, sites, studies, default_site_id }) {
    const { data, setData, post, processing, errors } = useForm({
        subject_code: '',
        site_id: default_site_id || '',
        study_id: '',
        status: 'screened',
        screening_date: '',
        enrollment_date: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/subjects');
    };

    return (
        <AdminLayout title="Register New Patient" auth={auth}>
            <Head title="Register New Patient" />
            
            <div className="max-w-3xl mx-auto mt-6">
                <form onSubmit={submit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="mb-8 border-b border-slate-100 pb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Add New Subject</h2>
                            <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest text-emerald-600">Patient Enrollment Form</p>
                        </div>
                        <Link href={default_site_id ? `/admin/institutions/${default_site_id}/workspace/enrollment` : "/admin/subjects"} className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest transition-colors bg-slate-50 px-4 py-2 rounded-xl">
                            Cancel
                        </Link>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Subject ID / Code</label>
                                <input
                                    type="text"
                                    value={data.subject_code}
                                    onChange={e => setData('subject_code', e.target.value)}
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl px-4 font-bold text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                    placeholder="e.g. NGA-001"
                                    required
                                />
                                {errors.subject_code && <div className="text-rose-500 text-xs mt-1 font-bold">{errors.subject_code}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Status</label>
                                <select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl px-4 font-bold text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                    required
                                >
                                    <option value="screened">Screened</option>
                                    <option value="enrolled">Enrolled</option>
                                    <option value="withdrawn">Withdrawn</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Assign to Site</label>
                                <select
                                    value={data.site_id}
                                    onChange={e => setData('site_id', e.target.value)}
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl px-4 font-bold text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                    required
                                >
                                    <option value="">-- Choose Site --</option>
                                    {sites.map(site => (
                                        <option key={site.id} value={site.id}>{site.name}</option>
                                    ))}
                                </select>
                                {errors.site_id && <div className="text-rose-500 text-xs mt-1 font-bold">{errors.site_id}</div>}
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Assign to Study</label>
                                <select
                                    value={data.study_id}
                                    onChange={e => setData('study_id', e.target.value)}
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl px-4 font-bold text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                    required
                                >
                                    <option value="">-- Choose Study --</option>
                                    {studies.map(study => (
                                        <option key={study.id} value={study.id}>{study.title}</option>
                                    ))}
                                </select>
                                {errors.study_id && <div className="text-rose-500 text-xs mt-1 font-bold">{errors.study_id}</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Screening Date</label>
                                <input
                                    type="date"
                                    value={data.screening_date}
                                    onChange={e => setData('screening_date', e.target.value)}
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl px-4 font-bold text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Enrollment Date</label>
                                <input
                                    type="date"
                                    value={data.enrollment_date}
                                    onChange={e => setData('enrollment_date', e.target.value)}
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl px-4 font-bold text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-emerald-600 text-white h-12 px-8 rounded-2xl text-sm font-black custom-hover-effect disabled:opacity-50 tracking-widest uppercase shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.4)]"
                        >
                            Complete Registration
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
