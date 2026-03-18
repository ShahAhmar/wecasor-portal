@extends('layouts.admin')

@section('title', 'User management')

@section('content')
<div class="p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-slate-800">User Management</h1>
        <a href="{{ route('users.create') }}" class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/10 text-sm">
            Create New User
        </a>
    </div>

    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                    <th class="px-6 py-4">Name</th>
                    <th class="px-6 py-4">Email</th>
                    <th class="px-6 py-4">Role</th>
                    <th class="px-6 py-4">Institution</th>
                    <th class="px-6 py-4">Status</th>
                    <th class="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @foreach($users as $user)
                <tr class="hover:bg-slate-50/50 transition-colors">
                    <td class="px-6 py-4 font-semibold text-slate-700">{{ $user->name }}</td>
                    <td class="px-6 py-4 text-slate-500">{{ $user->email }}</td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-tight">{{ $user->role }}</span>
                    </td>
                    <td class="px-6 py-4 text-slate-500">{{ $user->institution?->name ?? 'N/A' }}</td>
                    <td class="px-6 py-4">
                        <span class="px-2.5 py-1 {{ $user->status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600' }} rounded-lg text-[10px] font-bold uppercase tracking-tight">
                            {{ $user->status }}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right space-x-2">
                        <a href="{{ route('users.edit', $user) }}" class="text-indigo-600 hover:text-indigo-800 font-semibold text-xs">Edit</a>
                        <form action="{{ route('users.destroy', $user) }}" method="POST" class="inline">
                            @csrf @method('DELETE')
                            <button class="text-rose-600 hover:text-rose-800 font-semibold text-xs" onclick="return confirm('Archive this user?')">Delete</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
