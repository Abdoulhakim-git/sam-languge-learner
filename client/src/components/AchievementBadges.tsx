import React from 'react';
import { motion } from 'framer-motion';

interface AchievementBadgesProps {
  userProgress: number[];
  onClose: () => void;
}

export function AchievementBadges({ userProgress, onClose }: AchievementBadgesProps) {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 max-w-md mx-auto shadow-xl"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h3 className="text-xl font-bold mb-4 text-center">🏆 Achievement Badges</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl mb-2">⭐</div>
          <div className="font-medium">Zinder Star</div>
          <div className="text-xs text-gray-600">Complete 5 modules</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl mb-2">🌟</div>
          <div className="font-medium">Sahel Scholar</div>
          <div className="text-xs text-gray-600">Master pronunciation</div>
        </div>
      </div>
      <button 
        onClick={onClose}
        className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
      >
        Close
      </button>
    </motion.div>
  );
}