<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-slate-50">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Wecasor Portal') }} - Admin</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Scripts and Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <style>
        body {
            font-family: 'Instrument Sans', 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .sidebar-gradient {
            background: linear-gradient(180deg, #002d5b 0%, #001a35 100%);
        }
        .main-gradient {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
    </style>
</head>
<body class="h-full overflow-hidden bg-slate-50" x-data="{ mobileMenuOpen: false }">
    <div class="flex h-full">
        <!-- Sidebar -->
        <x-admin.sidebar />

        <!-- Overlay for mobile -->
        <div x-show="mobileMenuOpen" 
             @click="mobileMenuOpen = false"
             x-transition:enter="transition ease-out duration-300"
             x-transition:enter-start="opacity-0"
             x-transition:enter-end="opacity-100"
             x-transition:leave="transition ease-in duration-200"
             x-transition:leave-start="opacity-100"
             x-transition:leave-end="opacity-0"
             class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"></div>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col min-w-0 overflow-hidden main-gradient">
            <!-- Header -->
            <header class="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shrink-0 sticky top-0 z-30">
                <div class="flex items-center gap-4">
                    <button @click="mobileMenuOpen = true" class="lg:hidden p-2 text-slate-500 hover:text-emerald-600 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <div>
                        <h1 class="text-lg font-bold text-slate-800 tracking-tight">@yield('title', 'Dashboard')</h1>
                    </div>
                </div>
                
                <div class="flex items-center gap-4">
                    <button class="p-2 text-slate-400 hover:text-emerald-600 transition-all relative group">
                        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        <span class="absolute top-2 right-2.5 w-1.5 h-1.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                    </button>
                    
                    <div class="flex items-center gap-3 pl-4 border-l border-slate-100">
                        <div class="hidden sm:block text-right">
                            <p class="text-xs font-bold text-slate-700 leading-none mb-0.5">{{ auth()->user()->name }}</p>
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ auth()->user()->getRoleNames()->first() }}</p>
                        </div>
                        <div class="w-8 h-8 rounded-lg bg-[#002d5b] flex items-center justify-center text-white font-bold text-xs shadow-md shadow-[#002d5b]/10 cursor-pointer hover:bg-[#003d7b] transition-all">
                            {{ substr(auth()->user()->name ?? 'SA', 0, 2) }}
                        </div>
                    </div>
                </div>
            </header>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-6 lg:p-10">
                @yield('content')
            </div>
        </main>
    </div>
</body>
</html>
