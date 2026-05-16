<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::dropIfExists('queries');
        Schema::create('queries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('subject_id');
            $table->string('form_type'); // e.g. baseline, discharge
            $table->string('field_name'); // e.g. nihss_score
            $table->text('query_text');
            $table->text('response_text')->nullable();
            
            // Workflow States: Open, Answered, Resolved, Closed, Reopened
            $table->string('status')->default('Open'); 
            
            // Audit tracking
            $table->uuid('raised_by')->nullable();
            $table->timestamp('raised_at')->nullable();
            
            $table->uuid('answered_by')->nullable();
            $table->timestamp('answered_at')->nullable();
            
            $table->uuid('resolved_by')->nullable();
            $table->timestamp('resolved_at')->nullable();

            $table->timestamps();

            $table->foreign('subject_id')->references('id')->on('subjects')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('queries');
    }
};
