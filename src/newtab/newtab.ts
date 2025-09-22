import './newtab.css';
import { 
  BreathingPhase, 
  AnimationState, 
  BreathingConfig, 
  BreathingMessages,
  CircleAnimation,
  ExtensionState 
} from '../types/interfaces';
import {
  delay,
  DEFAULT_BREATHING_CONFIG,
  DEFAULT_BREATHING_MESSAGES,
  DEFAULT_CIRCLE_ANIMATION,
  createInitialState,
  updateAnimationState,
  getNextPhase,
  getPhaseMessage,
  getCircleScale,
  getPhaseDuration,
  applyClasses,
  setTextContent,
  animateCircleScale,
  fadeIn,
  fadeOut,
  getAdjustedDuration,
  validateElement,
  createBreathingError,
  logBreathingError
} from '../utils/animationUtils';

/**
 * Main application class for Pausa para Respirar
 */
class PausaParaRespirar {
  private state: ExtensionState;
  private breathingCircle: HTMLElement;
  private breathingText: HTMLElement;
  private endMessage: HTMLElement;
  private container: HTMLElement;

  constructor() {
    this.breathingCircle = document.getElementById('breathing-circle') as HTMLElement;
    this.breathingText = document.getElementById('breathing-text') as HTMLElement;
    this.endMessage = document.getElementById('end-message') as HTMLElement;
    this.container = document.querySelector('.breathing-container') as HTMLElement;
    
    this.state = {
      animationState: createInitialState(DEFAULT_BREATHING_CONFIG),
      config: DEFAULT_BREATHING_CONFIG,
      isInitialized: false,
      error: null
    };
    
    this.init();
  }

  /**
   * Initialize the application
   */
  private async init(): Promise<void> {
    try {
      // Validate required elements
      if (!validateElement(this.breathingCircle, 'breathing-circle') ||
          !validateElement(this.breathingText, 'breathing-text') ||
          !validateElement(this.endMessage, 'end-message') ||
          !validateElement(this.container, 'breathing-container')) {
        throw new Error('Required elements not found');
      }

      this.state.isInitialized = true;
      console.log('Pausa para Respirar initialized successfully');
      
      // Start the breathing animation
      await this.startBreathingSequence();
      
    } catch (error) {
      console.error('Error initializing Pausa para Respirar:', error);
      this.handleError(error);
    }
  }

  /**
   * Start the complete breathing sequence
   */
  private async startBreathingSequence(): Promise<void> {
    try {
      console.log('Starting breathing sequence...');
      
      // Update state
      this.state.animationState = updateAnimationState(this.state.animationState, {
        isRunning: true,
        startTime: Date.now()
      });

      // Run 3 complete breathing cycles
      for (let cycle = 1; cycle <= this.state.config.totalCycles; cycle++) {
        console.log(`Starting cycle ${cycle} of ${this.state.config.totalCycles}`);
        
        // Update current cycle
        this.state.animationState = updateAnimationState(this.state.animationState, {
          currentCycle: cycle
        });

        // Run single breathing cycle
        await this.runBreathingCycle();
        
        // Add delay between cycles (except for the last one)
        if (cycle < this.state.config.totalCycles) {
          await delay(this.state.config.cycleDelay);
        }
      }

      // Complete the sequence
      await this.completeSequence();
      
    } catch (error) {
      console.error('Error in breathing sequence:', error);
      this.handleError(error);
    }
  }

  /**
   * Run a single breathing cycle (inhale, hold, exhale)
   */
  private async runBreathingCycle(): Promise<void> {
    try {
      // Phase 1: Inhale
      await this.executePhase('inhale');
      
      // Phase 2: Hold
      await this.executePhase('hold');
      
      // Phase 3: Exhale
      await this.executePhase('exhale');
      
    } catch (error) {
      console.error('Error in breathing cycle:', error);
      throw error;
    }
  }

  /**
   * Execute a specific breathing phase
   * @param phase - Breathing phase to execute
   */
  private async executePhase(phase: BreathingPhase): Promise<void> {
    try {
      console.log(`Executing phase: ${phase}`);
      
      // Update state
      this.state.animationState = updateAnimationState(this.state.animationState, {
        currentPhase: phase
      });

      // Get phase message and duration
      const message = getPhaseMessage(phase, DEFAULT_BREATHING_MESSAGES);
      const duration = getPhaseDuration(phase, this.state.config);
      const adjustedDuration = getAdjustedDuration(duration);

      // Update text
      setTextContent(this.breathingText, message);
      
      // Apply phase-specific classes
      this.applyPhaseClasses(phase);

      // Animate circle
      const circleScale = getCircleScale(phase, DEFAULT_CIRCLE_ANIMATION);
      animateCircleScale(this.breathingCircle, circleScale, adjustedDuration);

      // Wait for phase duration
      await delay(adjustedDuration);
      
    } catch (error) {
      console.error(`Error executing phase ${phase}:`, error);
      throw error;
    }
  }

  /**
   * Apply CSS classes for specific phase
   * @param phase - Breathing phase
   */
  private applyPhaseClasses(phase: BreathingPhase): void {
    // Remove all phase classes
    applyClasses(this.breathingText, [], ['inhale', 'hold', 'exhale']);
    
    // Add current phase class
    if (phase !== 'complete') {
      applyClasses(this.breathingText, [phase]);
    }
  }

  /**
   * Complete the breathing sequence
   */
  private async completeSequence(): Promise<void> {
    try {
      console.log('Completing breathing sequence...');
      
      // Update state
      this.state.animationState = updateAnimationState(this.state.animationState, {
        currentPhase: 'complete',
        isRunning: false,
        endTime: Date.now()
      });

      // Fade out circle and text
      await this.fadeOutElements();
      
      // Show end message
      await this.showEndMessage();
      
      console.log('Breathing sequence completed successfully');
      
    } catch (error) {
      console.error('Error completing sequence:', error);
      this.handleError(error);
    }
  }

  /**
   * Fade out breathing elements
   */
  private async fadeOutElements(): Promise<void> {
    try {
      // Fade out circle
      applyClasses(this.breathingCircle, ['fade-out']);
      fadeOut(this.breathingCircle, 1000);
      
      // Fade out text
      applyClasses(this.breathingText, ['fade-out']);
      fadeOut(this.breathingText, 1000);
      
      // Wait for fade out to complete
      await delay(1000);
      
    } catch (error) {
      console.error('Error fading out elements:', error);
      throw error;
    }
  }

  /**
   * Show end message
   */
  private async showEndMessage(): Promise<void> {
    try {
      // Show end message element
      this.endMessage.style.display = 'block';
      
      // Fade in end message
      applyClasses(this.endMessage, ['fade-in']);
      fadeIn(this.endMessage, 1500);
      
      // Wait for fade in to complete
      await delay(1500);
      
    } catch (error) {
      console.error('Error showing end message:', error);
      throw error;
    }
  }

  /**
   * Handle errors
   * @param error - Error object
   */
  private handleError(error: unknown): void {
    const breathingError = createBreathingError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      'ANIMATION',
      error instanceof Error ? error.stack : undefined
    );
    
    logBreathingError(breathingError);
    
    this.state.error = breathingError.message;
    
    // Show error state
    applyClasses(this.container, ['error']);
    
    // Show fallback message
    setTextContent(this.breathingText, 'Ocorreu um erro. Tente recarregar a página.');
  }

  /**
   * Get current state
   * @returns Current extension state
   */
  public getState(): ExtensionState {
    return { ...this.state };
  }

  /**
   * Get animation state
   * @returns Current animation state
   */
  public getAnimationState(): AnimationState {
    return { ...this.state.animationState };
  }

  /**
   * Check if animation is running
   * @returns True if animation is running
   */
  public isRunning(): boolean {
    return this.state.animationState.isRunning;
  }

  /**
   * Check if animation is complete
   * @returns True if animation is complete
   */
  public isComplete(): boolean {
    return this.state.animationState.currentPhase === 'complete';
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    new PausaParaRespirar();
  } catch (error) {
    console.error('Failed to initialize Pausa para Respirar:', error);
    
    // Show error message
    const breathingText = document.getElementById('breathing-text');
    if (breathingText) {
      breathingText.textContent = 'Erro ao inicializar. Recarregue a página.';
      breathingText.style.color = '#8B4513';
    }
  }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
  console.log('Pausa para Respirar: Cleaning up...');
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden - pausing breathing animation');
  } else {
    console.log('Page visible - resuming breathing animation');
  }
});

// Handle online/offline events
window.addEventListener('online', () => {
  console.log('Connection restored');
});

window.addEventListener('offline', () => {
  console.log('Connection lost');
});

// Export for potential external use
export default PausaParaRespirar;
