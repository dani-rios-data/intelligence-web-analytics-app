export const EMAIL_CONFIG = {
  FUNCTION: {
    NAME: 'send-verification-email',
    RUNTIME: 'edge',
    REGIONS: ['iad1'], // North Virginia (US East)
  },
  SMTP: {
    HOST: 'smtp.gmail.com',
    PORT: 587,
    SECURE: false,
  },
  TEMPLATES: {
    VERIFICATION: {
      SUBJECT: 'Your Verification Code',
      HTML: (code: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="https://oanczbbxpyszkhrniqbt.supabase.co/storage/v1/object/public/images/logo_tbwa.svg" 
               alt="TBWA Logo" 
               style="display: block; margin: 20px auto; width: 200px; height: auto;">
          
          <h2 style="color: #4f46e5; text-align: center; margin: 30px 0;">
            Verification Code
          </h2>
          
          <p style="text-align: center; font-size: 16px; color: #374151;">
            Your verification code is:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; 
                       background-color: #f3f4f6; padding: 10px 20px; border-radius: 5px;">
              ${code}
            </span>
          </div>
          
          <p style="text-align: center; font-size: 14px; color: #6b7280;">
            This code will expire in 10 minutes.<br>
            If you did not request this code, you can ignore this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="text-align: center; font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} TBWA. All rights reserved.
          </p>
        </div>
      `,
    },
  },
}; 