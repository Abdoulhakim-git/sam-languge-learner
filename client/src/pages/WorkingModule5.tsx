import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Play, VolumeX, Volume2 } from "lucide-react";

export default function WorkingModule5() {
  console.log('🔍 WorkingModule5 component rendering');
  
  const [currentPart, setCurrentPart] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (text: string) => {
    setIsPlaying(true);
    
    // Use browser's built-in speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
      // Find a good English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') && (voice.name.includes('Google') || voice.name.includes('Microsoft'))
      ) || voices.find(voice => voice.lang.startsWith('en'));
      
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const animals = [
    { name: "Dog", emoji: "🐕", sound: "Woof! Woof!", french: "Chien" },
    { name: "Cat", emoji: "🐱", sound: "Meow! Meow!", french: "Chat" },
    { name: "Bird", emoji: "🐦", sound: "Tweet! Tweet!", french: "Oiseau" },
    { name: "Fish", emoji: "🐟", sound: "Blub! Blub!", french: "Poisson" }
  ];

  const nature = [
    { name: "Tree", emoji: "🌳", description: "Tall and green", french: "Arbre" },
    { name: "Flower", emoji: "🌸", description: "Beautiful and colorful", french: "Fleur" },
    { name: "Sun", emoji: "☀️", description: "Bright and warm", french: "Soleil" },
    { name: "Moon", emoji: "🌙", description: "Shines at night", french: "Lune" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/modules">
            <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white px-4 py-2 rounded-xl shadow-md transition-all duration-300">
              <ArrowLeft className="w-5 h-5" />
              Back to Modules
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Module 5: Animals & Nature</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setCurrentPart(1)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentPart === 1
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            Part 1: Animals
          </button>
          <button
            onClick={() => setCurrentPart(2)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentPart === 2
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            Part 2: Nature
          </button>
        </div>

        {/* Part 1: Animals */}
        {currentPart === 1 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Part 1: Learning About Animals</h2>
            
            {/* Audio Introduction */}
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold">🔊 Introduction to Animals</h3>
                <button
                  onClick={() => playAudio("Welcome to Module 5, Part 1! Today we will learn about animals. Animals are our friends and they live all around us. We will learn about four common animals: dog, cat, bird, and fish. Each animal makes different sounds!")}
                  disabled={isPlaying}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {isPlaying ? <VolumeX className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Playing...' : 'Play Introduction'}
                </button>
                {isPlaying && (
                  <button
                    onClick={stopAudio}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    Stop
                  </button>
                )}
              </div>
              <p className="text-gray-700">
                Animals are wonderful creatures that share our world. Let's learn their names and sounds!
              </p>
            </div>

            {/* Animals Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {animals.map((animal, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-green-200 hover:border-green-400"
                  onClick={() => playAudio(`${animal.name}! This is a ${animal.name.toLowerCase()}. A ${animal.name.toLowerCase()} says ${animal.sound} In French, we say ${animal.french}.`)}
                >
                  <div className="text-6xl text-center mb-4">{animal.emoji}</div>
                  <h3 className="text-xl font-bold text-center text-gray-800">{animal.name}</h3>
                  <p className="text-center text-gray-600 mt-2">{animal.sound}</p>
                  <p className="text-center text-gray-500 text-sm mt-1">French: {animal.french}</p>
                </div>
              ))}
            </div>

            {/* Practice Activity */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">🎯 Practice: Animal Sounds</h3>
              <p className="text-gray-700 mb-4">
                Click on each animal to hear their name and sound. Can you make the same sounds?
              </p>
              <button
                onClick={() => playAudio("Wonderful! You learned about dogs that say woof, cats that say meow, birds that say tweet, and fish that live in water. Animals are amazing friends!")}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                🎉 Complete Part 1
              </button>
            </div>
          </div>
        )}

        {/* Part 2: Nature */}
        {currentPart === 2 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Part 2: Learning About Nature</h2>
            
            {/* Audio Introduction */}
            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold">🔊 Introduction to Nature</h3>
                <button
                  onClick={() => playAudio("Now let's explore nature! Nature is all around us. We will learn about four beautiful things in nature: tree, flower, sun, and moon. Nature gives us clean air, beautiful colors, and light!")}
                  disabled={isPlaying}
                  className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
                >
                  {isPlaying ? <VolumeX className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Playing...' : 'Play Introduction'}
                </button>
                {isPlaying && (
                  <button
                    onClick={stopAudio}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    Stop
                  </button>
                )}
              </div>
              <p className="text-gray-700">
                Nature provides us with everything we need to live and grow.
              </p>
            </div>

            {/* Nature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {nature.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-yellow-200 hover:border-yellow-400"
                  onClick={() => playAudio(`${item.name}! This is a ${item.name.toLowerCase()}. A ${item.name.toLowerCase()} is ${item.description}. In French, we say ${item.french}.`)}
                >
                  <div className="text-6xl text-center mb-4">{item.emoji}</div>
                  <h3 className="text-xl font-bold text-center text-gray-800">{item.name}</h3>
                  <p className="text-center text-gray-600 mt-2">{item.description}</p>
                  <p className="text-center text-gray-500 text-sm mt-1">French: {item.french}</p>
                </div>
              ))}
            </div>

            {/* Practice Activity */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">🎯 Practice: Nature Vocabulary</h3>
              <p className="text-gray-700 mb-4">
                Click on each nature item to learn about it. Look outside your window - can you see any of these?
              </p>
              <button
                onClick={() => playAudio("Fantastic work! You learned about tall trees, beautiful flowers, the bright sun, and the glowing moon. Nature is amazing! You completed Module 5 perfectly!")}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                🎉 Complete Module 5
              </button>
            </div>
          </div>
        )}

        {/* Module Completion */}
        <div className="mt-8 text-center">
          <Link href="/modules">
            <button className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-lg shadow-lg">
              🏠 Return to All Modules
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}