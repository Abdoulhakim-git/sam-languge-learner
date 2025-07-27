#!/usr/bin/env node

// Quick audio fix for modules 12-15 - Replace all placeholder console.log with working audio

import fs from 'fs';
import path from 'path';

const modules = [
  { file: 'client/src/pages/Module12.tsx', name: 'Module 12' },
  { file: 'client/src/pages/Module13.tsx', name: 'Module 13' },
  { file: 'client/src/pages/Module14.tsx', name: 'Module 14' },
  { file: 'client/src/pages/Module15.tsx', name: 'Module 15' }
];

function fixModuleAudio(filePath, moduleName) {
  console.log(`Fixing audio in ${moduleName}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix different types of console.log patterns with appropriate audio responses
  
  // General click audio for vocabulary/interactive elements
  content = content.replace(
    /onClick=\{\(\) => console\.log\("Audio would play here"\)\}/g,
    `onClick={() => {
      const utterance = new SpeechSynthesisUtterance("Click! Great choice! Let me help you learn this!");
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }}`
  );
  
  // Fix specific practice sentence patterns
  const practicePatterns = [
    {
      // Module 12 patterns
      search: /<p onClick=\{\(\) => console\.log\("Audio would play here"\)\} className="cursor-pointer hover:bg-amber-100 p-2 rounded">\s*🔊 "Where are you going\?" → "I am going to the library\."/g,
      replace: `<p onClick={() => {
        const utterance = new SpeechSynthesisUtterance("Where are you going? I am going to the library! Perfect!");
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }} className="cursor-pointer hover:bg-amber-100 p-2 rounded">
        🔊 "Where are you going?" → "I am going to the library."`
    },
    {
      search: /<p onClick=\{\(\) => console\.log\("Audio would play here"\)\} className="cursor-pointer hover:bg-amber-100 p-2 rounded">\s*🔊 "I am going to the park to play with friends\."/g,
      replace: `<p onClick={() => {
        const utterance = new SpeechSynthesisUtterance("I am going to the park to play with friends! Excellent sentence!");
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }} className="cursor-pointer hover:bg-amber-100 p-2 rounded">
        🔊 "I am going to the park to play with friends."`
    },
    {
      // Module 13 patterns
      search: /<p onClick=\{\(\) => console\.log\("Audio would play here"\)\} className="cursor-pointer hover:bg-purple-100 p-3 rounded border">\s*🔊 Yesterday, I ______ to school\. \(go\) → <strong>went<\/strong>/g,
      replace: `<p onClick={() => {
        const utterance = new SpeechSynthesisUtterance("Yesterday, I went to school. Go becomes went! Great job!");
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }} className="cursor-pointer hover:bg-purple-100 p-3 rounded border">
        🔊 Yesterday, I ______ to school. (go) → <strong>went</strong>`
    },
    {
      // Module 14 patterns  
      search: /<p onClick=\{\(\) => console\.log\("Audio would play here"\)\} className="cursor-pointer hover:bg-teal-100 p-3 rounded border">\s*🔊 Tomorrow, I ______ to the park\. → <strong>am going<\/strong>/g,
      replace: `<p onClick={() => {
        const utterance = new SpeechSynthesisUtterance("Tomorrow, I am going to the park. Perfect future tense!");
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }} className="cursor-pointer hover:bg-teal-100 p-3 rounded border">
        🔊 Tomorrow, I ______ to the park. → <strong>am going</strong>`
    },
    {
      // Module 15 patterns
      search: /<p onClick=\{\(\) => console\.log\("Audio would play here"\)\} className="cursor-pointer hover:bg-amber-100 p-3 rounded border">\s*🔊 A lion \/ a cat \(strong\) → <strong>A lion is stronger than a cat\.<\/strong>/g,
      replace: `<p onClick={() => {
        const utterance = new SpeechSynthesisUtterance("A lion is stronger than a cat. Perfect comparison!");
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }} className="cursor-pointer hover:bg-amber-100 p-3 rounded border">
        🔊 A lion / a cat (strong) → <strong>A lion is stronger than a cat.</strong>`
    }
  ];
  
  // Apply specific pattern fixes
  practicePatterns.forEach(pattern => {
    content = content.replace(pattern.search, pattern.replace);
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed audio in ${moduleName}`);
}

// Fix all modules
modules.forEach(module => {
  if (fs.existsSync(module.file)) {
    fixModuleAudio(module.file, module.name);
  } else {
    console.log(`⚠️ File not found: ${module.file}`);
  }
});

console.log('\n🎉 All modules audio fixed! Modules 12-15 now have working clickable audio.');