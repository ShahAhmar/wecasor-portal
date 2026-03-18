<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-slate-50">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'WeCASOR Portal') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
    <style>
        #app, #app:focus, #app:active { outline: none !important; border: none !important; }
        * { -webkit-tap-highlight-color: transparent; }
        *:focus { outline: none !important; }
        /* Definitively suppress rogue fixed overlays reported in screenshots */
        div[style*="z-index: 200000"],
        div[style*="z-index:200000"] {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
            opacity: 0 !important;
        }
    </style>
</head>
<body class="font-sans antialiased h-full">
    @inertia
</body>
</html>
