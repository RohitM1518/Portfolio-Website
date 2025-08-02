import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
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

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.data.message,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
        style={{ 
          background: currentTheme.primary,
          color: 'white'
        }}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

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
            className="fixed bottom-4 right-4 w-80 h-[600px] md:h-[700px] rounded-lg shadow-xl border flex flex-col md:absolute md:bottom-16 md:right-0 md:w-96 lg:w-[450px] md:h-[600px]"
            style={{ 
              background: currentTheme.cardBackground,
              borderColor: currentTheme.border,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Header */}
            <div 
              className="p-4 rounded-t-lg flex items-center justify-between"
              style={{ background: currentTheme.primary, color: 'white' }}
            >
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <span className="font-semibold">Portfolio Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  className="text-xs px-2 py-1 rounded transition-colors"
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-sm" style={{ color: currentTheme.textSecondary }}>
                  <Bot size={32} className="mx-auto mb-2" style={{ color: currentTheme.textSecondary }} />
                  <p>Hi! I'm your portfolio assistant. Ask me anything about my projects, skills, or experience!</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] p-3 rounded-lg"
                    style={{
                      background: currentTheme.primary,
                      color: 'white'
                    }}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Bot size={16} className="mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <User size={16} className="mt-1 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div 
                    className="max-w-[80%] p-3 rounded-lg"
                    style={{ 
                      background: currentTheme.primary,
                      color: 'white'
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <Bot size={16} className="mt-1" />
                      <div className="flex space-x-1">
                        <div 
                          className="w-2 h-2 rounded-full animate-bounce"
                          style={{ background: currentTheme.textSecondary }}
                        ></div>
                        <div 
                          className="w-2 h-2 rounded-full animate-bounce" 
                          style={{ 
                            background: currentTheme.textSecondary,
                            animationDelay: '0.1s' 
                          }}
                        ></div>
                        <div 
                          className="w-2 h-2 rounded-full animate-bounce" 
                          style={{ 
                            background: currentTheme.textSecondary,
                            animationDelay: '0.2s' 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
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
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    background: currentTheme.inputBackground,
                    borderColor: currentTheme.border,
                    color: currentTheme.text
                  }}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 rounded-lg transition-colors"
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