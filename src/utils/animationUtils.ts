import { 
  BreathingPhase, 
  AnimationState, 
  BreathingConfig, 
  AnimationTiming, 
  BreathingMessages,
  CircleAnimation,
  BreathingError 
} from '../types/interfaces';

/**
 * Utility functions for breathing animation
 */

// Default breathing configuration
export const DEFAULT_BREATHING_CONFIG: BreathingConfig = {
  inhaleDuration: 4000,  // 4 seconds
  holdDuration: 2000,    // 2 seconds
  exhaleDuration: 6000,  // 6 seconds
  totalCycles: 3,        // 3 complete cycles
  cycleDelay: 1000       // 1 second between cycles
};

// Default breathing messages
export const DEFAULT_BREATHING_MESSAGES: BreathingMessages = {
  inhale: 'Inspire...',
  hold: 'Segure.',
  exhale: 'Expire...',
  complete: 'Tenha um momento de paz.'
};

// Default circle animation properties
export const DEFAULT_CIRCLE_ANIMATION: CircleAnimation = {
  initialScale: 1.0,
  maxScale: 1.5,
  currentScale: 1.0,
  duration: 4000,
  easing: 'ease-in-out'
};

/**
 * Create a delay promise
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get animation timing for a complete cycle
 * @param config - Breathing configuration
 * @returns Animation timing object
 */
export function getAnimationTiming(config: BreathingConfig): AnimationTiming {
  return {
    inhale: config.inhaleDuration,
    hold: config.holdDuration,
    exhale: config.exhaleDuration,
    total: config.inhaleDuration + config.holdDuration + config.exhaleDuration
  };
}

/**
 * Calculate total animation duration
 * @param config - Breathing configuration
 * @returns Total duration in milliseconds
 */
export function getTotalDuration(config: BreathingConfig): number {
  const cycleDuration = config.inhaleDuration + config.holdDuration + config.exhaleDuration;
  const cycleDelays = (config.totalCycles - 1) * config.cycleDelay;
  return (cycleDuration * config.totalCycles) + cycleDelays;
}

/**
 * Create initial animation state
 * @param config - Breathing configuration
 * @returns Initial animation state
 */
export function createInitialState(config: BreathingConfig): AnimationState {
  return {
    currentPhase: 'inhale',
    currentCycle: 1,
    isRunning: false,
    isPaused: false,
    startTime: 0,
    endTime: 0
  };
}

/**
 * Update animation state
 * @param state - Current animation state
 * @param updates - Partial state updates
 * @returns Updated animation state
 */
export function updateAnimationState(
  state: AnimationState, 
  updates: Partial<AnimationState>
): AnimationState {
  return { ...state, ...updates };
}

/**
 * Get next breathing phase
 * @param currentPhase - Current breathing phase
 * @returns Next breathing phase
 */
export function getNextPhase(currentPhase: BreathingPhase): BreathingPhase {
  switch (currentPhase) {
    case 'inhale':
      return 'hold';
    case 'hold':
      return 'exhale';
    case 'exhale':
      return 'inhale';
    case 'complete':
      return 'complete';
    default:
      return 'inhale';
  }
}

/**
 * Get breathing message for phase
 * @param phase - Current breathing phase
 * @param messages - Breathing messages
 * @returns Message for the phase
 */
export function getPhaseMessage(phase: BreathingPhase, messages: BreathingMessages): string {
  switch (phase) {
    case 'inhale':
      return messages.inhale;
    case 'hold':
      return messages.hold;
    case 'exhale':
      return messages.exhale;
    case 'complete':
      return messages.complete;
    default:
      return messages.inhale;
  }
}

/**
 * Calculate circle scale for phase
 * @param phase - Current breathing phase
 * @param animation - Circle animation properties
 * @returns Scale value for the circle
 */
export function getCircleScale(phase: BreathingPhase, animation: CircleAnimation): number {
  switch (phase) {
    case 'inhale':
      return animation.maxScale;
    case 'hold':
      return animation.maxScale;
    case 'exhale':
      return animation.initialScale;
    case 'complete':
      return animation.initialScale;
    default:
      return animation.initialScale;
  }
}

/**
 * Get CSS transition duration for phase
 * @param phase - Current breathing phase
 * @param config - Breathing configuration
 * @returns Duration in milliseconds
 */
export function getPhaseDuration(phase: BreathingPhase, config: BreathingConfig): number {
  switch (phase) {
    case 'inhale':
      return config.inhaleDuration;
    case 'hold':
      return config.holdDuration;
    case 'exhale':
      return config.exhaleDuration;
    case 'complete':
      return 0;
    default:
      return 0;
  }
}

/**
 * Apply CSS classes to element
 * @param element - HTML element
 * @param classes - Classes to add
 * @param removeClasses - Classes to remove
 */
export function applyClasses(
  element: HTMLElement | null,
  classes: string[] = [],
  removeClasses: string[] = []
): void {
  if (!element) return;
  
  // Remove classes
  removeClasses.forEach(className => {
    element.classList.remove(className);
  });
  
  // Add classes
  classes.forEach(className => {
    element.classList.add(className);
  });
}

/**
 * Set element text content
 * @param element - HTML element
 * @param text - Text to set
 */
export function setTextContent(element: HTMLElement | null, text: string): void {
  if (!element) return;
  element.textContent = text;
}

/**
 * Set element style property
 * @param element - HTML element
 * @param property - CSS property
 * @param value - CSS value
 */
export function setStyleProperty(
  element: HTMLElement | null,
  property: string,
  value: string
): void {
  if (!element) return;
  element.style.setProperty(property, value);
}

/**
 * Fade in element
 * @param element - HTML element
 * @param duration - Fade duration in milliseconds
 */
export function fadeIn(element: HTMLElement | null, duration: number = 500): void {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  
  // Trigger reflow
  element.offsetHeight;
  
  element.style.opacity = '1';
}

/**
 * Fade out element
 * @param element - HTML element
 * @param duration - Fade duration in milliseconds
 */
export function fadeOut(element: HTMLElement | null, duration: number = 500): void {
  if (!element) return;
  
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  element.style.opacity = '0';
}

/**
 * Animate circle scale
 * @param element - Circle element
 * @param scale - Target scale
 * @param duration - Animation duration in milliseconds
 */
export function animateCircleScale(
  element: HTMLElement | null,
  scale: number,
  duration: number
): void {
  if (!element) return;
  
  element.style.transition = `transform ${duration}ms ease-in-out`;
  element.style.transform = `scale(${scale})`;
}

/**
 * Create breathing error
 * @param message - Error message
 * @param type - Error type
 * @param stack - Stack trace
 * @returns Breathing error object
 */
export function createBreathingError(
  message: string,
  type: BreathingError['type'] = 'UNKNOWN',
  stack?: string
): BreathingError {
  return {
    message,
    type,
    timestamp: Date.now(),
    stack
  };
}

/**
 * Log breathing error
 * @param error - Breathing error
 */
export function logBreathingError(error: BreathingError): void {
  console.error(`[Pausa para Respirar] ${error.type}: ${error.message}`, {
    timestamp: error.timestamp,
    stack: error.stack
  });
}

/**
 * Check if element exists
 * @param element - HTML element
 * @param name - Element name for error messages
 * @returns True if element exists
 */
export function validateElement(element: HTMLElement | null, name: string): boolean {
  if (!element) {
    const error = createBreathingError(`Element '${name}' not found`, 'ELEMENT');
    logBreathingError(error);
    return false;
  }
  return true;
}

/**
 * Get current timestamp
 * @returns Current timestamp in milliseconds
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Calculate elapsed time
 * @param startTime - Start timestamp
 * @param endTime - End timestamp (optional, uses current time if not provided)
 * @returns Elapsed time in milliseconds
 */
export function getElapsedTime(startTime: number, endTime?: number): number {
  const end = endTime || getCurrentTimestamp();
  return end - startTime;
}

/**
 * Format time in seconds
 * @param milliseconds - Time in milliseconds
 * @returns Formatted time string
 */
export function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${remainingSeconds}s`;
}

/**
 * Check if animation should be reduced
 * @returns True if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get appropriate animation duration based on user preferences
 * @param baseDuration - Base duration in milliseconds
 * @returns Adjusted duration
 */
export function getAdjustedDuration(baseDuration: number): number {
  if (prefersReducedMotion()) {
    return Math.min(baseDuration, 1000); // Cap at 1 second for reduced motion
  }
  return baseDuration;
}

/**
 * Debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 * @param func - Function to throttle
 * @param limit - Limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
