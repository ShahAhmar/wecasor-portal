<?php

namespace App\Traits;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

trait LogsActivity
{
    protected static function bootLogsActivity()
    {
        foreach (static::getAuditEvents() as $event) {
            static::$event(function ($model) use ($event) {
                static::logActivity($model, $event);
            });
        }
    }

    protected static function getAuditEvents()
    {
        return ['created', 'updated', 'deleted'];
    }

    protected static function logActivity($model, $event)
    {
        $oldValues = $event === 'updated' ? array_intersect_key($model->getOriginal(), $model->getChanges()) : null;
        $newValues = $event === 'updated' ? $model->getChanges() : $model->getAttributes();

        AuditLog::create([
            'user_id' => Auth::id() ?: 1,
            'action' => $event,
            'target_type' => get_class($model),
            'target_id' => $model->id,
            'details' => [
                'user_agent' => Request::userAgent(),
            ],
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'ip_address' => Request::ip() ?? '127.0.0.1',
        ]);
    }
}
