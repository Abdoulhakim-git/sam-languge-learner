export class AudioService {
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private currentAudio: HTMLAudioElement | null = null;

  // Pre-recorded MP3 files with Matthew's voice (male American, slow pace for children)
  private audioFiles: Record<string, string> = {
    // Homepage audio
    'homepage_welcome': '/audio/homepage_welcome.mp3',
    'modules_intro': '/audio/modules_intro.mp3',
    
    // Module 1 - Alphabet & Numbers
    'alphabet_intro': '/audio/module1/alphabet_intro.mp3',
    'vowels_explanation': '/audio/module1/vowels.mp3',
    'consonants_explanation': '/audio/module1/consonants.mp3',
    'letter_y': '/audio/module1/letter_y.mp3',
    'alphabet_complete': '/audio/module1/alphabet_complete.mp3',
    'numbers_intro': '/audio/module1/numbers_intro.mp3',
    'numbers_1_10': '/audio/module1/numbers_1_10.mp3',
    'numbers_11_20': '/audio/module1/numbers_11_20.mp3',
    'numbers_words': '/audio/module1/numbers_words.mp3',
    
    // Individual letters with examples (A is for Apple, etc.)
    'letter_A': '/audio/module1/letters/A.mp3',
    'letter_B': '/audio/module1/letters/B.mp3',
    'letter_C': '/audio/module1/letters/C.mp3',
    'letter_D': '/audio/module1/letters/D.mp3',
    'letter_E': '/audio/module1/letters/E.mp3',
    'letter_F': '/audio/module1/letters/F.mp3',
    'letter_G': '/audio/module1/letters/G.mp3',
    'letter_H': '/audio/module1/letters/H.mp3',
    'letter_I': '/audio/module1/letters/I.mp3',
    'letter_J': '/audio/module1/letters/J.mp3',
    'letter_K': '/audio/module1/letters/K.mp3',
    'letter_L': '/audio/module1/letters/L.mp3',
    'letter_M': '/audio/module1/letters/M.mp3',
    'letter_N': '/audio/module1/letters/N.mp3',
    'letter_O': '/audio/module1/letters/O.mp3',
    'letter_P': '/audio/module1/letters/P.mp3',
    'letter_Q': '/audio/module1/letters/Q.mp3',
    'letter_R': '/audio/module1/letters/R.mp3',
    'letter_S': '/audio/module1/letters/S.mp3',
    'letter_T': '/audio/module1/letters/T.mp3',
    'letter_U': '/audio/module1/letters/U.mp3',
    'letter_V': '/audio/module1/letters/V.mp3',
    'letter_W': '/audio/module1/letters/W.mp3',
    'letter_X': '/audio/module1/letters/X.mp3',
    'letter_Y': '/audio/module1/letters/Y.mp3',
    'letter_Z': '/audio/module1/letters/Z.mp3',
    
    // Practice prompts
    'game_prompt_alphabet': '/audio/module1/game_prompt_alphabet.mp3',
    'game_prompt_numbers': '/audio/module1/game_prompt_numbers.mp3',
  };

  async generateSpeech(text: string, language: string = "en", voice: string = "Matthew"): Promise<string> {
    // Map text to pre-recorded audio file
    const audioKey = this.getAudioKey(text);
    if (this.audioFiles[audioKey]) {
      return this.audioFiles[audioKey];
    }

    // Use browser's Speech Synthesis as temporary solution until MP3 files are ready
    return this.createSpeechFromText(text, language);
  }

  private createSpeechFromText(text: string, language: string = "en"): Promise<string> {
    return new Promise((resolve) => {
      // Always resolve with speech synthesis identifier to trigger proper handling
      resolve('browser-speech-synthesis');
    });
  }

  private getAudioKey(text: string): string {
    const textLower = text.toLowerCase().trim();
    
    // Homepage content
    if (textLower.includes('teacher sam') && textLower.includes('welcome')) return 'homepage_welcome';
    if (textLower.includes('welcome to the modules page')) return 'modules_intro';
    
    // Module 1 content
    if (textLower.includes('hello! i\'m teacher sam') && textLower.includes('alphabet')) return 'alphabet_intro';
    if (textLower.includes('5 vowels: a') && textLower.includes('e – i – o – u')) return 'vowels_explanation';
    if (textLower.includes('21 consonants')) return 'consonants_explanation';
    if (textLower.includes('letter y can be vowel')) return 'letter_y';
    if (textLower.includes('26 letters such as')) return 'alphabet_complete';
    if (textLower.includes('numbers from 1 to 20')) return 'numbers_intro';
    if (textLower.includes('1 2 3 4 5 6 7 8 9 10')) return 'numbers_1_10';
    if (textLower.includes('11 12 13 14 15 16 17 18 19 20')) return 'numbers_11_20';
    if (textLower.includes('one, two, three')) return 'numbers_words';
    if (textLower.includes('click here to play') && textLower.includes('alphabet')) return 'game_prompt_alphabet';
    if (textLower.includes('click here to play') && textLower.includes('numbers')) return 'game_prompt_numbers';
    
    // Individual letters
    if (textLower.includes('a is for apple')) return 'letter_A';
    if (textLower.includes('b is for ball')) return 'letter_B';
    if (textLower.includes('c is for cat')) return 'letter_C';
    if (textLower.includes('d is for dog')) return 'letter_D';
    if (textLower.includes('e is for elephant')) return 'letter_E';
    if (textLower.includes('f is for fish')) return 'letter_F';
    if (textLower.includes('g is for goat')) return 'letter_G';
    if (textLower.includes('h is for house')) return 'letter_H';
    if (textLower.includes('i is for ice')) return 'letter_I';
    if (textLower.includes('j is for jump')) return 'letter_J';
    if (textLower.includes('k is for key')) return 'letter_K';
    if (textLower.includes('l is for lion')) return 'letter_L';
    if (textLower.includes('m is for moon')) return 'letter_M';
    if (textLower.includes('n is for nest')) return 'letter_N';
    if (textLower.includes('o is for orange')) return 'letter_O';
    if (textLower.includes('p is for pen')) return 'letter_P';
    if (textLower.includes('q is for queen')) return 'letter_Q';
    if (textLower.includes('r is for rain')) return 'letter_R';
    if (textLower.includes('s is for sun')) return 'letter_S';
    if (textLower.includes('t is for tree')) return 'letter_T';
    if (textLower.includes('u is for umbrella')) return 'letter_U';
    if (textLower.includes('v is for village')) return 'letter_V';
    if (textLower.includes('w is for water')) return 'letter_W';
    if (textLower.includes('x is for box')) return 'letter_X';
    if (textLower.includes('y is for yellow')) return 'letter_Y';
    if (textLower.includes('z is for zebra')) return 'letter_Z';
    
    return 'default';
  }

  async playAudio(text: string, language: string = "en", onEnd?: () => void): Promise<void> {
    // Stop current audio if playing
    this.stopCurrentAudio();

    // Always use speech synthesis for reliable audio across all devices
    this.playSpeechSynthesis(text, language, onEnd);
  }

  private playSpeechSynthesis(text: string, language: string = "en", onEnd?: () => void): void {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      if (onEnd) onEnd();
      return;
    }

    // Ensure voices are loaded before attempting speech
    const speakText = () => {
      try {
        // Stop any current speech
        speechSynthesis.cancel();

        // Add natural pauses after sentences for teaching style
        const textWithPauses = this.addNaturalPauses(text);

        const utterance = new SpeechSynthesisUtterance(textWithPauses);
        utterance.lang = language === 'en' ? 'en-US' : language;
        utterance.rate = 0.7; // Slower for excited, natural teaching
        utterance.pitch = 1.1; // Slightly higher pitch for excitement
        utterance.volume = 1.0;
        
        // Get available voices
        const voices = speechSynthesis.getVoices();
        
        if (voices.length > 0) {
          // Priority order for voice selection - enthusiastic teaching voices
          const preferredVoices = [
            'Google US English', 'Microsoft David', 'Alex', 'Daniel', 'Fred',
            'Google UK English Male', 'Microsoft Mark', 'Samantha', 'Karen', 'Moira'
          ];
          
          let selectedVoice = null;
          
          // Try to find a preferred voice
          for (const voiceName of preferredVoices) {
            selectedVoice = voices.find(voice => 
              voice.name.includes(voiceName) && voice.lang.startsWith('en')
            );
            if (selectedVoice) break;
          }
          
          // Fallback: find any English male voice
          if (!selectedVoice) {
            selectedVoice = voices.find(voice => 
              voice.lang.startsWith('en') && 
              (voice.name.toLowerCase().includes('male') || 
               voice.name.toLowerCase().includes('david') || 
               voice.name.toLowerCase().includes('daniel'))
            );
          }
          
          // Final fallback: any English voice
          if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
          }
          
          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
        }

        utterance.onstart = () => {
          console.log('Speech started:', text.substring(0, 50) + '...');
        };

        utterance.onend = () => {
          console.log('Speech ended');
          if (onEnd) onEnd();
        };

        utterance.onerror = (event) => {
          console.warn('Speech synthesis error:', event.error);
          if (onEnd) onEnd();
        };

        // For mobile devices, ensure speech starts
        setTimeout(() => {
          speechSynthesis.speak(utterance);
        }, 100);

      } catch (error) {
        console.warn('Speech synthesis failed:', error);
        if (onEnd) onEnd();
      }
    };

    // Handle voice loading for different browsers
    if (speechSynthesis.getVoices().length === 0) {
      // Voices not loaded yet, wait for them
      speechSynthesis.addEventListener('voiceschanged', speakText, { once: true });
      
      // Fallback timeout in case voiceschanged never fires
      setTimeout(speakText, 1000);
    } else {
      // Voices already loaded
      speakText();
    }
  }

  private addNaturalPauses(text: string): string {
    // Add natural pauses for excited teaching style
    let processedText = text;
    
    // Add longer pauses after sentences (periods, exclamation marks, question marks)
    processedText = processedText.replace(/([.!?])\s*/g, '$1... ');
    
    // Add medium pauses after commas and semicolons
    processedText = processedText.replace(/([,;])\s*/g, '$1.. ');
    
    // Add emphasis pauses before important words
    processedText = processedText.replace(/\b(Hello|Welcome|Great|Wonderful|Amazing|Perfect|Excellent)\b/gi, '... $1');
    
    // Add excitement to greetings and positive words
    processedText = processedText.replace(/\b(Hello|Hi|Welcome)\b/gi, '$1!');
    
    return processedText;
  }

  stopCurrentAudio(): void {
    // Stop HTML5 audio
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    
    // Stop speech synthesis
    if ('speechSynthesis' in window && speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }

  isPlaying(): boolean {
    const audioPlaying = this.currentAudio !== null && !this.currentAudio.paused;
    const speechPlaying = 'speechSynthesis' in window && speechSynthesis.speaking;
    return audioPlaying || speechPlaying;
  }

  // Preload audio for better performance
  async preloadAudio(texts: string[], language: string = "en"): Promise<void> {
    const promises = texts.map(async (text) => {
      const key = `${text}-${language}`;
      if (!this.audioElements.has(key)) {
        try {
          const audioUrl = await this.generateSpeech(text, language);
          const audio = new Audio(audioUrl);
          this.audioElements.set(key, audio);
        } catch (error) {
          console.warn(`Failed to preload audio for: ${text}`);
        }
      }
    });

    await Promise.allSettled(promises);
  }
}

export const audioService = new AudioService();
