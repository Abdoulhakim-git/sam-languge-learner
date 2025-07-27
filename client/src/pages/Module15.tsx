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

export default function Module15() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [moduleData, setModuleData] = useState(null);
  
  // Fetch module data from API
  useEffect(() => {
    fetch('/api/modules/15')
      .then(res => res.json())
      .then(data => setModuleData(data))
      .catch(err => console.error('Failed to load module data:', err));
  }, []);
  
  if (!moduleData) {
    return <div className="p-6 text-center">Loading Module 15...</div>;
  }
  
  const lesson = moduleData.lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 feelings-bg">
      {/* Niger Emotions Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          {/* Comparison scales */}
          <rect x="100" y="250" width="150" height="20" fill="#8B4513" />
          <rect x="550" y="250" width="150" height="20" fill="#8B4513" />
          <circle cx="175" cy="200" r="25" fill="#FF6B6B" />
          <circle cx="625" cy="200" r="40" fill="#FF6B6B" />
          {/* Emotion faces */}
          <circle cx="200" cy="400" r="30" fill="#FFD700" />
          <circle cx="180" cy="390" r="3" fill="#000" />
          <circle cx="220" cy="390" r="3" fill="#000" />
          <path d="M 185 410 Q 200 420 215 410" stroke="#000" strokeWidth="2" fill="none" />
          
          <circle cx="400" cy="400" r="30" fill="#87CEEB" />
          <circle cx="380" cy="390" r="3" fill="#000" />
          <circle cx="420" cy="390" r="3" fill="#000" />
          <path d="M 385 415 Q 400 405 415 415" stroke="#000" strokeWidth="2" fill="none" />
          
          <circle cx="600" cy="400" r="30" fill="#98FB98" />
          <circle cx="580" cy="390" r="3" fill="#000" />
          <circle cx="620" cy="390" r="3" fill="#000" />
          <path d="M 585 410 Q 600 420 615 410" stroke="#000" strokeWidth="2" fill="none" />
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
              Module 15: Comparing & Feeling (Adjectives)
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn to compare things and express more feelings
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="How do you feel today?"
                screenText="MODULE 15"
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
              <CardTitle className="text-2xl text-pink-800">{lesson.title}</CardTitle>
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

          {/* Short Adjectives */}
          {lesson.content.shortAdjectives && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Comparing Things</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text="When we compare things, we add -er to short adjectives. Listen to these examples and click on each one!"
                  title="Comparisons explanation"
                  className="mb-6"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {lesson.content.shortAdjectives.map((adjective, index) => (
                    <MultilingualImageCard
                      key={index}
                      emoji={adjective.emoji}
                      english={`${adjective.adjective} → ${adjective.comparative}`}
                      french={adjective.french}
                      hausa={adjective.hausa}
                      example={adjective.example}
                      bgColor="bg-pink-100"
                      textColor="text-pink-800"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Feelings */}
          {lesson.content.feelings && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>How Do You Feel?</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text="There are many ways to express how you feel. Let's learn some new feeling words!"
                  title="Feelings explanation"
                  className="mb-6"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {lesson.content.feelings.map((feeling, index) => (
                    <MultilingualImageCard
                      key={index}
                      emoji={feeling.emoji}
                      english={feeling.english}
                      french={feeling.french}
                      hausa={feeling.hausa}
                      example={feeling.example}
                      bgColor="bg-rose-100"
                      textColor="text-rose-800"
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
                  title="Adjectives Game"
                  description="Practice comparing adjectives"
                  url="https://www.eslgamesplus.com/comparative-adjectives-esl-interactive-game/"
                  icon="game"
                />
                <PracticeLink
                  title="Feelings Practice"
                  description="Express your emotions in English"
                  url="https://www.britishcouncil.org/school/kids-games/emotions"
                  icon="practice"
                />
              </div>
            </CardContent>
          </Card>

          {/* Lesson Completion */}
          <Card className="bg-gradient-to-r from-green-400 to-emerald-500 text-white">
            <CardContent className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4">🎉 Comparison Champion!</h3>
              <p className="text-lg mb-4">You completed {lesson.title}!</p>
              <AudioPlayer 
                text="Perfect! You now know how to compare things and express many different feelings. You're becoming a great English speaker!"
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