@extends('layouts.admin')

@section('title', 'Register New Study')

@section('content')
<div class="space-y-6">
    <!-- Breadcrumbs -->
    <nav class="flex text-xs font-medium text-slate-400 gap-2 items-center">
        <a href="/admin/dashboard" class="hover:text-emerald-600 transition-colors">Dashboard</a>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        <a href="/admin/studies" class="hover:text-emerald-600 transition-colors">Studies</a>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        <span class="text-slate-600">Register Study</span>
    </nav>

    <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-4xl">
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Technical Data Configuration</h2>
            <p class="text-xs text-slate-400 font-medium mt-1 uppercase tracking-widest">Register a new research project</p>
        </div>

        <form action="{{ route('studies.store') }}" method="POST" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @csrf
            
            <div class="md:col-span-2">
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Study Title</label>
                <input type="text" name="title" required value="{{ old('title') }}" placeholder="Enter full research title"
                    class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none">
            </div>

            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Study Code</label>
                <input type="text" name="study_code" required value="{{ old('study_code') }}" placeholder="e.g. WCS-2026-001"
                    class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none">
            </div>

            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Operational Status</label>
                <select name="status" required class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none appearance-none">
                    <option value="planning" {{ old('status') === 'planning' ? 'selected' : '' }}>Planning Phase</option>
                    <option value="active" {{ old('status') === 'active' ? 'selected' : '' }}>Active Collection</option>
                    <option value="closed" {{ old('status') === 'closed' ? 'selected' : '' }}>Closed/Completed</option>
                </select>
            </div>

            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Enrollment Goal (Total Pts)</label>
                <input type="number" name="target_enrollment" required value="{{ old('target_enrollment', 100) }}" 
                    class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none">
                <p class="text-[9px] text-slate-400 mt-1 italic">Used for Data Completeness calculation.</p>
            </div>

            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Follow-up Goal (Pts)</label>
                <input type="number" name="expected_follow_up" required value="{{ old('expected_follow_up', 90) }}" 
                    class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none">
                <p class="text-[9px] text-slate-400 mt-1 italic">Used for Follow-up Rate calculation.</p>
            </div>

            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Principal Investigator</label>
                <input type="text" name="pi_name" value="{{ old('pi_name') }}" placeholder="Name of PI"
                    class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none">
            </div>

            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Activation Date</label>
                <input type="date" name="start_date" value="{{ old('start_date') }}" 
                    class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none">
            </div>

            <div class="md:col-span-2">
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Registry Description</label>
                <textarea name="description" rows="4" placeholder="Provide a brief overview of the research..."
                    class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none">{{ old('description') }}</textarea>
            </div>

            <div class="md:col-span-2 pt-4 flex gap-3">
                <button type="submit" class="px-8 py-3.5 bg-[#002d5b] text-white rounded-xl font-bold shadow-lg shadow-[#002d5b]/20 hover:bg-[#003d7b] active:scale-[0.98] transition-all text-xs uppercase tracking-widest">
                    Save Study Record
                </button>
                <a href="{{ route('studies.index') }}" class="px-8 py-3.5 bg-slate-100 text-slate-500 rounded-xl font-bold hover:bg-slate-200 transition-all text-xs uppercase tracking-widest">
                    Cancel
                </a>
            </div>
        </form>
    </div>
</div>
@endsection
