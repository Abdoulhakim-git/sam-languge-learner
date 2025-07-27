class WorkingAudio {
  private static instance: WorkingAudio;
  private isPlaying: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  static getInstance(): WorkingAudio {
    if (!WorkingAudio.instance) {
      WorkingAudio.instance = new WorkingAudio();
    }
    return WorkingAudio.instance;
  }

  private constructor() {
    this.initAudio();
  }

  private initAudio(): void {
    // Force speech synthesis to initialize
    if (window.speechSynthesis) {
      // Create a silent utterance to wake up the engine
      const silent = new SpeechSynthesisUtterance(' ');
      silent.volume = 0;
      window.speechSynthesis.speak(silent);
      window.speechSynthesis.cancel();
    }
  }

  private getBestVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    
    // Find best English voice
    return voices.find(v => v.lang === 'en-US' && v.default) ||
           voices.find(v => v.lang.startsWith('en-') && v.default) ||
           voices.find(v => v.lang.startsWith('en')) ||
           voices[0] || null;
  }

  async playAudio(text: string): Promise<void> {
    console.log('Starting audio playback for:', text.substring(0, 50) + '...');
    
    // Stop any current audio
    this.stopAudio();
    
    return new Promise((resolve) => {
      try {
        // Clear speech queue
        window.speechSynthesis.cancel();
        
        // Wait for clear
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(text);
          
          // Simple, reliable configuration
          utterance.rate = 0.9;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;
          utterance.lang = 'en-US';
          
          const voice = this.getBestVoice();
          if (voice) {
            utterance.voice = voice;
          }
          
          let hasCompleted = false;
          
          const complete = () => {
            if (!hasCompleted) {
              hasCompleted = true;
              this.isPlaying = false;
              this.currentUtterance = null;
              console.log('Audio playback completed');
              resolve();
            }
          };
          
          utterance.onstart = () => {
            this.isPlaying = true;
            console.log('Audio started playing');
          };
          
          utterance.onend = () => {
            console.log('Audio onend fired');
            complete();
          };
          
          utterance.onerror = (event) => {
            console.log('Audio error:', event.error);
            complete();
          };
          
          // Monitor speech completion more reliably
          let checkCount = 0;
          const maxChecks = 200; // 200 * 500ms = 100 seconds max
          
          const monitorCompletion = () => {
            if (hasCompleted) return;
            
            checkCount++;
            
            // Check if still speaking
            const stillSpeaking = window.speechSynthesis.speaking;
            
            console.log('Monitoring check', checkCount, '- Still speaking:', stillSpeaking);
            
            if (!stillSpeaking) {
              if (checkCount > 6) {
                // Speech has stopped and we've waited long enough
                console.log('Audio completed naturally via monitoring after', checkCount * 500, 'ms');
                complete();
                return;
              }
              // Wait a bit more to make sure it's really done
              setTimeout(monitorCompletion, 500);
            } else if (checkCount < maxChecks) {
              // Still speaking, continue monitoring
              setTimeout(monitorCompletion, 500);
            } else {
              // Final timeout
              console.log('Audio force completed after maximum timeout');
              complete();
            }
          };
          
          // Start monitoring after a delay
          setTimeout(monitorCompletion, 2000);
          
          // Store and play
          this.currentUtterance = utterance;
          window.speechSynthesis.speak(utterance);
          
        }, 50);
        
      } catch (error) {
        console.error('Audio error:', error);
        this.isPlaying = false;
        this.currentUtterance = null;
        resolve();
      }
    });
  }

  stopAudio(): void {
    if (this.isPlaying || this.currentUtterance) {
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
    return this.isPlaying && window.speechSynthesis.speaking;
  }

  async testAudio(): Promise<void> {
    await this.playAudio('Test audio working');
  }
}

export const workingAudio = WorkingAudio.getInstance();