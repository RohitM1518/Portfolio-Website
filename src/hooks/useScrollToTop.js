import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to handle scroll to top on route changes
 * Can be used in individual components if needed
 */
export const useScrollToTop = (dependencies = []) => {
  const location = useLocation();

  const scrollToTop = useCallback((smooth = true) => {
    // Try multiple methods to ensure it works across different browsers
    if (window.scrollTo) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: smooth ? 'smooth' : 'auto'
      });
    } else {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
    
    // Also try scrolling the document element
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    
    // And the body element
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    // Small delay to ensure route transition is complete
    const timeoutId = setTimeout(() => scrollToTop(), 100);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.search, location.hash, ...dependencies]);

  return { scrollToTop };
};

/**
 * Hook to scroll to top immediately (useful for button clicks)
 */
export const useScrollToTopImmediate = () => {
  const scrollToTop = useCallback(() => {
    if (window.scrollTo) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
    
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, []);

  return scrollToTop;
}; 