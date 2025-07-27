function BasicModule4() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Module 4: Colors & Shapes</h1>
      
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
        <h2>Part 1: Colors</h2>
        <p>Learn about basic colors in English.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', margin: '20px 0' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ width: '60px', height: '60px', background: 'red', borderRadius: '50%', margin: '0 auto 10px' }}></div>
            <h3>Red</h3>
            <p>French: Rouge</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ width: '60px', height: '60px', background: 'blue', borderRadius: '50%', margin: '0 auto 10px' }}></div>
            <h3>Blue</h3>
            <p>French: Bleu</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ width: '60px', height: '60px', background: 'yellow', borderRadius: '50%', margin: '0 auto 10px' }}></div>
            <h3>Yellow</h3>
            <p>French: Jaune</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ width: '60px', height: '60px', background: 'green', borderRadius: '50%', margin: '0 auto 10px' }}></div>
            <h3>Green</h3>
            <p>French: Vert</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Part 2: Shapes</h2>
        <p>Learn about basic shapes in English.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', margin: '20px 0' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '40px', margin: '10px 0' }}>⭕</div>
            <h3>Circle</h3>
            <p>French: Cercle</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '40px', margin: '10px 0' }}>⬜</div>
            <h3>Square</h3>
            <p>French: Carré</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '40px', margin: '10px 0' }}>🔺</div>
            <h3>Triangle</h3>
            <p>French: Triangle</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '40px', margin: '10px 0' }}>▭</div>
            <h3>Rectangle</h3>
            <p>French: Rectangle</p>
          </div>
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
          Module 4 Complete!
        </button>
      </div>
    </div>
  );
}

export default BasicModule4;