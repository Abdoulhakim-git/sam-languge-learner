export class SimpleAudioService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isCurrentlyPlaying: boolean = false;
  private audioQueue: { text: string; resolve: () => void; reject: (error: any) => void }[] = [];
  private isProcessingQueue: boolean = false;

  private addNaturalPauses(text: string): string {
    // Add natural teaching pauses after sentences
    return text
      .replace(/\./g, '.  ')
      .replace(/!/g, '!  ')
      .replace(/\?/g, '?  ');
  }

  async playAudio(text: string, language: string = "en", onEnd?: () => void): Promise<void> {
    return new Promise((resolve, reject) => {
      // Add to queue instead of interrupting
      this.audioQueue.push({ text, resolve, reject });
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.audioQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    while (this.audioQueue.length > 0) {
      const { text, resolve, reject } = this.audioQueue.shift()!;
      
      try {
        await this.playAudioInternal(text);
        resolve();
      } catch (error) {
        reject(error);
      }

      // Wait a bit between audio clips
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    this.isProcessingQueue = false;
  }

  private async playAudioInternal(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stopCurrentAudio();

      if (!window.speechSynthesis) {
        console.warn('Speech synthesis not supported');
        resolve();
        return;
      }

      try {
        const processedText = this.addNaturalPauses(text);
        const utterance = new SpeechSynthesisUtterance(processedText);
        
        // Enhanced settings for excited teaching voice
        utterance.lang = "en-US";
        utterance.rate = 0.7; // Slower for children
        utterance.pitch = 1.1; // Higher for engagement
        utterance.volume = 1.0;

        // Try to use preferred male voices
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.lang.includes('en-US') && 
          (voice.name.includes('Male') || voice.name.includes('David') || voice.name.includes('Daniel'))
        ) || voices.find(voice => voice.lang.includes('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onstart = () => {
          this.isCurrentlyPlaying = true;
          console.log('Teacher Sam speaking:', text.substring(0, 50) + '...');
        };

        utterance.onend = () => {
          this.currentUtterance = null;
          this.isCurrentlyPlaying = false;
          console.log('Teacher Sam finished speaking');
          resolve();
        };

        utterance.onerror = (event) => {
          console.error('Speech error:', event.error);
          this.currentUtterance = null;
          this.isCurrentlyPlaying = false;
          if (event.error !== 'interrupted') {
            reject(new Error(event.error));
          } else {
            resolve();
          }
        };

        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
        
      } catch (error) {
        console.error('Audio setup error:', error);
        this.isCurrentlyPlaying = false;
        resolve();
      }
    });
  }

  stopCurrentAudio(): void {
    if (this.currentUtterance || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
      this.isCurrentlyPlaying = false;
      console.log('Audio stopped');
    }
  }

  isPlaying(): boolean {
    return this.isCurrentlyPlaying && window.speechSynthesis.speaking;
  }
}

export const simpleAudioService = new SimpleAudioService();