import React from 'react';

function BasicModule2() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Module 2: Greetings & Introductions</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <a href="/modules" style={{ 
          background: '#2196f3', 
          color: 'white', 
          padding: '10px 20px', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}>
          ← Back to Modules
        </a>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Part 1: Basic Greetings</h2>
        <p>Learn how to greet people at different times of the day.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', margin: '20px 0' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '40px', margin: '10px 0' }}>🌅</div>
            <h3>Good Morning</h3>
            <p>Use in the morning</p>
            <p>French: Bonjour</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '40px', margin: '10px 0' }}>☀️</div>
            <h3>Good Afternoon</h3>
            <p>Use after 12 PM</p>
            <p>French: Bon après-midi</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '40px', margin: '10px 0' }}>🌆</div>
            <h3>Good Evening</h3>
            <p>Use in the evening</p>
            <p>French: Bonsoir</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '40px', margin: '10px 0' }}>👋</div>
            <h3>Hello / Hi</h3>
            <p>Use anytime</p>
            <p>French: Salut</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Part 2: Personal Introductions</h2>
        <p>Learn how to introduce yourself to others.</p>
        
        <div style={{ background: '#f0f8ff', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
          <h3>Basic Introduction Questions & Answers:</h3>
          <div style={{ margin: '15px 0' }}>
            <p><strong>Q: What is your name?</strong></p>
            <p>A: My name is... (Example: My name is Ahmed)</p>
            <p>French: Je m'appelle...</p>
          </div>
          
          <div style={{ margin: '15px 0' }}>
            <p><strong>Q: How old are you?</strong></p>
            <p>A: I am ... years old (Example: I am 10 years old)</p>
            <p>French: J'ai ... ans</p>
          </div>
          
          <div style={{ margin: '15px 0' }}>
            <p><strong>Q: Where are you from?</strong></p>
            <p>A: I am from... (Example: I am from Niger)</p>
            <p>French: Je viens de...</p>
          </div>
          
          <div style={{ margin: '15px 0' }}>
            <p><strong>Q: Where do you live?</strong></p>
            <p>A: I live in... (Example: I live in Niamey)</p>
            <p>French: J'habite à...</p>
          </div>
        </div>

        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
          <h3>Example Conversation:</h3>
          <p><strong>Person A:</strong> "Good morning!"</p>
          <p><strong>Person B:</strong> "Good morning!"</p>
          <p><strong>Person A:</strong> "What is your name?"</p>
          <p><strong>Person B:</strong> "My name is Fatima. What is your name?"</p>
          <p><strong>Person A:</strong> "My name is Omar. How old are you?"</p>
          <p><strong>Person B:</strong> "I am 10 years old. Where are you from?"</p>
          <p><strong>Person A:</strong> "I am from Niger. Nice to meet you!"</p>
          <p><strong>Person B:</strong> "Nice to meet you too!"</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <button style={{
          background: '#4caf50',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '10px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Module 2 Complete!
        </button>
      </div>
    </div>
  );
}

export default BasicModule2;