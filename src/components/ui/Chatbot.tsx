"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! 👋 I'm the WebXExpert assistant.\n\nI can help you with:\n• Our services & pricing\n• Project timelines\n• Getting a quote\n• Connecting you with Rajesh\n\nWhat can I help you with today?",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
      setHasUnread(false);
    }
  }, [isOpen, messages]);

  const sendMessage = async () => {
    // 1. Frontend validation
    const trimmed = input.trim();
    if (!trimmed || isLoading || trimmed.length > 500) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Slice frontend history just in case, though backend also truncates
        body: JSON.stringify({ messages: updatedMessages.slice(-20) }),
      });

      const data = await response.json();
      
      // 2. Handle HTTP 429 Rate Limiting Gracefully
      if (response.status === 429) {
        setMessages((prev) => [...prev, { 
          role: "assistant", 
          content: "You're sending messages too fast! Please wait a minute and try again." 
        }]);
        return;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || data.error || "Sorry, I couldn't process that. Please email hello@webxexpert.com.",
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      if (!isOpen) setHasUnread(true);
      
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again or email us at hello@webxexpert.com" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[9998] w-[360px] max-w-[calc(100vw-24px)] flex flex-col"
          style={{
            height: "480px",
            background: "#111",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,212,255,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                ✦
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0 }}>WebXExpert Assistant</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, margin: 0 }}>Ask about our services</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                cursor: "pointer",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              scrollbarWidth: "thin",
              scrollbarColor: "#333 transparent",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                  gap: 8,
                }}
              >
                {msg.role === "assistant" && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
                    ✦
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #00D4FF, #0099bb)"
                        : "rgba(255,255,255,0.06)",
                    color: msg.role === "user" ? "#000" : "#e5e5e5",
                    fontSize: 13,
                    lineHeight: 1.5,
                    border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  ✦
                </div>
                <div
                  style={{
                    padding: "10px 16px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#00D4FF",
                        animation: `bounce 1.2s ease-in-out ${dot * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              gap: 8,
              background: "#0d0d0d",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={500} // SECURE: Hard cap on input string length
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask about our services..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "10px 14px",
                color: "#fff",
                fontSize: 13,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim() || input.length > 500}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background:
                  isLoading || !input.trim()
                    ? "rgba(255,255,255,0.08)"
                    : "linear-gradient(135deg, #00D4FF, #0099bb)",
                border: "none",
                cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke={isLoading || !input.trim() ? "#555" : "#000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={isLoading || !input.trim() ? "#555" : "#000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: isOpen
            ? "rgba(255,255,255,0.1)"
            : "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isOpen
            ? "0 4px 20px rgba(0,0,0,0.4)"
            : "0 4px 24px rgba(0,212,255,0.4), 0 0 0 0 rgba(0,212,255,0.3)",
          transition: "all 0.3s ease",
          fontSize: 22,
          color: "#fff",
        }}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {hasUnread && !isOpen && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid #000",
            }}
          />
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
