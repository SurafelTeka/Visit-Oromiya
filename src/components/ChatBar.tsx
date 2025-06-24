import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Mic,
  X,
  User,
  Bot,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  viaVoice?: boolean;
}

interface ChatBarProps {
  isInline?: boolean;
}

const formatMessage = (text: string) => {
  const withBold = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
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

  // Voice states
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceModeEnabled, setVoiceModeEnabled] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [scrollTrigger, setScrollTrigger] = useState<{
    type: "open" | "new_ai_reply" | "default_bottom";
    id?: string;
  } | null>(null);

  // Voice recording refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const GROQ_API_KEY =
    "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";

  // Cleanup function for voice recording
  const cleanupRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      cleanupRecording();
      if (isSpeaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop speech when chat is closed
  useEffect(() => {
    if (!isOpen && isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isOpen, isSpeaking]);

  const startRecording = async () => {
    try {
      cleanupRecording();
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        processAudio();
      };

      mediaRecorder.start(100);
      setIsRecording(true);

      timeoutRef.current = setTimeout(() => {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === "recording"
        ) {
          stopRecording();
        }
      }, 10000);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    setIsRecording(false);
    setIsProcessingVoice(true);
  };

  const processAudio = async () => {
    if (audioChunksRef.current.length === 0) {
      setIsProcessingVoice(false);
      return;
    }

    try {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm;codecs=opus",
      });

      if (audioBlob.size < 1000) {
        setIsProcessingVoice(false);
        return;
      }

      const transcription = await transcribeAudio(audioBlob);
      if (!transcription || transcription.trim().length === 0) {
        setIsProcessingVoice(false);
        return;
      }

      // Open the chat dialogue if it's not open
      if (!isOpen) {
        setIsOpen(true);
        setScrollTrigger({ type: "open" });
      }

      // Enable voice mode for voice-initiated messages
      setVoiceModeEnabled(true);

      // Send the transcribed message as a voice-initiated message
      await sendMessage(transcription, true);
    } catch (error) {
      console.error("Error processing audio:", error);
    } finally {
      setIsProcessingVoice(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.webm");
      formData.append("model", "whisper-large-v3");
      formData.append("response_format", "text");

      const response = await fetch(
        "https://api.groq.com/openai/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Transcription error:", errorText);
        throw new Error(`Transcription failed: ${response.status}`);
      }

      const result = await response.text();
      return result.trim();
    } catch (error) {
      console.error("Transcription error:", error);
      throw error;
    }
  };

  const speakText = async (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if ("speechSynthesis" in window) {
        setIsSpeaking(true);

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 0.8;
        utterance.volume = 0.8;

        // Wait for voices to be loaded
        const voices = speechSynthesis.getVoices();
        let maleVoice = voices.find(
          (voice) =>
            voice.name.toLowerCase().includes("male") ||
            voice.name.toLowerCase().includes("david") ||
            voice.name.toLowerCase().includes("mark")
        );

        // If voices not loaded yet, wait for voiceschanged event
        if (voices.length === 0) {
          const voicesChangedHandler = () => {
            const newVoices = speechSynthesis.getVoices();
            maleVoice = newVoices.find(
              (voice) =>
                voice.name.toLowerCase().includes("male") ||
                voice.name.toLowerCase().includes("david") ||
                voice.name.toLowerCase().includes("mark")
            );
            if (maleVoice) utterance.voice = maleVoice;
            speechSynthesis.speak(utterance);
            speechSynthesis.removeEventListener(
              "voiceschanged",
              voicesChangedHandler
            );
          };

          speechSynthesis.addEventListener(
            "voiceschanged",
            voicesChangedHandler
          );
        } else {
          if (maleVoice) {
            utterance.voice = maleVoice;
          }
          speechSynthesis.speak(utterance);
        }

        utterance.onend = () => {
          setIsSpeaking(false);
          resolve();
        };

        utterance.onerror = () => {
          setIsSpeaking(false);
          resolve();
        };
      } else {
        resolve();
      }
    });
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else if (!isProcessingVoice && !isSpeaking) {
      startRecording();
    }
  };

  const toggleVoiceMode = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setVoiceModeEnabled(!voiceModeEnabled);
  };

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

  const sendMessage = async (messageText?: string, viaVoice = false) => {
    const textToSend = messageText || inputValue;

    if (!textToSend.trim()) return;

    // For text messages, disable voice mode
    if (!viaVoice) {
      setVoiceModeEnabled(false);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
      viaVoice,
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

      // Speak the response only if voice mode is enabled and this was a voice-initiated message
      if (voiceModeEnabled && viaVoice) {
        await speakText(aiResponseText);
      }
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

  // Create ref for sendMessage to avoid closure issues
  const sendMessageRef = useRef<
    (message?: string, viaVoice?: boolean) => Promise<void>
  >(async () => {});

  // Update sendMessage ref on change
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  // Setup event listener for openChat
  useEffect(() => {
    const handleOpenChat = (event: CustomEvent) => {
      setIsOpen(true);
      if (event.detail?.message) {
        setInputValue("");
        sendMessageRef.current(
          event.detail.message,
          event.detail.viaVoice || false
        );
      } else {
        setScrollTrigger({ type: "open" });
      }
    };

    window.addEventListener("openChat", handleOpenChat as EventListener);
    return () => {
      window.removeEventListener("openChat", handleOpenChat as EventListener);
    };
  }, []);

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
          <Button
            onClick={handleMicClick}
            disabled={isProcessingVoice || isSpeaking}
            size="icon"
            variant={isRecording ? "destructive" : "ghost"}
            className={`rounded-full ${isRecording ? "animate-pulse" : ""}`}
          >
            {isRecording ? (
              <MicOff className="h-5 w-5 text-white" />
            ) : (
              <Mic className="h-5 w-5 text-white" />
            )}
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me about Oromia Tours..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent("openChat", {
                    detail: {
                      message: inputValue,
                      viaVoice: false,
                    },
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
                  detail: {
                    message: inputValue,
                    viaVoice: false,
                  },
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
            <div className="flex gap-2">
              <Button
                onClick={toggleVoiceMode}
                variant={voiceModeEnabled ? "default" : "outline"}
                size="sm"
                className={
                  voiceModeEnabled
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }
              >
                {voiceModeEnabled ? (
                  <Volume2 className="h-4 w-4 mr-1" />
                ) : (
                  <VolumeX className="h-4 w-4 mr-1" />
                )}
                {voiceModeEnabled ? "Voice On" : "Voice Off"}
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-red-700 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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
                      className={`p-3 rounded-lg relative ${
                        message.role === "user"
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.viaVoice && (
                        <div className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full p-1">
                          <Mic className="h-3 w-3" />
                        </div>
                      )}
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
              <Button
                onClick={handleMicClick}
                disabled={isLoading || isProcessingVoice || isSpeaking}
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                className={isRecording ? "animate-pulse" : ""}
              >
                {isRecording ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
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
                disabled={isLoading || isRecording || isSpeaking}
              />
              <Button
                onClick={() => sendMessage()}
                size="sm"
                className="bg-green-600 hover:bg-green-700 px-4"
                disabled={
                  isLoading || !inputValue.trim() || isRecording || isSpeaking
                }
              >
                <Send className="h-4 w-4" />
              </Button>
              {isSpeaking && (
                <Button
                  onClick={() => speechSynthesis.cancel()}
                  variant="destructive"
                  size="icon"
                >
                  <VolumeX className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              {isRecording
                ? "Recording... Tap mic to stop"
                : isProcessingVoice
                ? "Processing your voice..."
                : isSpeaking
                ? "Speaking..."
                : voiceModeEnabled
                ? "Voice responses enabled"
                : "Voice responses disabled"}
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBar;
