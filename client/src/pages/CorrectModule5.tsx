import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CulturalSection } from "@/components/CulturalSection";
import { PracticeActivity } from "@/components/PracticeActivity";
import { Home, BookOpen, Play } from "lucide-react";

const COMMON_VERBS = [
  { emoji: "🍎", english: "Eat", french: "Manger", example: "I eat breakfast at 7 o'clock", thirdPerson: "She eats" },
  { emoji: "😴", english: "Sleep", french: "Dormir", example: "I sleep at night", thirdPerson: "He sleeps" },
  { emoji: "⚽", english: "Play", french: "Jouer", example: "We play football after school", thirdPerson: "She plays" },
  { emoji: "📖", english: "Read", french: "Lire", example: "He reads a book every day", thirdPerson: "He reads" },
  { emoji: "✍️", english: "Write", french: "Écrire", example: "They write letters to their friends", thirdPerson: "She writes" }
];

const DAILY_ROUTINE_PHRASES = [
  { emoji: "🌅", english: "Wake up", french: "Se réveiller", example: "I wake up at 6 o'clock", time: "6:00 AM" },
  { emoji: "🏫", english: "Go to school", french: "Aller à l'école", example: "She goes to school at 8 a.m.", time: "8:00 AM" },
  { emoji: "🍽️", english: "Eat lunch", french: "Déjeuner", example: "We eat lunch at noon", time: "12:00 PM" }
];

export default function CorrectModule5() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors bg-green-50 px-4 py-2 rounded-lg border-2 border-green-200 hover:border-green-400">
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </button>
            </Link>
            <div className="bg-green-100 px-4 py-2 rounded-full">
              <span className="text-green-600 font-bold">Module 5 • Verbs & Daily Routines</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-green-600 mb-2">
            Module 5: Verbs and Daily Routines
          </h1>
          <p className="text-gray-600 text-lg">
            Learn action words and talk about your daily activities!
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-fredoka mb-2">Action Verbs and Daily Activities</h3>
                <p className="text-green-100 text-lg">Learn verbs that describe what you do every day!</p>
              </div>
              <RobotSam size="medium" isTeaching={true} />
            </div>
          </motion.div>

          {/* Part 1: Common Verbs */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-2xl font-fredoka text-green-600 mb-6 flex items-center">
              <Play className="w-8 h-8 mr-3" />
              Part 1: Common Verbs
            </h4>
            
            <AudioPlayer
              text="Hello there! I'm Teacher Sam, your friendly robot guide. Today, we're going to learn some important English verbs that you use every day. These verbs will help you talk about what you do daily, like eating, sleeping, playing, reading, and writing. Ready? Let's get started!"
              title="Teacher Sam's Verbs Introduction"
              description="Listen to Teacher Sam introduce action verbs"
              className="mb-6"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-blue-800 mb-4">Action Verbs (Verbes)</h5>
                <div className="space-y-4">
                  {COMMON_VERBS.map((verb, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(`${verb.english}! ${verb.example}!`);
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <span className="text-4xl">{verb.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-lg">{verb.english}</p>
                        <p className="text-sm text-gray-600 mb-1">{verb.french}</p>
                        <p className="text-sm text-green-700 italic">{verb.example}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <AudioPlayer
                  text="These are common verbs we use every day! Eat means to have food. Sleep means to rest at night. Play means to have fun with games or sports. Read means to look at words and understand them. Write means to make letters and words on paper."
                  title="Common Verbs Explanation"
                  description="Learn about action verbs"
                  className="bg-blue-100 mt-4"
                />
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-yellow-800 mb-4">Grammar: Simple Present</h5>
                <div className="space-y-4">
                  <div className="bg-yellow-100 rounded-lg p-4">
                    <p className="font-bold text-yellow-800 mb-2">For I, you, we, they:</p>
                    <div className="space-y-1 text-sm">
                      <p>I play.</p>
                      <p>You eat.</p>
                      <p>We read.</p>
                      <p>They sleep.</p>
                    </div>
                  </div>
                  <div className="bg-yellow-100 rounded-lg p-4">
                    <p className="font-bold text-yellow-800 mb-2">For he, she, it (add -s):</p>
                    <div className="space-y-1 text-sm">
                      <p>He plays.</p>
                      <p>She eats.</p>
                      <p>It sleeps.</p>
                    </div>
                  </div>
                </div>
                <AudioPlayer
                  text="In English, when you talk about things you do regularly, you use the simple present tense. For I, you, we, and they, the verb stays the same. For he, she, and it, add s at the end of the verb. He plays. She eats."
                  title="Simple Present Grammar"
                  description="Learn simple present tense rules"
                  className="bg-yellow-100 mt-4"
                />
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-purple-800 mb-3">More Examples with Simple Present</h5>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-purple-700">I play chess on Saturdays.</p>
                  <p className="text-purple-700">She eats lunch at school.</p>
                  <p className="text-purple-700">He writes stories.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-purple-700">We read magazines.</p>
                  <p className="text-purple-700">They sleep early.</p>
                  <p className="text-purple-700">You eat breakfast at home.</p>
                </div>
              </div>
              <AudioPlayer
                text="Here are more examples! I play chess on Saturdays. She eats lunch at school. He writes stories. We read magazines. They sleep early. You eat breakfast at home. Notice how we add s for he and she!"
                title="Simple Present Examples"
                description="Practice simple present sentences"
                className="bg-purple-100 mt-4"
              />
            </div>
          </motion.div>

          {/* Part 2: My Day */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-2xl font-fredoka text-green-600 mb-6 flex items-center">
              <BookOpen className="w-8 h-8 mr-3" />
              Part 2: My Day (Daily Routine)
            </h4>
            
            <AudioPlayer
              text="Now that you know some verbs, let's talk about your daily routine! What do you do every day? Let's learn some new phrases."
              title="Daily Routine Introduction"
              description="Learn about daily activities"
              className="mb-6"
            />

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {DAILY_ROUTINE_PHRASES.map((phrase, index) => (
                <motion.div 
                  key={index}
                  className="bg-orange-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(`${phrase.example}!`);
                    speechSynthesis.speak(utterance);
                  }}
                >
                  <span className="text-6xl mb-4 block">{phrase.emoji}</span>
                  <h5 className="text-xl font-bold text-orange-800 mb-2">{phrase.english}</h5>
                  <p className="text-orange-600 mb-2">{phrase.french}</p>
                  <p className="text-sm text-gray-700 mb-2">{phrase.example}</p>
                  <p className="text-lg font-bold text-blue-600">{phrase.time}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-green-800 mb-3">Activity: Draw Your Daily Routine</h5>
              <p className="text-green-700 mb-4">
                Now it's your turn! Draw pictures showing your day. Start with waking up, going to school, eating lunch, and anything else you do. Write simple sentences in English under your drawings like these:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="font-bold text-green-800">Morning Routine:</p>
                  <ul className="text-sm text-green-700 mt-2 space-y-1">
                    <li>I wake up at 7 a.m.</li>
                    <li>I go to school by bus.</li>
                  </ul>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="font-bold text-green-800">Afternoon/Evening:</p>
                  <ul className="text-sm text-green-700 mt-2 space-y-1">
                    <li>I eat lunch with my friends.</li>
                    <li>I play after school.</li>
                    <li>I read a book before bed.</li>
                  </ul>
                </div>
              </div>
              <AudioPlayer
                text="Now it's your turn! Draw pictures showing your day. Start with waking up, going to school, eating lunch, and anything else you do. Write simple sentences in English like: I wake up at 7 a.m. I go to school by bus. I eat lunch with my friends. I play after school. I read a book before bed."
                title="Daily Routine Activity"
                description="Practice describing your day"
                className="bg-green-100 mt-4"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <h5 className="text-xl font-bold text-blue-800 mb-3">Final Tip from Teacher Sam</h5>
              <p className="text-blue-700">
                Try to use the verbs you learned today — eat, sleep, play, read, write — to talk about what you do every day! Practice makes perfect!
              </p>
              <AudioPlayer
                text="Try to use the verbs you learned today — eat, sleep, play, read, write — to talk about what you do every day! Practice makes perfect!"
                title="Teacher Sam's Final Tip"
                description="Encouragement to practice"
                className="bg-blue-100 mt-4"
              />
            </div>
          </motion.div>

          {/* Cultural Section */}
          <CulturalSection content={{
            title: "Niger Daily Life",
            description: "In Niger villages, families wake up with the sunrise, children go to school on foot, and families eat together. People read stories under baobab trees and write in Arabic and French.",
            culturalElement: "Niger communities value education and storytelling. Children learn to read both in their local languages and in French, preserving both traditional and modern knowledge.",
            flag: "🇳🇪",
            visualExample: "📚",
            audioText: "In Niger villages, families wake up with the sunrise, children go to school on foot, and families eat together. People read stories under baobab trees and write in Arabic and French. Niger communities value education and storytelling. Children learn to read both in their local languages and in French, preserving both traditional and modern knowledge."
          }} />

          {/* Practice Activity */}
          <PracticeActivity 
            title="Daily Routines Practice"
            description="Practice using verbs and talking about daily activities! Learn through fun interactive games about simple present tense and daily routines."
            gameUrl="https://www.eslgamesplus.com/simple-present-tense-esl-grammar-game/"
            icon="practice"
            difficulty="easy"
            moduleTheme="green"
            className="mb-8" 
          />

          {/* Module Completion */}
          <motion.div 
            className="text-center bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-fredoka text-green-600 mb-4">
              Congratulations! Module 5 Complete!
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              You now know common verbs and can talk about your daily routine!
            </p>
            <AudioPlayer
              text="Super! Now you can talk about your day in English! You learned five common verbs: eat, sleep, play, read, write. You learned how to use the Simple Present tense. You learned the special s for verbs with he, she, it. You learned phrases to talk about your daily routine. Well done!"
              title="Module 5 Completion Celebration"
              description="Teacher Sam celebrates your achievement"
              className="mb-6"
            />
            <div className="flex justify-center space-x-4">
              <Link href="/modules">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all">
                  Choose Next Module
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}