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
    title: "Food Vocabulary",
    content: {
      introduction: "Hello! I'm Teacher Sam. Today we will learn about food vocabulary and how to express what we like. Food is important in Niger culture!",
      vocabulary: [
        { english: "Rice", french: "Riz", usage: "Common food in Niger" },
        { english: "Millet", french: "Mil", usage: "Traditional Niger grain" },
        { english: "Beans", french: "Haricots", usage: "Protein source" },
        { english: "Meat", french: "Viande", usage: "From cattle and goats" },
        { english: "Fish", french: "Poisson", usage: "From Niger River" },
        { english: "Bread", french: "Pain", usage: "Daily food" }
      ]
    }
  },
  {
    id: 2,
    title: "Animals & Plurals",
    content: {
      introduction: "Now let's learn about animals and how to make plural words. Niger has many beautiful animals!",
      vocabulary: [
        { english: "Cow/Cows", french: "Vache/Vaches", usage: "Important livestock" },
        { english: "Goat/Goats", french: "Chèvre/Chèvres", usage: "Common animals" },
        { english: "Camel/Camels", french: "Chameau/Chameaux", usage: "Desert transport" },
        { english: "Bird/Birds", french: "Oiseau/Oiseaux", usage: "Many species" },
        { english: "Horse/Horses", french: "Cheval/Chevaux", usage: "Transportation" }
      ]
    }
  }
];

export default function Module6() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const lesson = LESSONS[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 sahel-plains-bg">
      {/* Niger Cultural Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          {/* Niger flag colors background */}
          <rect width="800" height="200" fill="#FF7A00" />
          <rect y="200" width="800" height="200" fill="#FFFFFF" />
          <rect y="400" width="800" height="200" fill="#00B74F" />
          {/* Cultural patterns */}
          <g opacity="0.3">
            <circle cx="100" cy="100" r="20" fill="#D2691E" />
            <circle cx="300" cy="150" r="15" fill="#8B4513" />
            <circle cx="500" cy="80" r="25" fill="#CD853F" />
            <circle cx="700" cy="120" r="18" fill="#DEB887" />
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
              Module 6: Food, Animals & Plurals
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn food vocabulary, animals, and how to make words plural
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="Let's learn about food and animals!"
                screenText="MODULE 6"
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
              <CardTitle className="text-2xl text-center text-yellow-700">
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
                {lesson.content.vocabulary.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-yellow-700 mb-2">{item.english}</h4>
                    <p className="text-sm text-purple-600 mb-1">French: {item.french}</p>
                    <p className="text-sm text-gray-600 mb-3">{item.usage}</p>
                    <AudioPlayer
                      text={item.english}
                      title={item.english}
                      description="Listen and repeat"
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Food Gallery */}
          {currentLesson === 0 && (
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700">
                  🍽️ Interactive Food Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { name: "Bread", emoji: "🍞", plural: "breads" },
                      { name: "Rice", emoji: "🍚", plural: "rice (uncountable)" },
                      { name: "Apple", emoji: "🍎", plural: "apples" },
                      { name: "Banana", emoji: "🍌", plural: "bananas" },
                      { name: "Fish", emoji: "🐟", plural: "fish/fishes" },
                      { name: "Meat", emoji: "🥩", plural: "meats" },
                      { name: "Egg", emoji: "🥚", plural: "eggs" },
                      { name: "Water", emoji: "💧", plural: "water (uncountable)" }
                    ].map((food, index) => (
                      <div 
                        key={index}
                        className="bg-yellow-100 rounded-lg p-4 cursor-pointer hover:bg-yellow-200 transition-colors hover:scale-110 transform"
                        onClick={() => bulletproofAudio.playAudio(`${food.name}! I like ${food.name}! The plural is ${food.plural}! Can you say ${food.name}?`)}
                      >
                        <div className="text-6xl mb-3">{food.emoji}</div>
                        <p className="text-sm font-semibold text-yellow-700">{food.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{food.plural}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interactive Animals Gallery */}
          {currentLesson === 1 && (
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  🦁 Interactive Animals Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { name: "Lion", emoji: "🦁", plural: "lions", sound: "Roar!" },
                      { name: "Elephant", emoji: "🐘", plural: "elephants", sound: "Trumpet!" },
                      { name: "Zebra", emoji: "🦓", plural: "zebras", sound: "Neigh!" },
                      { name: "Giraffe", emoji: "🦒", plural: "giraffes", sound: "Hum!" },
                      { name: "Hippo", emoji: "🦛", plural: "hippos", sound: "Grunt!" },
                      { name: "Monkey", emoji: "🐒", plural: "monkeys", sound: "Ooh ooh!" },
                      { name: "Bird", emoji: "🐦", plural: "birds", sound: "Tweet!" },
                      { name: "Snake", emoji: "🐍", plural: "snakes", sound: "Hiss!" }
                    ].map((animal, index) => (
                      <div 
                        key={index}
                        className="bg-green-100 rounded-lg p-4 cursor-pointer hover:bg-green-200 transition-colors hover:scale-110 transform"
                        onClick={() => bulletproofAudio.playAudio(`${animal.name}! ${animal.sound} One ${animal.name}, two ${animal.plural}! Can you count ${animal.plural}?`)}
                      >
                        <div className="text-6xl mb-3">{animal.emoji}</div>
                        <p className="text-sm font-semibold text-green-700">{animal.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{animal.plural}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lesson Completion */}
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-yellow-700 mb-4">
                🎉 Excellent Work Learning {lesson.title}! 🎉
              </h3>
              <p className="text-gray-700 mb-4">
                You've completed this lesson! Practice more with these fun games:
              </p>
              <Button 
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
                onClick={() => bulletproofAudio.playAudio("Amazing! You learned about food and animals! You're doing fantastic! Keep practicing!")}
              >
                🏆 Click here to celebrate! 🏆
              </Button>
            </CardContent>
          </Card>

          {/* Practice Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <PracticeLink 
              title="Food Vocabulary Games"
              description="Practice food words with interactive games"
              url="https://www.learnenglishkids.britishcouncil.org/word-games/food"
              icon="game"
              onClick={() => bulletproofAudio.playAudio("Fantastic! Practice food words with this fun game! You will learn bread, rice, chicken, fish, banana, orange and more delicious foods!")}
            />
            <PracticeLink 
              title="Animal Plurals Practice"
              description="Learn singular and plural animal names"
              url="https://www.eslgamesplus.com/animals-vocabulary-esl-interactive-fun-game-online/"
              icon="practice"
              onClick={() => bulletproofAudio.playAudio("Excellent! Practice plurals with this game! You will learn one lion becomes lions, one elephant becomes elephants!")}
            />
          </div>
          
          {/* Module Completion Button */}
          <motion.button
            className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
            onClick={() => bulletproofAudio.playAudio("Amazing! You completed Module 6 about food, animals, and plurals! You learned bread, rice, chicken, fish! You know one lion, two lions, one elephant, two elephants! You can say I like and talk about many things! Wonderful progress!")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🍎 Complete Module 6: Food & Animals! 🦁
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
              <h4 className="text-xl font-bold text-green-700 mb-3">🍽️ Food Culture in Niger</h4>
              <p className="text-gray-700 mb-4">
                Niger's traditional foods reflect the diverse landscape! Millet and sorghum grow in the Sahel region. 
                Fulani herders provide fresh milk and cheese. People enjoy "tuwo" (millet porridge) with spicy sauces. 
                During Ramadan, families share special meals together, showing the importance of food in bringing people together!
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h5 className="font-bold text-orange-700 mb-2">🌾 Traditional Grains</h5>
                  <p className="text-sm text-gray-700">
                    Millet, sorghum, and rice are staple foods. 
                    These grains grow well in Niger's climate and provide nutrition for families!
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-bold text-green-700 mb-2">🥛 Sharing Meals</h5>
                  <p className="text-sm text-gray-700">
                    Meals are shared from communal bowls, showing unity and respect. 
                    Food represents hospitality and community bonds!
                  </p>
                </div>
              </div>
              
              <AudioPlayer
                text="Food in Niger brings families and communities together! People grow millet and sorghum in the fields. Fulani herders share fresh milk with their neighbors. When you eat 'tuwo' with delicious sauce, you're sharing love with your family. Learning English food words helps you share Niger's beautiful food culture with friends around the world!"
                frenchTranslation="La nourriture au Niger rassemble les familles et les communautés!"
                hausaTranslation="Abinci a Niger yana hada iyalai da al'ummomi!"
                title="🌍 Niger's Food Heritage"
                description="Learn about Niger's rich food traditions"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}