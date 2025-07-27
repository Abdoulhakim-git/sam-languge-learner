import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { VisualExamples, FAMILY_EXAMPLES } from "@/components/VisualExamples";
import { CulturalSection, CULTURAL_CONTENT } from "@/components/CulturalSection";
import { PracticeActivity, PRACTICE_ACTIVITIES } from "@/components/PracticeActivity";
import { Home, ArrowRight, BookOpen, Star, Users } from "lucide-react";

export default function CompleteModule3() {
  const [currentPart, setCurrentPart] = useState(1);

  const renderPart1 = () => (
    <div className="space-y-8">
      {/* Part 1 Header */}
      <motion.div 
        className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-fredoka mb-2">Part 1: Family Members</h3>
            <p className="text-green-100 text-lg">Meet your family in English!</p>
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
        <h4 className="text-2xl font-fredoka text-green-600 mb-6 flex items-center">
          <BookOpen className="w-8 h-8 mr-3" />
          Learning About Family
        </h4>
        
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-green-800 mb-3">What You Will Learn:</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Names of family members</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>How to talk about your family</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Using pronouns (he, she, they)</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Possessive words (my, your, his, her)</li>
            </ul>
          </div>

          <AudioPlayer
            text="Hello children! Today we will learn about family. Family is very special - these are the people who love us and take care of us. Let's learn how to talk about our family members in English!"
            frenchTranslation="Salut les enfants! Aujourd'hui nous allons apprendre sur la famille. La famille est très spéciale - ce sont les gens qui nous aiment et prennent soin de nous. Apprenons à parler de nos membres de famille en anglais!"
            hausaTranslation="Sannu yara! Yau za mu koyi game da iyali. Iyali yana da muhimmanci sosai - waɗannan su ne mutanen da suke son mu kuma suna kula da mu. Mu koyi yadda ake magana akan 'yan uwa a cikin Turanci!"
            title="Teacher Sam's Family Introduction"
            description="Listen to Teacher Sam explain family"
            className="mb-6"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Users className="w-6 h-6 text-blue-600 mr-2" />
                <h5 className="text-xl font-bold text-blue-800">Immediate Family</h5>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200"
                     onClick={() => {
                       speechSynthesis.cancel();
                       const utterance = new SpeechSynthesisUtterance("Father! Dad! In French: Père, Papa. In Hausa: Uba, Baba");
                       utterance.rate = 0.8;
                       speechSynthesis.speak(utterance);
                     }}>
                  <span className="text-3xl">👨</span>
                  <div>
                    <p className="font-bold">Father / Dad</p>
                    <p className="text-sm text-blue-600">Click to hear!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200"
                     onClick={() => {
                       speechSynthesis.cancel();
                       const utterance = new SpeechSynthesisUtterance("Mother! Mom! In French: Mère, Maman. In Hausa: Uwa, Mama");
                       utterance.rate = 0.8;
                       speechSynthesis.speak(utterance);
                     }}>
                  <span className="text-3xl">👩</span>
                  <div>
                    <p className="font-bold">Mother / Mom</p>
                    <p className="text-sm text-blue-600">Click to hear!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200"
                     onClick={() => {
                       speechSynthesis.cancel();
                       const utterance = new SpeechSynthesisUtterance("Brother! In French: Frère. In Hausa: Dan'uwa namiji");
                       utterance.rate = 0.8;
                       utterance.lang = 'en-US';
                       const voices = speechSynthesis.getVoices();
                       const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                       if (englishVoice) utterance.voice = englishVoice;
                       speechSynthesis.speak(utterance);
                     }}>
                  <span className="text-3xl">👦</span>
                  <div>
                    <p className="font-bold">Brother</p>
                    <p className="text-sm text-blue-600">Click to hear!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200"
                     onClick={() => {
                       speechSynthesis.cancel();
                       const utterance = new SpeechSynthesisUtterance("Sister! In French: Sœur. In Hausa: Dan'uwa mata");
                       utterance.rate = 0.8;
                       speechSynthesis.speak(utterance);
                     }}>
                  <span className="text-3xl">👧</span>
                  <div>
                    <p className="font-bold">Sister</p>
                    <p className="text-sm text-blue-600">Click to hear!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-purple-800 mb-3">Extended Family</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-purple-100 rounded-lg">
                  <span className="text-3xl">👴</span>
                  <div>
                    <p className="font-bold">Grandfather</p>
                    <p className="text-sm text-gray-600">French: Grand-père</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-100 rounded-lg">
                  <span className="text-3xl">👵</span>
                  <div>
                    <p className="font-bold">Grandmother</p>
                    <p className="text-sm text-gray-600">French: Grand-mère</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-100 rounded-lg">
                  <span className="text-3xl">👨‍🦳</span>
                  <div>
                    <p className="font-bold">Uncle</p>
                    <p className="text-sm text-gray-600">French: Oncle</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-100 rounded-lg">
                  <span className="text-3xl">👩‍🦳</span>
                  <div>
                    <p className="font-bold">Aunt</p>
                    <p className="text-sm text-gray-600">French: Tante</p>
                  </div>
                </div>
              </div>
              <AudioPlayer
                text="Extended family includes grandparents, uncles, and aunts. Grandfather and grandmother are your parents' parents. Uncle is your parent's brother. Aunt is your parent's sister. They all love you very much!"
                title="Extended Family Members"
                description="Learn about grandparents, uncles and aunts"
                className="bg-purple-100 mt-4"
              />
            </div>
          </div>

          {/* Pronouns Section */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-yellow-800 mb-4">Using Pronouns for Family</h5>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="font-bold text-yellow-800 mb-2">He (masculine)</p>
                <p className="text-sm text-gray-700">Father, brother, grandfather, uncle</p>
                <p className="text-xs text-gray-600 italic">Example: "He is my father"</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="font-bold text-yellow-800 mb-2">She (feminine)</p>
                <p className="text-sm text-gray-700">Mother, sister, grandmother, aunt</p>
                <p className="text-xs text-gray-600 italic">Example: "She is my mother"</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="font-bold text-yellow-800 mb-2">They (plural)</p>
                <p className="text-sm text-gray-700">Multiple family members</p>
                <p className="text-xs text-gray-600 italic">Example: "They are my parents"</p>
              </div>
            </div>
            <AudioPlayer
              text="We use pronouns to talk about family members. He for males like father, brother, grandfather. She for females like mother, sister, grandmother. They for more than one person, like parents or siblings!"
              title="Family Pronouns"
              description="Learn to use he, she, and they"
              className="bg-yellow-100 mt-4"
            />
          </div>

          <div className="bg-yellow-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-yellow-800 mb-3">Using Pronouns</h5>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="font-bold text-yellow-800">He (for males)</p>
                <p className="text-sm">My father - He is tall</p>
                <p className="text-sm">My brother - He is funny</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="font-bold text-yellow-800">She (for females)</p>
                <p className="text-sm">My mother - She is kind</p>
                <p className="text-sm">My sister - She is smart</p>
              </div>
            </div>
            <AudioPlayer
              text="When we talk about family, we use he for males like father and brother. We use she for females like mother and sister. This helps others understand who we are talking about!"
              title="Learning Pronouns"
              description="How to use he and she"
              className="bg-yellow-100 mt-4"
            />
          </div>
        </div>
      </motion.div>

      {/* Interactive Family Examples */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-2xl font-fredoka text-green-600 mb-6">Practice Family Words</h4>
        <AudioPlayer
          text="Let's practice family words! Click on any family member to hear how to say it. Try clicking on mother, father, brother, or sister!"
          title="Family Practice Instructions"
          description="How to practice family vocabulary"
          className="mb-6"
        />
        <VisualExamples 
          examples={FAMILY_EXAMPLES} 
          title="Click each family member to practice!"
          gridCols={4}
        />
      </motion.div>

      {/* Cultural Section */}
      <CulturalSection content={CULTURAL_CONTENT.module3_part1} />

      {/* Practice Activity */}
      <PracticeActivity 
        {...PRACTICE_ACTIVITIES.module3_part1}
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
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg flex items-center mx-auto"
        >
          <Star className="w-6 h-6 mr-2" />
          Excellent! Continue to Part 2
          <ArrowRight className="w-6 h-6 ml-2" />
        </button>
        <AudioPlayer
          text="Great work! You now know your family members in English! In Part 2, we will learn more about pronouns and possessive words. Keep going!"
          title="Family Completion Celebration"
          description="Teacher Sam celebrates your progress"
          className="mt-4"
        />
      </motion.div>
    </div>
  );

  const renderPart2 = () => (
    <div className="space-y-8">
      {/* Module Completion */}
      <motion.div 
        className="text-center bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-3xl font-fredoka text-green-600 mb-4">
          Congratulations! Module 3 Complete!
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          You can now talk about your family in English!
        </p>
        <AudioPlayer
          text="Fantastic! You have completed Module 3! You can now talk about your family members and use pronouns correctly. You are doing amazing in English!"
          title="Module 3 Completion Celebration"
          description="Teacher Sam celebrates your achievement"
          className="mb-6"
        />
        <div className="flex justify-center space-x-4">
          <Link href="/modules">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all">
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors bg-green-50 px-4 py-2 rounded-lg border-2 border-green-200 hover:border-green-400"
                whileHover={{ x: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </motion.button>
            </Link>
            <div className="bg-green-100 px-4 py-2 rounded-full">
              <span className="text-green-600 font-bold">
                Module 3 • Part {currentPart} of 2
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-green-600 mb-2">
            Module 3: Family & Pronouns
          </h1>
          <p className="text-gray-600 text-lg">
            Learn about your family and how to use pronouns!
          </p>
        </motion.div>

        {/* Module Content */}
        {currentPart === 1 ? renderPart1() : renderPart2()}
      </div>
    </div>
  );
}