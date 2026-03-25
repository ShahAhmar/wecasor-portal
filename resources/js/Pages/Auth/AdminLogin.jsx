import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function AdminLogin() {
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
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            <Head title="Admin Access | WeCASOR" />

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
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">System Authority</h2>
                        <div className="h-1.5 w-8 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
                        <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Administrative Clearance Required</p>
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3">Institutional Identity</label>
                            <input 
                                type="email" 
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all"
                                placeholder="administrator@wecasor.org"
                                required
                                autoFocus
                            />
                            {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 px-3">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3">Access Protocol</label>
                            <input 
                                type="password" 
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all"
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
                            <label htmlFor="remember" className="ml-4 text-[11px] font-black text-slate-500 uppercase tracking-widest cursor-pointer">Stay Authenticated</label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full flex justify-center items-center py-6 px-8 bg-slate-900 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-slate-900/20 hover:bg-black hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                            >
                                {processing ? 'Verifying Credentials...' : 'Sign In Now'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-12 text-center">
                    <button onClick={() => window.history.back()} className="text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-[0.2em] italic">
                        ← Return to Research Portal
                    </button>
                </div>
            </div>
        </div>
    );
}
