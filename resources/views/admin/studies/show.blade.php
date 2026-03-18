@extends('layouts.admin')

@section('title', 'Study Dashboard')

@section('content')
<div class="space-y-6" x-data="{ tab: 'overview', showActions: false }">
    <!-- Breadcrumbs -->
    <nav class="flex text-xs font-medium text-slate-400 gap-2 items-center">
        <a href="/admin/dashboard" class="hover:text-[#059669] transition-colors">Dashboard</a>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        <a href="/admin/studies" class="hover:text-[#059669] transition-colors">Studies</a>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        <span class="text-slate-600">{{ $study->title }}</span>
    </nav>

    <!-- Study Header -->
    <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h2 class="text-3xl font-bold text-slate-800 tracking-tight">{{ $study->title }}</h2>
                <div class="mt-2 flex items-center gap-3">
                    <span @class([
                        'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        'bg-emerald-50 text-emerald-600 border border-emerald-100' => strtolower($study->status) === 'active',
                        'bg-orange-50 text-orange-600 border border-orange-100' => in_array(strtolower($study->status), ['planning', 'launching']),
                    ])>
                        {{ $study->status }}
                    </span>
                    <span class="text-xs text-slate-400 font-medium">Study Code: {{ $study->study_code }}</span>
                </div>
            </div>
            <div class="flex items-center gap-2 relative">
                <a href="{{ route('studies.edit', $study) }}" class="px-5 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-200 uppercase tracking-widest">Edit Study</a>
                <div class="relative">
                    <button @click="showActions = !showActions" @click.away="showActions = false" 
                        class="px-5 py-2.5 bg-[#002d5b] text-white hover:bg-[#003d7b] rounded-xl text-xs font-bold shadow-md shadow-[#002d5b]/20 transition-all flex items-center gap-2 uppercase tracking-widest">
                        Actions
                        <svg class="w-3 h-3 transition-transform" :class="showActions ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <!-- Actions Dropdown -->
                    <div x-show="showActions" x-transition 
                        class="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                        <a href="/admin/data-submissions" class="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">View Submissions</a>
                        <a href="/admin/documents/create?study_id={{ $study->id }}" class="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 border-t border-slate-50">Upload Document</a>
                        <form action="{{ route('studies.destroy', $study) }}" method="POST" class="border-t border-slate-50">
                            @csrf @method('DELETE')
                            <button type="submit" class="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50" onclick="return confirm('Delete this study?')">Delete Study</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <p class="text-slate-500 text-sm leading-relaxed max-w-4xl">
            {{ $study->description ?? 'No description provided for this study.' }}
        </p>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm cursor-pointer hover:border-emerald-100 transition-all" @click="tab = 'sites'">
            <div class="flex items-center gap-3 text-emerald-600 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span class="text-[10px] uppercase font-bold tracking-widest text-slate-400">Participating Sites</span>
            </div>
            <div class="text-2xl font-bold text-slate-800">{{ $study->institutions->count() }}</div>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div class="flex items-center gap-3 text-blue-600 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span class="text-[10px] uppercase font-bold tracking-widest text-slate-400">Data Completeness</span>
            </div>
            <div class="text-2xl font-bold text-slate-800">{{ $completenessRate }}%</div>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div class="flex items-center gap-3 text-indigo-600 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                <span class="text-[10px] uppercase font-bold tracking-widest text-slate-400">Follow-up Rate</span>
            </div>
            <div class="text-2xl font-bold text-slate-800">{{ $followUpRate }}%</div>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm cursor-pointer hover:border-slate-200 transition-all" @click="tab = 'documents'">
            <div class="flex items-center gap-3 text-orange-600 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                <span class="text-[10px] uppercase font-bold tracking-widest text-slate-400">Study Documents</span>
            </div>
            <div class="text-2xl font-bold text-slate-800">{{ $study->documents->count() }}</div>
        </div>
    </div>

    <!-- Tabs Container -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
        <div class="border-b border-slate-100 px-8">
            <nav class="flex gap-8">
                <button @click="tab = 'overview'" :class="tab === 'overview' ? 'border-[#002d5b] text-[#002d5b]' : 'border-transparent text-slate-400'" 
                    class="py-4 text-xs font-bold border-b-2 hover:text-slate-600 tracking-widest uppercase transition-all">Overview</button>
                <button @click="tab = 'sites'" :class="tab === 'sites' ? 'border-[#002d5b] text-[#002d5b]' : 'border-transparent text-slate-400'" 
                    class="py-4 text-xs font-bold border-b-2 hover:text-slate-600 tracking-widest uppercase transition-all">Participating Sites</button>
                <button @click="tab = 'documents'" :class="tab === 'documents' ? 'border-[#002d5b] text-[#002d5b]' : 'border-transparent text-slate-400'" 
                    class="py-4 text-xs font-bold border-b-2 hover:text-slate-600 tracking-widest uppercase transition-all">Documents</button>
                <button @click="tab = 'activity'" :class="tab === 'activity' ? 'border-[#002d5b] text-[#002d5b]' : 'border-transparent text-slate-400'" 
                    class="py-4 text-xs font-bold border-b-2 hover:text-slate-600 tracking-widest uppercase transition-all">Activity Feed</button>
            </nav>
        </div>

        <div class="p-8">
            <!-- Overview Tab -->
            <div x-show="tab === 'overview'" class="space-y-12" x-transition>
                <section>
                    <h3 class="text-xs font-bold text-slate-800 mb-8 uppercase tracking-[0.2em] text-slate-400">Study Phases Timeline</h3>
                    <div class="flex items-center w-full max-w-5xl mx-auto">
                        <div class="flex flex-col items-center">
                            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-100">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <div class="mt-2 text-center">
                                <p class="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Phase 0</p>
                                <p class="text-[9px] text-slate-400">Completed</p>
                            </div>
                        </div>
                        <div class="flex-1 h-1 bg-emerald-600 -mt-10 mx-[-5px]"></div>
                        <div class="flex flex-col items-center">
                            <div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center ring-4 ring-indigo-50 shadow-lg shadow-indigo-100">
                                <span class="font-bold text-sm">1</span>
                            </div>
                            <div class="mt-2 text-center">
                                <p class="text-[9px] font-bold text-indigo-600 uppercase tracking-tighter">Phase 1</p>
                                <p class="text-[9px] text-slate-400 italic">Active</p>
                            </div>
                        </div>
                        <div class="flex-1 h-1 bg-slate-100 -mt-10 mx-[-5px]"></div>
                        <div class="flex flex-col items-center opacity-40">
                            <div class="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                                <span class="font-bold text-sm">2</span>
                            </div>
                            <div class="mt-2 text-center">
                                <p class="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Phase 2</p>
                            </div>
                        </div>
                        <div class="flex-1 h-1 bg-slate-100 -mt-10 mx-[-5px]"></div>
                        <div class="flex flex-col items-center opacity-40">
                            <div class="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                                <span class="font-bold text-sm">3</span>
                            </div>
                            <div class="mt-2 text-center">
                                <p class="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Phase 3</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-slate-50">
                    <section>
                        <h3 class="text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-[0.2em]">Study Objectives</h3>
                        <div class="space-y-4">
                            <div class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm shadow-emerald-100">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <span class="text-xs text-slate-600 font-bold">Baseline cardiovascular metrics established</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded bg-slate-100 border border-slate-200 shrink-0"></div>
                                <span class="text-xs text-slate-500 font-semibold">Complete initial data collection phase</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded bg-slate-100 border border-slate-200 shrink-0"></div>
                                <span class="text-xs text-slate-500 font-semibold">Validate data quality across all sites</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 class="text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-[0.2em]">Key Outcomes</h3>
                        <div class="grid grid-cols-1 gap-4">
                            <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-[#002d5b]/20 transition-all">
                                <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Primary Endpoint</p>
                                <p class="text-xs font-bold text-slate-700 tracking-tight group-hover:text-[#002d5b] transition-colors">Major adverse cardiovascular events (MACE)</p>
                            </div>
                            <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-[#002d5b]/20 transition-all">
                                <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Secondary Endpoints</p>
                                <p class="text-xs font-bold text-slate-700 tracking-tight group-hover:text-[#002d5b] transition-colors">All-cause mortality, stroke, and heart failure hospitalization</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <!-- Participating Sites Tab -->
            <div x-show="tab === 'sites'" x-transition>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    @forelse($study->institutions as $site)
                    <div class="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm hover:border-emerald-100 transition-all group">
                        <div class="flex justify-between items-start mb-4">
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ $site->city }}</span>
                            <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-tight bg-emerald-50 text-emerald-600">{{ $site->status ?? 'Active' }}</span>
                        </div>
                        <h4 class="font-bold text-slate-800 group-hover:text-[#002d5b] mb-1 leading-tight">{{ $site->name }}</h4>
                        <p class="text-[10px] font-semibold text-slate-400 uppercase">{{ $site->country }}</p>
                        <div class="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">PI: {{ $site->contact_person }}</span>
                            <a href="{{ route('institutions.show', $site) }}" class="p-2 text-slate-300 hover:text-[#002d5b] transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    </div>
                    @empty
                    <div class="col-span-full py-20 text-center opacity-40">
                        <p class="text-slate-500 italic font-bold">No participating sites currently linked to this study.</p>
                    </div>
                    @endforelse
                </div>
            </div>

            <!-- Documents Tab -->
            <div x-show="tab === 'documents'" x-transition>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                <th class="px-6 py-4">Document Title</th>
                                <th class="px-6 py-4">Category</th>
                                <th class="px-6 py-4">Uploaded By</th>
                                <th class="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                            @forelse($study->documents as $doc)
                            <tr class="hover:bg-slate-50/50 transition-colors group">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="p-2 bg-slate-50 group-hover:bg-blue-50 transition-all rounded-lg text-slate-400 group-hover:text-[#002d5b]">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <span class="text-xs font-bold text-slate-700 truncate max-w-xs">{{ $doc->title }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-xs font-semibold text-slate-500">{{ $doc->category->name }}</td>
                                <td class="px-6 py-4">
                                    <span class="text-xs font-bold text-slate-600">{{ $doc->uploader->name ?? 'Admin' }}</span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <a href="{{ route('documents.download', $doc) }}" class="p-2 text-slate-300 hover:text-emerald-600 transition-all">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    </a>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="4" class="px-6 py-20 text-center opacity-40">
                                    <p class="text-slate-500 italic font-bold">No documents available for this study.</p>
                                </td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Activity Tab (Placeholder) -->
            <div x-show="tab === 'activity'" x-transition class="py-20 text-center opacity-40 italic font-bold text-slate-500">
                Activity logging for this study is currently being processed.
            </div>
        </div>
    </div>
</div>
</div>
@endsection
