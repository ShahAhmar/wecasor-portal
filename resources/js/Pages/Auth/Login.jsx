import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            <Head title="Researcher Login | WeCASOR" />

            {/* Animated Professional Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[5%] right-[-5%] w-[45%] h-[45%] bg-emerald-50 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[0%] -left-[5%] w-[35%] h-[35%] bg-blue-50/70 rounded-full blur-[100px] animate-bounce duration-[12s]"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center mb-10">
                    <img 
                        src="/images/wecasor-logo.png" 
                        alt="WeCASOR" 
                        className="h-32 w-auto object-contain hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                
                <div className="bg-white/70 backdrop-blur-2xl py-12 px-8 sm:px-12 border border-slate-200/40 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.06)] rounded-[3rem]">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight italic">Portal Entry</h2>
                        <p className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Researcher Identification</p>
                    </div>

                    {status && (
                        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">{status}</span>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-8">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3">Identity ID</label>
                            <input 
                                type="email" 
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/40 transition-all"
                                placeholder="name@wecasor.org"
                                required
                            />
                            {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 px-3">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                             <div className="flex justify-between px-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Password</label>
                                <Link href={route('password.request')} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline italic">Lost Code?</Link>
                            </div>
                            <input 
                                type="password" 
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/40 transition-all"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 px-3">{errors.password}</p>}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center px-3">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="w-5 h-5 rounded-lg border-slate-200 text-emerald-600 focus:ring-emerald-500/20 transition-all cursor-pointer"
                            />
                            <label htmlFor="remember" className="ml-4 text-[11px] font-black text-slate-500 uppercase tracking-widest cursor-pointer">Remember Identity</label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full flex justify-center items-center py-6 px-8 bg-slate-900 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-slate-900/20 hover:bg-black hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                            >
                                Authenticate
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-12 text-center text-[9px] font-bold text-slate-400 uppercase tracking-[0.5em] italic">
                    Institute for Advanced Digital Archival
                </div>
            </div>
        </div>
    );
}
