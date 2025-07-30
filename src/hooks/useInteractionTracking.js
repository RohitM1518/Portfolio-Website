import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import interactionTracker from '../lib/interactionTracker.js';

// Hook for tracking page visits and scroll depth
export const usePageTracking = (pageName) => {
  const location = useLocation();
  const startTime = useRef(Date.now());
  const maxScrollDepth = useRef(0);
  const hasTrackedVisit = useRef(false);

  // Track page visit when component mounts
  useEffect(() => {
    if (!hasTrackedVisit.current) {
      interactionTracker.trackPageVisit(pageName, {
        referrer: document.referrer,
        timeSpent: 0
      });
      hasTrackedVisit.current = true;
    }
  }, [pageName]);

  // Track time spent when component unmounts
  useEffect(() => {
    return () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      if (timeSpent > 5) { // Only track if spent more than 5 seconds
        interactionTracker.trackTimeSpent(pageName, timeSpent);
      }
    };
  }, [pageName]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollDepth > maxScrollDepth.current) {
        maxScrollDepth.current = scrollDepth;
        // Track every 25% scroll depth
        if (scrollDepth % 25 === 0) {
          interactionTracker.trackScrollDepth(pageName, scrollDepth);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageName]);

  return {
    trackButtonClick: useCallback((element, metadata = {}) => {
      return interactionTracker.trackButtonClick(pageName, element, metadata);
    }, [pageName]),
    
    trackLinkClick: useCallback((element, metadata = {}) => {
      return interactionTracker.trackLinkClick(pageName, element, metadata);
    }, [pageName]),
    
    trackFormSubmission: useCallback((element, metadata = {}) => {
      return interactionTracker.trackFormSubmission(pageName, element, metadata);
    }, [pageName]),
    
    trackProjectView: useCallback((projectName, metadata = {}) => {
      return interactionTracker.trackProjectView(pageName, projectName, metadata);
    }, [pageName]),
    
    trackSkillView: useCallback((skillName, metadata = {}) => {
      return interactionTracker.trackSkillView(pageName, skillName, metadata);
    }, [pageName]),
    
    trackSocialMediaClick: useCallback((platform, metadata = {}) => {
      return interactionTracker.trackSocialMediaClick(pageName, platform, metadata);
    }, [pageName]),
    
    trackContactFormInteraction: useCallback((action, metadata = {}) => {
      return interactionTracker.trackContactFormInteraction(pageName, action, metadata);
    }, [pageName])
  };
};

// Hook for tracking resume downloads
export const useResumeTracking = () => {
  const trackResumeDownload = useCallback((page = 'resume', element = 'download_button', metadata = {}) => {
    return interactionTracker.trackResumeDownload(page, element, metadata);
  }, []);

  return { trackResumeDownload };
};

// Hook for general interaction tracking
export const useInteractionTracking = () => {
  return {
    trackResumeDownload: useCallback((page, element, metadata) => {
      return interactionTracker.trackResumeDownload(page, element, metadata);
    }, []),
    
    trackPageVisit: useCallback((page, metadata) => {
      return interactionTracker.trackPageVisit(page, metadata);
    }, []),
    
    trackButtonClick: useCallback((page, element, metadata) => {
      return interactionTracker.trackButtonClick(page, element, metadata);
    }, []),
    
    trackFormSubmission: useCallback((page, element, metadata) => {
      return interactionTracker.trackFormSubmission(page, element, metadata);
    }, []),
    
    trackLinkClick: useCallback((page, element, metadata) => {
      return interactionTracker.trackLinkClick(page, element, metadata);
    }, []),
    
    trackScrollDepth: useCallback((page, depth, metadata) => {
      return interactionTracker.trackScrollDepth(page, depth, metadata);
    }, []),
    
    trackTimeSpent: useCallback((page, timeSpent, metadata) => {
      return interactionTracker.trackTimeSpent(page, timeSpent, metadata);
    }, []),
    
    trackProjectView: useCallback((page, projectName, metadata) => {
      return interactionTracker.trackProjectView(page, projectName, metadata);
    }, []),
    
    trackSocialMediaClick: useCallback((page, platform, metadata) => {
      return interactionTracker.trackSocialMediaClick(page, platform, metadata);
    }, []),
    
    trackSkillView: useCallback((page, skillName, metadata) => {
      return interactionTracker.trackSkillView(page, skillName, metadata);
    }, []),
    
    trackContactFormInteraction: useCallback((page, action, metadata) => {
      return interactionTracker.trackContactFormInteraction(page, action, metadata);
    }, [])
  };
}; 