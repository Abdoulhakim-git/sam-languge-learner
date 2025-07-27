import React from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";

const NUMBERS_1_TO_10 = Array.from({ length: 10 }, (_, i) => i + 1);
const NUMBERS_11_TO_20 = Array.from({ length: 10 }, (_, i) => i + 11);

const NUMBER_WORDS: { [key: number]: string } = {
  1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
  6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten",
  11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen", 15: "Fifteen",
  16: "Sixteen", 17: "Seventeen", 18: "Eighteen", 19: "Nineteen", 20: "Twenty"
};

interface NumbersGridProps {
  onNumberClick?: (number: number) => void;
}

export function NumbersGrid({ onNumberClick }: NumbersGridProps) {
  const { playAudio } = useAudio();

  const handleNumberClick = async (number: number) => {
    console.log('Number clicked:', number);
    try {
      // Natural responses without overusing encouraging words
      const responses = [
        `${number}! That's ${NUMBER_WORDS[number]}! Can you count to ${number}?`,
        `${NUMBER_WORDS[number]}! You chose number ${number}!`,
        `${number} is ${NUMBER_WORDS[number]}! Let's count!`,
        `${NUMBER_WORDS[number]}! Number ${number} is important!`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      await playAudio(randomResponse, "en");
      onNumberClick?.(number);
    } catch (error) {
      console.error('Number click error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Numbers Grid */}
      <div className="bg-orange-50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
          Numbers 1 to 20
        </h4>
        
        {/* Visual Examples */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-niger-gold mb-2">1</div>
              <div className="text-6xl">🐪</div>
              <p className="text-sm text-gray-600 mt-1">One Camel</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-niger-gold mb-2">2</div>
              <div className="text-6xl">🌳🌳</div>
              <p className="text-sm text-gray-600 mt-1">Two Trees</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-niger-gold mb-2">3</div>
              <div className="text-6xl">🏠🏠🏠</div>
              <p className="text-sm text-gray-600 mt-1">Three Houses</p>
            </div>
          </div>
        </div>
        
        {/* Numbers 1-10 */}
        <div className="mb-6">
          <h5 className="text-lg font-bold text-orange-700 mb-4 text-center">Numbers 1-10</h5>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {NUMBERS_1_TO_10.map((number) => (
              <motion.button
                key={number}
                className="w-24 h-24 bg-niger-gold text-white rounded-xl flex items-center justify-center font-bold text-xl hover:bg-orange-600 transition-colors border-2 border-yellow-300"
                onClick={() => handleNumberClick(number)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {number}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Numbers 11-20 */}
        <div className="mb-6">
          <h5 className="text-lg font-bold text-orange-700 mb-4 text-center">Numbers 11-20</h5>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {NUMBERS_11_TO_20.map((number) => (
              <motion.button
                key={number}
                className="w-24 h-24 bg-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-xl hover:bg-orange-600 transition-colors border-2 border-orange-300"
                onClick={() => handleNumberClick(number)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {number}
              </motion.button>
            ))}
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-600">
          Click any number to hear Sam say it in English!
        </p>
      </div>

      {/* Numbers in Words Table - Fixed Layout */}
      <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden mt-6">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h5 className="font-bold text-gray-800">Complete Numbers 1-20 with Words</h5>
        </div>
        
        {/* Numbers 1-10 */}
        <div className="p-4 border-b border-gray-100">
          <h6 className="text-sm font-semibold text-gray-600 mb-3">Numbers 1-10</h6>
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
              <motion.button
                key={number}
                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-3 transition-colors min-h-[60px]"
                onClick={() => handleNumberClick(number)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-niger-gold mb-1">{number}</div>
                  <div className="text-xs font-medium text-gray-800">{NUMBER_WORDS[number]}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Numbers 11-20 */}
        <div className="p-4">
          <h6 className="text-sm font-semibold text-gray-600 mb-3">Numbers 11-20</h6>
          <div className="grid grid-cols-5 gap-3">
            {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((number) => (
              <motion.button
                key={number}
                className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-3 transition-colors min-h-[60px]"
                onClick={() => handleNumberClick(number)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-niger-gold mb-1">{number}</div>
                  <div className="text-xs font-medium text-gray-800">{NUMBER_WORDS[number]}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="p-4 text-center bg-gray-50">
          <p className="text-sm text-gray-500 mb-3">Click any number to hear Teacher Sam say it!</p>
          <motion.button
            className="bg-american-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            onClick={() => playAudio("Let me count from one to twenty. One, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.", "en")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔊 Hear Sam Count All Numbers 1-20
          </motion.button>
        </div>
      </div>
    </div>
  );
}
