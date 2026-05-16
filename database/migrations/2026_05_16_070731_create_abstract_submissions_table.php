<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('abstract_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email');
            $table->string('institution');
            $table->string('country');
            $table->string('title');
            $table->text('abstract_content');
            $table->string('thematic_area');
            $table->string('presentation_type')->default('Oral'); // Oral or Poster
            $table->string('status')->default('pending');
            $table->string('language')->default('en');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abstract_submissions');
    }
};
