// Mock analytics for demo purposes
// In production, this would integrate with Google Analytics, Mixpanel, etc.

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: string;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private isEnabled: boolean = true;

  // Track page views
  trackPageView(page: string, title?: string): void {
    if (!this.isEnabled) return;
    
    this.track('page_view', {
      page,
      title,
      url: window.location.href,
    });
  }

  // Track user interactions
  track(event: string, properties?: Record<string, any>): void {
    if (!this.isEnabled) return;
    
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date().toISOString(),
    };
    
    this.events.push(analyticsEvent);
    
    // In demo mode, just log to console
    console.log('Analytics Event:', analyticsEvent);
    
    // In production, send to analytics service
    // this.sendToAnalyticsService(analyticsEvent);
  }

  // Track user identification
  identify(userId: string, traits?: Record<string, any>): void {
    if (!this.isEnabled) return;
    
    this.track('user_identified', {
      userId,
      ...traits,
    });
  }

  // Track conversion events
  trackConversion(type: string, value?: number, properties?: Record<string, any>): void {
    this.track('conversion', {
      type,
      value,
      ...properties,
    });
  }

  // Track errors
  trackError(error: Error, context?: any): void {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      context,
    });
  }

  // Get events for debugging
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  // Clear events
  clearEvents(): void {
    this.events = [];
  }

  // Enable/disable analytics
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }
}

export const analytics = new Analytics();

// Convenience functions for common events
export const trackIdeaGenerated = (category: string, difficulty: string) => {
  analytics.track('idea_generated', { category, difficulty });
};

export const trackTemplateViewed = (templateId: string, category: string) => {
  analytics.track('template_viewed', { templateId, category });
};

export const trackTemplateAddedToCart = (templateId: string, price: number) => {
  analytics.track('template_added_to_cart', { templateId, price });
};

export const trackPurchaseCompleted = (totalAmount: number, templateCount: number) => {
  analytics.trackConversion('template_purchase', totalAmount, { templateCount });
};

export const trackUserSignUp = (method: string) => {
  analytics.trackConversion('user_signup', undefined, { method });
};

export const trackOnboardingStep = (step: string, completed: boolean) => {
  analytics.track('onboarding_step', { step, completed });
};

export const trackSearch = (query: string, category?: string) => {
  analytics.track('search', { query, category });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  analytics.track('button_click', { buttonName, location });
};