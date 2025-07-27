import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { MultilingualImageCard } from "@/components/MultilingualImageCard";
import { PracticeLink } from "@/components/PracticeLink";
import { bulletproofAudioSystem as bulletproofAudio } from "@/lib/bulletproofAudioSystem";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Link } from "wouter";

export default function Module13() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [moduleData, setModuleData] = useState(null);
  
  // Fetch module data from API
  useEffect(() => {
    fetch('/api/modules/13')
      .then(res => res.json())
      .then(data => setModuleData(data))
      .catch(err => console.error('Failed to load module data:', err));
  }, []);
  
  if (!moduleData) {
    return <div className="p-6 text-center">Loading Module 13...</div>;
  }
  
  const lesson = moduleData.lessons[currentLesson];
  
  // ENHANCED debugging for white screen issue - ADDED ERROR CATCHING
  console.log('=== MODULE 13 RENDER DEBUG (Enhanced) ===');
  console.log('moduleData exists:', !!moduleData);
  console.log('currentLesson:', currentLesson);
  console.log('lesson exists:', !!lesson);
  
  // Check for any rendering errors
  try {
    console.log('Lesson content check:', lesson?.content ? 'OK' : 'MISSING');
    if (currentLesson === 1) {
      console.log('PART 2 DEBUG:');
      console.log('- storyFrameworks exists:', !!lesson?.content?.storyFrameworks);
      console.log('- storyFrameworks length:', lesson?.content?.storyFrameworks?.length || 0);
      console.log('- practiceQuestions exists:', !!lesson?.content?.practiceQuestions);
      console.log('- Ready to render Part 2:', !!(lesson?.content?.storyFrameworks && lesson?.content?.practiceQuestions));
    }
  } catch (error) {
    console.error('ERROR in Module 13 data check:', error);
    console.error('This error might cause white screen');
  }

  // CRITICAL WHITE SCREEN FIX: Add error boundary and fallback rendering
  try {
    // Ensure lesson content exists before rendering
    if (!lesson || !lesson.content) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-8">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-purple-800 mb-4">Module 13: Loading...</h1>
            <p className="text-purple-600">Please wait while we load the storytelling content.</p>
            <div className="mt-8 bg-white/90 rounded-lg p-6">
              <p>If this message persists, the module is still loading data from the server.</p>
              <p className="mt-2 text-sm text-gray-600">Current lesson: {currentLesson}, Data available: {!!moduleData}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 story-bg">
      {/* Niger Storytelling Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          {/* Traditional hut */}
          <ellipse cx="400" cy="400" rx="100" ry="80" fill="#8B4513" />
          <polygon points="300,400 400,300 500,400" fill="#654321" />
          {/* Storyteller under tree */}
          <ellipse cx="200" cy="350" rx="60" ry="40" fill="#228B22" />
          <rect x="195" y="350" width="10" height="50" fill="#8B4513" />
          {/* Fire */}
          <ellipse cx="400" cy="480" rx="20" ry="10" fill="#FF4500" />
          {/* Stars */}
          <circle cx="100" cy="100" r="3" fill="#FFD700" />
          <circle cx="200" cy="80" r="3" fill="#FFD700" />
          <circle cx="600" cy="90" r="3" fill="#FFD700" />
          <circle cx="700" cy="120" r="3" fill="#FFD700" />
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
              Module 13: Telling Stories (Irregular Past Tense)
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn special verbs for telling stories about yesterday
            </p>
            <div className="flex justify-center mb-4">
              <RobotSam 
                size="medium" 
                showSpeechBubble={true}
                speechText="Let me tell you a story!"
                screenText="MODULE 13"
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
              <CardTitle className="text-2xl text-purple-800">{lesson.title}</CardTitle>
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

          {/* Lesson Content - Part 1: Irregular Verbs */}
          {currentLesson === 0 && lesson.content.irregularVerbs && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Yesterday's Special Verbs</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text="These verbs are special because they don't follow the regular rules. Instead of adding -ed, they change completely!"
                  title="Irregular verbs explanation"
                  className="mb-6"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {lesson.content.irregularVerbs.map((verb, index) => (
                    <MultilingualImageCard
                      key={index}
                      emoji={verb.emoji}
                      english={`${verb.present} → ${verb.past}`}
                      french={verb.french}
                      hausa={verb.hausa}
                      example={verb.example}
                      bgColor="bg-purple-100"
                      textColor="text-purple-800"
                    />
                  ))}
                </div>

                <div className="bg-purple-50 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold text-purple-800 mb-2">📖 Story Time!</h3>
                  <AudioPlayer 
                    text="Yesterday, I went to the park. I saw a big tree and ate an apple under it. Then I had a great time playing with my friends. What did you do yesterday?"
                    title="Story example"
                    className="mb-2"
                  />
                  <p className="text-purple-700 italic">
                    "Yesterday, I went to the park. I saw a big tree and ate an apple under it. 
                    Then I had a great time playing with my friends. What did you do yesterday?"
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lesson Content - Part 2: Story Frameworks - FIXED */}
          {currentLesson === 1 && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>📚 Story Examples - Part 2</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text="Now let's practice using irregular verbs in complete stories! Here are some examples to inspire you."
                  title="Story frameworks introduction"
                  className="mb-6"
                />
                
                {lesson?.content?.storyFrameworks && lesson.content.storyFrameworks.length > 0 ? (
                  <div className="space-y-6">
                    {lesson.content.storyFrameworks.map((framework, index) => (
                      <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-purple-800 mb-4">{framework.title}</h3>
                        
                        <div className="bg-white rounded-lg p-4 mb-4">
                          <AudioPlayer 
                            text={framework.story}
                            title={`Story: ${framework.title}`}
                            className="mb-3"
                          />
                          <p className="text-gray-700 leading-relaxed">{framework.story}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <h4 className="font-semibold text-blue-800 mb-2">🇫🇷 French</h4>
                            <p className="text-blue-700 text-sm">{framework.french}</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3">
                            <h4 className="font-semibold text-green-800 mb-2">🇳🇪 Hausa</h4>
                            <p className="text-green-700 text-sm">{framework.hausa}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <strong>Loading Story Frameworks...</strong>
                    <br />
                    Please wait while we load the story content.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Practice Questions for Part 2 */}
          {currentLesson === 1 && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>🤔 Practice Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  text="Now it's your turn! Try to answer these questions using irregular verbs. Think about what you did yesterday!"
                  title="Practice questions introduction"
                  className="mb-6"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(lesson?.content?.practiceQuestions || []).map((question, index) => (
                    <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{question.emoji}</span>
                        <h4 className="font-semibold text-gray-800">{question.question}</h4>
                      </div>
                      <p className="text-gray-600 italic">Example: {question.answer}</p>
                      <AudioPlayer 
                        text={`${question.question} You can answer: ${question.answer}`}
                        title={`Question ${index + 1}`}
                        className="mt-2"
                      />
                    </div>
                  ))}
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
                  title="Irregular Past Tense Game"
                  description="Practice special past tense verbs"
                  url="https://www.eslgamesplus.com/irregular-verbs-esl-interactive-game/"
                  icon="game"
                />
                <PracticeLink
                  title="Story Creation"
                  description="Create your own stories using past tense"
                  url="https://www.britishcouncil.org/school/kids-games/grammar"
                  icon="practice"
                />
              </div>
            </CardContent>
          </Card>

          {/* Lesson Completion */}
          <Card className="bg-gradient-to-r from-green-400 to-emerald-500 text-white">
            <CardContent className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4">🎉 Excellent Storytelling!</h3>
              <p className="text-lg mb-4">You completed {lesson.title}!</p>
              <AudioPlayer 
                text="Amazing! You now know how to use special verbs to tell stories about the past. Keep practicing your storytelling skills!"
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
    console.error('CRITICAL ERROR in Module 13 rendering:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-8">
        <div className="container mx-auto">
          <div className="bg-white/90 rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-purple-800 mb-4">Module 13: Irregular Past Tense</h1>
            <p className="text-purple-600 mb-6">We're having a small technical issue, but don't worry!</p>
            
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
              <strong>Temporary Content Available</strong><br/>
              We're working to fix the interactive content. Here's a quick lesson:
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6 text-left">
              <h3 className="font-bold text-purple-800 mb-4">Quick Lesson: Irregular Past Tense</h3>
              <div className="space-y-2">
                <p><strong>go → went</strong> (Yesterday, I went to school)</p>
                <p><strong>eat → ate</strong> (Yesterday, I ate rice)</p>
                <p><strong>see → saw</strong> (Yesterday, I saw my friend)</p>
                <p><strong>have → had</strong> (Yesterday, I had fun)</p>
                <p><strong>do → did</strong> (Yesterday, I did homework)</p>
              </div>
            </div>
            
            <div className="mt-6 space-x-4">
              <button 
                onClick={() => window.location.href = '/modules'} 
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
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