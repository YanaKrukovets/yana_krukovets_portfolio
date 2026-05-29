import React, { useState, useRef, useEffect } from "react";

const SUGGESTED_QUESTIONS = [
  "What are your skills?",
  "Tell me about your experience",
  "What projects have you built?",
  "Are you available for hire?",
];

let msgId = 0;
const newMsg = (role, text) => ({ id: ++msgId, role, text });

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    newMsg("model", "Hi! I'm Yana's AI assistant. Ask me anything about her skills, experience, or projects!"),
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;

    const userMessage = newMsg("user", userText);
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const history = updatedMessages.slice(1, -1).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      setMessages((prev) => [...prev, newMsg("model", data.reply || "Sorry, I couldn't get a response.")]);
    } catch (err) {
      const errText = err?.message?.includes("Too many requests")
        ? "Too many requests — please wait a moment."
        : "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, newMsg("model", errText)]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showSuggestions = messages.length === 1;

  return (
    <div className="chat-widget">
      {/* Toggle button */}
      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat with Yana's AI assistant"}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label="Chat with Yana's AI assistant">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar" aria-hidden="true">Y</div>
              <div>
                <p className="chat-header-name">Ask about Yana</p>
                <p className="chat-header-sub">AI Assistant • Usually replies instantly</p>
              </div>
            </div>
          </div>

          <div className="chat-messages" role="log" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message chat-message--${msg.role === "user" ? "user" : "bot"}`}>
                <p>{msg.text}</p>
              </div>
            ))}

            {showSuggestions && (
              <div className="chat-suggestions">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button key={q} className="chat-suggestion-btn" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="chat-message chat-message--bot">
                <div className="chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              aria-label="Type your message"
            />
            <button
              className="chat-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
