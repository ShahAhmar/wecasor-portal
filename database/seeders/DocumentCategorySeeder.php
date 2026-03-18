<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DocumentCategory;

class DocumentCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Study Protocol', 'description' => 'Official research protocols'],
            ['name' => 'Ethics Approval', 'description' => 'Institutional Review Board approvals'],
            ['name' => 'Data Management Plan', 'description' => 'DMP and data standards'],
            ['name' => 'Publication Draft', 'description' => 'Manuscripts and committee reviews'],
            ['name' => 'Case Report Forms', 'description' => 'Templates and guidelines for data entry'],
            ['name' => 'Governance Reports', 'description' => 'Official WeCASOR network governance documents'],
            ['name' => 'DSMB Reports', 'description' => 'Data and Safety Monitoring Board reports'],
            ['name' => 'Conflict of Interest (COI)', 'description' => 'Annual and project-specific investigator declarations'],
            ['name' => 'Meeting Minutes', 'description' => 'Governance and committee meeting records'],
            ['name' => 'Training Materials', 'description' => 'Standardized training modules and certificates'],
        ];

        foreach ($categories as $cat) {
            DocumentCategory::updateOrCreate(['name' => $cat['name']], $cat);
        }
    }
}
