import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Reset Password" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center mb-10">
                    <img src="/images/wecasor-logo.png" alt="WeCASOR Logo" className="h-32 md:h-40 w-auto object-contain drop-shadow-2xl" />
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Update Security</h2>
                <div className="h-1 w-12 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px]">
                <div className="bg-white py-10 px-6 sm:py-12 sm:px-10 border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] sm:rounded-[3rem]">
                    <form onSubmit={submit} className="space-y-8">
                        <input type="hidden" name="token" value={data.token} />

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Account ID</label>
                            <input 
                                type="email" 
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all cursor-not-allowed"
                                readOnly
                                required
                            />
                            {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase mt-2 ml-2">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">New Password</label>
                            <input 
                                type="password" 
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-[#002d5b] transition-all"
                                placeholder="••••••••"
                                required
                                autoFocus
                            />
                            {errors.password && <p className="text-rose-500 text-[10px] font-black uppercase mt-2 ml-2">{errors.password}</p>}
                        </div>

                        {/* Password Confirmation */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Confirm New Password</label>
                            <input 
                                type="password" 
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-[#002d5b] transition-all"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password_confirmation && <p className="text-rose-500 text-[10px] font-black uppercase mt-2 ml-2">{errors.password_confirmation}</p>}
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full flex justify-center items-center gap-3 py-6 px-10 bg-[#002d5b] text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-[#002d5b]/30 hover:bg-[#003d7b] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                            >
                                Reset Password
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
