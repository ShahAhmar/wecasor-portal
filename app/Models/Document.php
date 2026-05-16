<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Traits\LogsActivity;

class Document extends Model
{
    use HasFactory, HasUuids, SoftDeletes, LogsActivity;

    protected $fillable = [
        'title',
        'type',
        'file_path',
        'documentable_id',
        'documentable_type',
        'document_category_id',
        'uploaded_by',
        'file_size',
        'mime_type',
        'status',
        'version',
        'is_expired',
        'expiry_date',
        'role_permissions'
    ];

    protected $casts = [
        'role_permissions' => 'array',
        'is_expired' => 'boolean',
        'expiry_date' => 'datetime',
    ];

    public function documentable()
    {
        return $this->morphTo();
    }

    public function study()
    {
        return $this->belongsTo(Study::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function category()
    {
        return $this->belongsTo(DocumentCategory::class, 'document_category_id');
    }
}
