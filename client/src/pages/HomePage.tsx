import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { CustomizableSam } from "@/components/CustomizableSam";
import { AchievementBadges } from "@/components/AchievementBadges";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { CulturalStoryTime } from "@/components/CulturalStoryTime";
import { LearningProgressWall } from "@/components/LearningProgressWall";
import { CreationStudio } from "@/components/CreationStudio";
import { UserFeedback } from "@/components/UserFeedback";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Bot, Volume2, Award, Mic, BookOpen, Palette, TrendingUp, Users, Gamepad2 } from "lucide-react";

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedSubtitles, setSelectedSubtitles] = useState("french");
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showStoryTime, setShowStoryTime] = useState(false);
  const [showProgressWall, setShowProgressWall] = useState(false);
  const [showCreationStudio, setShowCreationStudio] = useState(false);
  const [showUserFeedback, setShowUserFeedback] = useState(false);
  const [samOutfits, setSamOutfits] = useState<string[]>([]);

  // Sample progress data for demonstration
  const sampleProgress = [
    { moduleId: 1, moduleName: "Alphabet & Numbers", completionPercentage: 100, starsEarned: 5, timeSpent: 45, lastActivity: new Date(), badges: ["Zinder Star"] },
    { moduleId: 2, moduleName: "Greetings & Introductions", completionPercentage: 80, starsEarned: 4, timeSpent: 32, lastActivity: new Date(), badges: [] },
    { moduleId: 3, moduleName: "Family & Pronouns", completionPercentage: 60, starsEarned: 3, timeSpent: 28, lastActivity: new Date(), badges: [] },
    { moduleId: 4, moduleName: "Colors & Shapes", completionPercentage: 40, starsEarned: 2, timeSpent: 15, lastActivity: new Date(), badges: [] },
    { moduleId: 5, moduleName: "Verbs & Routines", completionPercentage: 20, starsEarned: 1, timeSpent: 8, lastActivity: new Date(), badges: [] }
  ];

  useEffect(() => {
    console.log('HomePage mounted successfully');
    
    // Cache-busting for new modules expansion
    const currentVersion = localStorage.getItem('samlang-version');
    const newVersion = '3.0.0-EXPANDED';
    
    if (currentVersion !== newVersion) {
      console.log('🚀 New version detected: v3.0.0-EXPANDED with 15 modules');
      localStorage.setItem('samlang-version', newVersion);
      
      // Clear any cached data to ensure new modules are visible
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            caches.delete(cacheName);
          });
        });
      }
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Niger Landscape Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255,149,0,0.9), rgba(255,193,7,0.8), rgba(255,152,0,0.9)), 
                           url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><pattern id="sahel" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="2" fill="%23654321" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23sahel)"/></svg>')`
        }}
      />

      {/* Cultural Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="h-full w-full bg-repeat"
          style={{
            backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" viewBox=\"0 0 60 60\"><g fill=\"%23000\" fill-opacity=\"0.1\"><polygon points=\"30,0 60,30 30,60 0,30\"/></g></svg>')"
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-8 px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🤖 SamLang Niger
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white mb-2 font-semibold drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Learn English with Teacher Sam
          </motion.p>
          <motion.p 
            className="text-lg text-white/90 mb-6 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Local Voice, Global Language
          </motion.p>

          {/* Version Badge */}
          <motion.div 
            className="inline-block bg-green-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold shadow-lg border border-green-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
          >
            ✅ v3.0.2-AUDIO-COMPLETE - Enhanced Offline English Audio System
          </motion.div>

          {/* Subtitle Language Selection */}
          <motion.div 
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <p className="text-gray-700 text-sm mb-3 font-semibold text-center">Choose Subtitle Language:</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedSubtitles("french")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedSubtitles === "french"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  🇫🇷 Français
                </button>
                <button
                  onClick={() => setSelectedSubtitles("hausa")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedSubtitles === "hausa"
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  🇳🇪 Hausa
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {selectedSubtitles === "french" 
                  ? "Sous-titres français pour l'accessibilité" 
                  : "Hausa don gudumawa da fahimta"}
              </p>
            </div>
          </motion.div>
        </header>

        {/* Teacher Sam Section */}
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <RobotSam 
              size="large"
              isTeaching={true}
              showSpeechBubble={true}
              speechText="🇳🇪 Welcome to SamLang Niger! Ready to learn English with authentic Niger cultural themes?"
              customOutfits={samOutfits}
            />
          </div>

          <motion.div 
            className="mb-8 max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Volume2 className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-bold text-gray-800">Teacher Sam Says:</h3>
              </div>
              
              {/* Audio Player */}
              <AudioPlayer 
                text="Welcome to SamLang Niger! I'm Teacher Sam, your robot teacher. Together we'll explore English learning with authentic Niger cultural themes, from the Sahel desert to the vibrant markets of Niamey!"
                title="🔊 Teacher Sam's Welcome Message"
                description="Welcome introduction from Teacher Sam"
                frenchTranslation="Bienvenue à SamLang Niger ! Je suis Professeur Sam, votre enseignant robot."
                hausaTranslation="Maraba da zuwa SamLang Niger! Ni ne Malam Sam, malamin robot naku."
              />
              
              {/* Subtitle Display */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {selectedSubtitles === "french" ? "🇫🇷 Sous-titres français:" : "🇳🇪 Hausa:"}
                </p>
                <p className="text-gray-600 italic">
                  {selectedSubtitles === "french" 
                    ? "Bienvenue à SamLang Niger ! Je suis Professeur Sam, votre enseignant robot. Ensemble, nous explorerons l'apprentissage de l'anglais avec des thèmes culturels authentiques du Niger, du désert du Sahel aux marchés animés de Niamey !"
                    : "Maraba da zuwa SamLang Niger! Ni ne Malam Sam, malamin robot naku. Tare za mu binciken koyon Turanci tare da al'adun Niger na gaske, daga hamadar Sahel zuwa kasuwannin Niamey masu ban sha'awa!"
                  }
                </p>
                <p className="text-orange-600 font-semibold mt-2">
                  {selectedSubtitles === "french" 
                    ? "🎯 Changer l'habitude d'apprentissage passif vers l'apprentissage autonome"
                    : "🎯 Canza hanyar koyan da bai da aiki zuwa koyon kai tsaye"
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Features Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.h2 
            className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            🌟 Discover Amazing Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Customizable Teacher Sam */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              onClick={() => setShowCustomizer(true)}
            >
              <div className="text-center">
                <Bot className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Customize Teacher Sam</h3>
                <p className="text-gray-600 text-sm mb-4">Dress Sam in traditional Niger cultural outfits</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">🎩 Hausa Cap</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">👳 Fulani Turban</span>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">🥽 Tuareg Veil</span>
                </div>
              </div>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              onClick={() => setShowAchievements(true)}
            >
              <div className="text-center">
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Achievement Badges</h3>
                <p className="text-gray-600 text-sm mb-4">Earn Niger-themed badges as you learn</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">⭐ Zinder Star</span>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">🌟 Sahel Scholar</span>
                </div>
              </div>
            </motion.div>

            {/* Voice Recorder */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              onClick={() => setShowVoiceRecorder(true)}
            >
              <div className="text-center">
                <Mic className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Voice Recorder</h3>
                <p className="text-gray-600 text-sm mb-4">Practice pronunciation and compare with Teacher Sam</p>
                <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded inline-block">
                  🎤 Record & Compare
                </div>
              </div>
            </motion.div>

            {/* Cultural Story Time */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              onClick={() => setShowStoryTime(true)}
            >
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Cultural Story Time</h3>
                <p className="text-gray-600 text-sm mb-4">Traditional Niger stories with English lessons</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">📚 Clever Hare</span>
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">☀️ Hot Sun</span>
                </div>
              </div>
            </motion.div>

            {/* Learning Progress Wall */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              onClick={() => setShowProgressWall(true)}
            >
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Progress Wall</h3>
                <p className="text-gray-600 text-sm mb-4">Track your learning journey and achievements</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">📊 Statistics</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">⭐ Stars</span>
                </div>
              </div>
            </motion.div>

            {/* Creation Studio */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              onClick={() => setShowCreationStudio(true)}
            >
              <div className="text-center">
                <Palette className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Creation Studio</h3>
                <p className="text-gray-600 text-sm mb-4">Create stories, inventions, and community projects</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">📖 Stories</span>
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">💡 Ideas</span>
                </div>
              </div>
            </motion.div>

            {/* User Feedback */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              onClick={() => setShowUserFeedback(true)}
            >
              <div className="text-center">
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Share Experience</h3>
                <p className="text-gray-600 text-sm mb-4">Tell us about your learning journey</p>
                <div className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded inline-block">
                  💬 Feedback
                </div>
              </div>
            </motion.div>

            {/* Learning Modules */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              <div className="text-center">
                <Gamepad2 className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">15 Learning Modules</h3>
                <p className="text-gray-600 text-sm mb-4">Complete curriculum from Alphabet to Advanced Grammar</p>
                <Link href="/modules">
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-bold">
                    Start Learning →
                  </button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Mission Statement */}
        <motion.div 
          className="max-w-4xl mx-auto px-4 py-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-xl text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🇳🇪 Empowering Niger's Future</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              SamLang Niger bridges local culture with global opportunities, providing children aged 7-17 
              with authentic English learning experiences rooted in Niger's rich heritage. From the Sahel's 
              ancient traditions to modern innovation, we're building tomorrow's global citizens while 
              honoring today's cultural identity.
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="text-center py-8 px-4">
          <motion.p 
            className="text-white/80 text-lg drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
          >
            Breaking the habit of passive learning to independent learning
          </motion.p>
        </footer>
      </div>

      {/* Working Modal Components */}
      {showCustomizer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md mx-auto shadow-xl">
            <CustomizableSam 
              currentOutfits={samOutfits}
              onOutfitChange={setSamOutfits}
              showCustomizer={showCustomizer}
              onCloseCustomizer={() => setShowCustomizer(false)}
            />
            <button 
              onClick={() => setShowCustomizer(false)}
              className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Close Customizer
            </button>
          </div>
        </div>
      )}

      {showAchievements && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <AchievementBadges 
            userProgress={[100, 80, 60, 40, 20]} 
            onClose={() => setShowAchievements(false)} 
          />
        </div>
      )}

      {showVoiceRecorder && (
        <VoiceRecorder onClose={() => setShowVoiceRecorder(false)} />
      )}

      {showStoryTime && (
        <CulturalStoryTime onClose={() => setShowStoryTime(false)} />
      )}

      {showProgressWall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <LearningProgressWall 
            progressData={sampleProgress}
            totalWordsLearned={247}
            streakDays={12}
            onClose={() => setShowProgressWall(false)}
          />
        </div>
      )}

      {showCreationStudio && (
        <CreationStudio onClose={() => setShowCreationStudio(false)} />
      )}

      {showUserFeedback && (
        <UserFeedback onClose={() => setShowUserFeedback(false)} />
      )}
    </div>
  );
}