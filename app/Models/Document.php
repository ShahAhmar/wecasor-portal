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
        'file_path',
        'study_id',
        'document_category_id',
        'uploaded_by',
        'file_size',
        'mime_type',
        'status',
    ];

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function category()
    {
        return $this->belongsTo(DocumentCategory::class, 'document_category_id');
    }

    public function study()
    {
        return $this->belongsTo(Study::class);
    }

    public function documentCategory()
    {
        return $this->belongsTo(DocumentCategory::class, 'document_category_id');
    }
}
