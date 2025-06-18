export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: "Raleway", sans-serif;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      color: #000000;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      border: 1px solid #000000;
      background-color: #ffffff;
    }
    .header, .footer {
      background-color: #000000;
      color: #ffffff;
      text-align: center;
      padding: 24px;
    }
    .content {
      padding: 24px;
    }
    .code {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 5px;
      text-align: center;
      margin: 30px 0;
    }
    .footer-note {
      text-align: center;
      padding: 16px;
      font-size: 12px;
      background-color: #ffffff;
      color: #000000;
      border-top: 1px solid #000000;
    }
    a {
      color: #ffffff !important;
      text-decoration: none !important;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for signing up! Your verification code is:</p>
      <div class="code">{verificationCode}</div>
      <p>Enter this code on the verification page to complete your registration.</p>
      <p>This code will expire in 15 minutes.</p>
      <p>If you didn’t create an account, please ignore this email.</p>
      <p style="margin-top: 30px;">Best regards,<br><strong>Wearvio Team</strong></p>
    </div>
    <div class="footer-note">
      This is an automated message. Do not reply.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: "Raleway", sans-serif;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      color: #000000;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      border: 1px solid #000000;
      background-color: #ffffff;
    }
    .header, .footer {
      background-color: #000000;
      color: #ffffff;
      text-align: center;
      padding: 24px;
    }
    .content {
      padding: 24px;
    }
    .check-icon {
      font-size: 40px;
      text-align: center;
      margin: 30px 0;
    }
    .footer-note {
      text-align: center;
      padding: 16px;
      font-size: 12px;
      background-color: #ffffff;
      color: #000000;
      border-top: 1px solid #000000;
    }
    ul {
      padding-left: 20px;
    }
    a {
      color: #ffffff !important;
      text-decoration: none !important;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Successful</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Your password has been successfully reset.</p>
      <div class="check-icon">✓</div>
      <p>If you didn’t request this, please contact support immediately.</p>
      <p>We recommend:</p>
      <ul>
        <li>Use a strong, unique password</li>
        <li>Don’t reuse passwords across sites</li>
      </ul>
      <p style="margin-top: 30px;">Best regards,<br><strong>Wearvio Team</strong></p>
    </div>
    <div class="footer-note">
      This is an automated message. Do not reply.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: "Raleway", sans-serif;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      color: #000000;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      border: 1px solid #000000;
      background-color: #ffffff;
    }
    .header, .footer {
      background-color: #000000;
      color: #ffffff;
      text-align: center;
      padding: 24px;
    }
    .content {
      padding: 24px;
    }
    .button {
      display: inline-block;
      background-color: #000000;
      color: #ffffff !important;
      padding: 12px 24px;
      text-decoration: none !important;
      font-weight: bold;
      margin: 30px auto;
    }
    .footer-note {
      text-align: center;
      padding: 16px;
      font-size: 12px;
      background-color: #ffffff;
      color: #000000;
      border-top: 1px solid #000000;
    }
    a {
      color: #ffffff !important;
      text-decoration: none !important;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We received a request to reset your password. If this wasn’t you, you can ignore it.</p>
      <p>To reset your password, click the button below:</p>
      <div style="text-align: center;">
        <a href="{resetURL}" class="button">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour.</p>
      <p style="margin-top: 30px;">Best regards,<br><strong>Wearvio Team</strong></p>
    </div>
    <div class="footer-note">
      This is an automated message. Do not reply.
    </div>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
  <style>
    body {
      font-family: "Raleway", sans-serif;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      color: #000000;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      border: 1px solid #000000;
      background-color: #ffffff;
    }
    .header, .footer {
      background-color: #000000;
      color: #ffffff;
      text-align: center;
      padding: 24px;
    }
    .content {
      padding: 24px;
    }
    .footer-note {
      text-align: center;
      padding: 16px;
      font-size: 12px;
      background-color: #ffffff;
      color: #000000;
      border-top: 1px solid #000000;
    }
    a {
      color: #ffffff !important;
      text-decoration: none !important;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome!</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Your email has been successfully verified.</p>
      <p>We’re excited to have you with us. Thank you for joining Wearvio.</p>
      <p style="margin-top: 30px;">Best regards,<br><strong>Wearvio Team</strong></p>
    </div>
    <div class="footer-note">
      This is an automated message. Do not reply.
    </div>
  </div>
</body>
</html>
`;
