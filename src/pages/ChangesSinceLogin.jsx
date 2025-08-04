import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  TrendingUp, 
  Users, 
  Download, 
  MessageSquare, 
  Eye,
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  RefreshCw,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
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

const ChangesSinceLogin = () => {
  const [changes, setChanges] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
    fetchChangesSinceLastLogin();
  }, []);

  const fetchChangesSinceLastLogin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/changes-since-login`,
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
        throw new Error('Failed to fetch changes since last login');
      }

      const data = await response.json();
      console.log('Changes since last login:', data.data);
      setChanges(data.data.changes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeSince = (hours, days) => {
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours % 24} hour${hours % 24 !== 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getInteractionIcon = (type) => {
    const icons = {
      'resume_download': <Download size={16} />,
      'page_visit': <Eye size={16} />,
      'button_click': <Activity size={16} />,
      'form_submission': <MessageSquare size={16} />,
      'link_click': <TrendingUp size={16} />,
      'scroll_depth': <BarChart3 size={16} />,
      'time_spent': <Clock size={16} />,
      'contact_form': <MessageSquare size={16} />,
      'project_view': <Eye size={16} />,
      'social_media_click': <TrendingUp size={16} />
    };
    return icons[type] || <Activity size={16} />;
  };

  const getInteractionColor = (type) => {
    const colors = {
      'resume_download': currentTheme.accent,
      'page_visit': currentTheme.primary,
      'button_click': '#f59e0b',
      'form_submission': currentTheme.secondary,
      'link_click': '#ef4444',
      'scroll_depth': '#06b6d4',
      'time_spent': '#84cc16',
      'contact_form': '#f97316',
      'project_view': '#6366f1',
      'social_media_click': '#ec4899'
    };
    return colors[type] || currentTheme.textSecondary;
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-backgroundGradient)' }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ color: currentTheme.primary }}></div>
            <span style={{ color: currentTheme.text }}>Loading changes since last login...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-backgroundGradient)' }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-4" style={{ color: '#ef4444' }} />
            <p style={{ color: '#ef4444' }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!changes) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-backgroundGradient)' }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Info className="h-8 w-8 mx-auto mb-4" style={{ color: currentTheme.primary }} />
            <p style={{ color: currentTheme.textSecondary }}>No changes data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-backgroundGradient)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              style={{ 
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.primary}30`
              }}
            >
              <ArrowLeft className="h-5 w-5" style={{ color: currentTheme.text }} />
            </button>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: currentTheme.text }}>
                Changes Since Last Login
              </h1>
              <p style={{ color: currentTheme.textSecondary }}>
                Activity overview since your last login
              </p>
            </div>
          </div>
          <button
            onClick={fetchChangesSinceLastLogin}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
            style={{ 
              background: currentTheme.primary,
              color: currentTheme.text
            }}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </motion.div>

        {/* Time Since Last Login */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl shadow-lg p-6 mb-8"
          style={{ 
            background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
            border: `1px solid ${currentTheme.primary}20`
          }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-6 w-6" style={{ color: currentTheme.primary }} />
            <h2 className="text-xl font-semibold" style={{ color: currentTheme.text }}>
              Time Since Last Login
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4" style={{ background: currentTheme.primary + '20' }}>
              <p className="text-sm font-medium" style={{ color: currentTheme.primary }}>
                Duration
              </p>
              <p className="text-2xl font-bold" style={{ color: currentTheme.text }}>
                {formatTimeSince(changes.timeSinceLastLogin.hours, changes.timeSinceLastLogin.days)}
              </p>
            </div>
            <div className="rounded-lg p-4" style={{ background: currentTheme.accent + '20' }}>
              <p className="text-sm font-medium" style={{ color: currentTheme.accent }}>
                Last Login
              </p>
              <p className="text-lg font-semibold" style={{ color: currentTheme.text }}>
                {formatDate(changes.timeSinceLastLogin.lastLogin)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* KPIs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="rounded-xl shadow-lg p-6" style={{ 
            background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
            border: `1px solid ${currentTheme.primary}30`
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                  Total Interactions
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: currentTheme.text }}>
                  {changes.kpis.totalInteractions}
                </p>
              </div>
              <div className="p-2 rounded-full" style={{ background: currentTheme.primary + '20' }}>
                <Activity size={24} style={{ color: currentTheme.primary }} />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                Avg: {changes.kpis.averageInteractionsPerHour}/hour
              </p>
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-6" style={{ 
            background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
            border: `1px solid ${currentTheme.primary}30`
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                  Chat Sessions
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: currentTheme.text }}>
                  {changes.kpis.totalChatSessions}
                </p>
              </div>
              <div className="p-2 rounded-full" style={{ background: currentTheme.accent + '20' }}>
                <MessageSquare size={24} style={{ color: currentTheme.accent }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-6" style={{ 
            background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
            border: `1px solid ${currentTheme.primary}30`
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                  Resume Downloads
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: currentTheme.text }}>
                  {changes.kpis.totalResumeDownloads}
                </p>
              </div>
              <div className="p-2 rounded-full" style={{ background: currentTheme.secondary + '20' }}>
                <Download size={24} style={{ color: currentTheme.secondary }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-6" style={{ 
            background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
            border: `1px solid ${currentTheme.primary}30`
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                  Unique Visitors
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: currentTheme.text }}>
                  {changes.kpis.uniqueVisitors}
                </p>
              </div>
              <div className="p-2 rounded-full" style={{ background: '#f59e0b20' }}>
                <Users size={24} style={{ color: '#f59e0b' }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Interactions by Type */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl shadow-lg p-6"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.text }}>
              Interactions by Type
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={changes.interactionsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {changes.interactionsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getInteractionColor(entry._id)} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: currentTheme.surface,
                    borderColor: currentTheme.primary + '30',
                    color: currentTheme.text
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Page Visits Breakdown */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl shadow-lg p-6"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.text }}>
              Page Visits Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={changes.pageVisitsBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.textSecondary + '20'} />
                <XAxis dataKey="_id" stroke={currentTheme.textSecondary} />
                <YAxis stroke={currentTheme.textSecondary} />
                <Tooltip 
                  contentStyle={{
                    background: currentTheme.surface,
                    borderColor: currentTheme.primary + '30',
                    color: currentTheme.text
                  }}
                />
                <Bar dataKey="count" fill={currentTheme.primary} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl shadow-lg p-6 mb-8"
          style={{ 
            background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
            border: `1px solid ${currentTheme.primary}20`
          }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.text }}>
            Recent Interactions
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {changes.recentInteractions.map((interaction, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg" style={{ background: currentTheme.surface + '50' }}>
                <div className="p-2 rounded-full" style={{ background: currentTheme.primary + '20' }}>
                  {getInteractionIcon(interaction.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: currentTheme.text }}>
                    {interaction.type.replace('_', ' ').toUpperCase()}
                  </p>
                  <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                    {interaction.page} • {formatDate(interaction.timestamp)}
                  </p>
                </div>
                <div className="text-xs" style={{ color: currentTheme.textSecondary }}>
                  {interaction.ipAddress}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Chat Sessions */}
        {changes.recentChatSessions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl shadow-lg p-6 mb-8"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.text }}>
              Recent Chat Sessions
            </h3>
            <div className="space-y-3">
              {changes.recentChatSessions.slice(0, 5).map((session, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ background: currentTheme.surface + '50' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium" style={{ color: currentTheme.text }}>
                      Session {session.sessionId?.substring(0, 8)}...
                    </p>
                    <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                      {formatDate(session.createdAt)}
                    </p>
                  </div>
                  <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                    Messages: {session.messages?.length || 0} • Duration: {session.duration || 0} min
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Resume Downloads */}
        {changes.recentResumeDownloads.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl shadow-lg p-6"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.text }}>
              Recent Resume Downloads
            </h3>
            <div className="space-y-3">
              {changes.recentResumeDownloads.slice(0, 5).map((download, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg" style={{ background: currentTheme.surface + '50' }}>
                  <Download className="h-5 w-5" style={{ color: currentTheme.accent }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: currentTheme.text }}>
                      Resume Download
                    </p>
                    <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                      {download.page} • {formatDate(download.timestamp)}
                    </p>
                  </div>
                  <div className="text-xs" style={{ color: currentTheme.textSecondary }}>
                    {download.ipAddress}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChangesSinceLogin; 