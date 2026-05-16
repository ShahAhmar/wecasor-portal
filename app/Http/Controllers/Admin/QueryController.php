<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Query;
use App\Models\Subject;

class QueryController extends Controller
{
    public function store(Request $request, Subject $subject)
    {
        $request->validate([
            'field_name' => 'required|string',
            'query_text' => 'required|string|max:1000',
            'form_type' => 'required|string',
        ]);

        Query::create([
            'subject_id' => $subject->id,
            'field_name' => $request->field_name,
            'query_text' => $request->query_text,
            'form_type' => $request->form_type,
            'status' => 'Open',
            'raised_by' => auth()->id(),
            'raised_at' => now(),
        ]);

        // Trigger Notification logic here for Site Coordinators
        return redirect()->back()->with('success', 'Query opened successfully.');
    }

    public function answer(Request $request, Query $query)
    {
        $request->validate(['response_text' => 'required|string']);

        $query->update([
            'status' => 'Answered',
            'response_text' => $request->response_text,
            'answered_by' => auth()->id(),
            'answered_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Query answered. Awaiting auditor review.');
    }

    public function resolve(Query $query)
    {
        $query->update([
            'status' => 'Resolved',
            'resolved_by' => auth()->id(),
            'resolved_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Query resolved officially.');
    }

    public function reopen(Request $request, Query $query)
    {
        $request->validate(['query_text' => 'required|string']);

        $query->update([
            'status' => 'Reopened',
            'query_text' => $request->query_text,
            'raised_by' => auth()->id(), // the person who reopened it
        ]);

        return redirect()->back()->with('warning', 'Query has been reopened.');
    }
}
