<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::create([
            'name' => 'System Administrator',
            'email' => 'admin@wecasor.com',
            'password' => Hash::make('Admin@12345678'), // Temporary password
            'role' => 'Administrator',
            'status' => 'Active',
        ]);

        $admin->assignRole('Administrator');
    }
}
