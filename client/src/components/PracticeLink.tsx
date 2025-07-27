import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, GamepadIcon } from 'lucide-react';

interface PracticeLinkProps {
  title: string;
  description: string;
  url: string;
  icon?: 'game' | 'play' | 'practice';
  className?: string;
  onClick?: () => void;
}

export function PracticeLink({ 
  title, 
  description, 
  url, 
  icon = 'game', 
  className = '', 
  onClick 
}: PracticeLinkProps) {
  
  const getIcon = () => {
    switch (icon) {
      case 'play':
        return <Play className="w-6 h-6" />;
      case 'practice':
        return <ExternalLink className="w-6 h-6" />;
      default:
        return <GamepadIcon className="w-6 h-6" />;
    }
  };

  const handleClick = async () => {
    console.log('Practice link clicked:', title, url);
    
    // Play audio feedback first
    if (onClick) {
      onClick();
    }
    
    // Check if online before opening external links
    if (!navigator.onLine) {
      alert('You are offline. This practice game requires internet connection. Please connect to internet and try again.');
      return;
    }
    
    // Enhanced link opening with better error handling
    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer,width=1024,height=768');
      if (!newWindow) {
        // Popup blocked, show instructions
        alert('Popup blocked! Please allow popups for this site or manually visit: ' + url);
      } else {
        // Success feedback
        console.log('Practice link opened successfully:', title);
      }
    } catch (error) {
      console.error('Failed to open practice link:', error);
      // Fallback: try to navigate directly
      try {
        window.location.href = url;
      } catch (fallbackError) {
        alert('Unable to open practice link. Please manually visit: ' + url);
      }
    }
  };

  return (
    <motion.div
      className={`bg-gradient-to-r from-niger-gold via-yellow-400 to-orange-400 rounded-xl p-6 shadow-xl cursor-pointer border-4 border-transparent hover:border-white transition-all duration-300 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4">
        <div className="bg-white/90 p-3 rounded-full text-niger-orange">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
          <p className="text-white/90 text-sm">{description}</p>
        </div>
        <div className="bg-white/20 p-2 rounded-full">
          <ExternalLink className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="mt-4 bg-white/10 rounded-lg p-3">
        <p className="text-white text-sm font-medium">
          🎮 Click here to practice and have fun!
        </p>
        <p className="text-white/70 text-xs mt-1">
          Requires internet connection
        </p>
      </div>
    </motion.div>
  );
}

// Practice links for different modules
export const MODULE_PRACTICE_LINKS = {
  1: {
    alphabet: {
      title: "🔤 Alphabet Practice Game",
      description: "Practice letter recognition and sounds with interactive games",
      url: "https://www.abcya.com/games/alphabet_recognition"
    },
    numbers: {
      title: "🔢 Number Counting Game", 
      description: "Learn to count from 1 to 20 with fun activities",
      url: "https://www.abcya.com/games/counting_fish"
    }
  },
  2: {
    greetings: {
      title: "👋 Greetings Practice",
      description: "Practice saying hello and introducing yourself",
      url: "https://www.englishclub.com/kids/greetings.htm"
    },
    introductions: {
      title: "🗣️ Introduction Practice Game",
      description: "Practice introducing yourself with interactive conversations",
      url: "https://www.englishclub.com/kids/introductions.htm"
    }
  },
  3: {
    family: {
      title: "👨‍👩‍👧‍👦 Family Members Game",
      description: "Learn family vocabulary with interactive activities",
      url: "https://www.eslgamesplus.com/family-members-vocabulary-esl-interactive-fun-game-online/"
    },
    pronouns: {
      title: "📝 Pronouns Practice",
      description: "Practice using he, she, we, they correctly",
      url: "https://www.englishclub.com/grammar/pronouns.htm"
    }
  },
  4: {
    colors: {
      title: "🌈 Colors and Shapes Game",
      description: "Practice colors and shapes recognition",
      url: "https://www.abcya.com/games/paint_and_make"
    },
    classroom: {
      title: "🏫 Classroom Objects Game",
      description: "Learn school vocabulary with interactive games",
      url: "https://www.eslgamesplus.com/classroom-objects-vocabulary-esl-interactive-fun-game-online/"
    }
  },
  5: {
    verbs: {
      title: "🏃 Action Verbs Game",
      description: "Learn action words through fun activities",
      url: "https://www.eslgamesplus.com/action-verbs-vocabulary-esl-interactive-fun-game-online/"
    },
    routines: {
      title: "⏰ Daily Routines Practice",
      description: "Practice daily activities vocabulary",
      url: "https://www.englishclub.com/kids/daily-routines.htm"
    }
  },
  6: {
    food: {
      title: "🍎 Food Vocabulary Game",
      description: "Learn food names with interactive activities",
      url: "https://www.eslgamesplus.com/food-vocabulary-esl-interactive-fun-game-online/"
    },
    animals: {
      title: "🐾 Animals Practice Game",
      description: "Practice animal vocabulary and plurals",
      url: "https://www.abcya.com/games/farm_animal_sounds"
    }
  },
  7: {
    presentContinuous: {
      title: "🔄 Present Continuous Game",
      description: "Practice -ing verbs and actions happening now",
      url: "https://www.englishclub.com/grammar/verb-tenses_present-continuous.htm"
    }
  },
  8: {
    adjectives: {
      title: "📊 Adjectives Practice",
      description: "Learn descriptive words with fun games",
      url: "https://www.eslgamesplus.com/adjectives-vocabulary-esl-interactive-fun-game-online/"
    },
    prepositions: {
      title: "📍 Prepositions Game",
      description: "Practice in, on, under with interactive activities",
      url: "https://www.englishclub.com/grammar/prepositions.htm"
    }
  },
  9: {
    time: {
      title: "🕐 Time Practice Game",
      description: "Learn to read clocks and tell time",
      url: "https://www.abcya.com/games/telling_time"
    },
    questions: {
      title: "❓ Question Words Practice",
      description: "Practice what, where, when questions",
      url: "https://www.englishclub.com/grammar/questions.htm"
    }
  },
  10: {
    hobbies: {
      title: "🎨 Hobbies Vocabulary Game",
      description: "Learn hobby activities with interactive games",
      url: "https://www.eslgamesplus.com/hobbies-vocabulary-esl-interactive-fun-game-online/"
    },
    pastTense: {
      title: "⏰ Past Tense Practice",
      description: "Practice simple past tense with fun activities",
      url: "https://www.englishclub.com/grammar/verb-tenses_past-simple.htm"
    }
  }
};