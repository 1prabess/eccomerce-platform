export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #3f51b5; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0;">Verify Your Email</h1>
    </div>
    <div style="padding: 24px;">
      <p>Hello,</p>
      <p>Thank you for signing up! Your verification code is:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #3f51b5;">{verificationCode}</span>
      </div>
      <p>Enter this code on the verification page to complete your registration.</p>
      <p>This code will expire in 15 minutes for security reasons.</p>
      <p>If you didn't create an account with us, please ignore this email.</p>
      <p style="margin-top: 30px;">Best regards,<br><strong>Your App Team</strong></p>
    </div>
    <div style="text-align: center; padding: 16px; background-color: #f0f0f0; font-size: 12px; color: #888;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Successful</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #3f51b5; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
    </div>
    <div style="padding: 24px;">
      <p>Hello,</p>
      <p>Your password has been successfully reset.</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #3f51b5; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
          ✓
        </div>
      </div>
      <p>If you did not initiate this password reset, please contact our support team immediately.</p>
      <p>We recommend the following:</p>
      <ul>
        <li>Use a strong, unique password</li>
        <li>Enable two-factor authentication</li>
        <li>Avoid using the same password across multiple sites</li>
      </ul>
      <p style="margin-top: 30px;">Best regards,<br><strong>Your App Team</strong></p>
    </div>
    <div style="text-align: center; padding: 16px; background-color: #f0f0f0; font-size: 12px; color: #888;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #3f51b5; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0;">Password Reset</h1>
    </div>
    <div style="padding: 24px;">
      <p>Hello,</p>
      <p>We received a request to reset your password. If you didn't request this, you can safely ignore it.</p>
      <p>To reset your password, click the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="{resetURL}" style="background-color: #3f51b5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p style="margin-top: 30px;">Best regards,<br><strong>Your App Team</strong></p>
    </div>
    <div style="text-align: center; padding: 16px; background-color: #f0f0f0; font-size: 12px; color: #888;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #3f51b5; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0;">Welcome!</h1>
    </div>
    <div style="padding: 24px;">
      <p>Hello,</p>
      <p>Your email has been successfully verified.</p>
      <p>We’re excited to have you on board. Thank you for joining us!</p>
      <p style="margin-top: 30px;">Best regards,<br><strong>Your App Team</strong></p>
    </div>
    <div style="text-align: center; padding: 16px; background-color: #f0f0f0; font-size: 12px; color: #888;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;
