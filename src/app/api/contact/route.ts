import { NextResponse } from "next/server";
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

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_TO_EMAIL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!webhookResponse.ok) {
        throw new Error("Unable to deliver your message.");
      }
    } else if (resendApiKey && contactEmail) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
          to: [contactEmail],
          subject: `Portfolio contact from ${body.name}`,
          reply_to: body.email,
          text: body.message,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Unable to deliver your message.");
      }
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
      message: process.env.CONTACT_SUCCESS_MESSAGE || "Message sent successfully.",
    });
  } catch (error) {
    return NextResponse.json<ContactFormResponse>(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to send message.",
      },
      { status: 500 },
    );
  }
}
