import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function TwoFactorSetup({ qrCode, qrCodeUrl }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.2fa.confirm'));
    };

    return (
        <div className="min-h-screen bg-[#001a35] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <Head title="2FA Setup" />
            
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center mb-8">
                    <img src="/images/wecasor-logo.png" alt="WeCASOR Logo" className="h-24 w-auto drop-shadow-2xl" />
                </div>
                
                <div className="bg-white/95 backdrop-blur-xl py-10 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] border border-white/20 text-center">
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Security Setup</h2>
                        <div className="h-1 w-12 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
                        <p className="mt-4 text-sm font-bold text-slate-500">
                            Scan this QR code with your Authenticator app.
                        </p>
                    </div>

                    <div className="flex justify-center mb-8 p-4 bg-white rounded-3xl shadow-inner border border-slate-100">
                        <div dangerouslySetInnerHTML={{ __html: qrCode }} />
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <input
                                id="code"
                                type="text"
                                name="code"
                                value={data.code}
                                className="block w-full px-4 py-5 bg-slate-50/50 border-2 border-slate-100 rounded-2xl text-slate-900 text-center text-2xl font-black tracking-widest focus:outline-none focus:border-emerald-500 transition-all"
                                placeholder="ENTER CODE"
                                maxLength="6"
                                required
                                onChange={(e) => setData('code', e.target.value)}
                            />
                            {errors.code && (
                                <p className="mt-2 text-xs font-bold text-rose-500 uppercase tracking-widest">{errors.code}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-5 px-4 rounded-2xl shadow-xl text-sm font-black uppercase tracking-widest text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 transition-all active:scale-[0.98] disabled:opacity-70"
                        >
                            {processing ? 'Confirming...' : 'Activate Security'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 italic text-[10px] text-slate-400 font-medium">
                        Secure Research Portal Verification Layer
                    </div>
                </div>
            </div>
        </div>
    );
}
