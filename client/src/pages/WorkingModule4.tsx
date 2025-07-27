import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Play, VolumeX, Volume2 } from "lucide-react";

export default function WorkingModule4() {
  console.log('🔍 WorkingModule4 component rendering');
  
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

  const colors = [
    { name: "Red", color: "#FF0000", french: "Rouge" },
    { name: "Blue", color: "#0000FF", french: "Bleu" },
    { name: "Yellow", color: "#FFFF00", french: "Jaune" },
    { name: "Green", color: "#008000", french: "Vert" }
  ];

  const shapes = [
    { name: "Circle", symbol: "⭕", french: "Cercle" },
    { name: "Square", symbol: "⬜", french: "Carré" },
    { name: "Triangle", symbol: "🔺", french: "Triangle" },
    { name: "Rectangle", symbol: "▭", french: "Rectangle" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/modules">
            <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white px-4 py-2 rounded-xl shadow-md transition-all duration-300">
              <ArrowLeft className="w-5 h-5" />
              Back to Modules
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Module 4: Colors & Shapes</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setCurrentPart(1)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentPart === 1
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            Part 1: Colors
          </button>
          <button
            onClick={() => setCurrentPart(2)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentPart === 2
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            Part 2: Shapes
          </button>
        </div>

        {/* Part 1: Colors */}
        {currentPart === 1 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Part 1: Learning Colors</h2>
            
            {/* Audio Introduction */}
            <div className="bg-orange-50 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold">🔊 Introduction to Colors</h3>
                <button
                  onClick={() => playAudio("Welcome to Module 4, Part 1! Today we will learn about colors. Colors make our world beautiful and help us describe things around us. Let's start with four basic colors: red, blue, yellow, and green.")}
                  disabled={isPlaying}
                  className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
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
                Welcome to Module 4! In this lesson, you'll learn about basic colors and how to name them in English.
              </p>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => playAudio(`${color.name}! This is the color ${color.name.toLowerCase()}. In French, we say ${color.french}.`)}
                >
                  <div
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200"
                    style={{ backgroundColor: color.color }}
                  ></div>
                  <h3 className="text-xl font-bold text-center text-gray-800">{color.name}</h3>
                  <p className="text-center text-gray-600 mt-2">French: {color.french}</p>
                </div>
              ))}
            </div>

            {/* Practice Activity */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">🎯 Practice: Name the Colors</h3>
              <p className="text-gray-700 mb-4">
                Click on each color above to hear how to pronounce it. Try to repeat after Teacher Sam!
              </p>
              <button
                onClick={() => playAudio("Great job learning colors! Remember: Red like a tomato, Blue like the sky, Yellow like the sun, and Green like grass. Practice saying these colors every day!")}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                🎉 Complete Part 1
              </button>
            </div>
          </div>
        )}

        {/* Part 2: Shapes */}
        {currentPart === 2 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Part 2: Learning Shapes</h2>
            
            {/* Audio Introduction */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold">🔊 Introduction to Shapes</h3>
                <button
                  onClick={() => playAudio("Now let's learn about shapes! Shapes are everywhere around us. We will learn four basic shapes: circle, square, triangle, and rectangle. Look around you and try to find these shapes!")}
                  disabled={isPlaying}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
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
                Shapes help us describe objects and understand the world around us.
              </p>
            </div>

            {/* Shapes Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {shapes.map((shape, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-blue-300"
                  onClick={() => playAudio(`${shape.name}! This is a ${shape.name.toLowerCase()}. In French, we say ${shape.french}.`)}
                >
                  <div className="text-6xl text-center mb-4">{shape.symbol}</div>
                  <h3 className="text-xl font-bold text-center text-gray-800">{shape.name}</h3>
                  <p className="text-center text-gray-600 mt-2">French: {shape.french}</p>
                </div>
              ))}
            </div>

            {/* Practice Activity */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">🎯 Practice: Identify Shapes</h3>
              <p className="text-gray-700 mb-4">
                Click on each shape above to learn how to say it. Look around your room - can you find these shapes?
              </p>
              <button
                onClick={() => playAudio("Excellent work! You learned about circles like wheels, squares like windows, triangles like rooftops, and rectangles like books. You completed Module 4! Well done!")}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                🎉 Complete Module 4
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