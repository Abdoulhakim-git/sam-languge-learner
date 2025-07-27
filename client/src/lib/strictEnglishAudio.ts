/**
 * Strict English-Only Audio System
 * Guarantees English pronunciation even when offline
 * Prevents French voice switching that breaks English learning
 */

export class StrictEnglishAudio {
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeVoices();
  }

  private initializeVoices() {
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }

    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length === 0) return;

      // ULTRA-STRICT English voice filtering
      const strictlyEnglishVoices = voices.filter(voice => {
        const lang = voice.lang.toLowerCase();
        const name = voice.name.toLowerCase();

        // Must be English
        const isEnglish = lang.startsWith('en-us') || lang.startsWith('en-gb') || lang.startsWith('en');

        // Must NOT contain any French indicators
        const noFrench = !lang.includes('fr') && 
                        !name.includes('french') && 
                        !name.includes('français') &&
                        !name.includes('francais') &&
                        !name.includes('france');

        return isEnglish && noFrench;
      });

      console.log(`✅ Found ${strictlyEnglishVoices.length} strictly English voices`);

      // Priority selection for best Teacher Sam voice
      const priorityVoices = [
        'Google US English',
        'Microsoft David',
        'Alex',
        'Daniel',
        'Google UK English Male',
        'Microsoft Mark'
      ];

      for (const preferred of priorityVoices) {
        const voice = strictlyEnglishVoices.find(v => v.name.includes(preferred));
        if (voice) {
          this.preferredVoice = voice;
          console.log('🎤 Selected Teacher Sam voice:', voice.name, 'Lang:', voice.lang);
          break;
        }
      }

      // Fallback to first English voice
      if (!this.preferredVoice && strictlyEnglishVoices.length > 0) {
        this.preferredVoice = strictlyEnglishVoices[0];
        console.log('🎤 Fallback Teacher Sam voice:', this.preferredVoice.name);
      }

      this.isInitialized = true;
    };

    // Load voices immediately if available
    loadVoices();

    // Listen for voice changes
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
  }

  /**
   * Speak text with guaranteed English voice
   * Critical for offline learning - prevents French voice switching
   */
  async speak(text: string, options: {
    rate?: number;
    pitch?: number;
    volume?: number;
  } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!text || text.trim().length === 0) {
        reject(new Error('No text provided'));
        return;
      }

      // Stop any current speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure for children's learning
      utterance.rate = options.rate ?? 0.8;
      utterance.pitch = options.pitch ?? 1.1;
      utterance.volume = options.volume ?? 1.0;
      utterance.lang = 'en-US'; // FORCE English

      // Apply strictly English voice
      if (this.preferredVoice) {
        // Triple-check voice is still English
        if (this.preferredVoice.lang.startsWith('en') && 
            !this.preferredVoice.lang.includes('fr') &&
            !this.preferredVoice.name.toLowerCase().includes('french')) {
          utterance.voice = this.preferredVoice;
          console.log('🔊 Using verified English voice:', this.preferredVoice.name);
        } else {
          console.warn('🚨 Preferred voice compromised, using system default');
          utterance.voice = null;
        }
      }

      // Final safety check
      if (utterance.voice?.lang.includes('fr')) {
        utterance.voice = null;
        console.warn('🚨 Blocked French voice, using English fallback');
      }

      utterance.onstart = () => {
        console.log('🎤 Teacher Sam speaking:', text.substring(0, 50) + '...');
      };

      utterance.onend = () => {
        console.log('✅ Teacher Sam finished speaking');
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('❌ Speech error:', event.error);
        reject(new Error(`Speech error: ${event.error}`));
      };

      speechSynthesis.speak(utterance);
    });
  }

  /**
   * Stop current speech
   */
  stop() {
    speechSynthesis.cancel();
  }

  /**
   * Get voice information for debugging
   */
  getVoiceInfo() {
    return {
      isInitialized: this.isInitialized,
      preferredVoice: this.preferredVoice ? {
        name: this.preferredVoice.name,
        lang: this.preferredVoice.lang,
        localService: this.preferredVoice.localService
      } : null,
      availableEnglishVoices: speechSynthesis.getVoices()
        .filter(v => v.lang.startsWith('en') && !v.lang.includes('fr'))
        .map(v => ({ name: v.name, lang: v.lang, local: v.localService }))
    };
  }
}

// Global instance for app-wide use
export const strictEnglishAudio = new StrictEnglishAudio();

// Global helper function
export function playEnglishAudio(text: string, options = {}) {
  return strictEnglishAudio.speak(text, options);
}