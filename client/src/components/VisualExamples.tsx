import React, { useId, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface VisualExample {
  emoji: string;
  english: string;
  french: string;
  hausa?: string;
  pronunciation?: string;
}

interface VisualExamplesProps {
  examples: VisualExample[];
  title?: string;
  gridCols?: number;
  onExampleClick?: (example: VisualExample) => void;
}

export function VisualExamples({ examples, title, gridCols = 4, onExampleClick }: VisualExamplesProps) {
  const componentId = useId();
  // Use simple reliable audio system
  const gridClass = `grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridCols}`;
  
  const handleExampleClick = (example: VisualExample) => {
    console.log('Visual example clicked:', example.english);
    try {
      // FIXED: Use bulletproof audio system instead of direct speechSynthesis
      if (window.completeAudioFix && typeof window.completeAudioFix.playAudio === 'function') {
        // Use the bulletproof audio system that guarantees English-only voices
        const naturalAudio = example.hausa 
          ? `${example.english}! In French: ${example.french}. In Hausa: ${example.hausa}.`
          : `${example.english}! In French: ${example.french}.`;
        
        window.completeAudioFix.playAudio(naturalAudio);
      } else {
        // EMERGENCY FALLBACK: Force English with strict voice filtering
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(`${example.english}!`);
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-US'; // Force English language
        
        // STRICT English voice filtering to prevent French audio offline
        const voices = speechSynthesis.getVoices();
        const englishOnlyVoices = voices.filter(voice => 
          voice.lang.startsWith('en') && 
          !voice.lang.includes('fr') &&
          !voice.name.toLowerCase().includes('french') &&
          !voice.name.toLowerCase().includes('français')
        );
        
        const preferredVoice = englishOnlyVoices.find(voice => 
          voice.name.includes('Google US English') ||
          voice.name.includes('Microsoft David') ||
          voice.name.includes('Male') ||
          voice.localService // Prefer local voices for offline reliability
        ) || englishOnlyVoices[0];
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
          console.log('✅ Using verified English voice:', preferredVoice.name, 'Lang:', preferredVoice.lang);
        } else {
          console.warn('⚠️ No English voice found, forcing en-US language');
        }
        
        // Additional safeguard: verify no French voice selected
        if (utterance.voice && utterance.voice.lang.includes('fr')) {
          utterance.voice = null; // Clear French voice
          utterance.lang = 'en-US'; // Force English
          console.warn('🚨 Blocked French voice, using system default with English language');
        }
        
        speechSynthesis.speak(utterance);
      }
      
      onExampleClick?.(example);
    } catch (error) {
      console.error('Visual example audio error:', error);
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 rounded-xl p-6 mb-6" style={{ pointerEvents: 'auto', zIndex: 40 }}>
      {title && (
        <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">{title}</h4>
      )}
      <div className={`grid ${gridClass} gap-4`}>
        {examples.map((example, index) => (
          <motion.div
            key={index}
            className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-niger-gold relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleExampleClick(example)}
            style={{ pointerEvents: 'auto', zIndex: 50 }}
          >
            {/* Audio indicator */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Volume2 className="w-4 h-4 text-blue-500" />
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-3">{example.emoji}</div>
              <p className="font-bold text-lg text-gray-800 mb-1">{example.english}</p>
              <p className="text-sm text-gray-600 italic">{example.french}</p>
              {example.hausa && (
                <p className="text-sm text-orange-600 italic">{example.hausa}</p>
              )}
              {example.pronunciation && (
                <p className="text-sm text-blue-600 mt-1">/{example.pronunciation}/</p>
              )}
              <p className="text-sm text-green-600 mt-2 opacity-75">Click to hear!</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Complete alphabet examples for Module 1 with proper translations
export const ALPHABET_EXAMPLES: VisualExample[] = [
  { emoji: "🍎", english: "A is for Apple", french: "A comme Pomme", hausa: "A kamar Tuffa", pronunciation: "æpəl" },
  { emoji: "🏀", english: "B is for Ball", french: "B comme Balle", hausa: "B kamar Kwallon", pronunciation: "bɔːl" },
  { emoji: "🐱", english: "C is for Cat", french: "C comme Chat", hausa: "C kamar Kyanwa", pronunciation: "kæt" },
  { emoji: "🐕", english: "D is for Dog", french: "D comme Chien", hausa: "D kamar Kare", pronunciation: "dɔːɡ" },
  { emoji: "🐘", english: "E is for Elephant", french: "E comme Éléphant", hausa: "E kamar Giwa", pronunciation: "ˈeləfənt" },
  { emoji: "🐠", english: "F is for Fish", french: "F comme Poisson", hausa: "F kamar Kifi", pronunciation: "fɪʃ" },
  { emoji: "🐐", english: "G is for Goat", french: "G comme Chèvre", hausa: "G kamar Akuya", pronunciation: "ɡoʊt" },
  { emoji: "🏠", english: "H is for House", french: "H comme Maison", hausa: "H kamar Gida", pronunciation: "haʊs" },
  { emoji: "🧊", english: "I is for Ice", french: "I comme Glace", hausa: "I kamar Kankara", pronunciation: "aɪs" },
  { emoji: "🦘", english: "J is for Jump", french: "J comme Sauter", hausa: "J kamar Tsalle", pronunciation: "dʒʌmp" },
  { emoji: "🔑", english: "K is for Key", french: "K comme Clé", hausa: "K kamar Mabuɗi", pronunciation: "kiː" },
  { emoji: "🦁", english: "L is for Lion", french: "L comme Lion", hausa: "L kamar Zaki", pronunciation: "ˈlaɪən" },
  { emoji: "🌙", english: "M is for Moon", french: "M comme Lune", hausa: "M kamar Wata", pronunciation: "muːn" },
  { emoji: "🪺", english: "N is for Nest", french: "N comme Nid", hausa: "N kamar Sheƙa", pronunciation: "nest" },
  { emoji: "🍊", english: "O is for Orange", french: "O comme Orange", hausa: "O kamar Lemu", pronunciation: "ˈɔːrɪndʒ" },
  { emoji: "🖊️", english: "P is for Pen", french: "P comme Stylo", hausa: "P kamar Alƙalami", pronunciation: "pen" },
  { emoji: "👸", english: "Q is for Queen", french: "Q comme Reine", hausa: "Q kamar Sarauniya", pronunciation: "kwiːn" },
  { emoji: "🌧️", english: "R is for Rain", french: "R comme Pluie", hausa: "R kamar Ruwa", pronunciation: "reɪn" },
  { emoji: "☀️", english: "S is for Sun", french: "S comme Soleil", hausa: "S kamar Rana", pronunciation: "sʌn" },
  { emoji: "🌳", english: "T is for Tree", french: "T comme Arbre", hausa: "T kamar Itace", pronunciation: "triː" },
  { emoji: "☂️", english: "U is for Umbrella", french: "U comme Parapluie", hausa: "U kamar Laima", pronunciation: "ʌmˈbrelə" },
  { emoji: "🏘️", english: "V is for Village", french: "V comme Village", hausa: "V kamar Ƙauye", pronunciation: "ˈvɪlɪdʒ" },
  { emoji: "💧", english: "W is for Water", french: "W comme Eau", hausa: "W kamar Ruwa", pronunciation: "ˈwɔːtər" },
  { emoji: "📦", english: "X is for Box", french: "X comme Boîte", hausa: "X kamar Akwati", pronunciation: "bɑːks" },
  { emoji: "💛", english: "Y is for Yellow", french: "Y comme Jaune", hausa: "Y kamar Rawaya", pronunciation: "ˈjeloʊ" },
  { emoji: "🦓", english: "Z is for Zebra", french: "Z comme Zèbre", hausa: "Z kamar Zebra", pronunciation: "ˈziːbrə" }
];

// Numbers with visual examples including Hausa
export const NUMBERS_EXAMPLES: VisualExample[] = [
  { emoji: "1️⃣", english: "One", french: "Un", hausa: "🇳🇪 Ɗaya", pronunciation: "wʌn" },
  { emoji: "2️⃣", english: "Two", french: "Deux", hausa: "🇳🇪 Biyu", pronunciation: "tuː" },
  { emoji: "3️⃣", english: "Three", french: "Trois", hausa: "🇳🇪 Uku", pronunciation: "θriː" },
  { emoji: "4️⃣", english: "Four", french: "Quatre", hausa: "🇳🇪 Huɗu", pronunciation: "fɔːr" },
  { emoji: "5️⃣", english: "Five", french: "Cinq", hausa: "🇳🇪 Biyar", pronunciation: "faɪv" },
  { emoji: "6️⃣", english: "Six", french: "Six", hausa: "🇳🇪 Shida", pronunciation: "sɪks" },
  { emoji: "7️⃣", english: "Seven", french: "Sept", hausa: "🇳🇪 Bakwai", pronunciation: "ˈsevən" },
  { emoji: "8️⃣", english: "Eight", french: "Huit", hausa: "🇳🇪 Takwas", pronunciation: "eɪt" },
  { emoji: "9️⃣", english: "Nine", french: "Neuf", hausa: "🇳🇪 Tara", pronunciation: "naɪn" },
  { emoji: "🔟", english: "Ten", french: "Dix", hausa: "🇳🇪 Goma", pronunciation: "ten" },
  { emoji: "1️⃣1️⃣", english: "Eleven", french: "Onze", hausa: "🇳🇪 Goma sha ɗaya", pronunciation: "ɪˈlevən" },
  { emoji: "1️⃣2️⃣", english: "Twelve", french: "Douze", hausa: "🇳🇪 Goma sha biyu", pronunciation: "twelv" },
  { emoji: "1️⃣3️⃣", english: "Thirteen", french: "Treize", hausa: "🇳🇪 Goma sha uku", pronunciation: "θɜːrˈtiːn" },
  { emoji: "1️⃣4️⃣", english: "Fourteen", french: "Quatorze", hausa: "🇳🇪 Goma sha huɗu", pronunciation: "fɔːrˈtiːn" },
  { emoji: "1️⃣5️⃣", english: "Fifteen", french: "Quinze", hausa: "🇳🇪 Goma sha biyar", pronunciation: "fɪfˈtiːn" },
  { emoji: "1️⃣6️⃣", english: "Sixteen", french: "Seize", hausa: "🇳🇪 Goma sha shida", pronunciation: "sɪksˈtiːn" },
  { emoji: "1️⃣7️⃣", english: "Seventeen", french: "Dix-sept", hausa: "🇳🇪 Goma sha bakwai", pronunciation: "sevənˈtiːn" },
  { emoji: "1️⃣8️⃣", english: "Eighteen", french: "Dix-huit", hausa: "🇳🇪 Goma sha takwas", pronunciation: "eɪˈtiːn" },
  { emoji: "1️⃣9️⃣", english: "Nineteen", french: "Dix-neuf", hausa: "🇳🇪 Goma sha tara", pronunciation: "naɪnˈtiːn" },
  { emoji: "2️⃣0️⃣", english: "Twenty", french: "Vingt", hausa: "🇳🇪 Ashirin", pronunciation: "ˈtwenti" }
];

// Greetings examples for Module 2 with Hausa
export const GREETINGS_EXAMPLES: VisualExample[] = [
  { emoji: "👋", english: "Hello", french: "Bonjour", hausa: "🇳🇪 Sannu", pronunciation: "həˈloʊ" },
  { emoji: "🌅", english: "Good morning", french: "Bonjour", hausa: "🇳🇪 Barka da safe", pronunciation: "ɡʊd ˈmɔːrnɪŋ" },
  { emoji: "🌞", english: "Good afternoon", french: "Bon après-midi", hausa: "🇳🇪 Barka da rana", pronunciation: "ɡʊd ˌæftərˈnuːn" },
  { emoji: "🌙", english: "Good evening", french: "Bonsoir", hausa: "🇳🇪 Barka da yamma", pronunciation: "ɡʊd ˈiːvnɪŋ" },
  { emoji: "😴", english: "Good night", french: "Bonne nuit", hausa: "🇳🇪 Barka da dare", pronunciation: "ɡʊd naɪt" },
  { emoji: "👋", english: "Goodbye", french: "Au revoir", hausa: "🇳🇪 Sai anjima", pronunciation: "ɡʊdˈbaɪ" },
  { emoji: "👋", english: "See you later", french: "À plus tard", hausa: "🇳🇪 Sai gobe", pronunciation: "siː juː ˈleɪtər" },
  { emoji: "🙏", english: "Nice to meet you", french: "Ravi de vous rencontrer", hausa: "🇳🇪 Na ji daɗin saduwa da kai", pronunciation: "naɪs tuː miːt juː" }
];

// Family examples for Module 3 with Hausa
export const FAMILY_EXAMPLES: VisualExample[] = [
  { emoji: "👨", english: "Father", french: "Père", hausa: "🇳🇪 Uba", pronunciation: "ˈfɑːðər" },
  { emoji: "👩", english: "Mother", french: "Mère", hausa: "🇳🇪 Uwa", pronunciation: "ˈmʌðər" },
  { emoji: "👦", english: "Son", french: "Fils", hausa: "🇳🇪 Dan", pronunciation: "sʌn" },
  { emoji: "👧", english: "Daughter", french: "Fille", hausa: "🇳🇪 'Yar", pronunciation: "ˈdɔːtər" },
  { emoji: "👴", english: "Grandfather", french: "Grand-père", hausa: "🇳🇪 Kaka", pronunciation: "ˈɡrænfɑːðər" },
  { emoji: "👵", english: "Grandmother", french: "Grand-mère", hausa: "🇳🇪 Kaka", pronunciation: "ˈɡrænmʌðər" },
  { emoji: "👨‍👦", english: "Brother", french: "Frère", hausa: "🇳🇪 Dan'uwa", pronunciation: "ˈbrʌðər" },
  { emoji: "👩‍👧", english: "Sister", french: "Sœur", hausa: "🇳🇪 'Yar'uwa", pronunciation: "ˈsɪstər" }
];

// Colors and shapes for Module 4 with Hausa
export const COLORS_EXAMPLES: VisualExample[] = [
  { emoji: "🔴", english: "Red", french: "Rouge", hausa: "🇳🇪 Ja", pronunciation: "red" },
  { emoji: "🔵", english: "Blue", french: "Bleu", hausa: "🇳🇪 Shuɗi", pronunciation: "bluː" },
  { emoji: "🟡", english: "Yellow", french: "Jaune", hausa: "🇳🇪 Rawaya", pronunciation: "ˈjeloʊ" },
  { emoji: "🟢", english: "Green", french: "Vert", hausa: "🇳🇪 Kore", pronunciation: "ɡriːn" },
  { emoji: "🟠", english: "Orange", french: "Orange", hausa: "🇳🇪 Lemu", pronunciation: "ˈɔːrɪndʒ" },
  { emoji: "🟣", english: "Purple", french: "Violet", hausa: "🇳🇪 Shunayya", pronunciation: "ˈpɜːrpəl" },
  { emoji: "⚫", english: "Black", french: "Noir", hausa: "🇳🇪 Baƙi", pronunciation: "blæk" },
  { emoji: "⚪", english: "White", french: "Blanc", hausa: "🇳🇪 Fari", pronunciation: "waɪt" }
];

export const SHAPES_EXAMPLES: VisualExample[] = [
  { emoji: "🔵", english: "Circle", french: "Cercle", hausa: "🇳🇪 Da'ira", pronunciation: "ˈsɜːrkəl" },
  { emoji: "🔲", english: "Square", french: "Carré", hausa: "🇳🇪 Murabba'i", pronunciation: "skwer" },
  { emoji: "🔺", english: "Triangle", french: "Triangle", hausa: "🇳🇪 Kusurwa uku", pronunciation: "ˈtraɪæŋɡəl" },
  { emoji: "🔶", english: "Diamond", french: "Diamant", hausa: "🇳🇪 Lu'ulu'u", pronunciation: "ˈdaɪəmənd" }
];