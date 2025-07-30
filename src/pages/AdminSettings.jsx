import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Shield, 
  Database, 
  Bell,
  Save,
  LogOut
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AdminSettings = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: { enabled: true, settings: { frequency: 'daily' } },
    dashboard: { enabled: true, settings: { showAlerts: true, alertTypes: ['high_traffic', 'form_submission'] } },
    weeklyReport: { enabled: false, settings: { dayOfWeek: 0, time: '09:00', includeMetrics: ['interactions', 'visitors'] } }
  });
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  useEffect(() => {
    fetchAdminInfo();
    fetchNotificationPreferences();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/me`,
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
        throw new Error('Failed to fetch admin info');
      }

      const data = await response.json();
      setAdminInfo(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotificationPreferences = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/preferences`,
        {
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotificationPreferences(data.data);
      }
    } catch (err) {
      console.error('Error fetching notification preferences:', err);
    }
  };

  const updateNotificationPreference = async (type, enabled, settings = null) => {
    setSaving(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/preferences`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            type,
            enabled,
            settings: settings || notificationPreferences[type]?.settings
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotificationPreferences(prev => ({
          ...prev,
          [type]: { enabled, settings: data.data.settings }
        }));
      }
    } catch (err) {
      console.error('Error updating notification preference:', err);
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-backgroundGradient)' }}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" style={{ color: currentTheme.primary }}></div>
          <span style={{ color: currentTheme.text }}>Loading settings...</span>
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
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: currentTheme.text }}>
              Admin Settings
            </h1>
            <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
              Manage your admin account and preferences
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors hover:scale-105"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div
                className="p-3 rounded-lg"
                style={{ background: currentTheme.primary + '20' }}
              >
                <User size={24} style={{ color: currentTheme.primary }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: currentTheme.text }}>
                Profile Information
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                  Username
                </label>
                <div className="p-3 rounded-lg transition-colors" style={{ background: currentTheme.surface + '80' }}>
                  <span style={{ color: currentTheme.text }}>{adminInfo?.username}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                  Email
                </label>
                <div className="p-3 rounded-lg transition-colors" style={{ background: currentTheme.surface + '80' }}>
                  <span style={{ color: currentTheme.text }}>{adminInfo?.email}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                  Role
                </label>
                <div className="p-3 rounded-lg transition-colors" style={{ background: currentTheme.surface + '80' }}>
                  <span className="capitalize" style={{ color: currentTheme.text }}>{adminInfo?.role}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                  Last Login
                </label>
                <div className="p-3 rounded-lg transition-colors" style={{ background: currentTheme.surface + '80' }}>
                  <span style={{ color: currentTheme.text }}>
                    {adminInfo?.lastLogin ? new Date(adminInfo.lastLogin).toLocaleString() : 'Never'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div
                className="p-3 rounded-lg"
                style={{ background: currentTheme.accent + '20' }}
              >
                <Shield size={24} style={{ color: currentTheme.accent }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: currentTheme.text }}>
                Security Settings
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]" style={{ background: currentTheme.surface + '80' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: currentTheme.text }}>
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                      Add an extra layer of security
                    </p>
                  </div>
                  <button
                    className="px-3 py-1 rounded-lg text-sm transition-colors hover:scale-105"
                    style={{
                      background: currentTheme.primary + '20',
                      color: currentTheme.primary
                    }}
                  >
                    Enable
                  </button>
                </div>
              </div>
              
              <div className="p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]" style={{ background: currentTheme.surface + '80' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: currentTheme.text }}>
                      Session Management
                    </p>
                    <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                      Manage active sessions
                    </p>
                  </div>
                  <button
                    className="px-3 py-1 rounded-lg text-sm transition-colors hover:scale-105"
                    style={{
                      background: currentTheme.primary + '20',
                      color: currentTheme.primary
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
              
              <div className="p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]" style={{ background: currentTheme.surface + '80' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: currentTheme.text }}>
                      Password Change
                    </p>
                    <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                      Update your password
                    </p>
                  </div>
                  <button
                    className="px-3 py-1 rounded-lg text-sm transition-colors hover:scale-105"
                    style={{
                      background: currentTheme.primary + '20',
                      color: currentTheme.primary
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* System Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div
                className="p-3 rounded-lg"
                style={{ background: '#f59e0b20' }}
              >
                <Database size={24} style={{ color: '#f59e0b' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: currentTheme.text }}>
                System Information
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between p-2 rounded-lg transition-colors" style={{ background: currentTheme.surface + '40' }}>
                <span style={{ color: currentTheme.textSecondary }}>Database Status:</span>
                <span className="text-green-500 font-medium">Connected</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg transition-colors" style={{ background: currentTheme.surface + '40' }}>
                <span style={{ color: currentTheme.textSecondary }}>API Version:</span>
                <span style={{ color: currentTheme.text }}>v1.0.0</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg transition-colors" style={{ background: currentTheme.surface + '40' }}>
                <span style={{ color: currentTheme.textSecondary }}>Last Backup:</span>
                <span style={{ color: currentTheme.text }}>Today 02:00 AM</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg transition-colors" style={{ background: currentTheme.surface + '40' }}>
                <span style={{ color: currentTheme.textSecondary }}>Uptime:</span>
                <span style={{ color: currentTheme.text }}>99.9%</span>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              border: `1px solid ${currentTheme.primary}20`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div
                className="p-3 rounded-lg"
                style={{ background: currentTheme.secondary + '20' }}
              >
                <Bell size={24} style={{ color: currentTheme.secondary }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: currentTheme.text }}>
                Notifications
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]" style={{ background: currentTheme.surface + '40' }}>
                <div>
                  <p className="font-medium" style={{ color: currentTheme.text }}>
                    Email Notifications
                  </p>
                  <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                    Receive alerts via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationPreferences.email?.enabled || false}
                    onChange={(e) => updateNotificationPreference('email', e.target.checked)}
                    disabled={saving}
                  />
                  <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    notificationPreferences.email?.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]" style={{ background: currentTheme.surface + '40' }}>
                <div>
                  <p className="font-medium" style={{ color: currentTheme.text }}>
                    Dashboard Alerts
                  </p>
                  <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                    Show alerts on dashboard
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationPreferences.dashboard?.enabled || false}
                    onChange={(e) => updateNotificationPreference('dashboard', e.target.checked)}
                    disabled={saving}
                  />
                  <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    notificationPreferences.dashboard?.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]" style={{ background: currentTheme.surface + '40' }}>
                <div>
                  <p className="font-medium" style={{ color: currentTheme.text }}>
                    Weekly Reports
                  </p>
                  <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                    Send weekly analytics
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationPreferences.weeklyReport?.enabled || false}
                    onChange={(e) => updateNotificationPreference('weekly_report', e.target.checked)}
                    disabled={saving}
                  />
                  <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    notificationPreferences.weeklyReport?.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings; 