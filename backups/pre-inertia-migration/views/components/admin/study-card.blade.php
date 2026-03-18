<div class="glass-panel p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col h-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md">
    <div class="flex justify-between items-start mb-4">
        <div class="px-3 py-1 bg-{{ $study->status === 'Ongoing' ? 'blue' : 'emerald' }}-500/20 text-{{ $study->status === 'Ongoing' ? 'blue' : 'emerald' }}-400 rounded-lg text-xs font-bold uppercase tracking-wider">
            {{ $study->status }}
        </div>
        @if($study->is_priority)
            <div class="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
        @endif
    </div>
    
    <h3 class="text-xl font-bold text-white mb-2 line-clamp-1">{{ $study->title }}</h3>
    <p class="text-white/60 text-sm mb-6 line-clamp-2">{{ $study->description }}</p>
    
    <div class="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
        <div class="flex -space-x-2">
            <!-- Avatars or participants if needed later -->
            <div class="w-8 h-8 rounded-full bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white">WA</div>
        </div>
        <a href="{{ route('studies.show', $study) }}" class="text-white hover:text-blue-400 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
    </div>
</div>
