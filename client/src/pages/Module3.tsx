import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/AudioPlayer";
import { RobotSam } from "@/components/RobotSam";
import { PracticeLink, MODULE_PRACTICE_LINKS } from "@/components/PracticeLink";
import { bulletproofAudioSystem as bulletproofAudio } from "@/lib/bulletproofAudioSystem";

import { Home, ArrowLeft, Users, Heart } from "lucide-react";

export default function Module3() {
  const [currentLesson, setCurrentLesson] = useState(0);

  const lessons = [
    {
      id: 1,
      title: "Family Members",
      content: {
        introduction: "Hello! I'm Teacher Sam. Today, we will learn about family members in English! Family is very important. Let me teach you the English words for family.",
        mainContent: "Family members in English: Mother (Mom), Father (Dad), Sister, Brother, Grandmother (Grandma), Grandfather (Grandpa), Aunt, Uncle, Cousin. In Niger culture, family is everything!",
        vocabulary: [
          { word: "Mother", pronunciation: "MUH-ther", french: "Mère", example: "My mother cooks delicious food" },
          { word: "Father", pronunciation: "FAH-ther", french: "Père", example: "My father works hard" },
          { word: "Sister", pronunciation: "SIS-ter", french: "Sœur", example: "My sister helps me study" },
          { word: "Brother", pronunciation: "BRUH-ther", french: "Frère", example: "My brother plays soccer" },
          { word: "Grandmother", pronunciation: "GRAND-muh-ther", french: "Grand-mère", example: "Grandmother tells stories" },
          { word: "Grandfather", pronunciation: "GRAND-fah-ther", french: "Grand-père", example: "Grandfather is wise" },
          { word: "Aunt", pronunciation: "ANT", french: "Tante", example: "My aunt visits us" },
          { word: "Uncle", pronunciation: "UHN-kuhl", french: "Oncle", example: "Uncle teaches me fishing" },
          { word: "Cousin", pronunciation: "KUH-zuhn", french: "Cousin", example: "My cousin is my friend" }
        ]
      }
    },
    {
      id: 2,
      title: "Friends & Relationships",
      content: {
        introduction: "Hello again my wonderful students! I'm Teacher Sam, and I'm so excited to be back with you! Now let's learn about friends and relationships! This is going to be absolutely amazing! Friends make life so beautiful and special! Are you ready to discover the wonderful world of friendship?",
        mainContent: "Types of relationships: Friend, Best friend, Classmate, Neighbor, Teacher, Student. In Niger, we say 'friendship is a treasure.'",
        vocabulary: [
          { word: "Friend", pronunciation: "FREND", french: "Ami", example: "My friend helps me" },
          { word: "Best friend", pronunciation: "BEST FREND", french: "Meilleur ami", example: "Sarah is my best friend" },
          { word: "Classmate", pronunciation: "KLAS-mayt", french: "Camarade", example: "My classmate shares books" },
          { word: "Neighbor", pronunciation: "NAY-ber", french: "Voisin", example: "Our neighbor is kind" },
          { word: "Teacher", pronunciation: "TEE-cher", french: "Professeur", example: "The teacher explains well" },
          { word: "Student", pronunciation: "STOO-dent", french: "Étudiant", example: "I am a good student" },
          { word: "Teammate", pronunciation: "TEEM-mayt", french: "Coéquipier", example: "We are teammates" },
          { word: "Partner", pronunciation: "PART-ner", french: "Partenaire", example: "Work with your partner" }
        ]
      }
    }
  ];

  const lesson = lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-50 to-red-100 niger-village-bg">
      {/* Niger landscape background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-300 to-yellow-200"></div>
        <div className="absolute bottom-8 left-10 w-8 h-16 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-8 left-20 w-6 h-12 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-8 right-20 w-10 h-20 bg-green-600 rounded-t-full"></div>
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
            <Users className="w-4 h-4" />
            Module 3
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
                  speechText="Let's learn about family and friends!"
                />
              </CardContent>
            </Card>

            {/* Lesson Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
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
                  <Home className="w-5 h-5 text-blue-600" />
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 mb-3">{lesson.content.introduction}</p>
                  <AudioPlayer
                    text={lesson.content.introduction}
                    title="Introduction"
                    description="Listen to Teacher Sam's introduction"
                    className="w-full"
                  />
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
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

            {/* Interactive Family Tree */}
            {currentLesson === 0 && (
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Users className="w-6 h-6" />
                    Interactive Family Tree
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      {/* Grandparents */}
                      <div className="md:col-span-3">
                        <h4 className="text-sm font-bold text-purple-600 mb-3">Grandparents</h4>
                        <div className="flex justify-center gap-8">
                          <div 
                            className="bg-purple-100 rounded-lg p-6 cursor-pointer hover:bg-purple-200 transition-colors"
                            onClick={() => bulletproofAudio.playAudio("Grandfather! Grandfather is wise and tells stories! In French we say Grand-père!")}
                          >
                            <div className="text-8xl mb-3">👴</div>
                            <p className="text-lg font-semibold">Grandfather</p>
                            <p className="text-sm text-gray-600">Grand-père</p>
                          </div>
                          <div 
                            className="bg-purple-100 rounded-lg p-6 cursor-pointer hover:bg-purple-200 transition-colors"
                            onClick={() => bulletproofAudio.playAudio("Grandmother! Grandmother is loving and caring! In French we say Grand-mère!")}
                          >
                            <div className="text-8xl mb-3">👵</div>
                            <p className="text-lg font-semibold">Grandmother</p>
                            <p className="text-sm text-gray-600">Grand-mère</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Parents */}
                      <div className="md:col-span-3">
                        <h4 className="text-sm font-bold text-blue-600 mb-3">Parents</h4>
                        <div className="flex justify-center gap-8">
                          <div 
                            className="bg-blue-100 rounded-lg p-6 cursor-pointer hover:bg-blue-200 transition-colors"
                            onClick={() => bulletproofAudio.playAudio("Father! Father works hard for the family! In French we say Père!")}
                          >
                            <div className="text-8xl mb-3">👨</div>
                            <p className="text-lg font-semibold">Father</p>
                            <p className="text-sm text-gray-600">Père</p>
                          </div>
                          <div 
                            className="bg-blue-100 rounded-lg p-6 cursor-pointer hover:bg-blue-200 transition-colors"
                            onClick={() => bulletproofAudio.playAudio("Mother! Mother takes care of everyone! In French we say Mère!")}
                          >
                            <div className="text-8xl mb-3">👩</div>
                            <p className="text-lg font-semibold">Mother</p>
                            <p className="text-sm text-gray-600">Mère</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Children */}
                      <div className="md:col-span-3">
                        <h4 className="text-sm font-bold text-green-600 mb-3">Children</h4>
                        <div className="flex justify-center gap-8">
                          <div 
                            className="bg-green-100 rounded-lg p-6 cursor-pointer hover:bg-green-200 transition-colors"
                            onClick={() => bulletproofAudio.playAudio("Brother! Brother plays and helps the family! In French we say Frère!")}
                          >
                            <div className="text-8xl mb-3">👦</div>
                            <p className="text-lg font-semibold">Brother</p>
                            <p className="text-sm text-gray-600">Frère</p>
                          </div>
                          <div 
                            className="bg-green-100 rounded-lg p-6 cursor-pointer hover:bg-green-200 transition-colors"
                            onClick={() => bulletproofAudio.playAudio("Sister! Sister is helpful and kind! In French we say Sœur!")}
                          >
                            <div className="text-8xl mb-3">👧</div>
                            <p className="text-lg font-semibold">Sister</p>
                            <p className="text-sm text-gray-600">Sœur</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Extended Family */}
                      <div className="md:col-span-3 mt-4">
                        <h4 className="text-sm font-bold text-orange-600 mb-3">Extended Family</h4>
                        <div className="flex justify-center gap-6">
                          <div className="bg-orange-100 rounded-lg p-3 cursor-pointer hover:bg-orange-200 transition-colors">
                            <div className="text-3xl mb-1">👨‍🦲</div>
                            <p className="text-xs font-semibold">Uncle</p>
                            <p className="text-xs text-gray-600">Oncle</p>
                          </div>
                          <div className="bg-orange-100 rounded-lg p-3 cursor-pointer hover:bg-orange-200 transition-colors">
                            <div className="text-3xl mb-1">👩‍🦱</div>
                            <p className="text-xs font-semibold">Aunt</p>
                            <p className="text-xs text-gray-600">Tante</p>
                          </div>
                          <div className="bg-orange-100 rounded-lg p-3 cursor-pointer hover:bg-orange-200 transition-colors">
                            <div className="text-3xl mb-1">🧒</div>
                            <p className="text-xs font-semibold">Cousin</p>
                            <p className="text-xs text-gray-600">Cousin</p>
                          </div>
                        </div>
                      </div>
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
                    <div key={index} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow cursor-pointer hover:bg-blue-50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">
                            {item.word === "Mother" && "👩"}
                            {item.word === "Father" && "👨"}
                            {item.word === "Sister" && "👧"}
                            {item.word === "Brother" && "👦"}
                            {item.word === "Grandmother" && "👵"}
                            {item.word === "Grandfather" && "👴"}
                            {item.word === "Aunt" && "👩‍🦱"}
                            {item.word === "Uncle" && "👨‍🦲"}
                            {item.word === "Cousin" && "🧒"}
                            {currentLesson === 1 && item.word === "Friend" && "👫"}
                            {currentLesson === 1 && item.word === "Best friend" && "👭"}
                            {currentLesson === 1 && item.word === "Classmate" && "🧑‍🎓"}
                            {currentLesson === 1 && item.word === "Neighbor" && "🏠"}
                            {currentLesson === 1 && item.word === "Teacher" && "👨‍🏫"}
                            {currentLesson === 1 && item.word === "Student" && "👩‍🎓"}
                            {currentLesson === 1 && item.word === "Teammate" && "⚽"}
                            {currentLesson === 1 && item.word === "Partner" && "🤝"}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-blue-700">{item.word}</h4>
                            <p className="text-sm text-gray-500">[{item.pronunciation}]</p>
                            <p className="text-sm text-purple-600">French: {item.french}</p>
                          </div>
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
            <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-300">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  🎉 Great Job Learning About {lesson.title}! 🎉
                </h3>
                <p className="text-gray-700 mb-4">
                  You've completed this lesson! Now practice with these fun games:
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
                  onClick={() => bulletproofAudio.playAudio("Excellent work! You completed the family lesson! You're becoming a great English speaker! Keep practicing!")}
                >
                  🏆 Click here to celebrate! 🏆
                </Button>
              </CardContent>
            </Card>

            {/* Practice Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <PracticeLink 
                title="Family Members Games"
                description="Practice family vocabulary with fun games"
                url="https://www.eslgamesplus.com/family-members-vocabulary-esl-interactive-fun-game-online/"
                icon="game"
                onClick={() => bulletproofAudio.playAudio("Excellent! Practice family words with this fun game! You will learn about mother, father, sister, brother and more!")}
              />
              <PracticeLink 
                title="Pronouns Practice"
                description="Learn he, she, we, they with interactive exercises"
                url="https://www.learnenglishkids.britishcouncil.org/grammar-practice/pronouns"
                icon="practice"
                onClick={() => bulletproofAudio.playAudio("Great! Practice pronouns he, she, we, they with this interactive game! You will become amazing at using pronouns!")}
              />
            </div>
            
            {/* Module Completion Button */}
            <motion.button
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full"
              onClick={() => bulletproofAudio.playAudio("Fantastic! You completed Module 3 about family and pronouns! You learned mother, father, sister, brother, grandmother, grandfather! You know he, she, we, they! You are ready for colors and shapes! Outstanding work!")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🏆 Complete Module 3: Family & Pronouns! 🏆
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
                <h4 className="text-xl font-bold text-green-700 mb-3">👨‍👩‍👧‍👦 Family in Niger Culture</h4>
                <p className="text-gray-700 mb-4">
                  In Niger, family is everything! Extended families live together with grandparents, parents, children, uncles, aunts, and cousins. 
                  The Hausa saying "Gida ba shi da iyaka" means "family has no boundaries." Children learn respect by saying "Baba" (father) 
                  and "Mama" (mother), just like you're learning English family words!
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-bold text-orange-700 mb-2">🏡 Extended Families</h5>
                    <p className="text-sm text-gray-700">
                      Niger families include many generations living together. 
                      Grandparents teach wisdom through stories, just like you're learning with Teacher Sam!
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-bold text-green-700 mb-2">👴 Respect for Elders</h5>
                    <p className="text-sm text-gray-700">
                      Children show respect by greeting elders first and listening to their guidance. 
                      This teaches values and family traditions!
                    </p>
                  </div>
                </div>
                
                <AudioPlayer
                  text="In Niger families, everyone takes care of each other! Grandparents tell stories, parents work hard, and children learn respect and kindness. When you say 'Baba' for father or 'Mama' for mother in Hausa, you show love and respect. Now you're learning English family words to connect with families around the world!"
                  frenchTranslation="Dans les familles du Niger, tout le monde prend soin les uns des autres!"
                  hausaTranslation="A iyalan Niger, kowa yana kula da juna!"
                  title="🌍 Niger's Family Values"
                  description="Learn about Niger's strong family traditions"
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