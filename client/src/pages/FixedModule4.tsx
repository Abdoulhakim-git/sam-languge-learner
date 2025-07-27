import { useState } from "react";
import { Link } from "wouter";

export default function FixedModule4() {
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
      background: 'linear-gradient(to bottom right, #fff3e0, #ffecb3)', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <Link href="/modules">
            <button style={{
              background: 'white',
              border: '2px solid #ff9800',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              ← Back to Modules
            </button>
          </Link>
          <h1 style={{ color: '#e65100', margin: 0, fontSize: '2rem' }}>
            Module 4: Colors & Shapes
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
              background: currentPart === 1 ? '#ff9800' : 'white',
              color: currentPart === 1 ? 'white' : '#ff9800',
              border: '2px solid #ff9800'
            }}
          >
            Part 1: Colors
          </button>
          <button
            onClick={() => setCurrentPart(2)}
            style={{
              padding: '15px 30px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              background: currentPart === 2 ? '#ff9800' : 'white',
              color: currentPart === 2 ? 'white' : '#ff9800',
              border: '2px solid #ff9800'
            }}
          >
            Part 2: Shapes
          </button>
        </div>

        {/* Part 1: Colors */}
        {currentPart === 1 && (
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#e65100', marginBottom: '20px' }}>Part 1: Learning Colors</h2>
            
            {/* Introduction */}
            <div style={{ 
              background: '#fff3e0', 
              padding: '20px', 
              borderRadius: '10px', 
              marginBottom: '30px',
              border: '2px solid #ff9800'
            }}>
              <h3>Welcome to Colors!</h3>
              <p>Today we will learn about four beautiful colors: Red, Blue, Yellow, and Green.</p>
              <button
                onClick={() => playAudio("Welcome to Module 4! Today we will learn about colors. Colors make our world beautiful. We will learn red, blue, yellow, and green.")}
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

            {/* Colors Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              {[
                { name: 'Red', color: '#f44336', french: 'Rouge' },
                { name: 'Blue', color: '#2196f3', french: 'Bleu' },
                { name: 'Yellow', color: '#ffeb3b', french: 'Jaune' },
                { name: 'Green', color: '#4caf50', french: 'Vert' }
              ].map((color, index) => (
                <div
                  key={index}
                  onClick={() => playAudio(`${color.name}! This is ${color.name.toLowerCase()}. In French we say ${color.french}.`)}
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
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: color.color,
                    borderRadius: '50%',
                    margin: '0 auto 15px',
                    border: '3px solid #333'
                  }}></div>
                  <h3 style={{ color: '#333', margin: '10px 0' }}>{color.name}</h3>
                  <p style={{ color: '#666', margin: 0 }}>French: {color.french}</p>
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
              <h3>Practice: Click each color to hear Teacher Sam!</h3>
              <button
                onClick={() => playAudio("Excellent work! You learned red like a tomato, blue like the sky, yellow like the sun, and green like grass! Well done!")}
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
                Complete Part 1 ✓
              </button>
            </div>
          </div>
        )}

        {/* Part 2: Shapes */}
        {currentPart === 2 && (
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#e65100', marginBottom: '20px' }}>Part 2: Learning Shapes</h2>
            
            {/* Introduction */}
            <div style={{ 
              background: '#e3f2fd', 
              padding: '20px', 
              borderRadius: '10px', 
              marginBottom: '30px',
              border: '2px solid #2196f3'
            }}>
              <h3>Welcome to Shapes!</h3>
              <p>Now we will learn about shapes: Circle, Square, Triangle, and Rectangle.</p>
              <button
                onClick={() => playAudio("Now let's learn shapes! Shapes are everywhere around us. We will learn circle, square, triangle, and rectangle.")}
                style={{
                  background: '#2196f3',
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

            {/* Shapes Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              {[
                { name: 'Circle', symbol: '⭕', french: 'Cercle' },
                { name: 'Square', symbol: '⬜', french: 'Carré' },
                { name: 'Triangle', symbol: '🔺', french: 'Triangle' },
                { name: 'Rectangle', symbol: '▭', french: 'Rectangle' }
              ].map((shape, index) => (
                <div
                  key={index}
                  onClick={() => playAudio(`${shape.name}! This is a ${shape.name.toLowerCase()}. In French we say ${shape.french}.`)}
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
                  <div style={{ fontSize: '60px', marginBottom: '15px' }}>{shape.symbol}</div>
                  <h3 style={{ color: '#333', margin: '10px 0' }}>{shape.name}</h3>
                  <p style={{ color: '#666', margin: 0 }}>French: {shape.french}</p>
                </div>
              ))}
            </div>

            {/* Practice */}
            <div style={{ 
              background: '#fff3e0', 
              padding: '20px', 
              borderRadius: '10px',
              border: '2px solid #ff9800'
            }}>
              <h3>Practice: Click each shape to hear Teacher Sam!</h3>
              <button
                onClick={() => playAudio("Fantastic! You learned circle like a wheel, square like a window, triangle like a roof, and rectangle like a book! Module 4 complete!")}
                style={{
                  background: '#ff9800',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                Complete Module 4 ✓
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