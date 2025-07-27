import React from 'react';
import { motion } from 'framer-motion';

interface ProgressData {
  moduleId: number;
  moduleName: string;
  completionPercentage: number;
  starsEarned: number;
  timeSpent: number;
  lastActivity: Date;
  badges: string[];
}

interface LearningProgressWallProps {
  progressData: ProgressData[];
  totalWordsLearned: number;
  streakDays: number;
  onClose: () => void;
}

export function LearningProgressWall({ 
  progressData, 
  totalWordsLearned, 
  streakDays,
  onClose
}: LearningProgressWallProps) {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-xl"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-center">📊 Learning Progress Wall</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{totalWordsLearned}</div>
          <div className="text-sm text-gray-600">Words Learned</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{streakDays}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">
            {progressData.reduce((sum, p) => sum + p.starsEarned, 0)}
          </div>
          <div className="text-sm text-gray-600">Stars Earned</div>
        </div>
      </div>

      <div className="space-y-3">
        {progressData.map((module) => (
          <div key={module.moduleId} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{module.moduleName}</span>
              <span className="text-sm text-gray-600">{module.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${module.completionPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>⭐ {module.starsEarned} stars</span>
              <span>⏱️ {module.timeSpent} min</span>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={onClose}
        className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-medium"
      >
        Close Progress Wall
      </button>
    </motion.div>
  );
}