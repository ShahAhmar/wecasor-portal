<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Models\Study;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Subject::with(['study', 'site']);
        
        if ($request->has('study_id')) {
            $query->where('study_id', $request->study_id);
        }

        return Inertia::render('Admin/Subjects/Index', [
            'subjects' => $query->latest()->paginate(15)
        ]);
    }

    public function create(Request $request)
    {
        $sites = \App\Models\Institution::all();
        $studies = \App\Models\Study::all();
        return Inertia::render('Admin/Subjects/Create', [
            'sites' => $sites,
            'studies' => $studies,
            'default_site_id' => $request->query('site_id')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject_code' => 'required|string|unique:subjects,subject_code',
            'site_id' => 'required|exists:sites,id',
            'study_id' => 'required|exists:studies,id',
            'status' => 'required|string',
            'screening_date' => 'nullable|date',
            'enrollment_date' => 'nullable|date'
        ]);

        Subject::create($validated);

        return redirect()->route('sites.workspace.enrollment', $validated['site_id']);
    }

    public function show(Subject $subject)
    {
        $subject->load(['study', 'site']);
        return Inertia::render('Admin/Subjects/Show', [
            'subject' => $subject
        ]);
    }

    public function timeline(Subject $subject)
    {
        return Inertia::render('Admin/Subjects/Timeline', [
            'subject' => $subject
        ]);
    }

    public function crfs(Subject $subject)
    {
        return Inertia::render('Admin/Subjects/Crfs', [
            'subject' => $subject
        ]);
    }
}
