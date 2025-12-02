import { useEffect, useRef, useState } from "react";

export const useMessages = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = (message: string) => {
    if (message.trim() === "") return;
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return { messages, handleSend, messagesEndRef };
};
