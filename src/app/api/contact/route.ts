import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

// Create reusable transporter with SMTP2Go settings
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.smtp2go.com",
    port: parseInt(process.env.SMTP_PORT || "2525"),
    secure: false, // Use TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Generate HTML email template
const generateEmailHTML = (data: ContactFormData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #fff; margin: 0; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <!-- Name -->
                  <div style="margin-bottom: 24px;">
                    <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 1px;">Name</p>
                    <p style="color: #fff; font-size: 18px; margin: 0; font-weight: 600;">${data.name}</p>
                  </div>

                  <!-- Email -->
                  <div style="margin-bottom: 24px;">
                    <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 1px;">Email</p>
                    <p style="color: #00D4FF; font-size: 16px; margin: 0;">
                      <a href="mailto:${data.email}" style="color: #00D4FF; text-decoration: none;">${data.email}</a>
                    </p>
                  </div>

                  <!-- Company -->
                  ${data.company ? `
                  <div style="margin-bottom: 24px;">
                    <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 1px;">Company</p>
                    <p style="color: #fff; font-size: 16px; margin: 0;">${data.company}</p>
                  </div>
                  ` : ""}

                  <!-- Service & Budget Row -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                    <tr>
                      ${data.service ? `
                      <td width="50%" style="vertical-align: top;">
                        <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 1px;">Service</p>
                        <p style="color: #fff; font-size: 16px; margin: 0;">${data.service}</p>
                      </td>
                      ` : ""}
                      ${data.budget ? `
                      <td width="50%" style="vertical-align: top;">
                        <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 1px;">Budget</p>
                        <p style="color: #00D4FF; font-size: 16px; margin: 0; font-weight: 600;">${data.budget}</p>
                      </td>
                      ` : ""}
                    </tr>
                  </table>

                  <!-- Message -->
                  <div style="margin-bottom: 24px;">
                    <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 1px;">Message</p>
                    <div style="background-color: #1a1a1a; border-radius: 12px; padding: 20px; border-left: 3px solid #00D4FF;">
                      <p style="color: #ccc; font-size: 15px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                    </div>
                  </div>

                  <!-- CTA Button -->
                  <div style="text-align: center; margin-top: 32px;">
                    <a href="mailto:${data.email}?subject=Re: Your inquiry to WebXExpert"
                       style="display: inline-block; background: linear-gradient(135deg, #00D4FF 0%, #00B4D8 100%); color: #000; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 14px;">
                      Reply to ${data.name.split(" ")[0]}
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #0a0a0a; padding: 24px; text-align: center; border-top: 1px solid #222;">
                  <p style="color: #666; font-size: 12px; margin: 0;">
                    This email was sent from the WebXExpert contact form<br>
                    <span style="color: #444;">Received at ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</span>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Generate plain text version
const generateEmailText = (data: ContactFormData) => {
  return `
NEW CONTACT FORM SUBMISSION
============================

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ""}
${data.service ? `Service: ${data.service}` : ""}
${data.budget ? `Budget: ${data.budget}` : ""}

Message:
${data.message}

---
Received at ${new Date().toLocaleString()}
  `.trim();
};

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP not configured. Email not sent.");
      console.log("Contact form submission:", {
        timestamp: new Date().toISOString(),
        ...data,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your message. We'll get back to you soon!",
        },
        { status: 200 }
      );
    }

    // Create transporter and send email
    const transporter = createTransporter();

    const fromName = process.env.SMTP_FROM_NAME || "WebXExpert";
    const fromEmail = process.env.SMTP_FROM_EMAIL || "noreply@webxexpert.com";
    const toEmail = process.env.SMTP_TO_EMAIL || "hello@webxexpert.com";

    // Send the email
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: data.email,
      subject: `New Inquiry from ${data.name}${data.company ? ` - ${data.company}` : ""}`,
      text: generateEmailText(data),
      html: generateEmailHTML(data),
    });

    // Also send confirmation email to the user
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: data.email,
      subject: "Thank you for contacting WebXExpert",
      text: `Hi ${data.name},\n\nThank you for reaching out to WebXExpert! We've received your message and will get back to you within 24 hours.\n\nIn the meantime, feel free to browse our work at ${process.env.NEXT_PUBLIC_SITE_URL || "https://webxexpert.com"}/work\n\nBest regards,\nThe WebXExpert Team`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
                  <tr>
                    <td style="background: linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%); padding: 30px; text-align: center;">
                      <h1 style="color: #fff; margin: 0; font-size: 24px;">Thank You!</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px;">
                      <p style="color: #fff; font-size: 18px; margin: 0 0 16px 0;">Hi ${data.name},</p>
                      <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                        Thank you for reaching out to WebXExpert! We've received your message and will get back to you within 24 hours.
                      </p>
                      <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                        In the meantime, feel free to browse our portfolio to see what we've built for other clients.
                      </p>
                      <div style="text-align: center;">
                        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://webxexpert.com"}/work"
                           style="display: inline-block; background: linear-gradient(135deg, #00D4FF 0%, #00B4D8 100%); color: #000; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 600;">
                          View Our Work
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #0a0a0a; padding: 24px; text-align: center; border-top: 1px solid #222;">
                      <p style="color: #666; font-size: 12px; margin: 0;">
                        Best regards,<br>
                        <strong style="color: #888;">The WebXExpert Team</strong>
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

    console.log("Email sent successfully to:", toEmail);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
