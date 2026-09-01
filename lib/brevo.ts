interface SendEmailParams {
    to: string;
    subject: string;
    htmlContent: string;
    senderName?: string;
    senderEmail?: string;
}

export async function sendEmailViaBrevoApi(params: SendEmailParams): Promise<{ success: boolean; messageId?: string; error?: unknown }> {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        return { success: false, error: "BREVO_API_KEY is not defined" };
    }

    const senderEmail = params.senderEmail || process.env.ADMIN_EMAIL || "shreefinancec@gmail.com";
    const senderName = params.senderName || process.env.SENDER_NAME || "Shree Finance";

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": apiKey,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                sender: {
                    name: senderName,
                    email: senderEmail
                },
                to: [
                    {
                        email: params.to
                    }
                ],
                subject: params.subject,
                htmlContent: params.htmlContent
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("[BREVO API ERROR]", response.status, errorData);
            return { success: false, error: errorData };
        }

        const data = await response.json();
        console.log("[BREVO API SUCCESS] Email sent:", data);
        return { success: true, messageId: data.messageId };
    } catch (err) {
        console.error("[BREVO API FETCH ERROR]", err);
        return { success: false, error: err };
    }
}
