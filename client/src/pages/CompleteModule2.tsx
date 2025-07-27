import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { VisualExamples, GREETINGS_EXAMPLES } from "@/components/VisualExamples";
import { CulturalSection, CULTURAL_CONTENT } from "@/components/CulturalSection";
import { PracticeActivity, PRACTICE_ACTIVITIES } from "@/components/PracticeActivity";
import { Home, ArrowRight, BookOpen, Star, Clock, Users } from "lucide-react";

export default function CompleteModule2() {
  const [currentPart, setCurrentPart] = useState(1);

  const renderPart1 = () => (
    <div className="space-y-8">
      {/* Part 1 Header */}
      <motion.div 
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-fredoka mb-2">Part 1: English Greetings</h3>
            <p className="text-orange-100 text-lg">Learn how to say hello and goodbye!</p>
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
        <h4 className="text-2xl font-fredoka text-orange-600 mb-6 flex items-center">
          <BookOpen className="w-8 h-8 mr-3" />
          Understanding English Greetings
        </h4>
        
        <div className="space-y-6">
          <div className="bg-orange-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-orange-800 mb-3">What You Will Learn:</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>How to say hello and goodbye</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Greetings for different times of day</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Polite expressions</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>How to respond to greetings</li>
            </ul>
          </div>

          <AudioPlayer
            text="Hello everyone! Today we will learn how to greet people in English. Greetings are very important because they show we are friendly and polite. When we meet someone, we always start with a greeting!"
            frenchTranslation="Salut tout le monde! Aujourd'hui nous allons apprendre à saluer les gens en anglais. Les salutations sont très importantes car elles montrent que nous sommes amicaux et polis. Quand nous rencontrons quelqu'un, nous commençons toujours par une salutation!"
            hausaTranslation="Sannu da ku duka! Yau za mu koyi yadda ake gaisuwa da mutane cikin Turanci. Gaisuwa tana da muhimmanci sosai saboda tana nuna cewa mu masu son juna ne kuma muna da ladabi. Lokacin da muka sadu da wani, ko da yaushe muna fara da gaisuwa!"
            title="Teacher Sam's Greetings Introduction"
            description="Listen to Teacher Sam explain greetings"
            className="mb-6"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Clock className="w-6 h-6 text-yellow-600 mr-2" />
                <h5 className="text-xl font-bold text-yellow-800">Time-Based Greetings</h5>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-100 rounded-lg">
                  <span className="text-3xl">🌅</span>
                  <div>
                    <p className="font-bold">Good Morning</p>
                    <p className="text-sm text-gray-600">6 AM - 12 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-100 rounded-lg">
                  <span className="text-3xl">☀️</span>
                  <div>
                    <p className="font-bold">Good Afternoon</p>
                    <p className="text-sm text-gray-600">12 PM - 6 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-100 rounded-lg">
                  <span className="text-3xl">🌆</span>
                  <div>
                    <p className="font-bold">Good Evening</p>
                    <p className="text-sm text-gray-600">6 PM - 9 PM</p>
                  </div>
                </div>
              </div>
              <AudioPlayer
                text="We use different greetings at different times. Good morning for early day, good afternoon for lunch time, and good evening when the sun goes down. Each time has its special greeting!"
                frenchTranslation="Nous utilisons différentes salutations à différents moments. Bonjour pour le début de journée, bon après-midi pour l'heure du déjeuner, et bonsoir quand le soleil se couche. Chaque moment a sa salutation spéciale!"
                hausaTranslation="Muna amfani da gaisuwa daban-daban a lokuta daban-daban. Barka da safiya don farkon rana, barka da rana don lokacin abincin rana, da barka da yamma lokacin da rana ta fadi. Kowane lokaci yana da gaisuwansa ta musamman!"
                title="Time-Based Greetings"
                description="Learn when to use each greeting"
                className="bg-yellow-100 mt-4"
              />
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Users className="w-6 h-6 text-green-600 mr-2" />
                <h5 className="text-xl font-bold text-green-800">Common Greetings</h5>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <p className="font-bold">Hello / Hi</p>
                  <p className="text-sm text-gray-600">Friendly and casual</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <p className="font-bold">How are you?</p>
                  <p className="text-sm text-gray-600">Asking about someone's well-being</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <p className="font-bold">Nice to meet you</p>
                  <p className="text-sm text-gray-600">When meeting someone new</p>
                </div>
              </div>
              <AudioPlayer
                text="Hello and Hi are friendly ways to greet anyone. How are you shows we care about the person. Nice to meet you is perfect when we meet someone for the first time!"
                title="Common Greetings"
                description="Learn everyday greetings"
                className="bg-green-100 mt-4"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Greetings Examples */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-2xl font-fredoka text-orange-600 mb-6">Practice Greetings</h4>
        <AudioPlayer
          text="Now let's practice! Click on any greeting to hear how to say it. Try different greetings and listen carefully to Teacher Sam's pronunciation!"
          title="Greetings Practice Instructions"
          description="How to practice greetings"
          className="mb-6"
        />
        <VisualExamples 
          examples={GREETINGS_EXAMPLES} 
          title="Click each greeting to practice!"
          gridCols={3}
        />
      </motion.div>

      {/* Cultural Section */}
      <CulturalSection content={CULTURAL_CONTENT.module2_part1} />

      {/* Practice Activity */}
      <PracticeActivity 
        {...PRACTICE_ACTIVITIES.module2_part1}
        className="mb-8"
      />

      {/* Completion Button */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={() => setCurrentPart(2)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center mx-auto"
        >
          <Star className="w-6 h-6 mr-2" />
          Great Job! Learn Introductions
          <ArrowRight className="w-6 h-6 ml-2" />
        </button>
        <AudioPlayer
          text="Wonderful! You know how to greet people now! Next, we will learn how to introduce ourselves and ask questions about others. Keep going!"
          title="Greetings Completion Celebration"
          description="Teacher Sam celebrates your progress"
          className="mt-4"
        />
      </motion.div>
    </div>
  );

  const renderPart2 = () => (
    <div className="space-y-8">
      {/* Part 2 Header */}
      <motion.div 
        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-fredoka mb-2">Part 2: Introductions</h3>
            <p className="text-purple-100 text-lg">Learn to introduce yourself and ask questions!</p>
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
        <h4 className="text-2xl font-fredoka text-purple-600 mb-6 flex items-center">
          <BookOpen className="w-8 h-8 mr-3" />
          Learning Self-Introduction
        </h4>
        
        <div className="space-y-6">
          <div className="bg-purple-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-purple-800 mb-3">What You Will Learn:</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>How to say your name</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>How to ask someone's name</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>How to share your age</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>How to talk about where you live</li>
            </ul>
          </div>

          <AudioPlayer
            text="Now we will learn how to introduce ourselves! When we meet new people, we tell them our name, our age, and where we come from. This helps us make new friends!"
            title="Teacher Sam's Introduction Lesson"
            description="Listen to Teacher Sam explain introductions"
            className="mb-6"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-blue-800 mb-3">Introducing Yourself</h5>
              <div className="space-y-4">
                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="font-bold text-blue-800">My name is...</p>
                  <p className="text-sm text-gray-600">Example: "My name is Amina"</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="font-bold text-blue-800">I am ... years old</p>
                  <p className="text-sm text-gray-600">Example: "I am 10 years old"</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="font-bold text-blue-800">I live in...</p>
                  <p className="text-sm text-gray-600">Example: "I live in Niamey"</p>
                </div>
              </div>
              <AudioPlayer
                text="When introducing yourself, say My name is, then your name. Say I am, then your age, then years old. Say I live in, then your city. This tells people about you!"
                title="Self-Introduction Practice"
                description="Learn to introduce yourself"
                className="bg-blue-100 mt-4"
              />
            </div>

            <div className="bg-pink-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-pink-800 mb-3">Asking Questions</h5>
              <div className="space-y-4">
                <div className="bg-pink-100 rounded-lg p-4">
                  <p className="font-bold text-pink-800">What is your name?</p>
                  <p className="text-sm text-gray-600">To learn someone's name</p>
                </div>
                <div className="bg-pink-100 rounded-lg p-4">
                  <p className="font-bold text-pink-800">How old are you?</p>
                  <p className="text-sm text-gray-600">To learn someone's age</p>
                </div>
                <div className="bg-pink-100 rounded-lg p-4">
                  <p className="font-bold text-pink-800">Where do you live?</p>
                  <p className="text-sm text-gray-600">To learn where someone is from</p>
                </div>
              </div>
              <AudioPlayer
                text="To learn about others, we ask questions. What is your name? How old are you? Where do you live? These questions help us get to know new friends!"
                title="Question Practice"
                description="Learn to ask about others"
                className="bg-pink-100 mt-4"
              />
            </div>
          </div>

          {/* Sample Dialogue */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-gray-800 mb-3">Sample Conversation</h5>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">A</div>
                <div className="bg-blue-100 rounded-lg p-3 flex-1">
                  <p>"Hello! My name is Khadija. What is your name?"</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">B</div>
                <div className="bg-green-100 rounded-lg p-3 flex-1">
                  <p>"Hi Khadija! My name is Ibrahim. How old are you?"</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">A</div>
                <div className="bg-blue-100 rounded-lg p-3 flex-1">
                  <p>"I am 12 years old. Where do you live, Ibrahim?"</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">B</div>
                <div className="bg-green-100 rounded-lg p-3 flex-1">
                  <p>"I live in Maradi. Nice to meet you, Khadija!"</p>
                </div>
              </div>
            </div>
            <AudioPlayer
              text="Here is a complete conversation. Khadija says hello and her name. Ibrahim responds and asks her age. Khadija answers and asks where Ibrahim lives. Ibrahim tells her his city and says nice to meet you. This is how friends introduce themselves!"
              title="Complete Introduction Dialogue"
              description="Listen to a full conversation example"
              className="bg-gray-100 mt-4"
            />
          </div>
        </div>
      </motion.div>

      {/* Cultural Section */}
      <CulturalSection content={CULTURAL_CONTENT.module2_part2} />

      {/* Practice Activity */}
      <PracticeActivity 
        {...PRACTICE_ACTIVITIES.module2_part2}
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
        <h3 className="text-3xl font-fredoka text-orange-600 mb-4">
          Congratulations! Module 2 Complete!
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          You can now greet people and introduce yourself in English!
        </p>
        <AudioPlayer
          text="Amazing work! You have completed Module 2! You can now greet people properly and introduce yourself confidently. You are making excellent progress in English! Ready for Module 3?"
          title="Module 2 Completion Celebration"
          description="Teacher Sam celebrates your achievement"
          className="mb-6"
        />
        <div className="flex justify-center space-x-4">
          <Link href="/modules">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all">
              Choose Next Module
            </button>
          </Link>
          <button
            onClick={() => setCurrentPart(1)}
            className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:from-gray-500 hover:to-gray-600 transition-all"
          >
            Review This Module
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <motion.button 
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors bg-orange-50 px-4 py-2 rounded-lg border-2 border-orange-200 hover:border-orange-400"
                whileHover={{ x: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </motion.button>
            </Link>
            <div className="bg-orange-100 px-4 py-2 rounded-full">
              <span className="text-orange-600 font-bold">
                Module 2 • Part {currentPart} of 2
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-orange-600 mb-2">
            Module 2: Greetings & Introductions
          </h1>
          <p className="text-gray-600 text-lg">
            Learn to greet people and introduce yourself!
          </p>
        </motion.div>

        {/* Module Content */}
        {currentPart === 1 ? renderPart1() : renderPart2()}
      </div>
    </div>
  );
}