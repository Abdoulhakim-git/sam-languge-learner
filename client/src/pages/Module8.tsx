import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PracticeLink } from "@/components/PracticeLink";
import { bulletproofAudioSystem as bulletproofAudio } from "@/lib/bulletproofAudioSystem";

import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Link } from "wouter";

const LESSONS = [
  {
    id: 1,
    title: "Descriptive Adjectives",
    content: {
      introduction: "Hello! I'm Teacher Sam. Today we will learn adjectives - words that describe things!",
      vocabulary: [
        { english: "Big", french: "Grand", example: "The elephant is big", usage: "Size description" },
        { english: "Small", french: "Petit", example: "The ant is small", usage: "Size description" },
        { english: "Hot", french: "Chaud", example: "The sun is hot", usage: "Temperature" },
        { english: "Cold", french: "Froid", example: "Ice is cold", usage: "Temperature" },
        { english: "Beautiful", french: "Beau/Belle", example: "Niger is beautiful", usage: "Appearance" },
        { english: "Happy", french: "Heureux", example: "I am happy", usage: "Emotion" }
      ]
    }
  },
  {
    id: 2,
    title: "Position Prepositions",
    content: {
      introduction: "Now let's learn prepositions - words that tell us where things are!",
      vocabulary: [
        { english: "In", french: "Dans", example: "The book is in the bag", usage: "Inside something" },
        { english: "On", french: "Sur", example: "The cup is on the table", usage: "On top of" },
        { english: "Under", french: "Sous", example: "The cat is under the chair", usage: "Below something" },
        { english: "Next to", french: "À côté de", example: "I sit next to my friend", usage: "Beside" },
        { english: "Behind", french: "Derrière", example: "The tree is behind the house", usage: "At the back" },
        { english: "In front of", french: "Devant", example: "The car is in front of the store", usage: "At the front" }
      ]
    }
  }
];

export default function Module8() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const lesson = LESSONS[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 acacia-reflection-bg">
      {/* Niger Cultural Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#FFF0F5" />
          <g opacity="0.4">
            <rect x="100" y="100" width="50" height="50" fill="#EC4899" />
            <circle cx="300" cy="200" r="30" fill="#F43F5E" />
            <rect x="500" y="300" width="40" height="60" fill="#E11D48" />
            <circle cx="700" cy="450" r="25" fill="#BE185D" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/modules">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Modules
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Module 8: Adjectives & Prepositions
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn descriptive words and position words
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="Let's describe things!"
                screenText="MODULE 8"
              />
            </div>
          </div>
        </motion.div>

        {/* Lesson Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 rounded-full p-2 shadow-lg">
            {LESSONS.map((_, index) => (
              <Button
                key={index}
                variant={currentLesson === index ? "default" : "ghost"}
                size="sm"
                className="mx-1"
                onClick={() => setCurrentLesson(index)}
              >
                Lesson {index + 1}
              </Button>
            ))}
          </div>
        </div>

        {/* Lesson Content */}
        <motion.div
          key={currentLesson}
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-pink-700">
                {lesson.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <AudioPlayer
                  text={lesson.content.introduction}
                  title="Lesson Introduction"
                  description="Listen to Teacher Sam"
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </CardContent>
          </Card>

          {/* Vocabulary Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Vocabulary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {lesson.content.vocabulary.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-pink-700 mb-2">{item.english}</h4>
                    <p className="text-sm text-purple-600 mb-1">French: {item.french}</p>
                    <p className="text-sm text-gray-600 mb-2">Usage: {item.usage}</p>
                    <p className="text-sm text-gray-700 mb-3 italic">"{item.example}"</p>
                    <AudioPlayer
                      text={item.example}
                      title={item.english}
                      description="Listen and repeat"
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Adjectives Gallery */}
          {currentLesson === 0 && (
            <Card className="bg-gradient-to-br from-pink-50 to-red-50 border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-700">
                  🎨 Interactive Adjectives Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { word: "big", emoji: "🐘", opposite: "small", example: "The elephant is big!" },
                      { word: "small", emoji: "🐭", opposite: "big", example: "The mouse is small!" },
                      { word: "hot", emoji: "🔥", opposite: "cold", example: "The fire is hot!" },
                      { word: "cold", emoji: "❄️", opposite: "hot", example: "Ice is cold!" },
                      { word: "happy", emoji: "😊", opposite: "sad", example: "She is happy!" },
                      { word: "sad", emoji: "😢", opposite: "happy", example: "He looks sad!" },
                      { word: "fast", emoji: "🏎️", opposite: "slow", example: "The car is fast!" },
                      { word: "slow", emoji: "🐌", opposite: "fast", example: "The snail is slow!" }
                    ].map((adj, index) => (
                      <div 
                        key={index}
                        className="bg-pink-100 rounded-lg p-4 cursor-pointer hover:bg-pink-200 transition-colors hover:scale-110 transform"
                        onClick={() => bulletproofAudio.playAudio(`${adj.word}! ${adj.example} The opposite of ${adj.word} is ${adj.opposite}! Can you use ${adj.word} in a sentence?`)}
                      >
                        <div className="text-6xl mb-3">{adj.emoji}</div>
                        <p className="text-sm font-semibold text-pink-700">{adj.word}</p>
                        <p className="text-xs text-gray-600 mt-1">{adj.example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interactive Prepositions Gallery */}
          {currentLesson === 1 && (
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  📍 Interactive Prepositions Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { word: "in", emoji: "📦", visual: "🎾", example: "The ball is IN the box!" },
                      { word: "on", emoji: "📚", visual: "🍎", example: "The apple is ON the book!" },
                      { word: "under", emoji: "🛏️", visual: "👟", example: "The shoes are UNDER the bed!" },
                      { word: "behind", emoji: "🌳", visual: "🐱", example: "The cat is BEHIND the tree!" },
                      { word: "next to", emoji: "🚗", visual: "🏠", example: "The car is NEXT TO the house!" },
                      { word: "between", emoji: "🏠🏠", visual: "🌳", example: "The tree is BETWEEN the houses!" },
                      { word: "above", emoji: "☁️", visual: "🏔️", example: "The clouds are ABOVE the mountain!" },
                      { word: "below", emoji: "🐠", visual: "🚢", example: "The fish is BELOW the boat!" }
                    ].map((prep, index) => (
                      <div 
                        key={index}
                        className="bg-blue-100 rounded-lg p-4 cursor-pointer hover:bg-blue-200 transition-colors hover:scale-110 transform"
                        onClick={() => bulletproofAudio.playAudio(`${prep.word}! ${prep.example} Can you find something ${prep.word} something else?`)}
                      >
                        <div className="text-6xl mb-3">{prep.emoji}{prep.visual}</div>
                        <p className="text-sm font-semibold text-blue-700">{prep.word}</p>
                        <p className="text-xs text-gray-600 mt-1">{prep.example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lesson Completion */}
          <Card className="bg-gradient-to-r from-pink-100 to-red-100 border-pink-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-pink-700 mb-4">
                🏆 Amazing Work Learning {lesson.title}! 🏆
              </h3>
              <p className="text-gray-700 mb-4">
                You've mastered describing words and positions! Practice more with these games:
              </p>
              <Button 
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
                onClick={() => bulletproofAudio.playAudio("Wonderful! You learned adjectives and prepositions! You can describe everything now! Excellent work!")}
              >
                🎉 Click here to celebrate! 🎉
              </Button>
            </CardContent>
          </Card>

          {/* Practice Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <PracticeLink 
              title="Adjectives Practice Games"
              description="Practice describing words with fun activities"
              url="https://www.learnenglishkids.britishcouncil.org/grammar-practice/adjectives"
              icon="game"
              onClick={() => bulletproofAudio.playAudio("Amazing! Practice adjectives with this game! You will learn big, small, happy, sad, hot, cold, fast, slow!")}
            />
            <PracticeLink 
              title="Prepositions Learning"
              description="Learn position words and where things are"
              url="https://www.eslgamesplus.com/prepositions-of-place-esl-interactive-fun-game-online/"
              icon="practice"
              onClick={() => bulletproofAudio.playAudio("Excellent! Practice prepositions with this game! You will learn in, on, under, behind, next to, between!")}
            />
          </div>
          
          {/* Module Completion Button */}
          <motion.button
            className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
            onClick={() => bulletproofAudio.playAudio("Wonderful! You completed Module 8 about adjectives and prepositions! You learned big, small, happy, sad, hot, cold! You know in, on, under, behind, next to, between! You can describe things and their positions! Brilliant work!")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📍 Complete Module 8: Adjectives & Prepositions! 📍
          </motion.button>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
            disabled={currentLesson === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button 
            onClick={() => setCurrentLesson(Math.min(LESSONS.length - 1, currentLesson + 1))}
            disabled={currentLesson === LESSONS.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
          {/* Niger Cultural Section */}
          <motion.div 
            className="bg-gradient-to-r from-orange-100 via-yellow-100 to-green-100 rounded-xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">🇳🇪</span>
              <h3 className="text-2xl font-fredoka text-orange-700">Niger Cultural Connection</h3>
            </div>
            
            <div className="bg-white rounded-lg p-6 mb-4">
              <h4 className="text-xl font-bold text-green-700 mb-3">🏘️ Describing Niger Places</h4>
              <p className="text-gray-700 mb-4">
                Niger people use beautiful words to describe their world! Markets are "crowded and colorful" with spices and fabrics. 
                Villages are "peaceful and friendly" where everyone knows each other. The Niger River is "wide and flowing" bringing life to communities. 
                Desert oases are "green and cool" providing rest for travelers. These descriptive words help share Niger's beauty!
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h5 className="font-bold text-orange-700 mb-2">🎨 Describing Beauty</h5>
                  <p className="text-sm text-gray-700">
                    "The sunset is beautiful and orange." "The baobab tree is old and wise." 
                    Niger people love describing the natural beauty around them!
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-bold text-green-700 mb-2">📍 Location Words</h5>
                  <p className="text-sm text-gray-700">
                    "Under the tree, next to the well, inside the mosque" - 
                    these position words help navigate Niger communities!
                  </p>
                </div>
              </div>
              
              <AudioPlayer
                text="Niger has such beautiful places to describe! Markets are busy and colorful with amazing spices and bright fabrics. Villages are quiet and peaceful where families live happily together. The great Niger River is wide and flowing, bringing fresh water to everyone. When you learn English describing words, you can share the incredible beauty of Niger with people all over the world!"
                frenchTranslation="Le Niger a de si beaux endroits à décrire!"
                hausaTranslation="Niger yana da kyawawan wurare da za a iya bayyana!"
                title="🌍 Niger's Beautiful Landscapes"
                description="Learn to describe Niger's amazing places"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}