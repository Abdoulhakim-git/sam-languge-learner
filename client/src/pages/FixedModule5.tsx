import { useState } from "react";
import { Link } from "wouter";

export default function FixedModule5() {
  const [currentPart, setCurrentPart] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (text: string) => {
    setIsPlaying(true);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
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

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #e8f5e8, #c8e6c8)', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <Link href="/modules">
            <button style={{
              background: 'white',
              border: '2px solid #4caf50',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              ← Back to Modules
            </button>
          </Link>
          <h1 style={{ color: '#2e7d32', margin: 0, fontSize: '2rem' }}>
            Module 5: Animals & Nature
          </h1>
        </div>

        {/* Part Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <button
            onClick={() => setCurrentPart(1)}
            style={{
              padding: '15px 30px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              background: currentPart === 1 ? '#4caf50' : 'white',
              color: currentPart === 1 ? 'white' : '#4caf50',
              border: '2px solid #4caf50'
            }}
          >
            Part 1: Animals
          </button>
          <button
            onClick={() => setCurrentPart(2)}
            style={{
              padding: '15px 30px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              background: currentPart === 2 ? '#4caf50' : 'white',
              color: currentPart === 2 ? 'white' : '#4caf50',
              border: '2px solid #4caf50'
            }}
          >
            Part 2: Nature
          </button>
        </div>

        {/* Part 1: Animals */}
        {currentPart === 1 && (
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#2e7d32', marginBottom: '20px' }}>Part 1: Learning About Animals</h2>
            
            {/* Introduction */}
            <div style={{ 
              background: '#e8f5e8', 
              padding: '20px', 
              borderRadius: '10px', 
              marginBottom: '30px',
              border: '2px solid #4caf50'
            }}>
              <h3>Welcome to Animals!</h3>
              <p>Today we will learn about animals: Dog, Cat, Bird, and Fish. Each animal makes different sounds!</p>
              <button
                onClick={() => playAudio("Welcome to Module 5! Today we will learn about animals. Animals are our friends and they live all around us. We will learn about dog, cat, bird, and fish.")}
                style={{
                  background: '#4caf50',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {isPlaying ? 'Playing...' : 'Play Introduction'}
              </button>
              {isPlaying && (
                <button
                  onClick={stopAudio}
                  style={{
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginLeft: '10px'
                  }}
                >
                  Stop
                </button>
              )}
            </div>

            {/* Animals Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              {[
                { name: 'Dog', emoji: '🐕', sound: 'Woof! Woof!', french: 'Chien' },
                { name: 'Cat', emoji: '🐱', sound: 'Meow! Meow!', french: 'Chat' },
                { name: 'Bird', emoji: '🐦', sound: 'Tweet! Tweet!', french: 'Oiseau' },
                { name: 'Fish', emoji: '🐟', sound: 'Blub! Blub!', french: 'Poisson' }
              ].map((animal, index) => (
                <div
                  key={index}
                  onClick={() => playAudio(`${animal.name}! This is a ${animal.name.toLowerCase()}. A ${animal.name.toLowerCase()} says ${animal.sound} In French we say ${animal.french}.`)}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '15px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    border: '2px solid #eee',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ fontSize: '60px', marginBottom: '15px' }}>{animal.emoji}</div>
                  <h3 style={{ color: '#333', margin: '10px 0' }}>{animal.name}</h3>
                  <p style={{ color: '#666', margin: '5px 0' }}>{animal.sound}</p>
                  <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>French: {animal.french}</p>
                </div>
              ))}
            </div>

            {/* Practice */}
            <div style={{ 
              background: '#e3f2fd', 
              padding: '20px', 
              borderRadius: '10px',
              border: '2px solid #2196f3'
            }}>
              <h3>Practice: Click each animal to hear their sounds!</h3>
              <button
                onClick={() => playAudio("Wonderful! You learned about dogs that say woof, cats that say meow, birds that say tweet, and fish that live in water. Animals are amazing!")}
                style={{
                  background: '#2196f3',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                Complete Part 1 ✓
              </button>
            </div>
          </div>
        )}

        {/* Part 2: Nature */}
        {currentPart === 2 && (
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#2e7d32', marginBottom: '20px' }}>Part 2: Learning About Nature</h2>
            
            {/* Introduction */}
            <div style={{ 
              background: '#fff3e0', 
              padding: '20px', 
              borderRadius: '10px', 
              marginBottom: '30px',
              border: '2px solid #ff9800'
            }}>
              <h3>Welcome to Nature!</h3>
              <p>Now we will explore nature: Tree, Flower, Sun, and Moon. Nature gives us everything we need!</p>
              <button
                onClick={() => playAudio("Now let's explore nature! Nature is all around us. We will learn about tree, flower, sun, and moon. Nature gives us clean air and beautiful colors.")}
                style={{
                  background: '#ff9800',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {isPlaying ? 'Playing...' : 'Play Introduction'}
              </button>
            </div>

            {/* Nature Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              {[
                { name: 'Tree', emoji: '🌳', description: 'Tall and green', french: 'Arbre' },
                { name: 'Flower', emoji: '🌸', description: 'Beautiful and colorful', french: 'Fleur' },
                { name: 'Sun', emoji: '☀️', description: 'Bright and warm', french: 'Soleil' },
                { name: 'Moon', emoji: '🌙', description: 'Shines at night', french: 'Lune' }
              ].map((nature, index) => (
                <div
                  key={index}
                  onClick={() => playAudio(`${nature.name}! This is a ${nature.name.toLowerCase()}. A ${nature.name.toLowerCase()} is ${nature.description}. In French we say ${nature.french}.`)}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '15px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    border: '2px solid #eee',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ fontSize: '60px', marginBottom: '15px' }}>{nature.emoji}</div>
                  <h3 style={{ color: '#333', margin: '10px 0' }}>{nature.name}</h3>
                  <p style={{ color: '#666', margin: '5px 0' }}>{nature.description}</p>
                  <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>French: {nature.french}</p>
                </div>
              ))}
            </div>

            {/* Practice */}
            <div style={{ 
              background: '#e8f5e8', 
              padding: '20px', 
              borderRadius: '10px',
              border: '2px solid #4caf50'
            }}>
              <h3>Practice: Click each nature item to learn about it!</h3>
              <button
                onClick={() => playAudio("Fantastic work! You learned about tall trees, beautiful flowers, the bright sun, and the glowing moon. Nature is amazing! You completed Module 5 perfectly!")}
                style={{
                  background: '#4caf50',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                Complete Module 5 ✓
              </button>
            </div>
          </div>
        )}

        {/* Return Button */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link href="/modules">
            <button style={{
              background: '#2196f3',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              borderRadius: '15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              Return to All Modules
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}