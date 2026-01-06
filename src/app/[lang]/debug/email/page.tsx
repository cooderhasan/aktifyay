
import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import dns from "dns";
import { promisify } from "util";

export const dynamic = "force-dynamic";

export default async function DebugEmailPage() {
    let debugInfo = [];

    // 1. DNS Lookup Check
    try {
        const resolve = promisify(dns.resolve4);
        const addresses = await resolve("mail.aktifyay.com.tr");
        debugInfo.push(`✅ DNS Lookup for mail.aktifyay.com.tr: ${addresses.join(", ")}`);
    } catch (e: any) {
        debugInfo.push(`❌ DNS Lookup Failed: ${e.message}`);
    }

    // 2. Environment Variables Check (Safe partial view)
    debugInfo.push(`ℹ️ SMTP Host: ${process.env.SMTP_HOST}`);
    debugInfo.push(`ℹ️ SMTP User: ${process.env.SMTP_USER}`);

    // 3. Attempt Sending
    let emailResult = "";
    try {
        const result = await sendMail({
            to: process.env.SMTP_USER || "info@aktifyay.com.tr",
            subject: "Debug Test Email from Live Site",
            html: "<h1>It Works!</h1><p>This email was sent from the debug page.</p>"
        });

        if (result) {
            emailResult = "✅ Email sent successfully returned TRUE.";
        } else {
            emailResult = "❌ sendMail function returned FALSE (Check server logs for details).";
        }
    } catch (e: any) {
        emailResult = `❌ Exception during sending: ${e.message}`;
    }

    return (
        <div style={{ padding: "2rem", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
            <h1>Email Debugger</h1>
            <hr />
            <h2>DNS & Config:</h2>
            {debugInfo.map((line, i) => <div key={i}>{line}</div>)}

            <h2>Sending Attempt:</h2>
            <div>{emailResult}</div>
        </div>
    );
}
