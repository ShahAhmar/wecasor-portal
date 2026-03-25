import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Forgot Password" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center mb-10">
                    <img src="/images/wecasor-logo.png" alt="WeCASOR Logo" className="h-32 md:h-40 w-auto object-contain drop-shadow-2xl transition-all hover:scale-105 duration-500" />
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Security Recovery</h2>
                <div className="h-1 w-12 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px]">
                <div className="bg-white py-10 px-6 sm:py-12 sm:px-10 border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] sm:rounded-[3rem]">
                    <div className="mb-8 text-sm text-slate-500 font-bold leading-relaxed text-center">
                        Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.
                    </div>

                    {status && (
                        <div className="mb-8 font-black text-sm text-emerald-600 bg-emerald-50 p-4 rounded-2xl text-center uppercase tracking-widest border border-emerald-100">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 text-center block">Institutional ID</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#002d5b] transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"></path></svg>
                                </div>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-[#002d5b] transition-all"
                                    placeholder="your@wecasor.org"
                                    required
                                    autoFocus
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-2">{errors.email}</p>}
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full flex justify-center items-center gap-3 py-6 px-10 bg-[#002d5b] text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-[#002d5b]/30 hover:bg-[#003d7b] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                            >
                                Send Reset Link
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>

                        <div className="text-center pt-4">
                            <Link href={route('login')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#002d5b] transition-colors">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
