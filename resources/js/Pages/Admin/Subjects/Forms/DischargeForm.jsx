import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function DischargeForm({ subject }) {
    const { data, setData, post, processing, errors } = useForm({
        discharge_date: '',
        discharge_status: '',
        discharge_destination: '',
        length_of_stay: '',
        medication_at_discharge: '',
        status: 'draft'
    });

    const handleSubmit = (e, asDraft = false) => {
        e.preventDefault();
        setData('status', asDraft ? 'draft' : 'submitted');
        post(`/admin/subjects/${subject.id}/crf/discharge`, {
            preserveScroll: true,
            onSuccess: () => alert(asDraft ? 'Draft Saved Successfully' : 'Discharge Form Submitted')
        });
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-4xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-800">2. Discharge Summary</h3>
                <span className="bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">Version 2.0</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Discharge Date</label>
                    <input type="date" 
                        value={data.discharge_date} onChange={e => setData('discharge_date', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Discharge Status</label>
                    <select 
                        value={data.discharge_status} onChange={e => setData('discharge_status', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Status</option>
                        <option value="Alive">Alive</option>
                        <option value="Deceased">Deceased</option>
                        <option value="Transferred">Transferred out of facility</option>
                    </select>
                </div>
                
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Discharge Destination</label>
                    <select 
                        value={data.discharge_destination} onChange={e => setData('discharge_destination', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Destination</option>
                        <option value="Home">Home (Discharged to environment)</option>
                        <option value="Rehabilitation Center">Inpatient Rehabilitation Center</option>
                        <option value="Nursing Home">Skilled Nursing Facility</option>
                        <option value="Hospice">Hospice Care</option>
                    </select>
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Medications List at Discharge</label>
                    <textarea 
                        value={data.medication_at_discharge} onChange={e => setData('medication_at_discharge', e.target.value)} 
                        rows="3"
                        placeholder="E.g., Aspirin 81mg, Atorvastatin 40mg..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <button 
                    type="button" 
                    disabled={processing} 
                    onClick={(e) => handleSubmit(e, true)}
                    className="bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-800 text-slate-600 px-6 py-3 rounded-xl font-bold transition-all shadow-sm"
                >
                    Save as Draft
                </button>
                <button 
                    type="submit" 
                    disabled={processing} 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md shadow-emerald-200"
                >
                    Submit Discharge Form
                </button>
            </div>
        </form>
    );
}
