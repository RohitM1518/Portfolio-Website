import React, { useState, useEffect } from 'react';
import { FileText, Trash2, Edit, Plus, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [sseConnection, setSseConnection] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: ''
  });
  const { token } = useAuth();
  const { currentTheme } = useTheme();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const log = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      message,
      type
    };
    setLogs(prev => [...prev, log]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const connectToLogStream = (documentId) => {
    // Close existing connection if any
    if (sseConnection) {
      sseConnection.close();
    }

    // Create new SSE connection with authentication
    const url = `${import.meta.env.VITE_API_URL}/documents/logs/${documentId}`;
    
    // Use EventSource for SSE (simpler approach)
    const eventSource = new EventSource(url);
    
    eventSource.onopen = () => {
      addLog('🔌 Connected to real-time processing logs', 'success');
    };
    
    eventSource.onmessage = (event) => {
      try {
        const logData = JSON.parse(event.data);
        const timestamp = new Date(logData.timestamp).toLocaleTimeString();
        
        const log = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp,
          message: logData.message,
          type: logData.type
        };
        
        setLogs(prev => [...prev, log]);
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };
    
    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      addLog('❌ Lost connection to server logs', 'error');
      
      // Try to reconnect after a short delay
      setTimeout(() => {
        if (eventSource.readyState === EventSource.CLOSED) {
          addLog('🔄 Attempting to reconnect...', 'info');
          connectToLogStream(documentId);
        }
      }, 2000);
    };
    
    setSseConnection(eventSource);
    return eventSource;
  };

  const testSSEConnection = async (documentId) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/documents/logs/${documentId}`;
      
      // Test with EventSource
      return new Promise((resolve) => {
        const eventSource = new EventSource(url);
        
        eventSource.onopen = () => {
          eventSource.close();
          addLog('✅ SSE endpoint is accessible', 'success');
          resolve(true);
        };
        
        eventSource.onerror = () => {
          eventSource.close();
          addLog('❌ SSE endpoint is not accessible', 'error');
          resolve(false);
        };
        
        // Timeout after 3 seconds
        setTimeout(() => {
          eventSource.close();
          addLog('⏰ SSE connection timeout', 'error');
          resolve(false);
        }, 3000);
      });
    } catch (error) {
      console.error('SSE test error:', error);
      addLog(`❌ SSE test failed: ${error.message}`, 'error');
      return false;
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setDocuments(data.data);
        if (data.data.length > 0) {
          showNotification(`📚 Loaded ${data.data.length} document${data.data.length === 1 ? '' : 's'} successfully!`, 'success');
        }
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      showNotification('❌ Failed to load documents. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      showNotification('⚠️ Please fill in all required fields (Title and Content)', 'error');
      return;
    }

    setUploading(true);
    setShowLogs(true);
    clearLogs();

    addLog('🚀 Starting document upload process...', 'info');
    addLog(`📝 Document title: "${formData.title}"`, 'info');
    addLog(`📊 Content length: ${formData.content.length} characters`, 'info');

    try {
      // Connect to SSE stream BEFORE processing starts
      addLog('🔌 Connecting to real-time processing logs...', 'info');
      
      // First, create a temporary document ID for SSE connection
      const tempId = `temp-${Date.now()}`;
      
      // Test SSE connection first
      const sseTest = await testSSEConnection(tempId);
      if (sseTest) {
        // Connect to SSE stream BEFORE processing starts
        const eventSource = connectToLogStream(tempId);
        
        // Wait a moment for connection to establish
        await new Promise(resolve => setTimeout(resolve, 1000)); // Increased from 500ms to 1000ms
        
        // Check if connection is established
        if (eventSource.readyState === EventSource.OPEN) {
          addLog('✅ SSE connection established successfully', 'success');
        } else {
          addLog('⚠️ SSE connection not ready, proceeding anyway', 'info');
        }
        
        // Now send the upload request
        const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        addLog('📡 Sending upload request to server...', 'info');
        addLog('✅ Server response received', 'success');
        addLog('📄 Document saved to database', 'success');
        
        // Wait for processing to complete
        setTimeout(() => {
          if (eventSource) {
            eventSource.close();
            setSseConnection(null);
          }
        }, 10000); // Close after 10 seconds
        
        setDocuments(prev => [data.data, ...prev]);
        setShowUploadModal(false);
        setFormData({ title: '', description: '', content: '' });
        showNotification('🎉 Document uploaded successfully! Your content is now ready for AI processing.', 'success');
      } else {
        // If SSE fails, still send the upload request
        const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        addLog('📡 Sending upload request to server...', 'info');
        addLog('✅ Server response received', 'success');
        addLog('📄 Document saved to database', 'success');
        
        setDocuments(prev => [data.data, ...prev]);
        setShowUploadModal(false);
        setFormData({ title: '', description: '', content: '' });
        showNotification('🎉 Document uploaded successfully! Your content is now ready for AI processing.', 'success');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      addLog(`❌ Error: ${error.message}`, 'error');
      showNotification(`❌ Failed to upload document: ${error.message}`, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedDocument || !formData.title) {
      showNotification('⚠️ Please fill in all required fields (Title and Content)', 'error');
      return;
    }

    setUpdating(true);
    setShowLogs(true);
    clearLogs();

    addLog('🔄 Starting document update process...', 'info');
    addLog(`📝 Updating document: "${selectedDocument.title}"`, 'info');
    addLog(`📊 New content length: ${formData.content.length} characters`, 'info');

    try {
      // Connect to SSE stream for real-time logs BEFORE sending the request
      addLog('🔌 Connecting to real-time processing logs...', 'info');
      
      // Test SSE connection first
      const sseTest = await testSSEConnection(selectedDocument._id);
      let data; // Declare data variable outside the blocks
      
      if (sseTest) {
        // Connect to SSE stream BEFORE processing starts
        const eventSource = connectToLogStream(selectedDocument._id);
        
        // Wait a moment for connection to establish
        await new Promise(resolve => setTimeout(resolve, 1000)); // Increased from 500ms to 1000ms
        
        // Check if connection is established
        if (eventSource.readyState === EventSource.OPEN) {
          addLog('✅ SSE connection established successfully', 'success');
        } else {
          addLog('⚠️ SSE connection not ready, proceeding anyway', 'info');
        }
        
        // Now send the update request
        const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/${selectedDocument._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            content: formData.content
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
        addLog('📡 Sending update request to server...', 'info');
        addLog('✅ Server response received', 'success');
        addLog('📄 Document updated in database', 'success');
        
        // Wait for processing to complete
        setTimeout(() => {
          if (eventSource) {
            eventSource.close();
            setSseConnection(null);
          }
        }, 10000); // Close after 10 seconds
      } else {
        // If SSE fails, still send the update request
        const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/${selectedDocument._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            content: formData.content
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
        addLog('📡 Sending update request to server...', 'info');
        addLog('✅ Server response received', 'success');
        addLog('📄 Document updated in database', 'success');
      }

      setDocuments(prev => prev.map(doc => 
        doc._id === selectedDocument._id ? data.data : doc
      ));
      setShowEditModal(false);
      setSelectedDocument(null);
      setFormData({ title: '', description: '', content: '' });
      showNotification('✨ Document updated successfully! Your changes have been saved.', 'success');
    } catch (error) {
      console.error('Error updating document:', error);
      addLog(`❌ Error: ${error.message}`, 'error');
      showNotification(`❌ Failed to update document: ${error.message}`, 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (documentId) => {
    const documentToDelete = documents.find(doc => doc._id === documentId);
    if (!confirm(`Are you sure you want to delete "${documentToDelete?.title}"? This action cannot be undone.`)) return;

    setDeleting(prev => ({ ...prev, [documentId]: true }));

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/${documentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setDocuments(prev => prev.filter(doc => doc._id !== documentId));
        showNotification('🗑️ Document deleted successfully! The content has been removed from your library.', 'success');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      showNotification(`❌ Failed to delete document: ${error.message}`, 'error');
    } finally {
      setDeleting(prev => ({ ...prev, [documentId]: false }));
    }
  };

  const openEditModal = (document) => {
    setSelectedDocument(document);
    setFormData({
      title: document.title,
      description: document.description || '',
      content: document.content || ''
    });
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-backgroundGradient)' }}
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: currentTheme.primary }}
          ></div>
          <p className="mt-4" style={{ color: currentTheme.textSecondary }}>
            Loading documents...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-6"
      style={{ background: 'var(--color-backgroundGradient)' }}
    >
      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 right-4 z-50 max-w-sm"
          >
            <div
              className={`p-4 rounded-lg shadow-lg border-l-4 flex items-start space-x-3 ${
                notification.type === 'success' 
                  ? 'bg-green-50 border-green-500 text-green-800' 
                  : notification.type === 'error'
                  ? 'bg-red-50 border-red-500 text-red-800'
                  : 'bg-blue-50 border-blue-500 text-blue-800'
              }`}
              style={{
                background: notification.type === 'success' 
                  ? 'rgba(34, 197, 94, 0.1)' 
                  : notification.type === 'error'
                  ? 'rgba(239, 68, 68, 0.1)'
                  : 'rgba(59, 130, 246, 0.1)',
                borderColor: notification.type === 'success' 
                  ? '#10b981' 
                  : notification.type === 'error'
                  ? '#ef4444'
                  : '#3b82f6',
                color: notification.type === 'success' 
                  ? '#065f46' 
                  : notification.type === 'error'
                  ? '#991b1b'
                  : '#1e40af'
              }}
            >
              <div className="flex-shrink-0 mt-0.5">
                {notification.type === 'success' ? (
                  <CheckCircle size={20} className="text-green-600" />
                ) : notification.type === 'error' ? (
                  <AlertCircle size={20} className="text-red-600" />
                ) : (
                  <Info size={20} className="text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Processing Logs */}
      {showLogs && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-4 z-50 w-96 max-h-96 overflow-hidden"
        >
          <div
            className="rounded-lg shadow-lg border"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.secondary}10)`,
              borderColor: currentTheme.primary + '30',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: currentTheme.primary + '20' }}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium" style={{ color: currentTheme.text }}>
                  Processing Logs
                </span>
              </div>
              <button
                onClick={() => setShowLogs(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            {/* Logs Container */}
            <div className="p-3 max-h-80 overflow-y-auto">
              <div className="space-y-2">
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start space-x-2 text-xs"
                  >
                    <span className="text-gray-500 font-mono" style={{ color: currentTheme.textSecondary }}>
                      {log.timestamp}
                    </span>
                    <span
                      className={`flex-1 ${
                        log.type === 'success' ? 'text-green-600' :
                        log.type === 'error' ? 'text-red-600' :
                        'text-blue-600'
                      }`}
                      style={{
                        color: log.type === 'success' ? '#10b981' :
                               log.type === 'error' ? '#ef4444' :
                               currentTheme.primary
                      }}
                    >
                      {log.message}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-2 border-t text-center" style={{ borderColor: currentTheme.primary + '20' }}>
              <button
                onClick={clearLogs}
                className="text-xs px-2 py-1 rounded transition-colors"
                style={{
                  background: currentTheme.primary + '20',
                  color: currentTheme.primary
                }}
              >
                Clear Logs
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: currentTheme.text }}
          >
            Document Manager
          </h1>
          <p style={{ color: currentTheme.textSecondary }}>
            Manage your text documents. Add, edit, and organize your content for AI processing.
          </p>
        </div>

        {/* Upload Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors text-white"
            style={{ background: currentTheme.primary }}
          >
            <Plus size={20} />
            <span>Add New Document</span>
          </button>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((document, index) => (
            <motion.div 
              key={document._id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-[1.02] relative"
              style={{ 
                background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.primary}20)`,
                border: `1px solid ${currentTheme.primary}20`,
                backdropFilter: 'blur(10px)'
              }}
            >
              {deleting[document._id] && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center z-10">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-2"
                    />
                    <p className="text-white text-sm">Deleting...</p>
                  </div>
                </div>
              )}
              {updating && selectedDocument?._id === document._id && (
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center z-10">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-3 border-white border-t-transparent rounded-full mx-auto mb-2"
                    />
                    <p className="text-white text-xs">Updating...</p>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileText size={24} style={{ color: currentTheme.primary }} />
                  <div>
                    <h3 
                      className="font-semibold"
                      style={{ color: currentTheme.text }}
                    >
                      {document.title}
                    </h3>
                    <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                      Text Document
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(document)}
                    className="transition-colors"
                    style={{ color: currentTheme.textSecondary }}
                    disabled={deleting[document._id]}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(document._id)}
                    className="transition-colors"
                    style={{ color: currentTheme.textSecondary }}
                    disabled={deleting[document._id]}
                  >
                    {deleting[document._id] ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                      />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
              
              {document.description && (
                <p 
                  className="text-sm mb-4"
                  style={{ color: currentTheme.textSecondary }}
                >
                  {document.description}
                </p>
              )}
              
              <div className="text-xs space-y-1" style={{ color: currentTheme.textSecondary }}>
                <p>Content length: {document.content?.length || 0} characters</p>
                <p>Created: {new Date(document.createdAt).toLocaleDateString()}</p>
                {document.uploadedBy && (
                  <p>By: {document.uploadedBy.username || document.uploadedBy.email}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto mb-4" style={{ color: currentTheme.textSecondary }} />
            <h3 
              className="text-lg font-medium mb-2"
              style={{ color: currentTheme.text }}
            >
              No documents yet
            </h3>
            <p 
              className="mb-4"
              style={{ color: currentTheme.textSecondary }}
            >
              Start by adding your first text document. These will be processed for AI interactions.
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 rounded-lg text-white"
              style={{ background: currentTheme.primary }}
            >
              Add Your First Document
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="rounded-xl p-6 w-full max-w-md"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.primary}20)`,
              border: `1px solid ${currentTheme.primary}20`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 
                className="text-xl font-semibold"
                style={{ color: currentTheme.text }}
              >
                Add New Document
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                style={{ color: currentTheme.textSecondary }}
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-1"
                    style={{ color: currentTheme.text }}
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter document title"
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                    required
                  />
                </div>
                
                <div>
                  <label 
                    className="block text-sm font-medium mb-1"
                    style={{ color: currentTheme.text }}
                  >
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Brief description of the document"
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                  />
                </div>
                
                <div>
                  <label 
                    className="block text-sm font-medium mb-1"
                    style={{ color: currentTheme.text }}
                  >
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={10}
                    placeholder="Enter your document content here..."
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                    required
                  />
                  <p 
                    className="text-xs mt-1"
                    style={{ color: currentTheme.textSecondary }}
                  >
                    This content will be processed for AI interactions and search.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-opacity-10"
                  style={{
                    borderColor: currentTheme.primary,
                    color: currentTheme.primary,
                    background: 'transparent'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-4 py-2 rounded-lg text-white flex items-center justify-center space-x-2"
                  style={{
                    background: uploading ? currentTheme.primary + '80' : currentTheme.primary,
                    cursor: uploading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {uploading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    'Add Document'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="rounded-xl p-6 w-full max-w-md"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.primary}20)`,
              border: `1px solid ${currentTheme.primary}20`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 
                className="text-xl font-semibold"
                style={{ color: currentTheme.text }}
              >
                Edit Document
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                style={{ color: currentTheme.textSecondary }}
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleEdit}>
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-1"
                    style={{ color: currentTheme.text }}
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                    required
                  />
                </div>
                
                <div>
                  <label 
                    className="block text-sm font-medium mb-1"
                    style={{ color: currentTheme.text }}
                  >
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                  />
                </div>
                
                <div>
                  <label 
                    className="block text-sm font-medium mb-1"
                    style={{ color: currentTheme.text }}
                  >
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={10}
                    style={{
                      background: currentTheme.surface,
                      borderColor: currentTheme.primary + '30',
                      color: currentTheme.text
                    }}
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-opacity-10"
                  style={{
                    borderColor: currentTheme.primary,
                    color: currentTheme.primary,
                    background: 'transparent'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 px-4 py-2 rounded-lg text-white flex items-center justify-center space-x-2"
                  style={{ 
                    background: updating ? currentTheme.primary + '80' : currentTheme.primary,
                    cursor: updating ? 'not-allowed' : 'pointer'
                  }}
                >
                  {updating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Updating...</span>
                    </>
                  ) : (
                    'Update Document'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager; 