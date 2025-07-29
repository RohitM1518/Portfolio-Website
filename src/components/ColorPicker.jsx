import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ColorPicker = () => {
  const { currentTheme, updateTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('primary');
  const pickerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Force re-render when theme changes
  useEffect(() => {
    // This ensures the component updates when currentTheme changes
  }, [currentTheme]);

  const primaryColors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F97316', '#EF4444', '#EC4899',
    '#06B6D4', '#F59E0B', '#84CC16', '#6366F1', '#8B5CF6', '#F43F5E'
  ];

  const backgroundGradients = [
    {
      name: 'Solid Dark',
      gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      preview: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
    },
    {
      name: 'Gradient Dark',
      gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      preview: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
    },
    {
      name: 'Ocean Blue',
      gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      preview: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
    },
    {
      name: 'Purple Dream',
      gradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
      preview: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)'
    },
    {
      name: 'Emerald',
      gradient: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
      preview: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)'
    },
    {
      name: 'Sunset',
      gradient: 'linear-gradient(135deg, #7C2D12 0%, #991B1B 100%)',
      preview: 'linear-gradient(135deg, #7C2D12 0%, #991B1B 100%)'
    },
    {
      name: 'Forest',
      gradient: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
      preview: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)'
    },
    {
      name: 'Midnight',
      gradient: 'linear-gradient(135deg, #0B1426 0%, #1E293B 50%, #334155 100%)',
      preview: 'linear-gradient(135deg, #0B1426 0%, #1E293B 50%, #334155 100%)'
    },
    {
      name: 'Space',
      gradient: 'linear-gradient(135deg, #0B1426 0%, #1E293B 50%, #334155 100%)',
      preview: 'linear-gradient(135deg, #0B1426 0%, #1E293B 50%, #334155 100%)'
    },
    {
      name: 'Aurora',
      gradient: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
      preview: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)'
    }
  ];

  const presetThemes = [
    {
      name: 'Ocean Blue',
      colors: {
        primary: '#3B82F6',
        backgroundGradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
      }
    },
    {
      name: 'Purple Dream',
      colors: {
        primary: '#8B5CF6',
        backgroundGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)'
      }
    },
    {
      name: 'Emerald',
      colors: {
        primary: '#10B981',
        backgroundGradient: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)'
      }
    },
    {
      name: 'Sunset',
      colors: {
        primary: '#F97316',
        backgroundGradient: 'linear-gradient(135deg, #7C2D12 0%, #991B1B 100%)'
      }
    },
    {
      name: 'Forest',
      colors: {
        primary: '#10B981',
        backgroundGradient: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)'
      }
    },
    {
      name: 'Midnight',
      colors: {
        primary: '#6366F1',
        backgroundGradient: 'linear-gradient(135deg, #0B1426 0%, #1E293B 50%, #334155 100%)'
      }
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll on mobile when picker is open
      if (isMobile) {
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      if (isMobile) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, isMobile]);

  const applyPresetTheme = (theme) => {
    // Update all theme colors at once
    const updatedTheme = { ...currentTheme, ...theme.colors };
    updateTheme(updatedTheme);
  };

  const tabs = [
    { id: 'primary', label: 'Primary' },
    { id: 'background', label: 'Background' },
    { id: 'presets', label: 'Presets' }
  ];

  return (
    <div className="relative" ref={pickerRef}>
      {/* Color Picker Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Open color picker"
      >
        <Palette size={20} className="text-white" />
        
        {/* Theme preview dots - show both primary and background */}
        <div className="absolute -top-1 -right-1 flex space-x-1">
          <div 
            className="w-2 h-2 rounded-full border border-white/30"
            style={{ backgroundColor: currentTheme.primary }}
          />
          <div 
            className="w-2 h-2 rounded-full border border-white/30"
            style={{ background: currentTheme.backgroundGradient }}
          />
        </div>
      </motion.button>

      {/* Color Picker Dropdown/Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Full Screen Overlay */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[9999]"
                onClick={() => setIsOpen(false)}
              />
            )}
            
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: 0.95, 
                y: isMobile ? 50 : -10,
                x: isMobile ? 0 : 'auto'
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                x: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.95, 
                y: isMobile ? 50 : -10,
                x: isMobile ? 0 : 'auto'
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`${
                isMobile 
                  ? 'fixed inset-4 top-16 bottom-4 z-[10000] w-auto' 
                  : 'absolute right-0 top-full mt-2 w-80 sm:w-96'
              } backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden`}
              style={{
                maxHeight: isMobile ? 'calc(100vh - 8rem)' : 'calc(100vh - 200px)',
                overflowY: 'auto',
                maxWidth: isMobile ? 'calc(100vw - 2rem)' : 'calc(100vw - 2rem)',
                background: `rgba(0, 0, 0, 0.20)`,
                backdropFilter: 'blur(10px)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white font-semibold text-sm">Theme Customizer</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 text-xs font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-white border-b-2 border-white'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4">
                <AnimatePresence mode="wait">
                  {activeTab === 'primary' && (
                    <motion.div
                      key="primary"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="text-white/80 text-xs font-medium mb-3 uppercase tracking-wider">
                        Primary Color
                      </h4>
                      
                      {/* Color Picker */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div
                          className="w-8 h-8 rounded-lg border-2 border-white/20 cursor-pointer"
                          style={{ backgroundColor: currentTheme.primary }}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'color';
                            input.value = currentTheme.primary;
                            input.onchange = (e) => updateTheme({ ...currentTheme, primary: e.target.value });
                            input.click();
                          }}
                        />
                        <input
                          type="text"
                          value={currentTheme.primary}
                          onChange={(e) => updateTheme({ ...currentTheme, primary: e.target.value })}
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-mono"
                          placeholder="#000000"
                          key={`primary-input-${currentTheme.primary}`}
                        />
                      </div>

                      {/* Predefined Colors */}
                      <div>
                        <h5 className="text-white/60 text-xs font-medium mb-2">Quick Colors</h5>
                        <div className="grid grid-cols-6 gap-2">
                          {primaryColors.map((color) => (
                            <button
                              key={color}
                              onClick={() => updateTheme({ ...currentTheme, primary: color })}
                              className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                                currentTheme.primary === color
                                  ? 'border-white/40 scale-110'
                                  : 'border-white/20 hover:scale-105'
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'background' && (
                    <motion.div
                      key="background"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="text-white/80 text-xs font-medium mb-3 uppercase tracking-wider">
                        Page Background
                      </h4>
                      
                      {/* Color Picker */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div
                          className="w-8 h-8 rounded-lg border-2 border-white/20 cursor-pointer"
                          style={{ background: currentTheme.backgroundGradient }}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'color';
                            input.value = '#000000';
                            input.onchange = (e) => {
                              const color = e.target.value;
                              const gradient = `linear-gradient(135deg, ${color} 0%, ${color}22 100%)`;
                              updateTheme({ ...currentTheme, backgroundGradient: gradient });
                            };
                            input.click();
                          }}
                        />
                        <input
                          type="text"
                          value={currentTheme.backgroundGradient}
                          onChange={(e) => updateTheme({ ...currentTheme, backgroundGradient: e.target.value })}
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-mono"
                          placeholder="linear-gradient(...)"
                          key={`background-${currentTheme.backgroundGradient}`}
                        />
                      </div>

                      {/* Predefined Gradients */}
                      <div>
                        <h5 className="text-white/60 text-xs font-medium mb-2">Quick Gradients</h5>
                        <div className={`grid gap-2 ${
                          isMobile ? 'grid-cols-1' : 'grid-cols-2'
                        } max-h-48 overflow-y-auto`}>
                          {backgroundGradients.map((bg) => (
                            <button
                              key={bg.name}
                              onClick={() => updateTheme({ ...currentTheme, backgroundGradient: bg.gradient })}
                              className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                                currentTheme.backgroundGradient === bg.gradient
                                  ? 'border-white/40 bg-white/10'
                                  : 'border-white/20 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <div className="w-full h-4 rounded mb-1" style={{ background: bg.preview }}></div>
                              <p className="text-xs text-white/80 truncate">{bg.name}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'presets' && (
                    <motion.div
                      key="presets"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="text-white/80 text-xs font-medium mb-3 uppercase tracking-wider">
                        Preset Themes
                      </h4>
                      
                      <div className={`grid gap-3 ${
                        isMobile ? 'grid-cols-1' : 'grid-cols-2'
                      }`}>
                        {presetThemes.map((theme) => (
                          <motion.button
                            key={theme.name}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => applyPresetTheme(theme)}
                            className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 text-left"
                          >
                            {/* Color Preview */}
                            <div className="flex items-center space-x-2 mb-3">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: theme.colors.primary }}
                              />
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ background: theme.colors.backgroundGradient }}
                              />
                            </div>
                            <p className="text-white/80 text-sm font-medium">{theme.name}</p>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker; 