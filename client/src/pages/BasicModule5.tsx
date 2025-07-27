function BasicModule5() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Module 5: Animals & Nature</h1>
      
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
        <h2>Part 1: Animals</h2>
        <p>Learn about common animals in English.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', margin: '20px 0' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '50px', margin: '10px 0' }}>🐕</div>
            <h3>Dog</h3>
            <p>Sound: Woof! Woof!</p>
            <p>French: Chien</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '50px', margin: '10px 0' }}>🐱</div>
            <h3>Cat</h3>
            <p>Sound: Meow! Meow!</p>
            <p>French: Chat</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '50px', margin: '10px 0' }}>🐦</div>
            <h3>Bird</h3>
            <p>Sound: Tweet! Tweet!</p>
            <p>French: Oiseau</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '50px', margin: '10px 0' }}>🐟</div>
            <h3>Fish</h3>
            <p>Sound: Blub! Blub!</p>
            <p>French: Poisson</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Part 2: Nature</h2>
        <p>Learn about nature elements in English.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', margin: '20px 0' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '50px', margin: '10px 0' }}>🌳</div>
            <h3>Tree</h3>
            <p>Tall and green</p>
            <p>French: Arbre</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '50px', margin: '10px 0' }}>🌸</div>
            <h3>Flower</h3>
            <p>Beautiful and colorful</p>
            <p>French: Fleur</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '50px', margin: '10px 0' }}>☀️</div>
            <h3>Sun</h3>
            <p>Bright and warm</p>
            <p>French: Soleil</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ddd' }}>
            <div style={{ fontSize: '50px', margin: '10px 0' }}>🌙</div>
            <h3>Moon</h3>
            <p>Shines at night</p>
            <p>French: Lune</p>
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
          Module 5 Complete!
        </button>
      </div>
    </div>
  );
}

export default BasicModule5;