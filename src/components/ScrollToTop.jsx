import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Only scroll if the pathname actually changed
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      
      // Use multiple approaches to ensure it works
      const scrollToTop = () => {
        // Method 1: Modern scrollTo with smooth behavior
        if (window.scrollTo) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }

        // Method 2: Direct scrollTop assignment
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        
        if (document.body) {
          document.body.scrollTop = 0;
        }

        // Method 3: Force scroll after a small delay
        setTimeout(() => {
          if (window.scrollY > 0) {
            window.scrollTo(0, 0);
          }
        }, 50);
      };

      // Execute immediately
      scrollToTop();
      
      // Also try after a longer delay to handle any async rendering
      const timeoutId = setTimeout(scrollToTop, 200);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop; 