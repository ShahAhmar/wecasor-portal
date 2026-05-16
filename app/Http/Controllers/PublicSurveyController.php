<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class PublicSurveyController extends Controller
{
    public function show($slug)
    {
        $survey = Survey::where('slug', $slug)->firstOrFail();

        if ($survey->status !== 'active') {
            abort(404, 'This survey is currently not active.');
        }

        return Inertia::render('Public/SurveyView', [
            'survey' => $survey
        ]);
    }

    public function submit(Request $request, $slug)
    {
        $survey = Survey::where('slug', $slug)->firstOrFail();

        if ($survey->status !== 'active') {
            return response()->json(['error' => 'Survey is closed'], 403);
        }

        $payload = $request->except(['_token']);

        // Save isolated response
        $response = SurveyResponse::create([
            'survey_id' => $survey->id,
            'payload_json' => $payload,
            'ip_address' => $request->ip(),
            'synced' => false
        ]);

        // Push to Google Sheets if configured
        if (!empty($survey->google_webhook_url)) {
            try {
                // Send async or sync HTTP post depending on scale. Doing sync for simplicity right now.
                $httpResponse = Http::timeout(3)->post($survey->google_webhook_url, $payload);
                if ($httpResponse->successful()) {
                    $response->update(['synced' => true]);
                }
            } catch (\Exception $e) {
                // Log failure, handle retry queue in production
                \Log::error('Google webhook failed for survey ' . $survey->id . ': ' . $e->getMessage());
            }
        }

        return redirect()->back()->with('success', 'Your response has been recorded safely.');
    }
}
