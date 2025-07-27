import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PracticeLink, MODULE_PRACTICE_LINKS } from "@/components/PracticeLink";
import { bulletproofAudioSystem as bulletproofAudio } from "@/lib/bulletproofAudioSystem";

import { Home, ArrowRight, BookOpen, MessageCircle } from "lucide-react";
import { Module } from "@/types";

const GREETINGS = [
  { greeting: "Hello!", usage: "General greeting", example: "Hello! How are you today? I'm doing well, thank you!" },
  { greeting: "Hi!", usage: "Informal greeting", example: "Hi! Nice to see you! Nice to see you too!" },
  { greeting: "Good morning!", usage: "Early part of the day", example: "Good morning! How did you sleep? I slept very well, thank you!" },
  { greeting: "Good afternoon!", usage: "After 12:00 PM until 5 PM", example: "Good afternoon! How is your day going? My day is going great!" },
  { greeting: "Good evening!", usage: "Evening or night", example: "Good evening! How was your day? My day was really good!" },
  { greeting: "Good night!", usage: "When going to bed or leaving at night", example: "Good night! Sleep well! Thank you, good night to you too!" }
];

const GREETING_QUESTIONS = [
  { question: "How are you?", usage: "General, polite", response: "I'm fine, thank you. And you?" },
  { question: "How do you do?", usage: "Very formal, business", response: "How do you do?" },
  { question: "How's it going?", usage: "Informal, casual", response: "It's going great! How about you?" },
  { question: "How have you been?", usage: "After some time apart", response: "I've been good, thanks! And you?" },
  { question: "How are you doing?", usage: "Flexible, both formal/informal", response: "I'm doing well, thank you!" }
];

export default function Module2() {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [robotGesture, setRobotGesture] = useState<any>(null);
  // Audio handled by reliable audio service

  const { data: moduleData, isLoading } = useQuery<Module>({
    queryKey: ["/api/content/2"],
  });

  useEffect(() => {
    // Module ready - all audio will be handled by AudioPlayer components
    console.log('Module2 render state:', {
      isLoading,
      moduleData: !!moduleData,
      currentLesson,
      hasContent: !!moduleData?.lessons,
      currentLessonData: !!moduleData?.lessons?.[currentLesson - 1]
    });
  }, [moduleData, isLoading, currentLesson]);

  const handleGreetingPractice = async (greeting: string) => {
    console.log('Greeting clicked:', greeting);
    // Play the greeting audio
    bulletproofAudio.playAudio(greeting);
    console.log('Playing greeting:', greeting);
    setRobotGesture({ type: 'wave', duration: 3000 });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-american-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Module 2...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 niger-village-bg" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}>
      {/* Module Header */}
      <motion.div 
        className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <Link href="/">
            <motion.button 
              className="flex items-center space-x-2 text-american-blue hover:text-blue-700 transition-colors"
              whileHover={{ x: -5 }}
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </motion.button>
          </Link>
          <div className="bg-green-100 px-4 py-2 rounded-full">
            <span className="text-green-700 font-bold">
              Module 2 Progress: {currentLesson === 1 ? '50%' : '100%'}
            </span>
          </div>
        </div>
        
        <h2 className="text-3xl font-fredoka text-success-green mb-2">
          Module 2: Greetings & Introductions
        </h2>
        <p className="text-gray-600">
          Learn how to greet people and introduce yourself in English!
        </p>
      </motion.div>

      {/* Sam's Teaching Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Robot Sam Teaching */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ pointerEvents: 'auto', zIndex: 10 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4" style={{ pointerEvents: 'auto' }}>
            <div className="text-center mb-4">
              <RobotSam
                isTeaching={true}
                gesture={robotGesture}
                screenText={currentLesson === 1 ? "HELLO!" : "MY NAME IS..."}
                size="medium"
              />
            </div>
            
            {/* Current Audio Control */}
            <AudioPlayer
              text="Hello! I'm Teacher Sam. In this lesson, we are going to learn how to greet people in English. Do you know how to say hello in different ways? No worries — I'll show you!"
              frenchTranslation="Bonjour! Je suis le Professeur Sam. Dans cette leçon, nous allons apprendre à saluer les gens en anglais."
              title="Now Playing: Greetings Introduction"
              description="Sam's lesson introduction"
              onPlay={() => setRobotGesture({ type: 'wave', duration: 5000 })}
            />
          </div>
        </motion.div>
        
        {/* Lesson Content Area */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ pointerEvents: 'auto', zIndex: 10 }}
        >
          <div className="space-y-6">
            
            {/* Lesson Tabs */}
            <div className="bg-white rounded-xl shadow-lg p-4" style={{ pointerEvents: 'auto', zIndex: 20 }}>
              <div className="flex space-x-4">
                <motion.button
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentLesson === 1 
                      ? 'bg-success-green text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setCurrentLesson(1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Part 1: Greetings
                </motion.button>
                <motion.button
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentLesson === 2 
                      ? 'bg-success-green text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setCurrentLesson(2)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Part 2: Introductions
                </motion.button>
              </div>
            </div>

            {currentLesson === 1 && (
              <motion.div
                key="greetings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Part 1: Common Greetings */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6" style={{ pointerEvents: 'auto', zIndex: 30 }}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-success-green text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <h3 className="text-2xl font-fredoka text-gray-800">Common Greetings</h3>
                  </div>
                  
                  {/* Lesson Text Display */}
                  <div className="bg-green-50 rounded-xl p-6 mb-6">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      <strong>"Greeting people is very important because it helps start conversations. The way we greet others can change depending on the time of day and whether it's a formal or informal setting."</strong>
                    </p>
                    <AudioPlayer
                      text="Greeting people is very important because it helps start conversations. The way we greet others can change depending on the time of day and whether it's a formal or informal setting. Let me show you formal and informal greetings!"
                      frenchTranslation="Saluer les gens est très important car cela aide à commencer des conversations."
                      title="🔊 Greeting Explanation"
                      description="Learn about formal and informal greetings"
                      className="mb-4"
                      onPlay={() => setRobotGesture({ type: 'nod', duration: 4000 })}
                    />
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Formal:</strong> "Good morning, Mr. Smith."</p>
                      </div>
                      <div>
                        <p><strong>Informal:</strong> "Hi, how's it going?"</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Greetings Grid */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {GREETINGS.map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition-colors cursor-pointer"
                        onClick={() => handleGreetingPractice(item.example)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-6xl">
                            {item.greeting.includes("Hello") && "👋"}
                            {item.greeting.includes("Hi") && "😊"}
                            {item.greeting.includes("Good morning") && "🌅"}
                            {item.greeting.includes("Good afternoon") && "☀️"}
                            {item.greeting.includes("Good evening") && "🌆"}
                            {item.greeting.includes("Good night") && "🌙"}
                          </div>
                          <div>
                            <h5 className="font-bold text-success-green text-lg mb-1">{item.greeting}</h5>
                            <p className="text-sm text-gray-600 mb-2">{item.usage}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-800 italic">"{item.example}"</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Greeting Questions */}
                  <div className="bg-yellow-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 mb-4">Questions for Greeting & Responses</h4>
                    <AudioPlayer
                      text="Now let's learn about greeting questions and how to respond to them! When someone asks how you are, you should give a polite response. These questions help people connect and show they care about each other."
                      frenchTranslation="Maintenant apprenons les questions de salutation et comment y répondre!"
                      title="🔊 Greeting Questions Explanation"
                      description="Learn about greeting questions and responses"
                      className="mb-4"
                      onPlay={() => setRobotGesture({ type: 'point', duration: 4000 })}
                    />
                    <div className="space-y-3">
                      {GREETING_QUESTIONS.map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => handleGreetingPractice(`${item.question} ${item.response}`)}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="grid md:grid-cols-3 gap-2 text-sm">
                            <div>
                              <strong className="text-success-green">{item.question}</strong>
                            </div>
                            <div className="text-gray-600">{item.usage}</div>
                            <div className="text-gray-800 italic">"{item.response}"</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Practice Link for Greetings */}
                  <PracticeLink 
                    title={MODULE_PRACTICE_LINKS[2].greetings.title}
                    description={MODULE_PRACTICE_LINKS[2].greetings.description}
                    url={MODULE_PRACTICE_LINKS[2].greetings.url}
                    icon="game"
                    className="mt-6"
                    onClick={() => {
                      setRobotGesture({ type: 'wave', duration: 5000 });
                      bulletproofAudio.playAudio("Great job learning greetings! Now you can say hello to people in English!");
                    }}
                  />
                  
                  {/* Part 1 Completion Button */}
                  <motion.button
                    className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
                    onClick={() => {
                      setRobotGesture({ type: 'celebrate', duration: 6000 });
                      bulletproofAudio.playAudio("Fantastic! You completed Part 1 about greetings! You're learning English so well!");
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🎉 Complete Part 1: Greetings! 🎉
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentLesson === 2 && (
              <motion.div
                key="introductions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Part 2: Introductions */}
                <div className="bg-white rounded-2xl shadow-xl p-8" style={{ pointerEvents: 'auto', zIndex: 30 }}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-success-green text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <h3 className="text-2xl font-fredoka text-gray-800">Introductions</h3>
                  </div>
                  
                  {/* Introduction Basics */}
                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">Introducing Yourself:</h4>
                    <AudioPlayer
                      text="Now let's learn how to introduce yourself! There are different ways to tell someone your name. You can say My name is Sam, or simply I'm Sam. When you want to know someone else's name, you ask What's your name? Let's practice these together!"
                      frenchTranslation="Maintenant apprenons comment nous présenter!"
                      title="🔊 Introduction Basics"
                      description="Learn how to introduce yourself"
                      className="mb-4"
                      onPlay={() => setRobotGesture({ type: 'wave', duration: 5000 })}
                    />
                    <div className="space-y-2 text-gray-700">
                      <p>• <strong>My name is [Your Name].</strong> Example: "My name is Sam."</p>
                      <p>• <strong>I'm [Your Name].</strong> Example: "I'm Sam."</p>
                      <p>• <strong>What's your name?</strong> Asking someone for their name.</p>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-purple-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-gray-800 mb-4">Personal Information</h4>
                    <AudioPlayer
                      text="Now let's learn how to share personal information! When people ask about your age, you say I am 10 years old or simply I'm 10. Remember, we say I am, not I have! You can also tell people where you live and where you're from. This helps people get to know you better!"
                      frenchTranslation="Maintenant apprenons à partager des informations personnelles!"
                      title="🔊 Personal Information Guide"
                      description="Learn to talk about age, location, and status"
                      className="mb-6"
                      onPlay={() => setRobotGesture({ type: 'point', duration: 6000 })}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-6xl">🎂</div>
                        <h5 className="font-bold text-success-green text-lg">Talking About Age</h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><strong>Question:</strong> "How old are you?" 🤔</p>
                        <p><strong>Correct:</strong> "I am 10 years old." or "I'm 10." ✅</p>
                        <p className="text-red-600"><strong>Incorrect:</strong> "I have 10 years old." ❌</p>
                        <motion.button
                          className="mt-2 bg-success-green text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                          onClick={() => handleGreetingPractice("How old are you? I am 10 years old.")}
                          whileHover={{ scale: 1.05 }}
                        >
                          🔊 Practice
                        </motion.button>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-6xl">🏠</div>
                        <h5 className="font-bold text-niger-gold text-lg">Origin & Residence</h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><strong>Where do you live?</strong> "I live in Maradi." 🏘️</p>
                        <p><strong>Where are you from?</strong> "I am from Niger." 🇳🇪</p>
                        <p><strong>Student Status:</strong> "I am a student." 📚</p>
                        <motion.button
                          className="mt-2 bg-niger-gold text-white px-3 py-1 rounded text-xs hover:bg-orange-600"
                          onClick={() => handleGreetingPractice("Where do you live? I live in Maradi. Where are you from? I am from Niger. What do you do? I am a student.")}
                          whileHover={{ scale: 1.05 }}
                        >
                          🔊 Practice
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Practice Dialogue */}
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 mb-4">Practice Dialogue</h4>
                    <AudioPlayer
                      text="Let's practice a complete introduction dialogue! This conversation shows how two people meet and introduce themselves. Listen carefully to how they ask questions and give answers. You'll hear names, ages, and where people are from. This is exactly how you can introduce yourself to new friends!"
                      frenchTranslation="Pratiquons un dialogue d'introduction complet!"
                      title="🔊 Dialogue Explanation"
                      description="Learn through complete conversation"
                      className="mb-4"
                      onPlay={() => setRobotGesture({ type: 'nod', duration: 5000 })}
                    />
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-american-blue">A:</div>
                        <div className="col-span-11">Hi! What's your name?</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-success-green">B:</div>
                        <div className="col-span-11">Hi! My name is Zainab.</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-american-blue">A:</div>
                        <div className="col-span-11">Nice to meet you, Zainab! How old are you?</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-success-green">B:</div>
                        <div className="col-span-11">I am 9 years old.</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-american-blue">A:</div>
                        <div className="col-span-11">Where do you live?</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-success-green">B:</div>
                        <div className="col-span-11">I live in Maradi.</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-american-blue">A:</div>
                        <div className="col-span-11">And where are you from?</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-success-green">B:</div>
                        <div className="col-span-11">I am from Niger.</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-american-blue">A:</div>
                        <div className="col-span-11">Are you a student?</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-success-green">B:</div>
                        <div className="col-span-11">Yes, I am a student.</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-american-blue">A:</div>
                        <div className="col-span-11">Great! Nice to meet you, Zainab!</div>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1 font-bold text-success-green">B:</div>
                        <div className="col-span-11">Nice to meet you too!</div>
                      </div>
                    </div>
                    
                    <motion.button
                      className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full"
                      onClick={() => {
                        setRobotGesture({ type: 'talk', duration: 15000 });
                        bulletproofAudio.playAudio("Hi! What's your name? Hi! My name is Zainab. Nice to meet you, Zainab! How old are you? I am 9 years old. Where do you live? I live in Maradi. And where are you from? I am from Niger. Are you a student? Yes, I am a student. Great! Nice to meet you, Zainab! Nice to meet you too!");
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🔊 Listen to Complete Dialogue
                    </motion.button>

                  </div>
                  
                  {/* Additional Practice Link for Introductions */}
                  <PracticeLink 
                    title="🗣️ Introduction Practice Game"
                    description="Practice introducing yourself with interactive conversations"
                    url="https://www.englishclub.com/kids/introductions.htm"
                    icon="practice"
                    className="mt-6"
                    onClick={() => {
                      setRobotGesture({ type: 'wave', duration: 5000 });
                      bulletproofAudio.playAudio("Great work practicing introductions! You're learning so well!");
                    }}
                  />
                  
                  {/* Part 2 Completion Button */}
                  <motion.button
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
                    onClick={() => {
                      setRobotGesture({ type: 'celebrate', duration: 8000 });
                      bulletproofAudio.playAudio("Excellent! You completed Part 2 about introductions! You now know how to introduce yourself in English. You're doing amazing!");
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🏆 Complete Part 2: Introductions! 🏆
                  </motion.button>
                </div>
              </motion.div>
            )}
            
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
                <h4 className="text-xl font-bold text-green-700 mb-3">🤝 Greetings in Niger</h4>
                <p className="text-gray-700 mb-4">
                  In Niger, greetings are very important and show respect! The Hausa greeting "Sannu" means peace, 
                  while Zarma speakers say "Fofo". Traditional greetings include asking about family, health, and work. 
                  Young people show respect by greeting elders first, just like you're learning polite English greetings!
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-bold text-orange-700 mb-2">🌅 Traditional Greetings</h5>
                    <p className="text-sm text-gray-700">
                      "Sannu da zuwa" (Welcome) in Hausa
                      "Fofo" (Hello) in Zarma
                      These greetings show respect and friendship!
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-bold text-green-700 mb-2">👥 Community Values</h5>
                    <p className="text-sm text-gray-700">
                      Niger culture emphasizes community and respect for others. 
                      Learning English greetings helps you connect globally while honoring local traditions!
                    </p>
                  </div>
                </div>
                
                <AudioPlayer
                  text="In Niger, greetings are a beautiful tradition! When you say 'Sannu' in Hausa or 'Fofo' in Zarma, you're showing respect and friendship. Now you're learning English greetings like 'Hello' and 'Good morning' to connect with people around the world! You're building bridges between Niger culture and global communication!"
                  frenchTranslation="Au Niger, les salutations sont une belle tradition!"
                  hausaTranslation="A Niger, gaisuwa kyakkyawan al'ada ce!"
                  title="🌍 Niger's Greeting Traditions"
                  description="Learn about Niger's beautiful greeting customs"
                  className="w-full"
                />
              </div>
            </motion.div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Link href="/">
                <motion.button 
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-5 h-5" />
                  <span>Back to Home</span>
                </motion.button>
              </Link>
              
              {currentLesson === 1 && (
                <motion.button
                  className="bg-success-green hover:bg-green-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2"
                  onClick={() => setCurrentLesson(2)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Next: Introductions</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
              
              {currentLesson === 2 && (
                <Link href="/module/3">
                  <motion.button
                    className="bg-success-green hover:bg-green-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Next: Module 3</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
