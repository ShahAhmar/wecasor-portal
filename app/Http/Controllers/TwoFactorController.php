<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FALaravel\Support\Authenticator;
use App\Models\AuditLog;
use Inertia\Inertia;

class TwoFactorController extends Controller
{
    public function setup()
    {
        $user = Auth::user();
        $google2fa = app('pragmarx.google2fa');

        if (!$user->two_factor_secret) {
            $user->two_factor_secret = $google2fa->generateSecretKey();
            $user->save();
        }

        $qrCodeUrl = $google2fa->getQRCodeUrl(
            'WeCASOR Portal',
            $user->email,
            $user->two_factor_secret
        );

        // Generate QR Code SVG
        $renderer = new \BaconQrCode\Renderer\Image\SvgImageBackEnd();
        $renderer = new \BaconQrCode\Renderer\ImageRenderer(
            new \BaconQrCode\Renderer\RendererStyle\RendererStyle(200),
            $renderer
        );
        $writer = new \BaconQrCode\Writer($renderer);
        $qrCode = $writer->writeString($qrCodeUrl);

        return Inertia::render('Auth/TwoFactorSetup', [
            'qrCode' => $qrCode,
            'qrCodeUrl' => $qrCodeUrl
        ]);
    }

    public function confirm(Request $request)
    {
        $request->validate(['code' => 'required']);

        $user = Auth::user();
        $google2fa = app('pragmarx.google2fa');

        $valid = $google2fa->verifyKey($user->two_factor_secret, $request->code);

        if ($valid) {
            $user->two_factor_confirmed_at = now();
            $user->save();

            session(['2fa_verified' => true]);

            AuditLog::create([
                'user_id' => $user->id,
                'action' => '2fa_confirmed',
                'details' => ['method' => 'TOTP'],
                'ip_address' => $request->ip(),
            ]);

            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['code' => 'Invalid verification code.']);
    }

    public function showChallenge()
    {
        return Inertia::render('Auth/TwoFactorChallenge');
    }

    public function verify(Request $request)
    {
        $request->validate(['code' => 'required']);

        $user = Auth::user();
        $google2fa = app('pragmarx.google2fa');

        $valid = $google2fa->verifyKey($user->two_factor_secret, $request->code);

        if ($valid) {
            session(['2fa_verified' => true]);

            AuditLog::create([
                'user_id' => $user->id,
                'action' => '2fa_login_verified',
                'ip_address' => $request->ip(),
            ]);

            return redirect()->intended('admin/dashboard');
        }

        return back()->withErrors(['code' => 'Invalid verification code.']);
    }
}
