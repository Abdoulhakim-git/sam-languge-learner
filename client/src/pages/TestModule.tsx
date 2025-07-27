import React from "react";

export default function TestModule() {
  return (
    <div style={{ 
      padding: "20px", 
      background: "#f0f0f0", 
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ color: "#333", textAlign: "center" }}>TEST MODULE</h1>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "20px auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ color: "#28a745" }}>✅ React Component Working</h2>
        <p>This is a minimal test module to verify React rendering is working.</p>
        
        <div style={{ margin: "20px 0" }}>
          <h3>Test Elements:</h3>
          <ul>
            <li>Basic HTML rendering: ✅</li>
            <li>CSS styling: ✅</li>
            <li>React component mounting: ✅</li>
          </ul>
        </div>
        
        <div style={{
          background: "#e7f5e7",
          padding: "15px",
          borderRadius: "5px",
          border: "1px solid #28a745"
        }}>
          <strong>SUCCESS:</strong> If you can see this page, React rendering is working correctly.
        </div>
        
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a 
            href="/modules" 
            style={{
              background: "#007bff",
              color: "white",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",
              display: "inline-block"
            }}
          >
            ← Back to Modules
          </a>
        </div>
      </div>
    </div>
  );
}