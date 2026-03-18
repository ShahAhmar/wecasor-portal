<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Authentication - WeCASOR</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Old+Standard+TT:wght@400;700&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body { font-family: 'Outfit', sans-serif; }
        .serif-heading { font-family: 'Old Standard TT', serif; }
        .bg-navy { background-color: #002d5b; }
        .card-glow-admin {
            box-shadow: 0 0 50px rgba(59, 130, 246, 0.1);
        }
    </style>
</head>
<body class="h-full flex items-center justify-center p-6 bg-navy relative overflow-hidden">
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

    <div class="w-full max-w-xl relative z-10">
        <div class="bg-white p-12 rounded-[2.5rem] shadow-2xl card-glow-admin border border-white/20">
            <div class="text-center mb-10">
                <img src="{{ asset('images/wecasor-logo.png') }}" alt="WeCASOR Logo" class="h-16 mx-auto mb-6">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    System Administrator
                </div>
                <h1 class="serif-heading text-4xl font-bold tracking-tight text-slate-800 mb-2">Secure Administrative Gateway</h1>
                <p class="text-slate-400 text-xs uppercase tracking-widest font-bold">Restricted Access Entry</p>
            </div>

            <form method="POST" action="{{ route('admin.login') }}" class="space-y-6">
                @csrf
                <div>
                    <label for="email" class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Admin Email</label>
                    <input type="email" name="email" id="email" required 
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500/30 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all outline-none text-slate-700"
                        value="{{ old('email') }}" placeholder="admin@wecasor.com">
                    @error('email')
                        <p class="mt-2 text-sm text-red-500">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <div class="flex justify-between items-center mb-2">
                        <label for="password" class="block text-xs font-bold uppercase tracking-widest text-slate-400">Security Key</label>
                    </div>
                    <input type="password" name="password" id="password" required 
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500/30 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all outline-none text-slate-700"
                        placeholder="••••••••">
                </div>

                <button type="submit" 
                    class="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-all text-sm uppercase tracking-widest">
                    System Authenticate
                </button>
            </form>
        </div>
        
        <p class="mt-8 text-center text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
            Audit Monitoring Active
        </p>
    </div>
</body>
</html>
