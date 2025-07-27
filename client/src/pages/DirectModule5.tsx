import React from 'react';

const DirectModule5: React.FC = () => {
  React.useEffect(() => {
    console.log('DirectModule5 component mounted');
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#28a745' }}>Direct Module 5 - Animals & Nature</h1>
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h2>Component Status: MOUNTED ✓</h2>
        <p>This is DirectModule5 component. If you can see this text, React routing is working correctly.</p>
        
        <div style={{ margin: '20px 0' }}>
          <h3>Learning Content:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', margin: '10px 0' }}>
            <div style={{ textAlign: 'center', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
              <div style={{ fontSize: '2em' }}>🐕</div>
              <p>Dog</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
              <div style={{ fontSize: '2em' }}>🐱</div>
              <p>Cat</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
              <div style={{ fontSize: '2em' }}>🐦</div>
              <p>Bird</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
              <div style={{ fontSize: '2em' }}>🐟</div>
              <p>Fish</p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', margin: '10px 0' }}>
            <div style={{ textAlign: 'center', padding: '15px', background: '#d4edda', borderRadius: '8px' }}>
              <div style={{ fontSize: '2em' }}>🌳</div>
              <p>Tree</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: '#d4edda', borderRadius: '8px' }}>
              <div style={{ fontSize: '2em' }}>🌸</div>
              <p>Flower</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: '#d4edda', borderRadius: '8px' }}>
              <div style={{ fontSize: '2em' }}>☀️</div>
              <p>Sun</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: '#d4edda', borderRadius: '8px' }}>
              <div style={{ fontSize: '2em' }}>🌙</div>
              <p>Moon</p>
            </div>
          </div>
        </div>
        
        <a href="/modules" style={{ 
          background: '#28a745', 
          color: 'white', 
          padding: '10px 20px', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}>
          ← Back to Modules
        </a>
      </div>
    </div>
  );
};

export default DirectModule5;