// Event types that we'll capture
export type RUMEventType = 
  | 'webVital' 
  | 'error' 
  | 'networkError';

// Web Vital metric names
export type WebVitalName = 
  | 'LCP'  // Largest Contentful Paint
  | 'FCP'  // First Contentful Paint
  | 'CLS'  // Cumulative Layout Shift
  | 'INP'  // Interaction to Next Paint
  | 'TTFB'; // Time to First Byte

// Base interface for all RUM events
export interface RUMEvent {
  type: RUMEventType;
  timestamp: number;
  sessionId: string;
  pageUrl: string;
}

// Web Vital specific event
export interface WebVitalEvent extends RUMEvent {
  type: 'webVital';
  data: {
    name: WebVitalName;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    navigationType?: string;
  };
}

// Error event
export interface ErrorEvent extends RUMEvent {
  type: 'error';
  data: {
    message: string;
    source?: string;
    lineno?: number;
    colno?: number;
    stack?: string;
    errorType: 'javascript' | 'unhandledRejection';
  };
}

// Configuration for the wrapper
export interface WrapperConfig {
  backendUrl: string;
  flushIntervalMs?: number;
  batchSize?: number;
  debug?: boolean;
  enabledMetrics?: WebVitalName[];
}

// Type for all events
export type AllRUMEvents = WebVitalEvent | ErrorEvent;
