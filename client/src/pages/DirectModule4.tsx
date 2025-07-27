import React from 'react';

const DirectModule4: React.FC = () => {
  React.useEffect(() => {
    console.log('DirectModule4 component mounted');
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#007bff' }}>Direct Module 4 - Colors & Shapes</h1>
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h2>Component Status: MOUNTED ✓</h2>
        <p>This is DirectModule4 component. If you can see this text, React routing is working correctly.</p>
        
        <div style={{ margin: '20px 0' }}>
          <h3>Learning Content:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '10px 0' }}>
            <div style={{ background: 'red', padding: '10px', color: 'white', textAlign: 'center' }}>Red</div>
            <div style={{ background: 'blue', padding: '10px', color: 'white', textAlign: 'center' }}>Blue</div>
            <div style={{ background: 'yellow', padding: '10px', color: 'black', textAlign: 'center' }}>Yellow</div>
            <div style={{ background: 'green', padding: '10px', color: 'white', textAlign: 'center' }}>Green</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '10px 0' }}>
            <div style={{ border: '3px solid #333', padding: '20px', textAlign: 'center' }}>⭕ Circle</div>
            <div style={{ border: '3px solid #333', padding: '20px', textAlign: 'center' }}>⬜ Square</div>
            <div style={{ border: '3px solid #333', padding: '20px', textAlign: 'center' }}>🔺 Triangle</div>
            <div style={{ border: '3px solid #333', padding: '20px', textAlign: 'center' }}>▭ Rectangle</div>
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

export default DirectModule4;