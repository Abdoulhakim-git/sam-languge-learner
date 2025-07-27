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
    title: "Hobby Vocabulary",
    content: {
      introduction: "Hello! I'm Teacher Sam. Today we will learn about hobbies and activities we enjoy doing!",
      vocabulary: [
        { english: "Reading", french: "Lire", example: "I like reading books", usage: "Leisure activity" },
        { english: "Playing football", french: "Jouer au football", example: "He enjoys playing football", usage: "Sport activity" },
        { english: "Dancing", french: "Danser", example: "She loves dancing", usage: "Cultural activity" },
        { english: "Singing", french: "Chanter", example: "We enjoy singing songs", usage: "Musical activity" },
        { english: "Drawing", french: "Dessiner", example: "I like drawing pictures", usage: "Artistic activity" },
        { english: "Cooking", french: "Cuisiner", example: "My mother enjoys cooking", usage: "Daily activity" }
      ]
    }
  },
  {
    id: 2,
    title: "Simple Past Tense",
    content: {
      introduction: "Now let's learn about things that happened yesterday or in the past!",
      vocabulary: [
        { present: "I play", past: "I played", french: "J'ai joué", example: "Yesterday I played football" },
        { present: "I eat", past: "I ate", french: "J'ai mangé", example: "I ate rice for dinner" },
        { present: "I go", past: "I went", french: "Je suis allé", example: "I went to school yesterday" },
        { present: "I see", past: "I saw", french: "J'ai vu", example: "I saw my friend at the market" },
        { present: "I do", past: "I did", french: "J'ai fait", example: "I did my homework yesterday" },
        { present: "I have", past: "I had", french: "J'ai eu", example: "I had a good day yesterday" }
      ]
    }
  }
];

export default function Module10() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const lesson = LESSONS[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 acacia-reflection-bg">
      {/* Niger Cultural Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#F0F9FF" />
          <g opacity="0.4">
            <circle cx="150" cy="100" r="35" fill="#0284C7" />
            <rect x="350" y="150" width="55" height="55" fill="#0369A1" />
            <circle cx="550" cy="300" r="40" fill="#075985" />
            <rect x="700" y="400" width="45" height="70" fill="#0C4A6E" />
            <circle cx="100" cy="450" r="30" fill="#082F49" />
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
              Module 10: Hobbies & Past Tense
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Talk about leisure activities and past events
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="What did you do yesterday?"
                screenText="MODULE 10"
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
              <CardTitle className="text-2xl text-center text-cyan-700">
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
                {lesson.content.vocabulary.map((item: any, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-cyan-700 mb-2">
                      {item.english || `${item.present} → ${item.past}`}
                    </h4>
                    <p className="text-sm text-purple-600 mb-1">French: {item.french}</p>
                    {item.usage && <p className="text-sm text-gray-600 mb-2">Usage: {item.usage}</p>}
                    <p className="text-sm text-gray-700 mb-3 italic">"{item.example}"</p>
                    <AudioPlayer
                      text={item.example}
                      title={item.english || item.past}
                      description="Listen and repeat"
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Hobbies Gallery */}
          {currentLesson === 0 && (
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-700">
                  🎨 Interactive Hobbies Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { hobby: "Reading", emoji: "📚", present: "I read", past: "I read" },
                      { hobby: "Swimming", emoji: "🏊‍♂️", present: "I swim", past: "I swam" },
                      { hobby: "Dancing", emoji: "💃", present: "I dance", past: "I danced" },
                      { hobby: "Singing", emoji: "🎤", present: "I sing", past: "I sang" },
                      { hobby: "Drawing", emoji: "🎨", present: "I draw", past: "I drew" },
                      { hobby: "Cooking", emoji: "👨‍🍳", present: "I cook", past: "I cooked" },
                      { hobby: "Playing", emoji: "⚽", present: "I play", past: "I played" },
                      { hobby: "Writing", emoji: "✍️", present: "I write", past: "I wrote" }
                    ].map((hobby, index) => (
                      <div 
                        key={index}
                        className="bg-cyan-100 rounded-lg p-4 cursor-pointer hover:bg-cyan-200 transition-colors hover:scale-110 transform"
                        onClick={() => bulletproofAudio.playAudio(`${hobby.hobby}! ${hobby.present} books every day! Yesterday ${hobby.past}! Do you like ${hobby.hobby.toLowerCase()}?`)}
                      >
                        <div className="text-6xl mb-3">{hobby.emoji}</div>
                        <p className="text-sm font-semibold text-cyan-700">{hobby.hobby}</p>
                        <p className="text-xs text-gray-600 mt-1">{hobby.present} → {hobby.past}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interactive Past Tense Gallery */}
          {currentLesson === 1 && (
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  ⏮️ Interactive Past Tense Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    {[
                      { verb: "go", past: "went", emoji: "🚶‍♂️", example: "I went to school yesterday!" },
                      { verb: "eat", past: "ate", emoji: "🍽️", example: "She ate rice for dinner!" },
                      { verb: "see", past: "saw", emoji: "👁️", example: "We saw a beautiful bird!" },
                      { verb: "come", past: "came", emoji: "🏃‍♂️", example: "He came home late!" },
                      { verb: "give", past: "gave", emoji: "🎁", example: "They gave me a gift!" },
                      { verb: "take", past: "took", emoji: "✋", example: "I took the book from the shelf!" }
                    ].map((verb, index) => (
                      <div 
                        key={index}
                        className="bg-purple-100 rounded-lg p-4 cursor-pointer hover:bg-purple-200 transition-colors hover:scale-105 transform"
                        onClick={() => bulletproofAudio.playAudio(`${verb.verb} becomes ${verb.past}! ${verb.example} Can you use ${verb.past} in a sentence?`)}
                      >
                        <div className="text-6xl mb-3">{verb.emoji}</div>
                        <p className="text-lg font-semibold text-purple-700">{verb.verb} → {verb.past}</p>
                        <p className="text-xs text-gray-600 mt-2">{verb.example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lesson Completion */}
          <Card className="bg-gradient-to-r from-cyan-100 to-blue-100 border-cyan-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-cyan-700 mb-4">
                🏆 Outstanding Work Completing Module 10! 🏆
              </h3>
              <p className="text-gray-700 mb-4">
                You've finished all 10 modules! You're an English star! Practice more with these games:
              </p>
              <Button 
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
                onClick={() => bulletproofAudio.playAudio("Incredible! You completed all 10 modules! You're an English champion! Congratulations on your amazing journey!")}
              >
                🌟 Click here to celebrate finishing everything! 🌟
              </Button>
            </CardContent>
          </Card>

          {/* Practice Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <PracticeLink 
              title="Hobbies and Activities Games"
              description="Practice talking about things you enjoy doing"
              url="https://www.learnenglishkids.britishcouncil.org/word-games/hobbies"
              icon="game"
              onClick={() => bulletproofAudio.playAudio("Fantastic! Practice hobbies with this game! You will learn reading, writing, swimming, dancing, singing, playing and more fun activities!")}
            />
            <PracticeLink 
              title="Past Tense Practice"
              description="Learn past tense verbs and yesterday's actions"
              url="https://www.eslgamesplus.com/past-tense-esl-interactive-fun-game-online/"
              icon="practice"
              onClick={() => bulletproofAudio.playAudio("Excellent! Practice past tense with this game! You will learn go becomes went, eat becomes ate, see becomes saw!")}
            />
          </div>
          
          {/* Final Module Completion Button */}
          <motion.button
            className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
            onClick={() => bulletproofAudio.playAudio("CONGRATULATIONS! You completed ALL 10 modules! You learned alphabet, numbers, greetings, family, colors, shapes, animals, food, verbs, adjectives, prepositions, time, questions, hobbies, and past tense! You are now an amazing English speaker! You should be very proud! Well done!")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🎓 COMPLETE ALL MODULES! CONGRATULATIONS! 🎓
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
              <h4 className="text-xl font-bold text-green-700 mb-3">🎵 Hobbies & Stories in Niger</h4>
              <p className="text-gray-700 mb-4">
                Niger has rich traditions of music, storytelling, and crafts! Children learn traditional dances, listen to griots (storytellers) 
                share ancient tales, and create beautiful pottery and jewelry. Wrestling (lutte) is a popular sport celebrating strength and skill. 
                These hobbies pass down cultural knowledge from grandparents to grandchildren, preserving Niger's heritage for the future!
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h5 className="font-bold text-orange-700 mb-2">🎭 Traditional Arts</h5>
                  <p className="text-sm text-gray-700">
                    Music, dance, storytelling, and crafts connect Niger people to their ancestors. 
                    "Yesterday we danced, today we learn, tomorrow we teach!"
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-bold text-green-700 mb-2">📚 Living History</h5>
                  <p className="text-sm text-gray-700">
                    Griots tell stories that happened long ago, teaching lessons about courage, 
                    wisdom, and community through entertaining tales!
                  </p>
                </div>
              </div>
              
              <AudioPlayer
                text="Niger's hobbies connect the past with the future! Children learned traditional dances from their grandmothers. Griots told amazing stories about brave heroes and wise animals. Young people played music and created beautiful art with their hands. These activities happened long ago and still happen today! When you learn English past tense, you can tell the world about Niger's incredible cultural traditions!"
                frenchTranslation="Les loisirs du Niger relient le passé au futur!"
                hausaTranslation="Nishadinsa na Niger suna hada da baya da gaba!"
                title="🌍 Niger's Cultural Legacy"
                description="Learn about Niger's timeless traditions"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}