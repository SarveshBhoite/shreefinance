import nodemailer from "nodemailer";

export function getMailTransporter() {
    const smtpHost = process.env.SMTP_HOST || "smtp-relay.brevo.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER || "";
    const smtpPass = process.env.SMTP_PASS || "";

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

export function getMailConfig() {
    const adminEmail = process.env.ADMIN_EMAIL || "sulagadleaishwarya@gmail.com";
    const senderName = process.env.SENDER_NAME || "Shree Finance";
    const senderEmail = process.env.SENDER_EMAIL || adminEmail;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shreefinance.vercel.app";

    return { adminEmail, senderName, senderEmail, baseUrl };
}

export interface PartnerNotificationData {
    name: string;
    email: string;
    mobile: string;
    city: string;
    companyName?: string;
    profession?: string;
    referenceNo: string;
    createdAt?: Date | string;
    [key: string]: unknown;
}

export async function sendAdminPartnerNotification(application: PartnerNotificationData) {
    const { adminEmail, senderName, senderEmail, baseUrl } = getMailConfig();
    const transporter = getMailTransporter();

    const businessName = application.companyName || application.name;
    const formattedDate = application.createdAt
        ? new Date(application.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const reviewUrl = `${baseUrl}/admin?tab=partners&ref=${encodeURIComponent(application.referenceNo)}`;

    const htmlContent = `
    <div style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
        <!-- HEADER -->
        <div style="background-color: #0f172a; padding: 24px 30px; border-bottom: 4px solid #0284c7;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                        <h1 style="color: #0284c7; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px;">SHREE FINANCE</h1>
                        <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; font-weight: 700;">Partner Onboarding Alert System</p>
                    </td>
                    <td align="right">
                        <span style="background-color: #0284c7; color: #0f172a; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
                            #${application.referenceNo}
                        </span>
                    </td>
                </tr>
            </table>
        </div>

        <!-- BANNER -->
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #e2e8f0 100%); padding: 20px 30px; border-bottom: 1px solid #e2e8f0;">
            <p style="color: #0369a1; font-size: 11px; text-transform: uppercase; font-weight: 800; margin: 0 0 4px 0; letter-spacing: 0.5px;">🚀 New Partner Registration</p>
            <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0;">New Partner Application Received: ${businessName}</h2>
            <p style="color: #475569; font-size: 13px; margin: 4px 0 0 0;">Received on: <strong>${formattedDate} (IST)</strong></p>
        </div>

        <!-- DETAILS BODY -->
        <div style="padding: 24px 30px;">
            <h3 style="color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 2px solid #0284c7;">
                📋 Applicant & Business Key Details
            </h3>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <tr style="background-color: #f8fafc;">
                    <td width="40%" style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Applicant Name:</td>
                    <td width="60%" style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">${application.name}</td>
                </tr>
                <tr>
                    <td style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Email Address:</td>
                    <td style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">
                        <a href="mailto:${application.email}" style="color: #0284c7; text-decoration: none;">✉️ ${application.email}</a>
                    </td>
                </tr>
                <tr style="background-color: #f8fafc;">
                    <td style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Phone / Mobile:</td>
                    <td style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">
                        <a href="tel:${application.mobile}" style="color: #0284c7; text-decoration: none;">📞 +91 ${application.mobile}</a>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Business / Company Name:</td>
                    <td style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">${application.companyName || "Individual DSA / Consultant"}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                    <td style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">City / Location:</td>
                    <td style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">📍 ${application.city}</td>
                </tr>
                <tr>
                    <td style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Profession:</td>
                    <td style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">${application.profession || "Loan Agent / DSA"}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                    <td style="font-weight: 700; color: #475569; padding: 10px 12px;">Submission Date:</td>
                    <td style="font-weight: 800; color: #0f172a; padding: 10px 12px;">📅 ${formattedDate}</td>
                </tr>
            </table>

            <!-- DIRECT ADMIN ACTION LINK -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 20px;">
                <p style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">
                    Review full application and approve/reject partner credentials:
                </p>
                <a href="${reviewUrl}" style="display: inline-block; background-color: #0f172a; color: #0284c7; font-size: 14px; font-weight: 800; text-decoration: none; padding: 12px 28px; border-radius: 8px; border: 2px solid #0284c7; letter-spacing: 0.5px;">
                    👉 Review in Admin Portal
                </a>
            </div>
        </div>

        <!-- FOOTER -->
        <div style="background-color: #f8fafc; padding: 16px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 11px; margin: 0;">
                Shree Finance Advisory Services Pvt. Ltd. • Automated Partner Notification
            </p>
        </div>
    </div>
    `;

    return transporter.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to: adminEmail,
        subject: `New Partner Application Received: ${businessName}`,
        html: htmlContent
    });
}

export async function sendPartnerApprovalEmail(application: {
    name: string;
    email: string;
    companyName?: string;
    referenceNo: string;
    password?: string;
}) {
    const { senderName, senderEmail, baseUrl } = getMailConfig();
    const transporter = getMailTransporter();

    const portalUrl = `${baseUrl}/partner?auth=login`;

    const htmlContent = `
    <div style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
        <!-- BRAND HEADER -->
        <div style="background-color: #0f172a; padding: 24px 30px; border-bottom: 4px solid #0284c7;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                        <h1 style="color: #0284c7; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px;">SHREE FINANCE</h1>
                        <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; font-weight: 700;">Partner & Channel Network</p>
                    </td>
                    <td align="right">
                        <span style="background-color: #0284c7; color: #0f172a; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 900; text-transform: uppercase;">
                            #${application.referenceNo}
                        </span>
                    </td>
                </tr>
            </table>
        </div>

        <!-- HERO APPROVAL BANNER -->
        <div style="padding: 30px; background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #f8fafc 100%); border-bottom: 1px solid #d1fae5; text-align: center;">
            <div style="display: inline-block; background-color: #dcfce7; color: #0369a1; padding: 6px 18px; border-radius: 20px; font-size: 12px; font-weight: 900; text-transform: uppercase; border: 1px solid #86efac; margin-bottom: 14px;">
                🎉 Officially Approved & Accredited
            </div>
            <h2 style="color: #0f172a; font-size: 24px; font-weight: 900; margin: 0 0 8px 0;">
                Your Partner Application is Approved!
            </h2>
            <p style="color: #166534; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">
                Welcome to Shree Finance Partner Network, ${application.name}!
            </p>
            <p style="color: #475569; font-size: 13px; margin: 0 auto; line-height: 1.6; max-width: 500px;">
                Your partner onboarding application (Ref: <strong>#${application.referenceNo}</strong>) has been verified and officially approved. Your workstation account is now active.
            </p>
        </div>

        <!-- LOGIN CREDENTIALS CARD -->
        <div style="padding: 24px 30px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <div style="background-color: #ffffff; border: 2px solid #0284c7; border-radius: 12px; padding: 18px 22px; box-shadow: 0 4px 12px rgba(0,201,133,0.1);">
                <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                    🔑 Your Partner Portal Login Credentials:
                </p>
                <table width="100%" style="font-size: 13px; color: #334155;">
                    <tr>
                        <td style="padding: 6px 0; font-weight: 700; width: 140px; color: #64748b;">Login Email:</td>
                        <td style="padding: 6px 0; font-weight: 800; color: #0f172a; font-family: monospace;">${application.email}</td>
                    </tr>
                    ${
                        application.password
                            ? `<tr>
                        <td style="padding: 6px 0; font-weight: 700; color: #64748b;">Password:</td>
                        <td style="padding: 6px 0; font-weight: 900; color: #0284c7; font-size: 15px; font-family: monospace; background: #ecfdf5; padding: 4px 8px; border-radius: 6px; display: inline-block;">${application.password}</td>
                    </tr>`
                            : ""
                    }
                    <tr>
                        <td style="padding: 6px 0; font-weight: 700; color: #64748b;">Partner ID:</td>
                        <td style="padding: 6px 0; font-weight: 800; color: #0f172a; font-family: monospace;">#${application.referenceNo}</td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- DIRECT PORTAL ACCESS CTA BUTTON -->
        <div style="padding: 26px 30px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #f1f5f9;">
            <p style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 14px 0;">
                Click below to log in with your email and password:
            </p>
            <a href="${portalUrl}" style="display: inline-block; background-color: #0284c7; color: #022c22; font-size: 15px; font-weight: 900; text-decoration: none; padding: 14px 34px; border-radius: 30px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(0,201,133,0.35);">
                🔑 Access Partner Workstation
            </a>
            <p style="color: #94a3b8; font-size: 11px; margin: 10px 0 0 0; font-weight: 600;">
                Live Rate Cards • Multi-Bank Submission (Loans, Cards, Insurance, Investments) • Disbursal Tracking
            </p>
        </div>

        <!-- ONBOARDING BENEFITS -->
        <div style="padding: 24px 30px;">
            <h3 style="color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 2px solid #0284c7;">
                🚀 What You Can Do Now
            </h3>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 18px;">
                <ul style="margin: 0; padding-left: 18px; color: #334155; font-size: 13px; line-height: 1.8;">
                    <li><strong>Submit Client Loan Inquiries:</strong> Direct home loans, business loans & personal loans to 40+ partner banks.</li>
                    <li><strong>Highest Payout Rates:</strong> Get transparent commissions credited directly to your bank account.</li>
                    <li><strong>Dedicated Relationship Manager:</strong> Our underwriting desk assists you with files and sanctions.</li>
                </ul>
            </div>

            <!-- SUPPORT INFO -->
            <div style="background-color: #ecfdf5; border: 1px dashed #0284c7; border-radius: 8px; padding: 14px; text-align: center;">
                <p style="color: #065f46; font-size: 12px; margin: 0 0 4px 0; font-weight: 700;">
                    Need help getting started or submitting your first loan case?
                </p>
                <p style="color: #0369a1; font-size: 13px; margin: 0; font-weight: 800;">
                    📞 Partner Desk: <a href="tel:+918830434945" style="color: #0284c7; text-decoration: none;">+91 88304 34945</a> | ✉️ <a href="mailto:shreefinancec@gmail.com" style="color: #0284c7; text-decoration: none;">shreefinancec@gmail.com</a>
                </p>
            </div>
        </div>

        <!-- FOOTER -->
        <div style="background-color: #0f172a; padding: 16px 30px; text-align: center; color: #94a3b8; font-size: 11px;">
            <p style="margin: 0 0 4px 0;">© ${new Date().getFullYear()} Shree Finance Advisory Services Pvt. Ltd. All rights reserved.</p>
            <p style="margin: 0; font-size: 10px; color: #64748b;">Office No. D/201, Siddhivinayak Angan Society, Near Navale Bridge, Narhe, Pune - 411041</p>
        </div>
    </div>
    `;

    return transporter.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to: application.email,
        subject: "Your Partner Application is Approved!",
        html: htmlContent
    });
}

export async function sendPartnerRejectionEmail(application: {
    name: string;
    email: string;
    referenceNo: string;
}, reason?: string) {
    const { senderName, senderEmail } = getMailConfig();
    const transporter = getMailTransporter();

    const htmlContent = `
    <div style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
        <div style="background-color: #0f172a; padding: 24px 30px; border-bottom: 4px solid #f43f5e;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px;">SHREE FINANCE</h1>
                        <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; font-weight: 700;">Partner Onboarding Update</p>
                    </td>
                    <td align="right">
                        <span style="background-color: #f43f5e; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 900; text-transform: uppercase;">
                            #${application.referenceNo}
                        </span>
                    </td>
                </tr>
            </table>
        </div>

        <div style="padding: 30px; text-align: center;">
            <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0 0 10px 0;">Partner Application Status Update</h2>
            <p style="color: #475569; font-size: 13px; line-height: 1.6; max-width: 500px; margin: 0 auto 16px auto;">
                Dear ${application.name}, thank you for your interest in joining the Shree Finance Partner Network. After reviewing your submitted details (Ref: <strong>#${application.referenceNo}</strong>), we are unable to approve your application at this time.
            </p>
            ${reason ? `
            <div style="background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 14px; margin: 16px auto; max-width: 480px; text-align: left;">
                <p style="color: #be123c; font-size: 12px; font-weight: 700; margin: 0 0 4px 0;">Reason for Decision:</p>
                <p style="color: #881337; font-size: 13px; margin: 0;">${reason}</p>
            </div>` : ""}
            <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin-top: 16px;">
                If you believe this is in error or would like to provide updated documentation, please contact our partner support team at <a href="mailto:shreefinancec@gmail.com" style="color: #0284c7;">shreefinancec@gmail.com</a>.
            </p>
        </div>

        <div style="background-color: #0f172a; padding: 16px 30px; text-align: center; color: #94a3b8; font-size: 11px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Shree Finance Advisory Services Pvt. Ltd.</p>
        </div>
    </div>
    `;

    return transporter.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to: application.email,
        subject: "Partner Application Status Update - Shree Finance",
        html: htmlContent
    });
}
