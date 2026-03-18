<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

use App\Traits\LogsActivity;

class Announcement extends Model
{
    use HasUuids, LogsActivity;
    protected $fillable = [
        'title',
        'message',
        'target_audience',
        'publish_date',
        'expiry_date'
    ];

    protected $casts = [
        'target_audience' => 'array',
        'publish_date' => 'datetime',
        'expiry_date' => 'datetime',
    ];
}
