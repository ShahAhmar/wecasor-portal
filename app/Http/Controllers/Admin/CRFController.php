<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\EcrfBaseline;
use App\Models\Subject;

class CRFController extends Controller
{
    public function draft(Request $request, Subject $subject, $formType)
    {
        $request->validate([
            'data' => 'required|array'
        ]);

        // Logic to dynamically save an incomplete draft without triggering hard validations
        // Typically saving into a JSON staging column or marking 'status' => 'draft'
        
        // Pseudo code for Baseline form
        if ($formType === 'baseline') {
            $crf = EcrfBaseline::firstOrNew(['subject_id' => $subject->id]);
            // Merge draft data, skip complex required rules.
            $crf->fill($request->data);
            $crf->status = 'draft';
            $crf->save();
        }

        return response()->json(['message' => 'Draft saved successfully.', 'timestamp' => now()]);
    }

    public function submit(Request $request, Subject $subject, $formType)
    {
        // Require strict hard validations before submission
        if ($formType === 'baseline') {
            $validated = $request->validate([
                'data.age' => 'required|integer|min:18',
                'data.admission_date' => 'required|date',
                'data.nihss_score' => 'required|integer|min:0|max:42',
                // other strict clinical fields...
            ]);

            $crf = EcrfBaseline::firstOrNew(['subject_id' => $subject->id]);
            $crf->fill($request->data);
            $crf->status = 'submitted';
            $crf->save();
        }

        return redirect()->back()->with('success', 'CRF Form submitted successfully.');
    }
}
