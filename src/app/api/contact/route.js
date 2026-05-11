import nodemailer from "nodemailer";
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

    const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_EMAIL_TO } = process.env;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env var");
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        // App password — Gmail accepts the 16-char string with or without spaces
        pass: GMAIL_APP_PASSWORD.replace(/\s+/g, ""),
      },
    });

    await transporter.sendMail({
      from: `Saurav Portfolio <${GMAIL_USER}>`,
      to: CONTACT_EMAIL_TO || GMAIL_USER,
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form mail error:", err);
    return NextResponse.json(
      { error: "Failed to send. Please try again or email me directly." },
      { status: 500 },
    );
  }
}
