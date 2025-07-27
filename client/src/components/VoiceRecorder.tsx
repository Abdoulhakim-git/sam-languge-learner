import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { bulletproofAudioSystem } from '@/lib/bulletproofAudioSystem';

interface VoiceRecorderProps {
  onClose: () => void;
}

export function VoiceRecorder({ onClose }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioUrlRef = useRef<string>('');

  useEffect(() => {
    // Check if browser supports media recording
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setRecordingStatus('Recording not supported in this browser');
    }

    return () => {
      // Cleanup audio URLs
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setRecordingStatus('Getting microphone permission...');
      
      // Check browser support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Media recording not supported in this browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      // Check MediaRecorder support
      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        console.warn('webm not supported, trying wav');
      }

      const options = MediaRecorder.isTypeSupported('audio/webm') 
        ? { mimeType: 'audio/webm' }
        : { mimeType: 'audio/wav' };

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        try {
          const mimeType = mediaRecorder.mimeType || 'audio/webm';
          const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
          
          if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current);
          }
          
          audioUrlRef.current = URL.createObjectURL(audioBlob);
          setHasRecording(true);
          setRecordingStatus('Recording saved! You can play it back or try again.');
          
          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
        } catch (error) {
          console.error('Error processing recording:', error);
          setRecordingStatus('Error processing recording. Please try again.');
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setRecordingStatus('Recording error occurred. Please try again.');
        setIsRecording(false);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingStatus('Recording... Speak clearly in English!');
      
      // Play instruction audio after a brief delay
      setTimeout(async () => {
        try {
          await bulletproofAudioSystem.speak("Recording started! Practice saying: Hello, my name is... I am from Niger.");
        } catch (audioError) {
          console.warn('Audio instruction failed:', audioError);
        }
      }, 500);
      
    } catch (error) {
      console.error('Recording error:', error);
      setIsRecording(false);
      
      if (error.name === 'NotAllowedError') {
        setRecordingStatus('Microphone access denied. Please allow microphone access and try again.');
      } else if (error.name === 'NotFoundError') {
        setRecordingStatus('No microphone found. Please connect a microphone and try again.');
      } else if (error.name === 'NotSupportedError') {
        setRecordingStatus('Recording not supported in this browser. Try Chrome or Firefox.');
      } else {
        setRecordingStatus(`Recording failed: ${error.message || 'Unknown error'}. Please try again.`);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingStatus('Processing recording...');
    }
  };

  const playRecording = () => {
    if (audioUrlRef.current) {
      setIsPlaying(true);
      const audio = new Audio(audioUrlRef.current);
      
      audio.onended = () => setIsPlaying(false);
      audio.onerror = (error) => {
        console.error('Playback error:', error);
        setIsPlaying(false);
        setRecordingStatus('Error playing recording. Recording may be corrupted.');
      };
      
      audio.play().catch((error) => {
        console.error('Play promise rejected:', error);
        setIsPlaying(false);
        setRecordingStatus('Could not play recording. Please try recording again.');
      });
    }
  };

  const playTeacherExample = async () => {
    try {
      await bulletproofAudioSystem.speak("Hello! My name is Teacher Sam. I am from Niger. I love teaching English to children. Now you try!");
    } catch (error) {
      console.warn('Teacher example audio failed:', error);
    }
  };

  const provideFeedback = async () => {
    try {
      await bulletproofAudioSystem.speak("Great job practicing! Keep recording to improve your pronunciation. Practice makes perfect!");
    } catch (error) {
      console.warn('Feedback audio failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl p-6 max-w-md mx-auto shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h3 className="text-xl font-bold mb-4 text-center text-orange-600">🎤 Voice Practice</h3>
        
        <div className="text-center mb-4">
          <div className="text-6xl mb-4">
            {isRecording ? '🔴' : hasRecording ? '🎙️' : '🎤'}
          </div>
          
          <div className="space-y-3">
            {!hasRecording && (
              <button 
                onClick={isRecording ? stopRecording : startRecording}
                disabled={recordingStatus.includes('not supported')}
                className={`px-6 py-3 rounded-lg font-bold ${
                  isRecording 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400'
                }`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            )}

            {hasRecording && (
              <div className="space-y-2">
                <button 
                  onClick={playRecording}
                  disabled={isPlaying}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 mr-2"
                >
                  {isPlaying ? 'Playing...' : 'Play My Recording'}
                </button>
                <button 
                  onClick={() => {
                    setHasRecording(false);
                    setRecordingStatus('');
                  }}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Record Again
                </button>
              </div>
            )}

            <div className="space-y-2">
              <button 
                onClick={playTeacherExample}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
              >
                🔊 Hear Teacher Sam Example
              </button>
              
              {hasRecording && (
                <button 
                  onClick={provideFeedback}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm ml-2"
                >
                  🌟 Get Encouragement
                </button>
              )}
            </div>
          </div>
          
          {recordingStatus && (
            <p className={`text-sm mt-3 p-2 rounded ${
              recordingStatus.includes('Error') || recordingStatus.includes('denied') || recordingStatus.includes('failed')
                ? 'text-red-600 bg-red-50 border border-red-200'
                : recordingStatus.includes('saved') || recordingStatus.includes('Recording...')
                ? 'text-green-600 bg-green-50 border border-green-200'
                : 'text-gray-600 bg-gray-50'
            }`}>
              {recordingStatus}
            </p>
          )}
          
          <p className="text-xs text-gray-500 mt-3">
            Practice pronunciation with Teacher Sam! Record yourself and compare.
          </p>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Close Voice Practice
        </button>
      </motion.div>
    </div>
  );
}