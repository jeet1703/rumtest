export type RUMEventType = 
  | 'webVital' 
  | 'error' 
  | 'networkError'
  | 'pageView'
  | 'pageSpeed'
  | 'engagement'
  | 'resourcePerformance'
  | 'userAction'
  | 'consoleLog'
  | 'longTask'
  | 'cspViolation'
  | 'customEvent';

// Web Vital metric names
export type WebVitalName = 
  | 'LCP'   // Largest Contentful Paint
  | 'FCP'   // First Contentful Paint
  | 'CLS'   // Cumulative Layout Shift
  | 'INP'   // Interaction to Next Paint
  | 'TTFB'  // Time to First Byte
  | 'FID'   // First Input Delay
  | 'TTI'   // Time to Interactive
  | 'TBT';  // Total Blocking Time

// Error severity levels
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// Breadcrumb for error context
export interface Breadcrumb {
  timestamp: number;
  type: 'navigation' | 'click' | 'console' | 'xhr' | 'custom';
  message: string;
  data?: any;
}

// Base interface for all RUM events
export interface RUMEvent {
  type: RUMEventType;
  timestamp: number;
  sessionId: string;
  userId: string;
  pageUrl: string;
  userAgent?: string;
}

// ========== WEB VITAL EVENT ==========
export interface WebVitalEvent extends RUMEvent {
  type: 'webVital';
  data: {
    name: WebVitalName;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    navigationType?: string;
  };
}

// ========== ERROR EVENT (ENHANCED) ==========
export interface ErrorEvent extends RUMEvent {
  type: 'error';
  data: {
    message: string;
    source?: string;
    lineno?: number;
    colno?: number;
    stack?: string;
    errorType: 'javascript' | 'unhandledRejection' | 'network' | 'resource';
    severity?: ErrorSeverity;
    breadcrumbs?: Breadcrumb[];
    componentStack?: string;
  };
}

// ========== NETWORK ERROR EVENT ==========
export interface NetworkErrorEvent extends RUMEvent {
  type: 'networkError';
  data: {
    url: string;
    method: string;
    statusCode?: number;
    message: string;
    duration: number;
    errorType: 'timeout' | 'failed' | 'aborted';
  };
}

// ========== PAGE VIEW EVENT ==========
export interface PageViewEvent extends RUMEvent {
  type: 'pageView';
  data: {
    pagePath: string;
    pageTitle: string;
    referrer?: string;
    previousPage?: string;
  };
}

// ========== PAGE SPEED EVENT ==========
export interface PageSpeedEvent extends RUMEvent {
  type: 'pageSpeed';
  data: {
    loadTime: number;              // Total time to load
    domContentLoaded: number;      // DOM ready time
    domInteractive: number;        // When DOM is interactive
    resourceLoadTime: number;      // Time for resources to load
    firstPaint?: number;           // First paint time
  };
}

// ========== ENGAGEMENT EVENT ==========
export interface EngagementEvent extends RUMEvent {
  type: 'engagement';
  data: {
    timeOnPage: number;            // Total time spent on page (ms)
    scrollDepth: number;           // Scroll depth percentage (0-100)
    interactionCount: number;      // Number of interactions
    exitType: 'navigation' | 'close' | 'refresh' | 'timeout';
  };
}

// ========== RESOURCE PERFORMANCE EVENT ==========
export interface ResourcePerformanceEvent extends RUMEvent {
  type: 'resourcePerformance';
  data: {
    url: string;
    resourceType: 'script' | 'stylesheet' | 'image' | 'font' | 'fetch' | 'xmlhttprequest' | 'other';
    duration: number;
    transferSize: number;
    encodedBodySize: number;
    decodedBodySize: number;
    startTime: number;
    dnsTime: number;
    tcpTime: number;
    requestTime: number;
    responseTime: number;
    cacheHit: boolean;
  };
}

// ========== USER ACTION EVENT ==========
export interface UserActionEvent extends RUMEvent {
  type: 'userAction';
  data: {
    actionType: 'click' | 'input' | 'submit' | 'scroll' | 'rageClick' | 'deadClick';
    targetElement: string;
    targetText?: string;
    targetId?: string;
    targetClass?: string;
    xPath?: string;
    value?: string;
  };
}

// ========== CONSOLE LOG EVENT ==========
export interface ConsoleLogEvent extends RUMEvent {
  type: 'consoleLog';
  data: {
    level: 'log' | 'info' | 'warn' | 'error' | 'debug';
    message: string;
    args?: any[];
  };
}

// ========== LONG TASK EVENT ==========
export interface LongTaskEvent extends RUMEvent {
  type: 'longTask';
  data: {
    duration: number;
    startTime: number;
    attribution?: string;
  };
}

// ========== CSP VIOLATION EVENT ==========
export interface CSPViolationEvent extends RUMEvent {
  type: 'cspViolation';
  data: {
    blockedURI: string;
    violatedDirective: string;
    effectiveDirective: string;
    originalPolicy: string;
    disposition: string;
    statusCode: number;
  };
}

// ========== CUSTOM EVENT ==========
export interface CustomEventType extends RUMEvent {
  type: 'customEvent';
  data: {
    eventName: string;
    properties?: Record<string, any>;
    value?: number;
  };
}

// ========== CONFIGURATION ==========
export interface SDKConfig {
  backendUrl: string;
  flushIntervalMs?: number;
  batchSize?: number;
  debug?: boolean;
  autoStart?: boolean;
  
  // Metric toggles
  metrics?: {
    webVitals?: boolean;
    pageSpeed?: boolean;
    pageViews?: boolean;
    engagement?: boolean;
    errors?: boolean;
    networkErrors?: boolean;
    resourcePerformance?: boolean;
    userActions?: boolean;
    consoleLogs?: boolean;
    longTasks?: boolean;
    cspViolations?: boolean;
    enabledVitals?: WebVitalName[];
  };
  
  // User tracking
  user?: {
    enableUserTracking?: boolean;
    userIdStorageKey?: string;
    sessionIdStorageKey?: string;
  };
  
  // User actions tracking
  userActions?: {
    trackClicks?: boolean;
    trackFormInputs?: boolean;
    trackRageClicks?: boolean;
    rageClickThreshold?: number;
    rageClickTimeWindow?: number;
  };
  
  // Console logs
  consoleLogs?: {
    captureLog?: boolean;
    captureInfo?: boolean;
    captureWarn?: boolean;
    captureError?: boolean;
    maxMessageLength?: number;
  };
  
  // Sampling
  sampling?: {
    sampleRate?: number; // 0-1
    throttleMs?: number;
  };
  
  // Privacy
  privacy?: {
    maskUserData?: boolean;
    allowedDomains?: string[];
  };
}

// Union of all event types
export type AllRUMEvents = 
  | WebVitalEvent 
  | ErrorEvent 
  | NetworkErrorEvent
  | PageViewEvent
  | PageSpeedEvent
  | EngagementEvent
  | ResourcePerformanceEvent
  | UserActionEvent
  | ConsoleLogEvent
  | LongTaskEvent
  | CSPViolationEvent
  | CustomEventType;
