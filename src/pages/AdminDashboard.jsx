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
  Settings
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

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState(30);
  const [interactions, setInteractions] = useState([]);
  const [interactionsLoading, setInteractionsLoading] = useState(false);
  const [dashboardAlerts, setDashboardAlerts] = useState([]);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

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
    fetchInteractions();
    fetchDashboardAlerts();
  }, [dateRange]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/dashboard/stats?days=${dateRange}`,
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
        throw new Error('Failed to fetch dashboard stats');
      }

      const data = await response.json();
      setStats(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchInteractions = async () => {
    setInteractionsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/interactions?limit=10`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch interactions');
      }

      const data = await response.json();
      setInteractions(data.data.interactions);
    } catch (err) {
      console.error('Error fetching interactions:', err);
    } finally {
      setInteractionsLoading(false);
    }
  };

  const fetchDashboardAlerts = async () => {
    setAlertsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/dashboard-alerts`,
        {
          credentials: 'include',
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
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
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

  const getInteractionIcon = (type) => {
    const icons = {
      page_visit: <Eye size={16} />,
      button_click: <MousePointer size={16} />,
      form_submission: <Activity size={16} />,
      link_click: <Globe size={16} />,
      resume_download: <BarChart3 size={16} />,
      contact_form: <Users size={16} />
    };
    return icons[type] || <Activity size={16} />;
  };

  const getInteractionColor = (type) => {
    const colors = {
      page_visit: currentTheme.primary,
      button_click: currentTheme.accent,
      form_submission: '#f59e0b',
      link_click: currentTheme.secondary,
      resume_download: '#ef4444',
      contact_form: '#06b6d4'
    };
    return colors[type] || '#6b7280';
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
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          {/* Dashboard Alerts */}
          {dashboardAlerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 right-4 z-20"
            >
              <div className="space-y-2">
                {dashboardAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg shadow-lg max-w-sm"
                    style={{
                      background: `${getAlertColor(alert.severity)}20`,
                      border: `1px solid ${getAlertColor(alert.severity)}40`
                    }}
                  >
                    <div
                      className="p-1 rounded"
                      style={{ color: getAlertColor(alert.severity) }}
                    >
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: currentTheme.text }}>
                        {alert.title}
                      </p>
                      <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                        {alert.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: currentTheme.text }}>
              Admin Dashboard
            </h1>
            <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
              Portfolio Analytics & Insights
            </p>
          </div>
          <div className="flex items-center space-x-4">
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
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
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

          {/* Average Daily */}
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
                  Avg Daily
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: currentTheme.text }}>
                  {stats?.recentInteractions ? Math.round(stats.recentInteractions / dateRange) : 0}
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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.pageVisits || []} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.textSecondary + '20'} />
                <XAxis 
                  type="number"
                  stroke={currentTheme.textSecondary}
                  fontSize={12}
                />
                <YAxis 
                  type="category" 
                  dataKey="_id" 
                  stroke={currentTheme.textSecondary}
                  fontSize={12}
                  width={100}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill={currentTheme.secondary}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
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
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: currentTheme.text }}>
              Recent Activity
            </h3>
            <button
              onClick={fetchInteractions}
              disabled={interactionsLoading}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
              style={{
                background: currentTheme.primary + '20',
                color: currentTheme.primary
              }}
            >
              <RefreshCw size={16} className={interactionsLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>

          {interactionsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" style={{ color: currentTheme.primary }}></div>
            </div>
          ) : (
            <div className="space-y-3">
              {interactions.map((interaction, index) => (
                <div
                  key={interaction._id}
                  className="flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: `${currentTheme.surface}80`,
                    border: `1px solid ${currentTheme.primary}20`
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ background: getInteractionColor(interaction.type) + '20' }}
                    >
                      {getInteractionIcon(interaction.type)}
                    </div>
                    <div>
                      <p className="font-medium capitalize" style={{ color: currentTheme.text }}>
                        {interaction.type.replace('_', ' ')}
                      </p>
                      <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                        {interaction.page} {interaction.element && `• ${interaction.element}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium" style={{ color: currentTheme.text }}>
                      {formatDate(interaction.timestamp)}
                    </p>
                    <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                      {interaction.ipAddress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard; 