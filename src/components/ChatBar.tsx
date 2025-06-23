import React, { useState, useEffect, useRef } from "react";
import { Send, Mic, X, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatBarProps {
  isInline?: boolean;
}

// Helper function to convert markdown bold to HTML bold
const formatMessage = (text: string) => {
  // Replace **text** with <strong>text</strong>
  const withBold = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace single asterisks with <strong> only if they wrap words (not standalone asterisks)
  const withSingleBold = withBold.replace(
    /(^|\s)\*([^*\n]+?)\*($|\s)/g,
    "$1<strong>$2</strong>$3"
  );

  return withSingleBold;
};

const ChatBar: React.FC<ChatBarProps> = ({ isInline = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-msg-1",
      role: "assistant",
      content:
        "Hello! I'm your Oromia travel assistant. I can help you explore destinations, tour packages, and booking!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [scrollTrigger, setScrollTrigger] = useState<{
    type: "open" | "new_ai_reply" | "default_bottom";
    id?: string;
  } | null>(null);

  // Create ref for sendMessage to avoid closure issues
  const sendMessageRef = useRef<(message?: string) => Promise<void>>(
    async () => {}
  );

  const GROQ_API_KEY =
    "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";

  const scrollToAbsoluteBottom = () => {
    const viewport = messagesContainerRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  };

  const scrollToAiReplyStart = () => {
    const viewport = messagesContainerRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (!viewport) return;

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== "assistant") {
      scrollToAbsoluteBottom();
      return;
    }

    const aiReplyElement = messageRefs.current[lastMessage.id];
    if (aiReplyElement) {
      let targetElement = aiReplyElement;

      const aiMessageIndex = messages.length - 1;
      if (aiMessageIndex > 0 && messages[aiMessageIndex - 1].role === "user") {
        const userMessageBefore = messages[aiMessageIndex - 1];
        const userMessageElement = messageRefs.current[userMessageBefore.id];

        if (userMessageElement) {
          targetElement = userMessageElement;
        }
      }

      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      scrollToAbsoluteBottom();
    }
  };

  const callGroqAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert Oromia travel assistant. You provide information about Oromia Region in Ethiopia, including destinations, tour packages, cultural sites, natural attractions, traditional products, and booking related queries for tourism within Oromia. You do NOT discuss any other topics - if asked about anything outside of Oromia region travel, politely redirect the conversation back to Oromia travel experiences. Be helpful, enthusiastic, and knowledgeable about Oromia.",
              },
              ...messages
                .slice(-5)
                .map((msg) => ({ role: msg.role, content: msg.content })),
              { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error:", response.status, errorData);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Invalid API response format");
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("Groq API Error:", error);
      throw error;
    }
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;

    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponseText = await callGroqAPI(textToSend);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setScrollTrigger({ type: "new_ai_reply", id: assistantMessage.id });
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I'm having trouble connecting right now. Please try asking about Oromia safari destinations again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setScrollTrigger({ type: "default_bottom" });
    } finally {
      setIsLoading(false);
    }
  };

  // Update sendMessage ref on change
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  // Setup event listener only for floating chat
  useEffect(() => {
    if (isInline) return;

    const handleOpenChat = (event: CustomEvent) => {
      setIsOpen(true);
      if (event.detail?.message) {
        setInputValue("");
        sendMessageRef.current(event.detail.message);
      } else {
        setScrollTrigger({ type: "open" });
      }
    };

    window.addEventListener("openChat", handleOpenChat as EventListener);
    return () => {
      window.removeEventListener("openChat", handleOpenChat as EventListener);
    };
  }, [isInline]);

  useEffect(() => {
    if (!scrollTrigger || !isOpen) return;

    const timer = setTimeout(() => {
      if (
        scrollTrigger.type === "open" ||
        scrollTrigger.type === "default_bottom"
      ) {
        scrollToAbsoluteBottom();
      } else if (scrollTrigger.type === "new_ai_reply" && scrollTrigger.id) {
        scrollToAiReplyStart();
      }
      setScrollTrigger(null);
    }, 100);

    return () => clearTimeout(timer);
  }, [scrollTrigger, isOpen, messages]);

  if (isInline) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center space-x-8 bg-transparent backdrop-blur-sm rounded-full p-4 border border-white/80 shadow-lg">
          <Mic className="h-5 w-5 text-white ml-2" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me about Oromia Tours..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent("openChat", {
                    detail: { message: inputValue },
                  })
                );
                setInputValue("");
              }
            }}
            className="flex-1 bg-transparent text-white placeholder-white placeholder:text-white
                       border-none focus:outline-none focus:ring-0
                       focus:shadow-none focus:border-transparent
                       text-md placeholder:text-md"
          />
          <Button
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("openChat", {
                  detail: { message: inputValue },
                })
              );
              setInputValue("");
            }}
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
          onClick={() => {
            setIsOpen(true);
            setScrollTrigger({ type: "open" });
          }}
          className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-2xl animate-pulse"
        >
          <Mic className="h-6 w-6 text-white" />
        </Button>
      )}

      {isOpen && (
        <Card
          className="fixed bottom-6 right-6 z-50 flex flex-col shadow-2xl bg-white border-2 border-red-200
          w-[calc(100vw-3rem)] h-[calc(100vh-3rem)]
          max-w-md max-h-[500px]
          md:w-96 md:h-[500px]
          rounded-lg"
        >
          <div className="flex items-center justify-between p-4 border-b bg-red-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <h3 className="font-bold">Oromia AI Assistant</h3>
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

          <ScrollArea className="flex-1 p-4" ref={messagesContainerRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  ref={(el) => {
                    messageRefs.current[message.id] = el;
                  }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === "user" ? "bg-red-600" : "bg-gray-200"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(message.content),
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Oromia tours, destinations..."
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="flex-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
                disabled={isLoading}
              />
              <Button
                onClick={() => sendMessage()}
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
