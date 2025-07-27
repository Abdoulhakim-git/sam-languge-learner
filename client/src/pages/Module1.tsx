import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { AlphabetGrid } from "@/components/AlphabetGrid";
import { NumbersGrid } from "@/components/NumbersGrid";
import { VisualExamples, ALPHABET_EXAMPLES, NUMBERS_EXAMPLES } from "@/components/VisualExamples";
import { PracticeLink, MODULE_PRACTICE_LINKS } from "@/components/PracticeLink";
import { TestButton } from "@/components/TestButton";
import { bulletproofAudioSystem as bulletproofAudio } from "@/lib/bulletproofAudioSystem";
import { strictEnglishAudio } from "@/lib/strictEnglishAudio";

import { Home, ArrowRight, BookOpen } from "lucide-react";
import { Module } from "@/types";

export default function Module1() {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [robotGesture, setRobotGesture] = useState<any>(null);
  // Audio preloading for enhanced performance

  const { data: moduleData, isLoading } = useQuery<Module>({
    queryKey: ["/api/content/1"],
  });

  useEffect(() => {
    // Module ready - all audio will be handled by AudioPlayer components
    console.log('Module1 render state:', {
      isLoading,
      moduleData: !!moduleData,
      currentLesson,
      hasContent: !!moduleData?.lessons,
      currentLessonData: !!moduleData?.lessons?.[currentLesson - 1]
    });
  }, [moduleData, isLoading, currentLesson]);

  const handleLetterClick = (letter: string) => {
    console.log('Module1: Letter clicked from parent:', letter);
    setRobotGesture({ type: 'point', duration: 1000 });
  };

  const handleNumberClick = (number: number) => {
    console.log('Module1: Number clicked from parent:', number);
    setRobotGesture({ type: 'wave', duration: 1500 });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-american-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Module 1...</p>
        </div>
      </div>
    );
  }

  const currentLessonData = moduleData?.lessons.find(l => l.id === currentLesson);
  
  // Debug logging for module state
  console.log('Module1 render state:', {
    isLoading,
    moduleData: !!moduleData,
    currentLesson,
    hasContent: !!moduleData?.lessons?.length,
    currentLessonData: !!currentLessonData
  });

  return (
    <div className="container mx-auto px-4 py-8" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}>
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
              className="flex items-center space-x-2 text-american-blue hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-lg border-2 border-blue-200 hover:border-blue-400"
              whileHover={{ x: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log('Home button clicked');
                window.location.href = '/';
              }}
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </motion.button>
          </Link>
          <div className="bg-blue-100 px-4 py-2 rounded-full">
            <span className="text-american-blue font-bold">
              Module 1 Progress: {currentLesson === 1 ? '50%' : '100%'}
            </span>
          </div>
        </div>
        
        <h2 className="text-3xl font-fredoka text-american-blue mb-2">
          Module 1: Alphabet & Numbers
        </h2>
        <p className="text-gray-600">
          Learn the English alphabet and count from 1 to 20 with Teacher Sam!
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
                screenText={currentLesson === 1 ? "ABC" : "123"}
                size="medium"
              />
            </div>
            


            {/* Current Audio Control */}
            <AudioPlayer
              text={currentLessonData?.content.introduction || ""}
              frenchTranslation={currentLesson === 1 ? 
                "Bonjour! Je suis le Professeur Sam. Dans cette leçon, nous apprendrons l'alphabet anglais." :
                "Bonjour encore! Je suis le Professeur Sam. Aujourd'hui, nous apprendrons à compter de 1 à 20 en anglais!"
              }
              title={`Now Playing: ${currentLessonData?.title}`}
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
                      ? 'bg-american-blue text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setCurrentLesson(1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Part 1: Alphabet
                </motion.button>
                <motion.button
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentLesson === 2 
                      ? 'bg-niger-gold text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setCurrentLesson(2)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Part 2: Numbers
                </motion.button>
              </div>
            </div>

            {currentLesson === 1 && (
              <motion.div
                key="alphabet"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Part 1: The English Alphabet */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6" style={{ pointerEvents: 'auto', zIndex: 30 }}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-american-blue text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <h3 className="text-2xl font-fredoka text-gray-800">The English Alphabet</h3>
                    <AudioPlayer
                      text="The English alphabet has 26 amazing letters! Let me spell them all for you with excitement! Are you ready? Here we go: A! B! C! D! E! F! G! H! I! J! K! L! M! N! O! P! Q! R! S! T! U! V! W! X! Y! Z! Wow, that was fantastic! You did such a great job listening!"
                      frenchTranslation="L'alphabet anglais a 26 lettres magnifiques! Permettez-moi de les épeler toutes pour vous avec enthousiasme!"
                      title="🔊 Complete Alphabet"
                      className="ml-auto bg-green-100 text-green-700"
                      onPlay={() => setRobotGesture({ type: 'wave', duration: 10000 })}
                    />
                  </div>
                  
                  {/* Lesson Text Display */}
                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      <strong>"{currentLessonData?.content.introduction}"</strong>
                    </p>
                    <AudioPlayer
                      text={currentLessonData?.content.introduction || "Welcome to learning the English alphabet! This is the foundation of reading and writing in English."}
                      frenchTranslation="Bienvenue dans l'apprentissage de l'alphabet anglais!"
                      title="🔊 Introduction"
                      description="Learn about the alphabet"
                      className="mb-4"
                      onPlay={() => setRobotGesture({ type: 'nod', duration: 4000 })}
                    />
                    <p className="text-gray-700 mb-4">
                      "There are 26 letters, vowels and consonants such as: <strong>ABCDEFGHIJKLMNOPQRSTUVWXYZ</strong>"
                    </p>
                    <AudioPlayer
                      text="There are 26 letters in the English alphabet! We have vowels and consonants. The vowels are A, E, I, O, U! The consonants are all the other letters! Let's learn them all together!"
                      frenchTranslation="Il y a 26 lettres dans l'alphabet anglais!"
                      title="🔊 Alphabet Structure"
                      description="Learn about vowels and consonants"
                      className="w-full"
                      onPlay={() => setRobotGesture({ type: 'point', duration: 5000 })}
                    />
                  </div>
                  
                  {/* Vowels Section */}
                  <div className="bg-red-50 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-red-700 mb-4">🅰️ The 5 Vowels</h4>
                    <p className="text-gray-800 mb-4">
                      <strong>The vowels are: A, E, I, O, U</strong>
                    </p>
                    <div className="flex justify-center space-x-4 mb-4">
                      {['A', 'E', 'I', 'O', 'U'].map((vowel, index) => (
                        <div key={index} className="bg-red-100 rounded-lg p-3 text-center">
                          <div className="text-3xl font-bold text-red-700">{vowel}</div>
                        </div>
                      ))}
                    </div>
                    <AudioPlayer
                      text="The vowels are very special letters! They are A, E, I, O, U! Let's say them together: A! E! I! O! U! These letters make special sounds in words. Every word needs at least one vowel!"
                      frenchTranslation="Les voyelles sont des lettres très spéciales!"
                      title="🔊 Learn the Vowels"
                      description="A, E, I, O, U"
                      className="w-full"
                      onPlay={() => setRobotGesture({ type: 'point', duration: 6000 })}
                    />
                  </div>
                  
                  {/* Consonants Section */}
                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-blue-700 mb-4">🔤 The 21 Consonants</h4>
                    <p className="text-gray-800 mb-4">
                      <strong>The consonants are all the other letters: B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z</strong>
                    </p>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'].map((consonant, index) => (
                        <div key={index} className="bg-blue-100 rounded-lg p-2 text-center">
                          <div className="text-lg font-bold text-blue-700">{consonant}</div>
                        </div>
                      ))}
                    </div>
                    <AudioPlayer
                      text="The consonants are all the other letters! They are B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z! That's 21 consonants! They work together with vowels to make words!"
                      frenchTranslation="Les consonnes sont toutes les autres lettres!"
                      title="🔊 Learn the Consonants"
                      description="21 consonant letters"
                      className="w-full"
                      onPlay={() => setRobotGesture({ type: 'wave', duration: 8000 })}
                    />
                  </div>
                  
                  {/* Special Letter Y Section */}
                  <div className="bg-yellow-50 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-yellow-700 mb-4">⭐ Special Letter Y</h4>
                    <p className="text-gray-800 mb-4">
                      <strong>The letter Y is special! Sometimes it acts like a vowel, and sometimes it acts like a consonant!</strong>
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-yellow-100 rounded-lg p-3">
                        <div className="text-lg font-bold text-yellow-700 mb-2">Y as a Vowel:</div>
                        <p className="text-sm">In words like "happy" and "my"</p>
                      </div>
                      <div className="bg-yellow-100 rounded-lg p-3">
                        <div className="text-lg font-bold text-yellow-700 mb-2">Y as a Consonant:</div>
                        <p className="text-sm">In words like "yes" and "yellow"</p>
                      </div>
                    </div>
                    <AudioPlayer
                      text="The letter Y is very special! Sometimes Y acts like a vowel, like in the words happy and my. Sometimes Y acts like a consonant, like in the words yes and yellow. Y is a magical letter that can do both jobs!"
                      frenchTranslation="La lettre Y est très spéciale!"
                      title="🔊 Special Letter Y"
                      description="Y can be vowel or consonant"
                      className="w-full"
                      onPlay={() => setRobotGesture({ type: 'nod', duration: 6000 })}
                    />
                  </div>
                  
                  <AlphabetGrid onLetterClick={handleLetterClick} />
                  
                  {/* Comprehensive Visual Examples for ALL Letters A-Z */}
                  <VisualExamples 
                    examples={ALPHABET_EXAMPLES} 
                    title="🔤 Complete Alphabet with Examples (A-Z)"
                    gridCols={4}
                    onExampleClick={(example) => {
                      setRobotGesture({ type: 'point', duration: 3000 });
                      console.log('Letter clicked:', example);
                    }}
                  />
                  
                  {/* Practice Link for Alphabet */}
                  <PracticeLink 
                    title={MODULE_PRACTICE_LINKS[1].alphabet.title}
                    description={MODULE_PRACTICE_LINKS[1].alphabet.description}
                    url={MODULE_PRACTICE_LINKS[1].alphabet.url}
                    icon="game"
                    className="mt-6"
                    onClick={() => {
                      setRobotGesture({ type: 'wave', duration: 5000 });
                      bulletproofAudio.playAudio("Great job learning the alphabet! You know all 26 letters now!");
                    }}
                  />
                  
                  {/* Part 1 Completion Button */}
                  <motion.button
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
                    onClick={() => {
                      setRobotGesture({ type: 'celebrate', duration: 6000 });
                      bulletproofAudio.playAudio("Fantastic! You completed Part 1 about the alphabet! You're learning English so well!");
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🎉 Complete Part 1: Alphabet! 🎉
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentLesson === 2 && (
              <motion.div
                key="numbers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Part 2: Numbers 1-20 */}
                <div className="bg-white rounded-2xl shadow-xl p-8" style={{ pointerEvents: 'auto', zIndex: 30 }}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-niger-gold text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <h3 className="text-2xl font-fredoka text-gray-800">Numbers 1–20</h3>
                    <AudioPlayer
                      text="Now let's count from one to twenty: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty"
                      frenchTranslation="Maintenant comptons de un à vingt en anglais."
                      hausaTranslation="🇳🇪 Yanzu mu ƙidaya daga ɗaya zuwa ashirin da Turanci."
                      title="🔊 Count to 20"
                      className="ml-auto bg-green-100 text-green-700"
                      onPlay={() => setRobotGesture({ type: 'nod', duration: 8000 })}
                    />
                  </div>
                  
                  {/* Lesson Text Display */}
                  <div className="bg-orange-50 rounded-xl p-6 mb-6">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      <strong>"Hello again! I'm Teacher Sam. Today, we will learn to count from 1 to 20 in English! Can you count already? If not, no problem! Let me teach you."</strong>
                    </p>
                    <AudioPlayer
                      text="Hello again! I'm Teacher Sam. Today, we will learn to count from 1 to 20 in English! Can you count already? If not, no problem! Let me teach you. Numbers are everywhere around us! We use them to count things, tell time, and so much more!"
                      frenchTranslation="Bonjour encore! Je suis Professeur Sam. Aujourd'hui, nous allons apprendre à compter de 1 à 20 en anglais!"
                      hausaTranslation="🇳🇪 Sannu kuma! Ni Malam Sam. Yau za mu koyi ƙidaya da Turanci!"
                      title="🔊 Numbers Introduction"
                      description="Learn about counting in English"
                      className="w-full"
                      onPlay={() => setRobotGesture({ type: 'wave', duration: 5000 })}
                    />
                  </div>
                  
                  <NumbersGrid onNumberClick={handleNumberClick} />
                  
                  {/* Comprehensive Visual Examples for ALL Numbers 1-20 */}
                  <VisualExamples 
                    examples={NUMBERS_EXAMPLES} 
                    title="🔢 Complete Numbers with Examples (1-20)"
                    gridCols={10}
                    onExampleClick={(example) => {
                      setRobotGesture({ type: 'point', duration: 3000 });
                      console.log('Number clicked:', example);
                    }}
                  />
                  
                  {/* Practice Link for Numbers */}
                  <PracticeLink 
                    title={MODULE_PRACTICE_LINKS[1].numbers.title}
                    description={MODULE_PRACTICE_LINKS[1].numbers.description}
                    url={MODULE_PRACTICE_LINKS[1].numbers.url}
                    icon="game"
                    className="mt-6"
                    onClick={() => {
                      setRobotGesture({ type: 'wave', duration: 5000 });
                      strictEnglishAudio.speak("Great job counting! You now know numbers 1 to 20 in English! Keep practicing to become a counting expert!");
                    }}
                  />
                  
                  {/* Part 2 Completion Button */}
                  <motion.button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
                    onClick={() => {
                      setRobotGesture({ type: 'celebrate', duration: 6000 });
                      strictEnglishAudio.speak("Fantastic! You completed Part 2 about numbers! You can count from 1 to 20 perfectly! You're becoming an English expert!");
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🏆 Complete Part 2: Numbers! 🏆
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
                <h4 className="text-xl font-bold text-green-700 mb-3">🏜️ Letters & Numbers in Niger Culture</h4>
                <p className="text-gray-700 mb-4">
                  In Niger, children learn multiple writing systems! Arabic script is used for Quranic studies, 
                  Tifinagh letters represent Tuareg culture, and now you're learning English letters. 
                  The Hausa people have oral traditions where counting songs help remember numbers, 
                  just like you're learning A-B-C and 1-2-3!
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-bold text-orange-700 mb-2">🎵 Hausa Counting Song</h5>
                    <p className="text-sm text-gray-700">
                      "Daya, biyu, uku, hudu, biyar..." (One, two, three, four, five...)
                      Traditional songs help Nigerien children learn numbers!
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-bold text-green-700 mb-2">📚 Multilingual Learning</h5>
                    <p className="text-sm text-gray-700">
                      Niger students master French, Arabic, local languages, and now English - 
                      making them true global communicators!
                    </p>
                  </div>
                </div>
                
                <AudioPlayer
                  text="In Niger, children are amazing language learners! They learn Arabic letters for religious studies, French letters for school, Hausa or Zarma letters for local communication, and now English letters to connect with the world! You are becoming a global citizen through learning multiple alphabets and number systems!"
                  frenchTranslation="Au Niger, les enfants sont des apprenants de langues extraordinaires!"
                  hausaTranslation="A Niger, yara masu koyon harsuna ne masu ban mamaki!"
                  title="🌍 Niger's Multilingual Heritage"
                  description="Learn about Niger's rich language traditions"
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
                  <span>Next: Numbers 1-20</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
              
              {currentLesson === 2 && (
                <Link href="/module/2">
                  <motion.button
                    className="bg-success-green hover:bg-green-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Next: Module 2</span>
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
