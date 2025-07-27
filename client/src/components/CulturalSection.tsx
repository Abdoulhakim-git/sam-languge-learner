import React from "react";
import { motion } from "framer-motion";
import { AudioPlayer } from "./AudioPlayer";

interface CulturalContent {
  title: string;
  description: string;
  culturalElement: string;
  flag: string;
  visualExample: string;
  audioText: string;
}

interface CulturalSectionProps {
  content: CulturalContent;
  className?: string;
}

export function CulturalSection({ content, className = "" }: CulturalSectionProps) {
  return (
    <motion.div 
      className={`bg-gradient-to-br from-orange-50 to-yellow-50 border-l-4 border-orange-400 rounded-xl p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-3">{content.flag}</span>
        <h3 className="text-2xl font-fredoka text-orange-700">{content.title}</h3>
      </div>
      
      <div className="flex items-start space-x-4">
        <div className="text-6xl">{content.visualExample}</div>
        <div className="flex-1">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {content.description}
          </p>
          <div className="bg-orange-100 rounded-lg p-4">
            <p className="text-orange-800 font-medium">
              🌟 Niger Cultural Note: {content.culturalElement}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <AudioPlayer
          text={content.audioText}
          title="Cultural Learning with Teacher Sam"
          description="Learn about Niger culture"
          className="bg-orange-200 hover:bg-orange-300"
        />
      </div>
    </motion.div>
  );
}

// Cultural content for each module
export const CULTURAL_CONTENT = {
  module1_part1: {
    title: "Niger Alphabet Tradition",
    description: "In Niger villages, children learn by drawing letters in the sand with sticks. This helps them practice writing while playing!",
    culturalElement: "Traditional learning uses natural materials like sand, stones, and sticks to make education fun and accessible for all children.",
    flag: "🇳🇪",
    visualExample: "✏️",
    audioText: "In Niger villages, children learn by drawing letters in the sand with sticks. This helps them practice writing while playing! Traditional learning uses natural materials like sand, stones, and sticks to make education fun and accessible for all children."
  },
  module1_part2: {
    title: "Counting in Niger Markets",
    description: "In Niger markets, children help their families by counting fruits, vegetables, and goods. Numbers are part of daily life!",
    culturalElement: "Niger markets are colorful places where families work together, and children learn practical math skills by helping with trade.",
    flag: "🇳🇪",
    visualExample: "🥭",
    audioText: "In Niger markets, children help their families by counting fruits, vegetables, and goods. Numbers are part of daily life! Niger markets are colorful places where families work together, and children learn practical math skills by helping with trade."
  },
  module2_part1: {
    title: "Niger Greetings",
    description: "In Niger, greetings are very important! People always ask about family, health, and work. It shows respect and care.",
    culturalElement: "Niger greetings can last several minutes as people truly care about each other's wellbeing and family.",
    flag: "🇳🇪",
    visualExample: "🤝",
    audioText: "In Niger, greetings are very important! People always ask about family, health, and work. It shows respect and care. Niger greetings can last several minutes as people truly care about each other's wellbeing and family."
  },
  module2_part2: {
    title: "Niger Names and Identity",
    description: "Niger names often tell stories about when you were born, family hopes, or special events. Each name has meaning!",
    culturalElement: "Many Niger children have names in Hausa, Zarma, or Arabic that connect them to their heritage and family history.",
    flag: "🇳🇪",
    visualExample: "👶",
    audioText: "Niger names often tell stories about when you were born, family hopes, or special events. Each name has meaning! Many Niger children have names in Hausa, Zarma, or Arabic that connect them to their heritage and family history."
  },
  module3_part1: {
    title: "Niger Extended Families",
    description: "In Niger, families are large and close! Grandparents, aunts, uncles, and cousins all live together and help raise children.",
    culturalElement: "Niger families value respect for elders, and grandparents are the wise storytellers who teach traditions.",
    flag: "🇳🇪",
    visualExample: "👨‍👩‍👧‍👦",
    audioText: "In Niger, families are large and close! Grandparents, aunts, uncles, and cousins all live together and help raise children. Niger families value respect for elders, and grandparents are the wise storytellers who teach traditions."
  },
  module4_part1: {
    title: "Niger Colors in Art",
    description: "Niger artists use bright colors in their crafts! Orange like the sunset, blue like the Niger River, and yellow like millet grain.",
    culturalElement: "Niger artisans create beautiful textiles, pottery, and jewelry using colors that represent their landscape and crops.",
    flag: "🇳🇪",
    visualExample: "🎨",
    audioText: "Niger artists use bright colors in their crafts! Orange like the sunset, blue like the Niger River, and yellow like millet grain. Niger artisans create beautiful textiles, pottery, and jewelry using colors that represent their landscape and crops."
  },
  module5_part1: {
    title: "Niger Animals",
    description: "Niger has amazing animals! Camels help people travel, goats provide milk, and colorful birds sing in the trees.",
    culturalElement: "Animals in Niger are helpers and friends. Families care for them, and they provide food, transportation, and companionship.",
    flag: "🇳🇪",
    visualExample: "🐪",
    audioText: "Niger has amazing animals! Camels help people travel, goats provide milk, and colorful birds sing in the trees. Animals in Niger are helpers and friends. Families care for them, and they provide food, transportation, and companionship."
  }
};