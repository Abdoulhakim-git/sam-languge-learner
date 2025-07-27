import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getVersion, getManifest } from "./update-endpoint";
import { getForceVersion } from "./force-version-update";
import { insertProgressSchema, insertAudioCacheSchema } from "@shared/schema";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import AWS from "aws-sdk";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add cache-busting headers for all responses
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Modules-Version', '3.0.0-EXPANDED-15-MODULES');
    next();
  });
  
  // Offline test route
  app.get('/offline-test', (req, res) => {
    const path = require('path');
    res.sendFile(path.join(__dirname, '../offline-test.html'));
  });
  
  // Removed direct HTML module routes - let React handle all module routing
  // This was causing conflicts where modules 13-15 couldn't load properly
  /*
  app.get('/module/2', (req, res) => {
    const html = generateModuleHtml('2', 'Module 2: Greetings & Introductions', `
      <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2>🎵 Audio Introduction</h2>
        <button style="background: #4caf50; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 5px;" onclick="playAudio('Welcome to Module 2! Today we will learn greetings and how to introduce ourselves. Let us start with basic greetings.')">
          🔊 Listen to Introduction
        </button>
      </div>

      <h2>Part 1: Basic Greetings</h2>
      <p>Learn how to greet people at different times of the day.</p>
      
      <button style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Let us learn greetings for different times. Good morning for early day. Good afternoon after twelve. Good evening for night time. Hello and Hi can be used anytime.')">
        🔊 Listen to Greetings Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Good morning! We say good morning in the early part of the day.')" style="cursor: pointer;">
          <div class="emoji">🌅</div>
          <h3>Good Morning</h3>
          <p>Use in the morning (6 AM - 12 PM)</p>
          <p><strong>French:</strong> Bonjour</p>
          <p><strong>Hausa:</strong> Ina kwana</p>
        </div>
        <div class="item" onclick="playAudio('Good afternoon! We say good afternoon from twelve noon until five PM.')" style="cursor: pointer;">
          <div class="emoji">☀️</div>
          <h3>Good Afternoon</h3>
          <p>Use after 12 PM until 5 PM</p>
          <p><strong>French:</strong> Bon après-midi</p>
          <p><strong>Hausa:</strong> Ina wuni</p>
        </div>
        <div class="item" onclick="playAudio('Good evening! We say good evening in the evening and night time.')" style="cursor: pointer;">
          <div class="emoji">🌆</div>
          <h3>Good Evening</h3>
          <p>Use in the evening (5 PM onwards)</p>
          <p><strong>French:</strong> Bonsoir</p>
          <p><strong>Hausa:</strong> Ina yamma</p>
        </div>
        <div class="item" onclick="playAudio('Hello and Hi! These are friendly greetings we can use anytime.')" style="cursor: pointer;">
          <div class="emoji">👋</div>
          <h3>Hello / Hi</h3>
          <p>Use anytime - casual and friendly</p>
          <p><strong>French:</strong> Salut</p>
          <p><strong>Hausa:</strong> Sannu</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Greetings</h3>
        <p>Click the link below to practice greeting games:</p>
        <a href="https://www.britishcouncil.org/school/kids-games/greetings" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Greeting Games
        </a>
      </div>
      
      <h2>Part 2: Personal Introductions</h2>
      <p>Learn how to introduce yourself to others and answer basic questions.</p>
      
      <button style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Now let us learn how to introduce ourselves. We will practice three important questions. What is your name? How old are you? Where are you from?')">
        🔊 Listen to Introduction Guide
      </button>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px;">
        <h3>Essential Introduction Questions & Answers:</h3>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #4caf50;">
          <p onclick="playAudio('What is your name? My name is Ahmed. In French, Je mappelle Ahmed.')" style="cursor: pointer;"><strong>🔊 Q: What is your name?</strong><br>
          A: My name is... (Example: My name is Ahmed)<br>
          <em>French: Je m'appelle...</em><br>
          <em>Hausa: Sunana...</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #4caf50;">
          <p onclick="playAudio('How old are you? I am ten years old. In French, J ai dix ans.')" style="cursor: pointer;"><strong>🔊 Q: How old are you?</strong><br>
          A: I am ... years old (Example: I am 10 years old)<br>
          <em>French: J'ai ... ans</em><br>
          <em>Hausa: Ina da shekaru...</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #4caf50;">
          <p onclick="playAudio('Where are you from? I am from Niger. In French, Je viens du Niger.')" style="cursor: pointer;"><strong>🔊 Q: Where are you from?</strong><br>
          A: I am from... (Example: I am from Niger)<br>
          <em>French: Je viens de...</em><br>
          <em>Hausa: Na fito daga...</em></p>
        </div>

        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #2196f3;">
          <h4>👥 Complete Introduction Example:</h4>
          <p onclick="playAudio('Hello! My name is Fatima. I am twelve years old. I am from Niger. Nice to meet you!')" style="cursor: pointer; background: #e3f2fd; padding: 10px; border-radius: 5px;">
            <strong>🔊 "Hello! My name is Fatima. I am 12 years old. I am from Niger. Nice to meet you!"</strong>
          </p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Introductions</h3>
        <p>Click the link below to practice introduction games:</p>
        <a href="https://www.eslgamesplus.com/self-introduction-esl-vocabulary-game/" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Introduction Games
        </a>
      </div>
    `, '#e8f5e8');
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  // Module 4: Colors & Shapes - COMPLETE WITH AUDIO
  app.get('/module/4', (req, res) => {
    const html = generateModuleHtml('4', 'Module 4: Colors & Shapes', `
      <div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2>🎵 Audio Introduction</h2>
        <button style="background: #ff9800; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 5px;" onclick="playAudio('Welcome to Module 4! Today we will learn about colors and shapes. Let us start with basic colors.')">
          🔊 Listen to Introduction
        </button>
      </div>

      <h2>Part 1: Basic Colors</h2>
      <p>Learn about colors we see around us every day.</p>
      
      <button style="background: #ff9800; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Let us learn about colors. Red like tomatoes. Blue like the sky. Yellow like the sun. Green like grass. Orange like oranges. Purple like grapes.')">
        🔊 Listen to Colors Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Red! Red is the color of blood and tomatoes. Red is a bright and strong color.')" style="cursor: pointer;">
          <div style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 10px; border: 3px solid #333; background: red;"></div>
          <h3>Red</h3>
          <p>Color of tomatoes and blood</p>
          <p><strong>French:</strong> Rouge</p>
          <p><strong>Hausa:</strong> Ja</p>
        </div>
        <div class="item" onclick="playAudio('Blue! Blue is the color of the sky and water. Blue is a calm and peaceful color.')" style="cursor: pointer;">
          <div style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 10px; border: 3px solid #333; background: blue;"></div>
          <h3>Blue</h3>
          <p>Color of sky and water</p>
          <p><strong>French:</strong> Bleu</p>
          <p><strong>Hausa:</strong> Shudi</p>
        </div>
        <div class="item" onclick="playAudio('Yellow! Yellow is the color of the sun and bananas. Yellow is a bright and happy color.')" style="cursor: pointer;">
          <div style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 10px; border: 3px solid #333; background: yellow;"></div>
          <h3>Yellow</h3>
          <p>Color of sun and bananas</p>
          <p><strong>French:</strong> Jaune</p>
          <p><strong>Hausa:</strong> Rawaya</p>
        </div>
        <div class="item" onclick="playAudio('Green! Green is the color of grass and leaves. Green is the color of nature.')" style="cursor: pointer;">
          <div style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 10px; border: 3px solid #333; background: green;"></div>
          <h3>Green</h3>
          <p>Color of grass and leaves</p>
          <p><strong>French:</strong> Vert</p>
          <p><strong>Hausa:</strong> Kore</p>
        </div>
        <div class="item" onclick="playAudio('Orange! Orange is the color of oranges and carrots. Orange is a warm and friendly color.')" style="cursor: pointer;">
          <div style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 10px; border: 3px solid #333; background: orange;"></div>
          <h3>Orange</h3>
          <p>Color of oranges and carrots</p>
          <p><strong>French:</strong> Orange</p>
          <p><strong>Hausa:</strong> Lemu</p>
        </div>
        <div class="item" onclick="playAudio('Purple! Purple is the color of grapes and flowers. Purple is a royal and beautiful color.')" style="cursor: pointer;">
          <div style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 10px; border: 3px solid #333; background: purple;"></div>
          <h3>Purple</h3>
          <p>Color of grapes and flowers</p>
          <p><strong>French:</strong> Violet</p>
          <p><strong>Hausa:</strong> Shudin ruwan hoda</p>
        </div>
        <div class="item" onclick="playAudio('Black! Black is the color of night and coal. Black is a strong and powerful color.')" style="cursor: pointer;">
          <div style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 10px; border: 3px solid #333; background: black;"></div>
          <h3>Black</h3>
          <p>Color of night and coal</p>
          <p><strong>French:</strong> Noir</p>
          <p><strong>Hausa:</strong> Baƙi</p>
        </div>
        <div class="item" onclick="playAudio('White! White is the color of snow and clouds. White is a clean and pure color.')" style="cursor: pointer;">
          <div style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 10px; border: 3px solid #333; background: white;"></div>
          <h3>White</h3>
          <p>Color of snow and clouds</p>
          <p><strong>French:</strong> Blanc</p>
          <p><strong>Hausa:</strong> Fari</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Colors</h3>
        <p>Click the link below to practice color games:</p>
        <a href="https://www.britishcouncil.org/school/kids-games/colours" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Color Games
        </a>
      </div>
      
      <h2>Part 2: Basic Shapes</h2>
      <p>Learn about shapes we see in objects around us.</p>
      
      <button style="background: #ff9800; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Now let us learn about shapes. Circle is round like a ball. Square has four equal sides. Triangle has three sides. Rectangle is long like a door.')">
        🔊 Listen to Shapes Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Circle! A circle is round like a ball or the sun. Circles have no corners.')" style="cursor: pointer;">
          <div class="emoji">⭕</div>
          <h3>Circle</h3>
          <p>Round shape, no corners</p>
          <p><strong>French:</strong> Cercle</p>
          <p><strong>Hausa:</strong> Da'ira</p>
        </div>
        <div class="item" onclick="playAudio('Square! A square has four equal sides. Squares have four corners that are all the same.')" style="cursor: pointer;">
          <div class="emoji">⬜</div>
          <h3>Square</h3>
          <p>Four equal sides and corners</p>
          <p><strong>French:</strong> Carré</p>
          <p><strong>Hausa:</strong> Murabba'i</p>
        </div>
        <div class="item" onclick="playAudio('Triangle! A triangle has three sides and three corners. Triangles can be big or small.')" style="cursor: pointer;">
          <div class="emoji">🔺</div>
          <h3>Triangle</h3>
          <p>Three sides and corners</p>
          <p><strong>French:</strong> Triangle</p>
          <p><strong>Hausa:</strong> Sila uku</p>
        </div>
        <div class="item" onclick="playAudio('Rectangle! A rectangle is longer than it is wide. Rectangles have four corners.')" style="cursor: pointer;">
          <div class="emoji">▭</div>
          <h3>Rectangle</h3>
          <p>Long shape with four corners</p>
          <p><strong>French:</strong> Rectangle</p>
          <p><strong>Hausa:</strong> Siffar rectangle</p>
        </div>
        <div class="item" onclick="playAudio('Star! A star has five points. Stars shine in the sky at night.')" style="cursor: pointer;">
          <div class="emoji">⭐</div>
          <h3>Star</h3>
          <p>Five pointed shape</p>
          <p><strong>French:</strong> Étoile</p>
          <p><strong>Hausa:</strong> Tauraro</p>
        </div>
        <div class="item" onclick="playAudio('Heart! A heart is the shape of love. Hearts are round at the top and pointed at the bottom.')" style="cursor: pointer;">
          <div class="emoji">❤️</div>
          <h3>Heart</h3>
          <p>Shape of love and feelings</p>
          <p><strong>French:</strong> Cœur</p>
          <p><strong>Hausa:</strong> Zuciya</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Shapes</h3>
        <p>Click the link below to practice shape games:</p>
        <a href="https://www.eslgamesplus.com/shapes-vocabulary-esl-interactive-game/" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Shape Games
        </a>
      </div>
    `, '#fff3e0');
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  // Module 5: Animals & Nature - COMPLETE WITH AUDIO
  app.get('/module/5', (req, res) => {
    const html = generateModuleHtml('5', 'Module 5: Animals & Nature', `
      <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2>🎵 Audio Introduction</h2>
        <button style="background: #4caf50; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 5px;" onclick="playAudio('Welcome to Module 5! Today we will learn about animals and nature. Let us start with animals we see every day.')">
          🔊 Listen to Introduction
        </button>
      </div>

      <h2>Part 1: Common Animals</h2>
      <p>Learn about animals we see around us and their sounds.</p>
      
      <button style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Let us learn about animals. Dog says woof. Cat says meow. Bird sings tweet tweet. Fish swims in water. Cow says moo. Goat says baa.')">
        🔊 Listen to Animals Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Dog! Dogs are our best friends. Dogs say woof woof and protect our homes.')" style="cursor: pointer;">
          <div class="emoji">🐕</div>
          <h3>Dog</h3>
          <p>Says woof, protects homes</p>
          <p><strong>French:</strong> Chien</p>
          <p><strong>Hausa:</strong> Kare</p>
        </div>
        <div class="item" onclick="playAudio('Cat! Cats are soft and fluffy. Cats say meow and catch mice.')" style="cursor: pointer;">
          <div class="emoji">🐱</div>
          <h3>Cat</h3>
          <p>Says meow, catches mice</p>
          <p><strong>French:</strong> Chat</p>
          <p><strong>Hausa:</strong> Kyanwa</p>
        </div>
        <div class="item" onclick="playAudio('Bird! Birds can fly in the sky. Birds sing beautiful songs and have feathers.')" style="cursor: pointer;">
          <div class="emoji">🐦</div>
          <h3>Bird</h3>
          <p>Flies and sings songs</p>
          <p><strong>French:</strong> Oiseau</p>
          <p><strong>Hausa:</strong> Tsuntsu</p>
        </div>
        <div class="item" onclick="playAudio('Fish! Fish live in water and cannot breathe air. Fish swim and have scales.')" style="cursor: pointer;">
          <div class="emoji">🐟</div>
          <h3>Fish</h3>
          <p>Lives in water, swims</p>
          <p><strong>French:</strong> Poisson</p>
          <p><strong>Hausa:</strong> Kifi</p>
        </div>
        <div class="item" onclick="playAudio('Cow! Cows give us milk and meat. Cows say moo and eat grass.')" style="cursor: pointer;">
          <div class="emoji">🐄</div>
          <h3>Cow</h3>
          <p>Says moo, gives milk</p>
          <p><strong>French:</strong> Vache</p>
          <p><strong>Hausa:</strong> Saniya</p>
        </div>
        <div class="item" onclick="playAudio('Goat! Goats give us milk and meat. Goats say baa and climb mountains.')" style="cursor: pointer;">
          <div class="emoji">🐐</div>
          <h3>Goat</h3>
          <p>Says baa, climbs rocks</p>
          <p><strong>French:</strong> Chèvre</p>
          <p><strong>Hausa:</strong> Akuya</p>
        </div>
        <div class="item" onclick="playAudio('Elephant! Elephants are very big animals. Elephants have long trunks and big ears.')" style="cursor: pointer;">
          <div class="emoji">🐘</div>
          <h3>Elephant</h3>
          <p>Very big, has trunk</p>
          <p><strong>French:</strong> Éléphant</p>
          <p><strong>Hausa:</strong> Giwa</p>
        </div>
        <div class="item" onclick="playAudio('Lion! Lions are strong and brave. Lions say roar and are the king of animals.')" style="cursor: pointer;">
          <div class="emoji">🦁</div>
          <h3>Lion</h3>
          <p>Says roar, king of animals</p>
          <p><strong>French:</strong> Lion</p>
          <p><strong>Hausa:</strong> Zaki</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Animals</h3>
        <p>Click the link below to practice animal games:</p>
        <a href="https://www.britishcouncil.org/school/kids-games/animals" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Animal Games
        </a>
      </div>
      
      <h2>Part 2: Nature Around Us</h2>
      <p>Learn about beautiful nature we see in Niger and everywhere.</p>
      
      <button style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Now let us learn about nature. Trees give us shade. Flowers are beautiful. Sun gives us light. Moon shines at night. Grass is green. Water keeps us alive.')">
        🔊 Listen to Nature Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Tree! Trees give us shade and oxygen. Trees have leaves, branches, and roots.')" style="cursor: pointer;">
          <div class="emoji">🌳</div>
          <h3>Tree</h3>
          <p>Gives shade and oxygen</p>
          <p><strong>French:</strong> Arbre</p>
          <p><strong>Hausa:</strong> Itace</p>
        </div>
        <div class="item" onclick="playAudio('Flower! Flowers are beautiful and colorful. Flowers smell good and make seeds.')" style="cursor: pointer;">
          <div class="emoji">🌸</div>
          <h3>Flower</h3>
          <p>Beautiful and colorful</p>
          <p><strong>French:</strong> Fleur</p>
          <p><strong>Hausa:</strong> Fure</p>
        </div>
        <div class="item" onclick="playAudio('Sun! The sun gives us light and warmth. The sun shines during the day.')" style="cursor: pointer;">
          <div class="emoji">☀️</div>
          <h3>Sun</h3>
          <p>Gives light and warmth</p>
          <p><strong>French:</strong> Soleil</p>
          <p><strong>Hausa:</strong> Rana</p>
        </div>
        <div class="item" onclick="playAudio('Moon! The moon shines at night. The moon changes shape every day.')" style="cursor: pointer;">
          <div class="emoji">🌙</div>
          <h3>Moon</h3>
          <p>Shines at night</p>
          <p><strong>French:</strong> Lune</p>
          <p><strong>Hausa:</strong> Wata</p>
        </div>
        <div class="item" onclick="playAudio('Grass! Grass is green and soft. Animals eat grass and it covers the ground.')" style="cursor: pointer;">
          <div class="emoji">🌿</div>
          <h3>Grass</h3>
          <p>Green and soft</p>
          <p><strong>French:</strong> Herbe</p>
          <p><strong>Hausa:</strong> Ciyawa</p>
        </div>
        <div class="item" onclick="playAudio('Water! Water is very important for life. We drink water and plants need water to grow.')" style="cursor: pointer;">
          <div class="emoji">💧</div>
          <h3>Water</h3>
          <p>Essential for all life</p>
          <p><strong>French:</strong> Eau</p>
          <p><strong>Hausa:</strong> Ruwa</p>
        </div>
        <div class="item" onclick="playAudio('Stars! Stars shine in the sky at night. Stars are far away suns.')" style="cursor: pointer;">
          <div class="emoji">⭐</div>
          <h3>Stars</h3>
          <p>Shine in night sky</p>
          <p><strong>French:</strong> Étoiles</p>
          <p><strong>Hausa:</strong> Taurari</p>
        </div>
        <div class="item" onclick="playAudio('Wind! Wind moves the air around us. Wind helps trees and plants move.')" style="cursor: pointer;">
          <div class="emoji">💨</div>
          <h3>Wind</h3>
          <p>Moving air around us</p>
          <p><strong>French:</strong> Vent</p>
          <p><strong>Hausa:</strong> Iska</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Nature</h3>
        <p>Click the link below to practice nature games:</p>
        <a href="https://www.eslgamesplus.com/nature-vocabulary-esl-interactive-game/" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Nature Games
        </a>
      </div>
    `, '#e8f5e8');
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  // CLEAN MODULE ROUTES - SINGLE DEFINITION EACH
  
  // Module 1: Alphabet & Numbers - COMPLETE WITH AUDIO
  app.get('/module/1', (req, res) => {
    const html = generateModuleHtml('1', 'Module 1: Alphabet & Numbers', `
      <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2>🎵 Audio Introduction</h2>
        <button style="background: #2196f3; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 5px;" onclick="playAudio('Welcome to Module 1! Today we will learn the English alphabet and numbers. Let us start with the 26 letters.')">
          🔊 Listen to Introduction
        </button>
      </div>

      <h2>Part 1: Complete Alphabet (A-Z)</h2>
      <p>Learn all 26 letters of the English alphabet with pronunciation.</p>
      
      <button style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Let us learn the alphabet. A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z. Great job!')">
        🔊 Listen to Full Alphabet
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('A. The letter A.')" style="cursor: pointer;"><div class="emoji">🅰️</div><h3>A</h3><p><strong>French:</strong> A</p></div>
        <div class="item" onclick="playAudio('B. The letter B.')" style="cursor: pointer;"><div class="emoji">🅱️</div><h3>B</h3><p><strong>French:</strong> B</p></div>
        <div class="item" onclick="playAudio('C. The letter C.')" style="cursor: pointer;"><div class="emoji">©️</div><h3>C</h3><p><strong>French:</strong> C</p></div>
        <div class="item" onclick="playAudio('D. The letter D.')" style="cursor: pointer;"><div class="emoji">🌟</div><h3>D</h3><p><strong>French:</strong> D</p></div>
        <div class="item" onclick="playAudio('E. The letter E.')" style="cursor: pointer;"><div class="emoji">🌍</div><h3>E</h3><p><strong>French:</strong> E</p></div>
        <div class="item" onclick="playAudio('F. The letter F.')" style="cursor: pointer;"><div class="emoji">🔥</div><h3>F</h3><p><strong>French:</strong> F</p></div>
        <div class="item" onclick="playAudio('G. The letter G.')" style="cursor: pointer;"><div class="emoji">⚡</div><h3>G</h3><p><strong>French:</strong> G</p></div>
        <div class="item" onclick="playAudio('H. The letter H.')" style="cursor: pointer;"><div class="emoji">🏠</div><h3>H</h3><p><strong>French:</strong> H</p></div>
        <div class="item" onclick="playAudio('I. The letter I.')" style="cursor: pointer;"><div class="emoji">👁️</div><h3>I</h3><p><strong>French:</strong> I</p></div>
        <div class="item" onclick="playAudio('J. The letter J.')" style="cursor: pointer;"><div class="emoji">😊</div><h3>J</h3><p><strong>French:</strong> J</p></div>
        <div class="item" onclick="playAudio('K. The letter K.')" style="cursor: pointer;"><div class="emoji">🔑</div><h3>K</h3><p><strong>French:</strong> K</p></div>
        <div class="item" onclick="playAudio('L. The letter L.')" style="cursor: pointer;"><div class="emoji">❤️</div><h3>L</h3><p><strong>French:</strong> L</p></div>
        <div class="item" onclick="playAudio('M. The letter M.')" style="cursor: pointer;"><div class="emoji">🌙</div><h3>M</h3><p><strong>French:</strong> M</p></div>
        <div class="item" onclick="playAudio('N. The letter N.')" style="cursor: pointer;"><div class="emoji">🌎</div><h3>N</h3><p><strong>French:</strong> N</p></div>
        <div class="item" onclick="playAudio('O. The letter O.')" style="cursor: pointer;"><div class="emoji">⭕</div><h3>O</h3><p><strong>French:</strong> O</p></div>
        <div class="item" onclick="playAudio('P. The letter P.')" style="cursor: pointer;"><div class="emoji">🎨</div><h3>P</h3><p><strong>French:</strong> P</p></div>
        <div class="item" onclick="playAudio('Q. The letter Q.')" style="cursor: pointer;"><div class="emoji">👑</div><h3>Q</h3><p><strong>French:</strong> Q</p></div>
        <div class="item" onclick="playAudio('R. The letter R.')" style="cursor: pointer;"><div class="emoji">🌈</div><h3>R</h3><p><strong>French:</strong> R</p></div>
        <div class="item" onclick="playAudio('S. The letter S.')" style="cursor: pointer;"><div class="emoji">☀️</div><h3>S</h3><p><strong>French:</strong> S</p></div>
        <div class="item" onclick="playAudio('T. The letter T.')" style="cursor: pointer;"><div class="emoji">🌳</div><h3>T</h3><p><strong>French:</strong> T</p></div>
        <div class="item" onclick="playAudio('U. The letter U.')" style="cursor: pointer;"><div class="emoji">☂️</div><h3>U</h3><p><strong>French:</strong> U</p></div>
        <div class="item" onclick="playAudio('V. The letter V.')" style="cursor: pointer;"><div class="emoji">✌️</div><h3>V</h3><p><strong>French:</strong> V</p></div>
        <div class="item" onclick="playAudio('W. The letter W.')" style="cursor: pointer;"><div class="emoji">🌊</div><h3>W</h3><p><strong>French:</strong> W</p></div>
        <div class="item" onclick="playAudio('X. The letter X.')" style="cursor: pointer;"><div class="emoji">❌</div><h3>X</h3><p><strong>French:</strong> X</p></div>
        <div class="item" onclick="playAudio('Y. The letter Y.')" style="cursor: pointer;"><div class="emoji">✨</div><h3>Y</h3><p><strong>French:</strong> Y</p></div>
        <div class="item" onclick="playAudio('Z. The letter Z.')" style="cursor: pointer;"><div class="emoji">⚡</div><h3>Z</h3><p><strong>French:</strong> Z</p></div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice the Alphabet</h3>
        <p>Click the link below to practice alphabet games:</p>
        <a href="https://www.britishcouncil.org/school/kids-games/alphabet" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Alphabet Games
        </a>
      </div>

      <h2>Part 2: Numbers 1-20</h2>
      <p>Learn to count from 1 to 20 in English with pronunciation.</p>
      
      <button style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Now let us count from 1 to 20. One, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty. Excellent!')">
        🔊 Listen to Numbers 1-20
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('One. Number one.')" style="cursor: pointer;"><div class="emoji">1️⃣</div><h3>1 - One</h3><p><strong>French:</strong> Un</p></div>
        <div class="item" onclick="playAudio('Two. Number two.')" style="cursor: pointer;"><div class="emoji">2️⃣</div><h3>2 - Two</h3><p><strong>French:</strong> Deux</p></div>
        <div class="item" onclick="playAudio('Three. Number three.')" style="cursor: pointer;"><div class="emoji">3️⃣</div><h3>3 - Three</h3><p><strong>French:</strong> Trois</p></div>
        <div class="item" onclick="playAudio('Four. Number four.')" style="cursor: pointer;"><div class="emoji">4️⃣</div><h3>4 - Four</h3><p><strong>French:</strong> Quatre</p></div>
        <div class="item" onclick="playAudio('Five. Number five.')" style="cursor: pointer;"><div class="emoji">5️⃣</div><h3>5 - Five</h3><p><strong>French:</strong> Cinq</p></div>
        <div class="item" onclick="playAudio('Six. Number six.')" style="cursor: pointer;"><div class="emoji">6️⃣</div><h3>6 - Six</h3><p><strong>French:</strong> Six</p></div>
        <div class="item" onclick="playAudio('Seven. Number seven.')" style="cursor: pointer;"><div class="emoji">7️⃣</div><h3>7 - Seven</h3><p><strong>French:</strong> Sept</p></div>
        <div class="item" onclick="playAudio('Eight. Number eight.')" style="cursor: pointer;"><div class="emoji">8️⃣</div><h3>8 - Eight</h3><p><strong>French:</strong> Huit</p></div>
        <div class="item" onclick="playAudio('Nine. Number nine.')" style="cursor: pointer;"><div class="emoji">9️⃣</div><h3>9 - Nine</h3><p><strong>French:</strong> Neuf</p></div>
        <div class="item" onclick="playAudio('Ten. Number ten.')" style="cursor: pointer;"><div class="emoji">🔟</div><h3>10 - Ten</h3><p><strong>French:</strong> Dix</p></div>
        <div class="item" onclick="playAudio('Eleven. Number eleven.')" style="cursor: pointer;"><div class="emoji">1️⃣1️⃣</div><h3>11 - Eleven</h3><p><strong>French:</strong> Onze</p></div>
        <div class="item" onclick="playAudio('Twelve. Number twelve.')" style="cursor: pointer;"><div class="emoji">1️⃣2️⃣</div><h3>12 - Twelve</h3><p><strong>French:</strong> Douze</p></div>
        <div class="item" onclick="playAudio('Thirteen. Number thirteen.')" style="cursor: pointer;"><div class="emoji">1️⃣3️⃣</div><h3>13 - Thirteen</h3><p><strong>French:</strong> Treize</p></div>
        <div class="item" onclick="playAudio('Fourteen. Number fourteen.')" style="cursor: pointer;"><div class="emoji">1️⃣4️⃣</div><h3>14 - Fourteen</h3><p><strong>French:</strong> Quatorze</p></div>
        <div class="item" onclick="playAudio('Fifteen. Number fifteen.')" style="cursor: pointer;"><div class="emoji">1️⃣5️⃣</div><h3>15 - Fifteen</h3><p><strong>French:</strong> Quinze</p></div>
        <div class="item" onclick="playAudio('Sixteen. Number sixteen.')" style="cursor: pointer;"><div class="emoji">1️⃣6️⃣</div><h3>16 - Sixteen</h3><p><strong>French:</strong> Seize</p></div>
        <div class="item" onclick="playAudio('Seventeen. Number seventeen.')" style="cursor: pointer;"><div class="emoji">1️⃣7️⃣</div><h3>17 - Seventeen</h3><p><strong>French:</strong> Dix-sept</p></div>
        <div class="item" onclick="playAudio('Eighteen. Number eighteen.')" style="cursor: pointer;"><div class="emoji">1️⃣8️⃣</div><h3>18 - Eighteen</h3><p><strong>French:</strong> Dix-huit</p></div>
        <div class="item" onclick="playAudio('Nineteen. Number nineteen.')" style="cursor: pointer;"><div class="emoji">1️⃣9️⃣</div><h3>19 - Nineteen</h3><p><strong>French:</strong> Dix-neuf</p></div>
        <div class="item" onclick="playAudio('Twenty. Number twenty.')" style="cursor: pointer;"><div class="emoji">2️⃣0️⃣</div><h3>20 - Twenty</h3><p><strong>French:</strong> Vingt</p></div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Numbers</h3>
        <p>Click the link below to practice number games:</p>
        <a href="https://www.eslgamesplus.com/numbers-vocabulary-esl-interactive-game/" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Number Games
        </a>
      </div>
    `, '#e3f2fd');
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  // Module 3: Family & Pronouns - COMPLETE WITH AUDIO
  app.get('/module/3', (req, res) => {
    const html = generateModuleHtml('3', 'Module 3: Family & Pronouns', `
      <div style="background: #f3e5f5; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2>🎵 Audio Introduction</h2>
        <button style="background: #9c27b0; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 5px;" onclick="playAudio('Welcome to Module 3! Today we will learn about family members and pronouns. Let us start with family members.')">
          🔊 Listen to Introduction
        </button>
      </div>

      <h2>Part 1: Family Members</h2>
      <p>Learn about family members and relationships in English.</p>
      
      <button style="background: #9c27b0; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Let us learn about family members. We have father, mother, brother, sister, grandfather, grandmother, uncle, aunt, cousin, and baby.')">
        🔊 Listen to Family Members
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Father! Father is the man in the family. He takes care of everyone.')" style="cursor: pointer;">
          <div class="emoji">👨</div>
          <h3>Father</h3>
          <p>Male parent - Dad</p>
          <p><strong>French:</strong> Père</p>
          <p><strong>Hausa:</strong> Uba</p>
        </div>
        <div class="item" onclick="playAudio('Mother! Mother is the woman in the family. She loves and cares for children.')" style="cursor: pointer;">
          <div class="emoji">👩</div>
          <h3>Mother</h3>
          <p>Female parent - Mom</p>
          <p><strong>French:</strong> Mère</p>
          <p><strong>Hausa:</strong> Uwa</p>
        </div>
        <div class="item" onclick="playAudio('Brother! Brother is a boy in the family. He is your male sibling.')" style="cursor: pointer;">
          <div class="emoji">👦</div>
          <h3>Brother</h3>
          <p>Male sibling</p>
          <p><strong>French:</strong> Frère</p>
          <p><strong>Hausa:</strong> Dan uwa</p>
        </div>
        <div class="item" onclick="playAudio('Sister! Sister is a girl in the family. She is your female sibling.')" style="cursor: pointer;">
          <div class="emoji">👧</div>
          <h3>Sister</h3>
          <p>Female sibling</p>
          <p><strong>French:</strong> Sœur</p>
          <p><strong>Hausa:</strong> Yar uwa</p>
        </div>
        <div class="item" onclick="playAudio('Grandfather! Grandfather is your fathers father or mothers father. He tells stories.')" style="cursor: pointer;">
          <div class="emoji">👴</div>
          <h3>Grandfather</h3>
          <p>Father's or mother's father</p>
          <p><strong>French:</strong> Grand-père</p>
          <p><strong>Hausa:</strong> Kaka</p>
        </div>
        <div class="item" onclick="playAudio('Grandmother! Grandmother is your fathers mother or mothers mother. She cooks delicious food.')" style="cursor: pointer;">
          <div class="emoji">👵</div>
          <h3>Grandmother</h3>
          <p>Father's or mother's mother</p>
          <p><strong>French:</strong> Grand-mère</p>
          <p><strong>Hausa:</strong> Kaka</p>
        </div>
        <div class="item" onclick="playAudio('Uncle! Uncle is your fathers brother or mothers brother.')" style="cursor: pointer;">
          <div class="emoji">👨‍🦱</div>
          <h3>Uncle</h3>
          <p>Father's or mother's brother</p>
          <p><strong>French:</strong> Oncle</p>
          <p><strong>Hausa:</strong> Kawu</p>
        </div>
        <div class="item" onclick="playAudio('Aunt! Aunt is your fathers sister or mothers sister.')" style="cursor: pointer;">
          <div class="emoji">👩‍🦱</div>
          <h3>Aunt</h3>
          <p>Father's or mother's sister</p>
          <p><strong>French:</strong> Tante</p>
          <p><strong>Hausa:</strong> Goggo</p>
        </div>
        <div class="item" onclick="playAudio('Cousin! Cousin is your uncle or aunts child.')" style="cursor: pointer;">
          <div class="emoji">👫</div>
          <h3>Cousin</h3>
          <p>Uncle's or aunt's child</p>
          <p><strong>French:</strong> Cousin</p>
          <p><strong>Hausa:</strong> Dan kawu</p>
        </div>
        <div class="item" onclick="playAudio('Baby! Baby is the youngest member of the family.')" style="cursor: pointer;">
          <div class="emoji">👶</div>
          <h3>Baby</h3>
          <p>Youngest family member</p>
          <p><strong>French:</strong> Bébé</p>
          <p><strong>Hausa:</strong> Jariri</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Family Members</h3>
        <p>Click the link below to practice family vocabulary games:</p>
        <a href="https://www.britishcouncil.org/school/kids-games/family" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Family Games
        </a>
      </div>

      <h2>Part 2: Personal Pronouns</h2>
      <p>Learn personal pronouns: I, you, he, she, we, they.</p>
      
      <button style="background: #9c27b0; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Now let us learn pronouns. I for myself. You for the person I talk to. He for a boy or man. She for a girl or woman. We for us together. They for other people.')">
        🔊 Listen to Pronouns Explanation
      </button>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px;">
        <h3>Personal Pronouns with Examples:</h3>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('I am a student. I like to learn English. I comes from me.')" style="cursor: pointer;"><strong>🔊 I</strong> - for myself<br>
          <em>French: Je</em> | <em>Hausa: Ni</em><br>
          Example: "I am a student. I like English."</p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('You are my friend. You speak very well. You is for the person I talk to.')" style="cursor: pointer;"><strong>🔊 You</strong> - for the person I'm talking to<br>
          <em>French: Tu/Vous</em> | <em>Hausa: Kai/Ke</em><br>
          Example: "You are my friend. You speak well."</p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('He is my brother. He plays football. He is for a boy or man.')" style="cursor: pointer;"><strong>🔊 He</strong> - for a boy or man<br>
          <em>French: Il</em> | <em>Hausa: Shi</em><br>
          Example: "He is my brother. He plays football."</p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('She is my sister. She sings beautifully. She is for a girl or woman.')" style="cursor: pointer;"><strong>🔊 She</strong> - for a girl or woman<br>
          <em>French: Elle</em> | <em>Hausa: Ita</em><br>
          Example: "She is my sister. She sings beautifully."</p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('We are students. We learn together. We is for us as a group.')" style="cursor: pointer;"><strong>🔊 We</strong> - for us together<br>
          <em>French: Nous</em> | <em>Hausa: Mu</em><br>
          Example: "We are students. We learn together."</p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('They are my friends. They come from Niger. They is for other people.')" style="cursor: pointer;"><strong>🔊 They</strong> - for other people<br>
          <em>French: Ils/Elles</em> | <em>Hausa: Su</em><br>
          Example: "They are my friends. They come from Niger."</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Pronouns</h3>
        <p>Click the link below to practice pronoun games:</p>
        <a href="https://www.eslgamesplus.com/pronouns-esl-vocabulary-game/" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Pronoun Games
        </a>
      </div>
    `, '#f3e5f5');
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  // Module 6: Food & Animals - COMPLETE WITH AUDIO
  app.get('/module/6', (req, res) => {
    const html = generateModuleHtml('6', 'Module 6: Food & Animals', `
      <div style="background: #fff8e1; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2>🎵 Audio Introduction</h2>
        <button style="background: #ff9800; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 5px;" onclick="playAudio('Welcome to Module 6! Today we will learn about food and animals. Let us start with common foods we eat every day.')">
          🔊 Listen to Introduction
        </button>
      </div>

      <h2>Part 1: Common Foods</h2>
      <p>Learn about foods we eat every day and their importance.</p>
      
      <button style="background: #ff9800; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Let us learn about different foods. We eat bread, rice, milk, banana, apple, water, meat, fish, vegetables, and fruits every day.')">
        🔊 Listen to Foods Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Bread! Bread is made from wheat. We eat bread for breakfast and meals.')" style="cursor: pointer;">
          <div class="emoji">🍞</div>
          <h3>Bread</h3>
          <p>Made from wheat flour</p>
          <p><strong>French:</strong> Pain</p>
          <p><strong>Hausa:</strong> Gurasa</p>
        </div>
        <div class="item" onclick="playAudio('Rice! Rice is a staple food. We cook rice and eat it with sauce.')" style="cursor: pointer;">
          <div class="emoji">🍚</div>
          <h3>Rice</h3>
          <p>Staple grain food</p>
          <p><strong>French:</strong> Riz</p>
          <p><strong>Hausa:</strong> Shinkafa</p>
        </div>
        <div class="item" onclick="playAudio('Milk! Milk comes from cows. Milk makes us strong and healthy.')" style="cursor: pointer;">
          <div class="emoji">🥛</div>
          <h3>Milk</h3>
          <p>From cows, healthy drink</p>
          <p><strong>French:</strong> Lait</p>
          <p><strong>Hausa:</strong> Madara</p>
        </div>
        <div class="item" onclick="playAudio('Banana! Banana is a yellow fruit. Bananas taste sweet and give us energy.')" style="cursor: pointer;">
          <div class="emoji">🍌</div>
          <h3>Banana</h3>
          <p>Yellow sweet fruit</p>
          <p><strong>French:</strong> Banane</p>
          <p><strong>Hausa:</strong> Ayaba</p>
        </div>
        <div class="item" onclick="playAudio('Apple! Apple is a red or green fruit. Apples are crunchy and good for health.')" style="cursor: pointer;">
          <div class="emoji">🍎</div>
          <h3>Apple</h3>
          <p>Red or green fruit</p>
          <p><strong>French:</strong> Pomme</p>
          <p><strong>Hausa:</strong> Tuffa</p>
        </div>
        <div class="item" onclick="playAudio('Water! Water is very important. We need to drink water every day to stay healthy.')" style="cursor: pointer;">
          <div class="emoji">💧</div>
          <h3>Water</h3>
          <p>Essential for life</p>
          <p><strong>French:</strong> Eau</p>
          <p><strong>Hausa:</strong> Ruwa</p>
        </div>
        <div class="item" onclick="playAudio('Meat! Meat comes from animals. Meat gives us protein to grow strong.')" style="cursor: pointer;">
          <div class="emoji">🥩</div>
          <h3>Meat</h3>
          <p>Protein from animals</p>
          <p><strong>French:</strong> Viande</p>
          <p><strong>Hausa:</strong> Nama</p>
        </div>
        <div class="item" onclick="playAudio('Fish! Fish lives in water. Fish is healthy food with good protein.')" style="cursor: pointer;">
          <div class="emoji">🐟</div>
          <h3>Fish</h3>
          <p>Lives in water, healthy</p>
          <p><strong>French:</strong> Poisson</p>
          <p><strong>Hausa:</strong> Kifi</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Food Vocabulary</h3>
        <p>Click the link below to practice food games:</p>
        <a href="https://www.britishcouncil.org/school/kids-games/food" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Food Games
        </a>
      </div>

      <h2>Part 2: Common Animals</h2>
      <p>Learn about animals we see around us in Niger and the world.</p>
      
      <button style="background: #ff9800; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Now let us learn about animals. We see cows, goats, chickens, sheep, dogs, cats, camels, and donkeys in Niger.')">
        🔊 Listen to Animals Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Cow! Cows give us milk and meat. Cows are big animals that say moo.')" style="cursor: pointer;">
          <div class="emoji">🐄</div>
          <h3>Cow</h3>
          <p>Gives milk and meat</p>
          <p><strong>French:</strong> Vache</p>
          <p><strong>Hausa:</strong> Saniya</p>
        </div>
        <div class="item" onclick="playAudio('Goat! Goats give us milk and meat. Goats are smaller than cows.')" style="cursor: pointer;">
          <div class="emoji">🐐</div>
          <h3>Goat</h3>
          <p>Gives milk and meat</p>
          <p><strong>French:</strong> Chèvre</p>
          <p><strong>Hausa:</strong> Akuya</p>
        </div>
        <div class="item" onclick="playAudio('Chicken! Chickens give us eggs and meat. Chickens say cluck cluck.')" style="cursor: pointer;">
          <div class="emoji">🐓</div>
          <h3>Chicken</h3>
          <p>Gives eggs and meat</p>
          <p><strong>French:</strong> Poule</p>
          <p><strong>Hausa:</strong> Kaza</p>
        </div>
        <div class="item" onclick="playAudio('Sheep! Sheep give us wool and meat. Sheep have fluffy white fur.')" style="cursor: pointer;">
          <div class="emoji">🐑</div>
          <h3>Sheep</h3>
          <p>Gives wool and meat</p>
          <p><strong>French:</strong> Mouton</p>
          <p><strong>Hausa:</strong> Tunkiya</p>
        </div>
        <div class="item" onclick="playAudio('Dog! Dogs are our friends. Dogs protect our homes and families.')" style="cursor: pointer;">
          <div class="emoji">🐕</div>
          <h3>Dog</h3>
          <p>Human's best friend</p>
          <p><strong>French:</strong> Chien</p>
          <p><strong>Hausa:</strong> Kare</p>
        </div>
        <div class="item" onclick="playAudio('Cat! Cats catch mice. Cats are soft and say meow.')" style="cursor: pointer;">
          <div class="emoji">🐈</div>
          <h3>Cat</h3>
          <p>Catches mice, soft pet</p>
          <p><strong>French:</strong> Chat</p>
          <p><strong>Hausa:</strong> Kyanwa</p>
        </div>
        <div class="item" onclick="playAudio('Camel! Camels live in the desert. Camels can walk for long distances without water.')" style="cursor: pointer;">
          <div class="emoji">🐪</div>
          <h3>Camel</h3>
          <p>Desert animal, strong</p>
          <p><strong>French:</strong> Chameau</p>
          <p><strong>Hausa:</strong> Raƙumi</p>
        </div>
        <div class="item" onclick="playAudio('Donkey! Donkeys help carry heavy things. Donkeys are strong and helpful.')" style="cursor: pointer;">
          <div class="emoji">🫏</div>
          <h3>Donkey</h3>
          <p>Carries heavy loads</p>
          <p><strong>French:</strong> Âne</p>
          <p><strong>Hausa:</strong> Jaki</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Animals Vocabulary</h3>
        <p>Click the link below to practice animal games:</p>
        <a href="https://www.eslgamesplus.com/animals-vocabulary-esl-interactive-game/" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Animal Games
        </a>
      </div>
    `, '#fff8e1');
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  // Module 7: Present Continuous - COMPLETE WITH AUDIO
  app.get('/module/7', (req, res) => {
    const html = generateModuleHtml('7', 'Module 7: Present Continuous', `
      <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2>🎵 Audio Introduction</h2>
        <button style="background: #4caf50; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 5px;" onclick="playAudio('Welcome to Module 7! Today we will learn about Present Continuous tense. This is about actions happening right now.')">
          🔊 Listen to Introduction
        </button>
      </div>

      <h2>Part 1: Present Continuous Actions</h2>
      <p>Learn about actions happening right now using -ing verbs.</p>
      
      <button style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Present Continuous tells us about actions happening now. I am reading. She is writing. He is running. We are eating. They are sleeping.')">
        🔊 Listen to Grammar Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Running! I am running fast. He is running to school. Running means moving quickly with your legs.')" style="cursor: pointer;">
          <div class="emoji">🏃‍♂️</div>
          <h3>Running</h3>
          <p>I am running</p>
          <p><strong>French:</strong> Je cours</p>
          <p><strong>Hausa:</strong> Ina gudu</p>
        </div>
        <div class="item" onclick="playAudio('Reading! She is reading a book. I am reading stories. Reading means looking at words.')" style="cursor: pointer;">
          <div class="emoji">📖</div>
          <h3>Reading</h3>
          <p>She is reading</p>
          <p><strong>French:</strong> Elle lit</p>
          <p><strong>Hausa:</strong> Tana karatu</p>
        </div>
        <div class="item" onclick="playAudio('Writing! He is writing letters. We are writing homework. Writing means making words on paper.')" style="cursor: pointer;">
          <div class="emoji">✍️</div>
          <h3>Writing</h3>
          <p>He is writing</p>
          <p><strong>French:</strong> Il écrit</p>
          <p><strong>Hausa:</strong> Yana rubutu</p>
        </div>
        <div class="item" onclick="playAudio('Eating! We are eating dinner. They are eating fruits. Eating means putting food in your mouth.')" style="cursor: pointer;">
          <div class="emoji">🍽️</div>
          <h3>Eating</h3>
          <p>We are eating</p>
          <p><strong>French:</strong> Nous mangeons</p>
          <p><strong>Hausa:</strong> Muna ci</p>
        </div>
        <div class="item" onclick="playAudio('Walking! They are walking to market. You are walking slowly. Walking means moving with your feet.')" style="cursor: pointer;">
          <div class="emoji">🚶‍♀️</div>
          <h3>Walking</h3>
          <p>They are walking</p>
          <p><strong>French:</strong> Ils marchent</p>
          <p><strong>Hausa:</strong> Suna tafiya</p>
        </div>
        <div class="item" onclick="playAudio('Sleeping! She is sleeping peacefully. The baby is sleeping. Sleeping means resting with closed eyes.')" style="cursor: pointer;">
          <div class="emoji">😴</div>
          <h3>Sleeping</h3>
          <p>She is sleeping</p>
          <p><strong>French:</strong> Elle dort</p>
          <p><strong>Hausa:</strong> Tana barci</p>
        </div>
        <div class="item" onclick="playAudio('Playing! I am playing football. Children are playing games. Playing means having fun activities.')" style="cursor: pointer;">
          <div class="emoji">⚽</div>
          <h3>Playing</h3>
          <p>I am playing</p>
          <p><strong>French:</strong> Je joue</p>
          <p><strong>Hausa:</strong> Ina wasa</p>
        </div>
        <div class="item" onclick="playAudio('Singing! We are singing songs. She is singing beautifully. Singing means making music with your voice.')" style="cursor: pointer;">
          <div class="emoji">🎵</div>
          <h3>Singing</h3>
          <p>We are singing</p>
          <p><strong>French:</strong> Nous chantons</p>
          <p><strong>Hausa:</strong> Muna waka</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Present Continuous</h3>
        <p>Click the link below to practice present continuous games:</p>
        <a href="https://www.eslgamesplus.com/present-continuous-tense-esl-interactive-game/" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Grammar Games
        </a>
      </div>

      <h2>Part 2: Grammar Rules</h2>
      <p>Learn the formula for Present Continuous tense.</p>
      
      <button style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('The formula is simple. I am plus verb plus ing. You are plus verb plus ing. He is plus verb plus ing. She is plus verb plus ing. We are plus verb plus ing. They are plus verb plus ing.')">
        🔊 Listen to Grammar Rules
      </button>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px;">
        <h3>Present Continuous Formula:</h3>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #4caf50;">
          <p onclick="playAudio('I am plus verb plus ing. Example: I am eating rice.')" style="cursor: pointer;"><strong>🔊 I am</strong> + verb + ing<br>
          <em>Example: I am eating rice</em><br>
          <em>French: Je suis en train de manger</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #4caf50;">
          <p onclick="playAudio('You are plus verb plus ing. Example: You are reading a book.')" style="cursor: pointer;"><strong>🔊 You are</strong> + verb + ing<br>
          <em>Example: You are reading a book</em><br>
          <em>French: Tu es en train de lire</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #4caf50;">
          <p onclick="playAudio('He is plus verb plus ing. Example: He is playing football.')" style="cursor: pointer;"><strong>🔊 He/She is</strong> + verb + ing<br>
          <em>Example: He is playing football</em><br>
          <em>French: Il joue au football</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #4caf50;">
          <p onclick="playAudio('We are plus verb plus ing. Example: We are learning English.')" style="cursor: pointer;"><strong>🔊 We are</strong> + verb + ing<br>
          <em>Example: We are learning English</em><br>
          <em>French: Nous apprenons l'anglais</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #4caf50;">
          <p onclick="playAudio('They are plus verb plus ing. Example: They are singing songs.')" style="cursor: pointer;"><strong>🔊 They are</strong> + verb + ing<br>
          <em>Example: They are singing songs</em><br>
          <em>French: Ils chantent des chansons</em></p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Grammar Rules</h3>
        <p>Click the link below to practice grammar exercises:</p>
        <a href="https://www.britishcouncil.org/school/kids-games/grammar" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Grammar Games
        </a>
      </div>
    `, '#e8f5e8');
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  // Module 8: Adjectives & Prepositions - COMPLETE WITH AUDIO
  app.get('/module/8', (req, res) => {
    const html = generateModuleHtml('8', 'Module 8: Adjectives & Prepositions', `
      <div style="background: #fce4ec; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2>🎵 Audio Introduction</h2>
        <button style="background: #e91e63; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 5px;" onclick="playAudio('Welcome to Module 8! Today we will learn adjectives and prepositions. Adjectives describe things and prepositions show position.')">
          🔊 Listen to Introduction
        </button>
      </div>

      <h2>Part 1: Descriptive Adjectives</h2>
      <p>Learn words that describe how things look, feel, and are.</p>
      
      <button style="background: #e91e63; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Adjectives describe things. Big elephant, small mouse. Happy child, sad face. Hot sun, cold ice. Fast car, slow turtle.')">
        🔊 Listen to Adjectives Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Big! Big means large in size. An elephant is big. A house is big.')" style="cursor: pointer;">
          <div class="emoji">🐘</div>
          <h3>Big</h3>
          <p>Large in size</p>
          <p><strong>French:</strong> Grand</p>
          <p><strong>Hausa:</strong> Babba</p>
        </div>
        <div class="item" onclick="playAudio('Small! Small means little in size. A mouse is small. A coin is small.')" style="cursor: pointer;">
          <div class="emoji">🐭</div>
          <h3>Small</h3>
          <p>Little in size</p>
          <p><strong>French:</strong> Petit</p>
          <p><strong>Hausa:</strong> Kankane</p>
        </div>
        <div class="item" onclick="playAudio('Happy! Happy means feeling good and joyful. A smiling child is happy.')" style="cursor: pointer;">
          <div class="emoji">😊</div>
          <h3>Happy</h3>
          <p>Feeling joyful</p>
          <p><strong>French:</strong> Heureux</p>
          <p><strong>Hausa:</strong> Mai farin ciki</p>
        </div>
        <div class="item" onclick="playAudio('Sad! Sad means feeling unhappy. A crying person is sad.')" style="cursor: pointer;">
          <div class="emoji">😢</div>
          <h3>Sad</h3>
          <p>Feeling unhappy</p>
          <p><strong>French:</strong> Triste</p>
          <p><strong>Hausa:</strong> Mai bakin ciki</p>
        </div>
        <div class="item" onclick="playAudio('Hot! Hot means very warm temperature. Fire is hot. The sun is hot.')" style="cursor: pointer;">
          <div class="emoji">🔥</div>
          <h3>Hot</h3>
          <p>Very warm temperature</p>
          <p><strong>French:</strong> Chaud</p>
          <p><strong>Hausa:</strong> Mai zafi</p>
        </div>
        <div class="item" onclick="playAudio('Cold! Cold means low temperature. Ice is cold. Snow is cold.')" style="cursor: pointer;">
          <div class="emoji">❄️</div>
          <h3>Cold</h3>
          <p>Low temperature</p>
          <p><strong>French:</strong> Froid</p>
          <p><strong>Hausa:</strong> Mai sanyi</p>
        </div>
        <div class="item" onclick="playAudio('Fast! Fast means moving quickly. A car is fast. A cheetah is fast.')" style="cursor: pointer;">
          <div class="emoji">🏃‍♂️</div>
          <h3>Fast</h3>
          <p>Moving quickly</p>
          <p><strong>French:</strong> Rapide</p>
          <p><strong>Hausa:</strong> Mai sauri</p>
        </div>
        <div class="item" onclick="playAudio('Slow! Slow means moving not quickly. A turtle is slow. An old man walks slowly.')" style="cursor: pointer;">
          <div class="emoji">🐢</div>
          <h3>Slow</h3>
          <p>Moving not quickly</p>
          <p><strong>French:</strong> Lent</p>
          <p><strong>Hausa:</strong> Mai jinkiri</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Adjectives</h3>
        <p>Click the link below to practice adjective games:</p>
        <a href="https://www.britishcouncil.org/school/kids-games/adjectives" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Adjective Games
        </a>
      </div>

      <h2>Part 2: Position Prepositions</h2>
      <p>Learn words that show where things are located.</p>
      
      <button style="background: #e91e63; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Prepositions show position. The book is on the table. The cat is under the chair. The toy is in the box. The dog is next to the house.')">
        🔊 Listen to Prepositions Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('On! On means above or on top of something. The book is on the table.')" style="cursor: pointer;">
          <div class="emoji">📚</div>
          <h3>On</h3>
          <p>Above or on top of</p>
          <p><strong>French:</strong> Sur</p>
          <p><strong>Hausa:</strong> A kan</p>
        </div>
        <div class="item" onclick="playAudio('Under! Under means below or beneath something. The cat is under the table.')" style="cursor: pointer;">
          <div class="emoji">⬇️</div>
          <h3>Under</h3>
          <p>Below or beneath</p>
          <p><strong>French:</strong> Sous</p>
          <p><strong>Hausa:</strong> A karkashin</p>
        </div>
        <div class="item" onclick="playAudio('In! In means inside something. The toys are in the box.')" style="cursor: pointer;">
          <div class="emoji">📦</div>
          <h3>In</h3>
          <p>Inside something</p>
          <p><strong>French:</strong> Dans</p>
          <p><strong>Hausa:</strong> A ciki</p>
        </div>
        <div class="item" onclick="playAudio('Next to! Next to means beside or near something. The chair is next to the table.')" style="cursor: pointer;">
          <div class="emoji">↔️</div>
          <h3>Next to</h3>
          <p>Beside or near</p>
          <p><strong>French:</strong> À côté de</p>
          <p><strong>Hausa:</strong> Kusa da</p>
        </div>
        <div class="item" onclick="playAudio('Behind! Behind means at the back of something. The tree is behind the house.')" style="cursor: pointer;">
          <div class="emoji">👤</div>
          <h3>Behind</h3>
          <p>At the back of</p>
          <p><strong>French:</strong> Derrière</p>
          <p><strong>Hausa:</strong> A bayan</p>
        </div>
        <div class="item" onclick="playAudio('In front of! In front of means before something. The car is in front of the house.')" style="cursor: pointer;">
          <div class="emoji">🏠</div>
          <h3>In front of</h3>
          <p>Before something</p>
          <p><strong>French:</strong> Devant</p>
          <p><strong>Hausa:</strong> A gaban</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Prepositions</h3>
        <p>Click the link below to practice preposition games:</p>
        <a href="https://www.eslgamesplus.com/prepositions-esl-vocabulary-game/" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Preposition Games
        </a>
      </div>
    `, '#fce4ec');
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  // Module 9: Time & Questions - COMPLETE WITH AUDIO
  app.get('/module/9', (req, res) => {
    const html = generateModuleHtml('9', 'Module 9: Time & Questions', `
      <div style="background: #e0f2f1; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2>🎵 Audio Introduction</h2>
        <button style="background: #009688; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 5px;" onclick="playAudio('Welcome to Module 9! Today we will learn about time and question words. Time helps us know when things happen.')">
          🔊 Listen to Introduction
        </button>
      </div>

      <h2>Part 1: Telling Time</h2>
      <p>Learn how to read the clock and tell time in English.</p>
      
      <button style="background: #009688; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Let us learn to tell time. One o clock. Two o clock. Three o clock. Six o clock. Nine o clock. Twelve o clock.')">
        🔊 Listen to Time Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('One o clock! It is one o clock. The clock shows one hour.')" style="cursor: pointer;">
          <div class="emoji">🕐</div>
          <h3>1 o'clock</h3>
          <p>One hour on the clock</p>
          <p><strong>French:</strong> Une heure</p>
          <p><strong>Hausa:</strong> Awa daya</p>
        </div>
        <div class="item" onclick="playAudio('Two o clock! It is two o clock. The clock shows two hours.')" style="cursor: pointer;">
          <div class="emoji">🕑</div>
          <h3>2 o'clock</h3>
          <p>Two hours on the clock</p>
          <p><strong>French:</strong> Deux heures</p>
          <p><strong>Hausa:</strong> Awa biyu</p>
        </div>
        <div class="item" onclick="playAudio('Three o clock! It is three o clock. The clock shows three hours.')" style="cursor: pointer;">
          <div class="emoji">🕒</div>
          <h3>3 o'clock</h3>
          <p>Three hours on the clock</p>
          <p><strong>French:</strong> Trois heures</p>
          <p><strong>Hausa:</strong> Awa uku</p>
        </div>
        <div class="item" onclick="playAudio('Six o clock! It is six o clock. The clock shows six hours.')" style="cursor: pointer;">
          <div class="emoji">🕕</div>
          <h3>6 o'clock</h3>
          <p>Six hours on the clock</p>
          <p><strong>French:</strong> Six heures</p>
          <p><strong>Hausa:</strong> Awa shida</p>
        </div>
        <div class="item" onclick="playAudio('Nine o clock! It is nine o clock. The clock shows nine hours.')" style="cursor: pointer;">
          <div class="emoji">🕘</div>
          <h3>9 o'clock</h3>
          <p>Nine hours on the clock</p>
          <p><strong>French:</strong> Neuf heures</p>
          <p><strong>Hausa:</strong> Awa tara</p>
        </div>
        <div class="item" onclick="playAudio('Twelve o clock! It is twelve o clock. The clock shows twelve hours. This is noon or midnight.')" style="cursor: pointer;">
          <div class="emoji">🕛</div>
          <h3>12 o'clock</h3>
          <p>Twelve hours - noon or midnight</p>
          <p><strong>French:</strong> Douze heures</p>
          <p><strong>Hausa:</strong> Awa goma sha biyu</p>
        </div>
        <div class="item" onclick="playAudio('Morning! Morning is from sunrise to twelve noon. Good morning!')" style="cursor: pointer;">
          <div class="emoji">🌅</div>
          <h3>Morning</h3>
          <p>Sunrise to 12 noon</p>
          <p><strong>French:</strong> Matin</p>
          <p><strong>Hausa:</strong> Safiya</p>
        </div>
        <div class="item" onclick="playAudio('Night! Night is from sunset to sunrise. Good night!')" style="cursor: pointer;">
          <div class="emoji">🌙</div>
          <h3>Night</h3>
          <p>Sunset to sunrise</p>
          <p><strong>French:</strong> Nuit</p>
          <p><strong>Hausa:</strong> Dare</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Time</h3>
        <p>Click the link below to practice time games:</p>
        <a href="https://www.britishcouncil.org/school/kids-games/time" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Time Games
        </a>
      </div>

      <h2>Part 2: Question Words</h2>
      <p>Learn important question words to ask about things.</p>
      
      <button style="background: #009688; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Question words help us ask about things. What is for things. Where is for places. When is for time. Who is for people. Why is for reasons. How is for ways.')">
        🔊 Listen to Question Words
      </button>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px;">
        <h3>Essential Question Words:</h3>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #009688;">
          <p onclick="playAudio('What! What is used to ask about things. What is this? What do you like?')" style="cursor: pointer;"><strong>🔊 What</strong> - Ask about things<br>
          <em>French: Quoi</em> | <em>Hausa: Me</em><br>
          Examples: "What is this?" "What do you like?"</p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #009688;">
          <p onclick="playAudio('Where! Where is used to ask about places. Where do you live? Where is the school?')" style="cursor: pointer;"><strong>🔊 Where</strong> - Ask about places<br>
          <em>French: Où</em> | <em>Hausa: Ina</em><br>
          Examples: "Where do you live?" "Where is the school?"</p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #009688;">
          <p onclick="playAudio('When! When is used to ask about time. When do you wake up? When is your birthday?')" style="cursor: pointer;"><strong>🔊 When</strong> - Ask about time<br>
          <em>French: Quand</em> | <em>Hausa: Yaushe</em><br>
          Examples: "When do you wake up?" "When is your birthday?"</p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #009688;">
          <p onclick="playAudio('Who! Who is used to ask about people. Who is your friend? Who is your teacher?')" style="cursor: pointer;"><strong>🔊 Who</strong> - Ask about people<br>
          <em>French: Qui</em> | <em>Hausa: Wa</em><br>
          Examples: "Who is your friend?" "Who is your teacher?"</p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #009688;">
          <p onclick="playAudio('Why! Why is used to ask for reasons. Why are you happy? Why do you study?')" style="cursor: pointer;"><strong>🔊 Why</strong> - Ask for reasons<br>
          <em>French: Pourquoi</em> | <em>Hausa: Me yasa</em><br>
          Examples: "Why are you happy?" "Why do you study?"</p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #009688;">
          <p onclick="playAudio('How! How is used to ask about ways. How are you? How do you go to school?')" style="cursor: pointer;"><strong>🔊 How</strong> - Ask about ways<br>
          <em>French: Comment</em> | <em>Hausa: Yaya</em><br>
          Examples: "How are you?" "How do you go to school?"</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Questions</h3>
        <p>Click the link below to practice question games:</p>
        <a href="https://www.eslgamesplus.com/question-words-esl-interactive-game/" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Question Games
        </a>
      </div>
    `, '#e0f2f1');
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  // Module 10: Hobbies & Past Tense - COMPLETE WITH AUDIO
  app.get('/module/10', (req, res) => {
    const html = generateModuleHtml('10', 'Module 10: Hobbies & Past Tense', `
      <div style="background: #f3e5f5; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2>🎵 Audio Introduction</h2>
        <button style="background: #9c27b0; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 5px;" onclick="playAudio('Welcome to Module 10! Today we will learn about hobbies and past tense. Hobbies are fun activities we enjoy doing.')">
          🔊 Listen to Introduction
        </button>
      </div>

      <h2>Part 1: Fun Hobbies</h2>
      <p>Learn about activities people enjoy doing in their free time.</p>
      
      <button style="background: #9c27b0; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Hobbies are fun activities. Playing football, drawing pictures, singing songs, reading books, swimming in water, and playing games.')">
        🔊 Listen to Hobbies Explanation
      </button>

      <div class="grid">
        <div class="item" onclick="playAudio('Football! Football is playing with a round ball. We kick the ball with our feet.')" style="cursor: pointer;">
          <div class="emoji">⚽</div>
          <h3>Football</h3>
          <p>Playing with a ball</p>
          <p><strong>French:</strong> Football</p>
          <p><strong>Hausa:</strong> Kwallon kafa</p>
        </div>
        <div class="item" onclick="playAudio('Drawing! Drawing is making pictures with pencils or colors. Artists love drawing.')" style="cursor: pointer;">
          <div class="emoji">🎨</div>
          <h3>Drawing</h3>
          <p>Making pictures with pencils</p>
          <p><strong>French:</strong> Dessiner</p>
          <p><strong>Hausa:</strong> Zana</p>
        </div>
        <div class="item" onclick="playAudio('Singing! Singing is making music with your voice. Birds sing beautifully.')" style="cursor: pointer;">
          <div class="emoji">🎵</div>
          <h3>Singing</h3>
          <p>Making music with voice</p>
          <p><strong>French:</strong> Chanter</p>
          <p><strong>Hausa:</strong> Waka</p>
        </div>
        <div class="item" onclick="playAudio('Reading! Reading is looking at words in books. Reading helps us learn new things.')" style="cursor: pointer;">
          <div class="emoji">📚</div>
          <h3>Reading</h3>
          <p>Looking at books and words</p>
          <p><strong>French:</strong> Lire</p>
          <p><strong>Hausa:</strong> Karatu</p>
        </div>
        <div class="item" onclick="playAudio('Swimming! Swimming is moving in water. Fish swim in rivers and people swim in pools.')" style="cursor: pointer;">
          <div class="emoji">🏊‍♀️</div>
          <h3>Swimming</h3>
          <p>Moving and floating in water</p>
          <p><strong>French:</strong> Nager</p>
          <p><strong>Hausa:</strong> Yin iyo</p>
        </div>
        <div class="item" onclick="playAudio('Dancing! Dancing is moving your body to music. Dancing makes people happy.')" style="cursor: pointer;">
          <div class="emoji">💃</div>
          <h3>Dancing</h3>
          <p>Moving body to music</p>
          <p><strong>French:</strong> Danser</p>
          <p><strong>Hausa:</strong> Rawa</p>
        </div>
        <div class="item" onclick="playAudio('Cooking! Cooking is making food. Good cooks make delicious meals.')" style="cursor: pointer;">
          <div class="emoji">👨‍🍳</div>
          <h3>Cooking</h3>
          <p>Making delicious food</p>
          <p><strong>French:</strong> Cuisiner</p>
          <p><strong>Hausa:</strong> Dafa abinci</p>
        </div>
        <div class="item" onclick="playAudio('Gaming! Gaming is playing video games or board games. Games are fun and entertaining.')" style="cursor: pointer;">
          <div class="emoji">🎮</div>
          <h3>Gaming</h3>
          <p>Playing fun games</p>
          <p><strong>French:</strong> Jouer aux jeux</p>
          <p><strong>Hausa:</strong> Yin wasa</p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Hobbies</h3>
        <p>Click the link below to practice hobby games:</p>
        <a href="https://www.britishcouncil.org/school/kids-games/activities" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Hobby Games
        </a>
      </div>

      <h2>Part 2: Past Tense</h2>
      <p>Learn about things that happened before - in the past.</p>
      
      <button style="background: #9c27b0; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 10px 0;" onclick="playAudio('Past tense tells us about things that happened before. I played yesterday. She drew a picture. We sang a song. They read a book.')">
        🔊 Listen to Past Tense Explanation
      </button>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px;">
        <h3>Past Tense Examples:</h3>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('I played football yesterday. Yesterday means the day before today.')" style="cursor: pointer;"><strong>🔊 I played</strong> football yesterday<br>
          <em>French: J'ai joué au football hier</em><br>
          <em>Hausa: Na buga kwallon kafa jiya</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('She drew a beautiful picture with colors.')" style="cursor: pointer;"><strong>🔊 She drew</strong> a beautiful picture<br>
          <em>French: Elle a dessiné une belle image</em><br>
          <em>Hausa: Ta zana hoto mai kyau</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('We sang a happy song together in class.')" style="cursor: pointer;"><strong>🔊 We sang</strong> a happy song<br>
          <em>French: Nous avons chanté une chanson joyeuse</em><br>
          <em>Hausa: Mun rera waka mai farin ciki</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('They read an interesting book about animals.')" style="cursor: pointer;"><strong>🔊 They read</strong> an interesting book<br>
          <em>French: Ils ont lu un livre intéressant</em><br>
          <em>Hausa: Sun karanta littafi mai ban sha'awa</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('He swam in the river during the hot day.')" style="cursor: pointer;"><strong>🔊 He swam</strong> in the river<br>
          <em>French: Il a nagé dans la rivière</em><br>
          <em>Hausa: Ya yi iyo a kogin</em></p>
        </div>
        
        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #9c27b0;">
          <p onclick="playAudio('You walked to school this morning instead of riding.')" style="cursor: pointer;"><strong>🔊 You walked</strong> to school<br>
          <em>French: Tu as marché jusqu'à l'école</em><br>
          <em>Hausa: Ka tafi makaranta da kafa</em></p>
        </div>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>🎮 Practice Past Tense</h3>
        <p>Click the link below to practice past tense games:</p>
        <a href="https://www.eslgamesplus.com/past-tense-esl-interactive-game/" target="_blank" style="background: #ff6b35; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px 0;">
          Click to Practice Past Tense Games
        </a>
      </div>
    `, '#f3e5f5');
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  // Helper function to generate module HTML
  function generateModuleHtml(moduleId: string, title: string, content: string, bgColor: string = '#e3f2fd') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SamLang Niger - ${title}</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(to bottom right, ${bgColor}, #bbdefb);
            min-height: 100vh;
        }
        .container { max-width: 1000px; margin: 0 auto; }
        .header { 
            display: flex; 
            align-items: center; 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .back-btn { 
            background: #2196f3; 
            color: white; 
            padding: 10px 20px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold;
        }
        .back-btn:hover { background: #1976d2; }
        h1 { color: #1565c0; margin: 0; }
        .content { 
            background: white; 
            padding: 30px; 
            border-radius: 15px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 20px; 
            margin: 20px 0; 
        }
        .item { 
            text-align: center; 
            padding: 20px; 
            background: #f8f9fa; 
            border-radius: 10px; 
            border: 2px solid #e9ecef;
            transition: transform 0.2s;
        }
        .item:hover { transform: scale(1.05); }
        .emoji { font-size: 40px; margin-bottom: 10px; }
        .complete-btn {
            background: #4caf50;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            display: block;
            margin: 30px auto;
        }
        .complete-btn:hover { background: #45a049; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="/modules" class="back-btn">← Back to Modules</a>
            <h1>${title}</h1>
        </div>
        
        <div class="content">
          ${content}
        </div>
        
        <button class="complete-btn" onclick="alert('Excellent! You completed ${title}!')">
            🎉 Complete Module ${moduleId}
        </button>
    </div>
</body>
</html>`;
  }

  app.get('/module/5', (req, res) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SamLang Niger - Module 5</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(to bottom right, #e8f5e8, #c8e6c8);
            min-height: 100vh;
        }
        .container { max-width: 1000px; margin: 0 auto; }
        .header { 
            display: flex; 
            align-items: center; 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .back-btn { 
            background: #4caf50; 
            color: white; 
            padding: 10px 20px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold;
        }
        .back-btn:hover { background: #45a049; }
        h1 { color: #2e7d32; margin: 0; }
        .content { 
            background: white; 
            padding: 30px; 
            border-radius: 15px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 20px; 
            margin: 20px 0; 
        }
        .item { 
            text-align: center; 
            padding: 20px; 
            background: #f8f9fa; 
            border-radius: 10px; 
            border: 2px solid #e9ecef;
            transition: transform 0.2s;
        }
        .item:hover { transform: scale(1.05); }
        .emoji { font-size: 50px; margin-bottom: 10px; }
        .complete-btn {
            background: #4caf50;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            display: block;
            margin: 30px auto;
        }
        .complete-btn:hover { background: #45a049; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="/modules" class="back-btn">← Back to Modules</a>
            <h1>Module 5: Animals & Nature</h1>
        </div>
        
        <div class="content">
          <h2>Part 1: Animals</h2>
          <p>Learn about different animals and their sounds.</p>
          <div class="grid">
            <div class="item">
              <div class="emoji">🐶</div>
              <h3>Dog</h3>
              <p>Dogs say "Woof!"<br><strong>French:</strong> Chien</p>
            </div>
            <div class="item">
              <div class="emoji">🐱</div>
              <h3>Cat</h3>
              <p>Cats say "Meow!"<br><strong>French:</strong> Chat</p>
            </div>
            <div class="item">
              <div class="emoji">🐦</div>
              <h3>Bird</h3>
              <p>Birds say "Tweet!"<br><strong>French:</strong> Oiseau</p>
            </div>
            <div class="item">
              <div class="emoji">🐟</div>
              <h3>Fish</h3>
              <p>Fish live in water<br><strong>French:</strong> Poisson</p>
            </div>
            <div class="item">
              <div class="emoji">🐸</div>
              <h3>Frog</h3>
              <p>Frogs say "Ribbit!"<br><strong>French:</strong> Grenouille</p>
            </div>
            <div class="item">
              <div class="emoji">🦆</div>
              <h3>Duck</h3>
              <p>Ducks say "Quack!"<br><strong>French:</strong> Canard</p>
            </div>
          </div>
          
          <h2>Part 2: Nature</h2>
          <p>Learn about things we see in nature.</p>
          <div class="grid">
            <div class="item">
              <div class="emoji">🌳</div>
              <h3>Tree</h3>
              <p>Trees are tall and green<br><strong>French:</strong> Arbre</p>
            </div>
            <div class="item">
              <div class="emoji">🌸</div>
              <h3>Flower</h3>
              <p>Flowers are beautiful<br><strong>French:</strong> Fleur</p>
            </div>
            <div class="item">
              <div class="emoji">☀️</div>
              <h3>Sun</h3>
              <p>The sun gives us light<br><strong>French:</strong> Soleil</p>
            </div>
            <div class="item">
              <div class="emoji">🌙</div>
              <h3>Moon</h3>
              <p>The moon shines at night<br><strong>French:</strong> Lune</p>
            </div>
            <div class="item">
              <div class="emoji">⭐</div>
              <h3>Star</h3>
              <p>Stars twinkle in the sky<br><strong>French:</strong> Étoile</p>
            </div>
            <div class="item">
              <div class="emoji">🌧️</div>
              <h3>Rain</h3>
              <p>Rain falls from clouds<br><strong>French:</strong> Pluie</p>
            </div>
          </div>
          
          <h2>Part 2: Nature</h2>
          <p>Learn about nature elements in English.</p>
          <div class="grid">
            <div class="item">
              <div class="emoji">🌳</div>
              <h3>Tree</h3>
              <p>Tall and green</p>
              <p><strong>French:</strong> Arbre</p>
            </div>
            <div class="item">
              <div class="emoji">🌸</div>
              <h3>Flower</h3>
              <p>Beautiful and colorful</p>
              <p><strong>French:</strong> Fleur</p>
            </div>
            <div class="item">
              <div class="emoji">☀️</div>
              <h3>Sun</h3>
              <p>Bright and warm</p>
              <p><strong>French:</strong> Soleil</p>
            </div>
            <div class="item">
              <div class="emoji">🌙</div>
              <h3>Moon</h3>
              <p>Shines at night</p>
              <p><strong>French:</strong> Lune</p>
            </div>
          </div>
        </div>
        
        <button class="complete-btn" onclick="alert('Fantastic! You completed Module 5: Animals & Nature!')">
            🎉 Complete Module 5
        </button>
    </div>
</body>
</html>`;
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
  // Configure Google Text-to-Speech
  const googleTTSClient = new TextToSpeechClient({
    // For local development, you can use a service account key file
    // In production, use environment variables or default credentials
  });

  // Configure AWS Polly as fallback
  const polly = new AWS.Polly({
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.POLLY_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.POLLY_SECRET_ACCESS_KEY,
  });

  // Get user progress
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Update learning progress
  app.post("/api/progress", async (req, res) => {
    try {
      const validatedData = insertProgressSchema.parse(req.body);
      const progress = await storage.updateProgress(validatedData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  // Generate speech with Google Text-to-Speech or AWS Polly
  app.post("/api/speech", async (req, res) => {
    try {
      const { text, language = "en", voice = "Matthew" } = req.body;
      
      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }

      // Check cache first
      const cached = await storage.getCachedAudio(text);
      if (cached) {
        return res.json({ audioUrl: cached.audioUrl });
      }

      let audioUrl: string;

      try {
        // Try Google Text-to-Speech first
        const request = {
          input: { text: text },
          voice: {
            languageCode: language === "en" ? "en-US" : "fr-FR",
            name: language === "en" ? "en-US-Studio-M" : "fr-FR-Standard-B", // Male American voice
            ssmlGender: 'MALE' as const,
          },
          audioConfig: {
            audioEncoding: 'MP3' as const,
            speakingRate: 0.8, // Slower for children
            pitch: 0.0,
          },
        };

        const [response] = await googleTTSClient.synthesizeSpeech(request);
        
        if (response.audioContent) {
          const audioBase64 = Buffer.from(response.audioContent).toString('base64');
          audioUrl = `data:audio/mp3;base64,${audioBase64}`;
        } else {
          throw new Error("No audio content from Google TTS");
        }
      } catch (googleError) {
        console.log("Google TTS failed, trying AWS Polly fallback:", googleError);
        
        // Fallback to AWS Polly
        const params = {
          Text: text,
          OutputFormat: 'mp3',
          VoiceId: voice,
          Engine: 'neural',
          LanguageCode: language === "en" ? "en-US" : "fr-FR",
          SpeechMarkTypes: [],
        };

        const pollyResult = await polly.synthesizeSpeech(params).promise();
        
        if (!pollyResult.AudioStream) {
          throw new Error("No audio stream returned from Polly");
        }

        const audioBuffer = Buffer.from(pollyResult.AudioStream as Uint8Array);
        const audioBase64 = audioBuffer.toString('base64');
        audioUrl = `data:audio/mp3;base64,${audioBase64}`;
      }

      // Cache the result
      await storage.cacheAudio({
        textContent: text,
        audioUrl,
        language,
        voice,
      });

      res.json({ audioUrl });
    } catch (error) {
      console.error("Speech generation error:", error);
      res.status(500).json({ message: "Failed to generate speech" });
    }
  });

  // Get learning content for modules
  app.get("/api/content/:moduleId", async (req, res) => {
    const moduleId = parseInt(req.params.moduleId);
    
    const moduleContent = {
      1: {
        title: "Alphabet & Numbers",
        lessons: [
          {
            id: 1,
            title: "The English Alphabet",
            content: {
              introduction: "Hello! I'm Teacher Sam. In this lesson, we will learn the English alphabet. Do you know how many letters there are in English? Do you know the English Alphabet? There are 26 letters, vowels and consonants.",
              alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              vowels: ["A", "E", "I", "O", "U"],
              consonants: ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"],
              vowelExplanation: "These letters create the core sounds of most words. They are the heart of syllables, providing the main sounds.",
              consonantExplanation: "Consonants are sounds that come with some form of closure or restriction in the vocal tract.",
              yLetter: "The Letter Y can be vowel and consonants. As a consonant: When Y is at the beginning of a word and sounds like /y/, as in yes or yellow. As a vowel: When Y is in the middle or end of a word and can sound like a vowel."
            }
          },
          {
            id: 2,
            title: "Numbers 1-20",
            content: {
              introduction: "Hello again! I'm Teacher Sam. Today, we will learn to count from 1 to 20 in English! Can you count already? If not, no problem! Let me teach you.",
              numbers: Array.from({length: 20}, (_, i) => i + 1),
              numberWords: {
                1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
                6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten",
                11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen", 15: "Fifteen",
                16: "Sixteen", 17: "Seventeen", 18: "Eighteen", 19: "Nineteen", 20: "Twenty"
              }
            }
          }
        ]
      },
      2: {
        title: "Greetings & Introductions",
        lessons: [
          {
            id: 1,
            title: "Common Greetings",
            content: {
              introduction: "Hello! I'm Teacher Sam. In this lesson, we are going to learn how to greet people in English. Do you know how to say hello in different ways? No worries — I'll show you!",
              greetings: [
                "Hello! – A general greeting used at any time of the day.",
                "Hi! – is an informal greeting.",
                "Good morning! – Used in the early part of the day.",
                "Good afternoon! – Used after 12:00 PM, until about 5 PM.",
                "Good evening! – Used in the evening or night.",
                "Good night! – A farewell, said when going to bed or leaving at night."
              ]
            }
          }
        ]
      },
      3: {
        title: "Family & Pronouns",
        lessons: [
          {
            id: 1,
            title: "Family Members",
            content: {
              introduction: "Hello! I'm Teacher Sam. Today we will learn about family members and personal pronouns. Family is very important in Niger culture.",
              familyMembers: {
                "Mother": { french: "Mère", hausa: "Uwa" },
                "Father": { french: "Père", hausa: "Uba" },
                "Sister": { french: "Sœur", hausa: "Yar'uwa" },
                "Brother": { french: "Frère", hausa: "Dan'uwa" },
                "Grandmother": { french: "Grand-mère", hausa: "Kaka" },
                "Grandfather": { french: "Grand-père", hausa: "Baba" }
              },
              pronouns: ["I", "You", "He", "She", "We", "They"]
            }
          }
        ]
      },
      4: {
        title: "Colors & Shapes",
        lessons: [
          {
            id: 1,
            title: "Basic Colors",
            content: {
              introduction: "Hello! I'm Teacher Sam. Today we will learn colors and shapes. Colors make our world beautiful!",
              colors: {
                "Red": { french: "Rouge", hausa: "Ja" },
                "Blue": { french: "Bleu", hausa: "Shuɗi" },
                "Yellow": { french: "Jaune", hausa: "Rawaya" },
                "Green": { french: "Vert", hausa: "Kore" }
              },
              shapes: {
                "Circle": { french: "Cercle", hausa: "Da'ira" },
                "Square": { french: "Carré", hausa: "Murabba'i" },
                "Triangle": { french: "Triangle", hausa: "Triangle" },
                "Rectangle": { french: "Rectangle", hausa: "Rectangle" }
              }
            }
          }
        ]
      },
      5: {
        title: "Verbs & Daily Routines",
        lessons: [
          {
            id: 1,
            title: "Action Verbs",
            content: {
              introduction: "Hello! I'm Teacher Sam. Today we will learn action verbs and daily routines. Verbs show what we do!",
              verbs: {
                "Eat": { french: "Manger", hausa: "Ci" },
                "Sleep": { french: "Dormir", hausa: "Barci" },
                "Play": { french: "Jouer", hausa: "Wasa" },
                "Read": { french: "Lire", hausa: "Karanta" },
                "Write": { french: "Écrire", hausa: "Rubuta" }
              },
              routines: ["Wake up", "Brush teeth", "Eat breakfast", "Go to school", "Come home", "Do homework"]
            }
          }
        ]
      },
      6: {
        title: "Food & Animals",
        lessons: [
          {
            id: 1,
            title: "Common Foods",
            content: {
              introduction: "Hello! I'm Teacher Sam. Today we will learn about food and animals. Food gives us energy!",
              foods: {
                "Bread": { french: "Pain", hausa: "Gurasa" },
                "Rice": { french: "Riz", hausa: "Shinkafa" },
                "Milk": { french: "Lait", hausa: "Madara" },
                "Banana": { french: "Banane", hausa: "Ayaba" },
                "Water": { french: "Eau", hausa: "Ruwa" }
              },
              animals: {
                "Dog": { french: "Chien", hausa: "Kare" },
                "Cat": { french: "Chat", hausa: "Kyanwa" },
                "Cow": { french: "Vache", hausa: "Saniya" },
                "Goat": { french: "Chèvre", hausa: "Akuya" }
              }
            }
          }
        ]
      },
      7: {
        title: "Present Continuous & Abilities",
        lessons: [
          {
            id: 1,
            title: "Present Continuous Tense",
            content: {
              introduction: "Hello! I'm Teacher Sam. Today we will learn present continuous tense and abilities. This shows what is happening now!",
              presentContinuous: {
                "I am eating": { french: "Je mange", hausa: "Ina ci" },
                "You are playing": { french: "Tu joues", hausa: "Kana wasa" },
                "He is reading": { french: "Il lit", hausa: "Yana karanta" },
                "She is writing": { french: "Elle écrit", hausa: "Tana rubuta" }
              },
              abilities: {
                "I can swim": { french: "Je peux nager", hausa: "Zan iya iyo" },
                "You can run": { french: "Tu peux courir", hausa: "Za ka iya gudu" },
                "He can sing": { french: "Il peut chanter", hausa: "Zai iya waƙa" }
              }
            }
          }
        ]
      },
      8: {
        title: "Adjectives & Prepositions",
        lessons: [
          {
            id: 1,
            title: "Descriptive Words",
            content: {
              introduction: "Hello! I'm Teacher Sam. Today we will learn adjectives and prepositions. Adjectives describe things!",
              adjectives: {
                "Big": { french: "Grand", hausa: "Babba" },
                "Small": { french: "Petit", hausa: "Ƙarami" },
                "Happy": { french: "Heureux", hausa: "Farin ciki" },
                "Sad": { french: "Triste", hausa: "Baƙin ciki" },
                "Hot": { french: "Chaud", hausa: "Zafi" },
                "Cold": { french: "Froid", hausa: "Sanyi" }
              },
              prepositions: {
                "In": { french: "Dans", hausa: "A ciki" },
                "On": { french: "Sur", hausa: "A kan" },
                "Under": { french: "Sous", hausa: "A ƙarƙashi" },
                "Next to": { french: "À côté de", hausa: "Kusa da" }
              }
            }
          }
        ]
      },
      9: {
        title: "Time & Questions",
        lessons: [
          {
            id: 1,
            title: "Telling Time",
            content: {
              introduction: "Hello! I'm Teacher Sam. Today we will learn about time and question words. Time helps us organize our day!",
              timeExpressions: {
                "Morning": { french: "Matin", hausa: "Safiya" },
                "Afternoon": { french: "Après-midi", hausa: "La'asar" },
                "Evening": { french: "Soir", hausa: "Yamma" },
                "Night": { french: "Nuit", hausa: "Dare" },
                "1 o'clock": { french: "1 heure", hausa: "Karfe ɗaya" },
                "2 o'clock": { french: "2 heures", hausa: "Karfe biyu" }
              },
              questionWords: {
                "What": { french: "Quoi", hausa: "Me" },
                "Where": { french: "Où", hausa: "Ina" },
                "When": { french: "Quand", hausa: "Yaushe" },
                "Who": { french: "Qui", hausa: "Wa" },
                "Why": { french: "Pourquoi", hausa: "Me yasa" },
                "How": { french: "Comment", hausa: "Yaya" }
              }
            }
          }
        ]
      },
      10: {
        title: "Hobbies & Past Tense",
        lessons: [
          {
            id: 1,
            title: "Fun Activities",
            content: {
              introduction: "Hello! I'm Teacher Sam. Today we will learn about hobbies and past tense. Hobbies are fun activities we enjoy!",
              hobbies: {
                "Football": { french: "Football", hausa: "Kwallon ƙafa" },
                "Drawing": { french: "Dessiner", hausa: "Zana" },
                "Singing": { french: "Chanter", hausa: "Waƙa" },
                "Reading": { french: "Lire", hausa: "Karanta" },
                "Swimming": { french: "Nager", hausa: "Iyo" },
                "Dancing": { french: "Danser", hausa: "Rawa" }
              },
              pastTense: {
                "I played": { french: "J'ai joué", hausa: "Na wasa" },
                "You walked": { french: "Tu as marché", hausa: "Ka yi tafiya" },
                "He studied": { french: "Il a étudié", hausa: "Ya yi karatu" },
                "She cooked": { french: "Elle a cuisiné", hausa: "Ta dafa abinci" }
              }
            }
          }
        ]
      }
    };

    const content = moduleContent[moduleId as keyof typeof moduleContent];
    if (!content) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.json(content);
  });

  // Version endpoint for update distribution
  app.get("/api/version", (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.json({
      version: '3.0.1-OFFLINE-FIXED',
      buildTimestamp: new Date().toISOString(),
      features: [
        'FIXED: Screen wake notification issue - no more annoying update prompts',
        'SMART UPDATE SYSTEM: Only genuine updates shown, respects user experience',
        'USER-FRIENDLY NOTIFICATIONS: Dismissible corner notifications replace blocking modals',
        'RESPECTFUL TIMING: 30-minute gaps between notifications, auto-dismiss after 10 seconds',
        'GUARANTEED: English-only audio offline - no French voice switching',
        'ENHANCED: Strict voice filtering for consistent learning experience',
        'RESOLVED: User complaints about French voices when offline'
      ],
      updateRequired: true,
      criticalUpdate: true,
      offlineCapable: true,
      forceUpdate: false,
      audioFixed: true,
      allModulesWorking: true,
      screenWakeFixed: true,
      userExperienceImproved: true,
      message: 'CRITICAL UPDATE v3.0.1: Enhanced offline English audio! Fixed French voice switching issue completely.'
    });
  });

  // Manifest endpoint for app information
  app.get("/api/manifest", (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.json({
      name: 'SamLang Niger',
      fullName: 'SamLang Niger - Learn English with Teacher Sam',
      tagline: 'Local Voice, Global Language',
      version: '3.0.1-OFFLINE-FIXED',
      lastUpdated: new Date().toISOString(),
      criticalUpdate: true,
      updateMessage: 'CRITICAL: Enhanced offline English audio! Fixed French voice switching completely.',
      modulesWorking: 15,
      offlineCapable: true,
      audioSystemFixed: true,
      screenWakeFixed: true
    });
  });

  // Service Worker routes
  app.get('/sw.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Service-Worker-Allowed', '/');
    res.sendFile('sw.js', { root: './client/public' });
  });

  // Complete offline service worker
  app.get('/sw-offline.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Service-Worker-Allowed', '/');
    res.sendFile('sw-offline.js', { root: './client/public' });
  });

  // Force update distribution script route
  app.get('/force-update-distribution.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile('force-update-distribution.js', { root: './client/public' });
  });

  // Module 11: Weather & Seasons
  app.get('/api/modules/11', (req, res) => {
    res.json({
      id: 11,
      title: "The Weather & The Seasons",
      description: "Learn to describe weather conditions and seasons",
      lessons: [
        {
          id: 1,
          title: "What's the Weather Like?",
          content: {
            introduction: "Hello! I'm Teacher Sam. Look outside your window! What do you see? Today, we're going to learn how to talk about the weather.",
            vocabulary: [
              { english: "Sunny", french: "Ensoleillé", hausa: "Mai rana", emoji: "☀️", example: "It is sunny today. I can play outside." },
              { english: "Rainy", french: "Pluvieux", hausa: "Mai ruwa", emoji: "🌧️", example: "It is rainy. I need an umbrella." },
              { english: "Cloudy", french: "Nuageux", hausa: "Mai gizagizai", emoji: "☁️", example: "It is cloudy. The sun is hiding." },
              { english: "Windy", french: "Venteux", hausa: "Mai iska", emoji: "💨", example: "It is windy. My hat might fly away!" },
              { english: "Snowy", french: "Neigeux", hausa: "Mai dusar kankara", emoji: "❄️", example: "It is snowy. Let's build a snowman!" }
            ]
          }
        },
        {
          id: 2,
          title: "The Four Seasons & What to Wear",
          content: {
            introduction: "Hi again! It's Teacher Sam! The weather changes with the seasons. There are four seasons in a year.",
            seasons: [
              { english: "Spring", french: "Printemps", hausa: "Bazara", emoji: "🌸", weather: "It is often rainy and a little sunny. Flowers grow." },
              { english: "Summer", french: "Été", hausa: "Damun rani", emoji: "🌞", weather: "It is hot and sunny." },
              { english: "Autumn", french: "Automne", hausa: "Kaka", emoji: "🍂", weather: "It is cool and windy. Leaves fall from the trees." },
              { english: "Winter", french: "Hiver", hausa: "Damun sanyi", emoji: "❄️", weather: "It is cold and sometimes snowy." }
            ],
            clothes: [
              { english: "T-shirt", french: "T-shirt", hausa: "Riga", emoji: "👕", usage: "I wear a t-shirt when it is hot." },
              { english: "Jacket", french: "Veste", hausa: "Jaket", emoji: "🧥", usage: "I wear a jacket when it is cold." },
              { english: "Umbrella", french: "Parapluie", hausa: "Laima", emoji: "☂️", usage: "I use an umbrella when it rains." },
              { english: "Hat", french: "Chapeau", hausa: "Hula", emoji: "🎩", usage: "I wear a hat to protect from the sun." },
              { english: "Scarf", french: "Écharpe", hausa: "Gyale", emoji: "🧣", usage: "I wear a scarf when it is cold." },
              { english: "Shorts", french: "Short", hausa: "Gajeren wando", emoji: "🩳", usage: "I wear shorts when it is very hot." }
            ]
          }
        }
      ]
    });
  });

  // Module 12: Around Town & Giving Directions
  app.get('/api/modules/12', (req, res) => {
    res.json({
      id: 12,
      title: "Around Town & Giving Directions",
      description: "Learn places in the city and how to give directions",
      lessons: [
        {
          id: 1,
          title: "Places in the City",
          content: {
            introduction: "Hello, explorers! I'm Teacher Sam. Today, let's take a walk around the city! There are many important places to visit.",
            places: [
              { english: "Supermarket", french: "Supermarché", hausa: "Kantin sayar da kaya", emoji: "🛒", example: "I am going to the supermarket to buy food." },
              { english: "Hospital", french: "Hôpital", hausa: "Asibiti", emoji: "🏥", example: "The doctor works at the hospital." },
              { english: "Park", french: "Parc", hausa: "Wurin shakatawa", emoji: "🌳", example: "We play in the park." },
              { english: "Library", french: "Bibliothèque", hausa: "Dakin karatu", emoji: "📚", example: "I read books at the library." },
              { english: "Restaurant", french: "Restaurant", hausa: "Gidan abinci", emoji: "🍽️", example: "We eat at a restaurant." },
              { english: "School", french: "École", hausa: "Makaranta", emoji: "🏫", example: "Children learn at school." },
              { english: "Market", french: "Marché", hausa: "Kasuwa", emoji: "🏪", example: "I buy vegetables at the market." },
              { english: "Mosque", french: "Mosquée", hausa: "Masallaci", emoji: "🕌", example: "People pray at the mosque." }
            ]
          }
        },
        {
          id: 2,
          title: "Giving Directions",
          content: {
            introduction: "Great! Now you know places in the city. But how do we tell someone how to get there? Let's learn directions!",
            directions: [
              { english: "Turn left", french: "Tournez à gauche", hausa: "Juya hagu", emoji: "⬅️", example: "Turn left at the traffic light." },
              { english: "Turn right", french: "Tournez à droite", hausa: "Juya dama", emoji: "➡️", example: "Turn right after the school." },
              { english: "Go straight", french: "Allez tout droit", hausa: "Ci gaba", emoji: "⬆️", example: "Go straight for two blocks." },
              { english: "Stop", french: "Arrêtez", hausa: "Tsaya", emoji: "🛑", example: "Stop at the red light." },
              { english: "Cross", french: "Traversez", hausa: "Ketare", emoji: "🚶", example: "Cross the street carefully." },
              { english: "Walk", french: "Marchez", hausa: "Tafiya", emoji: "🚶‍♂️", example: "Walk to the park." }
            ]
          }
        }
      ]
    });
  });

  // Module 13: Telling Stories (Irregular Past Tense)
  app.get('/api/modules/13', (req, res) => {
    res.json({
      id: 13,
      title: "Telling Stories (Irregular Past Tense)",
      description: "Learn special verbs for telling stories about yesterday",
      lessons: [
        {
          id: 1,
          title: "Yesterday's Special Verbs",
          content: {
            introduction: "Hello, storytellers! I'm Teacher Sam. Some important verbs are special! They change completely. These are irregular verbs.",
            irregularVerbs: [
              { present: "go", past: "went", french: "suis allé(e)", hausa: "na tafi", emoji: "🚶‍♂️", example: "Yesterday, I went to the park." },
              { present: "eat", past: "ate", french: "ai mangé", hausa: "na ci", emoji: "🍎", example: "Yesterday, I ate an apple." },
              { present: "see", past: "saw", french: "ai vu", hausa: "na gani", emoji: "👀", example: "Yesterday, I saw a big dog." },
              { present: "have", past: "had", french: "ai eu", hausa: "na samu", emoji: "🎁", example: "Yesterday, I had a good time." },
              { present: "do", past: "did", french: "ai fait", hausa: "na yi", emoji: "📝", example: "Yesterday, I did my homework." },
              { present: "come", past: "came", french: "suis venu(e)", hausa: "na zo", emoji: "🏃", example: "Yesterday, she came to visit us." },
              { present: "make", past: "made", french: "ai fait", hausa: "na yi", emoji: "🔨", example: "Yesterday, I made a paper airplane." }
            ]
          }
        },
        {
          id: 2,
          title: "Tell Me a Story!",
          content: {
            introduction: "Perfect! Now you know irregular verbs. Let's use them to tell stories! Can you tell me what you did yesterday?",
            storyFrameworks: [
              {
                title: "Yesterday at School",
                story: "Yesterday, I went to school. I saw my friend Ahmed. We ate lunch together. We had rice and chicken. After school, I came home and did my homework. My mother made tea. We had a good day!",
                french: "Hier, je suis allé(e) à l'école. J'ai vu mon ami Ahmed. Nous avons mangé ensemble. Nous avons eu du riz et du poulet. Après l'école, je suis rentré(e) à la maison et j'ai fait mes devoirs. Ma mère a fait du thé. Nous avons eu une bonne journée!",
                hausa: "Jiya, na tafi makaranta. Na ga abokina Ahmed. Mun ci abinci tare. Mun ci shinkafa da kaza. Bayan makaranta, na zo gida na yi aikin gida. Mahaifiyata ta yi shayi. Mun yi kyakkyawar rana!"
              },
              {
                title: "A Fun Weekend",
                story: "Last Saturday, I went to the market with my grandmother. We saw many things. She had money to buy vegetables. We came back home. I made drawings while she made food. We ate together. It was wonderful!",
                french: "Samedi dernier, je suis allé(e) au marché avec ma grand-mère. Nous avons vu beaucoup de choses. Elle avait de l'argent pour acheter des légumes. Nous sommes rentrés à la maison. J'ai fait des dessins pendant qu'elle faisait à manger. Nous avons mangé ensemble. C'était merveilleux!",
                hausa: "Asabar da ta wuce, na tafi kasuwa da kakarta. Mun ga abubuwa da yawa. Tana da kuɗi don siyan kayan lambu. Mun dawo gida. Na zana hotuna yayin da take dafa abinci. Mun ci abinci tare. Ya yi kyau sosai!"
              }
            ],
            practiceQuestions: [
              { question: "What did you do yesterday?", answer: "Yesterday, I went to...", emoji: "🤔" },
              { question: "Who did you see?", answer: "I saw my...", emoji: "👀" },
              { question: "What did you eat?", answer: "I ate...", emoji: "🍽️" },
              { question: "What did you make?", answer: "I made...", emoji: "🔨" },
              { question: "Did you have fun?", answer: "Yes, I had...", emoji: "😊" }
            ]
          }
        }
      ]
    });
  });

  // Module 14: Future Plans (Going To)
  app.get('/api/modules/14', (req, res) => {
    res.json({
      id: 14,
      title: "Future Plans (Going To)",
      description: "Learn to talk about your future plans and intentions",
      lessons: [
        {
          id: 1,
          title: "What Are You Going to Do?",
          content: {
            introduction: "Hello, planners! I'm Teacher Sam. We've talked about today and yesterday. Now, let's talk about the future!",
            examples: [
              { subject: "I", verb: "am", english: "I am going to play football.", french: "Je vais jouer au football.", hausa: "Zan buga kwallon kafa.", emoji: "⚽" },
              { subject: "You", verb: "are", english: "You are going to read a book.", french: "Tu vas lire un livre.", hausa: "Za ka karanta littafi.", emoji: "📚" },
              { subject: "He/She", verb: "is", english: "She is going to visit her grandmother.", french: "Elle va rendre visite à sa grand-mère.", hausa: "Za ta ziyarci kakarta.", emoji: "👵" },
              { subject: "We", verb: "are", english: "We are going to watch a movie.", french: "Nous allons regarder un film.", hausa: "Za mu kalli fim.", emoji: "🎬" },
              { subject: "They", verb: "are", english: "They are going to eat pizza.", french: "Ils vont manger de la pizza.", hausa: "Za su ci pizza.", emoji: "🍕" }
            ],
            activities: [
              { english: "Study", french: "Étudier", hausa: "Karatu", emoji: "📖", example: "I am going to study tomorrow." },
              { english: "Travel", french: "Voyager", hausa: "Tafiya", emoji: "✈️", example: "We are going to travel to Nigeria." },
              { english: "Cook", french: "Cuisiner", hausa: "Dafa abinci", emoji: "🍳", example: "She is going to cook rice." },
              { english: "Work", french: "Travailler", hausa: "Aiki", emoji: "💼", example: "He is going to work at the office." }
            ]
          }
        },
        {
          id: 2,
          title: "Questions About the Future",
          content: {
            introduction: "Great! Now you can talk about future plans. But how do we ask questions about the future? Let's learn!",
            questionStructure: {
              explanation: "To ask about future plans, we use: 'What are you going to do?' or 'Are you going to...?'",
              examples: [
                { question: "What are you going to do tomorrow?", answer: "I am going to play with my friends.", french: "Qu'est-ce que tu vas faire demain?", hausa: "Me za ka yi gobe?" },
                { question: "Are you going to study tonight?", answer: "Yes, I am going to study English.", french: "Vas-tu étudier ce soir?", hausa: "Za ka yi karatu a daren yau?" },
                { question: "Where are you going to go?", answer: "I am going to go to the market.", french: "Où vas-tu aller?", hausa: "Ina za ka je?" },
                { question: "Who are you going to visit?", answer: "I am going to visit my uncle.", french: "Qui vas-tu visiter?", hausa: "Wa za ka ziyarta?" }
              ]
            },
            timeExpressions: [
              { english: "Tomorrow", french: "Demain", hausa: "Gobe", emoji: "📅", example: "Tomorrow, I am going to clean my room." },
              { english: "Next week", french: "La semaine prochaine", hausa: "Mako mai zuwa", emoji: "📆", example: "Next week, we are going to take a test." },
              { english: "This evening", french: "Ce soir", hausa: "Yammacin yau", emoji: "🌆", example: "This evening, I am going to help my mother." },
              { english: "Later", french: "Plus tard", hausa: "Bayan nan", emoji: "⏰", example: "Later, I am going to call my friend." },
              { english: "Soon", french: "Bientôt", hausa: "Ba da dadewa ba", emoji: "⏳", example: "Soon, I am going to finish my homework." }
            ]
          }
        }
      ]
    });
  });

  // Module 15: Comparing & Feeling (Adjectives)
  app.get('/api/modules/15', (req, res) => {
    res.json({
      id: 15,
      title: "Comparing & Feeling (Adjectives)",
      description: "Learn to compare things and express more feelings",
      lessons: [
        {
          id: 1,
          title: "Bigger, Faster, Stronger!",
          content: {
            introduction: "Hello, detectives! I'm Teacher Sam. Today, we are going to compare things. Is an elephant bigger than a mouse?",
            shortAdjectives: [
              { adjective: "big", comparative: "bigger", french: "plus grand", hausa: "ya fi girma", emoji: "🐘", example: "An elephant is bigger than a mouse." },
              { adjective: "small", comparative: "smaller", french: "plus petit", hausa: "ya fi kankane", emoji: "🐭", example: "A mouse is smaller than an elephant." },
              { adjective: "fast", comparative: "faster", french: "plus rapide", hausa: "ya fi sauri", emoji: "🏃‍♂️", example: "A car is faster than a bicycle." },
              { adjective: "long", comparative: "longer", french: "plus long", hausa: "ya fi tsayi", emoji: "📏", example: "A ruler is longer than a pencil." },
              { adjective: "tall", comparative: "taller", french: "plus haut", hausa: "ya fi tsayi", emoji: "🏢", example: "A tree is taller than a house." },
              { adjective: "strong", comparative: "stronger", french: "plus fort", hausa: "ya fi karfi", emoji: "💪", example: "An elephant is stronger than a person." }
            ]
          }
        },
        {
          id: 2,
          title: "How Do You Feel?",
          content: {
            introduction: "Hi again! It's Teacher Sam. We know 'happy' and 'sad'. But sometimes we feel other things!",
            feelings: [
              { english: "Tired", french: "Fatigué(e)", hausa: "Gajiya", emoji: "😴", example: "After playing all day, I feel tired." },
              { english: "Hungry", french: "Avoir faim", hausa: "Yunwa", emoji: "🍽️", example: "It's 12 o'clock. I am hungry!" },
              { english: "Thirsty", french: "Avoir soif", hausa: "Kishirwa", emoji: "🥤", example: "The sun is hot. I am thirsty. I need water." },
              { english: "Excited", french: "Enthousiaste", hausa: "Farin ciki", emoji: "🎉", example: "Tomorrow is my birthday! I am so excited!" },
              { english: "Bored", french: "S'ennuyer", hausa: "Gajiya", emoji: "😑", example: "There is nothing to do. I am bored." },
              { english: "Proud", french: "Fier", hausa: "Girman kai", emoji: "😊", example: "I finished my homework. I am proud!" },
              { english: "Surprised", french: "Surpris", hausa: "Mamaki", emoji: "😮", example: "Wow! I am surprised by this gift!" }
            ]
          }
        }
      ]
    });
  });

  // Serve verification pages
  app.get('/complete-module-verification-final.html', (req, res) => {
    const path = require('path');
    res.sendFile(path.join(process.cwd(), 'complete-module-verification-final.html'));
  });

  const httpServer = createServer(app);
  return httpServer;
}
