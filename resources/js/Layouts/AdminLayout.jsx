import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import ChatBot from '@/Components/ChatBot';

export default function AdminLayout({ children, title }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const navLinks = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        )},
        { name: 'Studies', href: '/admin/studies', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
        )},
        { name: 'Document Vault', href: '/admin/documents', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        )},
        { name: 'Institutions', href: '/admin/institutions', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        )},
        { name: 'Users', href: '/admin/users', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        )},
    ];

    const systemLinks = [
        { name: 'Audit Log', href: '/admin/audit', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 002-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
        )},
        { name: 'Profile', href: '/admin/profile', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        )},
        { name: 'Settings', href: '/admin/settings', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        )},
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            <Head title={title} />
            
            {/* Sidebar Overlay for Mobile */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed lg:static inset-y-0 left-0 z-[60] w-[280px] bg-white border-r border-slate-200 transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}
            >
                {/* Logo Section */}
                <div className="h-48 px-10 flex items-center justify-center border-b border-slate-100 shrink-0 overflow-hidden bg-white">
                    <img 
                        src="/images/wecasor-logo.png" 
                        alt="WeCASOR Logo" 
                        className="w-full h-full object-contain scale-125 transform transition-transform" 
                    />
                </div>

                {/* Nav Links */}
                <div className="flex-1 overflow-y-auto py-8 px-4 space-y-8 scrollbar-hide">
                    {/* Main Menu */}
                    <div>
                        <h4 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Main Menu</h4>
                        <nav className="space-y-1">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={link.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-emerald-600 transition-all group"
                                >
                                    <span className="text-slate-400 group-hover:text-emerald-500 transition-colors uppercase tracking-widest">{link.icon}</span>
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* System Section */}
                    <div>
                        <h4 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">System Repository</h4>
                        <nav className="space-y-1">
                            {systemLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={link.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-emerald-600 transition-all group"
                                >
                                    <span className="text-slate-400 group-hover:text-emerald-500 transition-colors">{link.icon}</span>
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* User Section / Logout */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <Link 
                        href="/logout" 
                        method="post" 
                        as="button" 
                        className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest hover:border-rose-500 hover:text-rose-600 transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Sign Out Account
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button 
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                        <h2 className="text-lg font-black text-slate-800 tracking-tight">{title}</h2>
                    </div>

                    <div className="flex items-center gap-6 relative">
                        {/* Notifications */}
                        <div className="relative">
                            <button 
                                onClick={() => setNotificationsOpen(!notificationsOpen)}
                                className="p-2 text-slate-400 hover:text-slate-600 relative rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                            </button>

                            {notificationsOpen && (
                                <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-[100] transform origin-top-right transition-all">
                                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Notifications</h3>
                                        <span className="px-2 py-0.5 bg-rose-50 text-rose-500 text-[10px] font-black rounded-lg">1 NEW</span>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                                            <p className="text-[11px] font-bold text-slate-800 leading-relaxed">System Update: High-speed Groq Link is now active across all research modules.</p>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-2 italic">Just now</p>
                                        </div>
                                    </div>
                                    <button className="w-full py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-t border-slate-50 hover:bg-slate-50 transition-colors">
                                        Clear History
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Profile Snippet / Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 pl-6 border-l border-slate-200 group focus:outline-none"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-black text-slate-800 tracking-tight">System Admin</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Administrator</p>
                                </div>
                                <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform uppercase">
                                    SY
                                </div>
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-[100]">
                                    <div className="p-2 space-y-1">
                                        <Link 
                                            href="/admin/profile" 
                                            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 text-emerald-600 font-bold text-xs uppercase tracking-widest border border-slate-100/50"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                            My Credentials
                                        </Link>
                                        <Link 
                                            href="/admin/settings" 
                                            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 hover:text-slate-800 transition-colors"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
                                            Portal Logic
                                        </Link>
                                        <div className="h-px bg-slate-50 mx-4 my-1"></div>
                                        <Link 
                                            href="/logout" 
                                            method="post" 
                                            as="button"
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-50 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                            Sign Out
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
                    {children}
                </div>

                {/* WeCASOR AI Assistant */}
                <ChatBot />
            </main>
        </div>
    );
}
