import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function TwoFactorChallenge() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.2fa.verify'));
    };

    return (
        <div className="min-h-screen bg-[#001a35] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <Head title="2FA Verification" />
            
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center mb-8">
                    <img src="/images/wecasor-logo.png" alt="WeCASOR Logo" className="h-24 w-auto drop-shadow-2xl" />
                </div>
                
                <div className="bg-white/95 backdrop-blur-xl py-10 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] border border-white/20">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">2FA Verification</h2>
                        <div className="h-1 w-12 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
                        <p className="mt-4 text-sm font-bold text-slate-500 leading-relaxed">
                            Please enter the 6-digit verification code from your authenticator app to continue.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <div className="relative group">
                                <input
                                    id="code"
                                    type="text"
                                    name="code"
                                    value={data.code}
                                    className="block w-full px-4 py-5 bg-slate-50/50 border-2 border-slate-100 rounded-2xl text-slate-900 text-center text-3xl font-black tracking-[0.5em] focus:outline-none focus:border-emerald-500 focus:bg-white transition-all group-hover:border-slate-200"
                                    placeholder="000000"
                                    maxLength="6"
                                    required
                                    autoFocus
                                    onChange={(e) => setData('code', e.target.value)}
                                />
                            </div>
                            {errors.code && (
                                <p className="mt-2 text-xs font-bold text-rose-500 uppercase tracking-wider text-center">{errors.code}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center py-5 px-4 border border-transparent rounded-2xl shadow-xl text-sm font-black uppercase tracking-[0.2em] text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform active:scale-[0.98] disabled:opacity-70"
                            >
                                {processing ? 'Verifying...' : 'Verify Access'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-xs font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 8.959 8.959 0 01-9 9 8.959 8.959 0 01-9-9z"></path></svg>
                            Cancel and Logout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
