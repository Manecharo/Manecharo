import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lazy initialization to avoid build-time errors
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectType, message, budget, timeline } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resend = getResendClient();

    // Send email to Manuel
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@manecharo.com",
      to: "manuelerfreelance@gmail.com",
      subject: `New Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
        <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
        <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Send auto-reply to user
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@manecharo.com",
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for getting in touch! I've received your message and will get back to you within 48 hours.</p>
        <p>In the meantime, feel free to check out my work at <a href="https://manecharo.com">manecharo.com</a>.</p>
        <br>
        <p>Best,<br>Manuel Echavarria Romero</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
