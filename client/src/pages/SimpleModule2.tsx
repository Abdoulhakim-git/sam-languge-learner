import { useState } from "react";
import { Link } from "wouter";

export default function SimpleModule2() {
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

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #e3f2fd, #bbdefb)', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <Link href="/modules">
            <button style={{
              background: 'white',
              border: '2px solid #2196f3',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              ← Back to Modules
            </button>
          </Link>
          <h1 style={{ color: '#1565c0', margin: 0, fontSize: '2rem' }}>
            Module 2: Greetings & Introductions
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
              background: currentPart === 1 ? '#2196f3' : 'white',
              color: currentPart === 1 ? 'white' : '#2196f3',
              border: '2px solid #2196f3'
            }}
          >
            Part 1: Greetings
          </button>
          <button
            onClick={() => setCurrentPart(2)}
            style={{
              padding: '15px 30px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              background: currentPart === 2 ? '#2196f3' : 'white',
              color: currentPart === 2 ? 'white' : '#2196f3',
              border: '2px solid #2196f3'
            }}
          >
            Part 2: Introductions
          </button>
        </div>

        {/* Part 1: Greetings */}
        {currentPart === 1 && (
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#1565c0', marginBottom: '20px' }}>Part 1: Basic Greetings</h2>
            
            {/* Introduction */}
            <div style={{ 
              background: '#e3f2fd', 
              padding: '20px', 
              borderRadius: '10px', 
              marginBottom: '30px',
              border: '2px solid #2196f3'
            }}>
              <h3>Learn How to Greet People!</h3>
              <p>Greetings are the first words we say when we meet someone. Let's learn basic greetings for different times of day.</p>
              <button
                onClick={() => playAudio("Welcome to Module 2! Today we will learn greetings and introductions. Greetings are very important because they help us be polite and friendly with other people.")}
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

            {/* Greetings Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              {[
                { greeting: 'Good Morning', time: '🌅', response: 'Good Morning!', french: 'Bonjour' },
                { greeting: 'Good Afternoon', time: '☀️', response: 'Good Afternoon!', french: 'Bon après-midi' },
                { greeting: 'Good Evening', time: '🌆', response: 'Good Evening!', french: 'Bonsoir' },
                { greeting: 'Good Night', time: '🌙', response: 'Good Night!', french: 'Bonne nuit' },
                { greeting: 'Hello', time: '👋', response: 'Hello!', french: 'Salut' },
                { greeting: 'Hi', time: '😊', response: 'Hi!', french: 'Salut' }
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={() => playAudio(`${item.greeting}! When someone says ${item.greeting}, you can reply ${item.response} In French we say ${item.french}.`)}
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
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>{item.time}</div>
                  <h3 style={{ color: '#333', margin: '10px 0' }}>{item.greeting}</h3>
                  <p style={{ color: '#666', margin: '5px 0' }}>Reply: {item.response}</p>
                  <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>French: {item.french}</p>
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
              <h3>Practice: Click each greeting to hear Teacher Sam!</h3>
              <button
                onClick={() => playAudio("Great job learning greetings! Remember to be polite and friendly. Use Good Morning in the morning, Good Afternoon during the day, and Good Evening at night!")}
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

        {/* Part 2: Introductions */}
        {currentPart === 2 && (
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#1565c0', marginBottom: '20px' }}>Part 2: Personal Introductions</h2>
            
            {/* Introduction */}
            <div style={{ 
              background: '#fff3e0', 
              padding: '20px', 
              borderRadius: '10px', 
              marginBottom: '30px',
              border: '2px solid #ff9800'
            }}>
              <h3>Learn to Introduce Yourself!</h3>
              <p>After greeting someone, we often introduce ourselves. Let's learn how to say your name, age, and where you're from.</p>
              <button
                onClick={() => playAudio("Now let's learn introductions! When you meet someone new, you can tell them your name, your age, and where you live. This helps people know more about you.")}
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

            {/* Introduction Examples */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              {[
                { 
                  question: 'What is your name?', 
                  answer: 'My name is...', 
                  example: 'My name is Ahmed.',
                  french: 'Je m\'appelle...'
                },
                { 
                  question: 'How old are you?', 
                  answer: 'I am ... years old', 
                  example: 'I am 12 years old.',
                  french: 'J\'ai ... ans'
                },
                { 
                  question: 'Where are you from?', 
                  answer: 'I am from...', 
                  example: 'I am from Niger.',
                  french: 'Je viens de...'
                },
                { 
                  question: 'Where do you live?', 
                  answer: 'I live in...', 
                  example: 'I live in Niamey.',
                  french: 'J\'habite à...'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={() => playAudio(`${item.question} You can answer: ${item.answer} For example: ${item.example}`)}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    border: '2px solid #eee',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <h4 style={{ color: '#1565c0', margin: '0 0 10px 0' }}>Q: {item.question}</h4>
                  <p style={{ color: '#333', margin: '5px 0', fontWeight: 'bold' }}>A: {item.answer}</p>
                  <p style={{ color: '#666', margin: '5px 0', fontStyle: 'italic' }}>Example: {item.example}</p>
                  <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>French: {item.french}</p>
                </div>
              ))}
            </div>

            {/* Complete Dialogue Example */}
            <div style={{ 
              background: '#f3e5f5', 
              padding: '20px', 
              borderRadius: '10px',
              marginBottom: '20px',
              border: '2px solid #9c27b0'
            }}>
              <h3>Complete Conversation Example:</h3>
              <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
                <p><strong>Person A:</strong> "Good morning!"</p>
                <p><strong>Person B:</strong> "Good morning!"</p>
                <p><strong>Person A:</strong> "What is your name?"</p>
                <p><strong>Person B:</strong> "My name is Fatima. What is your name?"</p>
                <p><strong>Person A:</strong> "My name is Omar. How old are you?"</p>
                <p><strong>Person B:</strong> "I am 10 years old. Where are you from?"</p>
                <p><strong>Person A:</strong> "I am from Niger. Nice to meet you!"</p>
                <p><strong>Person B:</strong> "Nice to meet you too!"</p>
              </div>
              <button
                onClick={() => playAudio("Here is a complete conversation. Person A says Good morning. Person B says Good morning. Person A asks What is your name? Person B says My name is Fatima. They continue talking and become friends!")}
                style={{
                  background: '#9c27b0',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '15px'
                }}
              >
                Hear Full Conversation
              </button>
            </div>

            {/* Practice */}
            <div style={{ 
              background: '#e3f2fd', 
              padding: '20px', 
              borderRadius: '10px',
              border: '2px solid #2196f3'
            }}>
              <h3>Practice: Click each question to practice answers!</h3>
              <button
                onClick={() => playAudio("Wonderful! Now you know how to greet people and introduce yourself. Practice with your family and friends. You completed Module 2 perfectly!")}
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
                Complete Module 2 ✓
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