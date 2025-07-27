import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PracticeLink, MODULE_PRACTICE_LINKS } from "@/components/PracticeLink";
import { RobotSam } from "@/components/RobotSam";
import { bulletproofAudioSystem as bulletproofAudio } from "@/lib/bulletproofAudioSystem";

import { ArrowLeft, TreePine, Heart } from "lucide-react";
import { Link } from "wouter";

export default function Module5() {
  const [currentLesson, setCurrentLesson] = useState(0);

  const lessons = [
    {
      id: 1,
      title: "Animals",
      content: {
        introduction: "Hello! I'm Teacher Sam. Today, we will learn about animals in English! Animals are amazing creatures. Let me teach you the English words for different animals.",
        mainContent: "Common animals in English: Dog, Cat, Bird, Fish, Cow, Goat, Sheep, Horse, Chicken, Camel. In Niger, we have many of these animals, especially camels and goats!",
        vocabulary: [
          { word: "Dog", pronunciation: "DAWG", french: "Chien", example: "The dog is loyal and friendly" },
          { word: "Cat", pronunciation: "KAT", french: "Chat", example: "The cat likes to sleep" },
          { word: "Bird", pronunciation: "BURD", french: "Oiseau", example: "Birds can fly high" },
          { word: "Fish", pronunciation: "FISH", french: "Poisson", example: "Fish live in water" },
          { word: "Cow", pronunciation: "KOW", french: "Vache", example: "Cows give us milk" },
          { word: "Goat", pronunciation: "GOHT", french: "Chèvre", example: "Goats climb mountains" },
          { word: "Sheep", pronunciation: "SHEEP", french: "Mouton", example: "Sheep have wool" },
          { word: "Horse", pronunciation: "HAWRS", french: "Cheval", example: "Horses run fast" },
          { word: "Chicken", pronunciation: "CHIK-in", french: "Poulet", example: "Chickens lay eggs" },
          { word: "Camel", pronunciation: "KAM-uhl", french: "Chameau", example: "Camels live in deserts" }
        ]
      }
    },
    {
      id: 2,
      title: "Nature",
      content: {
        introduction: "Hello again my amazing nature explorers! I'm Teacher Sam, and I'm so excited to discover nature with you today! Now let's learn about the beautiful world of nature in English! Nature is absolutely magnificent and gives us everything we need for life! Let me show you these incredible wonders of nature!",
        mainContent: "Elements of nature in English: Tree, Flower, River, Mountain, Desert, Sun, Moon, Star, Cloud, Wind. Niger has beautiful nature from the Sahara Desert to the Niger River!",
        vocabulary: [
          { word: "Tree", pronunciation: "TREE", french: "Arbre", example: "Trees give us shade" },
          { word: "Flower", pronunciation: "FLOW-er", french: "Fleur", example: "Flowers are colorful" },
          { word: "River", pronunciation: "RIV-er", french: "Rivière", example: "Rivers flow to the sea" },
          { word: "Mountain", pronunciation: "MOWN-tin", french: "Montagne", example: "Mountains are tall" },
          { word: "Desert", pronunciation: "DEZ-ert", french: "Désert", example: "Deserts are dry and hot" },
          { word: "Sun", pronunciation: "SUHN", french: "Soleil", example: "The sun gives light" },
          { word: "Moon", pronunciation: "MOON", french: "Lune", example: "The moon shines at night" },
          { word: "Star", pronunciation: "STAHR", french: "Étoile", example: "Stars twinkle in the sky" },
          { word: "Cloud", pronunciation: "KLOWD", french: "Nuage", example: "Clouds bring rain" },
          { word: "Wind", pronunciation: "WIND", french: "Vent", example: "Wind moves the leaves" }
        ]
      }
    }
  ];

  const lesson = lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-blue-50 to-yellow-100">
      {/* Niger landscape background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-300 to-green-200"></div>
        <div className="absolute bottom-8 left-10 w-8 h-16 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-8 left-20 w-6 h-12 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-8 right-20 w-10 h-20 bg-green-600 rounded-t-full"></div>
        <div className="absolute top-20 right-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-60"></div>
        <div className="absolute top-40 left-1/3 w-8 h-8 bg-blue-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-16 left-1/2 w-12 h-3 bg-blue-400 rounded-full opacity-60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/modules">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Modules
            </Button>
          </Link>
          <Badge variant="secondary" className="flex items-center gap-2">
            <TreePine className="w-4 h-4" />
            Module 5
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Teacher Sam */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6 text-center">
                <RobotSam 
                  isTeaching={true}
                  gesture={{ type: 'wave', duration: 2000 }}
                  size="large"
                  showSpeechBubble={true}
                  speechText="Let's discover animals and nature!"
                />
              </CardContent>
            </Card>

            {/* Lesson Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-green-500" />
                  Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lessons.map((l, index) => (
                    <Button
                      key={l.id}
                      variant={currentLesson === index ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setCurrentLesson(index)}
                    >
                      {l.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-green-600" />
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-gray-700 mb-3">{lesson.content.introduction}</p>
                  <AudioPlayer
                    text={lesson.content.introduction}
                    title="Introduction"
                    description="Listen to Teacher Sam's introduction"
                    className="w-full"
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 mb-3">{lesson.content.mainContent}</p>
                  <AudioPlayer
                    text={lesson.content.mainContent}
                    title="Main Content"
                    description="Learn the vocabulary"
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Interactive Animals Gallery */}
            {currentLesson === 0 && (
              <Card className="bg-gradient-to-br from-green-50 to-yellow-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <TreePine className="w-6 h-6" />
                    Interactive Animals Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-xl p-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                      {[
                        { name: "Dog", emoji: "🐕", sound: "Woof!" },
                        { name: "Cat", emoji: "🐱", sound: "Meow!" },
                        { name: "Bird", emoji: "🐦", sound: "Tweet!" },
                        { name: "Fish", emoji: "🐟", sound: "Splash!" },
                        { name: "Cow", emoji: "🐄", sound: "Moo!" },
                        { name: "Goat", emoji: "🐐", sound: "Baa!" },
                        { name: "Sheep", emoji: "🐑", sound: "Baa!" },
                        { name: "Horse", emoji: "🐎", sound: "Neigh!" },
                        { name: "Chicken", emoji: "🐔", sound: "Cluck!" },
                        { name: "Camel", emoji: "🐪", sound: "Grunt!" }
                      ].map((animal, index) => (
                        <div 
                          key={index}
                          className="bg-green-100 rounded-lg p-4 cursor-pointer hover:bg-green-200 transition-colors hover:scale-110 transform"
                          onClick={() => bulletproofAudio.playAudio(`${animal.name}! ${animal.sound} This is a ${animal.name}! Can you say ${animal.name}?`)}
                        >
                          <div className="text-6xl mb-3">{animal.emoji}</div>
                          <p className="text-sm font-semibold text-green-700">{animal.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{animal.sound}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interactive Nature Gallery */}
            {currentLesson === 1 && (
              <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <TreePine className="w-6 h-6" />
                    Interactive Nature Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-xl p-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                      {[
                        { name: "Tree", emoji: "🌳", description: "Gives shade" },
                        { name: "Flower", emoji: "🌸", description: "Beautiful colors" },
                        { name: "River", emoji: "🏞️", description: "Flows water" },
                        { name: "Mountain", emoji: "⛰️", description: "Very tall" },
                        { name: "Desert", emoji: "🏜️", description: "Hot and dry" },
                        { name: "Sun", emoji: "☀️", description: "Gives light" },
                        { name: "Moon", emoji: "🌙", description: "Shines at night" },
                        { name: "Star", emoji: "⭐", description: "Twinkles" },
                        { name: "Cloud", emoji: "☁️", description: "Brings rain" },
                        { name: "Wind", emoji: "💨", description: "Moves air" }
                      ].map((nature, index) => (
                        <div 
                          key={index}
                          className="bg-blue-100 rounded-lg p-4 cursor-pointer hover:bg-blue-200 transition-colors hover:scale-110 transform"
                          onClick={() => bulletproofAudio.playAudio(`${nature.name}! This is ${nature.name}! ${nature.description}! Can you find a ${nature.name}?`)}
                        >
                          <div className="text-6xl mb-3">{nature.emoji}</div>
                          <p className="text-sm font-semibold text-blue-700">{nature.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{nature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vocabulary Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Vocabulary Words</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {lesson.content.vocabulary.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-green-700">{item.word}</h4>
                            <div className="text-6xl">
                              {currentLesson === 0 && (
                                <>
                                  {item.word === "Dog" && "🐕"}
                                  {item.word === "Cat" && "🐱"}
                                  {item.word === "Bird" && "🐦"}
                                  {item.word === "Fish" && "🐟"}
                                  {item.word === "Cow" && "🐄"}
                                  {item.word === "Goat" && "🐐"}
                                  {item.word === "Sheep" && "🐑"}
                                  {item.word === "Horse" && "🐎"}
                                  {item.word === "Chicken" && "🐔"}
                                  {item.word === "Camel" && "🐪"}
                                </>
                              )}
                              {currentLesson === 1 && (
                                <>
                                  {item.word === "Tree" && "🌳"}
                                  {item.word === "Flower" && "🌸"}
                                  {item.word === "River" && "🏞️"}
                                  {item.word === "Mountain" && "⛰️"}
                                  {item.word === "Desert" && "🏜️"}
                                  {item.word === "Sun" && "☀️"}
                                  {item.word === "Moon" && "🌙"}
                                  {item.word === "Star" && "⭐"}
                                  {item.word === "Cloud" && "☁️"}
                                  {item.word === "Wind" && "💨"}
                                </>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">[{item.pronunciation}]</p>
                          <p className="text-sm text-green-600">French: {item.french}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 italic">"{item.example}"</p>
                      <AudioPlayer
                        text={`${item.word}. ${item.example}`}
                        title={item.word}
                        description="Listen and repeat"
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lesson Completion */}
            <Card className="bg-gradient-to-r from-green-100 to-yellow-100 border-green-300">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  🦁 Wonderful Job Learning About {lesson.title}! 🌿
                </h3>
                <p className="text-gray-700 mb-4">
                  You've completed this nature lesson! Explore more with these games:
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
                  onClick={() => bulletproofAudio.playAudio("Outstanding! You learned about animals and nature! You're becoming an English expert! Amazing progress!")}
                >
                  🌟 Click here to celebrate! 🌟
                </Button>
              </CardContent>
            </Card>

            {/* Practice Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <PracticeLink 
                title="Animals Learning Games"
                description="Practice animal names with fun games"
                url="https://www.learnenglishkids.britishcouncil.org/word-games/animals-1"
                icon="game"
                onClick={() => bulletproofAudio.playAudio("Fantastic! Practice animal names with this fun game! You will learn dog, cat, lion, elephant, bird, fish, horse, cow and many more animals!")}
              />
              <PracticeLink 
                title="Nature Vocabulary"
                description="Learn nature words with activities"
                url="https://www.eslgamesplus.com/nature-vocabulary-esl-interactive-fun-game-online/"
                icon="practice"
                onClick={() => bulletproofAudio.playAudio("Great! Practice nature words with this interactive game! You will learn tree, flower, sun, moon, star, mountain, river, desert!")}
              />
            </div>
            
            {/* Module Completion Button */}
            <motion.button
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
              onClick={() => bulletproofAudio.playAudio("Outstanding! You completed Module 5 about animals and nature! You learned many animals like lion, elephant, bird, fish! You know nature words like tree, flower, sun, moon, star! You can talk about the beautiful world around you! Excellent progress!")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🦁 Complete Module 5: Animals & Nature! 🌿
            </motion.button>

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
                <h4 className="text-xl font-bold text-green-700 mb-3">🦁 Animals & Nature in Niger</h4>
                <p className="text-gray-700 mb-4">
                  Niger's landscape is home to amazing animals and nature! Fulani herders travel with cattle and goats across the Sahel. 
                  The mighty Niger River (called "Joliba" meaning "great river") flows through the country. Sacred baobab trees live for thousands of years. 
                  Camels help people cross the Sahara Desert, just like you're learning English words to explore the world!
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-bold text-orange-700 mb-2">🐪 Desert Animals</h5>
                    <p className="text-sm text-gray-700">
                      Camels, goats, and cattle are essential for Niger families. 
                      These animals provide milk, transportation, and represent wealth in traditional culture!
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-bold text-green-700 mb-2">🌳 Sacred Nature</h5>
                    <p className="text-sm text-gray-700">
                      Baobab trees are sacred meeting places. The Niger River brings life to communities. 
                      Desert, savanna, and river create Niger's diverse landscape!
                    </p>
                  </div>
                </div>
                
                <AudioPlayer
                  text="Niger's nature is incredible! Fulani herders travel with their animals across the beautiful Sahel. The great Niger River flows like a ribbon of life through the country. Baobab trees stand like ancient guardians for thousands of years. When you learn English words for animals and nature, you're connecting with the same amazing world that Niger children see every day!"
                  frenchTranslation="La nature du Niger est incroyable!"
                  hausaTranslation="Yanayin Niger yana da ban mamaki!"
                  title="🌍 Niger's Natural Heritage"
                  description="Learn about Niger's amazing animals and landscapes"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}