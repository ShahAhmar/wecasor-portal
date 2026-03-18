<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DocumentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Document $document): bool
    {
        return $user->role === 'admin' || $user->role === 'coordinator' || $user->id === $document->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Document $document): bool
    {
        return $user->role === 'admin' || $user->role === 'coordinator' || $user->id === $document->user_id;
    }

    public function delete(User $user, Document $document): bool
    {
        return $user->role === 'admin' || $user->id === $document->user_id;
    }

    public function restore(User $user, Document $document): bool
    {
        return $user->role === 'admin';
    }

    public function forceDelete(User $user, Document $document): bool
    {
        return $user->role === 'admin';
    }
}
