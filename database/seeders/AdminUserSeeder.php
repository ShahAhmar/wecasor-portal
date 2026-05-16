<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@wecasor.com'],
            [
                'name' => 'System Administrator',
                'password' => Hash::make('Admin@12345678'), // Temporary password
                'status' => 'Active',
            ]
        );

        $admin->syncRoles(['Super Admin']);

        // 2. Study Admin
        $studyAdmin = User::updateOrCreate(
            ['email' => 'studyadmin@wecasor.com'],
            ['name' => 'Study Administrator', 'password' => Hash::make('Admin@12345678'), 'status' => 'Active']
        );
        $studyAdmin->syncRoles(['Study Admin']);

        // 3. Country Lead
        $countryLead = User::updateOrCreate(
            ['email' => 'countrylead@wecasor.com'],
            ['name' => 'Country Lead', 'country' => 'Nigeria', 'password' => Hash::make('Admin@12345678'), 'status' => 'Active']
        );
        $countryLead->syncRoles(['Country Lead']);

        // 4. Site Coordinator
        $siteCoordinator = User::updateOrCreate(
            ['email' => 'coordinator@wecasor.com'],
            ['name' => 'Site Coordinator', 'password' => Hash::make('Admin@12345678'), 'status' => 'Active']
        );
        $siteCoordinator->syncRoles(['Site Coordinator']);

        // 5. Monitor / Auditor
        $monitorAudit = User::updateOrCreate(
            ['email' => 'monitor@wecasor.com'],
            ['name' => 'Trial Monitor', 'password' => Hash::make('Admin@12345678'), 'status' => 'Active']
        );
        $monitorAudit->syncRoles(['Monitor / Auditor']);

        // 6. PI / Reviewer
        $piReviewer = User::updateOrCreate(
            ['email' => 'pi@wecasor.com'],
            ['name' => 'Principal Investigator', 'password' => Hash::make('Admin@12345678'), 'status' => 'Active']
        );
        $piReviewer->syncRoles(['PI / Reviewer']);
    }
}
