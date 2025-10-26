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

// Auto-reply email templates
const autoReplyTemplates = {
  en: {
    subject: "Thank you for reaching out!",
    html: (name: string) => `
      <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="font-size: 24px; margin-bottom: 20px;">Hi ${name},</h2>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Thank you for reaching out. I've received your message and truly appreciate you taking the time to connect.
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          I carefully review every inquiry that comes through. You can expect a thoughtful response from me within 48 hours.
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          In the meantime, feel free to explore my work and approach at <a href="https://manecharo.com" style="color: #D4AF37; text-decoration: underline;">manecharo.com</a>.
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Looking forward to our conversation.
        </p>

        <p style="font-size: 16px; line-height: 1.6;">
          Best,<br>
          <strong>Manuel Echavarria Romero</strong><br>
          <span style="color: #666;">Problem Solver & Builder</span>
        </p>
      </div>
    `,
  },
  es: {
    subject: "¡Gracias por contactarme!",
    html: (name: string) => `
      <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="font-size: 24px; margin-bottom: 20px;">Hola ${name},</h2>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Gracias por contactarme. He recibido tu mensaje y agradezco sinceramente que te hayas tomado el tiempo de escribir.
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Reviso cuidadosamente cada consulta que recibo. Puedes esperar una respuesta detallada de mi parte en las próximas 48 horas.
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Mientras tanto, siéntete libre de explorar mi trabajo y enfoque en <a href="https://manecharo.com" style="color: #D4AF37; text-decoration: underline;">manecharo.com</a>.
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Espero con interés nuestra conversación.
        </p>

        <p style="font-size: 16px; line-height: 1.6;">
          Saludos,<br>
          <strong>Manuel Echavarria Romero</strong><br>
          <span style="color: #666;">Solucionador de Problemas y Constructor</span>
        </p>
      </div>
    `,
  },
  it: {
    subject: "Grazie per avermi contattato!",
    html: (name: string) => `
      <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="font-size: 24px; margin-bottom: 20px;">Ciao ${name},</h2>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Grazie per avermi contattato. Ho ricevuto il tuo messaggio e apprezzo sinceramente che tu ti sia preso il tempo di scrivere.
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Esamino attentamente ogni richiesta che ricevo. Puoi aspettarti una risposta ponderata da parte mia entro 48 ore.
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Nel frattempo, sentiti libero di esplorare il mio lavoro e il mio approccio su <a href="https://manecharo.com" style="color: #D4AF37; text-decoration: underline;">manecharo.com</a>.
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Non vedo l'ora di parlare con te.
        </p>

        <p style="font-size: 16px; line-height: 1.6;">
          Cordiali saluti,<br>
          <strong>Manuel Echavarria Romero</strong><br>
          <span style="color: #666;">Risolutore di Problemi e Costruttore</span>
        </p>
      </div>
    `,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectType, message, budget, timeline, language = 'en' } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured. Please contact directly at manuelerfreelance@gmail.com" },
        { status: 500 }
      );
    }

    const resend = getResendClient();

    // Language labels for the notification email
    const languageLabels = {
      en: 'English',
      es: 'Spanish',
      it: 'Italian'
    };

    // Send email to Manuel
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@manecharo.com",
      to: "manuelerfreelance@gmail.com",
      subject: `New Contact Form: ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="font-size: 24px; margin-bottom: 20px; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">New Contact Form Submission</h2>

          <div style="background: #f5f5f5; padding: 20px; margin-bottom: 20px; border-left: 4px solid #D4AF37;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #D4AF37;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Language:</strong> ${languageLabels[language as keyof typeof languageLabels] || 'English'} (${language.toUpperCase()})</p>
            <p style="margin: 8px 0;"><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
            <p style="margin: 8px 0;"><strong>Budget:</strong> ${budget || "Not specified"}</p>
            <p style="margin: 8px 0;"><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
          </div>

          <div style="background: white; padding: 20px; border: 2px solid #1a1a1a;">
            <h3 style="margin-top: 0; font-size: 18px;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            Auto-reply sent to client in ${languageLabels[language as keyof typeof languageLabels] || 'English'}.
          </p>
        </div>
      `,
    });

    // Get the appropriate auto-reply template based on language
    const template = autoReplyTemplates[language as keyof typeof autoReplyTemplates] || autoReplyTemplates.en;

    // Send auto-reply to user in their selected language
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@manecharo.com",
      to: email,
      subject: template.subject,
      html: template.html(name),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);

    // More detailed error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Detailed error:", errorMessage);

    return NextResponse.json(
      {
        error: "Failed to send message. Please contact directly at manuelerfreelance@gmail.com",
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
