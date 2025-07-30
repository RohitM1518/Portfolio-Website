# Frontend Tracking Integration

This document explains how user interaction tracking has been integrated into the portfolio website frontend.

## Overview

The frontend now includes comprehensive tracking for user interactions including:
- Page visits and time spent
- Button clicks and navigation
- Form submissions
- Resume downloads
- Project views and link clicks
- Social media interactions
- Scroll depth tracking

## Files Added/Modified

### New Files
- `src/lib/interactionTracker.js` - Core tracking utility
- `src/hooks/useInteractionTracking.js` - React hooks for tracking
- `src/components/TrackingTest.jsx` - Development testing component

### Modified Files
- `src/pages/Resume.jsx` - Added resume download tracking
- `src/pages/Contact.jsx` - Added form submission and social media tracking
- `src/pages/Projects.jsx` - Added project view and link click tracking
- `src/pages/Home.jsx` - Added button click tracking
- `src/components/Header.jsx` - Added navigation tracking
- `src/App.jsx` - Added development testing component

## Usage

### Basic Page Tracking
```javascript
import { usePageTracking } from '../hooks/useInteractionTracking.js';

const MyPage = () => {
  const { trackButtonClick, trackLinkClick } = usePageTracking('page_name');
  
  // Automatically tracks:
  // - Page visit when component mounts
  // - Time spent when component unmounts
  // - Scroll depth every 25%
  
  return (
    <button onClick={() => trackButtonClick('button_id', { metadata: 'value' })}>
      Click Me
    </button>
  );
};
```

### Resume Download Tracking
```javascript
import { useResumeTracking } from '../hooks/useInteractionTracking.js';

const ResumeSection = () => {
  const { trackResumeDownload } = useResumeTracking();
  
  const handleDownload = () => {
    trackResumeDownload('resume', 'download_button', {
      resumeVersion: '2024',
      format: 'PDF'
    });
    // Actual download logic
  };
};
```

### General Tracking
```javascript
import { useInteractionTracking } from '../hooks/useInteractionTracking.js';

const MyComponent = () => {
  const { 
    trackButtonClick,
    trackFormSubmission,
    trackProjectView,
    trackSocialMediaClick 
  } = useInteractionTracking();
  
  // Track various interactions
};
```

## Tracking Events

### Page Visits
- **When**: Automatically when page component mounts
- **Data**: Page name, referrer, user agent, screen resolution, language

### Button Clicks
- **When**: User clicks any tracked button
- **Data**: Button element, page, metadata

### Form Submissions
- **When**: Contact form is submitted
- **Data**: Form type, field completion status, message length

### Resume Downloads
- **When**: Resume download button is clicked
- **Data**: File type, version, download time

### Project Views
- **When**: User hovers over project cards
- **Data**: Project name, technologies, links availability

### Link Clicks
- **When**: User clicks GitHub/Live links on projects
- **Data**: Project name, link type, URL

### Social Media Clicks
- **When**: User clicks social media links
- **Data**: Platform, URL

### Scroll Depth
- **When**: User scrolls 25%, 50%, 75%, 100%
- **Data**: Scroll percentage, page

### Time Spent
- **When**: User leaves page (after 5+ seconds)
- **Data**: Time spent in seconds, page

## Development Testing

A testing component is available in development mode:
- Shows as a blue "🧪 Test Tracking" button in bottom-right corner
- Only visible when `import.meta.env.DEV` is true
- Tests all tracking functions when clicked

## Environment Variables

The tracking system uses:
- `VITE_API_URL` - Backend API URL (default: http://localhost:8001/api/v1)

## Error Handling

- Tracking errors are logged to console but don't break user experience
- Network failures are handled gracefully
- Session IDs are generated for user journey tracking

## Data Privacy

The system tracks:
- ✅ User interactions and behavior
- ✅ Technical information (browser, screen size)
- ✅ Session IDs for journey tracking
- ❌ Personal information
- ❌ Sensitive data

## Backend Integration

All tracking data is sent to the backend endpoints:
- `POST /api/v1/interactions/resume-download`
- `POST /api/v1/interactions/page-visit`
- `POST /api/v1/interactions/button-click`
- `POST /api/v1/interactions/form-submission`
- `POST /api/v1/interactions/track` (for custom events)

## Analytics Available

The backend provides analytics endpoints:
- `GET /api/v1/interactions/stats` - Overall statistics
- `GET /api/v1/interactions/resume-downloads` - Resume download analytics

## Future Enhancements

Potential improvements:
- A/B testing support
- Conversion funnel tracking
- Heatmap integration
- Real-time analytics dashboard
- Email notifications for important events 