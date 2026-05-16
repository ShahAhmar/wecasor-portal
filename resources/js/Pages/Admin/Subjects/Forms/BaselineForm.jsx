import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function BaselineForm({ subject }) {
    const { data, setData, post, processing, errors } = useForm({
        screening_date: '',
        enrollment_date: '',
        age: '',
        sex: '',
        stroke_type: '',
        admission_date: '',
        blood_pressure_systolic: '',
        blood_pressure_diastolic: '',
        nihss: '',
        imaging_performed: '',
        acute_treatment_received: '',
        status: 'draft'
    });

    const handleSubmit = (e, asDraft = false) => {
        e.preventDefault();
        setData('status', asDraft ? 'draft' : 'submitted');
        post(`/admin/subjects/${subject.id}/crf/baseline`, {
            preserveScroll: true,
            onSuccess: () => alert(asDraft ? 'Draft Saved Successfully' : 'Baseline CRF Submitted')
        });
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-4xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-800">1. Baseline Demographics & Admission</h3>
                <span className="bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">Version 2.0</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
                    <input type="number" 
                        value={data.age} onChange={e => setData('age', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                        placeholder="Years" 
                    />
                    {errors.age && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.age}</p>}
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Biological Sex</label>
                    <select 
                        value={data.sex} onChange={e => setData('sex', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Stroke Subtype Confirmation</label>
                    <select 
                        value={data.stroke_type} onChange={e => setData('stroke_type', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Mechanism</option>
                        <option value="Ischemic">Ischemic</option>
                        <option value="Hemorrhagic">Hemorrhagic</option>
                        <option value="Unknown">Unknown (Missing Imaging)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Admission Date</label>
                    <input type="date" 
                        value={data.admission_date} onChange={e => setData('admission_date', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">NIHSS Admission Score</label>
                    <input type="number" 
                        value={data.nihss} onChange={e => setData('nihss', e.target.value)} 
                        min="0" max="42"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                        placeholder="0 - 42" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Acute Treatment (Thrombolysis)</label>
                    <select 
                        value={data.acute_treatment_received} onChange={e => setData('acute_treatment_received', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Treatment</option>
                        <option value="IV tPA">IV tPA Administered</option>
                        <option value="Thrombectomy">Mechanical Thrombectomy</option>
                        <option value="Both">Both</option>
                        <option value="None">None (Contraindicated/Out of Window)</option>
                    </select>
                </div>
                
                <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100 mt-4 text-sm">
                   <div>
                        <label className="block font-bold text-slate-700 mb-2">Systolic BP (mmHg)</label>
                        <input type="number" 
                            value={data.blood_pressure_systolic} onChange={e => setData('blood_pressure_systolic', e.target.value)} 
                            className="w-full border-slate-200 rounded-xl px-4 py-2" 
                        />
                   </div>
                   <div>
                        <label className="block font-bold text-slate-700 mb-2">Diastolic BP (mmHg)</label>
                        <input type="number" 
                            value={data.blood_pressure_diastolic} onChange={e => setData('blood_pressure_diastolic', e.target.value)} 
                            className="w-full border-slate-200 rounded-xl px-4 py-2" 
                        />
                   </div>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <button 
                    type="button" 
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={processing} 
                    className="bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-800 text-slate-600 px-6 py-3 rounded-xl font-bold transition-all shadow-sm"
                >
                    Save as Draft (Offline Supported)
                </button>
                <button 
                    type="submit" 
                    disabled={processing} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md shadow-blue-200"
                >
                    Submit Clinical Form
                </button>
            </div>
        </form>
    );
}
