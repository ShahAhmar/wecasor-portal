<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SystemSetting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'history' => 'nullable|array'
        ]);

        $apiKey = SystemSetting::where('key', 'groq_api_key')->first()?->value;
        $model = SystemSetting::where('key', 'groq_model')->first()?->value ?? 'llama-3.3-70b-versatile';
        $systemKnowledge = SystemSetting::where('key', 'ai_system_knowledge')->first()?->value ?? 'You are WeCASOR AI, a helpful assistant for the WeCASOR Research Portal.';

        if (!$apiKey) {
            return response()->json([
                'error' => 'Grok AI API Key not configured. Please contact the administrator.'
            ], 400);
        }

        $user = Auth::user();
        $userRole = $user->getRoleNames()->first() ?? 'User';
        
        $enhancedSystemKnowledge = "User Identity: {$user->name} ({$userRole}).\n" . $systemKnowledge;

        try {
            // Using Groq Cloud official endpoint
            $response = Http::withToken($apiKey)
                ->withoutVerifying() // Necessary for some local environments like XAMPP
                ->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => $model ?: 'llama-3.3-70b-versatile',
                    'messages' => array_merge(
                        [['role' => 'system', 'content' => $enhancedSystemKnowledge]],
                        $request->history ?? [],
                        [['role' => 'user', 'content' => $request->message]]
                    ),
                    'temperature' => 0.7,
                ]);

            if ($response->failed()) {
                $errorBody = $response->json();
                $errorMessage = $errorBody['error']['message'] ?? ($errorBody['message'] ?? 'Unknown API Error');
                throw new \Exception($errorMessage);
            }

            return response()->json([
                'reply' => $response->json()['choices'][0]['message']['content'] ?? 'I apologize, but I am unable to process your request at this time.'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'WeCASOR AI (Groq) is currently unreachable: ' . $e->getMessage()
            ], 500);
        }
    }
}
