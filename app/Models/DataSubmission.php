<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Traits\LogsActivity;

class DataSubmission extends Model
{
    use HasUuids, SoftDeletes, LogsActivity;

    protected $fillable = [
        'study_id',
        'institution_id',
        'user_id',
        'data_payload',
        'status',
        'comments'
    ];

    protected $casts = [
        'data_payload' => 'array',
    ];

    public function study()
    {
        return $this->belongsTo(Study::class);
    }
    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
