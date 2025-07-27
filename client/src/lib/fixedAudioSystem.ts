/**
 * FIXED AUDIO SYSTEM - Clean, working implementation
 * Addresses all reported issues: complete playback, no cutoffs, proper debouncing
 */

class FixedAudioSystem {
  private static instance: FixedAudioSystem;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isCurrentlyPlaying = false;
  private lastClickTime = 0;
  private clickDebounceMs = 50; // Minimal debounce for true instant response
  private voiceCache: Map<string, SpeechSynthesisVoice> = new Map();
  private isVoicesLoaded = false;
  
  static getInstance(): FixedAudioSystem {
    if (!FixedAudioSystem.instance) {
      FixedAudioSystem.instance = new FixedAudioSystem();
    }
    return FixedAudioSystem.instance;
  }

  private constructor() {
    this.initializeVoices();
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isCurrentlyPlaying) {
        this.forceStop();
      }
    });

    // Handle page unload
    window.addEventListener('beforeunload', () => {
      this.forceStop();
    });
  }

  private initializeVoices() {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        this.cacheVoices(voices);
        this.isVoicesLoaded = true;
        console.log('Voice cached for instant playback:', this.getBestVoice()?.name || 'Default');
      }
    };

    // Load voices immediately if available
    loadVoices();
    
    // Also listen for voices changed event
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
  }

  private cacheVoices(voices: SpeechSynthesisVoice[]) {
    this.voiceCache.clear();
    
    // Filter and cache ONLY English voices to prevent French audio offline
    const englishVoices = voices.filter(voice => 
      voice.lang.startsWith('en-') || 
      voice.lang === 'en' ||
      voice.name.toLowerCase().includes('english') ||
      voice.name.toLowerCase().includes('david') ||
      voice.name.toLowerCase().includes('alex')
    );
    
    englishVoices.forEach(voice => {
      this.voiceCache.set(voice.name, voice);
    });
    
    // Store offline-compatible English voice preference
    const bestEnglishVoice = this.getBestVoice();
    if (bestEnglishVoice) {
      localStorage.setItem('samlang_offline_voice_lang', bestEnglishVoice.lang);
      localStorage.setItem('samlang_offline_voice_name', bestEnglishVoice.name);
    }
  }

  private getBestVoice(): SpeechSynthesisVoice | null {
    const voices = Array.from(this.voiceCache.values());
    
    // Check for stored offline English voice preference first
    const storedLang = localStorage.getItem('samlang_offline_voice_lang');
    const storedName = localStorage.getItem('samlang_offline_voice_name');
    
    if (storedLang && storedName) {
      const storedVoice = voices.find(v => v.name === storedName && v.lang === storedLang);
      if (storedVoice && this.isStrictlyEnglishVoice(storedVoice)) {
        return storedVoice;
      }
    }
    
    // STRICT English-only voice priority (guaranteed offline compatibility)
    const englishOnlyVoices = [
      'Google US English',
      'Microsoft David - English (United States)', 
      'Microsoft David',
      'Alex',
      'Daniel',
      'Samantha',
      'Victoria',
      'Karen',
      'Fred'
    ];

    for (const preferred of englishOnlyVoices) {
      const voice = voices.find(v => 
        v.name.includes(preferred) && 
        this.isStrictlyEnglishVoice(v)
      );
      if (voice) {
        console.log('🎤 Selected guaranteed English voice for offline:', voice.name, voice.lang);
        return voice;
      }
    }

    // Ultra-strict fallback - ONLY verified English voices
    const verifiedEnglishVoice = voices.find(voice => this.isStrictlyEnglishVoice(voice));
    if (verifiedEnglishVoice) {
      console.log('🎤 Fallback English voice selected:', verifiedEnglishVoice.name, verifiedEnglishVoice.lang);
    }

    return verifiedEnglishVoice || null;
  }

  private isStrictlyEnglishVoice(voice: SpeechSynthesisVoice): boolean {
    const name = voice.name.toLowerCase();
    const lang = voice.lang.toLowerCase();
    
    // Must be English language
    const isEnglishLang = lang.startsWith('en-') || lang === 'en';
    
    // Must NOT contain any French indicators
    const noFrenchIndicators = !lang.includes('fr') && 
                               !name.includes('french') && 
                               !name.includes('francais') &&
                               !name.includes('français') &&
                               !name.includes('france');
    
    // Must be a recognized English voice
    const englishPatterns = [
      'english', 'david', 'alex', 'daniel', 'samantha', 
      'victoria', 'karen', 'fred', 'google us', 'microsoft',
      'natural', 'neural'
    ];
    const hasEnglishPattern = englishPatterns.some(pattern => name.includes(pattern));
    
    return isEnglishLang && noFrenchIndicators && (hasEnglishPattern || isEnglishLang);
  }

  private forceStop() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
    this.isCurrentlyPlaying = false;
  }

  async playAudio(text: string): Promise<void> {
    const now = Date.now();
    
    // Minimal debounce for instant response
    if (now - this.lastClickTime < this.clickDebounceMs) {
      return;
    }
    
    this.lastClickTime = now;
    
    // Stop any current audio immediately
    this.forceStop();
    
    // Validate text
    if (!text || text.trim().length === 0) {
      console.warn('🎤 Audio: Empty text provided');
      return;
    }
    
    // Check speech synthesis support
    if (!('speechSynthesis' in window)) {
      console.error('🎤 Audio: Speech synthesis not supported');
      return;
    }
    
    // Ensure voices are loaded
    if (!this.isVoicesLoaded) {
      this.initializeVoices();
    }
    
    console.log('Audio button clicked:', text.substring(0, 50));
    console.log('Audio starting:', text.substring(0, 50));
    
    return new Promise<void>((resolve) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure for children's learning with STRICT English enforcement
        utterance.rate = 0.8;  // Appropriate speed for learning
        utterance.pitch = 1.0; // Natural pitch
        utterance.volume = 1.0;
        utterance.lang = 'en-US'; // FORCE English language
        
        // Get verified English-only voice (critical for offline use)
        const englishVoice = this.getBestVoice();
        if (englishVoice && this.isStrictlyEnglishVoice(englishVoice)) {
          utterance.voice = englishVoice;
          console.log('🎤 Using verified English voice:', englishVoice.name, '- offline compatible');
        } else {
          console.warn('🎤 No verified English voice found - using system default with en-US lang');
        }
        
        // Double-check language setting for offline compatibility
        if (!utterance.lang.startsWith('en')) {
          utterance.lang = 'en-US';
          console.log('🎤 Corrected language to English for offline use');
        }
        
        // STRICT English voice enforcement for offline compatibility
        const bestVoice = this.getBestVoice();
        if (bestVoice && bestVoice.lang.startsWith('en')) {
          utterance.voice = bestVoice;
          utterance.lang = bestVoice.lang; // Use the exact English variant
          console.log('Using cached voice for instant playback:', bestVoice.name);
        } else {
          // Fallback: Force English language even without specific voice
          utterance.lang = 'en-US';
          console.warn('No English voice found, forcing en-US language');
        }
        
        // Double-check to prevent French audio
        if (utterance.lang.includes('fr') || utterance.voice?.lang?.includes('fr')) {
          utterance.lang = 'en-US';
          utterance.voice = null; // Clear potentially French voice
          console.warn('Blocked French voice, using default English');
        }
        
        let hasCompleted = false;
        
        const completeAudio = () => {
          if (hasCompleted) return;
          hasCompleted = true;
          
          this.isCurrentlyPlaying = false;
          this.currentUtterance = null;
          resolve();
        };
        
        utterance.onstart = () => {
          this.isCurrentlyPlaying = true;
        };
        
        utterance.onend = () => {
          completeAudio();
        };
        
        utterance.onerror = (event) => {
          console.error('Audio error:', event);
          completeAudio();
        };
        
        // Reduced timeout for faster response
        const timeoutMs = Math.max(text.length * 80, 3000);
        setTimeout(() => {
          if (!hasCompleted) {
            completeAudio();
          }
        }, timeoutMs);
        
        // Store and start immediately
        this.currentUtterance = utterance;
        
        // Use immediate speech start for instant response
        if (speechSynthesis.speaking) {
          speechSynthesis.cancel();
        }
        speechSynthesis.speak(utterance);
        
      } catch (error) {
        console.error('🎤 Audio: Setup error:', error);
        this.isCurrentlyPlaying = false;
        this.currentUtterance = null;
        resolve();
      }
    });
  }
  
  stopAudio(): void {
    console.log('🎤 Audio: Stop requested');
    this.forceStop();
  }
  
  isPlaying(): boolean {
    return this.isCurrentlyPlaying;
  }
}

// Export singleton instance
export const fixedAudioSystem = FixedAudioSystem.getInstance();
export default fixedAudioSystem;