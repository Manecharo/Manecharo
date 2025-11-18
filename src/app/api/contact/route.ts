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

// Auto-reply email templates with bold, flat design matching brand
const autoReplyTemplates = {
  en: {
    subject: "Thank you for reaching out!",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #FAFAFA; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA; padding: 48px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF;">

                <!-- Logo Header with Navy Background -->
                <tr>
                  <td style="padding: 48px 48px 40px 48px; text-align: center; background-color: #334D5C;">
                    <a href="https://manecharo.com" style="display: inline-block; text-decoration: none;">
                      <svg width="100" height="100" viewBox="0 0 212.49 212.49" style="display: block; margin: 0 auto 20px auto;">
                        <path fill="#FFFFFF" d="M18.44,41.67l20.5,33.16c3.69,5.97,10.08,9.54,17.11,9.54h0c7.02,0,13.42-3.57,17.12-9.54l34.85-56.39h104.47V0h-114.75l-40.26,65.14c-.33.53-.81.8-1.43.8s-1.1-.27-1.43-.79L23.25,14.39c-2.98-4.82-8.67-7.04-14.12-5.47C3.67,10.47,0,15.32,0,21v191.49h18.44V41.67Z"/>
                        <path fill="#FFFFFF" d="M118.32,56.32h94.16v-18.44h-94.16c-5.09,0-9.22,4.13-9.22,9.22s4.13,9.22,9.22,9.22Z"/>
                        <path fill="#FFFFFF" d="M118.32,94.21h94.16v-18.44h-94.16c-5.09,0-9.22,4.13-9.22,9.22s4.13,9.22,9.22,9.22Z"/>
                        <path fill="#FFFFFF" d="M65.27,212.49v-75.33c0-2.8,2.27-5.06,5.06-5.06h120.36c1.84,0,3.35,1.51,3.35,3.35v17.01c0,1.84-1.51,3.35-3.35,3.35h-62.41c-6.08,0-11.08,4.18-12.16,10.16-1.09,6,2.72,11.85,8.43,14.01l61.41,32.52h26.53v-9.66l-51.07-28.59h32.25c10.39,0,18.82-8.43,18.82-18.82v-22.95c0-10.39-8.42-18.82-18.82-18.82h-123.34c-12.98,0-23.5,10.52-23.5,23.5v75.33h18.44Z"/>
                      </svg>
                    </a>
                    <h1 style="margin: 0; font-family: 'Space Grotesk', 'Inter', sans-serif; font-size: 24px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em; text-transform: uppercase;">
                      Manuel Echavarria Romero
                    </h1>
                    <p style="margin: 8px 0 0 0; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #EEC84E; letter-spacing: 0.02em; text-transform: uppercase;">
                      Product Designer & Strategist
                    </p>
                  </td>
                </tr>

                <!-- Red Accent Divider -->
                <tr>
                  <td style="padding: 0;">
                    <div style="height: 4px; background-color: #DC5B49;"></div>
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td style="padding: 32px 48px;">
                    <h2 style="margin: 0 0 24px 0; font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 600; color: #0A0A0A; line-height: 1.2;">
                      Hi ${name},
                    </h2>

                    <p style="margin: 0 0 20px 0; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #333333;">
                      Thank you for reaching out. I've received your message and truly appreciate you taking the time to connect.
                    </p>

                    <p style="margin: 0 0 20px 0; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #333333;">
                      I carefully review every inquiry. You can expect a thoughtful response within <strong style="color: #0A0A0A; font-weight: 600;">48 hours</strong>.
                    </p>

                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                      <tr>
                        <td style="background-color: #DC5B49; padding: 2px;">
                          <a href="https://manecharo.com" style="display: inline-block; font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; color: #FFFFFF; text-decoration: none; background-color: #DC5B49; padding: 16px 32px; text-transform: uppercase; letter-spacing: 0.5px;">
                            Explore My Work →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 32px 0 0 0; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #333333;">
                      Looking forward to our conversation.
                    </p>

                    <p style="margin: 24px 0 0 0; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 600; color: #0A0A0A;">
                      Manuel
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 32px 48px; background-color: #0A0A0A; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #999999;">
                      Kuala Lumpur, Malaysia • Working Globally
                    </p>
                    <div style="margin: 16px 0 0 0;">
                      <a href="https://instagram.com/Manecharo" style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #EEC84E; text-decoration: none; margin: 0 12px;">Instagram</a>
                      <a href="https://linkedin.com/in/mer101" style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #EEC84E; text-decoration: none; margin: 0 12px;">LinkedIn</a>
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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #FAFAFA; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA; padding: 48px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF;">
                <tr>
                  <td style="padding: 48px 48px 40px 48px; text-align: center; background-color: #334D5C;">
                    <a href="https://manecharo.com" style="display: inline-block; text-decoration: none;">
                      <svg width="100" height="100" viewBox="0 0 212.49 212.49" style="display: block; margin: 0 auto 20px auto;">
                        <path fill="#FFFFFF" d="M18.44,41.67l20.5,33.16c3.69,5.97,10.08,9.54,17.11,9.54h0c7.02,0,13.42-3.57,17.12-9.54l34.85-56.39h104.47V0h-114.75l-40.26,65.14c-.33.53-.81.8-1.43.8s-1.1-.27-1.43-.79L23.25,14.39c-2.98-4.82-8.67-7.04-14.12-5.47C3.67,10.47,0,15.32,0,21v191.49h18.44V41.67Z"/>
                        <path fill="#FFFFFF" d="M118.32,56.32h94.16v-18.44h-94.16c-5.09,0-9.22,4.13-9.22,9.22s4.13,9.22,9.22,9.22Z"/>
                        <path fill="#FFFFFF" d="M118.32,94.21h94.16v-18.44h-94.16c-5.09,0-9.22,4.13-9.22,9.22s4.13,9.22,9.22,9.22Z"/>
                        <path fill="#FFFFFF" d="M65.27,212.49v-75.33c0-2.8,2.27-5.06,5.06-5.06h120.36c1.84,0,3.35,1.51,3.35,3.35v17.01c0,1.84-1.51,3.35-3.35,3.35h-62.41c-6.08,0-11.08,4.18-12.16,10.16-1.09,6,2.72,11.85,8.43,14.01l61.41,32.52h26.53v-9.66l-51.07-28.59h32.25c10.39,0,18.82-8.43,18.82-18.82v-22.95c0-10.39-8.42-18.82-18.82-18.82h-123.34c-12.98,0-23.5,10.52-23.5,23.5v75.33h18.44Z"/>
                      </svg>
                    </a>
                    <h1 style="margin: 0; font-family: 'Space Grotesk', 'Inter', sans-serif; font-size: 24px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em; text-transform: uppercase;">
                      Manuel Echavarria Romero
                    </h1>
                    <p style="margin: 8px 0 0 0; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #EEC84E; letter-spacing: 0.02em; text-transform: uppercase;">
                      Diseñador de Producto y Estratega
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <div style="height: 4px; background-color: #DC5B49;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px 48px;">
                    <h2 style="margin: 0 0 24px 0; font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 600; color: #0A0A0A; line-height: 1.2;">
                      Hola ${name},
                    </h2>
                    <p style="margin: 0 0 20px 0; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #333333;">
                      Gracias por contactarme. He recibido tu mensaje y agradezco sinceramente que te hayas tomado el tiempo de escribir.
                    </p>
                    <p style="margin: 0 0 20px 0; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #333333;">
                      Reviso cuidadosamente cada consulta. Puedes esperar una respuesta detallada en las próximas <strong style="color: #0A0A0A; font-weight: 600;">48 horas</strong>.
                    </p>
                    <table cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                      <tr>
                        <td style="background-color: #DC5B49; padding: 2px;">
                          <a href="https://manecharo.com" style="display: inline-block; font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; color: #FFFFFF; text-decoration: none; background-color: #DC5B49; padding: 16px 32px; text-transform: uppercase; letter-spacing: 0.5px;">
                            Explora Mi Trabajo →
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 32px 0 0 0; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #333333;">
                      Espero con interés nuestra conversación.
                    </p>
                    <p style="margin: 24px 0 0 0; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 600; color: #0A0A0A;">
                      Manuel
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px 48px; background-color: #0A0A0A; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #999999;">
                      Kuala Lumpur, Malasia • Trabajo Global
                    </p>
                    <div style="margin: 16px 0 0 0;">
                      <a href="https://instagram.com/Manecharo" style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #EEC84E; text-decoration: none; margin: 0 12px;">Instagram</a>
                      <a href="https://linkedin.com/in/mer101" style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #EEC84E; text-decoration: none; margin: 0 12px;">LinkedIn</a>
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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #FAFAFA; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA; padding: 48px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF;">
                <tr>
                  <td style="padding: 48px 48px 40px 48px; text-align: center; background-color: #334D5C;">
                    <a href="https://manecharo.com" style="display: inline-block; text-decoration: none;">
                      <svg width="100" height="100" viewBox="0 0 212.49 212.49" style="display: block; margin: 0 auto 20px auto;">
                        <path fill="#FFFFFF" d="M18.44,41.67l20.5,33.16c3.69,5.97,10.08,9.54,17.11,9.54h0c7.02,0,13.42-3.57,17.12-9.54l34.85-56.39h104.47V0h-114.75l-40.26,65.14c-.33.53-.81.8-1.43.8s-1.1-.27-1.43-.79L23.25,14.39c-2.98-4.82-8.67-7.04-14.12-5.47C3.67,10.47,0,15.32,0,21v191.49h18.44V41.67Z"/>
                        <path fill="#FFFFFF" d="M118.32,56.32h94.16v-18.44h-94.16c-5.09,0-9.22,4.13-9.22,9.22s4.13,9.22,9.22,9.22Z"/>
                        <path fill="#FFFFFF" d="M118.32,94.21h94.16v-18.44h-94.16c-5.09,0-9.22,4.13-9.22,9.22s4.13,9.22,9.22,9.22Z"/>
                        <path fill="#FFFFFF" d="M65.27,212.49v-75.33c0-2.8,2.27-5.06,5.06-5.06h120.36c1.84,0,3.35,1.51,3.35,3.35v17.01c0,1.84-1.51,3.35-3.35,3.35h-62.41c-6.08,0-11.08,4.18-12.16,10.16-1.09,6,2.72,11.85,8.43,14.01l61.41,32.52h26.53v-9.66l-51.07-28.59h32.25c10.39,0,18.82-8.43,18.82-18.82v-22.95c0-10.39-8.42-18.82-18.82-18.82h-123.34c-12.98,0-23.5,10.52-23.5,23.5v75.33h18.44Z"/>
                      </svg>
                    </a>
                    <h1 style="margin: 0; font-family: 'Space Grotesk', 'Inter', sans-serif; font-size: 24px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em; text-transform: uppercase;">
                      Manuel Echavarria Romero
                    </h1>
                    <p style="margin: 8px 0 0 0; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #EEC84E; letter-spacing: 0.02em; text-transform: uppercase;">
                      Product Designer e Stratega
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <div style="height: 4px; background-color: #DC5B49;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px 48px;">
                    <h2 style="margin: 0 0 24px 0; font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 600; color: #0A0A0A; line-height: 1.2;">
                      Ciao ${name},
                    </h2>
                    <p style="margin: 0 0 20px 0; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #333333;">
                      Grazie per avermi contattato. Ho ricevuto il tuo messaggio e apprezzo sinceramente che tu ti sia preso il tempo di scrivere.
                    </p>
                    <p style="margin: 0 0 20px 0; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #333333;">
                      Esamino attentamente ogni richiesta. Puoi aspettarti una risposta ponderata entro <strong style="color: #0A0A0A; font-weight: 600;">48 ore</strong>.
                    </p>
                    <table cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                      <tr>
                        <td style="background-color: #DC5B49; padding: 2px;">
                          <a href="https://manecharo.com" style="display: inline-block; font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; color: #FFFFFF; text-decoration: none; background-color: #DC5B49; padding: 16px 32px; text-transform: uppercase; letter-spacing: 0.5px;">
                            Esplora Il Mio Lavoro →
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 32px 0 0 0; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #333333;">
                      Non vedo l'ora di parlare con te.
                    </p>
                    <p style="margin: 24px 0 0 0; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 600; color: #0A0A0A;">
                      Manuel
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px 48px; background-color: #0A0A0A; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #999999;">
                      Kuala Lumpur, Malesia • Lavoro Globale
                    </p>
                    <div style="margin: 16px 0 0 0;">
                      <a href="https://instagram.com/Manecharo" style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #EEC84E; text-decoration: none; margin: 0 12px;">Instagram</a>
                      <a href="https://linkedin.com/in/mer101" style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #EEC84E; text-decoration: none; margin: 0 12px;">LinkedIn</a>
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
  const result = await verifyRecaptchaWithDetails(token);
  return result.success;
}

async function verifyRecaptchaWithDetails(token: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY not configured");
    return { success: false, error: "RECAPTCHA_SECRET_KEY not configured on server" };
  }

  if (!token) {
    console.error("No reCAPTCHA token provided");
    return { success: false, error: "No reCAPTCHA token provided" };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (!data.success) {
      const errorCodes = data['error-codes'] || [];
      console.error("reCAPTCHA verification failed:", errorCodes);
      return { success: false, error: `Google reCAPTCHA error: ${errorCodes.join(', ')}` };
    }

    // v2 checkbox doesn't have scores - just success/fail
    return { success: true };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false, error: `Exception: ${error instanceof Error ? error.message : 'Unknown error'}` };
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

    // Verify reCAPTCHA - REQUIRED
    const recaptchaResult = await verifyRecaptchaWithDetails(recaptchaToken);
    if (!recaptchaResult.success) {
      return NextResponse.json(
        {
          error: "reCAPTCHA verification failed. Please complete the checkbox and try again.",
          details: recaptchaResult.error
        },
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
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 0; background-color: #FAFAFA; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA; padding: 48px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF;">
                  <!-- Logo Header with Navy Background -->
                  <tr>
                    <td style="padding: 40px 48px 32px 48px; text-align: center; background-color: #334D5C;">
                      <svg width="80" height="80" viewBox="0 0 212.49 212.49" style="display: block; margin: 0 auto 16px auto;">
                        <path fill="#FFFFFF" d="M18.44,41.67l20.5,33.16c3.69,5.97,10.08,9.54,17.11,9.54h0c7.02,0,13.42-3.57,17.12-9.54l34.85-56.39h104.47V0h-114.75l-40.26,65.14c-.33.53-.81.8-1.43.8s-1.1-.27-1.43-.79L23.25,14.39c-2.98-4.82-8.67-7.04-14.12-5.47C3.67,10.47,0,15.32,0,21v191.49h18.44V41.67Z"/>
                        <path fill="#FFFFFF" d="M118.32,56.32h94.16v-18.44h-94.16c-5.09,0-9.22,4.13-9.22,9.22s4.13,9.22,9.22,9.22Z"/>
                        <path fill="#FFFFFF" d="M118.32,94.21h94.16v-18.44h-94.16c-5.09,0-9.22,4.13-9.22,9.22s4.13,9.22,9.22,9.22Z"/>
                        <path fill="#FFFFFF" d="M65.27,212.49v-75.33c0-2.8,2.27-5.06,5.06-5.06h120.36c1.84,0,3.35,1.51,3.35,3.35v17.01c0,1.84-1.51,3.35-3.35,3.35h-62.41c-6.08,0-11.08,4.18-12.16,10.16-1.09,6,2.72,11.85,8.43,14.01l61.41,32.52h26.53v-9.66l-51.07-28.59h32.25c10.39,0,18.82-8.43,18.82-18.82v-22.95c0-10.39-8.42-18.82-18.82-18.82h-123.34c-12.98,0-23.5,10.52-23.5,23.5v75.33h18.44Z"/>
                      </svg>
                      <div style="background-color: #DC5B49; color: #FFFFFF; display: inline-block; padding: 8px 20px; font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                        🔔 New Inquiry
                      </div>
                    </td>
                  </tr>

                  <!-- Red Accent Divider -->
                  <tr>
                    <td style="padding: 0;">
                      <div style="height: 4px; background-color: #DC5B49;"></div>
                    </td>
                  </tr>

                  <!-- Title -->
                  <tr>
                    <td style="padding: 32px 48px 24px 48px;">
                      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; color: #0A0A0A; line-height: 1.2; text-transform: uppercase;">
                        Contact Form Submission
                      </h1>
                    </td>
                  </tr>

                  <!-- Contact Details Card -->
                  <tr>
                    <td style="padding: 0 48px 24px 48px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #334D5C; border-radius: 4px;">
                        <tr>
                          <td style="padding: 28px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 8px 0;">
                                  <span style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: #EEC84E; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                                  <p style="margin: 6px 0 0 0; font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 600; color: #FFFFFF;">${name}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 18px 0 8px 0;">
                                  <span style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: #EEC84E; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                                  <p style="margin: 6px 0 0 0;">
                                    <a href="mailto:${email}" style="font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 500; color: #FFFFFF; text-decoration: none;">${email}</a>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 18px 0 8px 0;">
                                  <span style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: #EEC84E; text-transform: uppercase; letter-spacing: 0.5px;">Language</span>
                                  <p style="margin: 6px 0 0 0; font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 500; color: #FFFFFF;">${languageLabels[language as keyof typeof languageLabels] || 'English'}</p>
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
