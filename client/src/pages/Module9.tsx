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
    title: "Reading Time",
    content: {
      introduction: "Hello! I'm Teacher Sam. Today we will learn how to read clocks and tell time in English!",
      vocabulary: [
        { english: "One o'clock", french: "Une heure", example: "It is one o'clock", time: "1:00" },
        { english: "Two thirty", french: "Deux heures et demie", example: "It is two thirty", time: "2:30" },
        { english: "Quarter past three", french: "Trois heures et quart", example: "It is quarter past three", time: "3:15" },
        { english: "Half past four", french: "Quatre heures et demie", example: "It is half past four", time: "4:30" },
        { english: "Quarter to five", french: "Cinq heures moins le quart", example: "It is quarter to five", time: "4:45" },
        { english: "Six fifteen", french: "Six heures quinze", example: "It is six fifteen", time: "6:15" }
      ]
    }
  },
  {
    id: 2,
    title: "Question Words",
    content: {
      introduction: "Now let's learn question words - what, where, when - to ask about things!",
      vocabulary: [
        { english: "What", french: "Qu'est-ce que", example: "What is your name?", usage: "Asking about things" },
        { english: "Where", french: "Où", example: "Where do you live?", usage: "Asking about places" },
        { english: "When", french: "Quand", example: "When do you wake up?", usage: "Asking about time" },
        { english: "Who", french: "Qui", example: "Who is your teacher?", usage: "Asking about people" },
        { english: "Why", french: "Pourquoi", example: "Why do you study?", usage: "Asking about reasons" },
        { english: "How", french: "Comment", example: "How are you?", usage: "Asking about manner" }
      ]
    }
  }
];

export default function Module9() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const lesson = LESSONS[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 acacia-reflection-bg">
      {/* Niger Cultural Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#F0FDFF" />
          <g opacity="0.4">
            <circle cx="200" cy="150" r="40" fill="#0891B2" />
            <rect x="400" y="200" width="60" height="60" fill="#0E7490" />
            <circle cx="600" cy="350" r="35" fill="#155E75" />
            <rect x="100" y="450" width="50" height="80" fill="#164E63" />
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
              Module 9: Time & Questions
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn to read clocks and ask questions
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="What time is it?"
                screenText="MODULE 9"
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
              <CardTitle className="text-2xl text-center text-teal-700">
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
                {lesson.content.vocabulary.map((item: any, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-teal-700 mb-2">{item.english}</h4>
                    <p className="text-sm text-purple-600 mb-1">French: {item.french}</p>
                    {item.time && <p className="text-sm text-blue-600 mb-1">Time: {item.time}</p>}
                    {item.usage && <p className="text-sm text-gray-600 mb-2">Usage: {item.usage}</p>}
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

          {/* Interactive Clock Gallery */}
          {currentLesson === 0 && (
            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700">
                  🕐 Interactive Clock Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { time: "3:00", display: "🕒", word: "Three o'clock", example: "It is three o'clock!" },
                      { time: "6:30", display: "🕕", word: "Half past six", example: "It is half past six!" },
                      { time: "9:15", display: "🕘", word: "Quarter past nine", example: "It is quarter past nine!" },
                      { time: "12:45", display: "🕛", word: "Quarter to one", example: "It is quarter to one!" },
                      { time: "2:00", display: "🕑", word: "Two o'clock", example: "It is two o'clock!" },
                      { time: "4:30", display: "🕓", word: "Half past four", example: "It is half past four!" },
                      { time: "7:15", display: "🕖", word: "Quarter past seven", example: "It is quarter past seven!" },
                      { time: "10:45", display: "🕙", word: "Quarter to eleven", example: "It is quarter to eleven!" }
                    ].map((clock, index) => (
                      <div 
                        key={index}
                        className="bg-teal-100 rounded-lg p-4 cursor-pointer hover:bg-teal-200 transition-colors hover:scale-110 transform"
                        onClick={() => bulletproofAudio.playAudio(`${clock.word}! ${clock.example} What time is it? ${clock.word}!`)}
                      >
                        <div className="text-6xl mb-3">{clock.display}</div>
                        <p className="text-sm font-semibold text-teal-700">{clock.time}</p>
                        <p className="text-xs text-gray-600 mt-1">{clock.word}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interactive Questions Gallery */}
          {currentLesson === 1 && (
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  ❓ Interactive Questions Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    {[
                      { word: "What", emoji: "❓", example: "What is your name?", answer: "My name is Sam!" },
                      { word: "Where", emoji: "📍", example: "Where do you live?", answer: "I live in Niger!" },
                      { word: "When", emoji: "⏰", example: "When do you study?", answer: "I study in the morning!" },
                      { word: "Who", emoji: "👤", example: "Who is your teacher?", answer: "Teacher Sam is my teacher!" },
                      { word: "Why", emoji: "🤔", example: "Why do you learn English?", answer: "Because it is fun!" },
                      { word: "How", emoji: "🛣️", example: "How are you today?", answer: "I am very good!" }
                    ].map((question, index) => (
                      <div 
                        key={index}
                        className="bg-blue-100 rounded-lg p-4 cursor-pointer hover:bg-blue-200 transition-colors hover:scale-105 transform"
                        onClick={() => bulletproofAudio.playAudio(`${question.word}! ${question.example} ${question.answer} Can you ask a ${question.word} question?`)}
                      >
                        <div className="text-6xl mb-3">{question.emoji}</div>
                        <p className="text-lg font-semibold text-blue-700">{question.word}</p>
                        <p className="text-sm text-gray-600 mt-2">{question.example}</p>
                        <p className="text-xs text-green-600 mt-1">{question.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lesson Completion */}
          <Card className="bg-gradient-to-r from-teal-100 to-cyan-100 border-teal-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-teal-700 mb-4">
                🎯 Excellent Work Learning {lesson.title}! 🎯
              </h3>
              <p className="text-gray-700 mb-4">
                You've mastered time and questions! Practice more with these games:
              </p>
              <Button 
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
                onClick={() => bulletproofAudio.playAudio("Fantastic! You learned about time and questions! You can ask anything now! Brilliant work!")}
              >
                🕐 Click here to celebrate! 🕐
              </Button>
            </CardContent>
          </Card>

          {/* Practice Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <PracticeLink 
              title="Telling Time Games"
              description="Practice reading clocks and telling time"
              url="https://www.learnenglishkids.britishcouncil.org/word-games/telling-the-time"
              icon="game"
              onClick={() => bulletproofAudio.playAudio("Great! Practice telling time with this game! You will learn one o'clock, two o'clock, half past three, quarter past four!")}
            />
            <PracticeLink 
              title="Question Words Practice"
              description="Learn to ask what, where, when, who, why, how"
              url="https://www.eslgamesplus.com/wh-questions-esl-interactive-fun-game-online/"
              icon="practice"
              onClick={() => bulletproofAudio.playAudio("Excellent! Practice question words with this game! You will learn what, where, when, who, why, how to ask great questions!")}
            />
          </div>
          
          {/* Module Completion Button */}
          <motion.button
            className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
            onClick={() => bulletproofAudio.playAudio("Fantastic! You completed Module 9 about time and questions! You learned one o'clock, two o'clock, half past, quarter past! You know what, where, when, who, why, how! You can ask and answer questions and tell time! Excellent progress!")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ⏰ Complete Module 9: Time & Questions! ⏰
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
              <h4 className="text-xl font-bold text-green-700 mb-3">🕐 Time & Questions in Niger Culture</h4>
              <p className="text-gray-700 mb-4">
                In Niger, time follows natural rhythms! People wake up with the sun and rest when it sets. 
                Market time is when people gather to trade and share news. Prayer times mark important moments of the day. 
                Children learn by asking respectful questions like "Where is the well?" and "When do we harvest?" 
                This curiosity helps preserve traditional knowledge!
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h5 className="font-bold text-orange-700 mb-2">☀️ Natural Time</h5>
                  <p className="text-sm text-gray-700">
                    "Sunrise, midday, sunset" - Niger people follow the sun's rhythm. 
                    "Prayer time, market time, harvest time" organize daily life!
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-bold text-green-700 mb-2">❓ Learning Questions</h5>
                  <p className="text-sm text-gray-700">
                    "Where do we find water? When do crops grow? Who teaches traditions?" 
                    Questions help children learn survival and cultural wisdom!
                  </p>
                </div>
              </div>
              
              <AudioPlayer
                text="In Niger, time flows with nature's rhythm! People wake up when the sun rises and sleep when stars appear. Children learn by asking important questions: Where is the best water? When should we plant crops? Who knows the old stories? When you learn English time and question words, you're connecting with the same curiosity that helps Niger children understand their world!"
                frenchTranslation="Au Niger, le temps suit le rythme de la nature!"
                hausaTranslation="A Niger, lokaci yana bin salon dabi'a!"
                title="🌍 Niger's Natural Rhythms"
                description="Learn about time and curiosity in Niger culture"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}