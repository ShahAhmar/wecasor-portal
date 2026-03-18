@extends('layouts.admin')

@section('title', ($mode === 'create' ? 'Create User' : 'Edit User'))

@section('content')
<div class="max-w-4xl mx-auto p-6">
    <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div class="p-8 border-b border-slate-100 bg-slate-50/50">
            <h2 class="text-2xl font-bold text-slate-800">{{ $mode === 'create' ? 'Register New User' : 'Edit User Profile' }}</h2>
            <p class="text-slate-500 text-sm mt-1">Fill in the details below to {{ $mode === 'create' ? 'onboard a new system user' : 'update the user account' }}.</p>
        </div>

        <form action="{{ $mode === 'create' ? route('users.store') : route('users.update', $user) }}" method="POST" class="p-8 space-y-6">
            @csrf
            @if($mode === 'edit') @method('PUT') @endif

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
                    <input type="text" name="name" value="{{ old('name', $user->name) }}" required
                        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    @error('name') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                    <input type="email" name="email" value="{{ old('email', $user->email) }}" required
                        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    @error('email') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Role -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">System Role</label>
                    <select name="role" required
                        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                        <option value="" disabled selected>Select a role</option>
                        @foreach($roles as $role)
                            <option value="{{ $role->name }}" {{ old('role', $user->role) === $role->name ? 'selected' : '' }}>
                                {{ $role->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('role') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Institution -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Affiliated Institution</label>
                    <select name="institution_id"
                        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                        <option value="">No Institution (Global)</option>
                        @foreach($institutions as $inst)
                            <option value="{{ $inst->id }}" {{ old('institution_id', $user->institution_id) == $inst->id ? 'selected' : '' }}>
                                {{ $inst->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('institution_id') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{{ $mode === 'create' ? 'Password' : 'Change Password (Optional)' }}</label>
                    <input type="password" name="password" {{ $mode === 'create' ? 'required' : '' }}
                        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    @error('password') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Status -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Account Status</label>
                    <select name="status" required
                        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                        <option value="Active" {{ old('status', $user->status) === 'Active' ? 'selected' : '' }}>Active</option>
                        <option value="Inactive" {{ old('status', $user->status) === 'Inactive' ? 'selected' : '' }}>Inactive</option>
                        <option value="Pending" {{ old('status', $user->status) === 'Pending' ? 'selected' : '' }}>Pending (Awaiting Approval)</option>
                    </select>
                    @error('status') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>
            </div>

            <div class="flex justify-end gap-4 pt-6">
                <a href="{{ route('users.index') }}" class="px-6 py-3 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all font-bold text-sm">
                    Cancel
                </a>
                <button type="submit" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] text-sm">
                    {{ $mode === 'create' ? 'Create Account' : 'Update Account' }}
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
