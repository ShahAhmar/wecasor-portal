<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $fillable = ['title', 'slug', 'description', 'google_webhook_url', 'status', 'config_json'];

    protected $casts = [
        'config_json' => 'array',
    ];

    public function responses()
    {
        return $this->hasMany(SurveyResponse::class);
    }
}
