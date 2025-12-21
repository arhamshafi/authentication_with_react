import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../Context";
import Markdown from "react-markdown";

export default function AiCOMP() {

    const bottomRef = useRef(null);
    const { messages, input, setInput, open, setopen, loading, sendMessage } = useContext(AppContext)
    const aibox = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (aibox.current && !aibox.current.contains(event.target)) {
                setopen(false)
            }

        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <>
            <div className={`w-15 h-15 overflow-hidden z-20 shadow-lg rounded-full fixed bottom-10 ${open ? "right-150 rotate-520 " : "right-10 rotate-x-0 "} cursor-pointer hover:scale-110 transition-all ease-in-out duration-300 `} onClick={() => setopen(prev => !prev)} > <img src="/ai.gif" className="w-full h-full" alt="" /> </div>
            <div ref={aibox} className={`w-130 h-150 rounded-2xl z-20 bg-white shadow-2xl flex flex-col transition-all ease-in-out duration-300 fixed bottom-10 overflow-hidden ${open ? "right-10 visible opacity-100 " : "-right-130 invisible opacity-0 "} `}>

                {/* Header */}
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <span className="text-2xl">💬</span>
                        AI Chat Assistant
                    </h1>
                    <p className="text-sm text-blue-100 mt-1">
                        Ask me anything - I'm here to help!
                    </p>
                </div>

                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                                } animate-fade-in`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${m.role === "user"
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                                    }`}
                            >
                                <Markdown
                                    components={{
                                        p: ({ node, ...props }) => (
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap" {...props} />
                                        ),
                                    }}
                                >
                                    {m.text || ""}
                                </Markdown>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="rounded-2xl rounded-bl-none bg-white border border-gray-200 px-5 py-3 shadow-sm">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="border-t bg-white text-black p-4 flex gap-3">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type your message here..."
                        disabled={loading}
                        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <span>Send</span>
                        <span className="text-lg">→</span>
                    </button>
                </div>
            </div>
        </>
    );
}