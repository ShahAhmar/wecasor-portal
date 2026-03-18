<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Study;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class StudyController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('role:Administrator', except: ['index', 'show']),
        ];
    }
    public function index()
    {
        $studies = Study::latest()->paginate(10);
        return Inertia::render('Admin/Studies/Index', [
            'studies' => $studies,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Studies/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'study_code' => 'required|string|unique:studies',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'pi_name' => 'nullable|string|max:255',
            'target_enrollment' => 'required|integer|min:1',
            'expected_follow_up' => 'required|integer|min:1',
        ]);

        Study::create($validated);

        return redirect()->route('studies.index');
    }

    public function show(Study $study)
    {
        $study->load(['institutions', 'documents.category', 'documents.uploader']);
        
        // Calculate Real-time Metrics
        $totalSubmissions = $study->dataSubmissions()->count();
        $targetEnrollment = $study->target_enrollment ?: 100;
        $expectedFollowUp = $study->expected_follow_up ?: 90;

        $completenessRate = min(100, round(($totalSubmissions / $targetEnrollment) * 100));
        $followUpRate = min(100, round(($totalSubmissions / $expectedFollowUp) * 100));

        return Inertia::render('Admin/Studies/Show', [
            'study' => $study,
            'completenessRate' => $completenessRate,
            'followUpRate' => $followUpRate,
        ]);
    }

    public function edit(Study $study)
    {
        return Inertia::render('Admin/Studies/Edit', [
            'study' => $study,
        ]);
    }

    public function update(Request $request, Study $study)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'study_code' => 'required|string|unique:studies,study_code,' . $study->id,
            'description' => 'nullable|string',
            'status' => 'required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'pi_name' => 'nullable|string|max:255',
            'target_enrollment' => 'required|integer|min:1',
            'expected_follow_up' => 'required|integer|min:1',
        ]);

        $study->update($validated);

        return redirect()->route('studies.index');
    }

    public function destroy(Study $study)
    {
        $study->delete();
        return redirect()->route('studies.index');
    }
}
