@extends('layouts.admin')

@section('title', 'Institution Profile')

@section('content')
<div class="space-y-6">
    <!-- Breadcrumbs -->
    <nav class="flex text-xs font-medium text-slate-400 gap-2 items-center">
        <a href="/admin/dashboard" class="hover:text-emerald-600 transition-colors">Dashboard</a>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        <a href="/admin/institutions" class="hover:text-emerald-600 transition-colors">Participating Sites</a>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        <span class="text-slate-600">{{ $institution->name }}</span>
    </nav>

    <!-- Institution Header -->
    <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h2 class="text-3xl font-bold text-slate-800 tracking-tight">{{ $institution->name }}</h2>
                <div class="mt-2 flex items-center gap-3">
                    <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
                        {{ $institution->status ?? 'Active Site' }}
                    </span>
                    <span class="text-xs text-slate-400 font-medium">Location: {{ $institution->city }}, {{ $institution->country }}</span>
                </div>
            </div>
            <div class="flex gap-2">
                <a href="{{ route('institutions.edit', $institution) }}" class="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-[#002d5b]/5 rounded-xl text-sm font-bold transition-all border border-slate-100">Edit Details</a>
                @can('manage users')
                <a href="{{ route('users.create', ['institution_id' => $institution->id]) }}" class="px-4 py-2 bg-[#002d5b] text-white hover:bg-[#003d7b] rounded-xl text-sm font-bold shadow-md shadow-[#002d5b]/20 transition-all">Add Staff</a>
                @endcan
            </div>
        </div>
        <div class="flex flex-wrap gap-6 mt-8 pt-8 border-t border-slate-50">
            <div class="flex items-center gap-2">
                <div class="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase font-bold text-slate-400 tracking-widest text-nowrap">Institution Type</p>
                    <p class="text-xs font-bold text-slate-700 capitalize">{{ str_replace('_', ' ', $institution->type) }}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 100-4H5a2 2 0 100 4z"></path></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Contact Email</p>
                    <p class="text-xs font-bold text-slate-700">{{ $institution->email }}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase font-bold text-slate-400 tracking-widest text-nowrap">Primary PI</p>
                    <p class="text-xs font-bold text-slate-700">{{ $institution->contact_person }}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <div class="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Phone</p>
                    <p class="text-xs font-bold text-slate-700">{{ $institution->phone ?? 'N/A' }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div class="flex items-center gap-3 text-emerald-600 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <span class="text-[10px] uppercase font-bold tracking-widest text-slate-400">Related Studies</span>
            </div>
            <div class="text-2xl font-bold text-slate-800">{{ $institution->studies->count() }}</div>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div class="flex items-center gap-3 text-blue-600 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                <span class="text-[10px] uppercase font-bold tracking-widest text-slate-400">Assigned Staff</span>
            </div>
            <div class="text-2xl font-bold text-slate-800">{{ $institution->users->count() }}</div>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div class="flex items-center gap-3 text-indigo-600 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span class="text-[10px] uppercase font-bold tracking-widest text-slate-400">Submissions</span>
            </div>
            <div class="text-2xl font-bold text-slate-800">{{ $institution->dataSubmissions->count() ?? '0' }}</div>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div class="flex items-center gap-3 text-orange-600 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <span class="text-[10px] uppercase font-bold tracking-widest text-slate-400">Activity Level</span>
            </div>
            <div class="text-2xl font-bold text-slate-800">High</div>
        </div>
    </div>

    <!-- Tabs/Content Container -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]" x-data="{ tab: 'studies' }">
        <div class="border-b border-slate-100 px-8">
            <nav class="flex gap-8">
                <button 
                    @click="tab = 'studies'"
                    :class="tab === 'studies' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'"
                    class="py-4 text-sm font-bold border-b-2 tracking-tight transition-all">
                    Studies Portfolio
                </button>
                <button 
                    @click="tab = 'team'"
                    :class="tab === 'team' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'"
                    class="py-4 text-sm font-bold border-b-2 tracking-tight transition-all">
                    Research Team
                </button>
                <button 
                    @click="tab = 'ethics'"
                    :class="tab === 'ethics' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'"
                    class="py-4 text-sm font-bold border-b-2 tracking-tight transition-all">
                    Compliance & Ethics
                </button>
            </nav>
        </div>

        <div class="p-8">
            <!-- Studies Portfolio Tab -->
            <div x-show="tab === 'studies'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                @forelse($institution->studies as $study)
                <div class="bg-white p-6 rounded-2xl border border-slate-50 shadow-sm hover:border-emerald-100 transition-all flex items-center justify-between group">
                    <div>
                        <h4 class="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors leading-tight mb-1">{{ $study->title }}</h4>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ $study->study_code }}</span>
                    </div>
                    <a href="{{ route('studies.show', $study) }}" class="p-2 text-slate-400 hover:text-emerald-600 transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </div>
                @empty
                <div class="col-span-2 py-10 text-center opacity-30 italic text-slate-500 text-sm">
                    No studies associated with this institution yet.
                </div>
                @endforelse
            </div>

            <!-- Research Team Tab -->
            <div x-show="tab === 'team'" style="display: none;">
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="border-b border-slate-50">
                                <th class="pb-4 text-[10px] uppercase font-bold text-slate-400 tracking-widest">Team Member</th>
                                <th class="pb-4 text-[10px] uppercase font-bold text-slate-400 tracking-widest">Role</th>
                                <th class="pb-4 text-[10px] uppercase font-bold text-slate-400 tracking-widest">Status</th>
                                <th class="pb-4"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                            @forelse($institution->users as $user)
                            <tr>
                                <td class="py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 uppercase">
                                            {{ substr($user->name, 0, 2) }}
                                        </div>
                                        <div>
                                            <p class="text-sm font-bold text-slate-700">{{ $user->name }}</p>
                                            <p class="text-[10px] text-slate-400">{{ $user->email }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {{ $user->getRoleNames()->first() ?? 'Staff' }}
                                </td>
                                <td class="py-4">
                                    <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600">Active</span>
                                </td>
                                <td class="py-4 text-right">
                                    <a href="{{ route('users.edit', $user) }}" class="text-xs font-bold text-emerald-600 hover:text-emerald-700">Manage</a>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="4" class="py-10 text-center opacity-30 italic text-slate-500 text-sm">
                                    No staff members registered for this site.
                                </td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Compliance & Ethics Tab -->
            <div x-show="tab === 'ethics'" style="display: none;">
                <div class="grid grid-cols-1 gap-4">
                    @forelse($institution->ethicsApplications ?? [] as $app)
                    <div class="p-4 rounded-xl border border-slate-50 bg-slate-50/30 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-emerald-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 001.003 11c0-5.523 4.477-10 10-10s10 4.477 10 10a10.003 10.003 0 01-7.812 9.771l-.054.09A10.003 10.003 0 0112 21c-4.477 0-8.268-2.943-9.542-7"></path></svg>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-slate-700">{{ $app->reference_number }}</p>
                                <p class="text-[10px] text-slate-400 font-medium">IRB Approval Status: <span class="text-emerald-600 uppercase font-bold tracking-widest">{{ $app->status }}</span></p>
                            </div>
                        </div>
                        <a href="#" class="text-[10px] font-bold uppercase tracking-widest text-[#002d5b] hover:underline">View Certificate</a>
                    </div>
                    @empty
                    <div class="py-10 text-center opacity-30 italic text-slate-500 text-sm">
                        No ethics documentation records found for this site.
                    </div>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
