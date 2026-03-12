import React, { useState, useRef, useEffect } from 'react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am the Prescripto AI assistant. Describe your symptoms, and I can recommend a specialist for you.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing delay (Replace this with your actual Backend API call later)
    setTimeout(() => {
      let aiResponse = "I'm a simple demo AI right now! But in the future, I will analyze your symptoms and suggest the perfect doctor.";
      
      // Simple keyword matching for the demo
      const lowerInput = userText.toLowerCase();
      if (lowerInput.includes('headache') || lowerInput.includes('brain')) {
        aiResponse = "It sounds like you might want to consult a Neurologist. Would you like to see our available Neurologists?";
      } else if (lowerInput.includes('skin') || lowerInput.includes('rash') || lowerInput.includes('acne')) {
        aiResponse = "Skin-related issues are best handled by a Dermatologist. Let me know if you want to book one!";
      } else if (lowerInput.includes('stomach') || lowerInput.includes('digestion')) {
        aiResponse = "For stomach and digestion issues, I highly recommend checking our Gastroenterologist specialists.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* --- Floating Action Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 z-50 ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
        </svg>
      </button>

      {/* --- Chat Window --- */}
      <div 
        className={`fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 z-50 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: 'calc(100vh - 8rem)' }}
      >
        {/* Header */}
        <div className="bg-primary text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-xl shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.193c1.036 0 1.875.84 1.875 1.875v.75a1.875 1.875 0 01-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-3.75 0h-1.5A1.875 1.875 0 009.375 3zM3 15.375c0-1.036.84-1.875 1.875-1.875h14.25c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875H4.875a1.875 1.875 0 01-1.875-1.875v-3.75z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium leading-tight">Prescripto AI</h3>
              <p className="text-xs text-blue-100">Online</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-blue-600 p-1 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 text-sm rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none shadow-md' : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center h-10 w-16">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
          <input 
            type="text" 
            placeholder="Describe your symptoms..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default AIChatbot;