<?php

namespace App\Policies;

use App\Models\Institution;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class InstitutionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Institution $institution): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function update(User $user, Institution $institution): bool
    {
        return $user->role === 'admin';
    }

    public function delete(User $user, Institution $institution): bool
    {
        return $user->role === 'admin';
    }

    public function restore(User $user, Institution $institution): bool
    {
        return $user->role === 'admin';
    }

    public function forceDelete(User $user, Institution $institution): bool
    {
        return $user->role === 'admin';
    }
}
