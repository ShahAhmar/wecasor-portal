<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            'manage studies',
            'manage sites',
            'manage users',
            'manage documents',
            'enter data',
            'review data',
            'raise queries',
            'manage queries',
            'view full portfolio',
            'view country portfolio',
            'view assigned studies',
            'view site',
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(['name' => $permission]);
        }

        // 1. Super Admin
        $superAdmin = Role::updateOrCreate(['name' => 'Super Admin']);
        $superAdmin->syncPermissions(Permission::all());

        // 2. Study Admin
        $studyAdmin = Role::updateOrCreate(['name' => 'Study Admin']);
        $studyAdmin->syncPermissions([
            'manage documents',
            'manage sites',
            'manage queries',
            'view assigned studies'
        ]);

        // 3. Country Lead
        $countryLead = Role::updateOrCreate(['name' => 'Country Lead']);
        $countryLead->syncPermissions([
            'view country portfolio',
            'view site',
            'manage queries' // escalating queries
        ]);

        // 4. Site Coordinator
        $siteCoordinator = Role::updateOrCreate(['name' => 'Site Coordinator']);
        $siteCoordinator->syncPermissions([
            'view site',
            'enter data',
            'manage documents',
            'manage queries' // answering queries
        ]);

        // 5. Monitor / Auditor
        $monitorAudit = Role::updateOrCreate(['name' => 'Monitor / Auditor']);
        $monitorAudit->syncPermissions([
            'view site',
            'review data',
            'raise queries',
            'view assigned studies'
        ]);

        // 6. PI / Reviewer
        $piReviewer = Role::updateOrCreate(['name' => 'PI / Reviewer']);
        $piReviewer->syncPermissions([
            'view site',
            'review data',
            'manage documents'
        ]);
    }
}
