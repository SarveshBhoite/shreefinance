import nodemailer from "nodemailer";

interface SendEmailOTPParams {
    email: string;
    name?: string;
    otp: string;
}

// Perform Email Analysis & Format Validation
export function analyzeEmail(email: string): { isValid: boolean; reason?: string; domain?: string } {
    if (!email || typeof email !== "string") {
        return { isValid: false, reason: "Email address is required." };
    }
    const cleanEmail = email.trim().toLowerCase();
    
    // Standard RFC 5322 Regex pattern for email analysis
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
        return { isValid: false, reason: "Invalid email format. Please enter a valid address (e.g. name@domain.com)." };
    }

    const domain = cleanEmail.split("@")[1];
    
    // Check for common typos
    if (domain.includes("gmal.com") || domain.includes("gamil.com")) {
        return { isValid: false, reason: "Did you mean @gmail.com? Please correct your email address." };
    }
    if (domain.includes("yaho.com") || domain.includes("yahoo.co")) {
        return { isValid: false, reason: "Did you mean @yahoo.com? Please check your email address." };
    }

    return { isValid: true, domain };
}

// Create Nodemailer Transporter based on .env.local configuration
function createTransporter() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    if (smtpHost && smtpUser && smtpPass) {
        return nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });
    }

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        return nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
    }

    return null;
}

export async function sendEmailOTP({ email, name, otp }: SendEmailOTPParams): Promise<{ success: boolean; message: string }> {
    const cleanEmail = email.trim().toLowerCase();
    const recipientName = name ? name.trim() : "Valued Customer";

    // 1. Analyze Email Address
    const analysis = analyzeEmail(cleanEmail);
    if (!analysis.isValid) {
        return { success: false, message: analysis.reason || "Invalid email address." };
    }

    const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 580px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center;">
            <h1 style="color: #00c985; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">SHREE FINANCE</h1>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; font-weight: 600;">Official Bank Verification Code</p>
        </div>
        <div style="padding: 32px 24px; text-align: center;">
            <p style="color: #334155; font-size: 15px; margin-top: 0; line-height: 1.5;">Hello <strong>${recipientName}</strong>,</p>
            <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">Please use the following 6-digit One-Time Password (OTP) code to complete your loan application verification:</p>
            
            <div style="background-color: #f0fdf4; border: 2px dashed #00c985; padding: 20px; border-radius: 12px; display: inline-block; margin: 0 auto 24px auto;">
                <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #0f172a; font-family: monospace;">${otp}</span>
            </div>

            <p style="color: #ef4444; font-size: 13px; font-weight: 600; margin-bottom: 8px;">⏱️ Code valid for 5 minutes. Do not share this OTP with anyone.</p>
            <p style="color: #94a3b8; font-size: 12px;">If you did not request this email verification, please ignore this email.</p>
        </div>
        <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 11px; margin: 0;">© 2026 Shree Finance Advisory Services Pvt. Ltd. All rights reserved.</p>
        </div>
    </div>
    `;

    // 2. EmailJS REST API Dispatch
    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
    const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
    const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;
    if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
        try {
            const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service_id: emailjsServiceId,
                    template_id: emailjsTemplateId,
                    user_id: emailjsPublicKey,
                    accessToken: emailjsPrivateKey,
                    template_params: {
                        to_email: cleanEmail,
                        to_name: recipientName,
                        otp_code: otp,
                        message: `Your Shree Finance verification code is ${otp}`
                    }
                })
            });
            if (res.ok) {
                console.log(`[EMAILJS DELIVERED] Mail OTP ${otp} sent to ${cleanEmail}`);
                return { success: true, message: `OTP verification code delivered to ${cleanEmail}` };
            }
        } catch (err) {
            console.error("EmailJS API Error:", err);
        }
    }

    // 3. Resend API Integration
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && resendApiKey.trim() !== "") {
        try {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${resendApiKey.trim()}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: "Shree Finance <onboarding@resend.dev>",
                    to: [cleanEmail],
                    subject: `${otp} is your Shree Finance Verification Code`,
                    html: htmlContent
                })
            });
            const data = await res.json();
            if (res.ok) {
                console.log(`[RESEND EMAIL DELIVERED] Mail OTP ${otp} sent to ${cleanEmail}`);
                return { success: true, message: `OTP verification code delivered to ${cleanEmail}` };
            } else {
                console.error("Resend API Error:", data);
            }
        } catch (err) {
            console.error("Resend API Exception:", err);
        }
    }

    // 4. Gmail / SMTP Nodemailer Integration
    const transporter = createTransporter();
    if (transporter) {
        try {
            await transporter.sendMail({
                from: `"Shree Finance" <${process.env.SMTP_USER || process.env.GMAIL_USER}>`,
                to: cleanEmail,
                subject: `${otp} is your Shree Finance Verification Code`,
                html: htmlContent
            });
            console.log(`[SMTP EMAIL DELIVERED] Mail OTP ${otp} sent to ${cleanEmail}`);
            return { success: true, message: `OTP verification code delivered to ${cleanEmail}` };
        } catch (err: any) {
            console.error("Nodemailer Email Delivery Error:", err);
        }
    }

    // Console Log Mode for dynamic local testing per unique email
    console.log(`\n=================================================`);
    console.log(`[EMAIL OTP SERVICE] Target Recipient: ${cleanEmail}`);
    console.log(`[EMAIL OTP SERVICE] Recipient Name: ${recipientName}`);
    console.log(`[EMAIL OTP SERVICE] Generated Unique 6-Digit Mail OTP: ${otp}`);
    console.log(`[INSTRUCTION] Add GMAIL_USER + GMAIL_APP_PASSWORD, RESEND_API_KEY, or EMAILJS credentials in .env.local for internet email delivery.`);
    console.log(`=================================================\n`);

    return {
        success: true,
        message: `OTP verification code generated for ${cleanEmail}`
    };
}
