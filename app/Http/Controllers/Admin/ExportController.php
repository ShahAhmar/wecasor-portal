<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Models\Study;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    public function exportSubjects(Study $study)
    {
        $subjects = $study->subjects()->get();
        $csvHeader = "Subject ID,Screening Date,Enrollment Date,Status,Data Lock\n";
        $csvRow = [];
        
        foreach($subjects as $subj) {
            $csvRow[] = "{$subj->subject_id},{$subj->screening_date},{$subj->enrollment_date},{$subj->status},{$study->lock_status}";
        }

        $csvData = $csvHeader . implode("\n", $csvRow);
        
        return response($csvData)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="study_' . $study->study_code . '_subjects.csv"');
    }
}
