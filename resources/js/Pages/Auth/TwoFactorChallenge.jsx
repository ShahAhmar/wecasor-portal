import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function TwoFactorChallenge({ email }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.2fa.verify'));
    };

    const resendCode = (e) => {
        e.preventDefault();
        post(route('admin.2fa.send'));
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            <Head title="2FA Verification | WeCASOR" />

            {/* Animated Professional Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-green-50 rounded-full blur-[100px] animate-bounce duration-[10s]"></div>
                <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-slate-50 rounded-full blur-[110px] animate-pulse duration-[8s]"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center mb-12">
                    <img 
                        src="/images/wecasor-logo.png" 
                        alt="WeCASOR" 
                        className="h-32 w-auto object-contain transition-all hover:scale-105 duration-700" 
                    />
                </div>
                
                <div className="bg-white/80 backdrop-blur-2xl py-12 px-8 sm:px-12 border border-slate-200/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[3rem]">
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.5rem] mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Security Clearance</h2>
                        <div className="h-1.5 w-8 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
                        <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Two-Factor Authentication Required</p>
                    </div>

                    <div className="text-center mb-8 px-4">
                        <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
                            A verification code was sent to:
                        </p>
                        <p className="mt-2 text-sm font-black text-slate-800">{email}</p>
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        <div>
                            <div className="relative group">
                                <input
                                    id="code"
                                    type="text"
                                    name="code"
                                    value={data.code}
                                    className="block w-full px-4 py-6 bg-slate-50/50 border border-slate-100 rounded-[2rem] text-slate-900 text-center text-4xl font-black tracking-[0.5em] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all group-hover:border-slate-200"
                                    placeholder="000000"
                                    maxLength="6"
                                    required
                                    autoFocus
                                    onChange={(e) => setData('code', e.target.value.replace(/[^0-9]/g, ''))}
                                />
                            </div>
                            {errors.code && (
                                <p className="mt-3 text-[10px] font-black text-rose-500 uppercase tracking-widest text-center">{errors.code}</p>
                            )}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing || data.code.length !== 6}
                                className="w-full flex justify-center items-center py-6 px-8 bg-slate-900 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-slate-900/20 hover:bg-black hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                {processing ? 'Verifying...' : 'Verify Access'}
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={resendCode}
                                disabled={processing}
                                className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-[0.2em] transition-colors disabled:opacity-50"
                            >
                                Resend verification code
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-[10px] font-black text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-[0.2em] italic flex items-center justify-center gap-2 mx-auto"
                    >
                        ← Cancel and Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}
