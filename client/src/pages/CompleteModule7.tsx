import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CulturalSection } from "@/components/CulturalSection";
import { PracticeActivity } from "@/components/PracticeActivity";
import { Home, BookOpen } from "lucide-react";

const ACTIONS_EXAMPLES = [
  { emoji: "🏃", english: "Running", base: "Run", french: "Courir" },
  { emoji: "📖", english: "Reading", base: "Read", french: "Lire" },
  { emoji: "✍️", english: "Writing", base: "Write", french: "Écrire" },
  { emoji: "🎵", english: "Singing", base: "Sing", french: "Chanter" },
  { emoji: "🍳", english: "Cooking", base: "Cook", french: "Cuisiner" },
  { emoji: "🧹", english: "Cleaning", base: "Clean", french: "Nettoyer" },
  { emoji: "🎨", english: "Drawing", base: "Draw", french: "Dessiner" },
  { emoji: "💤", english: "Sleeping", base: "Sleep", french: "Dormir" }
];

export default function CompleteModule7() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors bg-red-50 px-4 py-2 rounded-lg border-2 border-red-200 hover:border-red-400">
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </button>
            </Link>
            <div className="bg-red-100 px-4 py-2 rounded-full">
              <span className="text-red-600 font-bold">Module 7 • Present Continuous</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-red-600 mb-2">
            Module 7: Present Continuous & Abilities
          </h1>
          <p className="text-gray-600 text-lg">
            Learn about actions happening now and express abilities with can/can't!
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-fredoka mb-2">Actions Happening Now</h3>
                <p className="text-red-100 text-lg">Express what you are doing right now!</p>
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
            <h4 className="text-2xl font-fredoka text-red-600 mb-6 flex items-center">
              <BookOpen className="w-8 h-8 mr-3" />
              Learning Present Continuous Tense
            </h4>
            
            <AudioPlayer
              text="Hello active learners! Today we learn about actions happening right now. When we want to say what someone is doing at this moment, we use present continuous tense. This is very useful for describing current activities!"
              frenchTranslation="Salut apprenants actifs! Aujourd'hui nous apprenons sur les actions qui se passent maintenant. Quand nous voulons dire ce que quelqu'un fait en ce moment, nous utilisons le présent continu. C'est très utile pour décrire les activités actuelles!"
              hausaTranslation="Sannu masu koyo masu aiki! Yau muna koyon ayyukan da ke faruwa a yanzu. Lokacin da muke son cewa abin da wani ke yi a wannan lokacin, muna amfani da yanzu na ci gaba. Wannan yana da amfani sosai don bayyana ayyukan na yanzu!"
              title="Teacher Sam's Present Continuous Introduction"
              description="Listen to Teacher Sam explain present continuous"
              className="mb-6"
            />

            <div className="bg-yellow-50 rounded-lg p-6 mb-6">
              <h5 className="text-xl font-bold text-yellow-800 mb-3">Grammar Rule</h5>
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="text-lg font-bold text-center">Subject + am/is/are + verb + ing</p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <p className="font-bold">I am reading</p>
                    <p className="text-sm text-gray-600">I + am + read + ing</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">She is cooking</p>
                    <p className="text-sm text-gray-600">She + is + cook + ing</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">They are playing</p>
                    <p className="text-sm text-gray-600">They + are + play + ing</p>
                  </div>
                </div>
              </div>
              <AudioPlayer
                text="The rule is simple! We use am with I. We use is with he, she, it. We use are with you, we, they. Then we add ing to the verb. I am reading. She is cooking. They are playing!"
                title="Present Continuous Grammar Rule"
                description="Learn the grammar structure"
                className="bg-yellow-100 mt-4"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-blue-800 mb-4">Action Verbs with -ing</h5>
                <div className="space-y-3">
                  {ACTIONS_EXAMPLES.map((action, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(`${action.base} becomes ${action.english}! I am ${action.english.toLowerCase()}!`);
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <span className="text-4xl">{action.emoji}</span>
                      <div>
                        <p className="font-bold">{action.base} → {action.english}</p>
                        <p className="text-sm text-gray-600">{action.french}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <AudioPlayer
                  text="Let's practice adding ing! Run becomes running. Read becomes reading. Write becomes writing. Sing becomes singing. Cook becomes cooking. Clean becomes cleaning. Draw becomes drawing. Sleep becomes sleeping!"
                  title="Action Verbs with -ing"
                  description="Learn to add -ing to verbs"
                  className="bg-blue-100 mt-4"
                />
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-green-800 mb-4">Example Sentences</h5>
                <div className="space-y-3">
                  <div className="bg-green-100 rounded-lg p-3">
                    <p className="font-bold">I am reading a book</p>
                    <p className="text-sm text-gray-600">Je suis en train de lire un livre</p>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3">
                    <p className="font-bold">She is cooking dinner</p>
                    <p className="text-sm text-gray-600">Elle cuisine le dîner</p>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3">
                    <p className="font-bold">They are playing outside</p>
                    <p className="text-sm text-gray-600">Ils jouent dehors</p>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3">
                    <p className="font-bold">We are learning English</p>
                    <p className="text-sm text-gray-600">Nous apprenons l'anglais</p>
                  </div>
                </div>
                <AudioPlayer
                  text="Here are example sentences! I am reading a book right now. She is cooking dinner in the kitchen. They are playing outside in the yard. We are learning English together with Teacher Sam!"
                  title="Example Sentences"
                  description="Listen to present continuous examples"
                  className="bg-green-100 mt-4"
                />
              </div>
            </div>
          </motion.div>

          {/* Cultural Section */}
          <CulturalSection content={{
            title: "Niger Daily Activities",
            description: "In Niger villages, people are always busy! Children are studying, mothers are cooking, fathers are working in fields, and families are sharing stories together.",
            culturalElement: "Niger communities work together. When one person is working, others are helping. This teaches children about cooperation and community support.",
            flag: "🇳🇪",
            visualExample: "👥",
            audioText: "In Niger villages, people are always busy! Children are studying, mothers are cooking, fathers are working in fields, and families are sharing stories together. Niger communities work together. When one person is working, others are helping. This teaches children about cooperation and community support."
          }} />

          {/* Practice Activity */}
          <PracticeActivity 
            title="Present Continuous Practice"
            description="Practice present continuous tense with fun activities! Learn to describe what people are doing right now through interactive games."
            gameUrl="https://www.eslgamesplus.com/present-continuous-tense-esl-grammar-game/"
            icon="practice"
            difficulty="medium"
            moduleTheme="red"
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
            <h3 className="text-3xl font-fredoka text-red-600 mb-4">
              Congratulations! Module 7 Complete!
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              You can now describe actions happening right now!
            </p>
            <AudioPlayer
              text="Fantastic! You have completed Module 7! You can now use present continuous tense to describe what people are doing right now. You are becoming an excellent English speaker!"
              title="Module 7 Completion Celebration"
              description="Teacher Sam celebrates your achievement"
              className="mb-6"
            />
            <div className="flex justify-center space-x-4">
              <Link href="/modules">
                <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all">
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