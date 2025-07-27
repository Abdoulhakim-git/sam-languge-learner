import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { bulletproofAudioSystem } from '@/lib/bulletproofAudioSystem';
import { strictEnglishAudio } from '@/lib/strictEnglishAudio';

interface CreationStudioProps {
  onClose: () => void;
}

export function CreationStudio({ onClose }: CreationStudioProps) {
  const [currentProject, setCurrentProject] = useState('story');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectContent, setProjectContent] = useState('');

  const handleShare = async () => {
    if (!projectTitle || !projectContent) {
      await strictEnglishAudio.speak("Please add a title and write some content before sharing your creation!");
      return;
    }
    
    await strictEnglishAudio.speak("Great work on your creation! Sharing helps others learn too!");
    
    // Create sharing functionality
    const creationData = {
      type: currentProject,
      title: projectTitle,
      content: projectContent,
      date: new Date().toLocaleDateString(),
      author: "Student"
    };
    
    // Store in localStorage for demonstration
    const existingCreations = JSON.parse(localStorage.getItem('samlang-creations') || '[]');
    existingCreations.push(creationData);
    localStorage.setItem('samlang-creations', JSON.stringify(existingCreations));
    
    console.log('✅ Creation shared successfully:', creationData);
  };

  const handleSaveDraft = async () => {
    if (!projectTitle && !projectContent) {
      await strictEnglishAudio.speak("Write something first, then I can save your draft!");
      return;
    }
    
    await strictEnglishAudio.speak("Draft saved! You can continue working on it later!");
    
    // Save draft functionality
    const draftData = {
      type: currentProject,
      title: projectTitle || 'Untitled Draft',
      content: projectContent,
      saved: new Date().toISOString(),
      isDraft: true
    };
    
    // Store draft in localStorage
    const existingDrafts = JSON.parse(localStorage.getItem('samlang-drafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('samlang-drafts', JSON.stringify(existingDrafts));
    
    console.log('✅ Draft saved successfully:', draftData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center">🎨 Creation Studio</h3>
        
        <div className="mb-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setCurrentProject('story')}
              className={`px-4 py-2 rounded-lg ${
                currentProject === 'story' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              📚 Story
            </button>
            <button
              onClick={() => setCurrentProject('invention')}
              className={`px-4 py-2 rounded-lg ${
                currentProject === 'invention' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              💡 Invention
            </button>
            <button
              onClick={() => setCurrentProject('community')}
              className={`px-4 py-2 rounded-lg ${
                currentProject === 'community' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              🏘️ Community Project
            </button>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            
            <textarea
              placeholder={
                currentProject === 'story' ? "Tell your story in English..." :
                currentProject === 'invention' ? "Describe your invention..." :
                "How will this help your community?"
              }
              value={projectContent}
              onChange={(e) => setProjectContent(e.target.value)}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            
            <div className="flex gap-2">
              <button 
                onClick={handleShare}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                🔊 Share Creation
              </button>
              <button 
                onClick={handleSaveDraft}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                💾 Save Draft
              </button>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Close Studio
        </button>
      </motion.div>
    </div>
  );
}