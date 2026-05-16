<?php

namespace App\Traits;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;

trait Auditable
{
    public static function bootAuditable()
    {
        static::created(function ($model) {
            $model->logAudit('created', [], $model->getAttributes());
        });

        static::updated(function ($model) {
            $oldValues = array_intersect_key($model->getOriginal(), $model->getDirty());
            $newValues = $model->getDirty();
            $model->logAudit('updated', $oldValues, $newValues);
        });

        static::deleted(function ($model) {
            $model->logAudit('deleted', $model->getAttributes(), []);
        });
    }

    public function logAudit($action, $oldValues, $newValues)
    {
        AuditLog::create([
            'user_id' => Auth::id() ?: 1,
            'action' => $action,
            'target_type' => get_class($this),
            'target_id' => $this->id,
            'details' => ['description' => class_basename($this) . " was {$action}"],
            'old_values' => empty($oldValues) ? null : $oldValues,
            'new_values' => empty($newValues) ? null : $newValues,
            'ip_address' => request()->ip() ?? '127.0.0.1',
        ]);
    }
}
