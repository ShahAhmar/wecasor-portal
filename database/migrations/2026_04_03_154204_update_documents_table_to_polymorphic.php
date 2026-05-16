<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->uuidMorphs('documentable'); // Creates documentable_id and documentable_type
            $table->string('version')->default('1.0');
            $table->boolean('is_expired')->default(false);
            $table->timestamp('expiry_date')->nullable();
            $table->json('role_permissions')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropMorphs('documentable');
            $table->dropColumn(['version', 'is_expired', 'expiry_date', 'role_permissions']);
        });
    }
};
