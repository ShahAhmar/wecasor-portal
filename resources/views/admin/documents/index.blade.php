@extends('layouts.admin')

@section('title', 'Document Vault')

@section('content')
<div class="flex flex-col h-full bg-slate-50/30">
    <div class="px-8 py-6">
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Document Vault</h1>
    </div>

    <!-- Dual Pane Layout -->
    <div class="flex-1 flex gap-6 px-8 pb-8 overflow-hidden">
        <!-- Left Pane: Folder Sidebar -->
        <div class="w-64 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
            <div class="p-6 border-b border-slate-50 flex items-center gap-2">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                <h3 class="font-bold text-slate-800 text-sm tracking-tight">Folders</h3>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
                @foreach($studies as $study)
                <div class="space-y-1">
                    <a href="{{ route('documents.index', ['study_id' => $study->id]) }}" 
                       class="block w-full text-left px-3 py-2 rounded-lg text-sm font-bold tracking-tight {{ request('study_id') == $study->id ? 'bg-[#002d5b]/5 text-[#002d5b]' : 'text-slate-600 hover:bg-slate-50' }}">
                        {{ $study->title }}
                    </a>
                    @if(request('study_id') == $study->id)
                    <div class="pl-4 space-y-1 mt-1 border-l-2 border-slate-50 ml-2">
                        @foreach($categories as $category)
                        <a href="{{ route('documents.index', ['study_id' => $study->id, 'category_id' => $category->id]) }}" 
                           class="block w-full text-left px-3 py-1.5 rounded text-[10px] font-bold tracking-tight transition-colors {{ request('category_id') == $category->id ? 'text-[#059669]' : 'text-slate-400 hover:text-[#059669]' }}">
                            {{ $category->name }}
                        </a>
                        @endforeach
                    </div>
                    @endif
                </div>
                @endforeach
            </div>
        </div>

        <!-- Right Pane: Content Area -->
        <div class="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
            <!-- Toolbar -->
            <form action="{{ route('documents.index') }}" method="GET" class="p-6 border-b border-slate-50 flex flex-col sm:flex-row gap-4">
                <div class="flex-1 relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input type="text" name="search" value="{{ request('search') }}" placeholder="Search documents..." class="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 text-slate-600 transition-all">
                </div>
                <div class="flex gap-2">
                    <select name="study_id" onchange="this.form.submit()" class="pl-4 pr-10 py-2 bg-slate-50 border-none rounded-xl text-sm text-slate-600 font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer">
                        <option value="">All Studies</option>
                        @foreach($studies as $study)
                            <option value="{{ $study->id }}" {{ request('study_id') == $study->id ? 'selected' : '' }}>{{ $study->title }}</option>
                        @endforeach
                    </select>
                    <select name="category_id" onchange="this.form.submit()" class="pl-4 pr-10 py-2 bg-slate-50 border-none rounded-xl text-sm text-slate-600 font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer">
                        <option value="">All Types</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                        @endforeach
                    </select>
                    @can('manage documents')
                    <a href="{{ route('documents.create') }}" class="px-5 p-2 bg-[#002d5b] hover:bg-[#003d7b] text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-md shadow-[#002d5b]/10">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0l-4-4m4 4v12"></path></svg>
                        Upload
                    </a>
                    @endcan
                </div>
            </form>

            <!-- Table Area -->
            <div class="flex-1 overflow-auto">
                <table class="w-full text-left border-collapse min-w-[1000px]">
                    <thead class="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest sticky top-0 bg-white z-10 shadow-sm shadow-slate-100">
                        <tr>
                            <th class="px-6 py-4">File Name</th>
                            <th class="px-6 py-4">Study</th>
                            <th class="px-6 py-4">Type</th>
                            <th class="px-6 py-4 text-center">Version</th>
                            <th class="px-6 py-4">Updated</th>
                            <th class="px-6 py-4">Uploaded By</th>
                            <th class="px-6 py-4 text-center">Audience</th>
                            <th class="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        @forelse($documents as $doc)
                        <tr class="hover:bg-slate-50/30 transition-colors group">
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-3">
                                    <div class="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div class="min-w-0">
                                        <span class="font-bold text-sm text-slate-700 block truncate transition-colors group-hover:text-[#002d5b]">{{ $doc->title }}</span>
                                        <span class="text-[10px] text-slate-400 font-mono">{{ number_format($doc->file_size / 1024, 1) }} KB</span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-[11px] font-bold text-slate-600 tracking-tight">{{ $doc->study->title }}</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-[11px] font-medium text-slate-500">{{ $doc->category->name }}</span>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span class="text-[11px] font-bold text-slate-400">1.0</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-[11px] text-slate-400 font-medium">{{ $doc->updated_at->format('Y-m-d') }}</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        {{ substr($doc->uploader->name ?? 'A', 0, 1) }}
                                    </div>
                                    <span class="text-[11px] font-semibold text-slate-600">{{ $doc->uploader->name ?? 'Admin' }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight bg-emerald-50 text-emerald-600 border border-emerald-100">All Sites</span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex justify-end gap-1">
                                    <a href="{{ route('documents.download', $doc) }}" class="p-2 text-slate-400 hover:text-[#002d5b] hover:bg-slate-50 transition-all rounded-lg">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    </a>
                                    @can('manage documents')
                                    <form action="{{ route('documents.destroy', $doc) }}" method="POST" class="inline">
                                        @csrf @method('DELETE')
                                        <button class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all rounded-lg" onclick="return confirm('Delete document?')">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </form>
                                    @endcan
                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="8" class="px-6 py-12 text-center">
                                <div class="flex flex-col items-center opacity-40">
                                    <svg class="w-12 h-12 mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    <p class="text-sm font-medium text-slate-500 italic">No documents found in the vault.</p>
                                </div>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <!-- Footer / Pagination placeholder -->
            @if($documents instanceof \Illuminate\Pagination\LengthAwarePaginator && $documents->hasPages())
            <div class="px-6 py-4 border-t border-slate-50">
                {{ $documents->links() }}
            </div>
            @endif
        </div>
    </div>
</div>
@endsection
