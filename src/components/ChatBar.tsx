import React, { useState, useEffect } from "react";
import { Send, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBarProps {
  isInline?: boolean;
}

const ChatBar: React.FC<ChatBarProps> = ({ isInline = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Oromia travel assistant. I can help you explore destinations, tour packages, and booking!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handleOpenChat = (event: CustomEvent) => {
      setIsOpen(true);
      if (event.detail?.message) {
        setInputValue(event.detail.message);
      }
    };

    window.addEventListener("openChat", handleOpenChat as EventListener);
    return () =>
      window.removeEventListener("openChat", handleOpenChat as EventListener);
  }, []);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("bale") || lowerMessage.includes("mountain")) {
      return "🏔️ Bale Mountains National Park is Ethiopia's premier highland destination! Our 5-day adventure package ($899) includes guided wildlife tracking. Would you like to book?";
    }
    if (lowerMessage.includes("wenchi") || lowerMessage.includes("crater")) {
      return "🌊 Wenchi Crater Lake is a stunning volcanic caldera! Our 3-day escape package ($599) includes boat rides and hot springs. Ready to book?";
    }
    if (lowerMessage.includes("book") || lowerMessage.includes("reserve")) {
      return "📅 Great! To book your Oromia adventure, I need your preferred dates and number of travelers. What dates work for you?";
    }

    return "🌍 Welcome to Oromia! I can help you discover amazing destinations and book tour packages. What interests you most?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: simulateAIResponse(currentInput),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  if (isInline) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center space-x-2 bg-transparent backdrop-blur-sm rounded-full p-3 border border-white/30 shadow-lg">
          <MessageCircle className="h-5 w-5 text-white ml-2" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me about Oromia tours..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-transparent text-white placeholder-white placeholder:text-white border-none focus:outline-none focus:ring-0"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-green-600 hover:bg-green-700 rounded-full px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-2xl animate-pulse"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] flex flex-col shadow-2xl bg-white border-2 border-red-200">
          <div className="flex items-center justify-between p-4 border-b bg-red-600 text-white rounded-t-lg">
            <div>
              <h3 className="font-bold">Oromia AI Assistant</h3>
              <p className="text-xs text-red-100">Your expert travel guide</p>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-700 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm shadow-sm ${
                    message.isUser
                      ? "bg-red-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about tours, destinations..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-white"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-green-600 hover:bg-green-700 px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBar;
