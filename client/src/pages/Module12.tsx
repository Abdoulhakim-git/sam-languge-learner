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

export default function Module12() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [moduleData, setModuleData] = useState(null);
  
  // Fetch module data from API
  useEffect(() => {
    fetch('/api/modules/12')
      .then(res => res.json())
      .then(data => setModuleData(data))
      .catch(err => console.error('Failed to load module data:', err));
  }, []);
  
  if (!moduleData) {
    return <div className="p-6 text-center">Loading Module 12...</div>;
  }
  
  const lesson = moduleData.lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 city-bg">
      {/* Niger City Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          {/* Buildings */}
          <rect x="50" y="300" width="80" height="200" fill="#8B4513" />
          <rect x="150" y="250" width="100" height="250" fill="#A0522D" />
          <rect x="300" y="280" width="90" height="220" fill="#8B4513" />
          <rect x="450" y="240" width="120" height="260" fill="#A0522D" />
          <rect x="600" y="290" width="80" height="210" fill="#8B4513" />
          {/* Road */}
          <rect x="0" y="500" width="800" height="100" fill="#696969" />
          {/* Trees */}
          <ellipse cx="400" cy="480" rx="30" ry="25" fill="#228B22" />
          <rect x="395" y="480" width="10" height="30" fill="#8B4513" />
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
              Module 12: Around Town & Giving Directions
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn places in the city and how to give directions
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="Let's explore the city!"
                screenText="MODULE 12"
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
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-800">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <RobotSam size="small" />
                <div className="flex-1">
                  <AudioPlayer 
                    text={lesson.content.introduction}
                    title="Lesson Introduction"
                    className="mb-4"
                  />
                  <p className="text-gray-700">{lesson.content.introduction}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Places in the City */}
          {lesson.content.places && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Places in the City</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text="Here are important places you can find in any city. Click on each place to hear how to say it!"
                  title="Places explanation"
                  className="mb-6"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {lesson.content.places.map((place, index) => (
                    <MultilingualImageCard
                      key={index}
                      emoji={place.emoji}
                      english={place.english}
                      french={place.french}
                      hausa={place.hausa}
                      example={place.example}
                      bgColor="bg-amber-100"
                      textColor="text-amber-800"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Giving Directions */}
          {lesson.content.directions && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Giving Directions</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text="Now let's learn how to give directions! These words help people find their way around the city."
                  title="Directions explanation"
                  className="mb-6"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {lesson.content.directions.map((direction, index) => (
                    <MultilingualImageCard
                      key={index}
                      emoji={direction.emoji}
                      english={direction.english}
                      french={direction.french}
                      hausa={direction.hausa}
                      example={direction.example}
                      bgColor="bg-orange-100"
                      textColor="text-orange-800"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Practice Activities */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Practice Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PracticeLink
                  title="City Places Game"
                  description="Practice vocabulary about city places"
                  url="https://www.britishcouncil.org/school/kids-games/vocabulary"
                  icon="game"
                />
                <PracticeLink
                  title="Directions Practice"
                  description="Learn to give and follow directions"
                  url="https://www.eslgamesplus.com/directions-prepositions-esl-interactive-game/"
                  icon="practice"
                />
              </div>
            </CardContent>
          </Card>

          {/* Lesson Completion */}
          <Card className="bg-gradient-to-r from-green-400 to-emerald-500 text-white">
            <CardContent className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4">🎉 Great Job!</h3>
              <p className="text-lg mb-4">You completed {lesson.title}!</p>
              <AudioPlayer 
                text="Excellent work! You now know how to talk about places in the city and give directions. Keep practicing!"
                title="Completion message"
                className="mb-4"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}