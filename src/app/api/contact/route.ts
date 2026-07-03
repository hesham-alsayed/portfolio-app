import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { ContactFormPayload, ContactFormResponse } from "@/types/cms";

function validatePayload(body: Partial<ContactFormPayload>): body is ContactFormPayload {
  return Boolean(
    body.name?.trim() &&
      body.email?.trim() &&
      body.message?.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email),
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactFormPayload>;

    if (!validatePayload(body)) {
      return NextResponse.json<ContactFormResponse>(
        { success: false, message: "Invalid form submission." },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL || "heshamelsauied@gmail.com";

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort) || 587,
        secure: Number(smtpPort) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: smtpUser,
        to: toEmail,
        subject: `Portfolio contact from ${body.name}`,
        text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
        replyTo: body.email,
      });
    } else if (process.env.NODE_ENV === "development") {
      console.info("Contact form submission:", body);
    } else {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          message: "Contact delivery is not configured.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json<ContactFormResponse>({
      success: true,
      message: "✅ Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json<ContactFormResponse>(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to send message.",
      },
      { status: 500 },
    );
  }
}
