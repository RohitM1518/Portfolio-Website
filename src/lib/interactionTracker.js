// Interaction Tracker for Portfolio Website
// This utility handles all user interaction tracking with the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api/v1';

class InteractionTracker {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.baseUrl = API_BASE_URL;
  }

  // Generate a unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Generic method to track interactions
  async trackInteraction(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}/interactions/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          sessionId: this.sessionId
        })
      });
      
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error(`❌ Error tracking ${endpoint}:`, error);
      // Don't throw error to avoid breaking user experience
      return null;
    }
  }

  // Track resume download
  async trackResumeDownload(page = 'resume', element = 'download_button', metadata = {}) {
    return this.trackInteraction('resume-download', {
      page,
      element,
      metadata: {
        ...metadata,
        downloadTime: new Date().toISOString(),
        fileType: 'pdf',
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });
  }

  // Track page visit
  async trackPageVisit(page, metadata = {}) {
    return this.trackInteraction('page-visit', {
      page,
      metadata: {
        ...metadata,
        referrer: document.referrer,
        visitTime: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language
      }
    });
  }

  // Track button click
  async trackButtonClick(page, element, metadata = {}) {
    return this.trackInteraction('button-click', {
      page,
      element,
      metadata: {
        ...metadata,
        clickTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });
  }

  // Track form submission
  async trackFormSubmission(page, element, metadata = {}) {
    return this.trackInteraction('form-submission', {
      page,
      element,
      metadata: {
        ...metadata,
        submissionTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });
  }

  // Track link click
  async trackLinkClick(page, element, metadata = {}) {
    return this.trackInteraction('track', {
      type: 'link_click',
      page,
      element,
      metadata: {
        ...metadata,
        clickTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });
  }

  // Track scroll depth
  async trackScrollDepth(page, depth, metadata = {}) {
    return this.trackInteraction('track', {
      type: 'scroll_depth',
      page,
      metadata: {
        ...metadata,
        depth,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });
  }

  // Track time spent on page
  async trackTimeSpent(page, timeSpent, metadata = {}) {
    return this.trackInteraction('track', {
      type: 'time_spent',
      page,
      metadata: {
        ...metadata,
        timeSpent,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });
  }

  // Track project view
  async trackProjectView(page, projectName, metadata = {}) {
    return this.trackInteraction('track', {
      type: 'project_view',
      page,
      element: 'project_card',
      metadata: {
        ...metadata,
        projectName,
        viewTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });
  }

  // Track social media click
  async trackSocialMediaClick(page, platform, metadata = {}) {
    return this.trackInteraction('track', {
      type: 'social_media_click',
      page,
      element: 'social_link',
      metadata: {
        ...metadata,
        platform,
        clickTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });
  }

  // Track skill view
  async trackSkillView(page, skillName, metadata = {}) {
    return this.trackInteraction('track', {
      type: 'skill_view',
      page,
      element: 'skill_card',
      metadata: {
        ...metadata,
        skillName,
        viewTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });
  }

  // Track contact form interaction
  async trackContactFormInteraction(page, action, metadata = {}) {
    return this.trackInteraction('track', {
      type: 'contact_form',
      page,
      element: 'contact_form',
      metadata: {
        ...metadata,
        action,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });
  }
}

// Create a singleton instance
const interactionTracker = new InteractionTracker();

export default interactionTracker; 