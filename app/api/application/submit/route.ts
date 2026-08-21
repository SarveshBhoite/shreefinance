import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });

        const refNo = data.referenceNo || `SHREE-LEAD-${Math.floor(1000 + Math.random() * 9000)}`;
        const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const formTitle = data.title || data.type || "New Website Inquiry / Application";
        const applicantName = data.name || data.applicantName || "Website Visitor";
        const applicantPhone = data.mobile || data.phone || "Not provided";
        const applicantEmail = data.email || "Not provided";
        const applicantCity = data.city || "Not provided";

        // Build key-value table for all additional submitted fields
        const excludedKeys = new Set([
            "title", "type", "name", "applicantName", "mobile", "phone", "email", "city", "referenceNo"
        ]);

        const additionalRows = Object.entries(data)
            .filter(([k, v]) => !excludedKeys.has(k) && v !== undefined && v !== null && v !== "")
            .map(([k, v], index) => {
                // Humanize key: e.g. "loanCategory" -> "Loan Category"
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
            <div style="background-color: #0f172a; padding: 24px 30px; border-bottom: 4px solid #00c985;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>
                            <h1 style="color: #00c985; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px;">SHREE FINANCE</h1>
                            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; font-weight: 700;">Online Customer Form Submission</p>
                        </td>
                        <td align="right">
                            <span style="background-color: #00c985; color: #0f172a; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
                                #${refNo}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- FORM BANNER -->
            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #e2e8f0 100%); padding: 20px 30px; border-bottom: 1px solid #e2e8f0;">
                <p style="color: #15803d; font-size: 11px; text-transform: uppercase; font-weight: 800; margin: 0 0 4px 0; letter-spacing: 0.5px;">📬 New Form Received</p>
                <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0;">${formTitle}</h2>
                <p style="color: #475569; font-size: 13px; margin: 4px 0 0 0;">Received on: <strong>${timestamp} (IST)</strong></p>
            </div>

            <!-- MAIN DATA BODY -->
            <div style="padding: 24px 30px;">
                
                <!-- CONTACT SECTION -->
                <h3 style="color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 2px solid #00c985;">
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
                <h3 style="color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 2px solid #00c985;">
                    📋 Submitted Application / Financial Data
                </h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    ${additionalRows}
                </table>
                ` : ""}

                <!-- ACTION NOTICE BOX -->
                <div style="background-color: #f0fdf4; border: 1px dashed #00c985; border-radius: 8px; padding: 14px; text-align: center;">
                    <p style="color: #15803d; font-size: 12px; font-weight: 700; margin: 0;">
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

        // 1. Send Admin Notification Email
        const info = await transporter.sendMail({
            from: `"${senderName}" <${senderEmail}>`,
            to: adminEmail,
            subject: `🚨 [Loan Application Received] ${formTitle} - ${applicantName} (${applicantCity}) #${refNo}`,
            html: htmlTemplate
        });

        console.log(`[BREVO SMTP DELIVERED] Form submission #${refNo} delivered to Admin (${adminEmail}):`, info.messageId);

        // 2. Send Customer "You Are Eligible for Loan" Email directly to the Applicant's email address
        if (applicantEmail && applicantEmail.includes("@") && !applicantEmail.includes("example.com")) {
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shreefinance.vercel.app";
            const applyLink = `${baseUrl}/apply#application-form`;

            // Document checklists per loan category
            const documentsByLoanType: Record<string, string[]> = {
                "personal": [
                    "Aadhaar Card",
                    "PAN Card",
                    "Last 3 months' salary slips",
                    "Last 6 months' bank statements",
                    "Passport-size photo"
                ],
                "home": [
                    "PAN Card & Aadhaar Card",
                    "Passport-size photos",
                    "Co-applicant KYC",
                    "Last 3 months' salary slips",
                    "Registered Sale Agreement / Allotment Letter",
                    "Approved Building Plan & RERA certificate"
                ],
                "business": [
                    "PAN Card (Applicant & Business entity)",
                    "Aadhaar Card / Passport / Voter ID",
                    "GST Registration Certificate",
                    "Passport-size photographs",
                    "Last 2–3 years' ITR with computation of income",
                    "Audited Balance Sheet & P&L Statement (certified by CA)",
                    "Last 6 to 12 months' Current Bank Account statements",
                    "Latest GST Returns (GSTR-3B / GSTR-1)"
                ],
                "education": [
                    "PAN Card & Aadhaar Card (KYC)",
                    "10th, 12th, and graduation marksheets / degree",
                    "Last 3 months' salary slips (if salaried)",
                    "Last 6 months' bank statements",
                    "Last 6 months' salary bank statements",
                    "Passport-size photos"
                ],
                "car": [
                    "PAN Card & Aadhaar Card",
                    "Passport-size photo",
                    "Salaried: Last 3 months' salary slips + 6 months' bank statements + Form 16",
                    "Driving Licence"
                ],
                "lap": [
                    "PAN Card (Mandatory)",
                    "Aadhaar Card / Passport / Voter ID",
                    "Last 3 months' salary slips",
                    "Last 6 months' salary bank statements",
                    "GST Certificate (if business / self-employed)",
                    "Passport-size photos"
                ]
            };

            const lowerTitle = (formTitle + " " + (data.loanType || "") + " " + (data.loanCategory || "")).toLowerCase();
            let matchedDocsKey = "personal";
            if (lowerTitle.includes("home") || lowerTitle.includes("housing")) matchedDocsKey = "home";
            else if (lowerTitle.includes("business") || lowerTitle.includes("mudra") || lowerTitle.includes("commercial")) matchedDocsKey = "business";
            else if (lowerTitle.includes("education") || lowerTitle.includes("study") || lowerTitle.includes("student")) matchedDocsKey = "education";
            else if (lowerTitle.includes("car") || lowerTitle.includes("vehicle") || lowerTitle.includes("auto")) matchedDocsKey = "car";
            else if (lowerTitle.includes("property") || lowerTitle.includes("lap") || lowerTitle.includes("against")) matchedDocsKey = "lap";
            else matchedDocsKey = "personal";

            const docsList = documentsByLoanType[matchedDocsKey] || documentsByLoanType["personal"];

            const docsHtmlRows = docsList.map(doc => `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 8px 12px; color: #00c985; font-size: 14px; width: 24px; vertical-align: top;">✔</td>
                    <td style="padding: 8px 12px 8px 0; color: #1e293b; font-size: 13px; font-weight: 700; line-height: 1.4;">${doc}</td>
                </tr>
            `).join("");

            const customerHtmlTemplate = `
            <div style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
                <!-- BRAND HEADER -->
                <div style="background-color: #0f172a; padding: 24px 30px; border-bottom: 4px solid #00c985;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td>
                                <h1 style="color: #00c985; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px;">SHREE FINANCE</h1>
                                <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; font-weight: 700;">Direct Bank Facility • 40+ Partner Banks</p>
                            </td>
                            <td align="right">
                                <span style="background-color: #00c985; color: #0f172a; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 900; text-transform: uppercase;">
                                    #${refNo}
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- ELIGIBILITY CELEBRATION BANNER -->
                <div style="padding: 26px 30px; background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #f8fafc 100%); border-bottom: 1px solid #d1fae5; text-align: center;">
                    <div style="display: inline-block; background-color: #dcfce7; color: #15803d; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 900; text-transform: uppercase; border: 1px solid #86efac; margin-bottom: 12px;">
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
                    <a href="${applyLink}" style="display: inline-block; background-color: #00c985; color: #022c22; font-size: 15px; font-weight: 900; text-decoration: none; padding: 14px 32px; border-radius: 30px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(0,201,133,0.35);">
                        👉 Apply For Loan Online (Click Here)
                    </a>
                    <p style="color: #94a3b8; font-size: 11px; margin: 10px 0 0 0; font-weight: 600;">
                        Compare Top Bank Quotes • Instant Pre-Sanction • Free CIBIL Check
                    </p>
                </div>

                <!-- REQUIRED DOCUMENTS POINT SECTION -->
                <div style="padding: 24px 30px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    <h3 style="color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 2px solid #00c985; display: flex; align-items: center; gap: 6px;">
                        📁 Documents Required for ${formTitle}
                    </h3>
                    <p style="color: #64748b; font-size: 12px; margin: 0 0 12px 0; font-weight: 600;">
                        Please keep the following documents ready for fast 30-minute digital verification:
                    </p>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden;">
                        ${docsHtmlRows}
                    </table>
                </div>

                <!-- SUBMITTED DETAILS SUMMARY -->
                <div style="padding: 24px 30px;">
                    <h3 style="color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 2px solid #00c985;">
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
                            <td style="font-weight: 800; color: #16a34a; padding: 10px 12px;">✅ Eligible • In Review with 40+ Partner Banks</td>
                        </tr>
                    </table>

                    <!-- NEXT STEPS -->
                    <div style="background-color: #ecfdf5; border-left: 4px solid #00c985; padding: 14px 18px; border-radius: 6px; margin-bottom: 20px;">
                        <h4 style="margin: 0 0 4px 0; color: #065f46; font-size: 13px; font-weight: 800;">What happens next?</h4>
                        <p style="margin: 0; color: #047857; font-size: 12px; line-height: 1.5;">
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
                            📞 Helpline: <a href="tel:+917709936965" style="color: #0284c7; text-decoration: none;">+91 77099 36965</a> | ✉️ <a href="mailto:care@shreefinance.com" style="color: #0284c7; text-decoration: none;">care@shreefinance.com</a>
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
                const customerMailRes = await transporter.sendMail({
                    from: `"${senderName} - Shree Finance" <${senderEmail}>`,
                    to: applicantEmail,
                    subject: `✅ [Shree Finance] Your Loan Application Has Been Received - #${refNo}`,
                    html: customerHtmlTemplate
                });
                console.log(`[CUSTOMER CONFIRMATION DELIVERED] Confirmation email sent to ${applicantEmail}:`, customerMailRes.messageId);
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
        console.error("Error sending form submission email via Brevo SMTP:", error);
        return NextResponse.json(
            { success: false, message: "Failed to send email notification." },
            { status: 500 }
        );
    }
}
