class FinalAudioSystem {
  private static instance: FinalAudioSystem;
  private isReady: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private audioQueue: Array<{ text: string; resolve: () => void }> = [];
  private isProcessingQueue: boolean = false;

  static getInstance(): FinalAudioSystem {
    if (!FinalAudioSystem.instance) {
      FinalAudioSystem.instance = new FinalAudioSystem();
    }
    return FinalAudioSystem.instance;
  }

  private constructor() {
    this.initialize();
  }

  private initialize(): void {
    console.log('🎵 Initializing Final Audio System');
    
    // Immediately prepare speech synthesis
    this.prepareSpeechSynthesis();
    
    // Set up user interaction detection
    this.enableUserInteraction();
    
    console.log('✅ Final Audio System Ready');
  }

  private prepareSpeechSynthesis(): void {
    if (!window.speechSynthesis) {
      console.error('❌ Speech synthesis not supported');
      return;
    }

    // Force load voices immediately
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log(`🎤 ${voices.length} voices loaded`);
        const englishVoices = voices.filter(v => v.lang.startsWith('en'));
        console.log(`🇺🇸 ${englishVoices.length} English voices available`);
        this.isReady = true;
      }
    };

    // Try to get voices immediately
    loadVoices();
    
    // Also listen for voices changed event
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    // Force voices to load with a dummy utterance
    const dummy = new SpeechSynthesisUtterance(' ');
    dummy.volume = 0;
    dummy.rate = 10;
    window.speechSynthesis.speak(dummy);
    setTimeout(() => window.speechSynthesis.cancel(), 10);
  }

  private enableUserInteraction(): void {
    const activate = () => {
      console.log('👆 User interaction detected - audio activated');
      this.isReady = true;
      
      // Process any queued audio
      if (this.audioQueue.length > 0) {
        this.processQueue();
      }
    };

    document.addEventListener('click', activate, { once: true });
    document.addEventListener('touchstart', activate, { once: true });
    document.addEventListener('keydown', activate, { once: true });
  }

  private getBestVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    
    // Prioritize good English voices
    return voices.find(v => v.name.includes('Google') && v.lang === 'en-US') ||
           voices.find(v => v.lang === 'en-US' && v.default) ||
           voices.find(v => v.lang.startsWith('en-') && v.default) ||
           voices.find(v => v.lang.startsWith('en')) ||
           voices[0] || null;
  }

  private processText(text: string): string {
    // Add natural pauses for children
    return text
      .replace(/\./g, '. ')
      .replace(/!/g, '! ')
      .replace(/\?/g, '? ')
      .replace(/,/g, ', ')
      .replace(/:/g, ': ')
      .replace(/;/g, '; ')
      .trim();
  }

  async playAudio(text: string): Promise<void> {
    console.log(`🎯 Audio request: "${text.substring(0, 40)}..."`);

    if (!this.isReady) {
      console.log('⏳ Queuing audio until ready');
      return new Promise((resolve) => {
        this.audioQueue.push({ text, resolve });
      });
    }

    return this.playAudioNow(text);
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.audioQueue.length === 0) return;

    this.isProcessingQueue = true;
    console.log(`📋 Processing ${this.audioQueue.length} queued audio items`);

    while (this.audioQueue.length > 0) {
      const item = this.audioQueue.shift();
      if (item) {
        await this.playAudioNow(item.text);
        item.resolve();
        
        // Small delay between items
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    this.isProcessingQueue = false;
  }

  private playAudioNow(text: string): Promise<void> {
    return new Promise((resolve) => {
      try {
        // Stop any current audio immediately
        this.stopCurrentAudio();

        // Wait for cleanup
        setTimeout(() => {
          const processedText = this.processText(text);
          const utterance = new SpeechSynthesisUtterance(processedText);

          // Configure for children - slow and clear
          utterance.rate = 0.75;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;
          utterance.lang = 'en-US';

          // Set best available voice
          const voice = this.getBestVoice();
          if (voice) {
            utterance.voice = voice;
            console.log(`🎙️ Using voice: ${voice.name}`);
          }

          let completed = false;
          const startTime = Date.now();

          const finish = (reason: string) => {
            if (!completed) {
              completed = true;
              this.isPlaying = false;
              this.currentUtterance = null;
              const duration = Date.now() - startTime;
              console.log(`✅ Audio completed: ${reason} (${duration}ms)`);
              resolve();
            }
          };

          utterance.onstart = () => {
            this.isPlaying = true;
            console.log('▶️ Audio started playing');
          };

          utterance.onend = () => {
            console.log('🏁 Audio ended naturally');
            finish('natural end');
          };

          utterance.onerror = (event) => {
            if (event.error !== 'interrupted') {
              console.log(`⚠️ Audio error: ${event.error}`);
              finish(`error: ${event.error}`);
            }
          };

          // Reliable completion detection
          let monitorCount = 0;
          const monitorCompletion = () => {
            if (completed) return;
            
            monitorCount++;
            
            // If speech synthesis stopped and we've waited enough
            if (!window.speechSynthesis.speaking && monitorCount > 5) {
              finish('completion detected');
              return;
            }
            
            // Continue monitoring for reasonable duration
            if (monitorCount < 150) { // 150 * 200ms = 30 seconds max
              setTimeout(monitorCompletion, 200);
            } else {
              finish('monitor timeout');
            }
          };

          // Start the utterance
          this.currentUtterance = utterance;
          console.log('🚀 Starting speech synthesis...');
          window.speechSynthesis.speak(utterance);
          
          // Start monitoring after brief delay
          setTimeout(monitorCompletion, 1000);

        }, 100); // Minimal delay for cleanup

      } catch (error) {
        console.error('❌ Audio system error:', error);
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

  clearQueue(): void {
    this.audioQueue = [];
    console.log('🗑️ Audio queue cleared');
  }

  // Test audio system
  async test(): Promise<void> {
    console.log('🧪 Testing audio system...');
    await this.playAudio('Audio system test successful');
  }
}

export const finalAudioSystem = FinalAudioSystem.getInstance();