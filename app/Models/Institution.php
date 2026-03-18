<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Traits\LogsActivity;

class Institution extends Model
{
    use HasFactory, HasUuids, SoftDeletes, LogsActivity;

    protected $fillable = [
        'name',
        'country',
        'city',
        'type',
        'contact_person',
        'email',
        'phone',
        'website',
        'status',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function studies()
    {
        return $this->belongsToMany(Study::class, 'ethics_applications')->distinct();
        // Since ethics_applications ties studies, institutions and users it can act as a pivot.
        // Or if there is a direct relation we can define it. For now let's just use it as simple hasMany if tracking submissions
    }

    public function dataSubmissions()
    {
        return $this->hasMany(DataSubmission::class);
    }

    public function ethicsApplications()
    {
        return $this->hasMany(EthicsApplication::class);
    }
}
