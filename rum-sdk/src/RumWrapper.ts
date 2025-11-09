import { 
  WrapperConfig, 
  AllRUMEvents, 
  WebVitalEvent, 
  ErrorEvent,
  WebVitalName 
} from './types.js';

export class RUMWrapper {
  private eventsQueue: AllRUMEvents[] = [];
  private config: Required<WrapperConfig>;
  private flushTimerId: number | null = null;
  private sessionId: string;
  private observers: PerformanceObserver[] = [];
  private isRunning: boolean = false;

  constructor(config: WrapperConfig) {
    // Set defaults for optional config
    this.config = {
      backendUrl: config.backendUrl,
      flushIntervalMs: config.flushIntervalMs || 5000,
      batchSize: config.batchSize || 50,
      debug: config.debug || false,
      enabledMetrics: config.enabledMetrics || ['LCP', 'FCP', 'CLS', 'INP', 'TTFB'],
    };

    // Generate unique session ID
    this.sessionId = this.generateSessionId();
    
    this.log('RUM Wrapper initialized with config:', this.config);
    this.start();
  }

  /**
   * Start monitoring and collecting metrics
   */
  public start(): void {
    if (this.isRunning) {
      this.log('Wrapper already running');
      return;
    }

    this.log('Starting RUM monitoring...');
    this.isRunning = true;

    // Initialize all enabled metrics
    if (this.config.enabledMetrics.includes('LCP')) {
      this.initLCP();
    }
    if (this.config.enabledMetrics.includes('FCP')) {
      this.initFCP();
    }
    if (this.config.enabledMetrics.includes('CLS')) {
      this.initCLS();
    }
    if (this.config.enabledMetrics.includes('INP')) {
      this.initINP();
    }
    if (this.config.enabledMetrics.includes('TTFB')) {
      this.initTTFB();
    }

    // Initialize error tracking
    this.initErrorListeners();

    // Start periodic flush
    this.startPeriodicFlush();
  }

  /**
   * Stop monitoring and flush remaining events
   */
  public stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.log('Stopping RUM monitoring...');
    this.isRunning = false;

    // Clear flush timer
    if (this.flushTimerId) {
      clearInterval(this.flushTimerId);
      this.flushTimerId = null;
    }

    // Disconnect all observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    // Flush any remaining events
    this.flushEvents();
  }

  /**
   * Initialize Largest Contentful Paint (LCP) tracking
   */
  private initLCP(): void {
    if (!('PerformanceObserver' in window)) {
      this.log('PerformanceObserver not supported');
      return;
    }

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;

        if (lastEntry) {
          const value = lastEntry.renderTime || lastEntry.loadTime;
          this.enqueueWebVital('LCP', value);
          this.log('LCP captured:', value);
        }
      });

      observer.observe({ 
        type: 'largest-contentful-paint', 
        buffered: true 
      });

      this.observers.push(observer);
    } catch (e) {
      this.log('Error initializing LCP:', e);
    }
  }

  /**
   * Initialize First Contentful Paint (FCP) tracking
   */
  private initFCP(): void {
    if (!('PerformanceObserver' in window)) {
      return;
    }

    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.enqueueWebVital('FCP', entry.startTime);
            this.log('FCP captured:', entry.startTime);
          }
        });
      });

      observer.observe({ 
        type: 'paint', 
        buffered: true 
      });

      this.observers.push(observer);
    } catch (e) {
      this.log('Error initializing FCP:', e);
    }
  }

  /**
   * Initialize Cumulative Layout Shift (CLS) tracking
   */
  private initCLS(): void {
    if (!('PerformanceObserver' in window)) {
      return;
    }

    let clsValue = 0;

    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.log('CLS update:', clsValue);
          }
        });
      });

      observer.observe({ 
        type: 'layout-shift', 
        buffered: true 
      });

      this.observers.push(observer);

      // Report CLS when page visibility changes or unloads
      const reportCLS = () => {
        if (clsValue > 0) {
          this.enqueueWebVital('CLS', clsValue);
          this.log('Final CLS captured:', clsValue);
        }
      };

      window.addEventListener('visibilitychange', reportCLS);
      window.addEventListener('pagehide', reportCLS);
    } catch (e) {
      this.log('Error initializing CLS:', e);
    }
  }

  /**
   * Initialize Interaction to Next Paint (INP) tracking
   */
  private initINP(): void {
    if (!('PerformanceObserver' in window)) {
      return;
    }

    let longestInteraction = 0;

    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          // Track the longest interaction duration
          if (entry.duration > longestInteraction) {
            longestInteraction = entry.duration;
            this.log('INP update:', longestInteraction);
          }
        });
      });

      observer.observe({ 
        type: 'event', 
        buffered: true,
      });

      this.observers.push(observer);

      // Report INP on page visibility change or unload
      const reportINP = () => {
        if (longestInteraction > 0) {
          this.enqueueWebVital('INP', longestInteraction);
          this.log('Final INP captured:', longestInteraction);
        }
      };

      window.addEventListener('visibilitychange', reportINP);
      window.addEventListener('pagehide', reportINP);
    } catch (e) {
      this.log('Error initializing INP:', e);
    }
  }

  /**
   * Initialize Time to First Byte (TTFB) tracking
   */
  private initTTFB(): void {
    try {
      // Use Navigation Timing API
      const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
      
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        this.enqueueWebVital('TTFB', ttfb);
        this.log('TTFB captured:', ttfb);
      }
    } catch (e) {
      this.log('Error initializing TTFB:', e);
    }
  }

  /**
   * Initialize error listeners
   */
  private initErrorListeners(): void {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.enqueueError({
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        errorType: 'javascript',
      });
      this.log('JS Error captured:', event.message);
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.enqueueError({
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        errorType: 'unhandledRejection',
      });
      this.log('Unhandled Rejection captured:', event.reason);
    });
  }

  /**
   * Add a web vital event to the queue
   */
  private enqueueWebVital(name: WebVitalName, value: number): void {
    const rating = this.getRating(name, value);
    
    const event: WebVitalEvent = {
      type: 'webVital',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      pageUrl: window.location.href,
      data: {
        name,
        value,
        rating,
        navigationType: this.getNavigationType(),
      },
    };

    this.eventsQueue.push(event);
    this.checkBatchSize();
  }

  /**
   * Add an error event to the queue
   */
  private enqueueError(errorData: ErrorEvent['data']): void {
    const event: ErrorEvent = {
      type: 'error',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      pageUrl: window.location.href,
      data: errorData,
    };

    this.eventsQueue.push(event);
    this.checkBatchSize();
  }

  /**
   * Check if batch size reached and flush if necessary
   */
  private checkBatchSize(): void {
    if (this.eventsQueue.length >= this.config.batchSize) {
      this.log('Batch size reached, flushing events');
      this.flushEvents();
    }
  }

  /**
   * Start periodic flush interval
   */
  private startPeriodicFlush(): void {
    this.flushTimerId = window.setInterval(() => {
      this.flushEvents();
    }, this.config.flushIntervalMs);
  }

  /**
   * Send batched events to backend
   */
  private async flushEvents(): Promise<void> {
    if (this.eventsQueue.length === 0) {
      return;
    }

    const batch = [...this.eventsQueue];
    this.eventsQueue = [];

    this.log(`Flushing ${batch.length} events to backend`);

    try {
      const response = await fetch(this.config.backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batch),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.log('Events sent successfully');
    } catch (error) {
      this.log('Error sending events:', error);
      // Re-queue failed batch (prepend to maintain order)
      this.eventsQueue = batch.concat(this.eventsQueue);
    }
  }

  /**
   * Get rating based on metric thresholds
   */
  private getRating(
    name: WebVitalName, 
    value: number
  ): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FCP: { good: 1800, poor: 3000 },
      CLS: { good: 0.1, poor: 0.25 },
      INP: { good: 200, poor: 500 },
      TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[name];
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Get navigation type
   */
  private getNavigationType(): string {
    const nav = performance.getEntriesByType('navigation')[0] as any;
    return nav?.type || 'unknown';
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Debug logging
   */
  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[RUM Wrapper]', ...args);
    }
  }
}
