<?php

namespace App\Policies;

use App\Models\Study;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class StudyPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Study $study): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->role === 'admin' || $user->role === 'coordinator';
    }

    public function update(User $user, Study $study): bool
    {
        return $user->role === 'admin' || $user->role === 'coordinator';
    }

    public function delete(User $user, Study $study): bool
    {
        return $user->role === 'admin';
    }

    public function restore(User $user, Study $study): bool
    {
        return $user->role === 'admin';
    }

    public function forceDelete(User $user, Study $study): bool
    {
        return $user->role === 'admin';
    }
}
