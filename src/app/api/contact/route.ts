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

// Auto-reply email templates with modern design matching brand
const autoReplyTemplates = {
  en: {
    subject: "Thank you for reaching out!",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0A0A0A;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF;">
                <!-- Header with gold accent -->
                <tr>
                  <td style="padding: 0;">
                    <div style="height: 8px; background: linear-gradient(90deg, #eec84e 0%, #dc5b49 50%, #334D5C 100%);"></div>
                  </td>
                </tr>

                <!-- Logo/Brand section -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center;">
                    <h1 style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 700; color: #0A0A0A; letter-spacing: -0.02em;">
                      MER
                    </h1>
                    <div style="width: 60px; height: 2px; background-color: #eec84e; margin: 16px auto;"></div>
                  </td>
                </tr>

                <!-- Main content -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="margin: 0 0 24px 0; font-family: 'Courier New', Courier, monospace; font-size: 24px; font-weight: 600; color: #0A0A0A; line-height: 1.3;">
                      Hi ${name},
                    </h2>

                    <p style="margin: 0 0 20px 0; font-family: 'Courier New', Courier, monospace; font-size: 16px; line-height: 1.7; color: #0A0A0A;">
                      Thank you for reaching out. I've received your message and truly appreciate you taking the time to connect.
                    </p>

                    <p style="margin: 0 0 20px 0; font-family: 'Courier New', Courier, monospace; font-size: 16px; line-height: 1.7; color: #0A0A0A;">
                      I carefully review every inquiry that comes through. You can expect a thoughtful response from me within <strong style="color: #eec84e; background-color: #0A0A0A; padding: 2px 8px; border-radius: 3px;">48 hours</strong>.
                    </p>

                    <!-- CTA Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                      <tr>
                        <td style="background-color: #F5F5F5; padding: 24px; border-left: 4px solid #eec84e;">
                          <p style="margin: 0 0 12px 0; font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.6; color: #666666;">
                            In the meantime, explore my work and approach
                          </p>
                          <a href="https://manecharo.com" style="display: inline-block; font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 600; color: #0A0A0A; text-decoration: none; background-color: #eec84e; padding: 12px 24px; border-radius: 4px; margin-top: 8px;">
                            Visit manecharo.com →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 32px 0 0 0; font-family: 'Courier New', Courier, monospace; font-size: 16px; line-height: 1.7; color: #0A0A0A;">
                      Looking forward to our conversation.
                    </p>
                  </td>
                </tr>

                <!-- Signature -->
                <tr>
                  <td style="padding: 20px 40px 40px 40px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right: 20px; vertical-align: top;">
                          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #eec84e 0%, #dc5b49 100%); border-radius: 50%;"></div>
                        </td>
                        <td style="vertical-align: middle;">
                          <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 600; color: #0A0A0A; line-height: 1.4;">
                            Manuel Echavarria Romero
                          </p>
                          <p style="margin: 4px 0 0 0; font-family: 'Courier New', Courier, monospace; font-size: 14px; color: #666666; line-height: 1.4;">
                            Problem Solver & Builder
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #0A0A0A; padding: 32px 40px; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #999999; line-height: 1.6;">
                      Kuala Lumpur, Malaysia | Working Globally
                    </p>
                    <div style="margin: 16px 0;">
                      <a href="https://instagram.com/Manecharo" style="display: inline-block; margin: 0 8px; color: #eec84e; text-decoration: none; font-size: 13px;">Instagram</a>
                      <span style="color: #666666;">•</span>
                      <a href="https://linkedin.com/in/mer101" style="display: inline-block; margin: 0 8px; color: #eec84e; text-decoration: none; font-size: 13px;">LinkedIn</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  },
  es: {
    subject: "¡Gracias por contactarme!",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0A0A0A;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF;">
                <!-- Header with gold accent -->
                <tr>
                  <td style="padding: 0;">
                    <div style="height: 8px; background: linear-gradient(90deg, #eec84e 0%, #dc5b49 50%, #334D5C 100%);"></div>
                  </td>
                </tr>

                <!-- Logo/Brand section -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center;">
                    <h1 style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 700; color: #0A0A0A; letter-spacing: -0.02em;">
                      MER
                    </h1>
                    <div style="width: 60px; height: 2px; background-color: #eec84e; margin: 16px auto;"></div>
                  </td>
                </tr>

                <!-- Main content -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="margin: 0 0 24px 0; font-family: 'Courier New', Courier, monospace; font-size: 24px; font-weight: 600; color: #0A0A0A; line-height: 1.3;">
                      Hola ${name},
                    </h2>

                    <p style="margin: 0 0 20px 0; font-family: 'Courier New', Courier, monospace; font-size: 16px; line-height: 1.7; color: #0A0A0A;">
                      Gracias por contactarme. He recibido tu mensaje y agradezco sinceramente que te hayas tomado el tiempo de escribir.
                    </p>

                    <p style="margin: 0 0 20px 0; font-family: 'Courier New', Courier, monospace; font-size: 16px; line-height: 1.7; color: #0A0A0A;">
                      Reviso cuidadosamente cada consulta que recibo. Puedes esperar una respuesta detallada de mi parte en las próximas <strong style="color: #eec84e; background-color: #0A0A0A; padding: 2px 8px; border-radius: 3px;">48 horas</strong>.
                    </p>

                    <!-- CTA Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                      <tr>
                        <td style="background-color: #F5F5F5; padding: 24px; border-left: 4px solid #eec84e;">
                          <p style="margin: 0 0 12px 0; font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.6; color: #666666;">
                            Mientras tanto, explora mi trabajo y enfoque
                          </p>
                          <a href="https://manecharo.com" style="display: inline-block; font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 600; color: #0A0A0A; text-decoration: none; background-color: #eec84e; padding: 12px 24px; border-radius: 4px; margin-top: 8px;">
                            Visita manecharo.com →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 32px 0 0 0; font-family: 'Courier New', Courier, monospace; font-size: 16px; line-height: 1.7; color: #0A0A0A;">
                      Espero con interés nuestra conversación.
                    </p>
                  </td>
                </tr>

                <!-- Signature -->
                <tr>
                  <td style="padding: 20px 40px 40px 40px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right: 20px; vertical-align: top;">
                          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #eec84e 0%, #dc5b49 100%); border-radius: 50%;"></div>
                        </td>
                        <td style="vertical-align: middle;">
                          <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 600; color: #0A0A0A; line-height: 1.4;">
                            Manuel Echavarria Romero
                          </p>
                          <p style="margin: 4px 0 0 0; font-family: 'Courier New', Courier, monospace; font-size: 14px; color: #666666; line-height: 1.4;">
                            Solucionador de Problemas y Constructor
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #0A0A0A; padding: 32px 40px; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #999999; line-height: 1.6;">
                      Kuala Lumpur, Malasia | Trabajo Global
                    </p>
                    <div style="margin: 16px 0;">
                      <a href="https://instagram.com/Manecharo" style="display: inline-block; margin: 0 8px; color: #eec84e; text-decoration: none; font-size: 13px;">Instagram</a>
                      <span style="color: #666666;">•</span>
                      <a href="https://linkedin.com/in/mer101" style="display: inline-block; margin: 0 8px; color: #eec84e; text-decoration: none; font-size: 13px;">LinkedIn</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  },
  it: {
    subject: "Grazie per avermi contattato!",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0A0A0A;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF;">
                <!-- Header with gold accent -->
                <tr>
                  <td style="padding: 0;">
                    <div style="height: 8px; background: linear-gradient(90deg, #eec84e 0%, #dc5b49 50%, #334D5C 100%);"></div>
                  </td>
                </tr>

                <!-- Logo/Brand section -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center;">
                    <h1 style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 700; color: #0A0A0A; letter-spacing: -0.02em;">
                      MER
                    </h1>
                    <div style="width: 60px; height: 2px; background-color: #eec84e; margin: 16px auto;"></div>
                  </td>
                </tr>

                <!-- Main content -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="margin: 0 0 24px 0; font-family: 'Courier New', Courier, monospace; font-size: 24px; font-weight: 600; color: #0A0A0A; line-height: 1.3;">
                      Ciao ${name},
                    </h2>

                    <p style="margin: 0 0 20px 0; font-family: 'Courier New', Courier, monospace; font-size: 16px; line-height: 1.7; color: #0A0A0A;">
                      Grazie per avermi contattato. Ho ricevuto il tuo messaggio e apprezzo sinceramente che tu ti sia preso il tempo di scrivere.
                    </p>

                    <p style="margin: 0 0 20px 0; font-family: 'Courier New', Courier, monospace; font-size: 16px; line-height: 1.7; color: #0A0A0A;">
                      Esamino attentamente ogni richiesta che ricevo. Puoi aspettarti una risposta ponderata da parte mia entro <strong style="color: #eec84e; background-color: #0A0A0A; padding: 2px 8px; border-radius: 3px;">48 ore</strong>.
                    </p>

                    <!-- CTA Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                      <tr>
                        <td style="background-color: #F5F5F5; padding: 24px; border-left: 4px solid #eec84e;">
                          <p style="margin: 0 0 12px 0; font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.6; color: #666666;">
                            Nel frattempo, esplora il mio lavoro e approccio
                          </p>
                          <a href="https://manecharo.com" style="display: inline-block; font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 600; color: #0A0A0A; text-decoration: none; background-color: #eec84e; padding: 12px 24px; border-radius: 4px; margin-top: 8px;">
                            Visita manecharo.com →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 32px 0 0 0; font-family: 'Courier New', Courier, monospace; font-size: 16px; line-height: 1.7; color: #0A0A0A;">
                      Non vedo l'ora di parlare con te.
                    </p>
                  </td>
                </tr>

                <!-- Signature -->
                <tr>
                  <td style="padding: 20px 40px 40px 40px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right: 20px; vertical-align: top;">
                          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #eec84e 0%, #dc5b49 100%); border-radius: 50%;"></div>
                        </td>
                        <td style="vertical-align: middle;">
                          <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 600; color: #0A0A0A; line-height: 1.4;">
                            Manuel Echavarria Romero
                          </p>
                          <p style="margin: 4px 0 0 0; font-family: 'Courier New', Courier, monospace; font-size: 14px; color: #666666; line-height: 1.4;">
                            Risolutore di Problemi e Costruttore
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #0A0A0A; padding: 32px 40px; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #999999; line-height: 1.6;">
                      Kuala Lumpur, Malesia | Lavoro Globale
                    </p>
                    <div style="margin: 16px 0;">
                      <a href="https://instagram.com/Manecharo" style="display: inline-block; margin: 0 8px; color: #eec84e; text-decoration: none; font-size: 13px;">Instagram</a>
                      <span style="color: #666666;">•</span>
                      <a href="https://linkedin.com/in/mer101" style="display: inline-block; margin: 0 8px; color: #eec84e; text-decoration: none; font-size: 13px;">LinkedIn</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  },
};

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn("reCAPTCHA SECRET_KEY not configured - skipping verification");
    return true; // Allow submission if reCAPTCHA is not configured
  }

  if (!token) {
    console.warn("No reCAPTCHA token provided");
    return true; // Allow submission if no token (for development)
  }

  try {
    console.log("Verifying reCAPTCHA token...");
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    console.log("reCAPTCHA verification response:", JSON.stringify(data));

    if (!data.success) {
      console.error("reCAPTCHA verification failed:", data['error-codes']);
      return false;
    }

    if (data.score < 0.5) {
      console.warn("reCAPTCHA score too low:", data.score);
      return false;
    }

    console.log("reCAPTCHA verification successful, score:", data.score);
    return true;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectType, message, budget, timeline, language = 'en', recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const isValid = await verifyRecaptcha(recaptchaToken);
      if (!isValid) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
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

    console.log("Attempting to send notification email to Manuel...");

    // Send email to Manuel
    const notificationResult = await resend.emails.send({
      from: `Manecharo - Design - NoReply <${process.env.RESEND_FROM_EMAIL || "noreply@manecharo.com"}>`,
      to: "manuelerfreelance@gmail.com",
      subject: `🔔 New Contact: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #F5F5F5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F5F5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 0;">
                      <div style="height: 8px; background: linear-gradient(90deg, #eec84e 0%, #dc5b49 50%, #334D5C 100%);"></div>
                    </td>
                  </tr>

                  <!-- Alert Badge -->
                  <tr>
                    <td style="padding: 32px 40px 20px 40px;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="background-color: #eec84e; color: #0A0A0A; padding: 8px 16px; border-radius: 20px; font-family: 'Courier New', Courier, monospace; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            New Inquiry
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Title -->
                  <tr>
                    <td style="padding: 0 40px 24px 40px;">
                      <h1 style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 28px; font-weight: 600; color: #0A0A0A; line-height: 1.3;">
                        Contact Form Submission
                      </h1>
                    </td>
                  </tr>

                  <!-- Contact Details Card -->
                  <tr>
                    <td style="padding: 0 40px 24px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A; border-radius: 8px;">
                        <tr>
                          <td style="padding: 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 8px 0;">
                                  <span style="font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                                  <p style="margin: 4px 0 0 0; font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 600; color: #FFFFFF;">${name}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 16px 0 8px 0;">
                                  <span style="font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                                  <p style="margin: 4px 0 0 0;">
                                    <a href="mailto:${email}" style="font-family: 'Courier New', Courier, monospace; font-size: 16px; color: #eec84e; text-decoration: none;">${email}</a>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 16px 0 8px 0;">
                                  <span style="font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px;">Language</span>
                                  <p style="margin: 4px 0 0 0; font-family: 'Courier New', Courier, monospace; font-size: 16px; color: #FFFFFF;">${languageLabels[language as keyof typeof languageLabels] || 'English'}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Project Details Grid -->
                  <tr>
                    <td style="padding: 0 40px 24px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="50%" style="padding-right: 8px; vertical-align: top;">
                            <div style="background-color: #F5F5F5; padding: 16px; border-radius: 6px; border-left: 3px solid #eec84e;">
                              <p style="margin: 0 0 4px 0; font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">Project Type</p>
                              <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 600; color: #0A0A0A;">${projectType || "Not specified"}</p>
                            </div>
                          </td>
                          <td width="50%" style="padding-left: 8px; vertical-align: top;">
                            <div style="background-color: #F5F5F5; padding: 16px; border-radius: 6px; border-left: 3px solid #dc5b49;">
                              <p style="margin: 0 0 4px 0; font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">Budget</p>
                              <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 600; color: #0A0A0A;">${budget || "Not specified"}</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding-top: 16px;">
                            <div style="background-color: #F5F5F5; padding: 16px; border-radius: 6px; border-left: 3px solid #334D5C;">
                              <p style="margin: 0 0 4px 0; font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">Timeline</p>
                              <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 600; color: #0A0A0A;">${timeline || "Not specified"}</p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Message -->
                  <tr>
                    <td style="padding: 0 40px 32px 40px;">
                      <div style="background-color: #FFFFFF; border: 2px solid #0A0A0A; border-radius: 8px; padding: 24px;">
                        <p style="margin: 0 0 12px 0; font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                        <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 15px; line-height: 1.7; color: #0A0A0A; white-space: pre-wrap;">${message}</p>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer Note -->
                  <tr>
                    <td style="background-color: #F5F5F5; padding: 24px 40px; text-align: center; border-top: 1px solid #E0E0E0;">
                      <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #666666;">
                        ✓ Auto-reply sent to client in ${languageLabels[language as keyof typeof languageLabels] || 'English'}
                      </p>
                      <p style="margin: 8px 0 0 0; font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #999999;">
                        Received at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur', dateStyle: 'medium', timeStyle: 'short' })} MYT
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Notification email result:", JSON.stringify(notificationResult));

    // Get the appropriate auto-reply template based on language
    const template = autoReplyTemplates[language as keyof typeof autoReplyTemplates] || autoReplyTemplates.en;

    console.log("Attempting to send auto-reply to client...");

    // Send auto-reply to user in their selected language
    const autoReplyResult = await resend.emails.send({
      from: `Manecharo - Design - NoReply <${process.env.RESEND_FROM_EMAIL || "noreply@manecharo.com"}>`,
      to: email,
      subject: template.subject,
      html: template.html(name),
    });

    console.log("Auto-reply email result:", JSON.stringify(autoReplyResult));

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
