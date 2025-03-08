
/**
 * A simple utility for tracking performance metrics
 */

// Track the initial page load time
export const trackPageLoad = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const timing = window.performance.timing;
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
      
      // More detailed metrics
      const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
      console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
      
      const resourceLoad = timing.loadEventEnd - timing.domContentLoadedEventEnd;
      console.log(`Resource loading time: ${resourceLoad}ms`);
      
      // Report to any analytics service here if needed
    });
  }
};

// Track component render time
export const trackComponentRender = (componentName: string) => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    console.log(`${componentName} render time: ${endTime - startTime}ms`);
  };
};

// Track resource loading
export const trackResourceLoad = (resourceUrl: string) => {
  const entry = performance.getEntriesByName(resourceUrl);
  if (entry.length > 0) {
    console.log(`Resource ${resourceUrl} loaded in ${entry[0].duration}ms`);
  }
};

// Initialize performance tracking
export const initPerformanceTracking = () => {
  trackPageLoad();
  
  // Observe long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('Long task detected:', entry.duration);
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('PerformanceObserver for longtask not supported');
    }
  }
};
