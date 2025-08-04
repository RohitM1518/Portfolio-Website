import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  MousePointer, 
  Eye, 
  TrendingUp, 
  Calendar,
  LogOut,
  RefreshCw,
  Activity,
  Globe,
  Clock,
  Filter,
  AlertTriangle,
  Settings,
  Bot
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { RecentActivityTable } from '../components';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState(30);
  const [dashboardAlerts, setDashboardAlerts] = useState([]);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const { token } = useAuth();

  // Chart colors that work well with the theme
  const chartColors = [
    currentTheme.primary,
    currentTheme.secondary,
    currentTheme.accent,
    '#f59e0b',
    '#ef4444',
    '#06b6d4',
    '#8b5cf6',
    '#10b981'
  ];

  useEffect(() => {
    fetchDashboardStats();
    fetchDashboardAlerts();
  }, [dateRange]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/dashboard/stats?days=${dateRange}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
          return;
        }
        throw new Error('Failed to fetch dashboard stats');
      }

      const data = await response.json();
      console.log('Dashboard stats received:', data.data);
      console.log('Page visits data:', data.data?.pageVisits);
      setStats(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardAlerts = async () => {
    setAlertsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/dashboard-alerts`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDashboardAlerts(data.data.alerts);
      }
    } catch (err) {
      console.error('Error fetching dashboard alerts:', err);
    } finally {
      setAlertsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/admin/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const getAlertIcon = (type) => {
    const icons = {
      high_traffic: <TrendingUp size={16} />,
      form_submission: <Activity size={16} />,
      error: <AlertTriangle size={16} />,
      system: <Settings size={16} />
    };
    return icons[type] || <Activity size={16} />;
  };

  const getAlertColor = (severity) => {
    const colors = {
      info: currentTheme.primary,
      warning: '#f59e0b',
      error: '#ef4444',
      success: currentTheme.accent
    };
    return colors[severity] || '#6b7280';
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="p-3 rounded-lg shadow-lg border"
          style={{
            background: currentTheme.surface,
            borderColor: currentTheme.primary + '30',
            color: currentTheme.text
          }}
        >
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-backgroundGradient)' }}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" style={{ color: currentTheme.primary }}></div>
          <span style={{ color: currentTheme.text }}>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-backgroundGradient)' }}>
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{ 
              background: currentTheme.primary + '20', 
              color: currentTheme.primary,
              border: `1px solid ${currentTheme.primary}40`
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-backgroundGradient)' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Date Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end items-center mb-8"
        >
          <select
            value={dateRange}
            onChange={(e) => setDateRange(parseInt(e.target.value))}
            className="px-3 py-2 rounded-lg border transition-colors"
            style={{
              background: currentTheme.surface,
              borderColor: currentTheme.primary + '30',
              color: currentTheme.text
            }}
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Interactions */}
          <div
            className="p-6 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
              border: `1px solid ${currentTheme.primary}30`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                  Total Interactions
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: currentTheme.text }}>
                  {stats?.totalInteractions?.toLocaleString() || 0}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ background: currentTheme.primary + '20' }}
              >
                <BarChart3 size={24} style={{ color: currentTheme.primary }} />
              </div>
            </div>
          </div>

          {/* Recent Interactions */}
          <div
            className="p-6 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
              border: `1px solid ${currentTheme.primary}30`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                  Recent ({dateRange} days)
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: currentTheme.text }}>
                  {stats?.recentInteractions?.toLocaleString() || 0}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ background: currentTheme.secondary + '20' }}
              >
                <TrendingUp size={24} style={{ color: currentTheme.secondary }} />
              </div>
            </div>
          </div>

          {/* Unique Visitors */}
          <div
            className="p-6 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
              border: `1px solid ${currentTheme.primary}30`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                  Unique Visitors
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: currentTheme.text }}>
                  {stats?.uniqueVisitors?.toLocaleString() || 0}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ background: currentTheme.accent + '20' }}
              >
                <Users size={24} style={{ color: currentTheme.accent }} />
              </div>
            </div>
          </div>

          {/* Resume Downloads */}
          <div
            className="p-6 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
              border: `1px solid ${currentTheme.primary}30`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                  Resume Download
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: currentTheme.text }}>
                  {stats?.totalResumeDownloads || 0}
                </p>
                <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>
                  {stats?.recentResumeDownloads || 0} in last {stats?.dateRange?.days || 30} days
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ background: '#f59e0b20' }}
              >
                <Calendar size={24} style={{ color: '#f59e0b' }} />
              </div>
            </div>
          </div>

          {/* Chatbot Analytics */}
          <div
            className="p-6 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
              border: `1px solid ${currentTheme.primary}30`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                  Chatbot Sessions
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: currentTheme.text }}>
                  {stats?.chatbot?.totalSessions || 0}
                </p>
                <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>
                  {stats?.chatbot?.totalMessages || 0} total messages
                </p>
                <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                  {stats?.chatbot?.recentSessions || 0} in last {stats?.dateRange?.days || 30} days
                </p>
                <button
                  onClick={() => navigate('/admin/chat-conversations')}
                  className="mt-2 text-xs px-3 py-1 rounded-lg transition-colors hover:scale-105"
                  style={{
                    background: currentTheme.primary + '30',
                    color: currentTheme.primary,
                    border: `1px solid ${currentTheme.primary}50`
                  }}
                >
                  View Conversations →
                </button>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ background: '#06b6d420' }}
              >
                <Bot size={24} style={{ color: '#06b6d4' }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Daily Interactions Chart */}
          <div
            className="p-6 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.text }}>
              Daily Interactions Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats?.dailyInteractions || []}>
                <defs>
                  <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentTheme.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={currentTheme.primary} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.textSecondary + '20'} />
                <XAxis 
                  dataKey="_id" 
                  stroke={currentTheme.textSecondary}
                  fontSize={12}
                />
                <YAxis 
                  stroke={currentTheme.textSecondary}
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke={currentTheme.primary} 
                  fillOpacity={1} 
                  fill="url(#colorInteractions)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Interactions by Type Chart */}
          <div
            className="p-6 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.text }}>
              Interactions by Type
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.interactionsByType || []}>
                <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.textSecondary + '20'} />
                <XAxis 
                  dataKey="_id" 
                  stroke={currentTheme.textSecondary}
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke={currentTheme.textSecondary}
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill={currentTheme.primary}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Page Visits Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div
            className="p-6 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.text }}>
              Most Visited Pages
            </h3>
            {(!stats?.pageVisits || stats.pageVisits.length === 0) ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: currentTheme.primary + '20' }}>
                    <BarChart3 size={24} style={{ color: currentTheme.primary }} />
                  </div>
                  <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                    No page visit data available
                  </p>
                  <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>
                    Page visits will appear here once users start browsing
                  </p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.pageVisits}>
                  <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.textSecondary + '20'} />
                  <XAxis 
                    dataKey="_id" 
                    stroke={currentTheme.textSecondary}
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke={currentTheme.textSecondary}
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="count" 
                    fill={currentTheme.primary}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Recent Chat Conversations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl mb-8"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
            border: `1px solid ${currentTheme.primary}20`,
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: currentTheme.text }}>
              Recent Chat Conversations
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bot size={20} style={{ color: currentTheme.primary }} />
                <span className="text-sm" style={{ color: currentTheme.textSecondary }}>
                  {stats?.chatbot?.recentConversations?.length || 0} conversations
                </span>
              </div>
              <button
                onClick={() => navigate('/admin/chat-conversations')}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:scale-105"
                style={{
                  background: currentTheme.primary + '20',
                  color: currentTheme.primary,
                  border: `1px solid ${currentTheme.primary}30`
                }}
              >
                <span className="text-sm">View All</span>
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>

          {stats?.chatbot?.recentConversations?.length > 0 ? (
            <div className="space-y-4">
              {stats.chatbot.recentConversations.map((chat, index) => (
                <motion.div
                  key={chat.sessionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] cursor-pointer hover:border-opacity-60"
                  style={{
                    background: currentTheme.surface + '80',
                    borderColor: currentTheme.primary + '20'
                  }}
                  onClick={() => navigate('/admin/chat-conversations')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: currentTheme.primary }}></div>
                          <span className="text-sm font-medium" style={{ color: currentTheme.text }}>
                            Session {chat.sessionId.substring(0, 8)}...
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ 
                          background: currentTheme.primary + '20', 
                          color: currentTheme.primary 
                        }}>
                          {chat.totalMessages} messages
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                          <span className="font-medium">First question:</span> {chat.firstUserMessage}
                        </p>
                        <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                          <span className="font-medium">Last message:</span> {chat.lastMessage}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3 text-xs" style={{ color: currentTheme.textSecondary }}>
                        <span>👤 {chat.userMessageCount} user messages</span>
                        <span>🤖 {chat.aiMessageCount} AI responses</span>
                        {chat.duration > 0 && <span>⏱️ {chat.duration} min duration</span>}
                      </div>
                    </div>
                    
                    <div className="text-right text-xs" style={{ color: currentTheme.textSecondary }}>
                      <p>{new Date(chat.createdAt).toLocaleDateString()}</p>
                      <p>{new Date(chat.createdAt).toLocaleTimeString()}</p>
                      <p className="mt-1 text-xs opacity-60">Click to view details</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bot size={48} className="mx-auto mb-4" style={{ color: currentTheme.textSecondary }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: currentTheme.text }}>
                No chat conversations yet
              </h3>
              <p style={{ color: currentTheme.textSecondary }}>
                Chat conversations will appear here once users start interacting with NEO.
              </p>
            </div>
          )}
        </motion.div>

        {/* Enhanced Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
            border: `1px solid ${currentTheme.primary}20`,
            backdropFilter: 'blur(10px)'
          }}
        >
          <RecentActivityTable />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard; 