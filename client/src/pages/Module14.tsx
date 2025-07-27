import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { MultilingualImageCard } from "@/components/MultilingualImageCard";
import { PracticeLink } from "@/components/PracticeLink";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Link } from "wouter";

export default function Module14() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [moduleData, setModuleData] = useState(null);
  
  // Fetch module data from API
  useEffect(() => {
    fetch('/api/modules/14')
      .then(res => res.json())
      .then(data => setModuleData(data))
      .catch(err => console.error('Failed to load module data:', err));
  }, []);
  
  if (!moduleData) {
    return <div className="p-6 text-center">Loading Module 14...</div>;
  }
  
  const lesson = moduleData.lessons[currentLesson];
  
  // ENHANCED debugging for white screen issue - ADDED ERROR CATCHING
  console.log('=== MODULE 14 RENDER DEBUG (Enhanced) ===');
  console.log('moduleData exists:', !!moduleData);
  console.log('currentLesson:', currentLesson);
  console.log('lesson exists:', !!lesson);
  
  // Check for any rendering errors
  try {
    console.log('Lesson content check:', lesson?.content ? 'OK' : 'MISSING');
    if (currentLesson === 1) {
      console.log('PART 2 DEBUG:');
      console.log('- questionStructure exists:', !!lesson?.content?.questionStructure);
      console.log('- questionStructure examples:', lesson?.content?.questionStructure?.examples?.length || 0);
      console.log('- timeExpressions exists:', !!lesson?.content?.timeExpressions);
      console.log('- timeExpressions length:', lesson?.content?.timeExpressions?.length || 0);
      console.log('- Ready to render Part 2:', !!(lesson?.content?.questionStructure && lesson?.content?.timeExpressions));
    }
  } catch (error) {
    console.error('ERROR in Module 14 data check:', error);
    console.error('This error might cause white screen');
  }

  // CRITICAL WHITE SCREEN FIX: Add error boundary and fallback rendering
  try {
    // Ensure lesson content exists before rendering
    if (!lesson || !lesson.content) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-8">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-teal-800 mb-4">Module 14: Loading...</h1>
            <p className="text-teal-600">Please wait while we load the future plans content.</p>
            <div className="mt-8 bg-white/90 rounded-lg p-6">
              <p>If this message persists, the module is still loading data from the server.</p>
              <p className="mt-2 text-sm text-gray-600">Current lesson: {currentLesson}, Data available: {!!moduleData}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 future-bg">
      {/* Niger Future Planning Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          {/* Future city skyline */}
          <rect x="100" y="250" width="60" height="200" fill="#4682B4" />
          <rect x="200" y="200" width="80" height="250" fill="#5F9EA0" />
          <rect x="320" y="180" width="70" height="270" fill="#4682B4" />
          <rect x="430" y="230" width="90" height="220" fill="#5F9EA0" />
          <rect x="560" y="210" width="75" height="240" fill="#4682B4" />
          {/* Clouds representing future dreams */}
          <ellipse cx="150" cy="120" rx="40" ry="25" fill="#E6F3FF" />
          <ellipse cx="350" cy="100" rx="50" ry="30" fill="#E6F3FF" />
          <ellipse cx="550" cy="110" rx="45" ry="28" fill="#E6F3FF" />
          {/* Stars representing dreams */}
          <circle cx="250" cy="80" r="4" fill="#FFD700" />
          <circle cx="450" cy="70" r="4" fill="#FFD700" />
          <circle cx="650" cy="90" r="4" fill="#FFD700" />
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
              Module 14: Future Plans (Going To)
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn to talk about your future plans and intentions
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="What are you going to do?"
                screenText="MODULE 14"
              />
            </div>
          </div>
        </motion.div>

        {/* Lesson Navigation - FORCED ALWAYS VISIBLE */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 rounded-full p-2 shadow-lg">
            <Button
              variant={currentLesson === 0 ? "default" : "ghost"}
              size="sm"
              className="mx-1"
              onClick={() => {
                console.log('Clicked Part 1');
                setCurrentLesson(0);
              }}
            >
              Part 1
            </Button>
            <Button
              variant={currentLesson === 1 ? "default" : "ghost"}
              size="sm"
              className="mx-1"
              onClick={() => {
                console.log('Clicked Part 2');
                setCurrentLesson(1);
              }}
            >
              Part 2
            </Button>
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
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-teal-800">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <RobotSam size="small" />
                <div className="flex-1">
                  <AudioPlayer 
                    text={lesson.content.introduction}
                    title="Lesson Introduction"
                    className="mb-4"
                  />
                  <p className="text-gray-700">{lesson.content.introduction}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Part 1: Future Examples */}
          {currentLesson === 0 && lesson.content.examples && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Future Plans Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text="When we talk about future plans, we use 'going to' with the verb 'to be'. Listen to these examples!"
                  title="Future plans explanation"
                  className="mb-6"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {lesson.content.examples.map((example, index) => (
                    <MultilingualImageCard
                      key={index}
                      emoji={example.emoji}
                      english={example.english}
                      french={example.french}
                      hausa={example.hausa}
                      example={`${example.subject} ${example.verb} going to...`}
                      bgColor="bg-teal-100"
                      textColor="text-teal-800"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Part 1: Activities */}
          {currentLesson === 0 && lesson.content.activities && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Future Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text="Here are some activities you can plan for the future. What are you going to do tomorrow?"
                  title="Activities explanation"
                  className="mb-6"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {lesson.content.activities.map((activity, index) => (
                    <MultilingualImageCard
                      key={index}
                      emoji={activity.emoji}
                      english={activity.english}
                      french={activity.french}
                      hausa={activity.hausa}
                      example={activity.example}
                      bgColor="bg-cyan-100"
                      textColor="text-cyan-800"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Part 2: Question Structure */}
          {currentLesson === 1 && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>🤔 Asking Future Questions - Part 2</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text={lesson?.content?.questionStructure?.explanation || "Learn how to ask questions about future plans!"}
                  title="Question structure explanation"
                  className="mb-6"
                />
                <div className="bg-teal-50 rounded-lg p-4 mb-6">
                  <p className="text-teal-800 font-semibold">{lesson?.content?.questionStructure?.explanation || "Learn how to ask questions about future plans!"}</p>
                </div>
                
                {lesson?.content?.questionStructure?.examples && lesson.content.questionStructure.examples.length > 0 ? (
                  <div className="space-y-4">
                    {lesson.content.questionStructure.examples.map((example, index) => (
                    <div key={index} className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 border-l-4 border-teal-400">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-teal-800 mb-2">❓ Question</h4>
                          <p className="text-gray-700">{example.question}</p>
                          <AudioPlayer 
                            text={example.question}
                            title={`Question ${index + 1}`}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-teal-800 mb-2">💬 Answer</h4>
                          <p className="text-gray-700">{example.answer}</p>
                          <AudioPlayer 
                            text={example.answer}
                            title={`Answer ${index + 1}`}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <h5 className="font-semibold text-blue-800 mb-1">🇫🇷 French</h5>
                          <p className="text-blue-700 text-sm">{example.french}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <h5 className="font-semibold text-green-800 mb-1">🇳🇪 Hausa</h5>
                          <p className="text-green-700 text-sm">{example.hausa}</p>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <strong>Content Loading:</strong> Question structure examples are loading. Please check the API response.
                    <br />
                    <strong>Debug Info:</strong> lesson.content.questionStructure = {JSON.stringify(lesson?.content?.questionStructure, null, 2)}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Part 2: Time Expressions - FIXED */}
          {currentLesson === 1 && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>⏰ Time Expressions - Part 2</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text="When talking about the future, we often use time expressions to say when something will happen. Here are some important ones!"
                  title="Time expressions introduction"
                  className="mb-6"
                />
                
                {lesson?.content?.timeExpressions && lesson.content.timeExpressions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lesson.content.timeExpressions.map((timeExp, index) => (
                      <MultilingualImageCard
                        key={index}
                        emoji={timeExp.emoji}
                        english={timeExp.english}
                        french={timeExp.french}
                        hausa={timeExp.hausa}
                        example={timeExp.example}
                        bgColor="bg-indigo-100"
                        textColor="text-indigo-800"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <strong>Loading Time Expressions...</strong>
                    <br />
                    Please wait while we load the time expressions content.
                  </div>
                )}

                <div className="bg-indigo-50 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold text-indigo-800 mb-2">🗓️ Planning Practice</h3>
                  <AudioPlayer 
                    text="Try making sentences with these time expressions! For example: Tomorrow, I am going to visit my friend. Next week, we are going to have a test."
                    title="Planning practice"
                    className="mb-2"
                  />
                  <p className="text-indigo-700 italic">
                    Try making sentences with these time expressions! For example: "Tomorrow, I am going to visit my friend. Next week, we are going to have a test."
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Practice Activities */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Practice Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PracticeLink
                  title="Future Plans Game"
                  description="Practice talking about future plans"
                  url="https://www.eslgamesplus.com/future-tense-going-to-esl-interactive-game/"
                  icon="game"
                />
                <PracticeLink
                  title="Grammar Practice"
                  description="Master the 'going to' structure"
                  url="https://www.britishcouncil.org/school/kids-games/grammar"
                  icon="practice"
                />
              </div>
            </CardContent>
          </Card>

          {/* Lesson Completion */}
          <Card className="bg-gradient-to-r from-green-400 to-emerald-500 text-white">
            <CardContent className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4">🎉 Future Planning Master!</h3>
              <p className="text-lg mb-4">You completed {lesson.title}!</p>
              <AudioPlayer 
                text="Fantastic! You now know how to talk about your future plans using 'going to'. What are you going to do next?"
                title="Completion message"
                className="mb-4"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
  
  } catch (error) {
    // CRITICAL ERROR FALLBACK - Never show white screen
    console.error('CRITICAL ERROR in Module 14 rendering:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-8">
        <div className="container mx-auto">
          <div className="bg-white/90 rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-teal-800 mb-4">Module 14: Future Plans</h1>
            <p className="text-teal-600 mb-6">We're having a small technical issue, but don't worry!</p>
            
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
              <strong>Temporary Content Available</strong><br/>
              We're working to fix the interactive content. Here's a quick lesson:
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6 text-left">
              <h3 className="font-bold text-teal-800 mb-4">Quick Lesson: Going To (Future Plans)</h3>
              <div className="space-y-2">
                <p><strong>I am going to...</strong> (I am going to study tomorrow)</p>
                <p><strong>You are going to...</strong> (You are going to play football)</p>
                <p><strong>She is going to...</strong> (She is going to visit her friend)</p>
                <p><strong>We are going to...</strong> (We are going to watch a movie)</p>
                <p><strong>They are going to...</strong> (They are going to eat dinner)</p>
              </div>
            </div>
            
            <div className="mt-6 space-x-4">
              <button 
                onClick={() => window.location.href = '/modules'} 
                className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
              >
                Back to Modules
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}