<!DOCTYPE html>
<html>
<head>
    <title>2FA Verification Code</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #003366;">WeCASOR Portal Secure Login</h2>
        <p>Hello,</p>
        <p>Your two-factor authentication (2FA) verification code is:</p>
        <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #003366; margin: 20px 0;">
            {{ $otp }}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not attempt to log in, please secure your account immediately.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">This is an automated message from the WeCASOR Portal security system.</p>
    </div>
</body>
</html>
