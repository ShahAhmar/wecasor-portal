<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Traits\LogsActivity;

class EthicsApplication extends Model
{
    use HasUuids, SoftDeletes, LogsActivity;

    protected $fillable = [
        'study_id',
        'institution_id',
        'user_id',
        'protocol_document',
        'consent_form',
        'status',
        'submission_date'
    ];

    protected $casts = [
        'submission_date' => 'datetime',
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
