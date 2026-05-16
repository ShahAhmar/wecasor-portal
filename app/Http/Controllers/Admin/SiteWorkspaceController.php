<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class SiteWorkspaceController extends Controller
{
    use AuthorizesRequests;

    public function overview(Institution $site)
    {
        $site->load(['users']);
        return Inertia::render('Admin/Workspace/Site/Overview', [
            'site' => $site,
            'stats' => [
                'team_size' => $site->users()->count(),
                'active_subjects' => 0,
                'open_queries' => 0
            ]
        ]);
    }

    public function team(Institution $site)
    {
        $unassignedUsers = User::whereNull('site_id')->get(['id', 'name', 'email']);
        return Inertia::render('Admin/Workspace/Site/Team', [
            'site' => $site,
            'team' => $site->users()->paginate(15),
            'unassignedUsers' => $unassignedUsers
        ]);
    }

    public function assignUser(Request $request, Institution $site)
    {
        $request->validate(['user_id' => 'required|exists:users,id']);
        $user = User::findOrFail($request->user_id);
        $user->site_id = $site->id;
        $user->save();

        return back()->with('success', 'User assigned to site successfully.');
    }

    public function documents(Institution $site)
    {
        return Inertia::render('Admin/Workspace/Site/Documents', [
            'site' => $site,
            'documents' => $site->documents()->latest()->get()
        ]);
    }

    public function enrollment(Institution $site)
    {
        return Inertia::render('Admin/Workspace/Site/Enrollment', [
            'site' => $site,
            'subjects' => \App\Models\Subject::where('site_id', $site->id)->latest()->paginate(15)
        ]);
    }
}
