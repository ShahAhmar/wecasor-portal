import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import BaselineForm from './Forms/BaselineForm';
import DischargeForm from './Forms/DischargeForm';
import FollowUpForm from './Forms/FollowUpForm';

export default function Crfs({ auth, subject }) {
    const [activeTab, setActiveTab] = useState('baseline');

    const renderForm = () => {
        switch (activeTab) {
            case 'baseline': return <BaselineForm subject={subject} />;
            case 'discharge': return <DischargeForm subject={subject} />;
            case 'followup': return <FollowUpForm subject={subject} />;
            default: return <BaselineForm subject={subject} />;
        }
    };

    return (
        <AdminLayout user={auth?.user}>
            <Head title={`Clinical eCRFs - ${subject.subject_code}`} />

            <div className="min-h-screen bg-slate-50 p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={`/admin/subjects/${subject.id}/timeline`} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Clinical Forms (eCRF)</h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">Data Capture Registry for {subject.subject_code}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1">
                    <div className="flex border-b border-slate-100 bg-slate-50 overflow-x-auto">
                        <button 
                            onClick={() => setActiveTab('baseline')}
                            className={`px-8 py-4 font-bold text-sm whitespace-nowrap transition-all ${activeTab === 'baseline' ? 'border-b-2 border-blue-600 text-blue-600 bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
                        >
                            Baseline Assessment
                        </button>
                        <button 
                            onClick={() => setActiveTab('discharge')}
                            className={`px-8 py-4 font-bold text-sm whitespace-nowrap transition-all ${activeTab === 'discharge' ? 'border-b-2 border-blue-600 text-blue-600 bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
                        >
                            Discharge Summary
                        </button>
                        <button 
                            onClick={() => setActiveTab('followup')}
                            className={`px-8 py-4 font-bold text-sm whitespace-nowrap transition-all ${activeTab === 'followup' ? 'border-b-2 border-blue-600 text-blue-600 bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
                        >
                            Follow-Up (90 Day)
                        </button>
                    </div>
                    
                    <div className="p-8 flex-1 bg-slate-50/30">
                        {renderForm()}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
