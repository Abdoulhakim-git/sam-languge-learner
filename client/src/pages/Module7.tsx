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
    title: "Present Continuous Tense",
    content: {
      introduction: "Hello! I'm Teacher Sam. Today we will learn about actions happening right now. This is called Present Continuous tense!",
      examples: [
        { english: "I am reading", french: "Je suis en train de lire", action: "reading" },
        { english: "You are walking", french: "Tu es en train de marcher", action: "walking" },
        { english: "She is eating", french: "Elle est en train de manger", action: "eating" },
        { english: "We are learning", french: "Nous sommes en train d'apprendre", action: "learning" }
      ]
    }
  },
  {
    id: 2,
    title: "Using -ing Verbs",
    content: {
      introduction: "Now let's learn how to add -ing to verbs to show actions happening now!",
      examples: [
        { base: "play", ing: "playing", example: "The children are playing", french: "Les enfants jouent" },
        { base: "run", ing: "running", example: "He is running fast", french: "Il court vite" },
        { base: "sing", ing: "singing", example: "She is singing beautifully", french: "Elle chante magnifiquement" },
        { base: "write", ing: "writing", example: "I am writing a letter", french: "J'écris une lettre" }
      ]
    }
  }
];

export default function Module7() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const lesson = LESSONS[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 sahel-plains-bg">
      {/* Niger Cultural Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#E6F3FF" />
          <g opacity="0.4">
            <circle cx="150" cy="100" r="30" fill="#4F46E5" />
            <circle cx="650" cy="150" r="25" fill="#7C3AED" />
            <circle cx="300" cy="500" r="35" fill="#3B82F6" />
            <circle cx="700" cy="450" r="20" fill="#6366F1" />
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
              Module 7: Present Continuous
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn actions happening now with -ing verbs
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="I am teaching you English!"
                screenText="MODULE 7"
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
              <CardTitle className="text-2xl text-center text-indigo-700">
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

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {lesson.content.examples.map((item: any, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-indigo-700 mb-2">
                      {item.english || `${item.base} → ${item.ing}`}
                    </h4>
                    <p className="text-sm text-purple-600 mb-1">French: {item.french}</p>
                    {item.example && <p className="text-sm text-gray-600 mb-3">"{item.example}"</p>}
                    <AudioPlayer
                      text={item.english || item.example}
                      title="Listen and repeat"
                      description="Practice pronunciation"
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Action Gallery */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                🏃‍♂️ Interactive Actions Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-xl p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    { base: "run", ing: "running", emoji: "🏃‍♂️", sentence: "I am running fast!" },
                    { base: "eat", ing: "eating", emoji: "🍽️", sentence: "She is eating dinner!" },
                    { base: "read", ing: "reading", emoji: "📚", sentence: "He is reading a book!" },
                    { base: "write", ing: "writing", emoji: "✍️", sentence: "We are writing letters!" },
                    { base: "play", ing: "playing", emoji: "⚽", sentence: "They are playing soccer!" },
                    { base: "sleep", ing: "sleeping", emoji: "😴", sentence: "The baby is sleeping!" },
                    { base: "dance", ing: "dancing", emoji: "💃", sentence: "She is dancing beautifully!" },
                    { base: "sing", ing: "singing", emoji: "🎤", sentence: "He is singing a song!" }
                  ].map((action, index) => (
                    <div 
                      key={index}
                      className="bg-indigo-100 rounded-lg p-4 cursor-pointer hover:bg-indigo-200 transition-colors hover:scale-110 transform"
                      onClick={() => bulletproofAudio.playAudio(`${action.base} becomes ${action.ing}! ${action.sentence} Can you make a sentence with ${action.ing}?`)}
                    >
                      <div className="text-6xl mb-3">{action.emoji}</div>
                      <p className="text-sm font-semibold text-indigo-700">{action.base} → {action.ing}</p>
                      <p className="text-xs text-gray-600 mt-1">{action.sentence}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Completion */}
          <Card className="bg-gradient-to-r from-indigo-100 to-purple-100 border-indigo-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">
                🎯 Fantastic Work Learning Present Continuous! 🎯
              </h3>
              <p className="text-gray-700 mb-4">
                You've mastered actions happening now! Practice more with these games:
              </p>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
                onClick={() => bulletproofAudio.playAudio("Incredible! You learned present continuous! You're getting so good at English! Keep going!")}
              >
                🌟 Click here to celebrate! 🌟
              </Button>
            </CardContent>
          </Card>

          {/* Practice Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <PracticeLink 
              title="Present Continuous Games"
              description="Practice -ing verbs with fun activities"
              url="https://www.learnenglishkids.britishcouncil.org/grammar-practice/present-continuous"
              icon="game"
              onClick={() => bulletproofAudio.playAudio("Great! Practice present continuous with this game! You will learn I am running, you are jumping, he is swimming!")}
            />
            <PracticeLink 
              title="Action Verbs Practice"
              description="Learn action words and their -ing forms"
              url="https://www.eslgamesplus.com/present-continuous-esl-interactive-fun-game-online/"
              icon="practice"
              onClick={() => bulletproofAudio.playAudio("Excellent! Practice action verbs with this game! You will learn run becomes running, jump becomes jumping!")}
            />
          </div>
          
          {/* Module Completion Button */}
          <motion.button
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
            onClick={() => bulletproofAudio.playAudio("Outstanding! You completed Module 7 about present continuous! You learned I am running, you are jumping, he is swimming, she is dancing! You can talk about actions happening right now! Amazing work!")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🏃 Complete Module 7: Present Continuous! 🏃
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
              <h4 className="text-xl font-bold text-green-700 mb-3">🏃‍♂️ Daily Actions in Niger</h4>
              <p className="text-gray-700 mb-4">
                In Niger, people are always busy with important activities! Farmers are working in the fields, 
                children are studying under trees, women are weaving beautiful fabrics, and men are building homes with clay bricks. 
                The Hausa saying "Aiki shine maganin talauci" means "work is the cure for poverty" - showing how action and effort are valued!
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h5 className="font-bold text-orange-700 mb-2">💪 Community Work</h5>
                  <p className="text-sm text-gray-700">
                    People work together building wells, harvesting crops, and helping neighbors. 
                    "We are helping each other" shows Niger's spirit of cooperation!
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-bold text-green-700 mb-2">🎯 Active Learning</h5>
                  <p className="text-sm text-gray-700">
                    Children are always learning - reading under baobab trees, 
                    practicing writing in the sand, and listening to elders' wisdom!
                  </p>
                </div>
              </div>
              
              <AudioPlayer
                text="In Niger, everyone is always doing something important! Farmers are working hard in their fields. Children are studying and learning new things. Women are creating beautiful crafts with their hands. Men are building strong homes for their families. When you learn English action words, you're describing the same busy, productive life that makes Niger communities strong!"
                frenchTranslation="Au Niger, tout le monde fait toujours quelque chose d'important!"
                hausaTranslation="A Niger, kowa yana yin wani abu mai muhimmanci!"
                title="🌍 Niger's Active Community Life"
                description="Learn about Niger's hardworking culture"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}