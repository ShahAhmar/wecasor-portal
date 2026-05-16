<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\StudyController;
use App\Http\Controllers\Admin\InstitutionController;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return redirect()->route('login');
});

// TEMPORARY SECURE ROUTE FOR DEPLOYMENT MIGRATIONS
Route::get('/run-migrations-secret', function() {
    try {
        Artisan::call('migrate', ['--force' => true]);
        
        // Ensure roles exist
        Artisan::call('db:seed', ['--class' => 'RoleAndPermissionSeeder', '--force' => true]);
        
        // Assign Super Admin role to the specific user
        $user = \App\Models\User::where('email', 'shahahmar882@gmail.com')->first();
        if ($user) {
            $user->role = 'Super Admin';
            $user->save();
            $user->assignRole('Super Admin');
            return '<pre>Migration and Role Assignment Successful for ' . $user->email . '</pre>';
        }
        
        return '<pre>Migration successful, but user shahahmar882@gmail.com not found.</pre>';
    } catch (\Exception $e) {
        return $e->getMessage();
    }
});

// Public Login (Site Investigators, Coordinators, etc.)
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

// Public Surveys
Route::get('/s/{slug}', [\App\Http\Controllers\PublicSurveyController::class, 'show'])->name('surveys.public.show');
Route::post('/s/{slug}/submit', [\App\Http\Controllers\PublicSurveyController::class, 'submit'])->name('surveys.public.submit');

// Conference Ecosystem
Route::get('/abuja-conference-2026', [\App\Http\Controllers\Public\ConferenceController::class, 'showConference'])->name('conference.home');
Route::post('/abuja-conference-2026/register', [\App\Http\Controllers\Public\ConferenceController::class, 'register'])->name('conference.register');
Route::get('/abstract-submission-2026', [\App\Http\Controllers\Public\ConferenceController::class, 'showAbstractSubmission'])->name('conference.abstracts');
Route::post('/abstract-submission-2026/submit', [\App\Http\Controllers\Public\ConferenceController::class, 'submitAbstract'])->name('conference.abstracts.submit');


// Admin Specific Login
Route::get('/admin/login', [AuthController::class, 'showAdminLogin'])->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'adminLogin']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Password Reset Routes
Route::get('/forgot-password', [AuthController::class, 'showForgotPassword'])->name('password.request');
Route::post('/forgot-password', [AuthController::class, 'sendResetLink'])->name('password.email');
Route::get('/reset-password/{token}', [AuthController::class, 'showResetPassword'])->name('password.reset');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.store');

Route::prefix('admin')->middleware(['auth', '2fa'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::resource('studies', StudyController::class);
    Route::resource('institutions', InstitutionController::class)->middleware('role:Super Admin|Country Lead');
    Route::resource('surveys', \App\Http\Controllers\Admin\SurveyHubController::class)->middleware('role:Super Admin');
    Route::get('surveys/{survey}/responses', [\App\Http\Controllers\Admin\SurveyHubController::class, 'responses'])->name('surveys.responses')->middleware('role:Super Admin');
    
    // Exports
    Route::get('/exports/subjects/{study}', [\App\Http\Controllers\Admin\ExportController::class, 'exportSubjects'])->name('admin.exports.subjects');

    // Study Workspace Sub-routes
    Route::prefix('studies/{study}/workspace')->name('studies.workspace.')->group(function () {
        Route::get('/', [\App\Http\Controllers\Admin\StudyWorkspaceController::class, 'overview'])->name('overview');
        Route::get('/protocol', [\App\Http\Controllers\Admin\StudyWorkspaceController::class, 'protocol'])->name('protocol');
        Route::get('/sites', [\App\Http\Controllers\Admin\StudyWorkspaceController::class, 'sites'])->name('sites');
        Route::get('/enrollment', [\App\Http\Controllers\Admin\StudyWorkspaceController::class, 'enrollment'])->name('enrollment');
        Route::get('/queries', [\App\Http\Controllers\Admin\StudyWorkspaceController::class, 'queries'])->name('queries');
    });

    // Site Workspace Sub-routes
    Route::prefix('institutions/{site}/workspace')->name('sites.workspace.')->group(function () {
        Route::get('/', [\App\Http\Controllers\Admin\SiteWorkspaceController::class, 'overview'])->name('overview');
        Route::get('/team', [\App\Http\Controllers\Admin\SiteWorkspaceController::class, 'team'])->name('team');
        Route::post('/team/assign', [\App\Http\Controllers\Admin\SiteWorkspaceController::class, 'assignUser'])->name('team.assign');
        Route::get('/documents', [\App\Http\Controllers\Admin\SiteWorkspaceController::class, 'documents'])->name('documents');
        Route::get('/enrollment', [\App\Http\Controllers\Admin\SiteWorkspaceController::class, 'enrollment'])->name('enrollment');
    });

    // Subject Registry and Context
    Route::resource('subjects', \App\Http\Controllers\Admin\SubjectController::class);
    Route::get('subjects/{subject}/timeline', [\App\Http\Controllers\Admin\SubjectController::class, 'timeline'])->name('subjects.timeline');
    Route::get('subjects/{subject}/crfs', [\App\Http\Controllers\Admin\SubjectController::class, 'crfs'])->name('subjects.crfs');

    Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->middleware('role:Super Admin');
    
    Route::post('documents/upload-polymorphic', [\App\Http\Controllers\Admin\DocumentController::class, 'storePolymorphic'])->name('documents.store.polymorphic');
    Route::resource('documents', \App\Http\Controllers\Admin\DocumentController::class);
    Route::get('/documents/{document}/download', [\App\Http\Controllers\Admin\DocumentController::class, 'download'])->name('documents.download');

    Route::post('subjects/{subject}/crf/{formType}', [\App\Http\Controllers\Admin\CRFController::class, 'submit'])->name('crf.submit');

    // Audit Logs
    Route::get('/audit', [\App\Http\Controllers\Admin\AuditLogController::class, 'index'])->name('admin.audit.index')->middleware('role:Super Admin|Monitor / Auditor');
    Route::get('/audit/export', [\App\Http\Controllers\Admin\AuditLogController::class, 'export'])->name('admin.audit.export')->middleware('role:Super Admin|Monitor / Auditor');

    // Profile Settings
    Route::get('/profile', function() {
        return Inertia\Inertia::render('Admin/Profile', [
            'user' => auth()->user()->load('site'),
            'userLogs' => \App\Models\AuditLog::where('user_id', auth()->id())->latest()->take(5)->get()
        ]);
    })->name('admin.profile');

    // 2FA Routes
    Route::get('/2fa/setup', [TwoFactorController::class, 'setup'])->name('admin.2fa.setup')->withoutMiddleware(['2fa']);
    Route::post('/2fa/send', [TwoFactorController::class, 'sendOtp'])->name('admin.2fa.send')->withoutMiddleware(['2fa']);
    Route::post('/2fa/confirm', [TwoFactorController::class, 'confirm'])->name('admin.2fa.confirm')->withoutMiddleware(['2fa']);
    Route::get('/2fa/challenge', [TwoFactorController::class, 'showChallenge'])->name('admin.2fa.challenge')->withoutMiddleware(['2fa']);
    Route::post('/2fa/verify', [TwoFactorController::class, 'verify'])->name('admin.2fa.verify')->withoutMiddleware(['2fa']);

    // System Settings
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('admin.settings')->middleware('role:Super Admin');
    Route::get('/settings/ai', [\App\Http\Controllers\Admin\SettingController::class, 'aiSettings'])->name('admin.settings.ai')->middleware('role:Super Admin');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('admin.settings.update')->middleware('role:Super Admin');
    // AI Chat
    Route::post('/chat', [\App\Http\Controllers\Admin\ChatController::class, 'chat'])->name('admin.chat');

    // Conference Admin
    Route::prefix('conference')->name('admin.conference.')->group(function () {
        Route::get('/abstracts', [\App\Http\Controllers\Admin\ConferenceAdminController::class, 'abstracts'])->name('abstracts');
        Route::get('/registrations', [\App\Http\Controllers\Admin\ConferenceAdminController::class, 'registrations'])->name('registrations');
        Route::post('/abstracts/{abstract}/status', [\App\Http\Controllers\Admin\ConferenceAdminController::class, 'updateAbstractStatus'])->name('abstracts.status');
    });
});
