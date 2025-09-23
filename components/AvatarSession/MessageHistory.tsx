import React, { useEffect, useRef } from "react";

import { useMessageHistory, MessageSender } from "../logic";

export const MessageHistory: React.FC = () => {
  const { messages } = useMessageHistory();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || messages.length === 0) return;

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <div className="w-full lg:w-auto lg:max-w-md">
      <div className="bg-white rounded-2xl shadow-edusofx-medium border border-edusofx overflow-hidden">
        <div className="bg-gradient-to-r from-[#003399] to-[#33AA77] px-6 py-4">
          <h3 className="text-white font-semibold text-lg">💬 Conversation</h3>
          <p className="text-white/80 text-sm">Chat with your learning buddy</p>
        </div>
        <div
          ref={containerRef}
          className="overflow-y-auto flex flex-col gap-3 px-6 py-4 max-h-[400px] min-h-[200px]"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="w-16 h-16 bg-[#EAEAEC] rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <p className="text-edusofx-dark font-medium">
                Start a conversation!
              </p>
              <p className="text-edusofx-dark/60 text-sm">
                Use voice or text chat to begin
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col gap-2 max-w-[280px] ${
                  message.sender === MessageSender.CLIENT
                    ? "self-end items-end"
                    : "self-start items-start"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      message.sender === MessageSender.AVATAR
                        ? "bg-[#33AA77] text-white"
                        : "bg-[#003399] text-white"
                    }`}
                  >
                    {message.sender === MessageSender.AVATAR ? "🤖" : "👤"}
                  </div>
                  <p className="text-xs text-edusofx-dark font-medium">
                    {message.sender === MessageSender.AVATAR
                      ? "Learning Buddy"
                      : "You"}
                  </p>
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === MessageSender.CLIENT
                      ? "bg-[#003399] text-white rounded-br-md"
                      : "bg-[#EAEAEC] text-edusofx-dark rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
