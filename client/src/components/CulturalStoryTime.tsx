import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { bulletproofAudioSystem } from '@/lib/bulletproofAudioSystem';

interface CulturalStoryTimeProps {
  onClose: () => void;
}

const STORIES = [
  {
    id: 1,
    title: "The Clever Hare",
    description: "A traditional Niger story about wisdom and intelligence",
    content: "Once upon a time in the Sahel desert of Niger, there lived a clever hare named Kune. While all the animals suffered from drought, Kune discovered that the mighty lion was hoarding all the water from the only remaining well. The other animals were too afraid to challenge the lion, but clever Kune had a plan. He told the lion, 'Great King, I have heard there is another lion who claims to be stronger than you!' The proud lion roared, 'Impossible! Show me this pretender!' Kune led the lion to the well and pointed at the lion's own reflection in the water. 'There he is!' said Kune. The angry lion jumped into the well to fight his reflection and got stuck. Kune saved all the animals by using his wisdom instead of strength. The moral: Intelligence and cleverness can overcome brute force.",
    moral: "Use your brain, not just your strength",
    vocabulary: ["clever", "wisdom", "drought", "hoarding", "reflection", "intelligence"]
  },
  {
    id: 2,
    title: "The Hot Sun",
    description: "Why the sun is so hot in Niger - an ancient legend",
    content: "Long, long ago, the sun was gentle and cool, giving just enough warmth to help crops grow in Niger. The people lived happily, farming and raising cattle. But there was a greedy chief who wanted more rain for his land only. He climbed the highest mountain and shouted angry words at the sun, demanding it send all the rain to his village alone. The sun felt hurt and sad by these selfish words. 'If humans only complain and make demands,' said the sun, 'then I will show them my true power.' From that day, the sun grew hotter and hotter to teach people about respect and gratitude. The wise elders say that when people learn to appreciate what they have and share with others, the sun will become gentle again. This is why in Niger, we always say 'thank you' for the sun's light and ask for wisdom to use it well.",
    moral: "Be grateful for what you have and share with others",
    vocabulary: ["gentle", "crops", "greedy", "selfish", "respect", "gratitude", "appreciate"]
  },
  {
    id: 3,
    title: "Star Boy",
    description: "A young boy's magical journey to the stars",
    content: "In a small village near Niamey, there lived a curious boy named Moussa who loved to study the stars every night. While other children played, Moussa would lie on his back and wonder about the twinkling lights above. His grandmother told him stories about the ancestors who became stars to watch over their families. One clear night, the brightest star spoke to Moussa: 'Young one, your love of learning has caught our attention. Would you like to visit us?' Suddenly, Moussa found himself floating up, up, up into the sky! The stars showed him amazing sights - other worlds, other children learning just like him, and the vast beauty of the universe. The star elders told him, 'Education is the bridge between earth and sky. Share what you learn with others.' When Moussa returned to earth, he became the best student in his village and later a great teacher, always remembering that learning connects us to something greater than ourselves.",
    moral: "Education and curiosity can take you anywhere",
    vocabulary: ["curious", "ancestors", "universe", "education", "bridge", "twinkling", "vast"]
  }
];

export function CulturalStoryTime({ onClose }: CulturalStoryTimeProps) {
  const [selectedStory, setSelectedStory] = useState(STORIES[0]);
  const [isReading, setIsReading] = useState(false);

  const readStoryAloud = async () => {
    setIsReading(true);
    try {
      await bulletproofAudioSystem.speak(`${selectedStory.title}. ${selectedStory.content}`);
    } catch (error) {
      console.warn('Story reading audio failed:', error);
    } finally {
      setIsReading(false);
    }
  };

  const explainVocabulary = async () => {
    try {
      const vocabText = `Let's learn new words from this story! ${selectedStory.vocabulary.join(', ')}. These are important English words that will help you speak better!`;
      await bulletproofAudioSystem.speak(vocabText);
    } catch (error) {
      console.warn('Vocabulary audio failed:', error);
    }
  };

  const shareStoryMoral = async () => {
    try {
      await bulletproofAudioSystem.speak(`The lesson from this story is: ${selectedStory.moral}. Remember this wisdom in your own life!`);
    } catch (error) {
      console.warn('Moral audio failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center text-orange-600">📚 Cultural Story Time</h3>
        
        <div className="mb-6">
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {STORIES.map(story => (
              <button
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedStory.id === story.id 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {story.title}
              </button>
            ))}
          </div>
          
          <div className="bg-orange-50 rounded-lg p-6">
            <h4 className="font-bold text-xl mb-2 text-orange-700">{selectedStory.title}</h4>
            <p className="text-sm text-gray-600 mb-4 italic">{selectedStory.description}</p>
            
            <div className="prose prose-lg text-gray-800 leading-relaxed mb-4">
              {selectedStory.content}
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <h5 className="font-semibold text-yellow-800 mb-1">Story Moral:</h5>
              <p className="text-yellow-700">{selectedStory.moral}</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h5 className="font-semibold text-blue-800 mb-2">New Vocabulary:</h5>
              <div className="flex flex-wrap gap-2">
                {selectedStory.vocabulary.map((word, index) => (
                  <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            <button 
              onClick={readStoryAloud}
              disabled={isReading}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 flex items-center gap-2"
            >
              {isReading ? '🔊 Reading...' : '🔊 Read Story Aloud'}
            </button>
            
            <button 
              onClick={explainVocabulary}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              📝 Learn Vocabulary
            </button>
            
            <button 
              onClick={shareStoryMoral}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2"
            >
              💡 Story Lesson
            </button>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-medium"
        >
          Close Story Time
        </button>
      </motion.div>
    </div>
  );
}