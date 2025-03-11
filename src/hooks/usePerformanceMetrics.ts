
import { useEffect, useState } from 'react';

export interface PerformanceMetrics {
  firstContentfulPaint: number | null;
  largestContentfulPaint: number | null;
  firstInputDelay: number | null;
  cumulativeLayoutShift: number | null;
}

// Define the extended interfaces for Web Performance API
interface PerformanceEntryWithProcessingStart extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    firstContentfulPaint: null,
    largestContentfulPaint: null,
    firstInputDelay: null,
    cumulativeLayoutShift: null,
  });

  useEffect(() => {
    // First Contentful Paint
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
    
    if (fcp) {
      setMetrics(prev => ({ ...prev, firstContentfulPaint: fcp.startTime }));
    }

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, largestContentfulPaint: lastEntry.startTime }));
    });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const firstInput = list.getEntries()[0] as PerformanceEntryWithProcessingStart;
      setMetrics(prev => ({ ...prev, firstInputDelay: firstInput.processingStart - firstInput.startTime }));
    });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let cumulativeLayoutShift = 0;
      for (const entry of list.getEntries()) {
        if (!(entry as LayoutShiftEntry).hadRecentInput) {
          cumulativeLayoutShift += (entry as LayoutShiftEntry).value;
        }
      }
      setMetrics(prev => ({ ...prev, cumulativeLayoutShift }));
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.error('Performance metrics not supported:', e);
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return metrics;
};
