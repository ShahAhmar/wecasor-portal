<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use App\Models\AuditLog;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function showAdminLogin()
    {
        return Inertia::render('Auth/AdminLogin');
    }

    public function login(Request $request)
    {
        return $this->processLogin($request, false);
    }

    public function adminLogin(Request $request)
    {
        return $this->processLogin($request, true);
    }

    protected function processLogin(Request $request, bool $isAdminPortal)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $throttleKey = Str::lower($request->input('email')) . '|' . $request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            
            AuditLog::create([
                'action' => 'account_locked_attempt',
                'details' => ['email' => $request->email, 'available_in' => $seconds, 'portal' => $isAdminPortal ? 'admin' : 'user'],
                'ip_address' => $request->ip(),
            ]);

            return back()->withErrors([
                'email' => "Too many login attempts. Please try again in $seconds seconds.",
            ])->onlyInput('email');
        }

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Role Separation Logic
            if ($isAdminPortal && $user->role !== 'Administrator') {
                Auth::logout();
                return back()->withErrors(['email' => 'Access denied. You do not have administrator privileges.']);
            }

            if (!$isAdminPortal && $user->role === 'Administrator') {
                Auth::logout();
                return back()->withErrors(['email' => 'Administrators must use the dedicated portal.']);
            }

            $request->session()->regenerate();
            session()->forget('2fa_verified'); 

            RateLimiter::clear($throttleKey);

            $user->last_login_at = now();
            $user->save();

            AuditLog::create([
                'user_id' => $user->id,
                'action' => 'login',
                'details' => ['portal' => $isAdminPortal ? 'admin' : 'user', 'user_agent' => $request->userAgent()],
                'ip_address' => $request->ip(),
            ]);

            return redirect()->intended('admin/dashboard');
        }

        RateLimiter::hit($throttleKey, 300);

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => 'logout',
            'details' => ['user_agent' => $request->userAgent()],
            'ip_address' => $request->ip(),
        ]);

        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
