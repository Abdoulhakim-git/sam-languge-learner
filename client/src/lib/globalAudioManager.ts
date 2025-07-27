export class GlobalAudioManager {
  private static instance: GlobalAudioManager;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private currentPlayerId: string | null = null;
  private listeners: Set<(isPlaying: boolean, playerId?: string) => void> = new Set();
  private lastPlayTime: number = 0;
  private readonly DEBOUNCE_DELAY = 300; // Prevent rapid clicking

  static getInstance(): GlobalAudioManager {
    if (!GlobalAudioManager.instance) {
      GlobalAudioManager.instance = new GlobalAudioManager();
    }
    return GlobalAudioManager.instance;
  }

  private constructor() {
    // Ensure speech synthesis is available
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Handle speech synthesis events
      window.speechSynthesis.onvoiceschanged = () => {
        console.log('Voices loaded for global audio manager');
      };
    }
  }

  addListener(callback: (isPlaying: boolean, playerId?: string) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback(this.isPlaying, this.currentPlayerId || undefined));
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

  async playAudio(text: string, playerId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Debounce rapid clicks
        const now = Date.now();
        if (now - this.lastPlayTime < this.DEBOUNCE_DELAY) {
          console.log('Audio request debounced - too soon after last play');
          resolve();
          return;
        }
        this.lastPlayTime = now;

        // Always stop any currently playing audio first
        if (this.isPlaying || this.currentUtterance) {
          console.log('Stopping previous audio before starting new one');
          window.speechSynthesis.cancel();
          this.isPlaying = false;
          this.currentUtterance = null;
          this.currentPlayerId = null;
          this.notifyListeners();
          
          // Small delay to ensure cancellation is processed
          setTimeout(() => this.startNewAudio(text, playerId, resolve, reject), 100);
          return;
        }

        this.startNewAudio(text, playerId, resolve, reject);
      } catch (error) {
        console.error(`Failed to play audio for player ${playerId}:`, error);
        reject(error);
      }
    });
  }

  private startNewAudio(text: string, playerId: string, resolve: () => void, reject: (error: any) => void): void {
    try {
      if (!window.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

        const processedText = this.addNaturalPauses(text);
        const utterance = new SpeechSynthesisUtterance(processedText);

        // Configure voice settings for children
        utterance.rate = 0.7;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;

        // Try to get a male English voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          (voice.name.includes('Male') || voice.name.includes('David') || voice.name.includes('Alex'))
        ) || voices.find(voice => voice.lang.startsWith('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onstart = () => {
          this.isPlaying = true;
          this.currentPlayerId = playerId;
          this.notifyListeners();
          console.log(`Audio started for player: ${playerId}`);
        };

        utterance.onend = () => {
          this.isPlaying = false;
          this.currentPlayerId = null;
          this.currentUtterance = null;
          this.notifyListeners();
          console.log(`Audio ended for player: ${playerId}`);
          resolve();
        };

        utterance.onerror = (error) => {
          this.isPlaying = false;
          this.currentPlayerId = null;
          this.currentUtterance = null;
          this.notifyListeners();
          console.error(`Audio error for player ${playerId}:`, error);
          reject(error);
        };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error(`Failed to start audio for player ${playerId}:`, error);
      reject(error);
    }
  }

  stopAudio(): void {
    if (this.currentUtterance && this.isPlaying) {
      window.speechSynthesis.cancel();
      this.isPlaying = false;
      const stoppedPlayerId = this.currentPlayerId;
      this.currentPlayerId = null;
      this.currentUtterance = null;
      this.notifyListeners();
      console.log(`Audio stopped for player: ${stoppedPlayerId}`);
    }
  }

  isCurrentlyPlaying(playerId?: string): boolean {
    if (playerId) {
      return this.isPlaying && this.currentPlayerId === playerId;
    }
    return this.isPlaying;
  }

  getCurrentPlayerId(): string | null {
    return this.currentPlayerId;
  }
}

export const globalAudioManager = GlobalAudioManager.getInstance();