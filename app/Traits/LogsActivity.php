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
        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => $event,
            'target_type' => get_class($model),
            'target_id' => $model->id,
            'details' => [
                'attributes' => $model->getAttributes(),
                'original' => $model->getOriginal(),
                'user_agent' => Request::userAgent(),
            ],
            'ip_address' => Request::ip(),
        ]);
    }
}
