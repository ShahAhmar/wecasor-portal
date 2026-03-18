<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('study_id');
            $table->uuid('institution_id');
            $table->uuid('user_id'); // submitted by
            $table->json('data_payload')->nullable();
            $table->string('status')->default('Pending'); // Pending, Approved, Rejected, Revision Requested
            $table->text('comments')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('study_id')->references('id')->on('studies')->cascadeOnDelete();
            $table->foreign('institution_id')->references('id')->on('institutions')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_submissions');
    }
};
