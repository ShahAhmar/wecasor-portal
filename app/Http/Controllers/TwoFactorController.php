<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\TwoFactorOtpMail;
use App\Models\AuditLog;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TwoFactorController extends Controller
{
    public function setup()
    {
        $user = Auth::user();

        // If already confirmed, redirect to dashboard or settings
        if ($user->two_factor_confirmed_at) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('Auth/TwoFactorSetup', [
            'email' => $user->email
        ]);
    }

    public function sendOtp(Request $request)
    {
        $user = Auth::user();
        
        // Generate 6 digit OTP
        $otp = sprintf("%06d", mt_rand(1, 999999));
        
        $user->otp_code = $otp;
        $user->otp_expires_at = now()->addMinutes(10);
        $user->save();

        Mail::to($user->email)->send(new TwoFactorOtpMail($otp));

        return back()->with('status', 'A verification code has been sent to your email.');
    }

    public function confirm(Request $request)
    {
        $request->validate(['code' => 'required|string|size:6']);

        $user = Auth::user();

        if ($user->otp_code === $request->code && $user->otp_expires_at && $user->otp_expires_at->isFuture()) {
            $user->two_factor_confirmed_at = now();
            $user->otp_code = null;
            $user->otp_expires_at = null;
            $user->save();

            session(['2fa_verified' => true]);

            AuditLog::create([
                'user_id' => $user->id,
                'action' => '2fa_confirmed',
                'details' => ['method' => 'Email OTP'],
                'ip_address' => $request->ip(),
            ]);

            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['code' => 'The verification code is invalid or has expired.']);
    }

    public function showChallenge()
    {
        $user = Auth::user();
        
        // Auto send OTP when showing challenge if one doesn't exist or is expired
        if (!$user->otp_code || !$user->otp_expires_at || $user->otp_expires_at->isPast()) {
            $otp = sprintf("%06d", mt_rand(1, 999999));
            $user->otp_code = $otp;
            $user->otp_expires_at = now()->addMinutes(10);
            $user->save();

            Mail::to($user->email)->send(new TwoFactorOtpMail($otp));
        }

        return Inertia::render('Auth/TwoFactorChallenge', [
            'email' => $user->email
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate(['code' => 'required|string|size:6']);

        $user = Auth::user();

        if ($user->otp_code === $request->code && $user->otp_expires_at && $user->otp_expires_at->isFuture()) {
            $user->otp_code = null;
            $user->otp_expires_at = null;
            $user->save();
            
            session(['2fa_verified' => true]);

            AuditLog::create([
                'user_id' => $user->id,
                'action' => '2fa_login_verified',
                'details' => ['method' => 'Email OTP'],
                'ip_address' => $request->ip(),
            ]);

            return redirect()->intended('admin/dashboard');
        }

        return back()->withErrors(['code' => 'The verification code is invalid or has expired.']);
    }
}
