class SimpleReliableAudio {
  private static instance: SimpleReliableAudio;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private lastClickTime: number = 0;
  private voicesLoaded: boolean = false;

  static getInstance(): SimpleReliableAudio {
    if (!SimpleReliableAudio.instance) {
      SimpleReliableAudio.instance = new SimpleReliableAudio();
    }
    return SimpleReliableAudio.instance;
  }

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
    }
  }

  private loadVoices(): void {
    const loadVoicesImpl = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        this.voicesLoaded = true;
        console.log('Simple audio: Voices loaded successfully');
      }
    };

    loadVoicesImpl();
    window.speechSynthesis.onvoiceschanged = loadVoicesImpl;
  }

  private addPauses(text: string): string {
    return text
      .replace(/\./g, '. ')
      .replace(/!/g, '! ')
      .replace(/\?/g, '? ')
      .replace(/,/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  async playAudio(text: string): Promise<void> {
    const now = Date.now();
    
    // Prevent rapid clicks
    if (now - this.lastClickTime < 300) {
      return Promise.resolve();
    }
    this.lastClickTime = now;

    // Stop any current speech
    this.stopAudio();

    return new Promise((resolve, reject) => {
      try {
        if (!window.speechSynthesis) {
          console.error('Speech synthesis not supported');
          resolve();
          return;
        }

        // Wait for voices if not loaded
        if (!this.voicesLoaded) {
          setTimeout(() => this.playAudio(text).then(resolve).catch(reject), 500);
          return;
        }

        const processedText = this.addPauses(text);
        const utterance = new SpeechSynthesisUtterance(processedText);

        // Simple, reliable settings
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-US';

        // Get best available voice
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => 
          voice.lang === 'en-US' || voice.lang.startsWith('en')
        );
        
        if (englishVoice) {
          utterance.voice = englishVoice;
        }

        let hasResolved = false;

        utterance.onstart = () => {
          this.isPlaying = true;
          console.log('Audio playing:', text.substring(0, 30) + '...');
        };

        utterance.onend = () => {
          this.isPlaying = false;
          this.currentUtterance = null;
          if (!hasResolved) {
            hasResolved = true;
            console.log('Audio completed successfully');
            resolve();
          }
        };

        utterance.onerror = (event) => {
          this.isPlaying = false;
          this.currentUtterance = null;
          console.error('Audio error:', event.error);
          if (!hasResolved) {
            hasResolved = true;
            resolve(); // Don't reject, just resolve to continue
          }
        };

        // Store current utterance
        this.currentUtterance = utterance;
        this.isPlaying = true;

        // Speak the utterance
        window.speechSynthesis.speak(utterance);

        // Fallback timeout
        setTimeout(() => {
          if (!hasResolved) {
            hasResolved = true;
            console.log('Audio timeout reached');
            this.stopAudio();
            resolve();
          }
        }, Math.max(5000, text.length * 100)); // Dynamic timeout based on text length

      } catch (error) {
        console.error('Audio playback failed:', error);
        this.isPlaying = false;
        this.currentUtterance = null;
        resolve(); // Always resolve to prevent hanging
      }
    });
  }

  stopAudio(): void {
    if (this.isPlaying || this.currentUtterance) {
      try {
        window.speechSynthesis.cancel();
      } catch (error) {
        console.error('Error canceling speech:', error);
      }
      this.isPlaying = false;
      this.currentUtterance = null;
    }
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }
}

export const simpleReliableAudio = SimpleReliableAudio.getInstance();