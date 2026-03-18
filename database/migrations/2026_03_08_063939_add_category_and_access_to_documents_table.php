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
        Schema::table('documents', function (Blueprint $table) {
            $table->uuid('document_category_id')->nullable();
            $table->string('access_level')->default('Admin'); // Public, Investigators, Governance, Admin

            $table->foreign('document_category_id')->references('id')->on('document_categories')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['document_category_id']);
            $table->dropColumn(['document_category_id', 'access_level']);
        });
    }
};
