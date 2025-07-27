import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CulturalSection, CULTURAL_CONTENT } from "@/components/CulturalSection";
import { PracticeActivity, PRACTICE_ACTIVITIES } from "@/components/PracticeActivity";
import { Home, ArrowRight, BookOpen, Star, TreePine } from "lucide-react";

const ANIMALS_EXAMPLES = [
  { emoji: "🐕", english: "Dog", french: "Chien", pronunciation: "dog" },
  { emoji: "🐱", english: "Cat", french: "Chat", pronunciation: "cat" },
  { emoji: "🐦", english: "Bird", french: "Oiseau", pronunciation: "bird" },
  { emoji: "🐟", english: "Fish", french: "Poisson", pronunciation: "fish" },
  { emoji: "🐄", english: "Cow", french: "Vache", pronunciation: "cow" },
  { emoji: "🐐", english: "Goat", french: "Chèvre", pronunciation: "goat" },
  { emoji: "🐎", english: "Horse", french: "Cheval", pronunciation: "horse" },
  { emoji: "🐓", english: "Chicken", french: "Poulet", pronunciation: "chicken" }
];

const NATURE_EXAMPLES = [
  { emoji: "🌳", english: "Tree", french: "Arbre", pronunciation: "tree" },
  { emoji: "🌸", english: "Flower", french: "Fleur", pronunciation: "flower" },
  { emoji: "☀️", english: "Sun", french: "Soleil", pronunciation: "sun" },
  { emoji: "🌙", english: "Moon", french: "Lune", pronunciation: "moon" },
  { emoji: "💧", english: "Water", french: "Eau", pronunciation: "water" },
  { emoji: "🏔️", english: "Mountain", french: "Montagne", pronunciation: "mountain" },
  { emoji: "🌿", english: "Grass", french: "Herbe", pronunciation: "grass" },
  { emoji: "🪨", english: "Rock", french: "Rocher", pronunciation: "rock" }
];

export default function CompleteModule5() {
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
            <h3 className="text-3xl font-fredoka mb-2">Part 1: Animals & Nature</h3>
            <p className="text-green-100 text-lg">Explore the amazing world of animals and nature!</p>
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
          <TreePine className="w-8 h-8 mr-3" />
          Learning About Animals and Nature
        </h4>
        
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-green-800 mb-3">What You Will Learn:</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Common animal names</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Nature vocabulary</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Animal sounds and movements</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Describing the natural world</li>
            </ul>
          </div>

          <AudioPlayer
            text="Hello nature lovers! Today we will learn about animals and nature. Animals are amazing creatures that live all around us, and nature gives us beautiful trees, flowers, and clean air. Let's explore this wonderful world together!"
            frenchTranslation="Salut les amoureux de la nature! Aujourd'hui nous allons apprendre sur les animaux et la nature. Les animaux sont des créatures incroyables qui vivent tout autour de nous, et la nature nous donne de beaux arbres, des fleurs, et de l'air pur. Explorons ce monde merveilleux ensemble!"
            hausaTranslation="Sannu masu son halitta! Yau za mu koyi game da dabbobi da yanayi. Dabbobi halittu ne masu ban mamaki da ke rayuwa kewaye da mu, kuma yanayi yana ba mu kyawawan bishiyoyi, furanni, da iska mai tsabta. Mu bincika wannan duniya mai ban mamaki tare!"
            title="Teacher Sam's Animals and Nature Introduction"
            description="Listen to Teacher Sam explain animals and nature"
            className="mb-6"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
              <h5 className="text-xl font-bold text-yellow-800 mb-4">Farm and Pet Animals</h5>
              <div className="grid grid-cols-2 gap-3">
                {ANIMALS_EXAMPLES.slice(0, 8).map((animal, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      speechSynthesis.cancel();
                      const utterance = new SpeechSynthesisUtterance(`${animal.english}! In French: ${animal.french}`);
                      utterance.rate = 0.8;
                      speechSynthesis.speak(utterance);
                    }}
                  >
                    <span className="text-4xl">{animal.emoji}</span>
                    <div>
                      <p className="font-bold">{animal.english}</p>
                      <p className="text-sm text-green-600">Click to hear!</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <AudioPlayer
                text="These are animals we often see! Dogs are loyal friends. Cats are independent pets. Birds can fly in the sky. Fish swim in water. Cows give us milk. Goats are good climbers. Horses are strong and fast. Chickens give us eggs!"
                title="Farm and Pet Animals"
                description="Learn about common animals"
                className="bg-yellow-100 mt-4"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
              <h5 className="text-xl font-bold text-blue-800 mb-4">Nature Elements</h5>
              <div className="grid grid-cols-2 gap-3">
                {NATURE_EXAMPLES.slice(0, 8).map((nature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      const utterance = new SpeechSynthesisUtterance(`${nature.english}! ${nature.english} is part of nature!`);
                      utterance.lang = 'en-US';
                      const voices = speechSynthesis.getVoices();
                      const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                      if (englishVoice) utterance.voice = englishVoice;
                      speechSynthesis.speak(utterance);
                    }}
                  >
                    <span className="text-4xl">{nature.emoji}</span>
                    <div>
                      <p className="font-bold">{nature.english}</p>
                      <p className="text-sm text-gray-600">{nature.french}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <AudioPlayer
                text="Nature is all around us! Trees give us shade and clean air. Flowers are beautiful and smell nice. The sun gives us light and warmth. The moon shines at night. Water is essential for life. Mountains are tall and majestic. Grass is soft and green. Rocks are hard and strong!"
                title="Nature Elements"
                description="Learn about nature"
                className="bg-blue-100 mt-4"
              />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-purple-800 mb-3">Animal Actions</h5>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="font-bold text-purple-800">Dogs bark</p>
                <p className="text-sm">Woof! Woof!</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="font-bold text-purple-800">Cats meow</p>
                <p className="text-sm">Meow! Meow!</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="font-bold text-purple-800">Birds chirp</p>
                <p className="text-sm">Tweet! Tweet!</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="font-bold text-purple-800">Cows moo</p>
                <p className="text-sm">Moo! Moo!</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="font-bold text-purple-800">Horses neigh</p>
                <p className="text-sm">Neigh! Neigh!</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="font-bold text-purple-800">Chickens cluck</p>
                <p className="text-sm">Cluck! Cluck!</p>
              </div>
            </div>
            <AudioPlayer
              text="Animals make different sounds! Dogs bark woof woof. Cats meow. Birds chirp tweet tweet. Cows moo. Horses neigh. Chickens cluck. Each animal has its own special sound!"
              title="Animal Sounds"
              description="Learn what sounds animals make"
              className="bg-purple-100 mt-4"
            />
          </div>
        </div>
      </motion.div>

      {/* Cultural Section */}
      <CulturalSection content={CULTURAL_CONTENT.module5_part1} />

      {/* Practice Activity */}
      <PracticeActivity 
        {...PRACTICE_ACTIVITIES.module5_part1}
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
        <h3 className="text-3xl font-fredoka text-green-600 mb-4">
          Congratulations! Module 5 Complete!
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          You now know about animals and nature in English!
        </p>
        <AudioPlayer
          text="Amazing work! You have completed Module 5! You can now name animals and talk about nature in English. You are learning so much!"
          title="Module 5 Completion Celebration"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
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
                Module 5 • Animals & Nature
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-green-600 mb-2">
            Module 5: Animals & Nature
          </h1>
          <p className="text-gray-600 text-lg">
            Explore the wonderful world of animals and nature!
          </p>
        </motion.div>

        {/* Module Content */}
        {renderPart1()}
      </div>
    </div>
  );
}