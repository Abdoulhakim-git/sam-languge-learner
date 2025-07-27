import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play, GamepadIcon } from "lucide-react";

interface PracticeActivityProps {
  title: string;
  description: string;
  gameUrl: string;
  icon?: "game" | "play" | "practice";
  difficulty?: "easy" | "medium" | "hard";
  moduleTheme?: string;
  className?: string;
}

export function PracticeActivity({ 
  title, 
  description, 
  gameUrl, 
  icon = "game",
  difficulty = "easy",
  moduleTheme = "blue",
  className = "" 
}: PracticeActivityProps) {
  
  const getIcon = () => {
    switch (icon) {
      case "play": return <Play className="w-6 h-6" />;
      case "practice": return <GamepadIcon className="w-6 h-6" />;
      default: return <GamepadIcon className="w-6 h-6" />;
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 border-green-300";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "hard": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-green-100 text-green-800 border-green-300";
    }
  };

  const getThemeColors = () => {
    switch (moduleTheme) {
      case "orange": return "from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700";
      case "green": return "from-green-400 to-green-600 hover:from-green-500 hover:to-green-700";
      case "purple": return "from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700";
      case "red": return "from-red-400 to-red-600 hover:from-red-500 hover:to-red-700";
      default: return "from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700";
    }
  };

  const handlePracticeClick = () => {
    try {
      window.open(gameUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to open practice activity:', error);
    }
  };

  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${getThemeColors()} text-white`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="text-xl font-fredoka text-gray-800">{title}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor()}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400" />
      </div>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      
      <motion.button
        onClick={handlePracticeClick}
        className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r ${getThemeColors()} text-white font-bold text-lg transition-all duration-300 shadow-lg`}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <Play className="w-5 h-5" />
          <span>Start Practice Activity</span>
        </div>
      </motion.button>
      
      <p className="text-xs text-gray-500 mt-3 text-center">
        Opens in new window • Safe educational content
      </p>
    </motion.div>
  );
}

// Practice activities database for all modules
export const PRACTICE_ACTIVITIES = {
  module1_part1: {
    title: "Alphabet Adventure Game",
    description: "Practice letter recognition and sounds with fun interactive games. Match letters, find missing letters, and learn the alphabet through play!",
    gameUrl: "https://learnenglishkids.britishcouncil.org/games/the-alphabet-song",
    icon: "game" as const,
    difficulty: "easy" as const,
    moduleTheme: "blue" as const
  },
  module1_part2: {
    title: "Numbers Counting Fun",
    description: "Count objects, match numbers, and practice number recognition with engaging activities. Perfect for learning numbers 1-20!",
    gameUrl: "https://www.eslgamesplus.com/numbers-1-to-10-esl-vocabulary-game/",
    icon: "play" as const,
    difficulty: "easy" as const,
    moduleTheme: "blue" as const
  },
  module2_part1: {
    title: "Greetings Practice Game",
    description: "Learn how to greet people in different situations. Practice saying hello, goodbye, and polite expressions through interactive scenarios!",
    gameUrl: "https://learnenglishkids.britishcouncil.org/games/whats-your-name",
    icon: "game" as const,
    difficulty: "easy" as const,
    moduleTheme: "orange" as const
  },
  module2_part2: {
    title: "Introduction Speaking Practice",
    description: "Practice introducing yourself and asking about others. Learn to share your name, age, and where you live through fun activities!",
    gameUrl: "https://www.eslgamesplus.com/personal-information-esl-vocabulary-game/",
    icon: "practice" as const,
    difficulty: "easy" as const,
    moduleTheme: "orange" as const
  },
  module3_part1: {
    title: "Family Members Game",
    description: "Meet the family! Learn family vocabulary and practice using family words through matching games and fun activities.",
    gameUrl: "https://learnenglishkids.britishcouncil.org/games/family",
    icon: "game" as const,
    difficulty: "easy" as const,
    moduleTheme: "green" as const
  },
  module4_part1: {
    title: "Classroom Objects Game",
    description: "Learn school vocabulary! Practice identifying classroom objects like pen, book, chair, table, and bag through interactive activities.",
    gameUrl: "https://learnenglishkids.britishcouncil.org/games/school",
    icon: "game" as const,
    difficulty: "easy" as const,
    moduleTheme: "orange" as const
  },
  module5_part1: {
    title: "Daily Actions Practice",
    description: "Practice common verbs like eat, sleep, play, read, and write. Learn action words through fun games and activities!",
    gameUrl: "https://www.eslgamesplus.com/verbs-esl-vocabulary-game/",
    icon: "play" as const,
    difficulty: "easy" as const,
    moduleTheme: "red" as const
  },
  module6_part1: {
    title: "Food and Animals Quiz",
    description: "Explore food vocabulary and animal names. Practice using 'I like...' and plural forms through engaging activities!",
    gameUrl: "https://learnenglishkids.britishcouncil.org/games/food",
    icon: "game" as const,
    difficulty: "easy" as const,
    moduleTheme: "yellow" as const
  },
  module7_part1: {
    title: "Present Continuous Action Game",
    description: "Practice actions happening now! Learn -ing verbs and can/can't abilities through interactive speaking activities.",
    gameUrl: "https://www.eslgamesplus.com/present-continuous-esl-grammar-game/",
    icon: "practice" as const,
    difficulty: "medium" as const,
    moduleTheme: "indigo" as const
  },
  module8_part1: {
    title: "Adjectives and Positions Fun",
    description: "Describe objects and learn position words! Practice big/small, happy/sad, and in/on/under through visual games.",
    gameUrl: "https://learnenglishkids.britishcouncil.org/games/adjectives",
    icon: "game" as const,
    difficulty: "medium" as const,
    moduleTheme: "pink" as const
  },
  module9_part1: {
    title: "Time and Question Practice",
    description: "Learn to tell time and ask questions! Practice o'clock times and question words (what, where, when, who, why, how).",
    gameUrl: "https://www.eslgamesplus.com/time-esl-vocabulary-game/",
    icon: "play" as const,
    difficulty: "medium" as const,
    moduleTheme: "teal" as const
  },
  module10_part1: {
    title: "Hobbies and Past Tense Adventure",
    description: "Explore hobbies and learn past tense! Practice leisure activities and -ed verb forms through storytelling games.",
    gameUrl: "https://learnenglishkids.britishcouncil.org/games/hobbies",
    icon: "game" as const,
    difficulty: "medium" as const,
    moduleTheme: "cyan" as const
  },
  module3_part2: {
    title: "Pronouns and Possessives Practice",
    description: "Master he, she, we, they and possessive adjectives my, your, his, her through fun exercises!",
    gameUrl: "https://www.eslgamesplus.com/pronouns-esl-grammar-game/",
    icon: "practice" as const,
    difficulty: "easy" as const,
    moduleTheme: "green" as const
  },
  module6_part2: {
    title: "Plurals and 'I like' Expressions",
    description: "Practice making words plural and expressing preferences with 'I like...' and 'There is/are' constructions.",
    gameUrl: "https://www.eslgamesplus.com/plurals-esl-grammar-game/",
    icon: "game" as const,
    difficulty: "medium" as const,
    moduleTheme: "yellow" as const
  },
  module7_part2: {
    title: "Can and Can't Abilities Game",
    description: "Practice expressing abilities and disabilities with modal verbs can and can't through interactive scenarios.",
    gameUrl: "https://learnenglishkids.britishcouncil.org/games/can-cant",
    icon: "practice" as const,
    difficulty: "medium" as const,
    moduleTheme: "indigo" as const
  },
  module8_part2: {
    title: "Prepositions Position Game",
    description: "Master position words in, on, under, next to, behind, in front of through visual placement activities.",
    gameUrl: "https://www.eslgamesplus.com/prepositions-esl-grammar-game/",
    icon: "game" as const,
    difficulty: "medium" as const,
    moduleTheme: "pink" as const
  },
  module9_part2: {
    title: "Question Words Practice",
    description: "Learn to ask questions with what, where, when, who, why, how through interactive question-answer games.",
    gameUrl: "https://learnenglishkids.britishcouncil.org/games/questions",
    icon: "practice" as const,
    difficulty: "medium" as const,
    moduleTheme: "teal" as const
  }
};