<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class AuditLog extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'action',
        'target_type',
        'target_id',
        'details',
        'ip_address',
    ];

    protected $casts = [
        'details' => 'array',
    ];

    public static function boot()
    {
        parent::boot();

        static::updating(function ($model) {
            return false;
        });

        static::deleting(function ($model) {
            return false;
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
