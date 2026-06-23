import { StorageEngine } from "@/lib/models/mongodb";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    const projectService = body.projectService?.trim() || body.service?.trim() || "General Inquiry";
    const intent = body.intent?.trim() || "Get Started";

    if (!name || !email || !message) {
      return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const contact = await StorageEngine.addContact({
      name,
      email,
      service: projectService,
      message,
      intent,
    });

    // Attempt to send an email notification if SMTP is configured
    let emailSent = false;
    try {
      const toAddress = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL;
      const host = process.env.SMTP_HOST;
      const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      if (toAddress && host && port && user && pass) {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: !!(process.env.SMTP_SECURE === "true" || port === 465),
          auth: { user, pass },
        });

        const mailRes = await transporter.sendMail({
          from: `${name} <${email}>`,
          to: toAddress,
          subject: `New contact: ${projectService} — ${intent}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Service: ${projectService}`,
            `Intent: ${intent}`,
            "",
            "Message:",
            message,
          ].join("\n"),
        });

        if (mailRes && (mailRes.accepted?.length || mailRes.response)) {
          emailSent = true;
        }
      }
    } catch (mailErr) {
      console.error("Failed to send contact email:", mailErr);
      // do not fail the whole request if email sending fails
    }

    return Response.json({ success: true, contact, emailed: emailSent });
  } catch (err) {
    console.error("Contact route failed:", err);
    return Response.json({ error: "Failed to submit contact request." }, { status: 500 });
  }
}
