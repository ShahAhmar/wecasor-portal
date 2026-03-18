@extends('layouts.admin')

@section('title', 'System Audit Logs')

@section('content')
<div class="p-6">
    <div class="flex justify-between items-center mb-6">
        <div>
            <h1 class="text-3xl font-bold text-slate-800">Audit Logs</h1>
            <p class="text-slate-500 text-sm mt-1">Immutable record of all system activities.</p>
        </div>
        <a href="{{ route('admin.audit.export') }}" class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-2 text-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export CSV
        </a>
    </div>

    <!-- Filters -->
    <div class="mb-8 p-6 bg-white border border-slate-200 rounded-2xl flex flex-wrap gap-4 items-end shadow-sm">
        <form action="{{ route('admin.audit.index') }}" method="GET" class="flex flex-wrap gap-4 items-end w-full">
            <div class="flex-1 min-w-[200px]">
                <label class="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Search Action</label>
                <input type="text" name="action" value="{{ request('action') }}" placeholder="e.g., login, download"
                    class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all">
            </div>
            <button type="submit" class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all text-sm">Filter</button>
            <a href="{{ route('admin.audit.index') }}" class="px-6 py-2 text-slate-400 hover:text-slate-600 transition-all text-sm font-medium">Clear</a>
        </form>
    </div>

    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                    <th class="px-6 py-4">Timestamp</th>
                    <th class="px-6 py-4">User</th>
                    <th class="px-6 py-4">Action</th>
                    <th class="px-6 py-4">IP Address</th>
                    <th class="px-6 py-4 text-right">Details</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse($logs as $log)
                <tr class="hover:bg-slate-50/50 transition-colors">
                    <td class="px-6 py-4 text-[10px] font-mono text-slate-400">{{ $log->created_at->format('Y-m-d H:i:s') }}</td>
                    <td class="px-6 py-4">
                        @if($log->user)
                            <div class="flex items-center gap-2">
                                <span class="text-sm font-semibold text-slate-700">{{ $log->user->name }}</span>
                                <span class="text-[10px] bg-indigo-50 px-2 py-0.5 rounded font-bold text-indigo-500 uppercase tracking-tight">{{ $log->user->role }}</span>
                            </div>
                        @else
                            <span class="text-slate-300 italic text-sm">System</span>
                        @endif
                    </td>
                    <td class="px-6 py-4">
                        <span class="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                            {{ str_replace('_', ' ', $log->action) }}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-[10px] font-mono text-slate-400">{{ $log->ip_address }}</td>
                    <td class="px-6 py-4 text-xs text-slate-400 max-w-xs truncate text-right font-mono" title="{{ json_encode($log->details) }}">
                        {{ json_encode($log->details) }}
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="px-6 py-12 text-center text-slate-400 text-sm italic">
                        No audit logs found matching your criteria.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-6">
        {{ $logs->links() }}
    </div>
</div>
@endsection
