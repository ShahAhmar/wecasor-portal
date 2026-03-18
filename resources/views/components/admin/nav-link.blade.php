@props(['active' => false, 'href' => '#'])

<a href="{{ $href }}" @class([
    'flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group relative',
    'bg-white/10 text-white shadow-sm ring-1 ring-white/20 active-link' => $active,
    'text-slate-300 hover:text-white hover:bg-white/5' => !$active,
])>
    <div @class([
        'transition-all duration-300',
        'text-emerald-400 scale-110' => $active,
        'text-slate-400 group-hover:text-emerald-400 group-hover:scale-110' => !$active,
    ])>
        {{ $slot }}
    </div>
    
    @if($active)
    <div class="absolute right-4 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
    @endif
</a>
