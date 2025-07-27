export class UnifiedAudioService {
  private static instance: UnifiedAudioService;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private lastClickTime: number = 0;
  private readonly CLICK_DEBOUNCE = 300;

  static getInstance(): UnifiedAudioService {
    if (!UnifiedAudioService.instance) {
      UnifiedAudioService.instance = new UnifiedAudioService();
    }
    return UnifiedAudioService.instance;
  }

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        console.log('Unified audio service: Voices loaded');
      };
    }
  }

  private addNaturalPauses(text: string): string {
    return text
      .replace(/\./g, '. ')
      .replace(/\!/g, '! ')
      .replace(/\?/g, '? ')
      .replace(/\,/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  async playAudio(text: string): Promise<void> {
    const now = Date.now();
    
    // Debounce rapid clicks
    if (now - this.lastClickTime < this.CLICK_DEBOUNCE) {
      console.log('Audio click debounced');
      return;
    }
    this.lastClickTime = now;

    // Stop any current audio with a proper delay
    this.stopCurrentAudio();
    
    // Wait a moment for cancellation to complete
    await new Promise(resolve => setTimeout(resolve, 100));

    return new Promise((resolve, reject) => {
      try {
        if (!window.speechSynthesis) {
          reject(new Error('Speech synthesis not supported'));
          return;
        }

        // Ensure speech synthesis is ready
        if (window.speechSynthesis.pending || window.speechSynthesis.speaking) {
          console.log('Waiting for speech synthesis to be ready...');
          window.speechSynthesis.cancel();
          setTimeout(() => this.playAudio(text), 200);
          return;
        }

        const processedText = this.addNaturalPauses(text);
        const utterance = new SpeechSynthesisUtterance(processedText);

        // Configure for children's learning
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Get preferred voice - wait for voices to load if needed
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
            this.setupVoiceAndSpeak(utterance, voices, resolve, reject);
          };
          return;
        }

        this.setupVoiceAndSpeak(utterance, voices, resolve, reject);

      } catch (error) {
        this.isPlaying = false;
        this.currentUtterance = null;
        console.error('Audio error:', error);
        reject(error);
      }
    });
  }

  private setupVoiceAndSpeak(
    utterance: SpeechSynthesisUtterance, 
    voices: SpeechSynthesisVoice[], 
    resolve: () => void, 
    reject: (error: any) => void
  ): void {
    // Find a good English voice
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.default
    ) || voices.find(voice => voice.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    let hasStarted = false;

    utterance.onstart = () => {
      hasStarted = true;
      this.isPlaying = true;
      console.log('Audio started successfully');
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.currentUtterance = null;
      console.log('Audio completed');
      resolve();
    };

    utterance.onerror = (error) => {
      this.isPlaying = false;
      this.currentUtterance = null;
      console.error('Speech error:', error.error);
      
      // Only reject if it hasn't started yet
      if (!hasStarted) {
        reject(error);
      }
    };

    // Set utterance and play
    this.currentUtterance = utterance;
    this.isPlaying = true;
    
    // Use a timeout to ensure speech starts
    setTimeout(() => {
      if (!hasStarted && this.currentUtterance === utterance) {
        console.log('Speech failed to start, retrying...');
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    }, 1000);

    window.speechSynthesis.speak(utterance);
  }

  stopCurrentAudio(): void {
    if (this.currentUtterance || this.isPlaying) {
      console.log('Audio stopped');
      try {
        window.speechSynthesis.pause();
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
}

export const unifiedAudioService = UnifiedAudioService.getInstance();