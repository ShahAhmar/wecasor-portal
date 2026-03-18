@extends('layouts.admin')

@section('title', '2FA Verification')

@section('content')
<div class="flex flex-col items-center justify-center min-h-[60vh]">
    <div class="w-full max-w-md p-8 bg-white border border-slate-200 rounded-3xl shadow-2xl">
        <h2 class="text-3xl font-bold text-center text-slate-800 mb-6">2FA Verification</h2>
        <p class="text-slate-600 text-center mb-8">
            Please enter the 6-digit verification code from your authenticator app to continue.
        </p>

        <form action="{{ route('admin.2fa.verify') }}" method="POST">
            @csrf
            <div class="mb-6">
                <label for="code" class="block text-sm font-medium text-slate-700 mb-2">Verification Code</label>
                <input type="text" name="code" id="code" required autofocus
                    class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono tracking-[0.5em] text-center text-2xl"
                    placeholder="000000" maxlength="6">
                @error('code')
                    <p class="text-red-600 text-sm mt-2">{{ $message }}</p>
                @enderror
            </div>

            <button type="submit"
                class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transform transition-all active:scale-[0.98]">
                Verify Code
            </button>
        </form>

        <div class="mt-8 text-center">
            <form action="{{ route('logout') }}" method="POST">
                @csrf
                <button type="submit" class="text-slate-400 hover:text-slate-600 transition-colors text-sm">
                    Cancel and Logout
                </button>
            </form>
        </div>
    </div>
</div>
@endsection
