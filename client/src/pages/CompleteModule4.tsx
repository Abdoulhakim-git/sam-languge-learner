import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { VisualExamples, COLORS_EXAMPLES, SHAPES_EXAMPLES } from "@/components/VisualExamples";
import { CulturalSection, CULTURAL_CONTENT } from "@/components/CulturalSection";
import { PracticeActivity, PRACTICE_ACTIVITIES } from "@/components/PracticeActivity";
import { Home, ArrowRight, BookOpen, Star, Palette } from "lucide-react";

export default function CompleteModule4() {
  const [currentPart, setCurrentPart] = useState(1);

  const renderPart1 = () => (
    <div className="space-y-8">
      {/* Part 1 Header */}
      <motion.div 
        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-fredoka mb-2">Part 1: Colors & Shapes</h3>
            <p className="text-purple-100 text-lg">Discover the colorful world around us!</p>
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
        <h4 className="text-2xl font-fredoka text-purple-600 mb-6 flex items-center">
          <Palette className="w-8 h-8 mr-3" />
          Learning Colors and Shapes
        </h4>
        
        <div className="space-y-6">
          <div className="bg-purple-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-purple-800 mb-3">What You Will Learn:</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Basic colors in English</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Common shapes around us</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>How to describe objects</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Using colors and shapes in sentences</li>
            </ul>
          </div>

          <AudioPlayer
            text="Hello students! Today we will learn about colors and shapes. Colors make our world beautiful, and shapes help us understand the world around us. Let's explore together!"
            frenchTranslation="Salut les étudiants! Aujourd'hui nous allons apprendre sur les couleurs et les formes. Les couleurs rendent notre monde beau, et les formes nous aident à comprendre le monde qui nous entoure. Explorons ensemble!"
            hausaTranslation="Sannu dalibai! Yau za mu koyi game da launuka da siffoji. Launuka suna sa duniyarmu ta zama kyakkyawa, kuma siffoji suna taimaka mana mu fahimci duniyar da ke kewaye da mu. Mu bincika tare!"
            title="Teacher Sam's Colors and Shapes Introduction"
            description="Listen to Teacher Sam explain colors and shapes"
            className="mb-6"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-rainbow-50 rounded-lg p-6 border-2 border-rainbow-200">
              <h5 className="text-xl font-bold text-rainbow-800 mb-4">Basic Colors</h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border cursor-pointer hover:bg-red-50"
                     onClick={() => {
                       speechSynthesis.cancel();
                       const utterance = new SpeechSynthesisUtterance("Red! In French: Rouge. In Hausa: Ja");
                       utterance.rate = 0.8;
                       utterance.lang = 'en-US';
                       const voices = speechSynthesis.getVoices();
                       const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                       if (englishVoice) utterance.voice = englishVoice;
                       speechSynthesis.speak(utterance);
                     }}>
                  <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-bold">Red</p>
                    <p className="text-sm text-red-600">Click to hear!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border cursor-pointer hover:bg-blue-50"
                     onClick={() => {
                       speechSynthesis.cancel();
                       const utterance = new SpeechSynthesisUtterance("Blue! In French: Bleu. In Hausa: Shuɗi");
                       utterance.rate = 0.8;
                       utterance.lang = 'en-US';
                       const voices = speechSynthesis.getVoices();
                       const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                       if (englishVoice) utterance.voice = englishVoice;
                       speechSynthesis.speak(utterance);
                     }}>
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-bold">Blue</p>
                    <p className="text-sm text-blue-600">Click to hear!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border cursor-pointer hover:bg-yellow-50"
                     onClick={() => {
                       speechSynthesis.cancel();
                       const utterance = new SpeechSynthesisUtterance("Yellow! In French: Jaune. In Hausa: Rawaya");
                       utterance.rate = 0.8;
                       utterance.lang = 'en-US';
                       const voices = speechSynthesis.getVoices();
                       const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                       if (englishVoice) utterance.voice = englishVoice;
                       speechSynthesis.speak(utterance);
                     }}>
                  <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-bold">Yellow</p>
                    <p className="text-sm text-yellow-600">Click to hear!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border cursor-pointer hover:bg-green-50"
                     onClick={() => {
                       speechSynthesis.cancel();
                       const utterance = new SpeechSynthesisUtterance("Green! In French: Vert. In Hausa: Kore");
                       utterance.rate = 0.8;
                       utterance.lang = 'en-US';
                       const voices = speechSynthesis.getVoices();
                       const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                       if (englishVoice) utterance.voice = englishVoice;
                       speechSynthesis.speak(utterance);
                     }}>
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-bold">Green</p>
                    <p className="text-sm text-green-600">Click to hear!</p>
                  </div>
                </div>
              </div>
              <AudioPlayer
                text="These are the basic colors: Red like an apple, Blue like the sky, Yellow like the sun, and Green like grass. Colors help us describe everything we see!"
                title="Basic Colors"
                description="Learn primary colors"
                className="bg-rainbow-100 mt-4"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
              <h5 className="text-xl font-bold text-gray-800 mb-4">Basic Shapes</h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-8 bg-purple-300 rounded-full"></div>
                  <div>
                    <p className="font-bold">Circle</p>
                    <p className="text-sm text-gray-600">French: Cercle</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-8 bg-purple-300"></div>
                  <div>
                    <p className="font-bold">Square</p>
                    <p className="text-sm text-gray-600">French: Carré</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-6 bg-purple-300"></div>
                  <div>
                    <p className="font-bold">Rectangle</p>
                    <p className="text-sm text-gray-600">French: Rectangle</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                  <div style={{width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "16px solid transparent", borderBottom: "24px solid rgb(196 181 253)"}}></div>
                  <div>
                    <p className="font-bold">Triangle</p>
                    <p className="text-sm text-gray-600">French: Triangle</p>
                  </div>
                </div>
              </div>
              <AudioPlayer
                text="Shapes are everywhere! A circle is round like a ball. A square has four equal sides. A rectangle is longer than it is tall. A triangle has three sides and three corners!"
                title="Basic Shapes"
                description="Learn common shapes"
                className="bg-gray-100 mt-4"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Examples */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-2xl font-fredoka text-purple-600 mb-6">Practice Colors</h4>
        <AudioPlayer
          text="Let's practice colors! Click on any color to hear how to say it. Try clicking on red, blue, yellow, or green!"
          title="Colors Practice Instructions"
          description="How to practice colors"
          className="mb-6"
        />
        <VisualExamples 
          examples={COLORS_EXAMPLES} 
          title="Click each color to practice!"
          gridCols={4}
        />
        
        <h4 className="text-2xl font-fredoka text-purple-600 mb-6 mt-8">Practice Shapes</h4>
        <AudioPlayer
          text="Now let's practice shapes! Click on any shape to hear how to say it. Try clicking on circle, square, triangle, or rectangle!"
          title="Shapes Practice Instructions"
          description="How to practice shapes"
          className="mb-6"
        />
        <VisualExamples 
          examples={SHAPES_EXAMPLES} 
          title="Click each shape to practice!"
          gridCols={4}
        />
      </motion.div>

      {/* Cultural Section */}
      <CulturalSection content={CULTURAL_CONTENT.module4_part1} />

      {/* Practice Activity */}
      <PracticeActivity 
        {...PRACTICE_ACTIVITIES.module4_part1}
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
        <h3 className="text-3xl font-fredoka text-purple-600 mb-4">
          Congratulations! Module 4 Complete!
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          You now know colors and shapes in English!
        </p>
        <AudioPlayer
          text="Wonderful work! You have completed Module 4! You can now identify colors and shapes in English. You are becoming a great English speaker!"
          title="Module 4 Completion Celebration"
          description="Teacher Sam celebrates your achievement"
          className="mb-6"
        />
        <div className="flex justify-center space-x-4">
          <Link href="/modules">
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-600 hover:to-purple-700 transition-all">
              Choose Next Module
            </button>
          </Link>
          <button
            onClick={() => setCurrentPart(1)}
            className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:from-gray-500 hover:to-gray-600 transition-all"
          >
            Review This Module
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <motion.button 
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 px-4 py-2 rounded-lg border-2 border-purple-200 hover:border-purple-400"
                whileHover={{ x: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </motion.button>
            </Link>
            <div className="bg-purple-100 px-4 py-2 rounded-full">
              <span className="text-purple-600 font-bold">
                Module 4 • Colors & Shapes
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-purple-600 mb-2">
            Module 4: Colors & Shapes
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the beautiful colors and shapes around us!
          </p>
        </motion.div>

        {/* Module Content */}
        {renderPart1()}
      </div>
    </div>
  );
}