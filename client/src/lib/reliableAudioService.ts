export class ReliableAudioService {
  private static instance: ReliableAudioService;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;

  static getInstance(): ReliableAudioService {
    if (!ReliableAudioService.instance) {
      ReliableAudioService.instance = new ReliableAudioService();
    }
    return ReliableAudioService.instance;
  }

  private addNaturalPauses(text: string): string {
    return text
      .replace(/\./g, '.  ')
      .replace(/!/g, '!  ')
      .replace(/\?/g, '?  ');
  }

  async playAudio(text: string): Promise<void> {
    return new Promise((resolve) => {
      // Stop any current audio first
      this.stopAudio();

      if (!window.speechSynthesis) {
        console.warn('Speech synthesis not supported');
        resolve();
        return;
      }

      try {
        const processedText = this.addNaturalPauses(text);
        const utterance = new SpeechSynthesisUtterance(processedText);
        
        utterance.lang = "en-US";
        utterance.rate = 0.7;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;

        // Get voices and prefer male English voices
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.lang.includes('en-US') && 
          (voice.name.includes('Male') || voice.name.includes('David'))
        ) || voices.find(voice => voice.lang.includes('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onstart = () => {
          this.isPlaying = true;
          console.log('Teacher Sam speaking:', text.substring(0, 50) + '...');
        };

        utterance.onend = () => {
          this.currentUtterance = null;
          this.isPlaying = false;
          console.log('Teacher Sam finished speaking');
          resolve();
        };

        utterance.onerror = (event) => {
          if (event.error !== 'interrupted') {
            console.error('Speech error:', event.error);
          }
          this.currentUtterance = null;
          this.isPlaying = false;
          resolve();
        };

        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
        
      } catch (error) {
        console.error('Audio setup error:', error);
        this.isPlaying = false;
        resolve();
      }
    });
  }

  stopAudio(): void {
    if (this.currentUtterance || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
      this.isPlaying = false;
      console.log('Audio stopped');
    }
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }
}

export const reliableAudioService = ReliableAudioService.getInstance();