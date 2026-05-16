<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SurveyHubController extends Controller
{
    public function index()
    {
        $surveys = Survey::withCount('responses')->latest()->get();
        return Inertia::render('Admin/Surveys/Index', [
            'surveys' => $surveys
        ]);
    }

    public function responses(Survey $survey)
    {
        $survey->load('responses');
        return Inertia::render('Admin/Surveys/Responses', [
            'survey' => $survey
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Surveys/Builder');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'google_webhook_url' => 'nullable|url',
            'status' => 'required|in:draft,active,closed',
            'config_json' => 'nullable|array'
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);

        Survey::create($validated);

        return redirect()->route('surveys.index')->with('success', 'Public survey created successfully.');
    }

    public function edit(Survey $survey)
    {
        return Inertia::render('Admin/Surveys/Builder', [
            'survey' => $survey
        ]);
    }

    public function update(Request $request, Survey $survey)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'google_webhook_url' => 'nullable|url',
            'status' => 'required|in:draft,active,closed',
            'config_json' => 'nullable|array'
        ]);

        $survey->update($validated);

        return redirect()->route('surveys.index')->with('success', 'Public survey updated successfully.');
    }

    public function destroy(Survey $survey)
    {
        $survey->delete();
        return redirect()->back()->with('success', 'Survey deleted.');
    }
}
