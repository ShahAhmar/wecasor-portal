import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function FollowUpForm({ subject }) {
    const { data, setData, post, processing, errors } = useForm({
        visit_type: '',
        visit_date: '',
        mrs_score: '',
        alive: '',
        rehospitalized_since_last_contact: '',
        medication_continuity: '',
        status: 'draft'
    });

    const handleSubmit = (e, asDraft = false) => {
        e.preventDefault();
        setData('status', asDraft ? 'draft' : 'submitted');
        post(`/admin/subjects/${subject.id}/crf/followup`, {
            preserveScroll: true,
            onSuccess: () => alert(asDraft ? 'Draft Saved Successfully' : 'Follow Up Form Submitted')
        });
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-4xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-800">3. Standard Verification Follow-Up</h3>
                <span className="bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">Version 2.0</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Visit Type</label>
                    <select 
                        value={data.visit_type} onChange={e => setData('visit_type', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Visit Checkpoint</option>
                        <option value="30-day">30-Day Follow-Up</option>
                        <option value="90-day">90-Day Follow-Up</option>
                        <option value="180-day">180-Day Follow-Up</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Date of Contact</label>
                    <input type="date" 
                        value={data.visit_date} onChange={e => setData('visit_date', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Modified Rankin Scale (mRS)</label>
                    <select 
                        value={data.mrs_score} onChange={e => setData('mrs_score', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Score</option>
                        <option value="0">0 - No symptoms</option>
                        <option value="1">1 - No significant disability</option>
                        <option value="2">2 - Slight disability</option>
                        <option value="3">3 - Moderate disability</option>
                        <option value="4">4 - Moderately severe disability</option>
                        <option value="5">5 - Severe disability (bedridden)</option>
                        <option value="6">6 - Dead</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Patient Alive?</label>
                    <select 
                        value={data.alive} onChange={e => setData('alive', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Rehospitalized Since Last Visit?</label>
                    <select 
                        value={data.rehospitalized_since_last_contact} onChange={e => setData('rehospitalized_since_last_contact', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Answer</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Medication Continuity</label>
                    <select 
                        value={data.medication_continuity} onChange={e => setData('medication_continuity', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Answer</option>
                        <option value="Fully Compliant">Fully Compliant</option>
                        <option value="Partially Compliant">Partially Compliant</option>
                        <option value="Non-Compliant">Non-Compliant</option>
                    </select>
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
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md shadow-indigo-200"
                >
                    Submit Follow-Up Form
                </button>
            </div>
        </form>
    );
}
