<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;

trait DataLockable
{
    /**
     * Boot the trait to hook into model events.
     */
    public static function bootDataLockable()
    {
        static::updating(function ($model) {
            if ($model->isHardLocked()) {
                abort(403, 'This record is hard-locked for regulatory compliance and cannot be updated.');
            }

            if ($model->isSoftLocked() && !auth()->user()->hasRole(['Super Admin', 'Monitor / Auditor'])) {
                abort(403, 'This record is soft-locked. Only Auditors or Super Admins can make updates.');
            }
        });

        static::deleting(function ($model) {
            if ($model->isHardLocked()) {
                abort(403, 'This record is hard-locked and cannot be deleted.');
            }

            if ($model->isSoftLocked() && !auth()->user()->hasRole('Super Admin')) {
                abort(403, 'This record is soft-locked and cannot be deleted except by Super Admin.');
            }
        });
    }

    /**
     * Initialize lock_status column default if missing
     */
    public function initializeDataLockable()
    {
        $this->mergeCasts([
            'lock_status' => 'string', // 'open', 'soft_lock', 'hard_lock'
            'locked_at' => 'datetime',
            'locked_by' => 'string'
        ]);
    }

    public function isSoftLocked(): bool
    {
        return $this->lock_status === 'soft_lock';
    }

    public function isHardLocked(): bool
    {
        return $this->lock_status === 'hard_lock';
    }

    public function applySoftLock()
    {
        $this->update([
            'lock_status' => 'soft_lock',
            'locked_at' => now(),
            'locked_by' => auth()->id()
        ]);
    }

    public function applyHardLock()
    {
        $this->update([
            'lock_status' => 'hard_lock',
            'locked_at' => now(),
            'locked_by' => auth()->id()
        ]);
    }

    public function unlock()
    {
        $this->update([
            'lock_status' => 'open',
            'locked_at' => null,
            'locked_by' => null
        ]);
    }
}
