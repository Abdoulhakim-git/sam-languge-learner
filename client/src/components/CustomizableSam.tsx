import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RobotSam } from './RobotSam';
import { Button } from './ui/button';

interface SamOutfit {
  id: string;
  name: string;
  description: string;
  type: 'hat' | 'clothing' | 'accessory';
  culturalBackground: string;
}

const SAM_OUTFITS: SamOutfit[] = [
  {
    id: 'hausa-hat',
    name: 'Hausa Cap',
    description: 'Traditional northern Nigerian cap',
    type: 'hat',
    culturalBackground: 'Worn by Hausa people in celebrations'
  },
  {
    id: 'fulani-turban',
    name: 'Fulani Turban',
    description: 'Traditional Fulani headwrap',
    type: 'hat',
    culturalBackground: 'Symbol of wisdom and respect'
  },
  {
    id: 'tuareg-veil',
    name: 'Tuareg Tagelmust',
    description: 'Desert nomad face covering',
    type: 'hat',
    culturalBackground: 'Protection and identity of desert travelers'
  },
  {
    id: 'niger-flag-shirt',
    name: 'Niger Flag Shirt',
    description: 'Patriotic outfit with Niger colors',
    type: 'clothing',
    culturalBackground: 'Shows pride in Niger heritage'
  },
  {
    id: 'traditional-robe',
    name: 'Grand Boubou',
    description: 'Flowing traditional robe',
    type: 'clothing',
    culturalBackground: 'Elegant dress for special occasions'
  },
  {
    id: 'scholar-glasses',
    name: 'Scholar Glasses',
    description: 'Wise teacher glasses',
    type: 'accessory',
    culturalBackground: 'Symbol of knowledge and learning'
  }
];

interface CustomizableSamProps {
  currentOutfits: string[];
  onOutfitChange: (outfits: string[]) => void;
  showCustomizer?: boolean;
  onCloseCustomizer?: () => void;
}

export function CustomizableSam({ 
  currentOutfits, 
  onOutfitChange, 
  showCustomizer = false,
  onCloseCustomizer 
}: CustomizableSamProps) {
  const [selectedOutfits, setSelectedOutfits] = useState<string[]>(currentOutfits);

  const toggleOutfit = (outfitId: string) => {
    const newOutfits = selectedOutfits.includes(outfitId)
      ? selectedOutfits.filter(id => id !== outfitId)
      : [...selectedOutfits, outfitId];
    
    setSelectedOutfits(newOutfits);
    onOutfitChange(newOutfits);
  };

  const getOutfitEmoji = (outfit: SamOutfit) => {
    switch (outfit.id) {
      case 'hausa-hat': return '🧢';
      case 'fulani-turban': return '👳';
      case 'tuareg-veil': return '🧕';
      case 'niger-flag-shirt': return '👕';
      case 'traditional-robe': return '🥻';
      case 'scholar-glasses': return '👓';
      default: return '✨';
    }
  };

  if (!showCustomizer) {
    return (
      <div className="relative">
        <RobotSam
          size="large"
          screenText="Ready to learn!"
          customOutfits={currentOutfits}
        />
      </div>
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="bg-white rounded-2xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-niger-gold mb-2">
            Dress Up Teacher Sam! 👗
          </h2>
          <p className="text-gray-600">
            Choose traditional Niger outfits for your teacher
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sam Preview */}
          <div className="flex-1 flex justify-center">
            <RobotSam
              size="large"
              screenText="Looking good!"
              customOutfits={selectedOutfits}
            />
          </div>

          {/* Outfit Options */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4 text-center">
              Niger Cultural Collection
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {SAM_OUTFITS.map((outfit) => (
                <motion.button
                  key={outfit.id}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedOutfits.includes(outfit.id)
                      ? 'border-niger-gold bg-yellow-50 shadow-lg'
                      : 'border-gray-200 hover:border-niger-gold hover:bg-yellow-50'
                  }`}
                  onClick={() => toggleOutfit(outfit.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getOutfitEmoji(outfit)}</span>
                    <div>
                      <h4 className="font-bold text-gray-800">{outfit.name}</h4>
                      <p className="text-sm text-gray-600">{outfit.description}</p>
                      <p className="text-xs text-niger-gold italic mt-1">
                        {outfit.culturalBackground}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                onClick={onCloseCustomizer}
                className="flex-1 bg-niger-gold hover:bg-yellow-600 text-white"
              >
                Done! ✨
              </Button>
              <Button
                onClick={() => {
                  setSelectedOutfits([]);
                  onOutfitChange([]);
                }}
                variant="outline"
                className="flex-1"
              >
                Remove All
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}