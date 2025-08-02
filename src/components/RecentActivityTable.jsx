import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  MousePointer, 
  Activity, 
  Globe, 
  BarChart3, 
  Users,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  Calendar,
  Clock
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const RecentActivityTable = () => {
  const { currentTheme } = useTheme();
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalInteractions: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 20
  });
  const [filters, setFilters] = useState({
    type: '',
    page: '',
    startDate: '',
    endDate: '',
    search: '',
    sortBy: 'timestamp',
    sortOrder: 'desc'
  });
  const [availableFilters, setAvailableFilters] = useState({
    types: [],
    pages: []
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchInteractions();
  }, [pagination.currentPage, filters]);

  const fetchInteractions = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        pageNum: pagination.currentPage,
        limit: pagination.limit,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...(filters.type && { type: filters.type }),
        ...(filters.page && { page: filters.page }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
        ...(filters.search && { search: filters.search })
      });

      console.log('Fetching interactions with query:', queryParams.toString());

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/interactions/all?${queryParams}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch interactions');
      }

      const data = await response.json();
      console.log('Interactions response:', data);
      
      setInteractions(data.data.interactions);
      setPagination(data.data.pagination);
      setAvailableFilters(data.data.filters);
    } catch (err) {
      console.error('Error fetching interactions:', err);
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
      type: '',
      page: '',
      startDate: '',
      endDate: '',
      search: '',
      sortBy: 'timestamp',
      sortOrder: 'desc'
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
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
      resume_download: <Download size={16} />,
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

  const formatInteractionType = (type) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold" style={{ color: currentTheme.text }}>
              Recent Activity
            </h3>
            <span className="text-sm px-2 py-1 rounded-full" style={{ 
              background: currentTheme.primary + '20', 
              color: currentTheme.primary 
            }}>
              {pagination.totalInteractions} total
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: currentTheme.textSecondary }} />
              <input
                type="text"
                placeholder="Search interactions..."
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
              onClick={fetchInteractions}
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
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                Interaction Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border transition-colors"
                style={{
                  background: currentTheme.surface,
                  borderColor: currentTheme.primary + '30',
                  color: currentTheme.text
                }}
              >
                <option value="">All Types</option>
                {availableFilters.types.map(type => (
                  <option key={type} value={type}>
                    {formatInteractionType(type)}
                  </option>
                ))}
              </select>
            </div>

            {/* Page Filter */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                Page
              </label>
              <select
                value={filters.page}
                onChange={(e) => handleFilterChange('page', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border transition-colors"
                style={{
                  background: currentTheme.surface,
                  borderColor: currentTheme.primary + '30',
                  color: currentTheme.text
                }}
              >
                <option value="">All Pages</option>
                {availableFilters.pages.map(page => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
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

          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 pt-4 border-t" style={{ borderColor: currentTheme.primary + '20' }}>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                Sort by:
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 py-1 rounded border text-sm"
                style={{
                  background: currentTheme.surface,
                  borderColor: currentTheme.primary + '30',
                  color: currentTheme.text
                }}
              >
                <option value="timestamp">Date</option>
                <option value="type">Type</option>
                <option value="page">Page</option>
                <option value="ipAddress">IP Address</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                Order:
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="px-3 py-1 rounded border text-sm"
                style={{
                  background: currentTheme.surface,
                  borderColor: currentTheme.primary + '30',
                  color: currentTheme.text
                }}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="px-3 py-1 rounded text-sm transition-colors"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              Clear Filters
            </button>
          </div>
        </motion.div>
      )}

      {/* Table - Mobile Responsive */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentTheme.textSecondary }}>
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell" style={{ color: currentTheme.textSecondary }}>
                    Page
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell" style={{ color: currentTheme.textSecondary }}>
                    Element
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell" style={{ color: currentTheme.textSecondary }}>
                    IP Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentTheme.textSecondary }}>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" style={{ color: currentTheme.primary }}></div>
                        <span style={{ color: currentTheme.textSecondary }}>Loading interactions...</span>
                      </div>
                    </td>
                  </tr>
                ) : interactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <Activity size={32} style={{ color: currentTheme.textSecondary }} />
                        <span style={{ color: currentTheme.textSecondary }}>No interactions found</span>
                        <span className="text-sm" style={{ color: currentTheme.textSecondary }}>
                          {pagination.totalInteractions === 0 
                            ? "No interactions have been recorded yet. Start browsing the website to see activity here."
                            : "Try adjusting your filters or search terms"
                          }
                        </span>
                        {pagination.totalInteractions > 0 && (
                          <span className="text-xs" style={{ color: currentTheme.textSecondary }}>
                            Total interactions: {pagination.totalInteractions}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  interactions.map((interaction) => (
                    <tr
                      key={interaction._id}
                      className="transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ background: getInteractionColor(interaction.type) + '20' }}
                          >
                            {getInteractionIcon(interaction.type)}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium capitalize text-sm" style={{ color: currentTheme.text }}>
                              {formatInteractionType(interaction.type)}
                            </span>
                            {/* Show page info on mobile */}
                            <span className="text-xs sm:hidden" style={{ color: currentTheme.textSecondary }}>
                              {interaction.page}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className="text-sm" style={{ color: currentTheme.text }}>{interaction.page}</span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-sm" style={{ color: currentTheme.textSecondary }}>
                          {interaction.element || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="font-mono text-xs" style={{ color: currentTheme.textSecondary }}>
                          {interaction.ipAddress}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <Clock size={14} style={{ color: currentTheme.textSecondary }} />
                          <span className="text-xs sm:text-sm" style={{ color: currentTheme.textSecondary }}>
                            {formatDate(interaction.timestamp)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination - Mobile Responsive */}
      {pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-center sm:text-left" style={{ color: currentTheme.textSecondary }}>
            Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.limit, pagination.totalInteractions)} of{' '}
            {pagination.totalInteractions} interactions
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
    </div>
  );
};

export default RecentActivityTable; 