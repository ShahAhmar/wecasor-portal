<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Traits\LogsActivity;

class Study extends Model
{
    use HasFactory, HasUuids, SoftDeletes, LogsActivity;

    protected $fillable = [
        'title',
        'study_code',
        'description',
        'status',
        'start_date',
        'end_date',
        'pi_name',
        'country_coverage',
        'target_enrollment',
        'expected_follow_up',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'country_coverage' => 'array',
    ];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function dataSubmissions()
    {
        return $this->hasMany(DataSubmission::class);
    }

    public function institutions()
    {
        return $this->belongsToMany(Institution::class, 'ethics_applications')->distinct();
    }

    public function ethicsApplications()
    {
        return $this->hasMany(EthicsApplication::class);
    }
}
