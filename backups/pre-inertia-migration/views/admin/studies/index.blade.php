@extends('layouts.admin')

@section('title', 'Research Studies')

@section('content')
<div class="flex items-center justify-between mb-8">
    <div>
        <h2 class="text-2xl font-bold text-slate-800">Studies Overview</h2>
        <p class="text-slate-500">Manage all research projects and their statuses.</p>
    </div>
    <a href="{{ route('studies.create') }}" class="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        New Study
    </a>
</div>

<div class="glass-panel rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-sm">
    <table class="w-full text-left border-collapse">
        <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
                <th class="px-6 py-4 font-bold text-slate-700">Study Details</th>
                <th class="px-6 py-4 font-bold text-slate-700">Code</th>
                <th class="px-6 py-4 font-bold text-slate-700">Status</th>
                <th class="px-6 py-4 font-bold text-slate-700">PI Name</th>
                <th class="px-6 py-4 font-bold text-slate-700 text-right">Actions</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
            @forelse($studies as $study)
            <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="px-6 py-4">
                    <div class="font-semibold text-slate-800">{{ $study->title }}</div>
                    <div class="text-xs text-slate-500 line-clamp-1">{{ Str::limit($study->description, 50) }}</div>
                </td>
                <td class="px-6 py-4 font-mono text-indigo-600 font-medium">{{ $study->study_code }}</td>
                <td class="px-6 py-4">
                    <span @class([
                        'px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        'bg-blue-50 text-blue-600' => $study->status === 'planning',
                        'bg-green-50 text-green-600' => $study->status === 'active',
                        'bg-slate-100 text-slate-600' => $study->status === 'closed',
                    ])>
                        {{ $study->status }}
                    </span>
                </td>
                <td class="px-6 py-4 text-slate-600">{{ $study->pi_name ?? 'N/A' }}</td>
                <td class="px-6 py-4 text-right space-x-2">
                    <a href="{{ route('studies.edit', $study) }}" class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg inline-block transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </a>
                    <form action="{{ route('studies.destroy', $study) }}" method="POST" class="inline-block">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Are you sure?')" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </form>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="5" class="px-6 py-12 text-center text-slate-500 italic">No studies found.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
    
    @if($studies->hasPages())
    <div class="px-6 py-4 bg-slate-50 border-t border-slate-200">
        {{ $studies->links() }}
    </div>
    @endif
</div>
@endsection
