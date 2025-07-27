import { useState, useEffect, useCallback } from 'react';

interface OfflineAudioOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

export function useOfflineAudio() {
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load and cache voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // CRITICAL FIX: Ultra-strict English-only voice selection for offline use
        const allEnglishVoices = availableVoices.filter(voice => {
          const lang = voice.lang.toLowerCase();
          const name = voice.name.toLowerCase();
          
          // Must be English language
          const isEnglish = lang.startsWith('en-us') || lang.startsWith('en-gb') || lang.startsWith('en');
          
          // Must NOT contain any French indicators
          const noFrench = !lang.includes('fr') && 
                          !name.includes('french') && 
                          !name.includes('français') &&
                          !name.includes('francais');
          
          return isEnglish && noFrench;
        });
        
        // Prioritize local English voices to prevent French switching offline
        const localEnglishVoices = allEnglishVoices.filter(voice => voice.localService);
        
        // Find best English voice with strict language filtering
        const maleVoice = localEnglishVoices.find(voice => 
          (voice.name.toLowerCase().includes('male') ||
           voice.name.toLowerCase().includes('david') ||
           voice.name.toLowerCase().includes('daniel') ||
           voice.name.toLowerCase().includes('google us english')) &&
          voice.lang.startsWith('en')
        );
        
        // Fallback priority: local English -> any English -> force English selection
        const bestVoice = maleVoice || 
                         localEnglishVoices[0] || 
                         allEnglishVoices.find(voice => voice.lang === 'en-US') ||
                         allEnglishVoices[0];
        
        if (bestVoice) {
          setPreferredVoice(bestVoice);
          console.log('✅ Offline voice ready:', bestVoice.name, 'Local:', bestVoice.localService);
        }
      };

      // Load voices immediately if available
      loadVoices();
      
      // Listen for voices changed event
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  const speak = useCallback((text: string, options: OfflineAudioOptions = {}) => {
    return new Promise<void>((resolve, reject) => {
      if (!isSupported || !text) {
        reject(new Error('Speech synthesis not supported or no text provided'));
        return;
      }

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply options with defaults optimized for children learning English
      utterance.rate = options.rate ?? 0.7; // Slower for learning
      utterance.pitch = options.pitch ?? 1.1; // Slightly higher for friendliness
      utterance.volume = options.volume ?? 1.0;
      utterance.lang = 'en-US'; // FORCE English language
      
      // CRITICAL: Triple-check voice is English and not French before using
      if (preferredVoice && 
          preferredVoice.lang.startsWith('en') && 
          !preferredVoice.lang.includes('fr') &&
          !preferredVoice.name.toLowerCase().includes('french')) {
        utterance.voice = preferredVoice;
        console.log('✅ Using verified English voice:', preferredVoice.name, 'Lang:', preferredVoice.lang);
      } else {
        // Emergency fallback: find any strictly English voice
        const voices = speechSynthesis.getVoices();
        const emergencyEnglishVoice = voices.find(v => 
          v.lang.startsWith('en') && 
          !v.lang.includes('fr') &&
          !v.name.toLowerCase().includes('french')
        );
        if (emergencyEnglishVoice) {
          utterance.voice = emergencyEnglishVoice;
          console.log('⚠️ Using emergency English voice:', emergencyEnglishVoice.name, 'Lang:', emergencyEnglishVoice.lang);
        } else {
          // Ultimate fallback: clear voice and force English language
          utterance.voice = null;
          console.warn('🚨 No verified English voice found, using system default with forced en-US');
        }
      }
      
      // Final safety check: ensure no French voice or language is set
      if (utterance.voice && (utterance.voice.lang.includes('fr') || utterance.voice.name.toLowerCase().includes('french'))) {
        utterance.voice = null;
        console.warn('🚨 Blocked French voice detected, cleared and forcing English');
      }
      
      // Always force English language regardless of voice
      utterance.lang = 'en-US';

      utterance.onstart = () => {
        setIsPlaying(true);
        console.log('🔊 Audio started:', text.substring(0, 50) + '...');
      };

      utterance.onend = () => {
        setIsPlaying(false);
        resolve();
        console.log('✅ Audio completed');
      };

      utterance.onerror = (event) => {
        setIsPlaying(false);
        console.error('❌ Audio error:', event.error);
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      speechSynthesis.speak(utterance);
    });
  }, [isSupported, preferredVoice]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  const getVoiceInfo = useCallback(() => {
    return {
      isSupported,
      voiceCount: voices.length,
      preferredVoice: preferredVoice?.name || 'None',
      isLocal: preferredVoice?.localService || false,
      allVoices: voices.map(v => ({
        name: v.name,
        lang: v.lang,
        local: v.localService
      }))
    };
  }, [isSupported, voices, preferredVoice]);

  return {
    speak,
    stop,
    isPlaying,
    isSupported,
    voices,
    preferredVoice,
    getVoiceInfo
  };
}