@extends('layouts.admin')

@section('title', 'My Profile')

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="mb-8">
        <h2 class="text-3xl font-bold text-slate-800">Account Settings</h2>
        <p class="text-slate-500 mt-1">Manage your profile and security preferences.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Info -->
        <div class="lg:col-span-2 space-y-8">
            <div class="glass-panel p-8 rounded-3xl border border-slate-200 shadow-sm bg-white/50 backdrop-blur-md">
                <h3 class="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Profile Information
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
                        <p class="text-slate-700 font-medium">{{ auth()->user()->name }}</p>
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                        <p class="text-slate-700 font-medium">{{ auth()->user()->email }}</p>
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Role</label>
                        <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">{{ auth()->user()->role }}</span>
                    </div>
                    @if(auth()->user()->institution)
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Institution</label>
                        <p class="text-slate-700 font-medium">{{ auth()->user()->institution->name }}</p>
                    </div>
                    @endif
                </div>
            </div>

            <!-- Recent Activity for this User -->
            <div class="glass-panel p-8 rounded-3xl border border-slate-200 shadow-sm bg-white/50 backdrop-blur-md">
                <h3 class="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Security Activity
                </h3>
                <div class="space-y-4">
                    @php
                        $userLogs = \App\Models\AuditLog::where('user_id', auth()->id())->latest()->take(3)->get();
                    @endphp
                    @forelse($userLogs as $log)
                    <div class="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <div>
                            <p class="text-sm font-semibold text-slate-700 capitalize">{{ str_replace('_', ' ', $log->action) }}</p>
                            <p class="text-[10px] text-slate-400">{{ $log->created_at->format('M d, Y • H:i') }}</p>
                        </div>
                        <span class="text-[10px] font-mono text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">{{ $log->ip_address }}</span>
                    </div>
                    @empty
                    <p class="text-slate-400 text-sm text-center py-4 italic">No recent activity found.</p>
                    @endforelse
                </div>
            </div>
        </div>

        <!-- Security / 2FA Sidebar -->
        <div class="space-y-8">
            <div class="glass-panel p-8 rounded-3xl border border-slate-200 shadow-sm bg-white overflow-hidden relative">
                <div class="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full"></div>
                
                <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    Two-Factor Auth
                </h3>
                
                @if(auth()->user()->two_factor_confirmed_at)
                <div class="flex items-center gap-2 text-emerald-600 mb-6 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    <span class="text-sm font-bold">Enabled & Active</span>
                </div>
                <p class="text-slate-500 text-xs mb-8">Your account is secured with a secondary verification layer.</p>
                <a href="{{ route('admin.2fa.setup') }}" class="block text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all">
                    Reset 2FA
                </a>
                @else
                <div class="flex items-center gap-2 text-orange-600 mb-6 bg-orange-50 p-3 rounded-xl border border-orange-100">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                    <span class="text-sm font-bold">Not Enabled</span>
                </div>
                <p class="text-slate-500 text-xs mb-8">Protect your research data by adding an extra layer of security.</p>
                <a href="{{ route('admin.2fa.setup') }}" class="block text-center py-4 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                    Setup 2FA Now
                </a>
                @endif
            </div>

            <div class="p-6 bg-slate-900 rounded-3xl text-slate-400 text-[10px] leading-relaxed border border-slate-800">
                <p class="uppercase font-bold text-slate-500 mb-2 tracking-widest">Security Policy</p>
                Your session will automatically expire after 30 minutes of inactivity. For security reasons, please do not share your account or 2FA secrets with anyone.
            </div>
        </div>
    </div>
</div>
@endsection
