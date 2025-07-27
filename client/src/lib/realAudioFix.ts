class RealAudioFix {
  private static instance: RealAudioFix;
  private isPlaying: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private userHasInteracted: boolean = false;
  private pendingAudio: string | null = null;

  static getInstance(): RealAudioFix {
    if (!RealAudioFix.instance) {
      RealAudioFix.instance = new RealAudioFix();
    }
    return RealAudioFix.instance;
  }

  private constructor() {
    this.setupUserInteractionDetection();
    this.ensureSpeechSynthesisReady();
  }

  private setupUserInteractionDetection(): void {
    const markUserInteracted = () => {
      this.userHasInteracted = true;
      console.log('User interaction detected - audio enabled');
      
      // Play any pending audio
      if (this.pendingAudio) {
        const text = this.pendingAudio;
        this.pendingAudio = null;
        this.playAudioNow(text);
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', markUserInteracted, { once: true });
    document.addEventListener('touchstart', markUserInteracted, { once: true });
    document.addEventListener('keydown', markUserInteracted, { once: true });
  }

  private ensureSpeechSynthesisReady(): void {
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      return;
    }

    // Force speech synthesis to initialize
    const utterance = new SpeechSynthesisUtterance(' ');
    utterance.volume = 0.01;
    utterance.rate = 10;
    utterance.pitch = 0.1;
    
    window.speechSynthesis.speak(utterance);
    setTimeout(() => window.speechSynthesis.cancel(), 100);
  }

  private addNaturalPauses(text: string): string {
    return text
      .replace(/\./g, '. ')
      .replace(/!/g, '! ')
      .replace(/\?/g, '? ')
      .replace(/,/g, ', ')
      .replace(/:/g, ': ')
      .replace(/;/g, '; ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private getBestEnglishVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find the best English voice
    return (
      voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) ||
      voices.find(v => v.lang === 'en-US' && v.default) ||
      voices.find(v => v.lang.startsWith('en-') && v.default) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0] ||
      null
    );
  }

  async playAudio(text: string): Promise<void> {
    console.log('Audio requested:', text.substring(0, 30) + '...');

    // Stop any current audio
    this.stopCurrentAudio();

    // If user hasn't interacted yet, store the audio for later
    if (!this.userHasInteracted) {
      console.log('Waiting for user interaction before playing audio');
      this.pendingAudio = text;
      return Promise.resolve();
    }

    return this.playAudioNow(text);
  }

  private playAudioNow(text: string): Promise<void> {
    return new Promise((resolve) => {
      try {
        if (!window.speechSynthesis) {
          console.error('Speech synthesis not available');
          resolve();
          return;
        }

        // Clear the speech queue
        window.speechSynthesis.cancel();

        // Wait a moment for cancellation
        setTimeout(() => {
          const processedText = this.addNaturalPauses(text);
          const utterance = new SpeechSynthesisUtterance(processedText);

          // Configure utterance for better completion detection
          utterance.rate = 0.8; // Slightly slower for better reliability
          utterance.pitch = 1.0;
          utterance.volume = 1.0;
          utterance.lang = 'en-US';

          // Set voice
          const voice = this.getBestEnglishVoice();
          if (voice) {
            utterance.voice = voice;
          }

          let hasFinished = false;
          let startTime = Date.now();

          utterance.onstart = () => {
            this.isPlaying = true;
            startTime = Date.now();
            console.log('Audio started successfully');
          };

          utterance.onend = () => {
            if (!hasFinished) {
              hasFinished = true;
              this.isPlaying = false;
              this.currentUtterance = null;
              const duration = Date.now() - startTime;
              console.log('Audio completed naturally after', duration, 'ms');
              resolve();
            }
          };

          utterance.onerror = (event) => {
            if (!hasFinished) {
              hasFinished = true;
              this.isPlaying = false;
              this.currentUtterance = null;
              console.log('Audio error:', event.error);
              resolve();
            }
          };

          // Enhanced monitoring system for reliable completion detection
          let lastSpeakingState = false;
          let silenceCount = 0;
          
          const checkCompletion = () => {
            if (hasFinished) return;
            
            const currentlySpeaking = window.speechSynthesis.speaking;
            
            // If we were speaking but now we're not, track silence
            if (lastSpeakingState && !currentlySpeaking) {
              silenceCount++;
              console.log('Silence detected, count:', silenceCount);
              
              // If we've had consistent silence, audio is done
              if (silenceCount >= 3) {
                if (!hasFinished) {
                  hasFinished = true;
                  this.isPlaying = false;
                  this.currentUtterance = null;
                  const duration = Date.now() - startTime;
                  console.log('Audio completed naturally (silence detection) after', duration, 'ms');
                  resolve();
                  return;
                }
              }
            } else if (currentlySpeaking) {
              // Reset silence counter if still speaking
              silenceCount = 0;
            }
            
            lastSpeakingState = currentlySpeaking;
            
            // Continue monitoring if still playing
            if (this.isPlaying && !hasFinished) {
              setTimeout(checkCompletion, 300);
            }
          };

          // Start monitoring after speech begins
          setTimeout(checkCompletion, 1000);

          // Fallback timeout - much more generous
          const estimatedDuration = Math.max(20000, text.length * 150); // 150ms per character, minimum 20 seconds
          setTimeout(() => {
            if (!hasFinished) {
              hasFinished = true;
              this.stopCurrentAudio();
              console.log('Audio force completed after timeout:', estimatedDuration, 'ms');
              resolve();
            }
          }, estimatedDuration);

          // Store and speak
          this.currentUtterance = utterance;
          window.speechSynthesis.speak(utterance);

        }, 100); // Longer delay for better browser compatibility

      } catch (error) {
        console.error('Audio playback failed:', error);
        this.isPlaying = false;
        this.currentUtterance = null;
        resolve();
      }
    });
  }

  stopCurrentAudio(): void {
    if (this.currentUtterance || this.isPlaying) {
      try {
        window.speechSynthesis.cancel();
      } catch (error) {
        console.error('Error stopping audio:', error);
      }
      this.isPlaying = false;
      this.currentUtterance = null;
    }
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  // Test if audio is working
  async testAudio(): Promise<void> {
    console.log('Testing audio system...');
    await this.playAudio('Audio test successful');
  }
}

export const realAudioFix = RealAudioFix.getInstance();