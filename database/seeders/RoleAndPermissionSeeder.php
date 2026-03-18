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
            'manage users',
            'view audit logs',
            'view all sites',
            'view aggregated data',
            'approve publications',
            'manage documents',
            'view governance docs',
            'view reports',
            'submit data',
            'manage queries',
            'view own site',
            'edit own site',
            'manage institutions',
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(['name' => $permission]);
        }

        // 1. Administrator: Full system access
        $admin = Role::updateOrCreate(['name' => 'Administrator']);
        $admin->syncPermissions(Permission::all());

        // 2. Governance Member: Aggregate data, DSMB reports, Publication committee
        $governance = Role::updateOrCreate(['name' => 'Governance Member']);
        $governance->syncPermissions([
            'view aggregated data', 
            'view governance docs', 
            'view reports', 
            'approve publications', 
            'view audit logs'
        ]);

        // 3. Country Coordinator: Country-level aggregation, training, site support
        $coordinator = Role::updateOrCreate(['name' => 'Country Coordinator']);
        $coordinator->syncPermissions([
            'view all sites', 
            'manage documents', 
            'view reports', 
            'manage queries'
        ]);

        // 4. Site Investigator (PI): Manage site team and data
        $pi = Role::updateOrCreate(['name' => 'Site Investigator']);
        $pi->syncPermissions([
            'view own site', 
            'edit own site', 
            'submit data', 
            'manage documents', 
            'manage queries', 
            'view reports'
        ]);

        // 5. Data Abstractor: Purely data entry at site level
        $abstractor = Role::updateOrCreate(['name' => 'Data Abstractor']);
        $abstractor->syncPermissions([
            'submit data', 
            'view own site', 
            'manage queries'
        ]);

        // 6. Viewer (Restricted): Read-only dashboards and specific documents
        $viewer = Role::updateOrCreate(['name' => 'Viewer']);
        $viewer->syncPermissions([
            'view reports'
        ]);
    }
}
