import { NextRequest, NextResponse } from "next/server";

// Contact form submission handler
// Works with Vercel serverless functions

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

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

    // Option 1: Send email via Resend (recommended for Vercel)
    // Uncomment and add RESEND_API_KEY to your .env
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'WebXExpert <noreply@webxexpert.com>',
      to: ['hello@webxexpert.com'],
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
        <p><strong>Service:</strong> ${data.service || 'Not provided'}</p>
        <p><strong>Budget:</strong> ${data.budget || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });
    */

    // Option 2: Send to webhook (e.g., Zapier, Make, n8n)
    // Uncomment and add WEBHOOK_URL to your .env
    /*
    if (process.env.WEBHOOK_URL) {
      await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ...data,
        }),
      });
    }
    */

    // Option 3: Store in database
    // Add your database logic here (e.g., Prisma, Supabase)

    // For now, log the submission (visible in Vercel logs)
    console.log("Contact form submission:", {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      company: data.company,
      service: data.service,
      budget: data.budget,
      messageLength: data.message.length,
    });

    // Return success
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
