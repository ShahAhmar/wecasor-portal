<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

use App\Traits\LogsActivity;

class SystemSetting extends Model
{
    use HasUuids, LogsActivity;
    protected $fillable = [
        'key',
        'value',
        'group'
    ];
}
