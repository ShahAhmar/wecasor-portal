<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Inertia\Inertia;

class AuditLogController extends Controller
{
    public function index(Request $request)
    {
        $query = AuditLog::with('user')->latest();

        if ($request->filled('action')) {
            $query->where('action', 'like', '%' . $request->action . '%');
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $logs = $query->paginate(20)->withQueryString();
        
        return Inertia::render('Admin/Audit/Index', [
            'logs' => $logs,
            'filters' => $request->only(['action', 'user_id'])
        ]);
    }

    public function export()
    {
        $response = new StreamedResponse(function () {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['ID', 'User', 'Action', 'IP Address', 'Details', 'Timestamp']);

            AuditLog::with('user')->chunk(100, function ($logs) use ($handle) {
                foreach ($logs as $log) {
                    fputcsv($handle, [
                        $log->id,
                        $log->user?->name ?? 'System',
                        $log->action,
                        $log->ip_address,
                        json_encode($log->details),
                        $log->created_at,
                    ]);
                }
            });

            fclose($handle);
        });

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="audit_logs_' . date('Y-m-d') . '.csv"');

        return $response;
    }
}
