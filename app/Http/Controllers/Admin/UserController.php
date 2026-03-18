<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Institution;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('institution')->latest()->get();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $roles = Role::all();
        $institutions = Institution::all();
        return Inertia::render('Admin/Users/Show', [
            'user' => new User(),
            'roles' => $roles,
            'institutions' => $institutions,
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|exists:roles,name',
            'institution_id' => 'nullable|exists:institutions,id',
            'status' => 'required|in:Active,Inactive,Pending',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'institution_id' => $validated['institution_id'],
            'status' => $validated['status'],
        ]);

        $user->assignRole($validated['role']);

        return redirect()->route('users.index');
    }

    public function edit(User $user)
    {
        $roles = Role::all();
        $institutions = Institution::all();
        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'roles' => $roles,
            'institutions' => $institutions,
            'mode' => 'edit'
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|exists:roles,name',
            'institution_id' => 'nullable|exists:institutions,id',
            'status' => 'required|in:Active,Inactive,Pending',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'institution_id' => $validated['institution_id'],
            'status' => $validated['status'],
        ]);

        if ($request->filled('password')) {
            $request->validate(['password' => 'string|min:8']);
            $user->update(['password' => Hash::make($request->password)]);
        }

        $user->syncRoles([$validated['role']]);

        return redirect()->route('users.index');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index');
    }
}
