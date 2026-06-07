import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are the WebXExpert AI assistant — a helpful, knowledgeable, and friendly assistant for WebXExpert, a premium web design and development agency.

About WebXExpert:
- We build award-worthy websites, CRMs, and custom software solutions
- Services: Web Design, Web Development, Custom Software Development, CRM Development, API Integrations, Consulting
- We specialize in high-performance Next.js / React apps, GSAP animations, Three.js / WebGL experiences, and full-stack solutions
- Contact: hello@webxexpert.com | Phone: +91 8789389941
- Website: https://webxexpert.com

Your role:
- Answer questions about our services, process, pricing guidance, and timelines
- Help visitors understand what we can build for them
- Encourage them to reach out via the contact form or email for detailed quotes
- Be concise, professional, and friendly — keep responses short (2-4 sentences max unless more detail is needed)
- Do NOT make up specific pricing figures; instead say "Pricing depends on scope — contact us for a free quote"
- If asked anything outside your scope (unrelated to web development / WebXExpert), politely redirect

Typical project timelines:
- Marketing website: 4–6 weeks
- Complex web app / CRM: 3–6 months
- API integrations: 1–4 weeks

Always end with a soft CTA when appropriate, e.g. "Feel free to reach out at hello@webxexpert.com!"`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Chat service not configured" },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build history (all but last message)
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to get response. Please try again." },
      { status: 500 }
    );
  }
}
