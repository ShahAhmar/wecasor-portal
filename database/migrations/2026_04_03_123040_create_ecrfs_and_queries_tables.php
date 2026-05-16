<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ecrf_baselines', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('subject_id')->constrained('subjects')->cascadeOnDelete();
            $table->date('screening_date');
            $table->date('enrollment_date');
            $table->integer('age')->nullable();
            $table->string('sex')->nullable(); // Male, Female, Other, Unknown
            $table->string('stroke_type')->nullable(); // Ischemic, Hemorrhagic, Unknown
            $table->date('admission_date')->nullable();
            $table->integer('blood_pressure_systolic')->nullable();
            $table->integer('blood_pressure_diastolic')->nullable();
            $table->integer('nihss')->nullable();
            $table->string('imaging_performed')->nullable();
            $table->string('acute_treatment_received')->nullable();
            $table->json('comorbidities_summary')->nullable();
            $table->string('status')->default('draft'); // draft, submitted, queried
            $table->string('query_ready_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('ecrf_discharges', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('subject_id')->constrained('subjects')->cascadeOnDelete();
            $table->date('discharge_date')->nullable();
            $table->string('discharge_status')->nullable();
            $table->string('discharge_destination')->nullable();
            $table->json('in_hospital_complications')->nullable();
            $table->integer('length_of_stay')->nullable();
            $table->text('medication_at_discharge')->nullable();
            $table->string('status')->default('draft');
            $table->string('query_ready_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('ecrf_follow_ups', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('subject_id')->constrained('subjects')->cascadeOnDelete();
            $table->string('visit_type')->nullable(); // 30-day, 90-day, 180-day
            $table->date('visit_date')->nullable();
            $table->string('alive')->nullable(); // Yes, No, Unknown
            $table->date('date_of_death')->nullable();
            $table->string('mrs_score')->nullable(); // 0,1,2,3,4,5,6
            $table->string('rehospitalized_since_last_contact')->nullable();
            $table->string('rehab_access')->nullable();
            $table->string('medication_continuity')->nullable();
            $table->string('contact_method')->nullable();
            $table->string('status')->default('draft');
            $table->string('query_ready_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('queries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('subject_id')->constrained('subjects')->cascadeOnDelete();
            $table->uuid('site_id')->constrained('sites')->cascadeOnDelete();
            $table->string('form_type')->nullable(); // e.g. ecrf_baselines
            $table->uuid('form_id')->nullable();
            $table->string('field_name')->nullable();
            $table->text('issue_description');
            $table->text('resolution_note')->nullable();
            $table->string('status')->default('Open'); // Open, Answered, Resolved, Closed, Reopened
            $table->string('query_type')->default('Manual'); // Manual, Auto
            $table->uuid('raised_by_id')->nullable()->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('queries');
        Schema::dropIfExists('ecrf_follow_ups');
        Schema::dropIfExists('ecrf_discharges');
        Schema::dropIfExists('ecrf_baselines');
    }
};
