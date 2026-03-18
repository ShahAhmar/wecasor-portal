<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SystemSetting;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => SystemSetting::all()->groupBy('group'),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    public function aiSettings()
    {
        return Inertia::render('Admin/Settings/Ai', [
            'settings' => SystemSetting::where('group', 'ai')->get()->pluck('value', 'key'),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    public function update(Request $request)
    {
        foreach ($request->except('_token') as $key => $value) {
            SystemSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => $request->group ?? 'general']
            );
        }

        return back()->with('success', 'Configuration updated successfully.');
    }
}
