
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const PerformanceMonitor = () => {
  const metrics = usePerformanceMetrics();

  useEffect(() => {
    // Log performance metrics
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', metrics);

      // Alert if performance metrics are concerning
      if (metrics.firstContentfulPaint && metrics.firstContentfulPaint > 2000) {
        toast.warning('Slow First Contentful Paint detected');
      }
      if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > 2500) {
        toast.warning('Slow Largest Contentful Paint detected');
      }
      if (metrics.firstInputDelay && metrics.firstInputDelay > 100) {
        toast.warning('High First Input Delay detected');
      }
      if (metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > 0.1) {
        toast.warning('High Cumulative Layout Shift detected');
      }
    }
  }, [metrics]);

  return null; // This is a monitoring component, it doesn't render anything
};

export default PerformanceMonitor;
