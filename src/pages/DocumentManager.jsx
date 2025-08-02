import React, { useState, useEffect } from 'react';
import { FileText, Trash2, Edit, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
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
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    setUploading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/upload`, {
        method: 'POST',
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

      const data = await response.json();
      if (data.success) {
        setDocuments(prev => [data.data, ...prev]);
        setShowUploadModal(false);
        setFormData({ title: '', description: '', content: '' });
        alert('Document uploaded successfully!');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error uploading document: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedDocument || !formData.title) {
      alert('Please fill in all required fields');
      return;
    }

    try {
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

      const data = await response.json();
      if (data.success) {
        setDocuments(prev => prev.map(doc => 
          doc._id === selectedDocument._id ? data.data : doc
        ));
        setShowEditModal(false);
        setSelectedDocument(null);
        setFormData({ title: '', description: '', content: '' });
        alert('Document updated successfully!');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Error updating document: ' + error.message);
    }
  };

  const handleDelete = async (documentId) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

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
        alert('Document deleted successfully!');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document: ' + error.message);
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
              className="rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{ 
                background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.primary}20)`,
                border: `1px solid ${currentTheme.primary}20`,
                backdropFilter: 'blur(10px)'
              }}
            >
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
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(document._id)}
                    className="transition-colors"
                    style={{ color: currentTheme.textSecondary }}
                  >
                    <Trash2 size={16} />
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
                  className="flex-1 px-4 py-2 rounded-lg text-white"
                  style={{
                    background: uploading ? currentTheme.disabled : currentTheme.primary
                  }}
                >
                  {uploading ? 'Processing...' : 'Add Document'}
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
                  className="flex-1 px-4 py-2 rounded-lg text-white"
                  style={{ background: currentTheme.primary }}
                >
                  Update Document
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