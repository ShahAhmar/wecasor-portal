<?php

namespace App\Policies;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AuditLogPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function view(User $user, AuditLog $auditLog): bool
    {
        return $user->role === 'admin';
    }

    public function create(User $user): bool
    {
        return false; // Logs are auto-created
    }

    public function update(User $user, AuditLog $auditLog): bool
    {
        return false; // Logs are immutable
    }

    public function delete(User $user, AuditLog $auditLog): bool
    {
        return false; // Logs are immutable
    }

    public function restore(User $user, AuditLog $auditLog): bool
    {
        return false;
    }

    public function forceDelete(User $user, AuditLog $auditLog): bool
    {
        return false;
    }
}
