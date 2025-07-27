import React, { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Home, BookOpen, MessageCircle, Users, Clock, Award } from "lucide-react";

const MODULES = [
  {
    id: 1,
    title: "Alphabet & Numbers",
    description: "Recognize and pronounce all 26 letters. Identify vowels and consonants. Count, read, and write numbers from 1 to 20.",
    status: "available",
    color: "blue",
    icon: "📚",
    objectives: [
      "Recognize all 26 letters (A-Z)",
      "Learn vowels and consonants", 
      "Count from 1 to 20",
      "Interactive alphabet games"
    ],
    bgImage: "🌳🐪☀️"
  },
  {
    id: 2,
    title: "Greetings & Introductions",
    description: "Understand common greetings. Introduce yourself and ask for names. Use pronouns 'I' and 'You' with verb 'to be'.",
    status: "available",
    color: "green",
    icon: "👋",
    objectives: [
      "Common English greetings",
      "Self-introduction skills",
      "Pronouns I and You",
      "Verb 'to be' usage"
    ],
    bgImage: "🏘️👋🌅"
  },
  {
    id: 3,
    title: "Family, Pronouns & Possessives",
    description: "Identify family members. Understand pronouns: he, she, we, they. Use possessive adjectives: my, your, his, her.",
    status: "available",
    color: "purple",
    icon: "👨‍👩‍👧‍👦",
    objectives: [
      "Family member vocabulary",
      "Pronouns: he, she, we, they",
      "Possessive adjectives",
      "Niger family culture"
    ],
    bgImage: "👨‍👩‍👧‍👦🏠💕"
  },
  {
    id: 4,
    title: "Classroom, Colors & Shapes",
    description: "Learn school objects, basic colors, and shapes. Identify pen, book, chair, table, bag. Understand red, blue, square, circle.",
    status: "available",
    color: "orange",
    icon: "🎨",
    objectives: [
      "School objects: pen, book, chair, table, bag",
      "Basic colors: red, blue",
      "Basic shapes: square, circle",
      "Describing objects with 'This is a...'"
    ],
    bgImage: "📚🔴🟦"
  },
  {
    id: 5,
    title: "Verbs & Daily Routines",
    description: "Learn common action verbs and daily activities. Understand eat, sleep, play, read, write. Use simple present tense.",
    status: "available",
    color: "red",
    icon: "⚽",
    objectives: [
      "Action verbs: eat, sleep, play, read, write",
      "Simple present tense rules",
      "Daily routine phrases",
      "Third person singular (-s ending)"
    ],
    bgImage: "⚽📖😴"
  },
  {
    id: 6,
    title: "Food, Animals & Plurals",
    description: "Identify common food items and animals. Understand plural nouns. Use 'I like...' and 'There is/are'.",
    status: "available",
    color: "yellow",
    icon: "🍎",
    objectives: [
      "Food vocabulary",
      "Animal names",
      "Plural formation",
      "Expressing preferences"
    ],
    bgImage: "🍎🐄🌾"
  },
  {
    id: 7,
    title: "Present Continuous",
    description: "Learn actions happening now. Understand -ing verbs. Use 'I am doing' vs 'I do'.",
    status: "available",
    color: "indigo",
    icon: "🏃‍♂️",
    objectives: [
      "Present continuous tense",
      "-ing verb forms",
      "Actions happening now",
      "Contrast with simple present"
    ],
    bgImage: "🏃‍♂️📖✍️"
  },
  {
    id: 8,
    title: "Adjectives & Prepositions",
    description: "Learn descriptive words. Understand position words: in, on, under. Describe objects and locations.",
    status: "available",
    color: "pink",
    icon: "📍",
    objectives: [
      "Descriptive adjectives",
      "Position prepositions",
      "Object descriptions",
      "Location expressions"
    ],
    bgImage: "📍🔵🔴"
  },
  {
    id: 9,
    title: "Time & Questions",
    description: "Learn to read clocks. Ask and answer what, where, when questions. Tell time in English.",
    status: "available",
    color: "teal",
    icon: "🕐",
    objectives: [
      "Clock reading",
      "Question words",
      "Time expressions",
      "Daily schedules"
    ],
    bgImage: "🕐❓⏰"
  },
  {
    id: 10,
    title: "Hobbies & Past Tense",
    description: "Talk about leisure activities. Learn simple past tense. Express what you did yesterday.",
    status: "available",
    color: "cyan",
    icon: "⚽",
    objectives: [
      "Hobby vocabulary",
      "Simple past tense",
      "Past time expressions",
      "Personal experiences"
    ],
    bgImage: "⚽🎨📚"
  },
  {
    id: 11,
    title: "Weather & Seasons",
    description: "Learn to describe weather conditions and seasons. Talk about sunny, rainy, spring, summer weather.",
    status: "available",
    color: "blue",
    icon: "🌦️",
    objectives: [
      "Weather vocabulary",
      "Four seasons",
      "Clothing for weather",
      "Weather descriptions"
    ],
    bgImage: "☀️🌧️❄️"
  },
  {
    id: 12,
    title: "Around Town & Directions",
    description: "Learn places in the city and how to give directions. Navigate around town in English.",
    status: "available",
    color: "orange",
    icon: "🏪",
    objectives: [
      "City places vocabulary",
      "Giving directions",
      "Prepositions of place",
      "Location expressions"
    ],
    bgImage: "🏪🏥📚"
  },
  {
    id: 13,
    title: "Irregular Past Tense",
    description: "Learn special verbs for telling stories. Master irregular past tense forms.",
    status: "available",
    color: "purple",
    icon: "📖",
    objectives: [
      "Irregular verbs",
      "Past tense stories",
      "Did questions",
      "Story telling"
    ],
    bgImage: "📖✨🎭"
  },
  {
    id: 14,
    title: "Future Plans",
    description: "Learn to talk about future plans using 'going to'. Express your intentions.",
    status: "available",
    color: "green",
    icon: "🎯",
    objectives: [
      "Going to structure",
      "Future time words",
      "Future questions",
      "Planning vocabulary"
    ],
    bgImage: "🎯📅⭐"
  },
  {
    id: 15,
    title: "Comparing & Feelings",
    description: "Learn to compare things and express more feelings. Use comparative adjectives.",
    status: "available",
    color: "pink",
    icon: "😊",
    objectives: [
      "Comparative adjectives",
      "Feelings vocabulary",
      "Comparing objects",
      "Emotion expressions"
    ],
    bgImage: "😊🐘🐭"
  }
];

const colorClasses = {
  blue: "from-blue-400 to-blue-600",
  green: "from-green-400 to-green-600", 
  purple: "from-purple-400 to-purple-600",
  orange: "from-orange-400 to-orange-600",
  red: "from-red-400 to-red-600",
  yellow: "from-yellow-400 to-yellow-600",
  indigo: "from-indigo-400 to-indigo-600",
  pink: "from-pink-400 to-pink-600",
  teal: "from-teal-400 to-teal-600",
  cyan: "from-cyan-400 to-cyan-600"
};

export default function ModulesPage() {
  useEffect(() => {
    // Force cache clearing for new modules
    const timestamp = Date.now();
    console.log(`🚀 ModulesPage loaded at ${timestamp} - Showing ${MODULES.length} modules`);
    
    // Clear all caches if we have less than 15 modules visible
    if (MODULES.length >= 15) {
      localStorage.setItem('modules-count', '15');
      localStorage.setItem('modules-version', '3.0.0-EXPANDED');
    }
    
    // Force refresh if user is seeing cached version
    const lastModulesCount = localStorage.getItem('modules-count');
    if (lastModulesCount && parseInt(lastModulesCount) < 15) {
      console.log('⚠️ Detected cached version with fewer modules, forcing refresh...');
      localStorage.setItem('modules-count', '15');
      setTimeout(() => window.location.reload(), 1000);
    }
  }, []);

  return (
    <div className="min-h-screen niger-village-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Home className="w-4 h-4" />
                Home
              </button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Choose Your Learning Module
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Complete 15 interactive English learning modules with Teacher Sam
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="Ready to learn English? Choose a module!"
                screenText="MODULES"
              />
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <AudioPlayer
                text="Welcome to the modules page! Here you can choose from 15 different English learning modules. Each module teaches you something new and exciting. Start with Module 1 if you're a beginner, or choose any module you want to learn!"
                title="🔊 Modules Introduction"
                description="Learn about our 15 modules"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">
            Showing {MODULES.length} modules (v3.0.0-EXPANDED) - Last updated: {new Date().toLocaleTimeString()}
          </p>
          {MODULES.length >= 15 ? (
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mt-2">
              ✅ All 15 modules loaded successfully!
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4 max-w-md mx-auto">
              <h3 className="font-bold text-orange-800 mb-2">🔄 Cache Issue Detected</h3>
              <p className="text-sm text-orange-700 mb-3">
                You're seeing {MODULES.length} modules instead of 15. This is a browser caching issue.
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                🔄 Refresh to See All 15 Modules
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((module, index) => (
            <motion.div
              key={module.id}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Cultural Background Header */}
              <div className={`h-48 bg-gradient-to-br ${colorClasses[module.color as keyof typeof colorClasses]} relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-yellow-100 to-green-200 opacity-60 flex items-center justify-center">
                  <div className="text-6xl opacity-80">{module.bgImage}</div>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-xl font-bold">#{module.id}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="text-4xl">{module.icon}</span>
                </div>
              </div>

              {/* Module Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                
                {/* Objectives */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Learning Objectives:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {module.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-green-500 mt-0.5">•</span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Start Button */}
                <Link href={`/module/${module.id}`}>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Start Learning
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Journey Section */}
        <motion.section 
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            🌟 Your English Learning Journey
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">Start Speaking</h4>
              <p className="text-sm text-gray-600">Begin with basic words</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">Build Confidence</h4>
              <p className="text-sm text-gray-600">Practice with Sam</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">Learn Daily</h4>
              <p className="text-sm text-gray-600">Just 15 minutes a day</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">Master English</h4>
              <p className="text-sm text-gray-600">Complete all 10 modules</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}