
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initPerformanceTracking } from './lib/performance'

// Initialize performance tracking
initPerformanceTracking();

// Add performance mark for initial load
performance.mark('app-start');

const root = createRoot(document.getElementById("root")!);

// Use automatic batching for all updates
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure initial render time
performance.measure('initial-render', 'app-start');
