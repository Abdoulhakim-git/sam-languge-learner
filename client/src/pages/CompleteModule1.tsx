import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { RobotSam } from "@/components/RobotSam";
import { AudioPlayer } from "@/components/AudioPlayer";
import { VisualExamples, ALPHABET_EXAMPLES, NUMBERS_EXAMPLES } from "@/components/VisualExamples";
import { CulturalSection, CULTURAL_CONTENT } from "@/components/CulturalSection";
import { PracticeActivity, PRACTICE_ACTIVITIES } from "@/components/PracticeActivity";
import { Home, ArrowRight, BookOpen, Star } from "lucide-react";

export default function CompleteModule1() {
  const [currentPart, setCurrentPart] = useState(1);

  const renderPart1 = () => (
    <div className="space-y-8">
      {/* Part 1 Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-fredoka mb-2">Part 1: The English Alphabet</h3>
            <p className="text-blue-100 text-lg">Learn all 26 letters with Teacher Sam!</p>
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
        <h4 className="text-2xl font-fredoka text-blue-600 mb-6 flex items-center">
          <BookOpen className="w-8 h-8 mr-3" />
          Understanding the English Alphabet
        </h4>
        
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-blue-800 mb-3">What You Will Learn:</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>All 26 letters of the English alphabet</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Letter sounds and pronunciation</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Difference between vowels and consonants</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>How to write each letter correctly</li>
            </ul>
          </div>

          <AudioPlayer
            text="Hello children! I am Teacher Sam, and I am very excited to teach you the English alphabet! The alphabet has 26 letters. These letters help us make words, and words help us talk to people around the world! Let's start our alphabet adventure together!"
            title="Teacher Sam's Alphabet Introduction"
            description="Listen to Teacher Sam explain the alphabet"
            className="mb-6"
          />

          {/* Complete Alphabet Display */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h5 className="text-xl font-bold text-blue-800 mb-4">The Complete English Alphabet (26 Letters)</h5>
            <AudioPlayer
              text="Let's learn all 26 letters of the English alphabet! Listen carefully as I say each letter: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z. Now you know the whole alphabet!"
              frenchTranslation="Apprenons les 26 lettres de l'alphabet anglais! Écoutez attentivement quand je dis chaque lettre: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z. Maintenant vous connaissez tout l'alphabet!"
              hausaTranslation="Mu koyi haruffa 26 na haruffan Turanci! Ku saurara sosai lokacin da na fada kowane harafi: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z. Yanzu kun san dukan haruffa!"
              title="Complete Alphabet Pronunciation"
              description="All 26 letters with Teacher Sam"
              className="mb-4"
            />
            <div className="grid grid-cols-6 gap-3 text-center">
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(letter => (
                <div key={letter} className="bg-blue-200 rounded-lg p-3 text-2xl font-bold text-blue-900 hover:bg-blue-300 cursor-pointer transition-colors">
                  {letter}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-green-800 mb-3">Vowels (5 letters)</h5>
              <div className="flex space-x-4 text-4xl mb-4">
                <span className="bg-green-200 rounded-lg p-2">A</span>
                <span className="bg-green-200 rounded-lg p-2">E</span>
                <span className="bg-green-200 rounded-lg p-2">I</span>
                <span className="bg-green-200 rounded-lg p-2">O</span>
                <span className="bg-green-200 rounded-lg p-2">U</span>
              </div>
              <AudioPlayer
                text="The vowels are A, E, I, O, U. These letters make special sounds that help us speak clearly. Every word needs at least one vowel!"
                frenchTranslation="Les voyelles sont A, E, I, O, U. Ces lettres font des sons spéciaux qui nous aident à parler clairement. Chaque mot a besoin d'au moins une voyelle!"
                hausaTranslation="Haruffan sauti sune A, E, I, O, U. Waɗannan haruffa suna yin sauti na musamman da ke taimaka mana mu yi magana a sarari. Kowane kalma yana buƙatar aƙalla harafi ɗaya mai sauti!"
                title="Learn About Vowels"
                description="Vowel sounds with Teacher Sam"
                className="bg-green-100"
              />
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-orange-800 mb-3">Consonants (20 letters)</h5>
              <div className="text-sm text-orange-700 mb-4">
                B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Z
              </div>
              <AudioPlayer
                text="Consonants are all the other letters. They work together with vowels to make words. There are 20 regular consonants, and each one has its own special sound!"
                frenchTranslation="Les consonnes sont toutes les autres lettres. Elles travaillent ensemble avec les voyelles pour faire des mots. Il y a 20 consonnes régulières, et chacune a son propre son spécial!"
                hausaTranslation="Haruffan baƙi sune dukan sauran haruffa. Suna aiki tare da haruffan sauti don yin kalmomi. Akwai haruffan baƙi na yau da kullun 20, kuma kowannensu yana da sautin sa na musamman!"
                title="Learn About Consonants"
                description="Consonant sounds with Teacher Sam"
                className="bg-orange-100"
              />
            </div>
          </div>

          {/* Special Letter Y Explanation */}
          <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
            <h5 className="text-xl font-bold text-yellow-800 mb-3 flex items-center">
              <span className="text-3xl mr-3">Y</span>
              Special Letter: Y - Sometimes Vowel, Sometimes Consonant
            </h5>
            <AudioPlayer
              text="The letter Y is very special! Sometimes Y acts like a vowel, and sometimes like a consonant. When Y is at the beginning of a word like 'yes' or 'yellow', it sounds like a consonant. But when Y is in the middle or end of a word like 'my' or 'happy', it sounds like a vowel. Y is a special helper letter!"
              frenchTranslation="La lettre Y est très spéciale! Parfois Y agit comme une voyelle, et parfois comme une consonne. Quand Y est au début d'un mot comme 'yes' ou 'yellow', ça sonne comme une consonne. Mais quand Y est au milieu ou à la fin d'un mot comme 'my' ou 'happy', ça sonne comme une voyelle. Y est une lettre d'aide spéciale!"
              hausaTranslation="Harafi Y yana da musamman sosai! Wani lokaci Y yana aiki kamar harafi mai sauti, wani lokaci kuma kamar harafi baƙi. Lokacin da Y yana farkon kalma kamar 'yes' ko 'yellow', yana sauti kamar harafi baƙi. Amma lokacin da Y yana tsakiya ko ƙarshen kalma kamar 'my' ko 'happy', yana sauti kamar harafi mai sauti. Y harafi ne na taimako na musamman!"
              title="The Special Letter Y"
              description="Understanding when Y is a vowel or consonant"
              className="bg-yellow-100"
            />
            <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-yellow-100 rounded p-3">
                <strong className="text-yellow-800">Y as Consonant:</strong>
                <div className="text-yellow-700">yes, yellow, young</div>
              </div>
              <div className="bg-yellow-100 rounded p-3">
                <strong className="text-yellow-800">Y as Vowel:</strong>
                <div className="text-yellow-700">my, happy, cry</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Alphabet Examples */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-2xl font-fredoka text-blue-600 mb-6">Practice the Alphabet</h4>
        
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h5 className="text-xl font-bold text-blue-800 mb-3">How to Practice:</h5>
          <div className="text-gray-700 space-y-2">
            <p>• Each letter is paired with a word to help you remember</p>
            <p>• Click on any letter card to hear the pronunciation</p>
            <p>• Listen to the English word and its translations</p>
            <p>• Practice saying each letter and word out loud</p>
          </div>
        </div>

        <AudioPlayer
          text="Now let's practice! Click on any letter to hear how it sounds. Try clicking on A for Apple, B for Ball, or C for Cat. Each letter has its own sound and word!"
          frenchTranslation="Maintenant pratiquons! Cliquez sur n'importe quelle lettre pour entendre comment elle sonne. Essayez de cliquer sur A pour Apple, B pour Ball, ou C pour Cat. Chaque lettre a son propre son et mot!"
          hausaTranslation="Yanzu mu yi aikin! Ku danna kowane harafi don jin yadda yake sauti. Ku gwada danna A don Apple, B don Ball, ko C don Cat. Kowane harafi yana da sautinsa da kalmansa!"
          title="Alphabet Practice Instructions"
          description="How to use the alphabet practice"
          className="mb-6"
        />
        <div className="grid grid-cols-6 gap-4">
          {ALPHABET_EXAMPLES.map((letter, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-all border-2 border-blue-200 hover:border-blue-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const audioText = `${letter.english}! In French: ${letter.french}. In Hausa: ${letter.hausa}`;
                speechSynthesis.cancel(); // Stop any current audio
                const utterance = new SpeechSynthesisUtterance(audioText);
                utterance.rate = 0.8;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;
                speechSynthesis.speak(utterance);
              }}
            >
              <div className="text-4xl mb-2">{letter.emoji}</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">{letter.english.split(' ')[0]}</div>
              <div className="text-sm text-blue-500">Click to hear!</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cultural Section */}
      <CulturalSection content={CULTURAL_CONTENT.module1_part1} />

      {/* Practice Activity */}
      <PracticeActivity 
        {...PRACTICE_ACTIVITIES.module1_part1}
        className="mb-8"
      />

      {/* Completion Button */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={() => setCurrentPart(2)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center mx-auto"
        >
          <Star className="w-6 h-6 mr-2" />
          Great Job! Continue to Numbers
          <ArrowRight className="w-6 h-6 ml-2" />
        </button>
        <AudioPlayer
          text="Excellent work! You have learned the alphabet! Now you are ready to learn numbers. Keep going, you are doing amazing!"
          title="Alphabet Completion Celebration"
          description="Teacher Sam celebrates your success"
          className="mt-4"
        />
      </motion.div>
    </div>
  );

  const renderPart2 = () => (
    <div className="space-y-8">
      {/* Part 2 Header */}
      <motion.div 
        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-fredoka mb-2">Part 2: Numbers 1-20</h3>
            <p className="text-purple-100 text-lg">Count and learn with Teacher Sam!</p>
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
        <h4 className="text-2xl font-fredoka text-purple-600 mb-6 flex items-center">
          <BookOpen className="w-8 h-8 mr-3" />
          Learning Numbers in English
        </h4>
        
        <div className="space-y-6">
          <div className="bg-purple-50 rounded-lg p-6">
            <h5 className="text-xl font-bold text-purple-800 mb-3">What You Will Learn:</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Numbers from 1 to 20</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>How to count objects</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Number pronunciation</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Writing numbers as words</li>
            </ul>
          </div>

          <AudioPlayer
            text="Welcome to numbers! Numbers help us count everything around us. We can count apples, books, friends, and so much more! Let's learn to count from 1 to 20 together. Counting is fun and very useful!"
            frenchTranslation="Bienvenue aux nombres! Les nombres nous aident à compter tout autour de nous. Nous pouvons compter les pommes, les livres, les amis, et bien plus encore! Apprenons à compter de 1 à 20 ensemble. Compter est amusant et très utile!"
            hausaTranslation="Barka da zuwa lambobi! Lambobi suna taimaka mana mu ƙirga komai da ke kewaye da mu. Za mu iya ƙirga tuffa, littattafai, abokai, da abubuwa da yawa! Mu koyi ƙirga daga 1 zuwa 20 tare. Ƙirga yana da daɗi kuma yana da amfani sosai!"
            title="Teacher Sam's Numbers Introduction"
            description="Listen to Teacher Sam explain numbers"
            className="mb-6"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-blue-800 mb-3">Numbers 1-10</h5>
              <div className="grid grid-cols-5 gap-3 mb-4">
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <div key={num} className="bg-blue-200 rounded-lg p-3 text-center font-bold text-2xl">
                    {num}
                  </div>
                ))}
              </div>
              <AudioPlayer
                text="Let's count together! One, two, three, four, five, six, seven, eight, nine, ten! These are the first ten numbers. Can you count with me?"
                frenchTranslation="Comptons ensemble! Un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix! Ce sont les dix premiers nombres. Pouvez-vous compter avec moi?"
                hausaTranslation="Mu ƙirga tare! Ɗaya, biyu, uku, huɗu, biyar, shida, bakwai, takwas, tara, goma! Waɗannan su ne lambobi goma na farko. Za ku iya ƙirga tare da ni?"
                title="Count 1 to 10"
                description="Practice counting with Teacher Sam"
                className="bg-blue-100"
              />
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h5 className="text-xl font-bold text-green-800 mb-3">Numbers 11-20</h5>
              <div className="grid grid-cols-5 gap-3 mb-4">
                {[11,12,13,14,15,16,17,18,19,20].map(num => (
                  <div key={num} className="bg-green-200 rounded-lg p-3 text-center font-bold text-2xl">
                    {num}
                  </div>
                ))}
              </div>
              <AudioPlayer
                text="Now the bigger numbers! Eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty! Great job counting!"
                frenchTranslation="Maintenant les plus grands nombres! Onze, douze, treize, quatorze, quinze, seize, dix-sept, dix-huit, dix-neuf, vingt! Excellent travail en comptant!"
                hausaTranslation="Yanzu manyan lambobi! Sha ɗaya, sha biyu, sha uku, sha huɗu, sha biyar, sha shida, sha bakwai, sha takwas, sha tara, ashirin! Kyakkyawan aiki da ƙirga!"
                title="Count 11 to 20"
                description="Practice higher numbers"
                className="bg-green-100"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Numbers Examples */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-2xl font-fredoka text-purple-600 mb-6">Practice Counting</h4>
        
        <div className="bg-purple-50 rounded-lg p-6 mb-6">
          <h5 className="text-xl font-bold text-purple-800 mb-3">How to Count with Objects:</h5>
          <div className="text-gray-700 space-y-2">
            <p>• Each number is shown with real objects from Niger</p>
            <p>• Click on any number card to hear the pronunciation</p>
            <p>• Count the objects to see the number in action</p>
            <p>• Practice saying "one camel, two trees, three houses"</p>
          </div>
        </div>

        <AudioPlayer
          text="Let's practice counting! Click on any number to hear how to say it. You can practice counting from one to twenty. Try clicking on different numbers!"
          frenchTranslation="Pratiquons le comptage! Cliquez sur n'importe quel nombre pour entendre comment le dire. Vous pouvez pratiquer le comptage de un à vingt. Essayez de cliquer sur différents nombres!"
          hausaTranslation="Mu yi aikin ƙirga! Ku danna kowane lamba don jin yadda ake fadin ta. Kuna iya yin aikin ƙirga daga ɗaya zuwa ashirin. Ku gwada danna lambobi daban-daban!"
          title="Numbers Practice Instructions"
          description="How to use the numbers practice"
          className="mb-6"
        />
        {/* Visual Number Examples with Objects */}
        <div className="grid grid-cols-4 gap-6">
          {[
            { number: "1", emoji: "🐪", object: "camel", french: "chameau" },
            { number: "2", emoji: "🌳🌳", object: "trees", french: "arbres" },
            { number: "3", emoji: "🏠🏠🏠", object: "houses", french: "maisons" },
            { number: "4", emoji: "🐄🐄🐄🐄", object: "cows", french: "vaches" },
            { number: "5", emoji: "⭐⭐⭐⭐⭐", object: "stars", french: "étoiles" },
            { number: "6", emoji: "🌺🌺🌺🌺🌺🌺", object: "flowers", french: "fleurs" },
            { number: "7", emoji: "🐐🐐🐐🐐🐐🐐🐐", object: "goats", french: "chèvres" },
            { number: "8", emoji: "🥭🥭🥭🥭🥭🥭🥭🥭", object: "mangoes", french: "mangues" },
            { number: "9", emoji: "🦅🦅🦅🦅🦅🦅🦅🦅🦅", object: "birds", french: "oiseaux" },
            { number: "10", emoji: "🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴", object: "palm trees", french: "palmiers" },
            { number: "11", emoji: "🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣", object: "buckets", french: "seaux" },
            { number: "12", emoji: "🥜🥜🥜🥜🥜🥜🥜🥜🥜🥜🥜🥜", object: "nuts", french: "noix" },
            { number: "13", emoji: "🏺🏺🏺🏺🏺🏺🏺🏺🏺🏺🏺🏺🏺", object: "pots", french: "pots" },
            { number: "14", emoji: "🐪🐪🐪🐪🐪🐪🐪🐪🐪🐪🐪🐪🐪🐪", object: "camels", french: "chameaux" },
            { number: "15", emoji: "🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️", object: "peppers", french: "piments" },
            { number: "16", emoji: "🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥", object: "coconuts", french: "noix de coco" },
            { number: "17", emoji: "🦎🦎🦎🦎🦎🦎🦎🦎🦎🦎🦎🦎🦎🦎🦎🦎🦎", object: "lizards", french: "lézards" },
            { number: "18", emoji: "🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾", object: "wheat", french: "blé" },
            { number: "19", emoji: "🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️", object: "spiders", french: "araignées" },
            { number: "20", emoji: "🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮", object: "lanterns", french: "lanternes" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-all border-2 border-purple-200 hover:border-purple-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const audioText = `${item.number}! ${item.number} ${item.object}! In French: ${item.number} ${item.french}`;
                speechSynthesis.cancel(); // Stop any current audio
                const utterance = new SpeechSynthesisUtterance(audioText);
                utterance.rate = 0.8;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;
                speechSynthesis.speak(utterance);
              }}
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">{item.number}</div>
              <div className="text-2xl mb-2">{item.emoji}</div>
              <div className="text-lg font-semibold text-purple-700">{item.number} {item.object}</div>
              <div className="text-sm text-purple-500">Click to hear!</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cultural Section */}
      <CulturalSection content={CULTURAL_CONTENT.module1_part2} />

      {/* Practice Activity */}
      <PracticeActivity 
        {...PRACTICE_ACTIVITIES.module1_part2}
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
        <h3 className="text-3xl font-fredoka text-orange-600 mb-4">
          Congratulations! Module 1 Complete!
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          You have learned the alphabet and numbers! You are ready for Module 2!
        </p>
        <AudioPlayer
          text="Fantastic work! You have completed Module 1! You now know the alphabet and can count to twenty. You are becoming a great English learner! Let's continue to Module 2 to learn greetings and how to introduce yourself!"
          title="Module 1 Completion Celebration"
          description="Teacher Sam celebrates your achievement"
          className="mb-6"
        />
        <div className="flex justify-center space-x-4">
          <Link href="/modules">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all">
              Choose Next Module
            </button>
          </Link>
          <button
            onClick={() => setCurrentPart(1)}
            className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:from-gray-500 hover:to-gray-600 transition-all"
          >
            Review This Module
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-lg border-2 border-blue-200 hover:border-blue-400"
                whileHover={{ x: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </motion.button>
            </Link>
            <div className="bg-blue-100 px-4 py-2 rounded-full">
              <span className="text-blue-600 font-bold">
                Module 1 • Part {currentPart} of 2
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka text-blue-600 mb-2">
            Module 1: Alphabet & Numbers
          </h1>
          <p className="text-gray-600 text-lg">
            Learn the foundation of English - letters and numbers!
          </p>
        </motion.div>

        {/* Module Content */}
        {currentPart === 1 ? renderPart1() : renderPart2()}
      </div>
    </div>
  );
}