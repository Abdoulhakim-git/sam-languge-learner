import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PracticeLink, MODULE_PRACTICE_LINKS } from "@/components/PracticeLink";
import { RobotSam } from "@/components/RobotSam";
import { bulletproofAudioSystem as bulletproofAudio } from "@/lib/bulletproofAudioSystem";

import { ArrowLeft, Palette, Shapes } from "lucide-react";
import { Link } from "wouter";

export default function Module4() {
  const [currentLesson, setCurrentLesson] = useState(0);

  const lessons = [
    {
      id: 1,
      title: "Colors",
      content: {
        introduction: "Hello! I'm Teacher Sam. Today, we will learn about colors in English! Colors make our world beautiful. Let me teach you the English words for different colors.",
        mainContent: "Basic colors in English: Red, Blue, Yellow, Green, Orange, Purple, Pink, Black, White, Brown, Gray. In Niger, we see beautiful colors in our traditional fabrics!",
        vocabulary: [
          { word: "Red", pronunciation: "RED", french: "Rouge", example: "The sun is red at sunset", color: "#DC2626" },
          { word: "Blue", pronunciation: "BLOO", french: "Bleu", example: "The sky is blue", color: "#2563EB" },
          { word: "Yellow", pronunciation: "YEL-oh", french: "Jaune", example: "The sun is yellow", color: "#EAB308" },
          { word: "Green", pronunciation: "GREEN", french: "Vert", example: "Trees are green", color: "#16A34A" },
          { word: "Orange", pronunciation: "OR-inj", french: "Orange", example: "Oranges are orange", color: "#EA580C" },
          { word: "Purple", pronunciation: "PUR-puhl", french: "Violet", example: "Grapes are purple", color: "#9333EA" },
          { word: "Pink", pronunciation: "PINK", french: "Rose", example: "Flowers are pink", color: "#EC4899" },
          { word: "Black", pronunciation: "BLAK", french: "Noir", example: "Night is black", color: "#1F2937" },
          { word: "White", pronunciation: "WHAYT", french: "Blanc", example: "Clouds are white", color: "#F9FAFB" },
          { word: "Brown", pronunciation: "BROWN", french: "Marron", example: "Soil is brown", color: "#92400E" }
        ]
      }
    },
    {
      id: 2,
      title: "Shapes",
      content: {
        introduction: "Hello again my fantastic learners! I'm Teacher Sam, and I'm absolutely thrilled to explore shapes with you today! Now let's learn about amazing shapes in English! Shapes are everywhere around us, and they're so exciting to discover! Let me show you these wonderful shapes!",
        mainContent: "Basic shapes in English: Circle, Square, Triangle, Rectangle, Oval, Diamond, Star, Heart. We see these shapes in Niger's beautiful architecture!",
        vocabulary: [
          { word: "Circle", pronunciation: "SUR-kuhl", french: "Cercle", example: "The moon is a circle" },
          { word: "Square", pronunciation: "SKWAIR", french: "Carré", example: "Windows are square" },
          { word: "Triangle", pronunciation: "TRAHY-ang-guhl", french: "Triangle", example: "Roofs are triangles" },
          { word: "Rectangle", pronunciation: "REK-tang-guhl", french: "Rectangle", example: "Books are rectangles" },
          { word: "Oval", pronunciation: "OH-vuhl", french: "Ovale", example: "Eggs are oval" },
          { word: "Diamond", pronunciation: "DAHY-muhnd", french: "Losange", example: "Gems are diamonds" },
          { word: "Star", pronunciation: "STAHR", french: "Étoile", example: "Stars shine at night" },
          { word: "Heart", pronunciation: "HAHRT", french: "Cœur", example: "Love is a heart shape" }
        ]
      }
    }
  ];

  const lesson = lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-yellow-100">
      {/* Niger landscape background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-300 to-orange-200"></div>
        <div className="absolute bottom-8 left-10 w-8 h-16 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-8 left-20 w-6 h-12 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-8 right-20 w-10 h-20 bg-green-600 rounded-t-full"></div>
        <div className="absolute top-20 left-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/modules">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Modules
            </Button>
          </Link>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Module 4
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Teacher Sam */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6 text-center">
                <RobotSam 
                  isTeaching={true}
                  gesture={{ type: 'point', duration: 2000 }}
                  size="large"
                  showSpeechBubble={true}
                  speechText="Let's explore colors and shapes!"
                />
              </CardContent>
            </Card>

            {/* Lesson Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shapes className="w-5 h-5 text-purple-500" />
                  Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lessons.map((l, index) => (
                    <Button
                      key={l.id}
                      variant={currentLesson === index ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setCurrentLesson(index)}
                    >
                      {l.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-gray-700 mb-3">{lesson.content.introduction}</p>
                  <AudioPlayer
                    text={lesson.content.introduction}
                    title="Introduction"
                    description="Listen to Teacher Sam's introduction"
                    className="w-full"
                  />
                </div>

                <div className="p-4 bg-pink-50 rounded-lg">
                  <p className="text-gray-700 mb-3">{lesson.content.mainContent}</p>
                  <AudioPlayer
                    text={lesson.content.mainContent}
                    title="Main Content"
                    description="Learn the vocabulary"
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Interactive Color Palette */}
            {currentLesson === 0 && (
              <Card className="bg-gradient-to-br from-rainbow-light to-rainbow-dark border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Palette className="w-6 h-6" />
                    Interactive Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-xl p-6">
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                      {[
                        { name: "Red", color: "#DC2626", emoji: "🔴" },
                        { name: "Blue", color: "#2563EB", emoji: "🔵" },
                        { name: "Yellow", color: "#EAB308", emoji: "🟡" },
                        { name: "Green", color: "#16A34A", emoji: "🟢" },
                        { name: "Orange", color: "#EA580C", emoji: "🟠" },
                        { name: "Purple", color: "#9333EA", emoji: "🟣" },
                        { name: "Pink", color: "#EC4899", emoji: "🩷" },
                        { name: "Black", color: "#1F2937", emoji: "⚫" },
                        { name: "White", color: "#F9FAFB", emoji: "⚪" },
                        { name: "Brown", color: "#92400E", emoji: "🤎" }
                      ].map((colorItem, index) => (
                        <div 
                          key={index}
                          className="text-center cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => bulletproofAudio.playAudio(`${colorItem.name}! This is the color ${colorItem.name}! Can you say ${colorItem.name}?`)}
                        >
                          <div 
                            className="w-24 h-24 rounded-full border-4 border-gray-300 mx-auto mb-3 shadow-lg hover:shadow-xl transition-shadow"
                            style={{ backgroundColor: colorItem.color }}
                          ></div>
                          <div className="text-4xl mb-2">{colorItem.emoji}</div>
                          <p className="text-sm font-semibold text-gray-800">{colorItem.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interactive Shapes Gallery */}
            {currentLesson === 1 && (
              <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Shapes className="w-6 h-6" />
                    Interactive Shapes Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-xl p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                      {[
                        { name: "Circle", shape: "🔵", description: "Round shape" },
                        { name: "Square", shape: "🟩", description: "Four equal sides" },
                        { name: "Triangle", shape: "🔺", description: "Three sides" },
                        { name: "Rectangle", shape: "🟦", description: "Four sides, opposite equal" },
                        { name: "Oval", shape: "🥚", description: "Egg-like shape" },
                        { name: "Diamond", shape: "💎", description: "Four equal sides, pointed" },
                        { name: "Star", shape: "⭐", description: "Five points" },
                        { name: "Heart", shape: "❤️", description: "Love shape" }
                      ].map((shapeItem, index) => (
                        <div 
                          key={index}
                          className="bg-blue-50 rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition-colors hover:scale-105 transform"
                          onClick={() => bulletproofAudio.playAudio(`${shapeItem.name}! This is a ${shapeItem.name}! ${shapeItem.description}! Can you draw a ${shapeItem.name}?`)}
                        >
                          <div className="text-6xl mb-3">{shapeItem.shape}</div>
                          <p className="text-sm font-semibold text-blue-700">{shapeItem.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{shapeItem.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vocabulary Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Vocabulary Words</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {lesson.content.vocabulary.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-purple-700">{item.word}</h4>
                            {currentLesson === 0 && 'color' in item && (
                              <div 
                                className="w-6 h-6 rounded-full border-2 border-gray-300" 
                                style={{ backgroundColor: item.color }}
                              ></div>
                            )}
                            {currentLesson === 1 && (
                              <div className="flex items-center justify-center w-8 h-8 border-2 border-purple-400">
                                {item.word === "Circle" && <div className="w-6 h-6 bg-purple-400 rounded-full"></div>}
                                {item.word === "Square" && <div className="w-6 h-6 bg-purple-400"></div>}
                                {item.word === "Triangle" && <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-transparent border-b-purple-400"></div>}
                                {item.word === "Rectangle" && <div className="w-8 h-4 bg-purple-400"></div>}
                                {item.word === "Oval" && <div className="w-6 h-4 bg-purple-400 rounded-full"></div>}
                                {item.word === "Diamond" && <div className="w-4 h-4 bg-purple-400 transform rotate-45"></div>}
                                {item.word === "Star" && <span className="text-purple-400 text-lg">★</span>}
                                {item.word === "Heart" && <span className="text-purple-400 text-lg">♥</span>}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">[{item.pronunciation}]</p>
                          <p className="text-sm text-purple-600">French: {item.french}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 italic">"{item.example}"</p>
                      <AudioPlayer
                        text={`${item.word}. ${item.example}`}
                        title={item.word}
                        description="Listen and repeat"
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lesson Completion */}
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-purple-700 mb-4">
                  🎨 Amazing Work Learning {lesson.title}! 🎨
                </h3>
                <p className="text-gray-700 mb-4">
                  You've mastered this lesson! Practice more with these colorful games:
                </p>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
                  onClick={() => bulletproofAudio.playAudio("Fantastic! You learned all about colors and shapes! You're doing so well! Keep up the great work!")}
                >
                  🌈 Click here to celebrate! 🌈
                </Button>
              </CardContent>
            </Card>

            {/* Practice Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <PracticeLink 
                title="Colors Learning Games"
                description="Practice colors with interactive games"
                url="https://www.learnenglishkids.britishcouncil.org/word-games/colours"
                icon="game"
                onClick={() => bulletproofAudio.playAudio("Amazing! Practice colors with this fun game! You will learn red, blue, green, yellow, orange, purple, pink, brown, black, white!")}
              />
              <PracticeLink 
                title="Shapes Practice"
                description="Learn shapes with fun activities"
                url="https://www.eslgamesplus.com/shapes-vocabulary-esl-interactive-fun-game-online/"
                icon="practice"
                onClick={() => bulletproofAudio.playAudio("Excellent! Practice shapes with this interactive game! You will learn circle, square, triangle, rectangle and more shapes!")}
              />
            </div>
            
            {/* Module Completion Button */}
            <motion.button
              className="mt-6 bg-rainbow-gradient hover:scale-105 text-white px-8 py-4 rounded-xl font-bold text-lg w-full transition-transform"
              onClick={() => bulletproofAudio.playAudio("Wonderful! You completed Module 4 about colors and shapes! You learned red, blue, green, yellow, orange, purple! You know circle, square, triangle, rectangle! You can describe everything around you now! Brilliant work!")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)' }}
            >
              🌈 Complete Module 4: Colors & Shapes! 🌈
            </motion.button>

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
                <h4 className="text-xl font-bold text-green-700 mb-3">🎨 Colors & Shapes in Niger Art</h4>
                <p className="text-gray-700 mb-4">
                  Niger's traditional art is full of beautiful colors and shapes! Tuareg clothing uses deep indigo blue from local plants. 
                  Hausa textiles feature bright red, yellow, and green patterns. Mosque architecture shows circles, triangles, and geometric designs. 
                  These colors and shapes tell stories about Niger's rich cultural heritage!
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-bold text-orange-700 mb-2">🌈 Traditional Colors</h5>
                    <p className="text-sm text-gray-700">
                      Indigo blue (Tuareg clothing), earth red (pottery), 
                      sunset orange (fabrics), and desert yellow (decorations) 
                      represent Niger's natural landscape!
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-bold text-green-700 mb-2">🔺 Sacred Shapes</h5>
                    <p className="text-sm text-gray-700">
                      Circles represent unity, triangles show strength, 
                      and rectangles provide shelter in traditional Niger architecture and art!
                    </p>
                  </div>
                </div>
                
                <AudioPlayer
                  text="Niger's art is amazing! Tuareg craftsmen use beautiful indigo blue dye from plants. Hausa artists create bright red, yellow, and green patterns. Mosque builders use circles for unity, triangles for strength, and rectangles for shelter. When you learn English colors and shapes, you're connecting with the same beauty that Niger artists have used for hundreds of years!"
                  frenchTranslation="L'art du Niger est incroyable!"
                  hausaTranslation="Fasahar Niger tana da ban mamaki!"
                  title="🌍 Niger's Artistic Heritage"
                  description="Learn about Niger's beautiful colors and shapes"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}