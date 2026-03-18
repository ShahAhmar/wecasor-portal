<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AuditLog;
use App\Models\Document;
use App\Models\Study;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:manage documents', only: ['create', 'store', 'destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Document::with(['study', 'category', 'uploader']);

        // Dynamic Search
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Study Filtering
        if ($request->filled('study_id')) {
            $query->where('study_id', $request->study_id);
        }

        // Category Filtering
        if ($request->filled('category_id')) {
            $query->where('document_category_id', $request->category_id);
        }

        // 1. Role-based Category Filtering (Restrict sensitive docs for non-admins)
        if ($user->role !== 'Administrator' && $user->role !== 'Governance Member') {
            $query->whereHas('category', function ($q) {
                $q->whereNotIn('name', ['Governance Reports', 'DSMB Reports', 'Conflict of Interest (COI)', 'Meeting Minutes']);
            });
        }

        // 2. Institution-based Data Isolation
        if (in_array($user->role, ['Site Investigator', 'Data Abstractor'])) {
            $query->whereHas('study.institutions', function ($q) use ($user) {
                $q->where('institutions.id', $user->institution_id);
            });
        } elseif ($user->role === 'Country Coordinator') {
            $query->whereHas('study.institutions', function ($q) use ($user) {
                $q->where('institutions.country', $user->country);
            });
        }

        $documents = $query->latest()->paginate(15)->withQueryString();
        $studies = Study::all();
        $categories = \App\Models\DocumentCategory::all();

        // Filter available categories for sidebar/select based on role
        if ($user->role !== 'Administrator' && $user->role !== 'Governance Member') {
            $categories = $categories->whereNotIn('name', ['Governance Reports', 'DSMB Reports', 'Conflict of Interest (COI)', 'Meeting Minutes']);
        }

        return Inertia::render('Admin/Documents/Index', [
            'documents' => $documents,
            'studies' => $studies,
            'categories' => $categories,
            'filters' => $request->only(['search', 'study_id', 'category_id']),
        ]);
    }

    public function create()
    {
        $studies = Study::all();
        $categories = \App\Models\DocumentCategory::all();
        return Inertia::render('Admin/Documents/Create', [
            'studies' => $studies,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|max:10240', // 10MB limit
            'study_id' => 'required|exists:studies,id',
            'document_category_id' => 'required|exists:document_categories,id',
        ]);

        $study = Study::findOrFail($request->study_id);
        $file = $request->file('file');

        // Secure folder path: studies/{study_id}/{category_id}/{filename}
        $path = $file->storeAs(
            "studies/{$study->id}/{$request->document_category_id}",
            time() . '_' . $file->getClientOriginalName(),
            'private'
        );

        Document::create([
            'title' => $request->title,
            'file_path' => $path,
            'study_id' => $request->study_id,
            'document_category_id' => $request->document_category_id,
            'uploaded_by' => auth()->id(),
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'type' => 'research_document', // Default type to satisfy NOT NULL constraint
        ]);

        return redirect()->route('documents.index');
    }

    public function download(Document $document)
    {
        if (!Storage::disk('private')->exists($document->file_path)) {
            return back()->with('error', 'The requested file could not be found on the server.');
        }

        // Audit logging for download
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'document_download',
            'details' => [
                'document_id' => $document->id,
                'document_title' => $document->title,
                'study_id' => $document->study_id,
            ],
            'ip_address' => request()->ip(),
        ]);

        return Storage::disk('private')->download($document->file_path, $document->title);
    }

    public function destroy(Document $document)
    {
        Storage::disk('private')->delete($document->file_path);
        $document->delete();

        return redirect()->route('documents.index');
    }
}
