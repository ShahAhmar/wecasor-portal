<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\AbstractSubmission;
use App\Models\ConferenceRegistration;

class ConferenceController extends Controller
{
    public function showConference(Request $request)
    {
        $lang = $request->get('lang', 'en');
        return Inertia::render('Public/Conference/ConferenceHome', [
            'language' => $lang
        ]);
    }

    public function showAbstractSubmission(Request $request)
    {
        $lang = $request->get('lang', 'en');
        return Inertia::render('Public/Conference/AbstractSubmission', [
            'language' => $lang
        ]);
    }

    public function submitAbstract(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'institution' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'abstract_content' => 'required|string|min:250|max:2000', // 250-300 words roughly
            'thematic_area' => 'required|string',
            'presentation_type' => 'required|string',
            'language' => 'required|string|in:en,fr',
        ]);

        AbstractSubmission::create($validated);

        return redirect()->back()->with('success', $validated['language'] === 'fr' 
            ? 'Votre résumé a été soumis avec succès.' 
            : 'Your abstract has been submitted successfully.');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:conference_registrations,email',
            'institution' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'role' => 'required|string',
            'attendance_type' => 'required|string',
            'language' => 'required|string|in:en,fr',
        ]);

        ConferenceRegistration::create($validated);

        return redirect()->back()->with('success', $validated['language'] === 'fr' 
            ? 'Inscription réussie.' 
            : 'Registration successful.');
    }
}
