<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class AbstractSubmission extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'institution',
        'country',
        'title',
        'abstract_content',
        'thematic_area',
        'presentation_type',
        'status',
        'language',
    ];
}
