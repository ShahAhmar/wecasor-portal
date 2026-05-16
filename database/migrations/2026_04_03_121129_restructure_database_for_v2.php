<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Rename institutions to sites
        Schema::rename('institutions', 'sites');

        Schema::table('sites', function (Blueprint $table) {
            $table->string('site_code')->nullable();
            $table->string('facility')->nullable();
        });

        // 2. Add site_id to users and drop institution_id & role
        Schema::table('users', function (Blueprint $table) {
            // we will keep institution_id in DB just to prevent foreign key issues,
            // but we add site_id.
            $table->uuid('site_id')->nullable();
        });

        // 3. Subjects Table
        Schema::create('subjects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('subject_code')->unique(); // e.g. NGA-001-0001
            $table->uuid('site_id');
            $table->uuid('study_id');
            $table->string('status')->default('screened');
            $table->date('screening_date')->nullable();
            $table->date('enrollment_date')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('site_id')->references('id')->on('sites')->cascadeOnDelete();
            $table->foreign('study_id')->references('id')->on('studies')->cascadeOnDelete();
        });

        // 4. Update Studies
        Schema::table('studies', function (Blueprint $table) {
            $table->uuid('lead_pi_id')->nullable();
            $table->string('lock_status')->default('open');

            $table->foreign('lead_pi_id')->references('id')->on('users')->nullOnDelete();
        });

        // 5. Update Documents
        Schema::table('documents', function (Blueprint $table) {
            $table->uuid('site_id')->nullable();
            $table->uuid('subject_id')->nullable();

            $table->foreign('site_id')->references('id')->on('sites')->nullOnDelete();
            $table->foreign('subject_id')->references('id')->on('subjects')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subjects');
        Schema::rename('sites', 'institutions');
    }
};
