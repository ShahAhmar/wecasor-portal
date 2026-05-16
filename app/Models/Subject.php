<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Traits\LogsActivity;

class Subject extends Model
{
    use HasFactory, HasUuids, SoftDeletes, LogsActivity;

    protected $fillable = [
        'subject_code',
        'site_id',
        'study_id',
        'status',
        'screening_date',
        'enrollment_date',
    ];

    protected $casts = [
        'screening_date' => 'date',
        'enrollment_date' => 'date',
    ];

    public function site()
    {
        return $this->belongsTo(Institution::class, 'site_id');
    }

    public function study()
    {
        return $this->belongsTo(Study::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
