import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

export default function ChatBot() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const scrollRef = useRef(null);

    const suggestions = [
        "How do I create a new study?",
        "What is the status of document compliance?",
        "Tell me about WeCASOR's security.",
        "How can I manage user institutions?"
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSend = async (msg = message) => {
        if (!msg.trim()) return;

        const newHistory = [...chatHistory, { role: 'user', content: msg }];
        setChatHistory(newHistory);
        setMessage('');
        setIsLoading(true);
        setShowSuggestions(false);

        try {
            const response = await axios.post(route('admin.chat'), {
                message: msg,
                history: chatHistory
            });

            setChatHistory([...newHistory, { role: 'assistant', content: response.data.reply }]);
        } catch (error) {
            setChatHistory([...newHistory, { 
                role: 'assistant', 
                content: error.response?.data?.error || "I'm having trouble connecting right now. Please check my settings." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-6 w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-[#002d5b] p-6 text-white flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-white/20 overflow-hidden">
                                <img src="/images/chatbot-icon.png" alt="AI Icon" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-black text-sm uppercase tracking-widest">WeCASOR AI</h3>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                        <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm max-w-[85%]">
                            <p className="text-[11px] font-black text-[#002d5b] uppercase tracking-widest mb-2 italic">WeCASOR AI</p>
                            <p className="text-sm text-slate-700 font-medium leading-relaxed">
                                Hello {auth?.user?.name?.split(' ')[0] || 'there'}! I'm your WeCASOR Intelligence Assistant. How can I facilitate your research management today?
                            </p>
                        </div>

                        {chatHistory.map((chat, idx) => (
                            <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-5 rounded-2xl max-w-[85%] shadow-sm ${
                                    chat.role === 'user' 
                                    ? 'bg-[#002d5b] text-white rounded-tr-none' 
                                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                }`}>
                                    {chat.role === 'assistant' && <p className="text-[10px] font-black text-[#002d5b] uppercase tracking-widest mb-2 italic">WeCASOR AI</p>}
                                    <p className="text-sm font-medium leading-relaxed">{chat.content}</p>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                </div>
                            </div>
                        )}

                        {showSuggestions && !chatHistory.length && (
                            <div className="grid grid-cols-1 gap-3 pt-4">
                                {suggestions.map((s, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handleSend(s)}
                                        className="text-left p-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-bold text-slate-600 hover:border-[#002d5b] hover:text-[#002d5b] transition-all group"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-2">→</span>
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-slate-100">
                        <div className="relative group">
                            <input 
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSend()}
                                placeholder="Consult WeCASOR AI..."
                                className="w-full pl-6 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#002d5b] transition-all"
                            />
                            <button 
                                onClick={() => handleSend()}
                                disabled={isLoading || !message.trim()}
                                className="absolute right-2 top-2 bottom-2 px-4 bg-[#002d5b] text-white rounded-xl hover:bg-[#00346a] transition-all disabled:opacity-30"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 ${
                    isOpen ? 'bg-[#ff3b30] rotate-45 shadow-red-500/20' : 'bg-transparent'
                }`}
            >
                <div className="relative w-20 h-20">
                    <img 
                        src="/images/chatbot-icon.png" 
                        alt="AI" 
                        className={`w-full h-full object-cover transition-all duration-500 rounded-full ${isOpen ? 'scale-0' : 'scale-100'}`}
                    />
                    <svg className={`w-8 h-8 text-white absolute inset-0 m-auto transition-all duration-500 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
            </button>
        </div>
    );
}
