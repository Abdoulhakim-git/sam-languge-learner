class FinalAudioFix {
  private static instance: FinalAudioFix;
  private isPlaying: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioQueue: Array<{ text: string; resolve: () => void; reject: (error: any) => void }> = [];
  private isProcessingQueue: boolean = false;

  static getInstance(): FinalAudioFix {
    if (!FinalAudioFix.instance) {
      FinalAudioFix.instance = new FinalAudioFix();
    }
    return FinalAudioFix.instance;
  }

  private constructor() {
    this.initializeAudio();
  }

  private initializeAudio(): void {
    // Ensure speech synthesis is available
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      return;
    }

    // Initialize voices if needed
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        console.log('Voices loaded, audio system ready');
      });
    }

    // Resume speech synthesis on page focus (handles browser suspension)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isPlaying) {
        window.speechSynthesis.resume();
      }
    });
  }

  private addNaturalPauses(text: string): string {
    return text
      .replace(/\./g, '.')
      .replace(/!/g, '!')
      .replace(/\?/g, '?')
      .replace(/,/g, ',')
      .replace(/:/g, ':')
      .replace(/;/g, ';')
      .trim();
  }

  private getBestVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    
    // Priority order for best English voices
    const voicePreferences = [
      (v: SpeechSynthesisVoice) => v.lang === 'en-US' && v.name.includes('Google'),
      (v: SpeechSynthesisVoice) => v.lang === 'en-US' && v.name.includes('Microsoft'),
      (v: SpeechSynthesisVoice) => v.lang === 'en-US' && v.default,
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en-') && v.default,
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.default
    ];

    for (const preference of voicePreferences) {
      const voice = voices.find(preference);
      if (voice) return voice;
    }

    return voices[0] || null;
  }

  async playAudio(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Add to queue
      this.audioQueue.push({ text, resolve, reject });
      
      // Process queue if not already processing
      if (!this.isProcessingQueue) {
        this.processQueue();
      }
    });
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.audioQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    while (this.audioQueue.length > 0) {
      const audioItem = this.audioQueue.shift();
      if (!audioItem) continue;

      try {
        await this.playAudioInternal(audioItem.text);
        audioItem.resolve();
      } catch (error) {
        console.error('Audio playback error:', error);
        audioItem.reject(error);
      }

      // Small delay between audio items
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.isProcessingQueue = false;
  }

  private playAudioInternal(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Stop any current audio
        this.stopCurrentAudio();

        // Wait for cleanup
        setTimeout(() => {
          const processedText = this.addNaturalPauses(text);
          const utterance = new SpeechSynthesisUtterance(processedText);

          // Configure utterance
          utterance.rate = 0.85;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;
          utterance.lang = 'en-US';

          const voice = this.getBestVoice();
          if (voice) {
            utterance.voice = voice;
          }

          let resolved = false;
          const startTime = Date.now();

          const resolveOnce = () => {
            if (!resolved) {
              resolved = true;
              this.isPlaying = false;
              this.currentUtterance = null;
              const duration = Date.now() - startTime;
              console.log('Audio completed after', duration, 'ms');
              resolve();
            }
          };

          utterance.onstart = () => {
            this.isPlaying = true;
            console.log('Audio started:', text.substring(0, 50) + '...');
          };

          utterance.onend = () => {
            console.log('Audio onend event fired');
            resolveOnce();
          };

          utterance.onerror = (event) => {
            console.log('Audio error:', event.error);
            if (event.error !== 'interrupted') {
              resolveOnce();
            }
          };

          // Reliable completion detection using polling
          const checkCompletion = () => {
            if (resolved) return;

            // Check if speech synthesis has stopped
            if (!window.speechSynthesis.speaking) {
              // Give it a moment to make sure it's really done
              setTimeout(() => {
                if (!window.speechSynthesis.speaking && !resolved) {
                  console.log('Audio completed via polling detection');
                  resolveOnce();
                }
              }, 200);
            } else {
              // Continue checking
              setTimeout(checkCompletion, 500);
            }
          };

          // Start completion checking after a delay
          setTimeout(checkCompletion, 1000);

          // Final fallback timeout
          const timeoutDuration = Math.max(30000, text.length * 100);
          setTimeout(() => {
            if (!resolved) {
              console.log('Audio force completed after', timeoutDuration, 'ms');
              resolveOnce();
            }
          }, timeoutDuration);

          // Start speaking
          this.currentUtterance = utterance;
          window.speechSynthesis.speak(utterance);

        }, 100);

      } catch (error) {
        console.error('Failed to play audio:', error);
        this.isPlaying = false;
        this.currentUtterance = null;
        reject(error);
      }
    });
  }

  stopCurrentAudio(): void {
    if (this.currentUtterance || window.speechSynthesis.speaking) {
      try {
        window.speechSynthesis.cancel();
      } catch (error) {
        console.error('Error stopping audio:', error);
      }
    }
    this.isPlaying = false;
    this.currentUtterance = null;
  }

  clearQueue(): void {
    this.audioQueue = [];
    this.isProcessingQueue = false;
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  // Test audio functionality
  async testAudio(): Promise<void> {
    console.log('Testing audio system...');
    await this.playAudio('Audio system test successful');
  }
}

export const finalAudioFix = FinalAudioFix.getInstance();