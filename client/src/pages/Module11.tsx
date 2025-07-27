import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { MultilingualImageCard } from "@/components/MultilingualImageCard";
import { PracticeLink } from "@/components/PracticeLink";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Link } from "wouter";
import { strictEnglishAudio } from "@/lib/strictEnglishAudio";

const LESSONS = [
  {
    id: 1,
    title: "What's the Weather Like?",
    content: {
      introduction: "Hello! I'm Teacher Sam. Look outside your window! What do you see? Today, we're going to learn how to talk about the weather. Is it sunny? Is it rainy? Let's find out!",
      vocabulary: [
        { english: "Sunny", french: "Ensoleillé", example: "It is sunny today. I can play outside.", emoji: "☀️" },
        { english: "Rainy", french: "Pluvieux", example: "It is rainy. I need an umbrella.", emoji: "🌧️" },
        { english: "Cloudy", french: "Nuageux", example: "It is cloudy. The sun is hiding.", emoji: "☁️" },
        { english: "Windy", french: "Venteux", example: "It is windy. My hat might fly away!", emoji: "💨" },
        { english: "Snowy", french: "Neigeux", example: "It is snowy. Let's build a snowman!", emoji: "❄️" }
      ],
      explanation: "To talk about the weather, we say: 'It is [weather word].' For example: It is sunny. It is cloudy. To ask about the weather, we say: How's the weather today?"
    }
  },
  {
    id: 2,
    title: "The Four Seasons & What to Wear",
    content: {
      introduction: "Hi again! It's Teacher Sam! The weather changes with the seasons. There are four seasons in a year. Now, what do we wear in different seasons?",
      seasons: [
        { english: "Spring", french: "Printemps", weather: "It is often rainy and a little sunny. Flowers grow.", emoji: "🌸" },
        { english: "Summer", french: "Été", weather: "It is hot and sunny.", emoji: "🌞" },
        { english: "Autumn", french: "Automne", weather: "It is cool and windy. Leaves fall from the trees.", emoji: "🍂" },
        { english: "Winter", french: "Hiver", weather: "It is cold and sometimes snowy.", emoji: "❄️" }
      ],
      clothes: [
        { english: "T-shirt", french: "T-shirt", usage: "I wear a T-shirt in summer.", emoji: "👕" },
        { english: "Shorts", french: "Short", usage: "I wear shorts when it is hot.", emoji: "🩳" },
        { english: "Jacket", french: "Veste", usage: "I wear a jacket in autumn and spring.", emoji: "🧥" },
        { english: "Scarf", french: "Écharpe", usage: "I wear a scarf in winter.", emoji: "🧣" },
        { english: "Hat", french: "Chapeau", usage: "I wear a sun hat in summer and a warm hat in winter.", emoji: "👒" }
      ]
    }
  }
];

export default function Module11() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [moduleData, setModuleData] = useState(null);
  
  // Fetch module data from API
  useEffect(() => {
    fetch('/api/modules/11')
      .then(res => res.json())
      .then(data => setModuleData(data))
      .catch(err => console.error('Failed to load module data:', err));
  }, []);
  
  if (!moduleData) {
    return <div className="p-6 text-center">Loading Module 11...</div>;
  }
  
  const lesson = moduleData.lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 weather-sky-bg">
      {/* Niger Sky Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:"#87CEEB"}} />
              <stop offset="100%" style={{stopColor:"#F0F8FF"}} />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#skyGrad)" />
          {/* Clouds */}
          <ellipse cx="150" cy="100" rx="40" ry="20" fill="white" opacity="0.6" />
          <ellipse cx="400" cy="80" rx="50" ry="25" fill="white" opacity="0.6" />
          <ellipse cx="650" cy="120" rx="35" ry="18" fill="white" opacity="0.6" />
          {/* Sun */}
          <circle cx="650" cy="80" r="30" fill="#FFD700" opacity="0.8" />
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
              Module 11: The Weather & The Seasons
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn to describe weather conditions and seasons
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="How's the weather today?"
                screenText="MODULE 11"
              />
            </div>
          </div>
        </motion.div>

        {/* Lesson Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 rounded-full p-2 shadow-lg">
            {moduleData.lessons.map((_, index) => (
              <Button
                key={index}
                variant={currentLesson === index ? "default" : "ghost"}
                size="sm"
                className="mx-1"
                onClick={() => setCurrentLesson(index)}
              >
                Part {index + 1}
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
              <CardTitle className="text-2xl text-blue-700">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <AudioPlayer
                text={lesson.content.introduction}
                title="Teacher Sam introduces the lesson"
                className="mb-4"
              />
            </CardContent>
          </Card>

          {/* Lesson 1: Weather Vocabulary */}
          {currentLesson === 0 && lesson.content.vocabulary && (
            <>
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>🌤️ Weather Vocabulary</CardTitle>
                </CardHeader>
                <CardContent>
                  <AudioPlayer
                    text="Now let's learn words to describe the weather! Click on each weather type to hear how to say it."
                    title="Weather vocabulary explanation"
                    className="mb-6"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {lesson.content.vocabulary.map((weather, index) => (
                      <MultilingualImageCard
                        key={index}
                        emoji={weather.emoji}
                        english={weather.english}
                        french={weather.french}
                        hausa={weather.hausa}
                        example={weather.example}
                        bgColor="bg-sky-100"
                        textColor="text-sky-800"
                      />
                    ))}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-4">🗣️ Practice Questions</h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-3">
                        <AudioPlayer
                          text="How's the weather today? You can answer: It is sunny! or It is rainy!"
                          title="Practice question 1"
                          className="mb-2"
                        />
                        <p className="text-blue-700">🔊 "How's the weather today?" → "It is sunny!"</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <AudioPlayer
                          text="Look outside the window. What do you see? It is cloudy today!"
                          title="Practice question 2"
                          className="mb-2"
                        />
                        <p className="text-blue-700">🔊 "Look outside!" → "It is cloudy today."</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Lesson 2: Seasons and Clothes */}
          {currentLesson === 1 && lesson.content.seasons && (
            <>
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>🌺 The Four Seasons</CardTitle>
                </CardHeader>
                <CardContent>
                  <AudioPlayer
                    text="The weather changes throughout the year. There are four seasons. Each season has different weather!"
                    title="Seasons explanation"
                    className="mb-6"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {lesson.content.seasons.map((season, index) => (
                      <MultilingualImageCard
                        key={index}
                        emoji={season.emoji}
                        english={season.english}
                        french={season.french}
                        hausa={season.hausa}
                        example={season.weather}
                        bgColor="bg-green-100"
                        textColor="text-green-800"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {lesson.content.clothes && (
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle>👕 What to Wear?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AudioPlayer
                      text="Different weather means we wear different clothes. Let's learn what to wear in different weather!"
                      title="Clothing explanation"
                      className="mb-6"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {lesson.content.clothes.map((clothing, index) => (
                        <MultilingualImageCard
                          key={index}
                          emoji={clothing.emoji}
                          english={clothing.english}
                          french={clothing.french}
                          hausa={clothing.hausa}
                          example={clothing.usage}
                          bgColor="bg-purple-100"
                          textColor="text-purple-800"
                        />
                      ))}
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-bold text-purple-800 mb-4">🗣️ Practice Sentences</h3>
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-3">
                          <AudioPlayer
                            text="In winter, it is cold. I wear a jacket and a scarf to stay warm!"
                            title="Winter clothing practice"
                            className="mb-2"
                          />
                          <p className="text-purple-700">🔊 "In winter, it is cold. I wear a jacket and a scarf."</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <AudioPlayer
                            text="In summer, it is hot and sunny. I wear a T-shirt and shorts to stay cool!"
                            title="Summer clothing practice"
                            className="mb-2"
                          />
                          <p className="text-purple-700">🔊 "In summer, it is hot. I wear a T-shirt and shorts."</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Practice Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎮</span> Practice Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PracticeLink
                  title="Weather Vocabulary Game"
                  description="Practice weather words with fun games"
                  url="https://www.britishcouncil.org/school/kids-games/weather"
                  icon="game"
                />
                <PracticeLink
                  title="Seasons and Clothes Game"
                  description="Match clothes to different seasons"
                  url="https://www.eslgamesplus.com/weather-seasons-vocabulary-game/"
                  icon="practice"
                />
              </div>
            </CardContent>
          </Card>

          {/* Completion */}
          <Card className="bg-gradient-to-r from-green-100 to-blue-100">
            <CardContent className="text-center py-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">🎉 Module 11 Complete!</h3>
              <p className="text-green-700 mb-4">
                Fantastic work! You can now talk about the weather and seasons!
              </p>
              <motion.button
                onClick={() => strictEnglishAudio.speak("Amazing work! You completed Module 11 about weather and seasons! Now you can talk about sunny days, rainy weather, and what clothes to wear! You're becoming an English weather expert!")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔊 Celebrate Your Success!
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}