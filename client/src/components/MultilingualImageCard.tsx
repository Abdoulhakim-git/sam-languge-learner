import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOfflineAudio } from "@/hooks/useOfflineAudio";

interface MultilingualImageCardProps {
  emoji: string;
  english: string;
  french: string;
  hausa?: string;
  example?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export function MultilingualImageCard({ 
  emoji, 
  english, 
  french, 
  hausa,
  example,
  bgColor = "bg-blue-100",
  textColor = "text-blue-800",
  className = ""
}: MultilingualImageCardProps) {
  const [showSubtitles, setShowSubtitles] = useState(false);
  const { speak, isPlaying } = useOfflineAudio();

  const handleClick = async () => {
    try {
      setShowSubtitles(true);
      
      // CRITICAL: Force English audio for multilingual cards
      await speak(english, {
        rate: 0.8,
        pitch: 1.1,
        volume: 1.0,
        lang: 'en-US' // This ensures English pronunciation only
      });
      
      // Keep subtitles for 2 seconds after audio
      setTimeout(() => setShowSubtitles(false), 2000);
    } catch (error) {
      console.error('Audio error:', error);
      setShowSubtitles(false);
    }
  };

  return (
    <motion.div
      className={`${bgColor} rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-300 relative ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
    >
      {/* Main content */}
      <div className="text-6xl mb-2">{emoji}</div>
      <h3 className={`text-xl font-bold ${textColor} mb-2`}>{english}</h3>
      
      {/* Static French translation */}
      <p className="text-gray-600 text-sm mb-1">French: {french}</p>
      
      {/* Static Hausa translation if provided */}
      {hausa && (
        <p className="text-gray-600 text-sm mb-1">Hausa: {hausa}</p>
      )}
      
      {/* Example if provided */}
      {example && (
        <p className="text-xs italic text-gray-500 mb-2">"{example}"</p>
      )}
      
      {/* Click prompt */}
      <div className="text-xs text-blue-500 font-medium">
        🔊 Click to hear English pronunciation
      </div>

      {/* Animated subtitle overlay when playing */}
      <AnimatePresence>
        {showSubtitles && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-80 rounded-lg flex flex-col justify-center items-center text-white p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Audio indicator */}
            <motion.div
              className="w-4 h-4 bg-green-500 rounded-full mb-4"
              animate={isPlaying ? { scale: [1, 1.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            
            {/* English (currently playing) */}
            <div className="text-center mb-4">
              <div className="text-xs text-green-400 mb-1">🔊 Now Playing:</div>
              <div className="text-lg font-bold text-white">{english}</div>
            </div>
            
            {/* French subtitle */}
            <div className="text-center mb-2">
              <div className="text-xs text-blue-300 mb-1">🇫🇷 Français:</div>
              <div className="text-md text-blue-200">{french}</div>
            </div>
            
            {/* Hausa subtitle if available */}
            {hausa && (
              <div className="text-center">
                <div className="text-xs text-orange-300 mb-1">🇳🇪 Hausa:</div>
                <div className="text-md text-orange-200">{hausa}</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}