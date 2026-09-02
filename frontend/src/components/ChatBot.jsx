import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  MessageCircle,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";

const initialMessage = {
  role: "assistant",
  content:
    "Hi! I'm Gulzar's portfolio assistant. Ask me about his skills, projects, education, or experience.",
};

const suggestedQuestions = [
  "What are Gulzar's skills?",
  "Tell me about his projects",
  "Is Gulzar available for internships?",
];
const API = import.meta.env.VITE_API || "http://localhost:2000"

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (question = input) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) return;

    const userMessage = {
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const history = messages
        .filter((message) => message !== initialMessage)
        .slice(-6)
        .map(({ role, content }) => ({
          role,
          content,
        }));

      const response = await fetch(
        `${API}/api/v1/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: trimmedQuestion,
            history,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to get a response"
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't answer that right now. Please try again.",
          isError: true,
        },
      ]);

      console.error("Chatbot error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <section className="fixed bottom-34 right-40 z-50 flex h-[600px] max-h-[calc(100vh-120px)] w-[calc(100vw-32px)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-violet-950/40 sm:right-6">
          {/* Header */}
          <header className="flex items-center justify-between bg-gradient-to-r from-violet-700 to-indigo-600 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative grid h-11 w-11 place-items-center rounded-2xl bg-white/15">
                <Bot size={24} />

                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-indigo-600 bg-emerald-400" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-semibold">
                    Ask to Gulzar
                  </h2>

                  <Sparkles
                    size={15}
                    className="text-yellow-300"
                  />
                </div>

                <p className="text-xs text-indigo-100">
                  AI Portfolio Assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-2 transition hover:bg-white/15"
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </header>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-950 p-4">
            {messages.map((message, index) => {
              const isAssistant =
                message.role === "assistant";

              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex items-end gap-2 ${
                    isAssistant
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {isAssistant && (
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-600 text-white">
                      <Bot size={17} />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      isAssistant
                        ? message.isError
                          ? "rounded-bl-md border border-red-500/30 bg-red-500/10 text-red-200"
                          : "rounded-bl-md bg-slate-800 text-slate-100"
                        : "rounded-br-md bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                    }`}
                  >
                    {message.content}
                  </div>

                  {!isAssistant && (
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-700 text-slate-200">
                      <User size={16} />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Suggested questions */}
            {messages.length === 1 && (
              <div className="space-y-2 pl-10">
                <p className="text-xs text-slate-500">
                  Suggested questions
                </p>

                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    className="block w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-left text-xs text-slate-300 transition hover:border-violet-500 hover:text-white"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Typing animation */}
            {loading && (
              <div className="flex items-end gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-violet-600 text-white">
                  <Bot size={17} />
                </div>

                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-slate-800 px-4 py-4">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{
                        animationDelay: `${dot * 150}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-800 bg-slate-900 p-3"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-slate-700 bg-slate-950 p-2 focus-within:border-violet-500">
              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask something about Gulzar..."
                rows={1}
                maxLength={500}
                disabled={loading}
                className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed"
              />

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-slate-600">
              AI may make mistakes. Verify important details.
            </p>
          </form>
        </section>
      )}

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="fixed bottom-20 right-30 z-50 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-900/40 transition hover:scale-105 sm:right-6"
        aria-label={
          isOpen ? "Close chatbot" : "Open chatbot"
        }
      >
        {isOpen ? (
          <X size={25} />
        ) : (
          <MessageCircle size={26} />
        )}
      </button>
    </>
  );
}