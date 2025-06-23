import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { Send, Mic, X } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  // Ref for auto-scrolling the chat messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Define your API endpoint here
  // IMPORTANT: Change this to your actual backend URL when deployed!
  const API_ENDPOINT = "http://localhost:5000/api/chat"; // Example: Adjust port/domain as needed

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to send message to the actual AI backend
  const sendMessageToAI = async (messageText: string) => {
    if (!messageText.trim()) return; // Prevent sending empty messages

    setIsLoading(true); // Show typing indicator
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any authorization headers if your API requires them (e.g., Bearer Token)
          // 'Authorization': `Bearer YOUR_API_KEY`,
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown server error" }));
        throw new Error(
          `Server error: ${response.status} - ${
            errorData.message || "Something went wrong"
          }`
        );
      }

      const data = await response.json();
      const aiResponseText = data.response; // Assuming the AI response is in data.response

      const aiMessage: Message = {
        id: new Date().getTime(), // Use a more unique ID, like timestamp
        text: aiResponseText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message to AI:", error);
      const errorMessage: Message = {
        id: new Date().getTime(),
        text: "Oops! I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Hide typing indicator
    }
  };

  const handleSendMessage = async () => {
    // Make this async
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: new Date().getTime(), // Using timestamp for unique ID
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]); // Add user message instantly
    const currentInputToSend = inputValue; // Capture current value before clearing
    setInputValue(""); // Clear input field immediately

    // Send the captured user message to the AI
    await sendMessageToAI(currentInputToSend);
  };

  // Effect to listen for custom "openChat" event
  useEffect(() => {
    const handleOpenChat = (event: CustomEvent) => {
      setIsOpen(true);
      if (event.detail?.message) {
        // Automatically send the message received from CustomEvent to AI
        setInputValue(""); // Clear any existing input value before sending new one
        sendMessageToAI(event.detail.message);
      }
    };

    window.addEventListener("openChat", handleOpenChat as EventListener);
    return () =>
      window.removeEventListener("openChat", handleOpenChat as EventListener);
  }, []); // Run once on mount

  // Effect to scroll to bottom whenever messages change or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]); // Scroll when messages update or loading state changes

  if (isInline) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center space-x-8 bg-transparent backdrop-blur-sm rounded-full p-3 border border-white/80 shadow-lg">
          <Mic className="h-5 w-5 text-white ml-2" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about Oromia tours..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-transparent text-white placeholder-white placeholder:text-white border-none focus:outline-none focus:ring-0"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-green-600 hover:bg-green-700 rounded-full px-4"
            disabled={isLoading} // Disable send button while loading
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
          className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-2xl animate-pulse" // Reverted to original color
        >
          <Mic className="h-6 w-6 text-white" />
        </Button>
      )}

      {isOpen && (
        <Card
          className="fixed bottom-6 right-6 z-50 flex flex-col shadow-2xl bg-white border-2 border-red-200 /* Reverted to original color */
          w-[calc(100vw-3rem)] h-[calc(100vh-3rem)] /* Mobile: Responsive width and height, leaving 1.5rem margin on all sides */
          max-w-md max-h-[500px]                  /* Limit max size on mobile/small tablets to feel like a floating box */
          md:w-96 md:h-[500px]                     /* Desktop: Revert to original fixed size */
          rounded-lg"
        >
          <div className="flex items-center justify-between p-4 border-b bg-red-600 text-white rounded-t-lg">
            {" "}
            {/* Reverted to original color */}
            <div>
              <h3 className="font-bold">Oromia AI Assistant</h3>
              <p className="text-xs text-red-100">
                Your expert travel guide
              </p>{" "}
              {/* Reverted to original color */}
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-700 rounded-full" // Reverted to original color
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
                  className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${
                    message.isUser
                      ? "bg-red-600 text-white rounded-br-none" // Reverted to original color
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg text-sm shadow-sm bg-gray-200 text-gray-800 border border-gray-200 rounded-bl-none">
                  <span className="animate-pulse">AI is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Element to scroll to */}
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about tours, destinations..."
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1 border-gray-300 focus:border-red-500 focus:ring-red-500" // Reverted to original color
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-green-600 hover:bg-green-700 px-4"
                disabled={isLoading || !inputValue.trim()}
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
