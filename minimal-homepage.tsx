import React from "react";
import { Link } from "wouter";

export default function MinimalHomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ff9500, #ffcc00)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#ff9500', marginBottom: '10px' }}>
            🤖 SamLang Niger - Learn English with Teacher Sam
          </h1>
          <p><strong>Local Voice, Global Language</strong></p>
          <div style={{
            background: '#d4edda',
            padding: '15px',
            borderRadius: '8px',
            margin: '20px 0',
            fontWeight: 'bold',
            color: '#155724'
          }}>
            ✅ v3.0.2-AUDIO-COMPLETE - Enhanced Offline English Audio System
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          margin: '30px 0'
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3>🎯 15 Learning Modules</h3>
            <p>Complete curriculum from Alphabet to Advanced Grammar</p>
          </div>
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3>🔊 English-Only Audio</h3>
            <p>Works offline with guaranteed English voices</p>
          </div>
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3>🌍 Niger Cultural Themes</h3>
            <p>Authentic local context for better learning</p>
          </div>
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3>📱 Offline Capability</h3>
            <p>Learn without internet connection</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <Link href="/modules">
            <button style={{
              background: '#ff9500',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '10px'
            }}>
              🚀 Start Learning (15 Modules)
            </button>
          </Link>
          <Link href="/offline-audio-test">
            <button style={{
              background: '#2196F3',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '10px'
            }}>
              🔊 Test Audio System
            </button>
          </Link>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <h3>Quick Module Access:</h3>
          <Link href="/module/1">
            <button style={{
              background: '#2196F3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              margin: '5px'
            }}>
              Module 1: Alphabet
            </button>
          </Link>
          <Link href="/module/2">
            <button style={{
              background: '#2196F3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              margin: '5px'
            }}>
              Module 2: Greetings
            </button>
          </Link>
          <Link href="/module/13">
            <button style={{
              background: '#2196F3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              margin: '5px'
            }}>
              Module 13: Past Tense
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}