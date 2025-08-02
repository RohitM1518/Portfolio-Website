import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Bot,
  User,
  Calendar,
  Clock,
  Globe,
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ChatConversationsTable = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalConversations: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10
  });
  const [filters, setFilters] = useState({
    ipAddress: '',
    sessionId: '',
    startDate: '',
    endDate: '',
    search: '',
  });
  const [availableFilters, setAvailableFilters] = useState({
    uniqueIPs: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    fetchConversations();
  }, [pagination.currentPage, filters]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: pagination.limit,
        ...(filters.ipAddress && { ipAddress: filters.ipAddress }),
        ...(filters.sessionId && { sessionId: filters.sessionId }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
        ...(filters.search && { search: filters.search })
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/chat-conversations?${queryParams}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('admin');
          localStorage.removeItem('isAuthenticated');
          navigate('/admin/login');
          return;
        }
        throw new Error('Failed to fetch conversations');
      }

      const data = await response.json();
      setConversations(data.data.conversations);
      setPagination(data.data.pagination);
      setAvailableFilters(data.data.filters);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const clearFilters = () => {
    setFilters({
      ipAddress: '',
      sessionId: '',
      startDate: '',
      endDate: '',
      search: '',
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('admin');
        localStorage.removeItem('isAuthenticated');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('admin');
      localStorage.removeItem('isAuthenticated');
      navigate('/admin/login');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes) => {
    if (minutes < 1) return '< 1 min';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-backgroundGradient)' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:scale-105"
              style={{
                background: currentTheme.primary + '20',
                color: currentTheme.primary,
                border: `1px solid ${currentTheme.primary}30`
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: currentTheme.text }}>
                Chat Conversations
              </h1>
              <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                Monitor and analyze chatbot interactions
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:scale-105"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          {/* Header with Search and Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm px-2 py-1 rounded-full" style={{ 
                  background: currentTheme.primary + '20', 
                  color: currentTheme.primary 
                }}>
                  {pagination.totalConversations} total conversations
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Search */}
                <div className="relative w-full sm:w-auto">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: currentTheme.textSecondary }} />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border transition-colors w-full sm:w-64"
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: showFilters ? currentTheme.primary + '20' : currentTheme.surface,
                    color: showFilters ? currentTheme.primary : currentTheme.text,
                    border: `1px solid ${currentTheme.primary}30`
                  }}
                >
                  <Filter size={16} />
                  <span className="hidden sm:inline">Filters</span>
                </button>

                {/* Refresh */}
                <button
                  onClick={fetchConversations}
                  disabled={loading}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: currentTheme.primary + '20',
                    color: currentTheme.primary
                  }}
                >
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                {/* Clear All Filters */}
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <Filter size={16} />
                  <span className="hidden sm:inline">Clear All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-lg border"
              style={{
                background: currentTheme.surface + '80',
                borderColor: currentTheme.primary + '20'
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* IP Address Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                    IP Address
                  </label>
                  <select
                    value={filters.ipAddress}
                    onChange={(e) => handleFilterChange('ipAddress', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border transition-colors"
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                  >
                    <option value="">All IP Addresses</option>
                    {availableFilters.uniqueIPs.map(ip => (
                      <option key={ip} value={ip}>
                        {ip}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Session ID Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                    Session ID
                  </label>
                  <input
                    type="text"
                    value={filters.sessionId}
                    onChange={(e) => handleFilterChange('sessionId', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border transition-colors"
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                    placeholder="Enter session ID"
                  />
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border transition-colors"
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border transition-colors"
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Conversations List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" style={{ color: currentTheme.primary }}></div>
                  <span style={{ color: currentTheme.textSecondary }}>Loading conversations...</span>
                </div>
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8">
                <div className="flex flex-col items-center space-y-2">
                  <Bot size={32} style={{ color: currentTheme.textSecondary }} />
                  <span style={{ color: currentTheme.textSecondary }}>No conversations found</span>
                  <span className="text-sm" style={{ color: currentTheme.textSecondary }}>
                    {pagination.totalConversations === 0 
                      ? "No chat conversations have been recorded yet."
                      : "Try adjusting your filters or search terms"
                    }
                  </span>
                </div>
              </div>
            ) : (
              conversations.map((conversation, index) => (
                <motion.div
                  key={conversation.sessionId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                  style={{
                    background: currentTheme.surface + '80',
                    borderColor: currentTheme.primary + '20'
                  }}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: currentTheme.primary }}></div>
                          <span className="text-sm font-medium" style={{ color: currentTheme.text }}>
                            Session {conversation.sessionId.substring(0, 8)}...
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ 
                          background: currentTheme.primary + '20', 
                          color: currentTheme.primary 
                        }}>
                          {conversation.totalMessages} messages
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                          <span className="font-medium">First question:</span> {conversation.firstUserMessage.substring(0, 100)}...
                        </p>
                        <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                          <span className="font-medium">Last message:</span> {conversation.lastMessage.substring(0, 100)}...
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3 text-xs" style={{ color: currentTheme.textSecondary }}>
                        <span>👤 {conversation.userMessageCount} user messages</span>
                        <span>🤖 {conversation.aiMessageCount} AI responses</span>
                        {conversation.duration > 0 && <span>⏱️ {formatDuration(conversation.duration)}</span>}
                        <span className="flex items-center space-x-1">
                          <Globe size={12} />
                          <span>{conversation.ipAddress}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right text-xs" style={{ color: currentTheme.textSecondary }}>
                      <p>{formatDate(conversation.createdAt)}</p>
                      <p>{new Date(conversation.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-center sm:text-left" style={{ color: currentTheme.textSecondary }}>
                Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalConversations)} of{' '}
                {pagination.totalConversations} conversations
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                  style={{
                    background: pagination.hasPrevPage ? currentTheme.primary + '20' : currentTheme.surface,
                    color: pagination.hasPrevPage ? currentTheme.primary : currentTheme.textSecondary
                  }}
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(3, pagination.totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          pageNum === pagination.currentPage ? 'font-medium' : ''
                        }`}
                        style={{
                          background: pageNum === pagination.currentPage 
                            ? currentTheme.primary 
                            : currentTheme.primary + '20',
                          color: pageNum === pagination.currentPage 
                            ? currentTheme.text 
                            : currentTheme.primary
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                  style={{
                    background: pagination.hasNextPage ? currentTheme.primary + '20' : currentTheme.surface,
                    color: pagination.hasNextPage ? currentTheme.primary : currentTheme.textSecondary
                  }}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Conversation Detail Modal */}
          {selectedConversation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div 
                className="rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
                style={{ 
                  background: currentTheme.cardBackground,
                  borderColor: currentTheme.border,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold" style={{ color: currentTheme.text }}>
                    Conversation Details
                  </h2>
                  <button
                    onClick={() => setSelectedConversation(null)}
                    style={{ color: currentTheme.textSecondary }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                </div>

                {/* Conversation Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-lg" style={{ background: currentTheme.surface + '40' }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>Session ID</p>
                    <p className="text-sm" style={{ color: currentTheme.text }}>{selectedConversation.sessionId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>IP Address</p>
                    <p className="text-sm" style={{ color: currentTheme.text }}>{selectedConversation.ipAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>Created</p>
                    <p className="text-sm" style={{ color: currentTheme.text }}>{formatDate(selectedConversation.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>Duration</p>
                    <p className="text-sm" style={{ color: currentTheme.text }}>{formatDuration(selectedConversation.duration)}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium" style={{ color: currentTheme.text }}>Messages</h3>
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className="max-w-[80%] p-3 rounded-lg"
                        style={{
                          background: message.role === 'user' ? currentTheme.primary : currentTheme.surface,
                          color: message.role === 'user' ? 'white' : currentTheme.text
                        }}
                      >
                        <div className="flex items-start space-x-2">
                          {message.role === 'assistant' && (
                            <Bot size={16} className="mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {formatDate(message.timestamp)}
                            </p>
                          </div>
                          {message.role === 'user' && (
                            <User size={16} className="mt-1 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatConversationsTable; 