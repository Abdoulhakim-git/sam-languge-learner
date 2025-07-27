import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CulturalSection } from "@/components/CulturalSection";
import { PracticeActivity } from "@/components/PracticeActivity";
import { Home, BookOpen, Star } from "lucide-react";

const HOBBIES_EXAMPLES = [
  { emoji: "⚽", english: "Playing Football", base: "Play", past: "Played", french: "Jouer au football" },
  { emoji: "📚", english: "Reading Books", base: "Read", past: "Read", french: "Lire des livres" },
  { emoji: "🎵", english: "Listening to Music", base: "Listen", past: "Listened", french: "Écouter de la musique" },
  { emoji: "🎨", english: "Drawing Pictures", base: "Draw", past: "Drew", french: "Dessiner des images" },
  { emoji: "🍳", english: "Cooking Food", base: "Cook", past: "Cooked", french: "Cuisiner" },
  { emoji: "🌱", english: "Gardening", base: "Garden", past: "Gardened", french: "Jardiner" },
  { emoji: "🎮", english: "Playing Games", base: "Play", past: "Played", french: "Jouer aux jeux" },
  { emoji: "💃", english: "Dancing", base: "Dance", past: "Danced", french: "Danser" }
];

const PAST_TENSE_RULES = [
  { rule: "Regular verbs + ed", examples: ["Walk → Walked", "Play → Played", "Cook → Cooked"] },
  { rule: "Verbs ending in 'e' + d", examples: ["Dance → Danced", "Like → Liked", "Live → Lived"] },
  { rule: "Irregular verbs (special)", examples: ["Go → Went", "Eat → Ate", "See → Saw"] }
];

export default function CompleteModule10() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 px-4 py-2 rounded-lg border-2 border-emerald-200 hover:border-emerald-400">
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </button>
            </Link>
            <div className="bg-emerald-100 px-4 py-2 rounded-full">
              <span className="text-emerald-600 font-bold">Module 10 • Hobbies & Past Tense</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-emerald-600 mb-2">
            Module 10: Hobbies & Past Tense
          </h1>
          <p className="text-gray-600 text-lg">
            Learn about activities you enjoy and talk about the past!
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-fredoka mb-2">Hobbies and Past Actions</h3>
                <p className="text-emerald-100 text-lg">Share what you love to do and what you did!</p>
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
            <h4 className="text-2xl font-fredoka text-emerald-600 mb-6 flex items-center">
              <BookOpen className="w-8 h-8 mr-3" />
              Learning Hobbies and Past Tense
            </h4>
            
            <AudioPlayer
              text="Hello final learners! Welcome to our last module! Today we learn about hobbies and past tense. Hobbies are activities we enjoy doing in our free time. Past tense helps us talk about things that happened yesterday, last week, or long ago. This completes your basic English foundation!"
              frenchTranslation="Salut apprenants finaux! Bienvenue à notre dernier module! Aujourd'hui nous apprenons sur les loisirs et le passé. Les loisirs sont des activités que nous aimons faire pendant notre temps libre. Le passé nous aide à parler des choses qui se sont passées hier, la semaine dernière, ou il y a longtemps. Cela complète votre base d'anglais!"
              hausaTranslation="Sannu masu koyo na ƙarshe! Barka da zuwa ga module na ƙarshe! Yau muna koyon nishaɗi da lokacin da ya wuce. Nishaɗi ayyukan da muke son yi ne a lokacin hutu. Lokacin da ya wuce yana taimaka mana mu yi magana akan abubuwan da suka faru jiya, makon da ya gabata, ko tun da dadewa. Wannan ya kammala tushen Turanci!"
              title="Teacher Sam's Final Module Introduction"
              description="Listen to Teacher Sam's final lesson introduction"
              className="mb-6"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-orange-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-orange-800 mb-4">Popular Hobbies</h5>
                <div className="space-y-3">
                  {HOBBIES_EXAMPLES.map((hobby, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(`${hobby.english}! Yesterday I ${hobby.past.toLowerCase()}!`);
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl">{hobby.emoji}</span>
                        <div>
                          <p className="font-bold">{hobby.english}</p>
                          <p className="text-sm text-gray-600">{hobby.french}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Past:</p>
                        <p className="font-medium">{hobby.past}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <AudioPlayer
                  text="These are popular hobbies! Playing football is fun exercise. Reading books teaches us new things. Listening to music makes us happy. Drawing pictures shows our creativity. Cooking food is useful and delicious. Gardening grows beautiful plants!"
                  title="Hobbies Explanation"
                  description="Learn about different hobbies"
                  className="bg-orange-100 mt-4"
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-blue-800 mb-4">Past Tense Rules</h5>
                <div className="space-y-4">
                  {PAST_TENSE_RULES.map((rule, index) => (
                    <div key={index} className="bg-blue-100 rounded-lg p-4">
                      <p className="font-bold text-blue-800 mb-2">{rule.rule}</p>
                      <div className="space-y-1">
                        {rule.examples.map((example, exIndex) => (
                          <p key={exIndex} className="text-sm text-gray-700">{example}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <AudioPlayer
                  text="Past tense has rules! Most verbs add ed at the end. Walk becomes walked. Play becomes played. If a verb ends in e, just add d. Dance becomes danced. Some verbs are irregular and change completely. Go becomes went. Eat becomes ate!"
                  title="Past Tense Rules"
                  description="Learn how to form past tense"
                  className="bg-blue-100 mt-4"
                />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h5 className="text-xl font-bold text-green-800 mb-3">Talking About Your Hobbies</h5>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="font-bold">Present: I like playing football</p>
                  <p className="text-sm text-gray-600">What you enjoy now</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="font-bold">Past: Yesterday I played football</p>
                  <p className="text-sm text-gray-600">What you did before</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="font-bold">Present: My hobby is reading</p>
                  <p className="text-sm text-gray-600">Your favorite activity</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="font-bold">Past: Last week I read a good book</p>
                  <p className="text-sm text-gray-600">Specific past activity</p>
                </div>
              </div>
              <AudioPlayer
                text="We can talk about hobbies in present and past! I like playing football means you enjoy it now. Yesterday I played football means you did it in the past. My hobby is reading shows your favorite activity. Last week I read a good book tells about a specific past event!"
                title="Present and Past Hobbies"
                description="Compare present and past hobby talk"
                className="bg-green-100 mt-4"
              />
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-purple-800 mb-3">Story Time: My Weekend</h5>
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="text-gray-800 leading-relaxed">
                  "Last weekend was wonderful! On Saturday morning, I <strong>played</strong> football with my friends. 
                  In the afternoon, I <strong>read</strong> an interesting book about animals. On Saturday evening, 
                  I <strong>listened</strong> to music and <strong>danced</strong> with my family. On Sunday, 
                  I <strong>helped</strong> my mother cook our favorite meal. Then I <strong>drew</strong> pictures 
                  of my family. It was a perfect weekend!"
                </p>
              </div>
              <AudioPlayer
                text="Here is a story using past tense! Last weekend was wonderful! On Saturday morning, I played football with my friends. In the afternoon, I read an interesting book about animals. On Saturday evening, I listened to music and danced with my family. On Sunday, I helped my mother cook our favorite meal. Then I drew pictures of my family. It was a perfect weekend!"
                title="Past Tense Story"
                description="Listen to a complete past tense story"
                className="bg-purple-100 mt-4"
              />
            </div>
          </motion.div>

          {/* Cultural Section */}
          <CulturalSection content={{
            title: "Niger Leisure Activities",
            description: "In Niger, people enjoy storytelling, traditional music, crafts, and community games. Children played traditional games, listened to elder's stories, and learned cultural dances from their grandparents.",
            culturalElement: "Niger leisure activities connect generations. Elders taught children traditional songs, stories, and games that preserved cultural knowledge and values.",
            flag: "🇳🇪",
            visualExample: "🎭",
            audioText: "In Niger, people enjoy storytelling, traditional music, crafts, and community games. Children played traditional games, listened to elder's stories, and learned cultural dances from their grandparents. Niger leisure activities connect generations. Elders taught children traditional songs, stories, and games that preserved cultural knowledge and values."
          }} />

          {/* Practice Activity */}
          <PracticeActivity 
            title="Hobbies and Past Tense Practice"
            description="Practice talking about hobbies and using past tense! Learn to describe your favorite activities and tell stories about what you did in the past."
            gameUrl="https://www.eslgamesplus.com/past-simple-tense-esl-grammar-game/"
            icon="practice"
            difficulty="medium"
            moduleTheme="green"
            className="mb-8" 
          />

          {/* Final Module Completion */}
          <motion.div 
            className="text-center bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 border-4 border-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-8xl mb-6">🎓</div>
            <h3 className="text-4xl font-fredoka text-emerald-600 mb-4">
              🎉 CONGRATULATIONS! 🎉
            </h3>
            <h4 className="text-2xl font-fredoka text-orange-600 mb-4">
              You Have Completed ALL 10 Modules!
            </h4>
            <p className="text-xl text-gray-700 mb-6 font-medium">
              You are now an English speaker! You have learned the complete foundation of English!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-emerald-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-emerald-800 mb-3">What You Have Learned:</h5>
                <div className="text-left space-y-2">
                  <p>✓ Alphabet and Numbers (Module 1)</p>
                  <p>✓ Greetings and Introductions (Module 2)</p>
                  <p>✓ Family and Pronouns (Module 3)</p>
                  <p>✓ Colors and Shapes (Module 4)</p>
                  <p>✓ Animals and Nature (Module 5)</p>
                  <p>✓ Food and Health (Module 6)</p>
                  <p>✓ Present Continuous (Module 7)</p>
                  <p>✓ Adjectives and Prepositions (Module 8)</p>
                  <p>✓ Time and Questions (Module 9)</p>
                  <p>✓ Hobbies and Past Tense (Module 10)</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h5 className="text-xl font-bold text-blue-800 mb-3">You Can Now:</h5>
                <div className="text-left space-y-2">
                  <p>🗣️ Introduce yourself in English</p>
                  <p>🗣️ Talk about your family</p>
                  <p>🗣️ Describe colors, shapes, and objects</p>
                  <p>🗣️ Name animals and nature</p>
                  <p>🗣️ Discuss food and health</p>
                  <p>🗣️ Use present and past tense</p>
                  <p>🗣️ Ask questions and tell time</p>
                  <p>🗣️ Share your hobbies and interests</p>
                  <p>🗣️ Have basic conversations</p>
                  <p>🗣️ Continue learning independently!</p>
                </div>
              </div>
            </div>

            <AudioPlayer
              text="Incredible achievement! You have completed all ten modules of SamLang Niger! You started by learning the alphabet, and now you can have conversations in English! You learned greetings, family, colors, animals, food, grammar, questions, and hobbies. You can introduce yourself, describe things, talk about the past, and ask questions. This is a complete foundation in English! Teacher Sam is very proud of you! You are now ready to continue your English journey independently. Remember to practice every day, read English books, watch English videos, and talk with other English learners. Your local voice now speaks the global language! Congratulations, English speaker!"
              title="Complete Course Celebration"
              description="Teacher Sam's final congratulations"
              className="mb-8 bg-gradient-to-r from-emerald-100 to-blue-100 border-2 border-emerald-300"
            />

            <div className="flex justify-center space-x-4">
              <Link href="/modules">
                <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg">
                  <Star className="w-6 h-6 mr-2 inline" />
                  Review All Modules
                </button>
              </Link>
              <Link href="/">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg">
                  <Home className="w-6 h-6 mr-2 inline" />
                  Return Home
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}