import React, { useState, useRef, useEffect } from "react";

// Shown only on the first open (when there's just the welcome message) —
// gives users conversation starters without having to think of a question
const SUGGESTED_QUESTIONS = [
  "What are your skills?",
  "Tell me about your experience",
  "What projects have you built?",
  "Are you available for hire?",
];

// Floating AI chat assistant — rendered only on the homepage (controlled in _app.js).
// Sends messages to /api/chat which proxies to Google Gemini with a Yana-specific system prompt.
const ChatWidget = () => {
  // Monotonically incrementing ref used to generate stable message IDs without triggering re-renders
  const msgId = useRef(0);
  const newMsg = (role, text) => ({ id: ++msgId.current, role, text });

  // Whether the chat panel is visible
  const [isOpen, setIsOpen] = useState(false);

  // Full message history including the initial greeting — persists across open/close cycles
  const [messages, setMessages] = useState(() => [
    { id: ++msgId.current, role: "model", text: "Hi! I'm Yana's AI assistant. Ask me anything about her skills, experience, or projects!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Used to auto-scroll the message list to the latest message
  const messagesEndRef = useRef(null);

  // Used to auto-focus the text input when the panel opens
  const inputRef = useRef(null);

  // Scroll to the bottom whenever a new message arrives or the panel opens
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus the input field as soon as the chat panel opens — improves keyboard UX
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
      // Slice off the initial greeting (index 0) and the message just sent (last item)
      // before building the history payload — the API doesn't need those two
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
      // Surface a user-friendly message for the rate-limit error specifically,
      // since it's a common and recoverable case
      const errText = err?.message?.includes("Too many requests")
        ? "Too many requests — please wait a moment."
        : "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, newMsg("model", errText)]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter submits (like most chat UIs); Shift+Enter allows a newline inside the input
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Show suggested questions only when there's just the welcome message —
  // once the user has sent anything, the suggestions would just clutter the thread
  const showSuggestions = messages.length === 1;

  return (
    <div className="chat-widget">
      {/* Toggle button — floats in the bottom-right corner; icon swaps between chat bubble and X */}
      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat with Yana's AI assistant"}
      >
        {isOpen ? (
          // X icon when open
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          // Chat bubble icon when closed
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Chat panel — conditionally rendered so it unmounts on close, clearing focus state */}
      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label="Chat with Yana's AI assistant">
          <div className="chat-header">
            <div className="chat-header-info">
              {/* Avatar initial — decorative, no semantic meaning */}
              <div className="chat-avatar" aria-hidden="true">Y</div>
              <div>
                <p className="chat-header-name">Ask about Yana</p>
                <p className="chat-header-sub">AI Assistant • Usually replies instantly</p>
              </div>
            </div>
          </div>

          {/* role="log" + aria-live="polite" — screen readers announce new messages without interrupting */}
          <div className="chat-messages" role="log" aria-live="polite">
            {messages.map((msg) => (
              // User messages are right-aligned (--user), bot messages left-aligned (--bot)
              <div key={msg.id} className={`chat-message chat-message--${msg.role === "user" ? "user" : "bot"}`}>
                <p>{msg.text}</p>
              </div>
            ))}

            {/* Suggested questions — only visible before the first user message */}
            {showSuggestions && (
              <div className="chat-suggestions">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button key={q} className="chat-suggestion-btn" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator — three animated dots while waiting for the API response */}
            {isLoading && (
              <div className="chat-message chat-message--bot">
                <div className="chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {/* Invisible anchor — scrollIntoView() on this element keeps the view pinned to the bottom */}
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
            {/* Disabled when input is empty or a request is in flight to prevent empty/duplicate sends */}
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
