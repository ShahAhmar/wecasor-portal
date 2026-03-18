@extends('layouts.admin')

@section('title', 'Setup Two-Factor Authentication')

@section('content')
<div class="flex flex-col items-center justify-center min-h-[60vh]">
    <div class="w-full max-w-md p-8 bg-white border border-slate-200 rounded-3xl shadow-2xl">
        <h2 class="text-3xl font-bold text-center text-slate-800 mb-6">Setup 2FA</h2>
        <p class="text-slate-600 text-center mb-8">
            Two-factor authentication is mandatory for your role. Please scan the QR code below with your authenticator app (e.g., Google Authenticator, Authy).
        </p>

        <div class="flex flex-col items-center mb-8 p-4 bg-white rounded-2xl">
            {!! $qrCode !!}
            <p class="text-[10px] text-gray-400 mt-2 break-all opacity-50">{{ $qrCodeUrl }}</p>
        </div>

        <form action="{{ route('admin.2fa.confirm') }}" method="POST">
            @csrf
            <div class="mb-6">
                <label for="code" class="block text-sm font-medium text-slate-700 mb-2">Verification Code</label>
                <input type="text" name="code" id="code" required
                    class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono tracking-[0.5em] text-center text-2xl"
                    placeholder="000000" maxlength="6">
                @error('code')
                    <p class="text-red-600 text-sm mt-2">{{ $message }}</p>
                @enderror
            </div>

            <button type="submit"
                class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transform transition-all active:scale-[0.98]">
                Verify & Enable 2FA
            </button>
        </form>
    </div>
</div>
@endsection
