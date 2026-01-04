import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Sparkles, ChevronDown, User, Terminal } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import GlassCard from './GlassCard';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "System initialized. I am Aether. How can I assist your inquiry?", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const apiHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    try {
      const responseText = await sendMessageToGemini(userMsg.text, apiHistory);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Re-establishing link...", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <GlassCard className="mb-6 w-[90vw] sm:w-[400px] h-[550px] flex flex-col shadow-2xl shadow-black/50 animate-reveal border-white/10">
          {/* HUD Header */}
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="relative p-2 bg-white/5 rounded-full border border-white/5">
                  <Terminal className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-silver-500 border-2 border-black rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display tracking-widest">AETHER_CORE</h3>
                <p className="text-[10px] text-neutral-400 font-mono">STATUS: ONLINE</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-neutral-500 hover:text-white transition-colors bg-white/5 p-1.5 rounded-lg hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-silver-500"
              aria-label="Minimize Chat"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-6 bg-neutral-900/50"
            role="log" 
            aria-live="polite"
            tabIndex={0}
            aria-label="Chat history"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`
                   flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm
                   ${msg.role === 'user' ? 'bg-white text-black border-white' : 'bg-black text-silver-400 border-white/10'}
                `} aria-hidden="true">
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div 
                  className={`
                    max-w-[75%] p-3 rounded-lg text-sm leading-relaxed border font-mono shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-white border-white text-black rounded-tr-none' 
                      : 'bg-black/50 border-silver-500/30 text-neutral-300 rounded-tl-none'}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center">
                    <Bot size={14} className="text-silver-400" />
                </div>
                <div className="bg-black/50 border border-silver-500/30 p-4 rounded-lg rounded-tl-none flex gap-2 items-center shadow-sm">
                   <div className="w-1.5 h-1.5 bg-silver-500 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-silver-500 rounded-full animate-bounce delay-75"></div>
                   <div className="w-1.5 h-1.5 bg-silver-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-black/80 backdrop-blur-md">
            <div className="relative flex items-center gap-2">
              <input 
                ref={inputRef}
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Query database..."
                aria-label="Chat Input"
                className="flex-1 bg-white/5 border border-white/10 rounded-none py-3 pl-4 pr-4 text-sm text-white focus:outline-none focus:border-silver-500 focus:bg-black transition-all placeholder:text-neutral-500 font-mono"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send Message"
                className="p-3 bg-white text-black hover:bg-silver-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-silver-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] text-center text-neutral-500 mt-2 font-mono uppercase tracking-wider">
              Powered by Gemini // v2.5
            </div>
          </div>
        </GlassCard>
      )}

      {/* Futuristic Toggle Button - Dark Mode */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative focus-visible:outline-none"
        aria-label={isOpen ? "Close Chat Assistant" : "Open Chat Assistant"}
        aria-expanded={isOpen}
      >
        <div className={`
          absolute inset-0 bg-silver-500 rounded-full blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-500
          ${!isOpen ? 'animate-pulse-slow' : ''}
        `}></div>
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-black border border-white/10 shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden focus-visible:ring-2 focus-visible:ring-silver-500 focus-visible:ring-offset-4 focus-visible:ring-offset-black">
            {/* Inner Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-silver-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {isOpen ? (
                <X className="w-6 h-6 text-white z-10" />
            ) : (
                <Sparkles className="w-6 h-6 text-silver-400 z-10 animate-float" />
            )}
        </div>
      </button>
    </div>
  );
};

export default AIChat;