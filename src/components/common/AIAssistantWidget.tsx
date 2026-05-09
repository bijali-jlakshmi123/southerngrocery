"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Mic, Image as ImageIcon, Sparkles, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string; // base64
  products?: any[];
}

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI Shopping Assistant. You can type, use voice, or upload an image to find products!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string, imageBase64?: string) => {
    if (!text.trim() && !imageBase64) return;
    
    const userMsg: Message = { role: "user", content: text, image: imageBase64 };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, imageBase64 })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to process request");

      setMessages((prev) => [...prev, {
        role: "assistant",
        content: data.message,
        products: data.products
      }]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting to my brain. Please try again later!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        handleSend("Find products like this image.", base64);
      };
      reader.readAsDataURL(file);
    }
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-GB";

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      toast.error("Failed to recognize speech. Please try again.");
    };
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-[60] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <Sparkles className="w-5 h-5 text-yellow-200" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Southern Spices</h3>
                  <p className="text-xs text-orange-100">AI Shopping Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1.5 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[15px] shadow-sm ${msg.role === "user" ? "bg-primary text-white rounded-br-sm" : "bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-bl-sm text-zinc-800 dark:text-zinc-200"}`}>
                    {msg.image && (
                      <div className="relative w-[200px] aspect-square rounded-lg mb-2 overflow-hidden bg-zinc-100 border border-zinc-200">
                        <img src={msg.image} alt="Upload" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  
                  {/* Product Recommendations */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="w-full mt-3 grid gap-3">
                      {msg.products.map(product => {
                        const price = product.price || product.regular_price || "0.00";
                        const imageUrl = (product.images?.[0]?.src && product.images[0].src !== "image") ? product.images[0].src : "/placeholder.png";
                        
                        return (
                          <div key={product.id} className="flex gap-3 bg-white dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-700/50 p-2.5 rounded-xl shadow-sm hover:border-primary/30 transition group">
                            <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden shrink-0 relative">
                              <Image src={imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition duration-300" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center py-0.5 min-w-0">
                              <Link href={`/product/${product.slug}`} onClick={() => setIsOpen(false)} className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-2 hover:text-primary transition">
                                {product.name}
                              </Link>
                              
                              {/* Rating Mockup */}
                              <div className="flex items-center gap-1 mt-1">
                                <div className="flex text-yellow-400 text-[10px]">
                                  {"★★★★☆".split("").map((star, i) => (
                                    <span key={i}>{star}</span>
                                  ))}
                                </div>
                                <span className="text-[10px] text-zinc-500">(12)</span>
                              </div>

                              <div className="flex items-center justify-between mt-1.5">
                                <span className="font-bold text-primary">£{price}</span>
                                <button
                                  onClick={() => {
                                    addItem(product);
                                    toast.success(`${product.name} added to cart`);
                                  }}
                                  className="bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 shadow-sm"
                                >
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center shadow-sm">
                    <span className="w-2 h-2 bg-zinc-300 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-zinc-300 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-zinc-300 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl p-1.5 border border-transparent focus-within:border-primary/20 focus-within:bg-white dark:focus-within:bg-zinc-900 transition-all shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Ask for recommendations..."
                  className="flex-1 bg-transparent border-none outline-none text-[15px] px-3 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
                  disabled={isLoading}
                />
                
                {/* Image Upload */}
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleImageUpload} 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-zinc-400 hover:text-primary hover:bg-primary/10 rounded-xl transition"
                  title="Upload Image to Search"
                  disabled={isLoading}
                >
                  <ImageIcon className="w-4.5 h-4.5" />
                </button>

                {/* Voice Input */}
                <button 
                  onClick={toggleListening}
                  className={`p-2 rounded-xl transition ${isListening ? 'text-red-500 bg-red-100 dark:bg-red-500/20' : 'text-zinc-400 hover:text-primary hover:bg-primary/10'}`}
                  title="Voice Search"
                  disabled={isLoading}
                >
                  {isListening ? (
                     <span className="relative flex h-4.5 w-4.5 items-center justify-center">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                       <Mic className="relative w-4.5 h-4.5" />
                     </span>
                  ) : (
                    <Mic className="w-4.5 h-4.5" />
                  )}
                </button>

                {/* Send Text */}
                <button 
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-primary text-white rounded-xl disabled:opacity-50 disabled:bg-zinc-300 disabled:text-zinc-500 transition shadow-sm ml-1"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 sm:right-6 sm:bottom-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all duration-300 z-50 flex items-center justify-center transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : (
          <div className="relative">
             <Bot className="w-6 h-6" />
             <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
        )}
      </button>
    </>
  );
}
