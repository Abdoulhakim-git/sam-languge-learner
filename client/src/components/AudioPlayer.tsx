import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";
import { useOfflineAudio } from "@/hooks/useOfflineAudio";

interface AudioPlayerProps {
  text: string;
  language?: string;
  frenchTranslation?: string;
  hausaTranslation?: string;
  title: string;
  description?: string;
  className?: string;
  onPlay?: () => void;
  onStop?: () => void;
}

export function AudioPlayer({ 
  text, 
  language = "en", 
  frenchTranslation,
  hausaTranslation,
  title, 
  description,
  className = "",
  onPlay,
  onStop
}: AudioPlayerProps) {
  const { speak, stop, isPlaying, isSupported } = useOfflineAudio();

  const handleTogglePlayback = async () => {
    try {
      if (isPlaying) {
        stop();
        onStop?.();
        console.log('Audio stopped:', title);
      } else {
        console.log('Audio starting:', title);
        onPlay?.();
        
        await speak(text, {
          rate: 0.7, // Slower for children learning
          pitch: 1.1, // Friendly tone
          volume: 1.0,
          lang: 'en-US'
        });
        
        onStop?.();
        console.log('Audio completed:', title);
      }
    } catch (error) {
      console.error('Audio player error:', error);
      onStop?.();
    }
  };

  return (
    <div 
      className={`bg-american-blue rounded-xl p-4 text-white ${className}`}
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex items-center space-x-3 mb-3">
        <motion.button 
          className="bg-white text-american-blue rounded-full p-3 hover:bg-gray-100 transition-colors cursor-pointer border-2 border-transparent hover:border-blue-300"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Audio button clicked:', title);
            handleTogglePlayback();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            pointerEvents: 'auto',
            userSelect: 'none',
            touchAction: 'manipulation'
          }}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </motion.button>
        
        <div className="flex-1">
          <div className="text-sm font-medium">{title}</div>
          {description && (
            <div className="text-xs opacity-90">{description}</div>
          )}
        </div>
        
        <Volume2 className="w-5 h-5 opacity-75" />
      </div>
      
      {/* Audio Wave Animation */}
      {isPlaying && (
        <div className="flex space-x-1 mb-3 justify-center">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-white rounded"
              animate={{
                height: [8, 16, 8],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Multilingual Subtitles */}
      <div className="text-xs border-t border-white border-opacity-20 pt-3 space-y-1">
        <p><strong>EN:</strong> {text}</p>
        {frenchTranslation && (
          <p><strong>FR:</strong> {frenchTranslation}</p>
        )}
        {hausaTranslation && (
          <p><strong>HA:</strong> {hausaTranslation}</p>
        )}
      </div>
    </div>
  );
}