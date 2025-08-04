import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Hand } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [showPulse, setShowPulse] = useState(true);
  const [showHiMessage, setShowHiMessage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { currentTheme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Animation effect for the chat icon
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setShowPulse(prev => !prev);
    }, 3000); // Pulse every 3 seconds

    return () => clearInterval(pulseInterval);
  }, []);

  // Stop pulse when chat is opened
  useEffect(() => {
    if (isOpen) {
      setShowPulse(false);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Small delay to show thinking indicator before creating AI message
    await new Promise(resolve => setTimeout(resolve, 100));

    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1;
    const newAiMessage = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newAiMessage]);

    try {
      // Create request body
      const requestBody = {
        message: userMessage,
        sessionId: sessionId
      };

      // Use streaming endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'chunk') {
                // Update the AI message with the new chunk
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: msg.content + data.content }
                    : msg
                ));
              } else if (data.type === 'complete') {
                // Finalize the AI message
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: data.message }
                    : msg
                ));
              } else if (data.type === 'error') {
                // Handle error
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: data.message }
                    : msg
                ));
              }
            } catch (error) {
              console.error('Error parsing SSE data:', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: aiMessageId,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? errorMessage : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/chat/history/${sessionId}`, {
        method: 'DELETE',
      });
      setMessages([]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  const sendSuggestedMessage = async (question) => {
    setIsLoading(true);

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Small delay to show thinking indicator before creating AI message
    await new Promise(resolve => setTimeout(resolve, 100));

    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1;
    const newAiMessage = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newAiMessage]);

    try {
      // Create request body
      const requestBody = {
        message: question,
        sessionId: sessionId
      };

      // Use streaming endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'chunk') {
                // Update the AI message with the new chunk
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: msg.content + data.content }
                    : msg
                ));
              } else if (data.type === 'complete') {
                // Finalize the AI message
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: data.message }
                    : msg
                ));
              } else if (data.type === 'error') {
                // Handle error
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: data.message }
                    : msg
                ));
              }
            } catch (error) {
              console.error('Error parsing SSE data:', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: aiMessageId,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? errorMessage : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    sendSuggestedMessage(question);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }
      `}</style>
      
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => {
          setIsHovered(true);
          setShowHiMessage(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setTimeout(() => setShowHiMessage(false), 2000); // Keep message visible for 2 seconds
        }}
        className={`rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 relative ${
          showPulse && !isOpen && messages.length === 0 ? 'animate-pulse' : ''
        }`}
        style={{ 
          background: currentTheme.primary,
          color: 'white'
        }}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : (isHovered ? 
          <Bot 
            size={24} 
            style={{ 
              animation: 'wave 0.6s ease-in-out infinite',
              transformOrigin: 'center'
            }}
          /> : <Bot size={24} />)}
        
        {/* Pulse ring animation */}
        {showPulse && !isOpen && messages.length === 0 && (
          <div className="absolute inset-0 rounded-full animate-ping opacity-75" 
               style={{ background: currentTheme.primary }}></div>
        )}
      </button>

      {/* Hi Message Tooltip */}
      {showHiMessage && !isOpen && messages.length === 0 && (
        <div 
          className="absolute bottom-16 right-0 mb-2 p-3 rounded-lg shadow-lg border transition-all duration-300"
          style={{
            background: currentTheme.cardBackground,
            borderColor: currentTheme.primary + '30',
            backdropFilter: 'blur(10px)',
            minWidth: '200px',
            animation: 'fadeIn 0.3s ease-in-out forwards'
          }}
        >
          <div className="flex items-center space-x-2">
            <Bot 
              size={16} 
              style={{ 
                color: currentTheme.primary,
                animation: 'wave 0.6s ease-in-out infinite',
                transformOrigin: 'center'
              }} 
            />
            <div>
              <p className="font-medium text-sm" style={{ color: currentTheme.text }}>
                I am NEO, Rohit's assistant
              </p>
              <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                Click to chat with me!
              </p>
            </div>
          </div>
          
          {/* Arrow pointing to button */}
          <div 
            className="absolute -bottom-1 right-4 w-2 h-2 transform rotate-45"
            style={{ 
              background: currentTheme.cardBackground,
              borderRight: `1px solid ${currentTheme.primary}30`,
              borderBottom: `1px solid ${currentTheme.primary}30`
            }}
          ></div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Backdrop with blur and black overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat Container */}
          <div 
            className="fixed inset-0 sm:bottom-4 sm:right-4 sm:inset-auto w-full h-full sm:w-[400px] sm:h-[550px] md:w-[450px] md:h-[600px] lg:w-[500px] lg:h-[650px] xl:w-[550px] xl:h-[700px] rounded-none sm:rounded-lg shadow-xl border flex flex-col"
            style={{ 
              background: currentTheme.cardBackground,
              borderColor: currentTheme.border,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxHeight: '100vh',
              maxWidth: '100vw'
            }}
          >
            {/* Header */}
            <div 
              className="p-4 rounded-t-lg flex items-center justify-between"
              style={{ background: currentTheme.primary, color: 'white' }}
            >
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <span className="font-semibold">NEO</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  className="text-xs px-2 py-1 rounded transition-colors hover:bg-white hover:bg-opacity-20"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs px-2 py-1 rounded transition-colors hover:bg-red-500"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.length === 0 && (
                <div className="text-center text-sm" style={{ color: currentTheme.textSecondary }}>
                  <Bot size={32} className="mx-auto mb-2" style={{ color: currentTheme.textSecondary }} />
                  <p>Hi! I'm NEO, your AI assistant. Ask me anything about my projects, skills, or experience!</p>
                  
                  {/* Suggested Questions */}
                  <div className="mt-6 space-y-2">
                    <p className="text-xs font-medium mb-3" style={{ color: currentTheme.textSecondary }}>
                      Try asking me about:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => handleSuggestedQuestion("Tell me about your projects")}
                        className="text-left p-2 rounded-lg border transition-all duration-200 hover:scale-105 text-xs"
                        style={{
                          background: currentTheme.primary + '10',
                          borderColor: currentTheme.primary + '30',
                          color: currentTheme.text,
                          border: `1px solid ${currentTheme.primary}30`
                        }}
                      >
                        💼 Tell me about your projects
                      </button>
                      <button
                        onClick={() => handleSuggestedQuestion("What technologies do you work with?")}
                        className="text-left p-2 rounded-lg border transition-all duration-200 hover:scale-105 text-xs"
                        style={{
                          background: currentTheme.primary + '10',
                          borderColor: currentTheme.primary + '30',
                          color: currentTheme.text,
                          border: `1px solid ${currentTheme.primary}30`
                        }}
                      >
                        🛠️ What technologies do you work with?
                      </button>
                      <button
                        onClick={() => handleSuggestedQuestion("What's your experience with AI and machine learning?")}
                        className="text-left p-2 rounded-lg border transition-all duration-200 hover:scale-105 text-xs"
                        style={{
                          background: currentTheme.primary + '10',
                          borderColor: currentTheme.primary + '30',
                          color: currentTheme.text,
                          border: `1px solid ${currentTheme.primary}30`
                        }}
                      >
                        🤖 What's your experience with AI and machine learning?
                      </button>
                      <button
                        onClick={() => handleSuggestedQuestion("How can I contact you?")}
                        className="text-left p-2 rounded-lg border transition-all duration-200 hover:scale-105 text-xs"
                        style={{
                          background: currentTheme.primary + '10',
                          borderColor: currentTheme.primary + '30',
                          color: currentTheme.text,
                          border: `1px solid ${currentTheme.primary}30`
                        }}
                      >
                        📧 How can I contact you?
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[85%] p-3 rounded-lg"
                    style={{
                      background: message.role === 'user' ? currentTheme.primary : currentTheme.primary + '80',
                      color: 'white'
                    }}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Bot size={16} className="mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        {message.role === 'assistant' && !message.content ? (
                          // Show thinking indicator for empty AI messages
                          <div className="flex items-center space-x-1">
                            <div className="flex space-x-1">
                              <div 
                                className="w-2 h-2 rounded-full animate-bounce"
                                style={{ background: 'white' }}
                              ></div>
                              <div 
                                className="w-2 h-2 rounded-full animate-bounce" 
                                style={{ 
                                  background: 'white',
                                  animationDelay: '0.1s' 
                                }}
                              ></div>
                              <div 
                                className="w-2 h-2 rounded-full animate-bounce" 
                                style={{ 
                                  background: 'white',
                                  animationDelay: '0.2s' 
                                }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                            {/* Only show timestamp if message has content */}
                            {message.content && (
                              <p className="text-xs opacity-70 mt-1">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      {message.role === 'user' && (
                        <User size={16} className="mt-1 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              

              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t" style={{ borderColor: currentTheme.border }}>
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  style={{
                    background: '#1f2937',
                    borderColor: currentTheme.primary + '30',
                    color: '#ffffff'
                  }}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 rounded-lg transition-colors disabled:opacity-50"
                  style={{
                    background: !inputMessage.trim() || isLoading 
                      ? currentTheme.disabled 
                      : currentTheme.primary,
                    color: 'white'
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot; 