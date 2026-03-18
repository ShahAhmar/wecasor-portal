<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\StudyController;
use App\Http\Controllers\Admin\InstitutionController;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return redirect()->route('login');
});

// Public Login (Site Investigators, Coordinators, etc.)
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

// Admin Specific Login
Route::get('/admin/login', [AuthController::class, 'showAdminLogin'])->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'adminLogin']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::prefix('admin')->middleware(['auth', '2fa'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::resource('studies', StudyController::class);
    Route::resource('institutions', InstitutionController::class);
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
    Route::resource('documents', \App\Http\Controllers\Admin\DocumentController::class);
    Route::get('/documents/{document}/download', [\App\Http\Controllers\Admin\DocumentController::class, 'download'])->name('documents.download');

    // Audit Logs
    Route::get('/audit', [\App\Http\Controllers\Admin\AuditLogController::class, 'index'])->name('admin.audit.index');
    Route::get('/audit/export', [\App\Http\Controllers\Admin\AuditLogController::class, 'export'])->name('admin.audit.export');

    // Profile Settings
    Route::get('/profile', function() {
        return Inertia\Inertia::render('Admin/Profile', [
            'user' => auth()->user()->load('institution'),
            'userLogs' => \App\Models\AuditLog::where('user_id', auth()->id())->latest()->take(5)->get()
        ]);
    })->name('admin.profile');

    // 2FA Routes
    Route::get('/2fa/setup', [TwoFactorController::class, 'setup'])->name('admin.2fa.setup')->withoutMiddleware(['2fa']);
    Route::post('/2fa/confirm', [TwoFactorController::class, 'confirm'])->name('admin.2fa.confirm')->withoutMiddleware(['2fa']);
    Route::get('/2fa/challenge', [TwoFactorController::class, 'showChallenge'])->name('admin.2fa.challenge')->withoutMiddleware(['2fa']);
    Route::post('/2fa/verify', [TwoFactorController::class, 'verify'])->name('admin.2fa.verify')->withoutMiddleware(['2fa']);

    // System Settings
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('admin.settings');
    Route::get('/settings/ai', [\App\Http\Controllers\Admin\SettingController::class, 'aiSettings'])->name('admin.settings.ai');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('admin.settings.update');
    // AI Chat
    Route::post('/chat', [\App\Http\Controllers\Admin\ChatController::class, 'chat'])->name('admin.chat');
});
