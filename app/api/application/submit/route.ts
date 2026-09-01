import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db";
import PartnerApplication from "@/models/PartnerApplication";
import { sendAdminPartnerNotification, sendPartnerReceivedUserEmail } from "@/lib/mail";
import { sendEmailViaBrevoApi } from "@/lib/brevo";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const smtpHost = process.env.SMTP_HOST || "smtp-relay.brevo.com";
        const smtpPort = parseInt(process.env.SMTP_PORT || "587");
        const smtpUser = process.env.SMTP_USER || "";
        const smtpPass = process.env.SMTP_PASS || "";
        const adminEmail = process.env.ADMIN_EMAIL || "sulagadleaishwarya@gmail.com";
        const senderName = process.env.SENDER_NAME || "Shree Finance";
        const senderEmail = process.env.SENDER_EMAIL || adminEmail;

        const isPartnerSubmission =
            data.type === "Partner Program Registration (DSA Approval Request)" ||
            (data.source && data.source.toLowerCase().includes("partner")) ||
            data.type?.toLowerCase().includes("partner") ||
            data.applicationHeader?.toLowerCase().includes("partner") ||
            data.applicationHeader?.toLowerCase().includes("dsa");

        const refNo = data.referenceNo || `${isPartnerSubmission ? "SHREE-PTR" : "SHREE-LEAD"}-${Math.floor(1000 + Math.random() * 9000)}`;
        const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const formTitle = data.title || data.type || (isPartnerSubmission ? "DSA Partner Onboarding Application" : "New Website Inquiry / Application");
        const applicantName = data.name || data.applicantName || "Website Visitor";
        const applicantPhone = data.mobile || data.phone || "Not provided";
        const applicantEmail = data.email || "Not provided";
        const applicantCity = data.city || "Not provided";

        // If this is a Partner Application, persist to database with status PENDING & isActive false
        if (isPartnerSubmission) {
            try {
                await connectDB();

                const partnerData = {
                    name: applicantName,
                    email: applicantEmail,
                    mobile: applicantPhone,
                    city: applicantCity,
                    profession: data.profession || "Loan Agent / DSA",
                    companyName: data.companyName || "Individual DSA",
                    location: data.location || applicantCity,
                    addressProofType: data.addressProofType,
                    fullAddress: data.fullAddress,
                    experienceYears: data.experienceYears,
                    bankAccountType: data.bankAccountType,
                    uploadedDocuments: data.uploadedDocuments,
                    status: "PENDING",
                    isActive: false,
                    referenceNo: refNo
                };

                const createdPartner = await PartnerApplication.findOneAndUpdate(
                    { email: applicantEmail, status: "PENDING" },
                    partnerData,
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                );

                console.log(`[DB SAVED] Partner Application created for ${applicantName} (${applicantEmail}) with status PENDING. ID: ${createdPartner._id}`);

                // 1. Send Admin Partner Notification Email
                try {
                    await sendAdminPartnerNotification({
                        ...partnerData,
                        createdAt: createdPartner.createdAt
                    });
                    console.log(`[ADMIN NOTIFIED] Partner application email sent to admin for ${applicantName}`);
                } catch (mailErr) {
                    console.error("[ADMIN EMAIL ERROR] Failed to send partner email to admin:", mailErr);
                }

                // 2. Send Applicant Partner Confirmation Email
                if (applicantEmail && applicantEmail.includes("@") && !applicantEmail.includes("example.com")) {
                    try {
                        await sendPartnerReceivedUserEmail({
                            ...partnerData,
                            createdAt: createdPartner.createdAt
                        });
                        console.log(`[USER NOTIFIED] Partner application receipt email sent to user (${applicantEmail})`);
                    } catch (userMailErr) {
                        console.error("[USER EMAIL ERROR] Failed to send partner receipt email to user:", userMailErr);
                    }
                }

                return NextResponse.json({
                    success: true,
                    isPartner: true,
                    status: "PENDING",
                    message: "Thank you for applying! Your partner application has been submitted and is currently pending admin review. You will receive an email once approved.",
                    referenceNo: refNo
                });
            } catch (dbErr) {
                console.error("[DB ERROR] Error saving partner application:", dbErr);
                // Fallback will still try to send notification if DB fails
            }
        }

        // Standard lead / loan inquiries mail handling
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });

        // Build key-value table for all additional submitted fields
        const excludedKeys = new Set([
            "title", "type", "name", "applicantName", "mobile", "phone", "email", "city", "referenceNo"
        ]);

        const additionalRows = Object.entries(data)
            .filter(([k, v]) => !excludedKeys.has(k) && v !== undefined && v !== null && v !== "")
            .map(([k, v], index) => {
                const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const bg = index % 2 === 0 ? "#f8fafc" : "#ffffff";
                return `
                <tr style="background-color: ${bg};">
                    <td width="40%" style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">${label}:</td>
                    <td width="60%" style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">${String(v)}</td>
                </tr>`;
            })
            .join("");

        const htmlTemplate = `
        <div style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
            <!-- HEADER -->
            <div style="background-color: #0f172a; padding: 24px 30px; border-bottom: 4px solid #0284c7;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>
                            <h1 style="color: #0284c7; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px;">SHREE FINANCE</h1>
                            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; font-weight: 700;">Online Customer Form Submission</p>
                        </td>
                        <td align="right">
                            <span style="background-color: #0284c7; color: #0f172a; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
                                #${refNo}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- FORM BANNER -->
            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #e2e8f0 100%); padding: 20px 30px; border-bottom: 1px solid #e2e8f0;">
                <p style="color: #0369a1; font-size: 11px; text-transform: uppercase; font-weight: 800; margin: 0 0 4px 0; letter-spacing: 0.5px;">📬 New Form Received</p>
                <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0;">${formTitle}</h2>
                <p style="color: #475569; font-size: 13px; margin: 4px 0 0 0;">Received on: <strong>${timestamp} (IST)</strong></p>
            </div>

            <!-- MAIN DATA BODY -->
            <div style="padding: 24px 30px;">
                
                <!-- CONTACT SECTION -->
                <h3 style="color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 2px solid #0284c7;">
                    👤 Applicant Contact Information
                </h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    <tr style="background-color: #f8fafc;">
                        <td width="40%" style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Full Name:</td>
                        <td width="60%" style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">${applicantName}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Mobile Number:</td>
                        <td style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">
                            <a href="tel:${applicantPhone}" style="color: #0284c7; text-decoration: none;">📞 +91 ${applicantPhone}</a>
                        </td>
                    </tr>
                    <tr style="background-color: #f8fafc;">
                        <td style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Email Address:</td>
                        <td style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">
                            <a href="mailto:${applicantEmail}" style="color: #0284c7; text-decoration: none;">✉️ ${applicantEmail}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: 700; color: #475569; padding: 10px 12px;">City / Location:</td>
                        <td style="font-weight: 800; color: #0f172a; padding: 10px 12px;">📍 ${applicantCity}</td>
                    </tr>
                </table>

                <!-- SUBMITTED APPLICATION DETAILS -->
                ${additionalRows ? `
                <h3 style="color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 2px solid #0284c7;">
                    📋 Submitted Application / Financial Data
                </h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    ${additionalRows}
                </table>
                ` : ""}

                <!-- ACTION NOTICE BOX -->
                <div style="background-color: #f0fdf4; border: 1px dashed #0284c7; border-radius: 8px; padding: 14px; text-align: center;">
                    <p style="color: #0369a1; font-size: 12px; font-weight: 700; margin: 0;">
                        ✅ Instant Lead Capture • Sent via Verified Brevo SMTP Gateway
                    </p>
                </div>

            </div>

            <!-- FOOTER -->
            <div style="background-color: #f8fafc; padding: 16px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 11px; margin: 0;">
                    Shree Finance Advisory Services Pvt. Ltd. • Automated Lead Alert System
                </p>
            </div>
        </div>
        `;

        // 1. Send Admin Notification Email via Brevo API / SMTP
        try {
            const brevoRes = await sendEmailViaBrevoApi({
                to: adminEmail,
                subject: `🚨 [Loan Application Received] ${formTitle} - ${applicantName} (${applicantCity}) #${refNo}`,
                htmlContent: htmlTemplate,
                senderName: senderName,
                senderEmail: "shreefinancec@gmail.com"
            });

            if (!brevoRes.success) {
                // Fallback to SMTP if API key is not configured
                const transporter = nodemailer.createTransport({
                    host: smtpHost,
                    port: smtpPort,
                    secure: smtpPort === 465,
                    auth: {
                        user: smtpUser,
                        pass: smtpPass
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                const info = await transporter.sendMail({
                    from: `"${senderName}" <${smtpUser || senderEmail}>`,
                    to: adminEmail,
                    subject: `🚨 [Loan Application Received] ${formTitle} - ${applicantName} (${applicantCity}) #${refNo}`,
                    html: htmlTemplate
                });
                console.log(`[SMTP DELIVERED] Form submission #${refNo} delivered to Admin (${adminEmail}):`, info.messageId);
            } else {
                console.log(`[BREVO API DELIVERED] Form submission #${refNo} delivered to Admin (${adminEmail}):`, brevoRes.messageId);
            }
        } catch (mailErr) {
            console.error("[MAIL NOTICE] Could not send admin notification email:", mailErr);
        }

        // 2. Send Customer "You Are Eligible for Loan" Email directly to the Applicant's email address
        if (applicantEmail && applicantEmail.includes("@") && !applicantEmail.includes("example.com")) {
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shreefinance.vercel.app";
            const applyLink = `${baseUrl}/apply#application-form`;

            const customerHtmlTemplate = `
            <div style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
                <!-- BRAND HEADER -->
                <div style="background-color: #0f172a; padding: 24px 30px; border-bottom: 4px solid #0284c7;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td>
                                <h1 style="color: #0284c7; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px;">SHREE FINANCE</h1>
                                <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; font-weight: 700;">Direct Bank Facility • 40+ Partner Banks</p>
                            </td>
                            <td align="right">
                                <span style="background-color: #0284c7; color: #0f172a; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 900; text-transform: uppercase;">
                                    #${refNo}
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- ELIGIBILITY CELEBRATION BANNER -->
                <div style="padding: 26px 30px; background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #f8fafc 100%); border-bottom: 1px solid #d1fae5; text-align: center;">
                    <div style="display: inline-block; background-color: #dcfce7; color: #0369a1; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 900; text-transform: uppercase; border: 1px solid #86efac; margin-bottom: 12px;">
                        🎉 Pre-Approved Eligibility Verified
                    </div>
                    <h2 style="color: #0f172a; font-size: 22px; font-weight: 900; margin: 0 0 8px 0;">
                        Congratulations ${applicantName}!
                    </h2>
                    <p style="color: #166534; font-size: 16px; font-weight: 800; margin: 0 0 10px 0;">
                        Compare ${formTitle} Offers from Top Banks & Get e-Approved & Your Free CIBIL Score Instantly
                    </p>
                    <p style="color: #475569; font-size: 13px; margin: 0; line-height: 1.6; max-width: 500px; margin: 0 auto;">
                        Based on your submitted preliminary profile and city parameters, 40+ partner banks (SBI, HDFC, ICICI, Axis, YES Bank) are ready with instant sanction terms at lowest interest rates.
                    </p>
                </div>

                <!-- DIRECT ACTION CTA BUTTON -->
                <div style="padding: 24px 30px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #f1f5f9;">
                    <p style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 14px 0;">
                        Click below to apply for loan and compare live bank offers:
                    </p>
                    <a href="${applyLink}" style="display: inline-block; background-color: #0284c7; color: #022c22; font-size: 15px; font-weight: 900; text-decoration: none; padding: 14px 32px; border-radius: 30px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(0,201,133,0.35);">
                        👉 Apply For Loan Online (Click Here)
                    </a>
                    <p style="color: #94a3b8; font-size: 11px; margin: 10px 0 0 0; font-weight: 600;">
                        Compare Top Bank Quotes • Instant Pre-Sanction • Free CIBIL Check
                    </p>
                </div>

                <!-- SUBMITTED DETAILS SUMMARY -->
                <div style="padding: 24px 30px;">
                    <h3 style="color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 2px solid #0284c7;">
                        📑 Your Registered Profile Details
                    </h3>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 20px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                        <tr style="background-color: #f8fafc;">
                            <td width="40%" style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Loan Product:</td>
                            <td width="60%" style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">${formTitle}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Applicant Contact:</td>
                            <td style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">+91 ${applicantPhone}</td>
                        </tr>
                        <tr style="background-color: #f8fafc;">
                            <td style="font-weight: 700; color: #475569; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">City / Region:</td>
                            <td style="font-weight: 800; color: #0f172a; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">${applicantCity}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: 700; color: #475569; padding: 10px 12px;">Pre-Approval Status:</td>
                            <td style="font-weight: 800; color: #0284c7; padding: 10px 12px;">✅ Eligible • In Review with 40+ Partner Banks</td>
                        </tr>
                    </table>

                    <!-- NEXT STEPS -->
                    <div style="background-color: #ecfdf5; border-left: 4px solid #0284c7; padding: 14px 18px; border-radius: 6px; margin-bottom: 20px;">
                        <h4 style="margin: 0 0 4px 0; color: #065f46; font-size: 13px; font-weight: 800;">What happens next?</h4>
                        <p style="margin: 0; color: #0369a1; font-size: 12px; line-height: 1.5;">
                            • A senior underwriting executive will call you shortly on <strong>+91 ${applicantPhone}</strong>.<br/>
                            • We compare quotes from SBI, HDFC Bank, ICICI Bank, Axis Bank, and Bank of Baroda to sanction your funds at lowest ROI.
                        </p>
                    </div>

                    <!-- SUPPORT INFO -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; text-align: center;">
                        <p style="color: #475569; font-size: 12px; margin: 0 0 6px 0; font-weight: 600;">
                            Have questions or need instant disbursal?
                        </p>
                        <p style="color: #0f172a; font-size: 13px; margin: 0; font-weight: 800;">
                            📞 Helpline: <a href="tel:+918830434945" style="color: #0284c7; text-decoration: none;">+91 88304 34945</a> | ✉️ <a href="mailto:shreefinancec@gmail.com" style="color: #0284c7; text-decoration: none;">shreefinancec@gmail.com</a>
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

            try {
                const brevoCustomerRes = await sendEmailViaBrevoApi({
                    to: applicantEmail,
                    subject: `✅ [Shree Finance] Your Loan Application Has Been Received - #${refNo}`,
                    htmlContent: customerHtmlTemplate,
                    senderName: `${senderName} - Shree Finance`,
                    senderEmail: "shreefinancec@gmail.com"
                });

                if (brevoCustomerRes.success) {
                    console.log(`[CUSTOMER CONFIRMATION DELIVERED via BREVO API] Confirmation email sent to ${applicantEmail}:`, brevoCustomerRes.messageId);
                } else {
                    // Fallback to Nodemailer SMTP
                    const transporter = nodemailer.createTransport({
                        host: smtpHost,
                        port: smtpPort,
                        secure: smtpPort === 465,
                        auth: {
                            user: smtpUser,
                            pass: smtpPass
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });

                    const customerMailRes = await transporter.sendMail({
                        from: `"${senderName} - Shree Finance" <${smtpUser || senderEmail}>`,
                        to: applicantEmail,
                        subject: `✅ [Shree Finance] Your Loan Application Has Been Received - #${refNo}`,
                        html: customerHtmlTemplate
                    });
                    console.log(`[CUSTOMER CONFIRMATION DELIVERED via SMTP] Confirmation email sent to ${applicantEmail}:`, customerMailRes.messageId);
                }
            } catch (custErr) {
                console.error(`[CUSTOMER EMAIL ERROR] Could not send email to ${applicantEmail}:`, custErr);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Application submitted and confirmation email sent successfully!",
            referenceNo: refNo
        });
    } catch (error) {
        console.error("Error processing form submission:", error);
        return NextResponse.json(
            { success: false, message: "Failed to process form application." },
            { status: 500 }
        );
    }
}
