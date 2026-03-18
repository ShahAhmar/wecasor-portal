<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Document;
use App\Models\Study;
use App\Models\DocumentCategory;
use App\Models\User;

class SampleDocumentSeeder extends Seeder
{
    public function run(): void
    {
        $studies = Study::all();
        $categories = DocumentCategory::all();
        $admin = User::where('role', 'Administrator')->first();

        if (!$studies->count() || !$categories->count()) return;

        foreach ($studies as $study) {
            foreach ($categories->take(2) as $category) {
                Document::create([
                    'title' => $study->title . ' - ' . $category->name . ' Draft',
                    'file_path' => 'samples/sample.pdf',
                    'study_id' => $study->id,
                    'document_category_id' => $category->id,
                    'uploaded_by' => $admin->id,
                    'file_size' => rand(500000, 2000000),
                    'mime_type' => 'application/pdf',
                    'type' => 'sample_file',
                    'status' => 'uploaded',
                ]);
            }
        }
    }
}
