/**
 * Breathing animation phase
 */
export type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'complete';

/**
 * Animation state interface
 */
export interface AnimationState {
  /** Current breathing phase */
  currentPhase: BreathingPhase;
  /** Current cycle number (1-3) */
  currentCycle: number;
  /** Whether animation is running */
  isRunning: boolean;
  /** Whether animation is paused */
  isPaused: boolean;
  /** Start timestamp */
  startTime: number;
  /** End timestamp */
  endTime: number;
}

/**
 * Breathing cycle configuration
 */
export interface BreathingConfig {
  /** Duration of inhale phase in milliseconds */
  inhaleDuration: number;
  /** Duration of hold phase in milliseconds */
  holdDuration: number;
  /** Duration of exhale phase in milliseconds */
  exhaleDuration: number;
  /** Total number of cycles */
  totalCycles: number;
  /** Delay between cycles in milliseconds */
  cycleDelay: number;
}

/**
 * Animation timing interface
 */
export interface AnimationTiming {
  /** Inhale duration */
  inhale: number;
  /** Hold duration */
  hold: number;
  /** Exhale duration */
  exhale: number;
  /** Total cycle duration */
  total: number;
}

/**
 * Breathing text messages
 */
export interface BreathingMessages {
  /** Inhale instruction */
  inhale: string;
  /** Hold instruction */
  hold: string;
  /** Exhale instruction */
  exhale: string;
  /** Completion message */
  complete: string;
}

/**
 * Circle animation properties
 */
export interface CircleAnimation {
  /** Initial scale */
  initialScale: number;
  /** Maximum scale during inhale */
  maxScale: number;
  /** Current scale */
  currentScale: number;
  /** Animation duration */
  duration: number;
  /** Easing function */
  easing: string;
}

/**
 * Extension state interface
 */
export interface ExtensionState {
  /** Current animation state */
  animationState: AnimationState;
  /** Breathing configuration */
  config: BreathingConfig;
  /** Whether extension is initialized */
  isInitialized: boolean;
  /** Last error message */
  error: string | null;
}

/**
 * Animation event interface
 */
export interface AnimationEvent {
  /** Event type */
  type: 'phase_change' | 'cycle_complete' | 'animation_complete' | 'error';
  /** Event data */
  data: {
    phase?: BreathingPhase;
    cycle?: number;
    message?: string;
    timestamp: number;
  };
}

/**
 * Visual settings interface
 */
export interface VisualSettings {
  /** Circle color */
  circleColor: string;
  /** Text color */
  textColor: string;
  /** Background color */
  backgroundColor: string;
  /** Font family */
  fontFamily: string;
  /** Font size */
  fontSize: string;
  /** Animation speed multiplier */
  speedMultiplier: number;
}

/**
 * Breathing exercise interface
 */
export interface BreathingExercise {
  /** Exercise name */
  name: string;
  /** Exercise description */
  description: string;
  /** Exercise configuration */
  config: BreathingConfig;
  /** Exercise messages */
  messages: BreathingMessages;
}

/**
 * Animation controller interface
 */
export interface AnimationController {
  /** Start animation */
  start(): Promise<void>;
  /** Pause animation */
  pause(): void;
  /** Resume animation */
  resume(): void;
  /** Stop animation */
  stop(): void;
  /** Reset animation */
  reset(): void;
  /** Get current state */
  getState(): AnimationState;
}

/**
 * Error interface
 */
export interface BreathingError {
  /** Error message */
  message: string;
  /** Error type */
  type: 'ANIMATION' | 'TIMING' | 'ELEMENT' | 'UNKNOWN';
  /** Error timestamp */
  timestamp: number;
  /** Stack trace */
  stack: string | undefined;
}

/**
 * Performance metrics interface
 */
export interface PerformanceMetrics {
  /** Animation start time */
  startTime: number;
  /** Animation end time */
  endTime: number;
  /** Total duration */
  totalDuration: number;
  /** Frame rate */
  frameRate: number;
  /** Memory usage */
  memoryUsage: number;
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  /** Preferred breathing speed */
  breathingSpeed: 'slow' | 'normal' | 'fast';
  /** Preferred color scheme */
  colorScheme: 'light' | 'dark' | 'auto';
  /** Preferred font size */
  fontSize: 'small' | 'medium' | 'large';
  /** Auto-start animation */
  autoStart: boolean;
  /** Show progress indicator */
  showProgress: boolean;
}

/**
 * Accessibility settings interface
 */
export interface AccessibilitySettings {
  /** High contrast mode */
  highContrast: boolean;
  /** Reduced motion */
  reducedMotion: boolean;
  /** Screen reader support */
  screenReader: boolean;
  /** Keyboard navigation */
  keyboardNavigation: boolean;
}
