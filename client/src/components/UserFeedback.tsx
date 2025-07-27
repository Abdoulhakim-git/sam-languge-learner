import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { bulletproofAudioSystem } from '@/lib/bulletproofAudioSystem';

interface UserFeedbackProps {
  onClose: () => void;
}

export function UserFeedback({ onClose }: UserFeedbackProps) {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async () => {
    await bulletproofAudioSystem.speak("Thank you for your feedback! Your voice helps make SamLang Niger better for everyone!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center">💬 Share Your Experience</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">How do you rate SamLang Niger?</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tell us about your experience:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What do you like most about learning with Teacher Sam?"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleSubmit}
              className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Submit Feedback
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}