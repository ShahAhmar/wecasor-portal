<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class InstitutionController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('role:Administrator', except: ['index', 'show']),
        ];
    }

    public function index()
    {
        $institutions = Institution::latest()->paginate(10);
        return Inertia::render('Admin/Institutions/Index', [
            'institutions' => $institutions,
        ]);
    }

    public function show(Institution $institution)
    {
        $institution->load(['studies', 'users.roles', 'ethicsApplications']);
        return Inertia::render('Admin/Institutions/Show', [
            'institution' => $institution,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Institutions/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:100',
            'city' => 'nullable|string|max:100',
            'type' => 'required|string',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'required|email|unique:institutions,email',
            'phone' => 'nullable|string|max:20',
        ]);

        Institution::create($validated);

        return redirect()->route('institutions.index');
    }

    public function edit(Institution $institution)
    {
        return Inertia::render('Admin/Institutions/Edit', [
            'institution' => $institution,
        ]);
    }

    public function update(Request $request, Institution $institution)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:100',
            'city' => 'nullable|string|max:100',
            'type' => 'required|string',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'required|email|unique:institutions,email,' . $institution->id,
            'phone' => 'nullable|string|max:20',
        ]);

        $institution->update($validated);

        return redirect()->route('institutions.index');
    }

    public function destroy(Institution $institution)
    {
        $institution->delete();
        return redirect()->route('institutions.index');
    }
}
