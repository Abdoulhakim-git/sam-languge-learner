import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CulturalSection } from "@/components/CulturalSection";
import { PracticeActivity } from "@/components/PracticeActivity";
import { Home, BookOpen } from "lucide-react";

const ADJECTIVES_EXAMPLES = [
  { emoji: "😊", english: "Happy", opposite: "Sad", french: "Heureux" },
  { emoji: "📏", english: "Big", opposite: "Small", french: "Grand" },
  { emoji: "🔥", english: "Hot", opposite: "Cold", french: "Chaud" },
  { emoji: "🏃", english: "Fast", opposite: "Slow", french: "Rapide" },
  { emoji: "🎨", english: "Beautiful", opposite: "Ugly", french: "Beau" },
  { emoji: "💪", english: "Strong", opposite: "Weak", french: "Fort" },
  { emoji: "🧠", english: "Smart", opposite: "Silly", french: "Intelligent" },
  { emoji: "🌟", english: "Bright", opposite: "Dark", french: "Brillant" }
];

const PREPOSITIONS_EXAMPLES = [
  { emoji: "📦", english: "In", example: "The cat is in the box", french: "Dans" },
  { emoji: "🔝", english: "On", example: "The book is on the table", french: "Sur" },
  { emoji: "⬇️", english: "Under", example: "The dog is under the chair", french: "Sous" },
  { emoji: "🔄", english: "Between", example: "I sit between my friends", french: "Entre" },
  { emoji: "👆", english: "Above", example: "The bird flies above the tree", french: "Au-dessus" },
  { emoji: "🔙", english: "Behind", example: "The ball is behind the house", french: "Derrière" }
];

export default function CompleteModule8() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-4 py-2 rounded-lg border-2 border-indigo-200 hover:border-indigo-400">
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </button>
            </Link>
            <div className="bg-indigo-100 px-4 py-2 rounded-full">
              <span className="text-indigo-600 font-bold">Module 8 • Adjectives & Prepositions</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-indigo-600 mb-2">
            Module 8: Adjectives & Prepositions
          </h1>
          <p className="text-gray-600 text-lg">
            Describe things and show where they are!
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-fredoka mb-2">Describing Words & Positions</h3>
                <p className="text-indigo-100 text-lg">Learn to describe and locate things!</p>
              </div>
              <RobotSam size="medium" isTeaching={true} />
            </div>
          </motion.div>

          {/* Written Explanation */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-2xl font-fredoka text-indigo-600 mb-6 flex items-center">
              <BookOpen className="w-8 h-8 mr-3" />
              Learning Adjectives and Prepositions
            </h4>
            
            <AudioPlayer
              text="Hello descriptive learners! Today we learn two important things: adjectives and prepositions. Adjectives help us describe how things look, feel, or seem. Prepositions tell us where things are located. These words make our English much more interesting!"
              frenchTranslation="Salut apprenants descriptifs! Aujourd'hui nous apprenons deux choses importantes: les adjectifs et les prépositions. Les adjectifs nous aident à décrire comment les choses paraissent, se sentent, ou semblent. Les prépositions nous disent où les choses sont situées. Ces mots rendent notre anglais beaucoup plus intéressant!"
              hausaTranslation="Sannu masu koyon bayani! Yau muna koyon abubuwa muhimmi biyu: adjectives da prepositions. Adjectives suna taimaka mana mu bayyana yadda abubuwa suke kama, ji, ko kama. Prepositions suna gaya mana inda abubuwa suke. Waɗannan kalmomi suna sa Turancin mu ya zama mai ban sha'awa sosai!"
              title="Teacher Sam's Adjectives and Prepositions Introduction"
              description="Listen to Teacher Sam explain adjectives and prepositions"
              className="mb-6"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-pink-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-pink-800 mb-4">Adjectives (Describing Words)</h5>
                <div className="space-y-3">
                  {ADJECTIVES_EXAMPLES.map((adj, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(`${adj.english}! The opposite of ${adj.english} is ${adj.opposite}!`);
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{adj.emoji}</span>
                        <div>
                          <p className="font-bold">{adj.english}</p>
                          <p className="text-sm text-gray-600">{adj.french}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Opposite:</p>
                        <p className="font-medium">{adj.opposite}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <AudioPlayer
                  text="Adjectives describe things! Happy describes feeling good. Big means large size. Hot means high temperature. Fast means quick speed. Beautiful means pretty to look at. Strong means having power. Smart means intelligent. Bright means giving light!"
                  title="Adjectives Explanation"
                  description="Learn describing words"
                  className="bg-pink-100 mt-4"
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-blue-800 mb-4">Prepositions (Position Words)</h5>
                <div className="space-y-3">
                  {PREPOSITIONS_EXAMPLES.map((prep, index) => (
                    <motion.div 
                      key={index}
                      className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(`${prep.english}! ${prep.example}!`);
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-3xl">{prep.emoji}</span>
                        <div>
                          <p className="font-bold">{prep.english}</p>
                          <p className="text-sm text-gray-600">{prep.french}</p>
                        </div>
                      </div>
                      <p className="text-sm italic text-gray-700">{prep.example}</p>
                    </motion.div>
                  ))}
                </div>
                <AudioPlayer
                  text="Prepositions show position! In means inside something. On means touching the top. Under means below something. Between means in the middle of two things. Above means higher than something. Behind means at the back of something!"
                  title="Prepositions Explanation"
                  description="Learn position words"
                  className="bg-blue-100 mt-4"
                />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-yellow-800 mb-3">Using Adjectives and Prepositions Together</h5>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-100 rounded-lg p-4">
                  <p className="font-bold">The big cat is on the small table</p>
                  <p className="text-sm text-gray-600">Adjective: big, small | Preposition: on</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4">
                  <p className="font-bold">A beautiful bird flies above the tall tree</p>
                  <p className="text-sm text-gray-600">Adjective: beautiful, tall | Preposition: above</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4">
                  <p className="font-bold">The happy child sits between two strong adults</p>
                  <p className="text-sm text-gray-600">Adjective: happy, strong | Preposition: between</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4">
                  <p className="font-bold">A fast car is under the bright sun</p>
                  <p className="text-sm text-gray-600">Adjective: fast, bright | Preposition: under</p>
                </div>
              </div>
              <AudioPlayer
                text="We can use adjectives and prepositions together to make detailed sentences! The big cat is on the small table. A beautiful bird flies above the tall tree. The happy child sits between two strong adults. This makes our English very descriptive and clear!"
                title="Combined Usage Examples"
                description="Using adjectives and prepositions together"
                className="bg-yellow-100 mt-4"
              />
            </div>
          </motion.div>

          {/* Cultural Section */}
          <CulturalSection content={{
            title: "Niger Descriptive Language",
            description: "In Niger, people use many descriptive words! They describe the hot desert, tall baobab trees, beautiful patterns in textiles, and strong community bonds.",
            culturalElement: "Niger languages are rich with descriptive words that show respect for nature, family, and community traditions.",
            flag: "🇳🇪",
            visualExample: "🎨",
            audioText: "In Niger, people use many descriptive words! They describe the hot desert, tall baobab trees, beautiful patterns in textiles, and strong community bonds. Niger languages are rich with descriptive words that show respect for nature, family, and community traditions."
          }} />

          {/* Practice Activity */}
          <PracticeActivity 
            title="Adjectives and Prepositions Practice"
            description="Practice describing objects and their positions! Learn to use adjectives and prepositions through fun interactive exercises and games."
            gameUrl="https://www.eslgamesplus.com/adjectives-esl-vocabulary-game/"
            icon="practice"
            difficulty="medium"
            moduleTheme="purple"
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
            <h3 className="text-3xl font-fredoka text-indigo-600 mb-4">
              Congratulations! Module 8 Complete!
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              You can now describe things and show where they are!
            </p>
            <AudioPlayer
              text="Outstanding! You have completed Module 8! You can now use adjectives to describe things and prepositions to show where things are located. Your English is becoming very descriptive and precise!"
              title="Module 8 Completion Celebration"
              description="Teacher Sam celebrates your achievement"
              className="mb-6"
            />
            <div className="flex justify-center space-x-4">
              <Link href="/modules">
                <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-600 hover:to-indigo-700 transition-all">
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