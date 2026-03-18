@extends('layouts.admin')

@section('title', 'Participating Sites')

@section('content')
<div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Participating Sites</h1>
        </div>
        @can('manage institutions')
        <a href="{{ route('institutions.create') }}" class="px-5 py-2.5 bg-[#002d5b] text-white rounded-xl font-bold text-xs shadow-md shadow-[#002d5b]/10 hover:bg-[#003d7b] transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Add Institution
        </a>
        @endcan
    </div>

    <!-- Filter Bar -->
    <div class="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div class="flex-1 relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" placeholder="Search institutions..." class="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 text-slate-600 transition-all">
        </div>
        <div class="flex gap-2">
            <select class="pl-4 pr-10 py-2 bg-slate-50 border-none rounded-xl text-sm text-slate-600 font-medium focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer">
                <option>All Countries</option>
            </select>
            <select class="pl-4 pr-10 py-2 bg-slate-50 border-none rounded-xl text-sm text-slate-600 font-medium focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer">
                <option>All Statuses</option>
            </select>
        </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @forelse($institutions as $institution)
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#059669]/20 transition-all overflow-hidden flex flex-col p-6 group">
            <div class="flex justify-between items-start mb-6">
                <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ substr($institution->country, 0, 2) }}</span>
                    <span class="text-xs font-semibold text-slate-600 tracking-tight">{{ $institution->country }}</span>
                </div>
                <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {{ $institution->status ?? 'Active' }}
                </span>
            </div>

            <div class="mb-6 flex-1">
                <h3 class="text-lg font-bold text-slate-800 tracking-tight group-hover:text-[#002d5b] transition-colors leading-tight mb-2">{{ $institution->name }}</h3>
                <div class="space-y-2">
                    <div class="flex items-center gap-2 text-slate-400">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span class="text-xs font-medium">{{ $institution->city ?? 'Ibadan' }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-slate-400">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        <span class="text-xs font-medium">{{ $institution->contact_person ?? 'Dr. Adewale Okafor' }}</span>
                    </div>
                </div>
            </div>

            <div class="pt-4 border-t border-slate-50 flex items-center justify-between mb-6">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Ethics Approval:</span>
                <div class="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    <span class="text-[10px] font-bold uppercase tracking-tight">Yes</span>
                </div>
            </div>

            <div class="flex gap-2">
                <a href="{{ route('institutions.show', $institution) }}" class="flex-1 text-center py-2.5 bg-slate-50 text-slate-600 hover:bg-[#002d5b]/5 rounded-xl text-xs font-bold transition-all border border-slate-100">View Details</a>
                <a href="{{ route('institutions.edit', $institution) }}" class="p-2.5 text-slate-400 hover:text-[#059669] hover:bg-[#059669]/5 border border-slate-100 rounded-xl transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </a>
            </div>
        </div>
        @empty
        <div class="col-span-full py-20 text-center">
            <div class="flex flex-col items-center opacity-40">
                <svg class="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                <p class="text-slate-500 font-medium text-lg italic tracking-tight">No participating sites found.</p>
            </div>
        </div>
        @endforelse
    </div>

    @if($institutions->hasPages())
    <div class="pt-8">
        {{ $institutions->links() }}
    </div>
    @endif
</div>
@endsection
