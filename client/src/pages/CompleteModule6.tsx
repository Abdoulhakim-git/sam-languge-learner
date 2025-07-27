import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CulturalSection } from "@/components/CulturalSection";
import { PracticeActivity } from "@/components/PracticeActivity";
import { Home, BookOpen } from "lucide-react";

const FOOD_EXAMPLES = [
  { emoji: "🍎", english: "Apple", french: "Pomme" },
  { emoji: "🍌", english: "Banana", french: "Banane" },
  { emoji: "🍞", english: "Bread", french: "Pain" },
  { emoji: "🥛", english: "Milk", french: "Lait" },
  { emoji: "🍚", english: "Rice", french: "Riz" },
  { emoji: "🥕", english: "Carrot", french: "Carotte" },
  { emoji: "🍅", english: "Tomato", french: "Tomate" },
  { emoji: "🥚", english: "Egg", french: "Œuf" }
];

const CULTURAL_FOOD = {
  title: "Niger Food Culture",
  description: "In Niger, families share meals together. Millet, rice, and vegetables are important foods. Markets have fresh fruits and vegetables every day!",
  culturalElement: "Niger families value sharing food and eating together. This brings families closer and teaches children about community.",
  flag: "🇳🇪",
  visualExample: "🍽️",
  audioText: "In Niger, families share meals together. Millet, rice, and vegetables are important foods. Markets have fresh fruits and vegetables every day! Niger families value sharing food and eating together. This brings families closer and teaches children about community."
};

const FOOD_PRACTICE = {
  title: "Food Vocabulary Game",
  description: "Practice food words and learn about healthy eating! Match foods, learn their names, and discover which foods are good for you.",
  gameUrl: "https://learnenglishkids.britishcouncil.org/games/food",
  icon: "game" as const,
  difficulty: "easy" as const,
  moduleTheme: "orange" as const
};

export default function CompleteModule6() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
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
              <span className="text-orange-600 font-bold">Module 6 • Food, Animals & Plurals</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-orange-600 mb-2">
            Module 6: Food, Animals & Plurals
          </h1>
          <p className="text-gray-600 text-lg">
            Learn about food, animals, and how to make words plural!
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-fredoka mb-2">Food & Healthy Eating</h3>
                <p className="text-orange-100 text-lg">Discover nutritious foods that make us strong!</p>
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
              Learning About Food and Health
            </h4>
            
            <AudioPlayer
              text="Hello healthy eaters! Today we will learn about food and how it helps our bodies grow strong and healthy. Good food gives us energy to play, learn, and be happy!"
              frenchTranslation="Salut les mangeurs sains! Aujourd'hui nous allons apprendre sur la nourriture et comment elle aide nos corps à grandir forts et sains. La bonne nourriture nous donne de l'énergie pour jouer, apprendre, et être heureux!"
              hausaTranslation="Sannu masu cin abinci mai lafiya! Yau za mu koyi game da abinci da yadda yake taimakawa jikinmu ya girma da karfi da lafiya. Abinci mai kyau yana ba mu kuzari don wasa, koyo, da farin ciki!"
              title="Teacher Sam's Food Introduction"
              description="Listen to Teacher Sam explain food and health"
              className="mb-6"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-green-800 mb-4">Healthy Foods</h5>
                <div className="grid grid-cols-2 gap-3">
                  {FOOD_EXAMPLES.map((food, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(`${food.english}! In French: ${food.french}`);
                        utterance.rate = 0.8;
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <span className="text-4xl">{food.emoji}</span>
                      <div>
                        <p className="font-bold">{food.english}</p>
                        <p className="text-sm text-green-600">Click to hear!</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <AudioPlayer
                  text="These foods are very healthy! Apples and bananas give us vitamins. Bread gives us energy. Milk makes our bones strong. Rice fills our stomachs. Carrots help our eyes. Tomatoes have vitamins. Eggs have protein to help us grow!"
                  title="Healthy Foods"
                  description="Learn about nutritious foods"
                  className="bg-green-100 mt-4"
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-blue-800 mb-4">Food Groups</h5>
                <div className="space-y-3">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="font-bold">Fruits</p>
                    <p className="text-sm">Apples, bananas, oranges</p>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="font-bold">Vegetables</p>
                    <p className="text-sm">Carrots, tomatoes, lettuce</p>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="font-bold">Grains</p>
                    <p className="text-sm">Rice, bread, millet</p>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="font-bold">Protein</p>
                    <p className="text-sm">Eggs, milk, beans</p>
                  </div>
                </div>
                <AudioPlayer
                  text="We need different types of food! Fruits give us vitamins and taste sweet. Vegetables make us healthy and strong. Grains give us energy for the day. Protein helps our muscles grow big and strong!"
                  title="Food Groups"
                  description="Learn about different food types"
                  className="bg-blue-100 mt-4"
                />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-yellow-800 mb-3">Healthy Eating Habits</h5>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-yellow-100 rounded-lg p-4 text-center">
                  <span className="text-4xl mb-2 block">🥗</span>
                  <p className="font-bold">Eat colorful foods</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4 text-center">
                  <span className="text-4xl mb-2 block">💧</span>
                  <p className="font-bold">Drink water</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4 text-center">
                  <span className="text-4xl mb-2 block">🍽️</span>
                  <p className="font-bold">Eat together</p>
                </div>
              </div>
              <AudioPlayer
                text="Good eating habits keep us healthy! Eat many colorful foods like red tomatoes, green vegetables, and yellow bananas. Drink lots of water every day. Eating together with family makes food taste better and brings us closer!"
                title="Healthy Eating Habits"
                description="Learn good eating practices"
                className="bg-yellow-100 mt-4"
              />
            </div>
          </motion.div>

          {/* Cultural Section */}
          <CulturalSection content={CULTURAL_FOOD} />

          {/* Practice Activity */}
          <PracticeActivity {...FOOD_PRACTICE} className="mb-8" />

          {/* Module Completion */}
          <motion.div 
            className="text-center bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-fredoka text-orange-600 mb-4">
              Congratulations! Module 6 Complete!
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              You now know about food, animals, and plural words!
            </p>
            <AudioPlayer
              text="Excellent work! You have completed Module 6! You now know about food vocabulary, animal names, and how to make words plural. You can also express what you like using 'I like...' and use 'There is' and 'There are' correctly!"
              title="Module 6 Completion Celebration"
              description="Teacher Sam celebrates your achievement"
              className="mb-6"
            />
            <div className="flex justify-center space-x-4">
              <Link href="/modules">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all">
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