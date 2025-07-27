class ReliableAudio {
  private static instance: ReliableAudio;
  private isPlaying: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  static getInstance(): ReliableAudio {
    if (!ReliableAudio.instance) {
      ReliableAudio.instance = new ReliableAudio();
    }
    return ReliableAudio.instance;
  }

  private constructor() {
    // Initialize voices
    if (window.speechSynthesis && window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        console.log('Speech voices loaded');
      });
    }
  }

  private getBestVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    
    // Find best English voice with priority order
    return voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) ||
           voices.find(v => v.lang === 'en-US' && v.default) ||
           voices.find(v => v.lang.startsWith('en-') && v.default) ||
           voices.find(v => v.lang.startsWith('en')) ||
           voices[0] || null;
  }

  private estimateAudioDuration(text: string): number {
    // Calculate realistic duration based on speech rate
    // Average: 150 words per minute, 5 characters per word
    const wordsPerMinute = 130; // Slightly slower for clarity
    const charactersPerWord = 5;
    const charactersPerMinute = wordsPerMinute * charactersPerWord;
    const minutes = text.length / charactersPerMinute;
    const milliseconds = minutes * 60 * 1000;
    
    // Add buffer time for pauses and processing
    return Math.max(3000, milliseconds + 2000);
  }

  async playAudio(text: string): Promise<void> {
    console.log('Playing audio:', text.substring(0, 50) + '...');
    
    // Stop any current audio
    this.stopAudio();
    
    return new Promise((resolve) => {
      try {
        // Clear speech queue completely
        window.speechSynthesis.cancel();
        
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(text);
          
          // Configure for reliability
          utterance.rate = 0.85;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;
          utterance.lang = 'en-US';
          
          const voice = this.getBestVoice();
          if (voice) {
            utterance.voice = voice;
          }
          
          let completed = false;
          const startTime = Date.now();
          const estimatedDuration = this.estimateAudioDuration(text);
          
          console.log(`Estimated audio duration: ${estimatedDuration}ms for ${text.length} characters`);
          
          const complete = (reason: string) => {
            if (!completed) {
              completed = true;
              this.isPlaying = false;
              this.currentUtterance = null;
              const actualDuration = Date.now() - startTime;
              console.log(`Audio completed: ${reason} after ${actualDuration}ms`);
              resolve();
            }
          };
          
          utterance.onstart = () => {
            this.isPlaying = true;
            console.log('Audio started');
          };
          
          utterance.onend = () => {
            complete('natural completion');
          };
          
          utterance.onerror = (event) => {
            if (event.error !== 'interrupted') {
              complete(`error: ${event.error}`);
            }
          };
          
          // Use estimated duration as timeout - more reliable than monitoring speaking state
          setTimeout(() => {
            if (!completed) {
              complete('estimated duration reached');
            }
          }, estimatedDuration);
          
          // Store and play
          this.currentUtterance = utterance;
          window.speechSynthesis.speak(utterance);
          
        }, 100);
        
      } catch (error) {
        console.error('Audio error:', error);
        this.isPlaying = false;
        this.currentUtterance = null;
        resolve();
      }
    });
  }

  stopAudio(): void {
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

  async testAudio(): Promise<void> {
    await this.playAudio('Audio test completed successfully');
  }
}

export const reliableAudio = ReliableAudio.getInstance();