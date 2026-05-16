<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Study;
use App\Models\Institution;
use App\Models\EthicsApplication;
use App\Models\Document;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->hasRole('Super Admin')) {
            return $this->globalCommandDashboard($user);
        } elseif ($user->hasRole('Study Admin')) {
            return $this->studyOperationsDashboard($user);
        } elseif ($user->hasRole('Country Lead')) {
            return $this->countryPortfolioDashboard($user);
        } elseif ($user->hasRole('Site Coordinator')) {
            return $this->siteWorkQueue($user);
        } elseif ($user->hasRole('Monitor / Auditor')) {
            return $this->monitoringDashboard($user);
        } elseif ($user->hasRole('PI / Reviewer')) {
            return $this->approvalDashboard($user);
        }

        // Fallback for setup or error state
        return Inertia::render('Admin/Dashboard', ['stats' => [], 'recentActivity' => [], 'allStudies' => []]);
    }

    private function globalCommandDashboard($user) {
        $stats = [
            'active_studies' => Study::where('status', 'active')->count(),
            'active_sites' => Institution::where('status', 'active')->count(),
            'enrolled_subjects' => \App\Models\Subject::whereNotNull('enrollment_date')->count(),
            'open_queries' => \App\Models\Query::where('status', 'Open')->count(),
            'pending_documents' => Document::where('status', 'uploaded')->count(),
        ];
        return Inertia::render('Admin/Dashboards/GlobalCommand', ['stats' => $stats]);
    }

    private function studyOperationsDashboard($user) {
        return Inertia::render('Admin/Dashboards/StudyOperations');
    }

    private function countryPortfolioDashboard($user) {
        $country = $user->country;
        
        $sites = Institution::where('country', $country)->get();
        $siteIds = $sites->pluck('id');

        $stats = [
            'active_sites' => $sites->filter(function($site) { return strtolower($site->status) === 'active'; })->count(),
            'active_studies' => Study::whereHas('institutions', function($q) use ($country) {
                $q->where('sites.country', $country);
            })->count(),
            'enrolled_subjects' => \App\Models\Subject::whereIn('site_id', $siteIds)->whereNotNull('enrollment_date')->count(),
        ];

        return Inertia::render('Admin/Dashboards/CountryPortfolio', [
            'stats' => $stats,
            'recentSites' => $sites->take(5)
        ]);
    }

    private function siteWorkQueue($user) {
        $siteId = $user->site_id;
        $site = null;
        $stats = [
            'enrolled_subjects' => 0,
            'active_studies' => 0,
            'open_queries' => 0,
        ];
        $recentSubjects = [];

        if ($siteId) {
            $site = Institution::find($siteId);
            if ($site) {
                $stats['enrolled_subjects'] = \App\Models\Subject::where('site_id', $siteId)->whereNotNull('enrollment_date')->count();
                $stats['active_studies'] = Study::whereHas('institutions', function($q) use ($siteId) {
                    $q->where('ethics_applications.institution_id', $siteId);
                })->count();
                
                $recentSubjects = \App\Models\Subject::with('study')
                    ->where('site_id', $siteId)
                    ->latest()
                    ->take(5)
                    ->get();
            }
        }

        return Inertia::render('Admin/Dashboards/SiteWorkQueue', [
            'site' => $site,
            'stats' => $stats,
            'recentSubjects' => $recentSubjects
        ]);
    }

    private function monitoringDashboard($user) {
        $stats = [
            'audit_events' => \App\Models\AuditLog::count(),
            'active_studies' => Study::where('status', 'active')->count(),
            'open_queries' => \App\Models\Query::where('status', 'Open')->count(),
        ];

        $recentAudits = \App\Models\AuditLog::with('user')
                            ->latest()
                            ->take(6)
                            ->get();

        return Inertia::render('Admin/Dashboards/Monitoring', [
            'stats' => $stats,
            'recentAudits' => $recentAudits
        ]);
    }

    private function approvalDashboard($user) {
        $stats = [
            'my_protocols' => \App\Models\Study::where('lead_pi_id', $user->id)->count(),
            'pending_signatures' => \App\Models\DataSubmission::whereHas('study', function($q) use ($user) {
                $q->where('lead_pi_id', $user->id);
            })->where('status', 'Pending Review')->count(),
            'data_queries' => \App\Models\Query::where('status', 'Open')->count(),
        ];

        $myStudies = \App\Models\Study::where('lead_pi_id', $user->id)
            ->withCount('subjects')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboards/Approval', [
            'stats' => $stats,
            'myStudies' => $myStudies
        ]);
    }
}
