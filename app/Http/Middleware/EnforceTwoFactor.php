<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnforceTwoFactor
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if (!$user) {
            return $next($request);
        }

        // Mandatory roles for 2FA
        $mandatoryRoles = ['Administrator', 'Governance Member'];

        if (in_array($user->role, $mandatoryRoles)) {
            // Check if 2FA is confirmed
            if (!$user->two_factor_confirmed_at) {
                // If not confirmed, redirect to setup unless already on setup page
                if (!$request->is('admin/2fa/*') && !$request->is('admin/2fa')) {
                    return redirect()->route('admin.2fa.setup');
                }
            } else {
                // If confirmed, check if challenged for current session
                if (!session()->has('2fa_verified') && !$request->is('admin/2fa/*') && !$request->is('admin/2fa')) {
                    return redirect()->route('admin.2fa.challenge');
                }
            }
        }

        return $next($request);
    }
}
