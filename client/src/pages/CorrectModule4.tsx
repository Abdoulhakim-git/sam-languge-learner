import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CulturalSection } from "@/components/CulturalSection";
import { PracticeActivity } from "@/components/PracticeActivity";
import { Home, BookOpen } from "lucide-react";

const CLASSROOM_OBJECTS = [
  { emoji: "✒️", english: "Pen", french: "Stylo", description: "We use a pen to write on paper" },
  { emoji: "📖", english: "Book", french: "Livre", description: "Books help us read and learn" },
  { emoji: "🪑", english: "Chair", french: "Chaise", description: "We sit on a chair during lessons" },
  { emoji: "📚", english: "Table", french: "Table", description: "We use it to write and draw" },
  { emoji: "🎒", english: "Bag", french: "Sac", description: "We carry our school things in it" }
];

const COLORS_AND_SHAPES = [
  { type: "color", emoji: "🔴", english: "Red", french: "Rouge", description: "Red is the color of apples" },
  { type: "color", emoji: "🔵", english: "Blue", french: "Bleu", description: "Blue is the color of the sky" },
  { type: "shape", emoji: "🟥", english: "Square", french: "Carré", description: "A square has four equal sides" },
  { type: "shape", emoji: "🟠", english: "Circle", french: "Cercle", description: "A circle is round" }
];

export default function CorrectModule4() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 px-4 py-2 rounded-lg border-2 border-purple-200 hover:border-purple-400">
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </button>
            </Link>
            <div className="bg-purple-100 px-4 py-2 rounded-full">
              <span className="text-purple-600 font-bold">Module 4 • Classroom, Colors & Shapes</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-purple-600 mb-2">
            Module 4: Classroom, Colors & Shapes
          </h1>
          <p className="text-gray-600 text-lg">
            Learn school objects, colors, and shapes!
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-fredoka mb-2">School Objects, Colors & Shapes</h3>
                <p className="text-purple-100 text-lg">Discover what we use at school and the colorful shapes around us!</p>
              </div>
              <RobotSam size="medium" isTeaching={true} />
            </div>
          </motion.div>

          {/* Part 1: School Objects */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-2xl font-fredoka text-purple-600 mb-6 flex items-center">
              <BookOpen className="w-8 h-8 mr-3" />
              Part 1: School Objects
            </h4>
            
            <AudioPlayer
              text="Hello there! I'm Teacher Sam, your friendly robot guide. Today, we're going to learn some important English words for school and classroom objects — and we'll also have fun with colors and shapes! Are you ready? Let's begin!"
              title="Teacher Sam's School Objects Introduction"
              description="Listen to Teacher Sam introduce school objects"
              className="mb-6"
            />

            <p className="text-lg text-gray-700 mb-6">
              Here are five things you see in a classroom:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {CLASSROOM_OBJECTS.map((object, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(`${object.english}! This is a ${object.english.toLowerCase()}. ${object.description}`);
                    speechSynthesis.speak(utterance);
                  }}
                >
                  <span className="text-6xl">{object.emoji}</span>
                  <div className="flex-1">
                    <h5 className="text-xl font-bold text-blue-800">{object.english}</h5>
                    <p className="text-blue-600 mb-2">French: {object.french}</p>
                    <p className="text-gray-700 text-sm">{object.description}</p>
                    <p className="text-green-600 text-sm italic mt-1">
                      "This is a {object.english.toLowerCase()}."
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <AudioPlayer
              text="Let's review these school objects! Pen - we use a pen to write on paper. Book - books help us read and learn. Chair - we sit on a chair during lessons. Table - we use it to write and draw. Bag - we carry our school things in it. These are all important things we see in our classroom every day!"
              title="School Objects Review"
              description="Review all school objects"
              className="bg-blue-100"
            />
          </motion.div>

          {/* Part 2: Colors and Shapes */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-2xl font-fredoka text-purple-600 mb-6">Part 2: Colors and Shapes</h4>
            
            <AudioPlayer
              text="Now let's look at colors and shapes! Colors make our world beautiful, and shapes help us understand different forms. Let's learn two common colors and two common shapes!"
              title="Colors and Shapes Introduction"
              description="Introduction to colors and shapes"
              className="mb-6"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-red-800 mb-4">Colors</h5>
                <div className="space-y-4">
                  {COLORS_AND_SHAPES.filter(item => item.type === "color").map((color, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(`${color.english}! ${color.description}. My crayon is ${color.english.toLowerCase()}.`);
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <span className="text-4xl">{color.emoji}</span>
                      <div>
                        <p className="font-bold text-lg">{color.english}</p>
                        <p className="text-sm text-gray-600">{color.french}</p>
                        <p className="text-sm text-gray-700">{color.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-blue-800 mb-4">Shapes</h5>
                <div className="space-y-4">
                  {COLORS_AND_SHAPES.filter(item => item.type === "shape").map((shape, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(`${shape.english}! ${shape.description}. A window is a ${shape.english.toLowerCase()}.`);
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <span className="text-4xl">{shape.emoji}</span>
                      <div>
                        <p className="font-bold text-lg">{shape.english}</p>
                        <p className="text-sm text-gray-600">{shape.french}</p>
                        <p className="text-sm text-gray-700">{shape.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-yellow-800 mb-3">Let's Imagine Coloring Together!</h5>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-100 rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-2"></div>
                  <p className="font-bold">Color the circle red</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-blue-500 mx-auto mb-2"></div>
                  <p className="font-bold">Color the square blue</p>
                </div>
              </div>
              <p className="text-center text-gray-700 mt-4">
                Can you picture it? You can also draw and color them at home!
              </p>
              <AudioPlayer
                text="Let's imagine coloring together! Color the circle red. Color the square blue. Can you picture it? You can also draw and color them at home!"
                title="Coloring Activity"
                description="Imagine coloring shapes"
                className="bg-yellow-100 mt-4"
              />
            </div>

            <div className="bg-green-50 rounded-lg p-6 mt-6">
              <h5 className="text-xl font-bold text-green-800 mb-3">Review Time</h5>
              <p className="text-green-700 mb-4">Let's say everything together:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-green-800">School Objects:</p>
                  <p>Pen – Book – Chair – Table – Bag</p>
                </div>
                <div>
                  <p className="font-bold text-green-800">Colors & Shapes:</p>
                  <p>Red – Blue – Square – Circle</p>
                </div>
              </div>
              <AudioPlayer
                text="Let's say everything together! School objects: Pen, Book, Chair, Table, Bag. Colors and shapes: Red, Blue, Square, Circle. Great job today! You've learned classroom objects, colors, and shapes."
                title="Complete Review"
                description="Review all vocabulary"
                className="bg-green-100 mt-4"
              />
            </div>
          </motion.div>

          {/* Cultural Section */}
          <CulturalSection content={{
            title: "Niger Classroom Culture",
            description: "In Niger schools, students share classroom materials and help each other learn. Red and blue are colors often seen in traditional Niger textiles and school uniforms.",
            culturalElement: "Niger classrooms emphasize community learning where students work together and share resources. Traditional geometric patterns in Niger art include squares and circles.",
            flag: "🇳🇪",
            visualExample: "📚",
            audioText: "In Niger schools, students share classroom materials and help each other learn. Red and blue are colors often seen in traditional Niger textiles and school uniforms. Niger classrooms emphasize community learning where students work together and share resources. Traditional geometric patterns in Niger art include squares and circles."
          }} />

          {/* Practice Activity */}
          <PracticeActivity 
            title="Classroom Objects & Colors Practice"
            description="Practice naming classroom objects and identifying colors and shapes! Learn through interactive games and activities."
            gameUrl="https://learnenglishkids.britishcouncil.org/games/paint-with-joey"
            icon="practice"
            difficulty="easy"
            moduleTheme="purple"
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
            <h3 className="text-3xl font-fredoka text-purple-600 mb-4">
              Congratulations! Module 4 Complete!
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              You now know classroom objects, colors, and shapes in English!
            </p>
            <AudioPlayer
              text="Wonderful work! You have completed Module 4! You learned names of common classroom objects, basic colors, and basic shapes. You can now describe things around you using these new words. You are getting good at describing the world around you!"
              title="Module 4 Completion Celebration"
              description="Teacher Sam celebrates your achievement"
              className="mb-6"
            />
            <div className="flex justify-center space-x-4">
              <Link href="/modules">
                <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-600 hover:to-purple-700 transition-all">
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