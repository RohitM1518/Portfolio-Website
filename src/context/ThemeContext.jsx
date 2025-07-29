import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme ? JSON.parse(savedTheme) : {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#10B981',
      surface: '#111111',
      text: '#FFFFFF',
      textSecondary: '#9CA3AF',
      backgroundGradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
    };
  });

  const updateTheme = (newTheme) => {
    setCurrentTheme(newTheme);
    localStorage.setItem('portfolio-theme', JSON.stringify(newTheme));
  };

  const updateThemeColor = (colorType, color) => {
    const updatedTheme = { ...currentTheme, [colorType]: color };
    updateTheme(updatedTheme);
  };

  useEffect(() => {
    // Apply theme to CSS custom properties
    const root = document.documentElement;
    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [currentTheme]);

  const value = {
    currentTheme,
    updateTheme,
    updateThemeColor
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 