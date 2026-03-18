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
        Schema::table('institutions', function (Blueprint $table) {
            $table->string('type')->nullable(); // Hospital / University / Research Center
            $table->string('contact_person')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->string('status')->default('Active'); // Active / Pending / Suspended
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('country')->nullable();
            $table->string('status')->default('Active');
            $table->string('phone')->nullable();
            $table->string('profile_image')->nullable();
        });

        Schema::table('studies', function (Blueprint $table) {
            $table->string('study_code')->nullable();
            $table->string('pi_name')->nullable();
            $table->json('country_coverage')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('institutions', function (Blueprint $table) {
            $table->dropColumn(['type', 'contact_person', 'email', 'phone', 'website', 'status']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['country', 'status', 'phone', 'profile_image']);
        });

        Schema::table('studies', function (Blueprint $table) {
            $table->dropColumn(['study_code', 'pi_name', 'country_coverage']);
        });
    }
};
