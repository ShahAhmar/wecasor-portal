<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Secure Research Portal - WeCASOR</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Old+Standard+TT:wght@400;700&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body { font-family: 'Outfit', sans-serif; }
        .serif-heading { font-family: 'Old Standard TT', serif; }
        .bg-navy { background-color: #002d5b; }
        /* Subtle glow effect for the card */
        .card-glow {
            box-shadow: 0 0 40px rgba(5, 150, 105, 0.1);
        }
    </style>
</head>
<body class="h-full flex items-center justify-center p-6 bg-navy relative overflow-hidden">
    <!-- Optional: Subtle background pattern or glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full"></div>

    <div class="w-full max-w-xl relative z-10">
        <div class="bg-white p-12 rounded-[2rem] shadow-2xl card-glow border border-white/20">
            <div class="text-center mb-10">
                <img src="{{ asset('images/wecasor-logo.png') }}" alt="WeCASOR Logo" class="h-20 mx-auto mb-8">
                <h1 class="serif-heading text-4xl font-bold tracking-tight text-slate-800 mb-4">Secure Research Portal</h1>
                <p class="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
                    Access is restricted to authorized participating institutions and researchers only. Authentication and activity logging are enforced for audit compliance.
                </p>
            </div>

            <form method="POST" action="{{ route('login') }}" class="space-y-6">
                @csrf
                <div>
                    <label for="email" class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                    <input type="email" name="email" id="email" required 
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700"
                        value="{{ old('email') }}" placeholder="Enter your credentials">
                    @error('email')
                        <p class="mt-2 text-sm text-red-500">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <div class="flex justify-between items-center mb-2">
                        <label for="password" class="block text-xs font-bold uppercase tracking-widest text-slate-400">Password</label>
                        <a href="#" class="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter hover:text-emerald-700 transition-colors">Forgot Password?</a>
                    </div>
                    <input type="password" name="password" id="password" required 
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700"
                        placeholder="••••••••">
                </div>

                <button type="submit" 
                    class="w-full bg-[#059669] hover:bg-[#047857] text-white py-4 rounded-2xl font-bold shadow-xl shadow-emerald-900/10 active:scale-[0.98] transition-all text-sm uppercase tracking-widest">
                    Portal Login
                </button>
            </form>

            <div class="mt-10 pt-8 border-t border-slate-50 text-center">
                <p class="text-[11px] font-medium text-slate-400">New institution? Portal access is granted after ethics verification.</p>
                <a href="https://wecasor.com/contact/" class="mt-2 inline-block text-[11px] font-bold text-[#059669] uppercase tracking-widest hover:text-[#047857] transition-colors decoration-2 underline-offset-4">
                    Request Access Onboarding
                </a>
            </div>
        </div>
        
        <div class="mt-8 text-center">
            <p class="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                West & Central Africa Stroke Outcomes Research
            </p>
        </div>
    </div>
</body>
</html>
