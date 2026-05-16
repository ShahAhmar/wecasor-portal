<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Study;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class StudyWorkspaceController extends Controller
{
    use AuthorizesRequests;

    public function overview(Study $study)
    {
        $study->load(['sites', 'documents']);
        return Inertia::render('Admin/Workspace/Study/Overview', [
            'study' => $study,
            'stats' => [
                'total_sites' => $study->sites()->count(),
                'total_subjects' => $study->subjects()->count() ?? 0, // subject relationships to be mapped fully
                'open_queries' => 0
            ]
        ]);
    }

    public function protocol(Study $study)
    {
        $docs = \App\Models\Document::where(function($q) use ($study) {
            $q->where('study_id', $study->id)
              ->orWhere('documentable_id', $study->id);
        })->latest()->get();

        return Inertia::render('Admin/Workspace/Study/Protocol', [
            'study' => $study,
            'documents' => $docs
        ]);
    }

    public function sites(Study $study)
    {
        return Inertia::render('Admin/Workspace/Study/Sites', [
            'study' => $study,
            'sites' => $study->sites()->paginate(15)
        ]);
    }

    public function enrollment(Study $study)
    {
        return Inertia::render('Admin/Workspace/Study/Enrollment', [
            'study' => $study
        ]);
    }

    public function queries(Study $study)
    {
        return Inertia::render('Admin/Workspace/Study/Queries', [
            'study' => $study
        ]);
    }
}
