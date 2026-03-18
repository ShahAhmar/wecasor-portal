<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\AuditLog;

class CheckInactiveUsers extends Command
{
    protected $signature = 'users:check-inactivity';
    protected $description = 'Flag users inactive for more than 90 days for review';

    public function handle()
    {
        $inactiveLimit = now()->subDays(90);

        $users = User::query()->where('status', 'Active')
            ->where(function ($query) use ($inactiveLimit) {
                $query->where('last_login_at', '<', $inactiveLimit)
                    ->orWhere(function ($q) use ($inactiveLimit) {
                        $q->whereNull('last_login_at')
                          ->where('created_at', '<', $inactiveLimit);
                    });
            })->get();

        foreach ($users as $user) {
            $user->status = 'Inactive';
            $user->save();

            AuditLog::create([
                'user_id' => $user->id,
                'action' => 'auto_flagged_inactive',
                'details' => ['reason' => '90 days inactivity'],
                'ip_address' => '127.0.0.1',
            ]);

            $this->info("Flagged user: {$user->email} as inactive.");
        }

        $this->info('Inactivity check completed.');
    }
}
