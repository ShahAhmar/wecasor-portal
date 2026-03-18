<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

use App\Traits\LogsActivity;

class Notification extends Model
{
    use HasUuids, LogsActivity;
    protected $fillable = [
        'user_id',
        'type',
        'message',
        'read_at'
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
