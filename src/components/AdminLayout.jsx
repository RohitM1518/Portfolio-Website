import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { Header, Footer, ScrollToTop } from './index.js';

const AdminLayout = () => {
  return (
    <ThemeProvider>
      <div className='min-h-screen relative' style={{ background: 'var(--color-backgroundGradient)', color: 'var(--color-text)' }}>
        <ScrollToTop />
        
        {/* Matrix Background Effect */}
        <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>
        
        <div className="relative z-10">
          <Header />
          <div className='w-full h-20'></div>
          <Outlet />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout; 