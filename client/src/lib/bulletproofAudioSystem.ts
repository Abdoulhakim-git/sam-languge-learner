class BulletproofAudioSystem {
  private static instance: BulletproofAudioSystem;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private isReady: boolean = false;
  private pendingAudio: string | null = null;

  static getInstance(): BulletproofAudioSystem {
    if (!BulletproofAudioSystem.instance) {
      BulletproofAudioSystem.instance = new BulletproofAudioSystem();
    }
    return BulletproofAudioSystem.instance;
  }

  private constructor() {
    this.initializeSystem();
  }

  private initializeSystem(): void {
    console.log('🔧 Initializing Bulletproof Audio System');
    
    // Enable user interaction detection
    this.enableUserInteraction();
    
    // Initialize voice loading
    this.loadVoices();
    
    console.log('✅ Bulletproof Audio System Ready');
  }

  private enableUserInteraction(): void {
    const activate = () => {
      console.log('👆 User activated audio system');
      this.isReady = true;
      
      // Play any pending audio
      if (this.pendingAudio) {
        const pending = this.pendingAudio;
        this.pendingAudio = null;
        this.playAudioNow(pending);
      }
    };

    // Listen for any user interaction
    ['click', 'touchstart', 'keydown'].forEach(event => {
      document.addEventListener(event, activate, { once: true });
    });
  }

  private loadVoices(): void {
    const loadVoicesList = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log(`🎤 Loaded ${voices.length} voices`);
        const englishVoices = voices.filter(v => v.lang.startsWith('en'));
        console.log(`🇺🇸 Found ${englishVoices.length} English voices`);
        this.isReady = true;
      }
    };

    // Load voices immediately
    loadVoicesList();
    
    // Also listen for voices change
    window.speechSynthesis.addEventListener('voiceschanged', loadVoicesList);
    
    // Force voice loading with silent utterance
    const silentTest = new SpeechSynthesisUtterance('');
    silentTest.volume = 0;
    silentTest.rate = 10;
    window.speechSynthesis.speak(silentTest);
    setTimeout(() => window.speechSynthesis.cancel(), 50);
  }

  private getBestVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    
    // CRITICAL: Only English voices - absolutely no French/other language voices offline
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    
    if (englishVoices.length === 0) {
      console.warn('⚠️ No English voices found, falling back to default');
      return voices[0] || null;
    }
    
    // Priority order for best child-friendly English voices
    const priorities = [
      (v: SpeechSynthesisVoice) => v.name.includes('Google') && v.lang === 'en-US',
      (v: SpeechSynthesisVoice) => v.name.includes('Microsoft') && v.lang === 'en-US',
      (v: SpeechSynthesisVoice) => v.name.includes('Alex') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.name.includes('Daniel') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.lang === 'en-US' && v.default,
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en-US'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en-GB'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en-AU'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en')
    ];

    for (const priority of priorities) {
      const voice = englishVoices.find(priority);
      if (voice) {
        console.log(`✅ Selected English voice: ${voice.name} (${voice.lang})`);
        return voice;
      }
    }

    // Fallback to first English voice if no priorities match
    const fallbackVoice = englishVoices[0];
    console.log(`✅ Fallback English voice: ${fallbackVoice.name} (${fallbackVoice.lang})`);
    return fallbackVoice;
  }

  private processTextForChildren(text: string): string {
    // Add natural pauses for better comprehension
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

  async playAudio(text: string): Promise<void> {
    console.log(`🎯 Audio Request: "${text.substring(0, 30)}..."`);

    // If not ready, store for later
    if (!this.isReady) {
      console.log('⏳ Audio system not ready, storing request');
      this.pendingAudio = text;
      return Promise.resolve();
    }

    // If currently playing, wait for completion
    if (this.isPlaying) {
      console.log('🔄 Audio already playing, waiting for completion');
      await this.waitForCompletion();
    }

    return this.playAudioNow(text);
  }

  private waitForCompletion(): Promise<void> {
    return new Promise((resolve) => {
      const checkCompletion = () => {
        if (!this.isPlaying) {
          resolve();
        } else {
          setTimeout(checkCompletion, 100);
        }
      };
      checkCompletion();
    });
  }

  private playAudioNow(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Stop any current audio
        this.stopCurrentAudio();

        // Small delay for cleanup
        setTimeout(() => {
          const processedText = this.processTextForChildren(text);
          const utterance = new SpeechSynthesisUtterance(processedText);

          // Configure for children's learning
          utterance.rate = 0.75;  // Slower for comprehension
          utterance.pitch = 1.0;  // Natural pitch
          utterance.volume = 1.0; // Full volume
          utterance.lang = 'en-US';

          // Set best voice
          const voice = this.getBestVoice();
          if (voice) {
            utterance.voice = voice;
            console.log(`🎙️ Using voice: ${voice.name}`);
          }

          let isCompleted = false;
          const startTime = Date.now();

          const completeAudio = (reason: string) => {
            if (!isCompleted) {
              isCompleted = true;
              this.isPlaying = false;
              this.currentUtterance = null;
              const duration = Date.now() - startTime;
              console.log(`✅ Audio completed: ${reason} (${duration}ms)`);
              resolve();
            }
          };

          // Event handlers
          utterance.onstart = () => {
            this.isPlaying = true;
            console.log('▶️ Audio playback started');
          };

          utterance.onend = () => {
            console.log('🏁 Audio ended naturally');
            completeAudio('natural end');
          };

          utterance.onerror = (event) => {
            if (event.error !== 'interrupted') {
              console.log(`⚠️ Audio error: ${event.error}`);
              completeAudio(`error: ${event.error}`);
            }
          };

          // Robust completion monitoring
          let monitorCount = 0;
          const monitorCompletion = () => {
            if (isCompleted) return;
            
            monitorCount++;
            
            // Check if speech synthesis has stopped
            if (!window.speechSynthesis.speaking && monitorCount > 3) {
              completeAudio('monitor detected completion');
              return;
            }
            
            // Continue monitoring for reasonable time
            if (monitorCount < 200) { // 200 * 150ms = 30 seconds max
              setTimeout(monitorCompletion, 150);
            } else {
              completeAudio('monitor timeout');
            }
          };

          // Start the audio
          this.currentUtterance = utterance;
          console.log('🚀 Starting speech synthesis...');
          window.speechSynthesis.speak(utterance);
          
          // Start monitoring after brief delay
          setTimeout(monitorCompletion, 500);

        }, 150); // Allow cleanup time

      } catch (error) {
        console.error('❌ Audio system error:', error);
        this.isPlaying = false;
        this.currentUtterance = null;
        reject(error);
      }
    });
  }

  stopCurrentAudio(): void {
    if (this.currentUtterance || this.isPlaying) {
      try {
        window.speechSynthesis.cancel();
        console.log('⏹️ Audio stopped');
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

  // Test the system
  async testSystem(): Promise<void> {
    console.log('🧪 Testing Bulletproof Audio System...');
    await this.playAudio('Bulletproof audio system test successful. Teacher Sam is ready to help you learn English!');
  }
}

export const bulletproofAudioSystem = BulletproofAudioSystem.getInstance();