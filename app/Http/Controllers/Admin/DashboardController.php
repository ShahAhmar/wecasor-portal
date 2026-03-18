<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Study;
use App\Models\Institution;
use App\Models\EthicsApplication;
use App\Models\Document;
use App\Models\AuditLog;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $query = Study::query();

        // Level-based Visibility Logic
        if ($user->role === 'Administrator' || $user->role === 'Governance Member') {
            // Level 4: Full/Aggregated visibility
            $studies = $query->latest()->get();
        } elseif ($user->role === 'Country Coordinator') {
            // Level 2: Country-specific visibility
            $query->whereHas('institutions', function($q) use ($user) {
                $q->where('institutions.country', $user->country);
            });
            $studies = $query->latest()->get();
        } elseif ($user->role === 'Site Investigator' || $user->role === 'Data Abstractor') {
            // Level 1: Institutional visibility
            $query->whereHas('institutions', function($q) use ($user) {
                $q->where('institutions.id', $user->institution_id);
            });
            $studies = $query->latest()->get();
        } else {
            // Viewer / Default: Restricted
            $studies = collect();
        }

        $stats = [
            'total_studies' => $studies->count(),
            'total_institutions' => in_array($user->role, ['Administrator', 'Governance Member']) 
                ? Institution::count() 
                : Institution::where('country', $user->country)->count(),
            'pending_applications' => in_array($user->role, ['Administrator', 'Governance Member'])
                ? EthicsApplication::where('status', 'Pending Review')->count()
                : EthicsApplication::where('status', 'Pending Review')
                    ->whereHas('institution', function($q) use ($user) {
                        $q->where('country', $user->country);
                    })->count(),
            'total_documents' => Document::count(),
        ];

        // Filter Activity Feed based on role
        $activityQuery = AuditLog::with('user')->latest();
        if ($user->role !== 'Administrator' && $user->role !== 'Governance Member') {
            $activityQuery->whereHas('user', function($q) use ($user) {
                $q->where('institution_id', $user->institution_id);
            });
        }
        $recentActivity = $activityQuery->take(5)->get();

        $allStudies = Study::with('institutions')->latest()->take(10)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
            'allStudies' => $allStudies,
        ]);
    }
}
