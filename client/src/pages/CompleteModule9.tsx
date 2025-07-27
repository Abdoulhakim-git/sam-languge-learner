import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CulturalSection } from "@/components/CulturalSection";
import { PracticeActivity } from "@/components/PracticeActivity";
import { Home, BookOpen, Clock } from "lucide-react";

const TIME_EXAMPLES = [
  { emoji: "🕐", english: "One o'clock", time: "1:00", french: "Une heure" },
  { emoji: "🕑", english: "Two o'clock", time: "2:00", french: "Deux heures" },
  { emoji: "🕒", english: "Three o'clock", time: "3:00", french: "Trois heures" },
  { emoji: "🕓", english: "Four o'clock", time: "4:00", french: "Quatre heures" },
  { emoji: "🕕", english: "Six o'clock", time: "6:00", french: "Six heures" },
  { emoji: "🕘", english: "Nine o'clock", time: "9:00", french: "Neuf heures" },
  { emoji: "🕛", english: "Twelve o'clock", time: "12:00", french: "Douze heures" },
  { emoji: "🕧", english: "Half past two", time: "2:30", french: "Deux heures et demie" }
];

const QUESTION_WORDS = [
  { emoji: "❓", english: "What", example: "What is your name?", french: "Qu'est-ce que", answer: "My name is Sam" },
  { emoji: "📍", english: "Where", example: "Where do you live?", french: "Où", answer: "I live in Niger" },
  { emoji: "⏰", english: "When", example: "When do you eat?", french: "Quand", answer: "I eat at 7 o'clock" },
  { emoji: "👤", english: "Who", example: "Who is your teacher?", french: "Qui", answer: "Sam is my teacher" },
  { emoji: "🤔", english: "Why", example: "Why do you study?", french: "Pourquoi", answer: "I study to learn" },
  { emoji: "🔧", english: "How", example: "How are you?", french: "Comment", answer: "I am fine, thank you" }
];

export default function CompleteModule9() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <button className="flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 transition-colors bg-cyan-50 px-4 py-2 rounded-lg border-2 border-cyan-200 hover:border-cyan-400">
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </button>
            </Link>
            <div className="bg-cyan-100 px-4 py-2 rounded-full">
              <span className="text-cyan-600 font-bold">Module 9 • Time & Questions</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-cyan-600 mb-2">
            Module 9: Time & Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Learn to tell time and ask important questions!
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-fredoka mb-2">Time and Question Words</h3>
                <p className="text-cyan-100 text-lg">Master telling time and asking questions!</p>
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
            <h4 className="text-2xl font-fredoka text-cyan-600 mb-6 flex items-center">
              <Clock className="w-8 h-8 mr-3" />
              Learning Time and Questions
            </h4>
            
            <AudioPlayer
              text="Hello time keepers! Today we learn two very important skills: telling time and asking questions. Time helps us organize our day, and questions help us learn about the world around us. These are essential skills for daily communication!"
              frenchTranslation="Salut gardiens du temps! Aujourd'hui nous apprenons deux compétences très importantes: dire l'heure et poser des questions. Le temps nous aide à organiser notre journée, et les questions nous aident à apprendre sur le monde qui nous entoure. Ce sont des compétences essentielles pour la communication quotidienne!"
              hausaTranslation="Sannu masu kula da lokaci! Yau muna koyon fasaha muhimmi biyu: faɗin lokaci da yin tambayoyi. Lokaci yana taimaka mana mu shirya ranarmu, kuma tambayoyi suna taimaka mana mu koyi game da duniyar da ke kewaye da mu. Waɗannan fasaha ne masu mahimmanci don sadarwa ta yau da kullun!"
              title="Teacher Sam's Time and Questions Introduction"
              description="Listen to Teacher Sam explain time and questions"
              className="mb-6"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Telling Time
                </h5>
                <div className="space-y-3">
                  {TIME_EXAMPLES.map((time, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(`It is ${time.english}! The time is ${time.time}!`);
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl">{time.emoji}</span>
                        <div>
                          <p className="font-bold">{time.english}</p>
                          <p className="text-sm text-gray-600">{time.french}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{time.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <AudioPlayer
                  text="Learning to tell time is important! One o'clock means it is 1:00. Two o'clock means 2:00. We say o'clock for exact hours. Half past two means 2:30, which is thirty minutes after two o'clock!"
                  title="Time Explanation"
                  description="Learn to tell time"
                  className="bg-blue-100 mt-4"
                />
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-purple-800 mb-4">Question Words</h5>
                <div className="space-y-3">
                  {QUESTION_WORDS.map((question, index) => (
                    <motion.div 
                      key={index}
                      className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(`${question.example} The answer is: ${question.answer}`);
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-3xl">{question.emoji}</span>
                        <div>
                          <p className="font-bold text-purple-700">{question.english}</p>
                          <p className="text-sm text-gray-600">{question.french}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">{question.example}</p>
                      <p className="text-sm italic text-green-600">{question.answer}</p>
                    </motion.div>
                  ))}
                </div>
                <AudioPlayer
                  text="Question words help us get information! What asks about things. Where asks about places. When asks about time. Who asks about people. Why asks about reasons. How asks about the way something is done!"
                  title="Question Words Explanation"
                  description="Learn question words"
                  className="bg-purple-100 mt-4"
                />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-green-800 mb-3">Time Questions</h5>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="font-bold">What time is it?</p>
                  <p className="text-sm text-gray-600">It is three o'clock</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="font-bold">When do you wake up?</p>
                  <p className="text-sm text-gray-600">I wake up at six o'clock</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="font-bold">When do you eat lunch?</p>
                  <p className="text-sm text-gray-600">I eat lunch at twelve o'clock</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="font-bold">When do you go to sleep?</p>
                  <p className="text-sm text-gray-600">I go to sleep at nine o'clock</p>
                </div>
              </div>
              <AudioPlayer
                text="We often ask questions about time! What time is it? When do you wake up? When do you eat lunch? When do you go to sleep? These questions help us understand daily schedules and routines!"
                title="Time Questions Examples"
                description="Practice asking about time"
                className="bg-green-100 mt-4"
              />
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-6">
              <h5 className="text-xl font-bold text-yellow-800 mb-3">Daily Schedule Example</h5>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-yellow-100 rounded-lg p-4 text-center">
                  <span className="text-3xl mb-2 block">🌅</span>
                  <p className="font-bold">7:00 AM</p>
                  <p className="text-sm">Wake up</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4 text-center">
                  <span className="text-3xl mb-2 block">🍽️</span>
                  <p className="font-bold">12:00 PM</p>
                  <p className="text-sm">Eat lunch</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4 text-center">
                  <span className="text-3xl mb-2 block">😴</span>
                  <p className="font-bold">9:00 PM</p>
                  <p className="text-sm">Go to sleep</p>
                </div>
              </div>
              <AudioPlayer
                text="Here is a daily schedule example! I wake up at seven o'clock in the morning. I eat lunch at twelve o'clock in the afternoon. I go to sleep at nine o'clock in the evening. This helps me organize my day!"
                title="Daily Schedule"
                description="Learn about daily routines with time"
                className="bg-yellow-100 mt-4"
              />
            </div>
          </motion.div>

          {/* Cultural Section */}
          <CulturalSection content={{
            title: "Niger Time Traditions",
            description: "In Niger, time is often connected to the sun and daily activities. People wake up with the sunrise, eat when the sun is high, and rest when the sun sets.",
            culturalElement: "Niger communities follow natural rhythms. Time is not just numbers on a clock, but connected to nature, family activities, and community events.",
            flag: "🇳🇪",
            visualExample: "☀️",
            audioText: "In Niger, time is often connected to the sun and daily activities. People wake up with the sunrise, eat when the sun is high, and rest when the sun sets. Niger communities follow natural rhythms. Time is not just numbers on a clock, but connected to nature, family activities, and community events."
          }} />

          {/* Practice Activity */}
          <PracticeActivity 
            title="Time and Questions Practice"
            description="Practice telling time and asking questions! Learn to read clocks, ask about daily activities, and understand time-related conversations."
            gameUrl="https://learnenglishkids.britishcouncil.org/games/what-time-is-it"
            icon="practice"
            difficulty="medium"
            moduleTheme="blue"
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
            <h3 className="text-3xl font-fredoka text-cyan-600 mb-4">
              Congratulations! Module 9 Complete!
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              You can now tell time and ask important questions!
            </p>
            <AudioPlayer
              text="Excellent work! You have completed Module 9! You can now tell time correctly and ask important questions to get information. These are very valuable skills for daily communication!"
              title="Module 9 Completion Celebration"
              description="Teacher Sam celebrates your achievement"
              className="mb-6"
            />
            <div className="flex justify-center space-x-4">
              <Link href="/modules">
                <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-bold hover:from-cyan-600 hover:to-cyan-700 transition-all">
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