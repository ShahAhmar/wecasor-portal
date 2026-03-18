<!-- Desktop & Mobile Sidebar -->
<aside 
    class="sidebar-gradient text-white shrink-0 shadow-2xl z-50 transform transition-transform duration-300 transform-none"
    style="width: 280px; height: 100vh; display: flex; flex-direction: column; overflow: hidden; position: relative;"
    :class="mobileMenuOpen ? 'translate-x-0 fixed inset-y-0 left-0 z-[60]' : 'lg:static lg:translate-x-0 -translate-x-full fixed inset-y-0 left-0'">
    
    <!-- Logo Section (Premium Integrated Look) -->
    <div style="height: 160px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #e2e8f0; background: white;" class="shrink-0">
        <a href="/admin/dashboard" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 20px;">
            <img src="{{ asset('images/wecasor-logo.png') }}" alt="WeCASOR Logo" style="max-height: 150px; width: auto; max-width: 100%; object-fit: contain;">
        </a>
        <button @click="mobileMenuOpen = false" class="lg:hidden absolute right-4 text-slate-500 hover:text-emerald-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
        <p class="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 opacity-50">Main Menu</p>
        
        <x-admin.nav-link href="/admin/dashboard" :active="request()->is('admin/dashboard')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Dashboard
        </x-admin.nav-link>

        <x-admin.nav-link href="/admin/studies" :active="request()->is('admin/studies*')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            Studies
        </x-admin.nav-link>

        <x-admin.nav-link href="/admin/documents" :active="request()->is('admin/documents*')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Document Vault
        </x-admin.nav-link>

        <x-admin.nav-link href="/admin/institutions" :active="request()->is('admin/institutions*')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            Institutions
        </x-admin.nav-link>

        <x-admin.nav-link href="/admin/users" :active="request()->is('admin/users*')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            Users
        </x-admin.nav-link>

        <div class="pt-6">
            <p class="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 opacity-50">System</p>
            <x-admin.nav-link href="/admin/audit" :active="request()->is('admin/audit*')">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                Audit Log
            </x-admin.nav-link>
            <x-admin.nav-link href="/admin/profile" :active="request()->is('admin/profile*')">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Profile
            </x-admin.nav-link>
        </div>
    </nav>

    <!-- Bottom User Profile -->
    <div class="p-6 border-t border-white/5 bg-black/10">
        <form method="POST" action="/logout">
            @csrf
            <button class="w-full h-11 flex items-center justify-center gap-3 px-4 text-xs font-bold text-slate-300 hover:text-white rounded-xl bg-white/5 hover:bg-emerald-600 transition-all border border-white/5 shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Sign Out Account
            </button>
        </form>
    </div>
</aside>
