import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const escapeHtml = (str) =>
  String(str).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );

export async function POST(request) {
  try {
    const body = await request.json();
    const { name = "", email = "", phone = "", message = "", _honey = "" } =
      body || {};

    // Honeypot — return ok silently so bots can't tell they were caught
    if (_honey) return NextResponse.json({ ok: true });

    // Validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (
      name.length > 100 ||
      email.length > 200 ||
      phone.length > 30 ||
      message.length > 5000
    ) {
      return NextResponse.json({ error: "One of the fields is too long." }, {
        status: 400,
      });
    }

    const { RESEND_API_KEY, CONTACT_EMAIL_TO } = process.env;
    // Verified domain on Resend. Override with RESEND_FROM if you want a
    // different sending address (e.g. "Saurav <hello@sauravksingh.in>").
    const FROM =
      process.env.RESEND_FROM || "Saurav Portfolio <contact@sauravksingh.in>";
    const TO = CONTACT_EMAIL_TO || "developer.epm1@gmail.com";

    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY env var");
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    // 1) Notify me of the new submission. Reply-To is the sender so I can
    //    just hit "reply" to respond directly to them.
    const { error: notifyError } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: `${name} <${email}>`,
      subject: `New message from ${name} via portfolio`,
      text: [
        `New contact form submission`,
        ``,
        `From: ${name} <${email}>`,
        `Phone: ${phone || "—"}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;padding:16px;color:#111;">
          <h2 style="color:#6d28d9;margin:0 0 16px;font-size:20px;">New contact form submission</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px;line-height:1.5;">
            <tr><td style="padding:4px 12px 4px 0;color:#666;width:90px;"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666;"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(email)}" style="color:#6d28d9;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666;"><strong>Phone</strong></td><td>${phone ? escapeHtml(phone) : "—"}</td></tr>
          </table>
          <hr style="margin:20px 0;border:none;border-top:1px solid #e5e5e5;"/>
          <p style="color:#666;margin:0 0 8px;font-size:14px;"><strong>Message</strong></p>
          <div style="white-space:pre-wrap;background:#f5f5f5;padding:14px;border-radius:8px;font-size:14px;line-height:1.6;">${escapeHtml(message)}</div>
          <p style="color:#999;font-size:12px;margin-top:24px;">Reply directly to this email to respond.</p>
        </div>
      `,
    });

    if (notifyError) {
      console.error("Resend notify error:", notifyError);
      return NextResponse.json(
        { error: "Failed to send. Please try again or email me directly." },
        { status: 500 },
      );
    }

    // 2) Send an auto-reply back to the sender confirming receipt.
    //    A failure here shouldn't fail the request — I already got the message.
    const { error: replyError } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: "Thanks for reaching out — I'll be in touch soon",
      text: [
        `Hi ${name},`,
        ``,
        `Thanks for getting in touch through my portfolio. I've received your`,
        `message and will get back to you as soon as I can.`,
        ``,
        `For reference, here's what you sent:`,
        ``,
        message,
        ``,
        `— Saurav Singh`,
      ].join("\n"),
      html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Thanks for reaching out</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
  <!-- Preheader: shows in inbox preview, hidden in body -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; font-size:1px; line-height:1px; color:#f4f4f7;">
    Thanks for reaching out — I've received your message and will reply soon.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f7;">
    <tr>
      <td align="center" style="padding:24px 12px;">

        <!-- Container -->
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:560px; max-width:560px; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #ececf1;">

          <!-- Header band -->
          <tr>
            <td style="background-color:#6d28d9; padding:28px 32px;">
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:20px; line-height:1.3; font-weight:bold; color:#ffffff;">
                Thanks for reaching out, ${escapeHtml(name)}!
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.6; color:#333333;">
                Hi ${escapeHtml(name)},
              </p>
              <p style="margin:0 0 24px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.6; color:#333333;">
                Thanks for getting in touch through my portfolio. I've received your message and will get back to you as soon as I can.
              </p>

              <!-- Message recap -->
              <p style="margin:0 0 8px; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:1.4; font-weight:bold; letter-spacing:0.5px; text-transform:uppercase; color:#888888;">
                Your message
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
                <tr>
                  <td style="background-color:#f6f5fb; border-left:3px solid #6d28d9; border-radius:6px; padding:16px 18px; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:#444444; white-space:pre-wrap;">${escapeHtml(message)}</td>
                </tr>
              </table>

              <!-- Signature -->
              <p style="margin:28px 0 0; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.6; color:#333333;">
                — Saurav Singh
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; background-color:#fafafb; border-top:1px solid #ececf1;">
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:1.5; color:#999999;">
                This is an automated confirmation. You can simply reply to this email to reach me directly.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Container -->

      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    if (replyError) {
      // Log but don't fail — the important email (to me) already went out.
      console.error("Resend auto-reply error:", replyError);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form mail error:", err);
    return NextResponse.json(
      { error: "Failed to send. Please try again or email me directly." },
      { status: 500 },
    );
  }
}
