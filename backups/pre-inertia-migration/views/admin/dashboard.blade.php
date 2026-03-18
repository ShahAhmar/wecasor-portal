@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
<div class="space-y-16">
    <!-- Premium Greeting Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-12">
        <div>
            <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-2">
                Good morning, <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#002d5b] to-emerald-600">{{ auth()->user()->name ?? 'Dr. Achu' }}</span>
            </h2>
            <p class="text-slate-500 font-medium flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Portal Status: <span class="text-slate-700 font-bold">Operational</span> • {{ now()->format('l, jS F Y') }}
            </p>
        </div>
        <div class="flex gap-3">
            <a href="/admin/studies/create" class="px-5 py-2.5 bg-[#002d5b] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#002d5b]/20 hover:bg-[#00346a] transition-all flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                Launch New Study
            </a>
        </div>
    </div>

    <!-- Redesigned Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <!-- Metric: Total Sites -->
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
            <div class="flex items-center justify-between mb-8">
                <div class="p-4 bg-blue-50 text-[#002d5b] rounded-2xl group-hover:bg-[#002d5b] group-hover:text-white transition-all duration-300">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <svg class="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    +3 <span class="text-[9px] text-slate-400 font-medium tracking-tight">Growth</span>
                </div>
            </div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Total Participating Sites</p>
            <h3 class="text-4xl font-black text-slate-900 leading-none">{{ $stats['total_institutions'] }}</h3>
            <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100 transition-all"></div>
        </div>

        <!-- Metric: Active Studies -->
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
            <div class="flex items-center justify-between mb-8">
                <div class="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <div class="text-[10px] font-black text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-lg tracking-widest">LIVE NOW</div>
            </div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Active Research Projects</p>
            <h3 class="text-4xl font-black text-slate-900 leading-none">{{ $stats['total_studies'] }}</h3>
            <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-50/50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-all"></div>
        </div>

        <!-- Metric: Vault Files -->
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
            <div class="flex items-center justify-between mb-8">
                <div class="p-4 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <div class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1">+12 <span class="text-[9px] text-slate-400 font-medium tracking-tight">New</span></div>
            </div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Secured Documents</p>
            <h3 class="text-4xl font-black text-slate-900 leading-none">{{ $stats['total_documents'] }}</h3>
            <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-amber-50/50 rounded-full blur-3xl group-hover:bg-amber-100 transition-all"></div>
        </div>

        <!-- Metric: Pending Compliance -->
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
            <div class="flex items-center justify-between mb-8">
                <div class="p-4 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
            </div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Compliance Actions</p>
            <h3 class="text-4xl font-black text-slate-900 leading-none">{{ $stats['pending_applications'] }}</h3>
            <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-red-50/50 rounded-full blur-3xl group-hover:bg-red-100 transition-all"></div>
        </div>
    </div>

    <!-- Data Tables & Insights -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-12 mt-16 pt-8 border-t border-slate-100">
        <!-- Main Portfolio Table -->
        <div class="xl:col-span-8 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden flex flex-col">
            <div class="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div>
                    <h3 class="text-xl font-black text-slate-800 tracking-tight">Research Portfolio</h3>
                    <p class="text-sm text-slate-500 font-medium mt-1">Overview of active projects and clinical trials</p>
                </div>
                <button onclick="window.location.href='/admin/studies'" class="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm">
                    View Full Portfolio
                </button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr class="bg-slate-50/50">
                            <th class="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Research Project</th>
                            <th class="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status & Phase</th>
                            <th class="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Engagement</th>
                            <th class="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Metrics</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        @foreach($allStudies as $study)
                        <tr class="hover:bg-slate-50/50 transition-all cursor-pointer group">
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-xs group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                                        {{ substr($study->title, 0, 1) }}
                                    </div>
                                    <div class="flex flex-col">
                                        <p class="font-bold text-slate-700 leading-tight group-hover:text-[#002d5b] transition-colors">{{ $study->title }}</p>
                                        <p class="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{{ $study->study_code }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-6">
                                <div class="flex flex-col gap-2">
                                    <span @class([
                                        'w-fit px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest',
                                        'bg-emerald-50 text-emerald-600 border border-emerald-100' => $study->status === 'Active' || $study->status === 'active',
                                        'bg-amber-50 text-amber-600 border border-amber-100' => $study->status === 'Planning' || $study->status === 'planning',
                                        'bg-blue-50 text-blue-600 border border-blue-100' => $study->status === 'Launching',
                                    ])>
                                        {{ $study->status }}
                                    </span>
                                    <span class="text-[10px] font-bold text-slate-400 uppercase italic">Phase 1 Early Access</span>
                                </div>
                            </td>
                            <td class="px-6 py-6">
                                <div class="flex flex-col">
                                    <div class="flex items-center gap-2 mb-2">
                                        <div class="flex -space-x-2">
                                            @for($i=0; $i<min(3, $study->institutions->count()); $i++)
                                            <div class="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600">
                                                {{ $i+1 }}
                                            </div>
                                            @endfor
                                        </div>
                                        <span class="text-[10px] font-bold text-slate-500">{{ $study->institutions->count() }} Sites Attached</span>
                                    </div>
                                    <div class="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div class="h-full bg-emerald-500 rounded-full" style="width: 65%"></div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-8 py-6 text-right">
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Update</p>
                                <p class="text-sm font-bold text-slate-800">{{ $study->updated_at->diffForHumans() }}</p>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Professional Sidebar Activity Log -->
        <div class="xl:col-span-4 bg-[#002d5b] rounded-[2rem] shadow-xl text-white overflow-hidden flex flex-col relative group">
            <!-- Glassmorphism card bg -->
            <div class="absolute inset-0 bg-emerald-600 opacity-5 group-hover:opacity-10 transition-opacity"></div>
            
            <div class="p-8 border-b border-white/5 relative z-10 flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-bold text-white">Live Activity</h3>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Audit Stream • Central System</p>
                </div>
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            
            <div class="flex-1 p-8 space-y-8 relative z-10 overflow-hidden custom-scrollbar h-[525px]">
                @foreach($recentActivity->take(6) as $activity)
                <div class="flex gap-5 group items-start relative before:absolute before:left-[15px] before:top-10 before:bottom-[-35px] before:w-0.5 before:bg-white/5 last:before:hidden">
                    <div @class([
                        'shrink-0 w-8 h-8 rounded-xl flex items-center justify-center z-10 p-2 shadow-lg transition-transform group-hover:scale-110',
                        'bg-blue-500 shadow-blue-500/20' => str_contains(strtolower($activity->action), 'login'),
                        'bg-emerald-500 shadow-emerald-500/20' => str_contains(strtolower($activity->action), 'upload') || str_contains(strtolower($activity->action), 'create'),
                        'bg-slate-500 shadow-slate-500/20 text-white' => !str_contains(strtolower($activity->action), 'login') && !str_contains(strtolower($activity->action), 'upload') && !str_contains(strtolower($activity->action), 'create'),
                    ])>
                         @if(str_contains(strtolower($activity->action), 'login'))
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        @elseif(str_contains(strtolower($activity->action), 'upload') || str_contains(strtolower($activity->action), 'create'))
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        @else
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        @endif
                    </div>
                    <div class="flex flex-col pt-0.5">
                        <p class="text-sm font-bold text-slate-100 leading-snug group-hover:text-emerald-400 transition-colors">
                            {{ $activity->user->name ?? 'System' }}
                        </p>
                        <p class="text-xs text-slate-400 font-medium mt-1">{{ strtolower(str_replace('_', ' ', $activity->action)) }}</p>
                        <p class="text-[9px] text-slate-500 mt-2 font-bold uppercase tracking-[0.15em]">{{ $activity->created_at->diffForHumans() }}</p>
                    </div>
                </div>
                @endforeach
            </div>

            <div class="p-8 border-t border-white/5 relative z-10 bg-black/5 mt-auto">
                <a href="/admin/audit" class="block w-full text-center py-3 rounded-xl border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:border-white transition-all">ACCESS FULL AUDIT REPOSITORY</a>
            </div>
        </div>
    </div>
</div>
@endsection
