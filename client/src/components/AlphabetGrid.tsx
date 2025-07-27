import React from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const VOWELS = ["A", "E", "I", "O", "U"];

interface AlphabetGridProps {
  onLetterClick?: (letter: string) => void;
}

export function AlphabetGrid({ onLetterClick }: AlphabetGridProps) {
  const { playAudio } = useAudio();

  const handleLetterClick = async (letter: string) => {
    console.log('Letter clicked:', letter);
    try {
      // Natural responses without overusing encouraging words
      const responses = [
        `${letter}! Can you say ${letter}? ${letter}!`,
        `That's the letter ${letter}! ${letter} makes many words!`,
        `${letter}! You picked letter ${letter}! ${letter}!`,
        `${letter} is an important letter! ${letter}!`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      await playAudio(randomResponse, "en");
      onLetterClick?.(letter);
    } catch (error) {
      console.error('Letter click error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* All 26 Letters */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
          The 26 Letters of English Alphabet
        </h4>
        
        {/* Visual Example */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-american-blue mb-2">A</div>
              <div className="text-6xl">🍎</div>
              <p className="text-sm text-gray-600 mt-1">Apple</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-american-blue mb-2">B</div>
              <div className="text-6xl">🐝</div>
              <p className="text-sm text-gray-600 mt-1">Bee</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-american-blue mb-2">C</div>
              <div className="text-6xl">🐱</div>
              <p className="text-sm text-gray-600 mt-1">Cat</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-13 gap-2 mb-4">
          {ALPHABET.slice(0, 13).map((letter) => (
            <motion.button
              key={letter}
              className="w-8 h-8 bg-american-blue text-white rounded font-bold text-sm flex items-center justify-center hover:bg-blue-700 transition-colors"
              onClick={() => handleLetterClick(letter)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {letter}
            </motion.button>
          ))}
        </div>
        
        <div className="grid grid-cols-13 gap-2">
          {ALPHABET.slice(13).map((letter) => (
            <motion.button
              key={letter}
              className="w-8 h-8 bg-american-blue text-white rounded font-bold text-sm flex items-center justify-center hover:bg-blue-700 transition-colors"
              onClick={() => handleLetterClick(letter)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {letter}
            </motion.button>
          ))}
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-3">
          Click any letter to hear Sam pronounce it!
        </p>
      </div>

      {/* Vowels and Consonants */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Vowels */}
        <div className="bg-red-50 rounded-xl p-4">
          <h5 className="font-bold text-red-700 mb-3 flex items-center">
            <span className="text-red-500 mr-2">❤️</span>
            5 Vowels
          </h5>
          <div className="flex space-x-3 justify-center mb-3">
            {VOWELS.map((vowel) => (
              <motion.button
                key={vowel}
                className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg hover:bg-red-600 transition-colors"
                onClick={() => handleLetterClick(vowel)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {vowel}
              </motion.button>
            ))}
          </div>
          <p className="text-sm text-red-600 text-center">
            These letters create the core sounds of most words.
          </p>
        </div>
        
        {/* Consonants */}
        <div className="bg-blue-50 rounded-xl p-4">
          <h5 className="font-bold text-blue-700 mb-3 flex items-center">
            <span className="text-blue-500 mr-2">📝</span>
            21 Consonants
          </h5>
          <div className="text-center text-sm text-blue-600 mb-2">
            B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z
          </div>
          <p className="text-sm text-blue-600 text-center">
            Consonants are sounds with closure or restriction in the vocal tract.
          </p>
        </div>
      </div>

      {/* Special Y Letter */}
      <div className="bg-yellow-50 rounded-xl p-4">
        <h5 className="font-bold text-yellow-700 mb-3 flex items-center">
          <span className="text-yellow-500 mr-2">⭐</span>
          Special Letter: Y
        </h5>
        <div className="text-sm text-yellow-700 space-y-2">
          <p><strong>As a consonant:</strong> When Y is at the beginning of a word (yes, yellow)</p>
          <p><strong>As a vowel:</strong> When Y is in the middle or end of a word (happy, cry, gym)</p>
        </div>
      </div>
    </div>
  );
}
