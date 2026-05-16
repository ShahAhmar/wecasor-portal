<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\AbstractSubmission;
use App\Models\ConferenceRegistration;
use Inertia\Inertia;

class ConferenceAdminController extends Controller
{
    public function abstracts()
    {
        return Inertia::render('Admin/Conference/Abstracts', [
            'abstracts' => AbstractSubmission::latest()->get()
        ]);
    }

    public function registrations()
    {
        return Inertia::render('Admin/Conference/Registrations', [
            'registrations' => ConferenceRegistration::latest()->get()
        ]);
    }

    public function updateAbstractStatus(Request $request, AbstractSubmission $abstract)
    {
        $request->validate(['status' => 'required|string']);
        $abstract->update(['status' => $request->status]);
        return redirect()->back()->with('success', 'Abstract status updated.');
    }
}
