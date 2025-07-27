import { useState, useCallback } from "react";
import fixedAudioSystem from "@/lib/fixedAudioSystem";

export interface UseAudioReturn {
  isPlaying: boolean;
  currentText: string | null;
  playAudio: (text: string, language?: string) => Promise<void>;
  stopAudio: () => void;
  preloadAudio: (texts: string[], language?: string) => Promise<void>;
}

export function useAudio(): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState<string | null>(null);

  const playAudio = useCallback(async (text: string, language?: string) => {
    if (!text?.trim()) {
      console.warn('🎤 useAudio: Empty text provided');
      return;
    }

    try {
      setIsPlaying(true);
      setCurrentText(text);
      console.log(`🎤 useAudio: Playing: "${text.substring(0, 50)}..."`);
      await fixedAudioSystem.playAudio(text);
      console.log(`🎤 useAudio: Completed: "${text.substring(0, 30)}..."`);
    } catch (error) {
      console.error(`🎤 useAudio: Failed: "${text.substring(0, 30)}..."`, error);
    } finally {
      setIsPlaying(false);
      setCurrentText(null);
    }
  }, []);

  const stopAudio = useCallback(() => {
    fixedAudioSystem.stopAudio();
    setIsPlaying(false);
    setCurrentText(null);
    console.log('🎤 useAudio: Stopped');
  }, []);

  const preloadAudio = useCallback(async (texts: string[], language?: string) => {
    console.log(`🎤 useAudio: System ready for ${texts.length} texts`);
    // No actual preloading needed for speech synthesis
  }, []);

  return {
    isPlaying,
    currentText,
    playAudio,
    stopAudio,
    preloadAudio,
  };
}
