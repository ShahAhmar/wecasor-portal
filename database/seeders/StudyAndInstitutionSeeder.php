<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Study;
use App\Models\Institution;

class StudyAndInstitutionSeeder extends Seeder
{
    public function run(): void
    {
        // Institutions
        $institutions = [
            ['name' => 'University College Hospital, Ibadan', 'country' => 'Nigeria', 'city' => 'Ibadan'],
            ['name' => 'Korle-Bu Teaching Hospital', 'country' => 'Ghana', 'city' => 'Accra'],
            ['name' => 'Fann Teaching Hospital', 'country' => 'Senegal', 'city' => 'Dakar'],
        ];

        foreach ($institutions as $inst) {
            Institution::updateOrCreate(['name' => $inst['name']], $inst);
        }

        $allInstIds = Institution::all()->pluck('id')->toArray();

        // Studies
        $studies = [
            [
                'title' => 'WACASO Registry',
                'description' => 'West African Stroke Outcomes Registry',
                'status' => 'active'
            ],
            [
                'title' => 'Stroke Transition Study',
                'description' => 'Acute to post-acute care transitions',
                'status' => 'planning'
            ],
            [
                'title' => 'Rehab Access Study',
                'description' => 'Access to neuro-rehabilitation services',
                'status' => 'planning'
            ],
        ];

        $adminId = \App\Models\User::first()->id;

        foreach ($studies as $s) {
            $study = Study::updateOrCreate(['title' => $s['title']], $s);
            // Attach random institutions manually via EthicsApplication pivot
            $instsToAttach = array_slice($allInstIds, 0, rand(1, 4));
            foreach ($instsToAttach as $instId) {
                \App\Models\EthicsApplication::updateOrCreate(
                    ['study_id' => $study->id, 'institution_id' => $instId],
                    ['user_id' => $adminId, 'status' => 'Active']
                );
            }
        }
    }
}
