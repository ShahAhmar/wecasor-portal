import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

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
        <div className="min-h-screen bg-[#001a35] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <Head title="Admin Login" />

            {/* Background Accents for Authority Look */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#002d5b]/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-0"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-0"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
                <div className="flex justify-center mb-10">
                    <img src="/images/wecasor-logo.png" alt="WeCASOR Logo" className="h-32 md:h-40 w-auto object-contain brightness-0 invert drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all hover:scale-105 duration-500" />
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight">Admin Login</h2>
            </div>

            <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
                <div className="bg-white/10 backdrop-blur-3xl py-10 px-6 sm:py-16 sm:px-12 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] rounded-[2.5rem] sm:rounded-[4rem]">
                    <form onSubmit={submit} className="space-y-10">
                        {/* Email Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.3em] px-3">Admin Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-[#475569] group-focus-within:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                </div>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full pl-16 pr-10 py-6 bg-white/5 border border-white/5 rounded-3xl text-sm font-bold text-white placeholder:text-[#334155] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-white/20 transition-all"
                                    placeholder="admin@wecasor.com"
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-rose-400 text-[10px] font-black uppercase tracking-widest mt-3 ml-3">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-3">
                             <div className="flex justify-between px-3">
                                <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.3em]">Password</label>
                                <a href="#" className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-emerald-300 transition-colors italic">Forgot Password?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-[#475569] group-focus-within:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </div>
                                <input 
                                    type="password" 
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full pl-16 pr-10 py-6 bg-white/5 border border-white/5 rounded-3xl text-sm font-bold text-white placeholder:text-[#334155] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-white/20 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {errors.password && <p className="text-rose-400 text-[10px] font-black uppercase tracking-widest mt-3 ml-3">{errors.password}</p>}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center px-3">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="w-6 h-6 rounded-lg bg-white/5 border-white/10 text-emerald-500 focus:ring-emerald-500 transition-all cursor-pointer"
                            />
                            <label htmlFor="remember" className="ml-4 text-[11px] font-black text-[#94a3b8] uppercase tracking-widest cursor-pointer">Remember Me</label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full flex justify-center items-center gap-4 py-8 px-12 bg-white text-[#001a35] rounded-[2.5rem] text-xs font-black uppercase tracking-[0.4em] shadow-[0_25px_50px_-12px_rgba(255,255,255,0.2)] hover:bg-[#f8fafc] hover:-translate-y-1.5 active:translate-y-0 transition-all disabled:opacity-50"
                            >
                                Login
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
}
