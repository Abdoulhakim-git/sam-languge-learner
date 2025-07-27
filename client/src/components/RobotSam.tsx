import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RobotGesture } from "@/types";

interface RobotSamProps {
  isTeaching?: boolean;
  gesture?: RobotGesture;
  screenText?: string;
  size?: 'small' | 'medium' | 'large';
  showSpeechBubble?: boolean;
  speechText?: string;
  customOutfits?: string[];
}

export function RobotSam({ 
  isTeaching = false, 
  gesture,
  screenText = "HELLO!",
  size = 'medium',
  showSpeechBubble = false,
  speechText = "Hello! I'm Teacher Sam!",
  customOutfits = []
}: RobotSamProps) {
  const [currentGesture, setCurrentGesture] = useState<RobotGesture>({ type: 'idle', duration: 0 });

  useEffect(() => {
    if (gesture) {
      setCurrentGesture(gesture);
      setTimeout(() => {
        setCurrentGesture({ type: 'idle', duration: 0 });
      }, gesture.duration);
    }
  }, [gesture]);

  const sizeClasses = {
    small: "w-32 h-48",
    medium: "w-40 h-56",
    large: "w-48 h-64"
  };

  const headSizeClasses = {
    small: "w-20 h-20",
    medium: "w-28 h-28", 
    large: "w-36 h-36"
  };

  const getGestureAnimation = () => {
    switch (currentGesture.type) {
      case 'wave':
        return {
          rotate: [0, 15, -15, 0],
          transition: { duration: 2, repeat: Infinity }
        };
      case 'point':
        return {
          rotate: [0, 30],
          transition: { duration: 0.5 }
        };
      case 'nod':
        return {
          y: [0, -5, 0],
          transition: { duration: 1, repeat: 3 }
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative">
      {/* Humanoid Robot Body */}
      <motion.div 
        className={`${sizeClasses[size]} relative mx-auto`}
        animate={{
          y: [0, -6, 0],
          rotateZ: [0, 0.5, -0.5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Robot Body */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-gradient-to-b from-gray-400 to-gray-600 rounded-lg shadow-2xl border-4 border-gray-700">
          {/* Control Panel */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-black rounded border border-gray-500 flex flex-col items-center justify-center">
            <div className="w-8 h-1 bg-green-400 rounded mb-1"></div>
            <div className="w-6 h-1 bg-blue-400 rounded mb-1"></div>
            <div className="w-7 h-1 bg-red-400 rounded"></div>
          </div>

          {/* Control panel at bottom */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <motion.div 
                className="w-2 h-2 bg-orange-500 rounded-full border border-orange-600"
                animate={{ opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <motion.div 
                className="w-2 h-2 bg-white rounded-full border border-gray-300"
                animate={{ opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              />
              <motion.div 
                className="w-2 h-2 bg-green-500 rounded-full border border-green-600"
                animate={{ opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Robot Arms */}
        <motion.div 
          className="absolute bottom-28 -left-6 w-8 h-4 bg-gray-500 rounded-full border-2 border-gray-700"
          animate={{ rotate: [0, -10, 0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-28 -right-6 w-8 h-4 bg-gray-500 rounded-full border-2 border-gray-700"
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Robot Hands */}
        <div className="absolute bottom-27 -left-8 w-4 h-4 bg-blue-500 rounded-full border-2 border-gray-700"></div>
        <div className="absolute bottom-27 -right-8 w-4 h-4 bg-blue-500 rounded-full border-2 border-gray-700"></div>
        
        {/* Robot Legs */}
        <div className="absolute -bottom-8 left-2 w-4 h-12 bg-gradient-to-b from-gray-500 to-gray-700 rounded-b-lg border-2 border-gray-800"></div>
        <div className="absolute -bottom-8 right-2 w-4 h-12 bg-gradient-to-b from-gray-500 to-gray-700 rounded-b-lg border-2 border-gray-800"></div>
        
        {/* Robot Feet */}
        <div className="absolute -bottom-12 left-1 w-6 h-3 bg-gray-800 rounded-full border border-gray-900"></div>
        <div className="absolute -bottom-12 right-1 w-6 h-3 bg-gray-800 rounded-full border border-gray-900"></div>
        {/* Robot Head */}
        <motion.div 
          className={`absolute bottom-38 left-1/2 transform -translate-x-1/2 ${headSizeClasses[size]} bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl border-4 border-gray-700 shadow-xl`}
          animate={currentGesture.type === 'nod' ? getGestureAnimation() : {}}
        >
          {/* Robot Eyes */}
          <div className="absolute top-4 left-3 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-gray-700"></div>
          <div className="absolute top-4 right-3 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-gray-700"></div>
          
          {/* Screen/Display */}
          <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-black rounded border-2 border-gray-700 flex items-center justify-center">
            <div className="text-green-400 text-xs font-mono">
              {screenText || "SAM"}
            </div>
          </div>
          
          {/* Antenna */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-600"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          
          {/* Custom Outfits */}
          {customOutfits.includes('hausa-hat') && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-r from-red-600 to-green-600 rounded-t-full border-2 border-niger-gold"></div>
          )}
          {customOutfits.includes('fulani-turban') && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-18 h-6 bg-gradient-to-r from-blue-800 to-white rounded-full border-2 border-niger-gold"></div>
          )}
          {customOutfits.includes('tuareg-veil') && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-indigo-800 to-blue-600 rounded-b-full opacity-80"></div>
          )}
          {customOutfits.includes('scholar-glasses') && (
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-12 h-4 border-2 border-gray-800 rounded-full bg-transparent"></div>
          )}
        </motion.div>

        {/* Teacher Sam text on head */}
        <motion.div 
          className="absolute bottom-42 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-niger-gold to-orange-500 rounded-lg px-2 py-1 border-2 border-white shadow-lg z-10"
          animate={{ 
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-center">
            <motion.div 
              className="text-white text-xs font-bold"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              TEACHER SAM
            </motion.div>
          </div>
        </motion.div>

        {/* Screen text display */}
        {screenText && (
          <motion.div 
            className="absolute bottom-48 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-gray-900 to-black rounded-xl px-3 py-2 border-2 border-niger-gold shadow-lg z-20"
            animate={{ 
              y: [0, -3, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-center min-w-[120px]">
              <motion.div 
                className="text-green-400 text-sm font-bold"
                animate={{ 
                  color: ["#4ade80", "#22c55e", "#16a34a", "#22c55e", "#4ade80"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {screenText}
              </motion.div>
            </div>
          </motion.div>
        )}

        
        {/* Humanoid Arms - positioned from shoulders */}
        <motion.div 
          className="absolute bottom-28 -left-6 w-5 h-20 bg-gradient-to-b from-niger-gold to-blue-500 rounded-full border-2 border-yellow-300 transform rotate-12"
          animate={currentGesture.type === 'wave' ? getGestureAnimation() : {}}
        >
          {/* Elbow joint */}
          <div className="absolute left-1/2 top-12 transform -translate-x-1/2 w-3 h-3 bg-niger-gold rounded-full border border-yellow-400"></div>
          {/* Hand */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-200 rounded-full border-2 border-niger-gold"></div>
        </motion.div>
        <motion.div 
          className="absolute bottom-28 -right-6 w-5 h-20 bg-gradient-to-b from-niger-gold to-blue-500 rounded-full border-2 border-yellow-300 transform -rotate-12"
          animate={currentGesture.type === 'point' ? getGestureAnimation() : {}}
        >
          {/* Elbow joint */}
          <div className="absolute left-1/2 top-12 transform -translate-x-1/2 w-3 h-3 bg-niger-gold rounded-full border border-yellow-400"></div>
          {/* Hand */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-200 rounded-full border-2 border-niger-gold"></div>
        </motion.div>

        {/* Legs for humanoid appearance */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
          <div className="flex space-x-2">
            <div className="w-6 h-12 bg-gradient-to-b from-blue-500 to-niger-gold rounded-full border-2 border-yellow-300">
              {/* Foot */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-600 rounded-full border border-gray-700"></div>
            </div>
            <div className="w-6 h-12 bg-gradient-to-b from-blue-500 to-niger-gold rounded-full border-2 border-yellow-300">
              {/* Foot */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-600 rounded-full border border-gray-700"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Speech Bubble with Niger theme */}
      {showSpeechBubble && (
        <motion.div 
          className="absolute -right-6 top-2 bg-gradient-to-br from-white to-yellow-50 rounded-2xl p-4 shadow-2xl border-4 border-niger-gold max-w-xs z-10"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="flex items-start space-x-2">
            <div className="text-2xl">💭</div>
            <div>
              <p className="text-sm font-semibold text-gray-800 leading-relaxed">{speechText}</p>
              <div className="flex justify-end mt-1 space-x-1">
                <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-8 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-8 border-r-niger-gold transform -translate-x-full"></div>
        </motion.div>
      )}

      {/* Enhanced Teaching Board with Niger cultural elements */}
      {isTeaching && (
        <motion.div 
          className="absolute -right-16 top-6 w-24 h-20 bg-gradient-to-b from-white to-yellow-50 rounded-lg border-4 border-niger-gold shadow-xl"
          initial={{ opacity: 0, x: 30, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="p-2 text-center">
            <motion.div 
              className="text-lg font-bold text-american-blue mb-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ABC
            </motion.div>
            <motion.div 
              className="text-sm text-niger-gold font-bold mb-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              123
            </motion.div>
            {/* Mini Niger flag */}
            <div className="flex justify-center space-x-0.5 mb-1">
              <div className="w-2 h-1 bg-orange-500 rounded-sm"></div>
              <div className="w-2 h-1 bg-white rounded-sm border border-gray-200"></div>
              <div className="w-2 h-1 bg-green-500 rounded-sm"></div>
            </div>
            {/* Activity indicators */}
            <div className="flex justify-center space-x-1">
              <motion.div 
                className="w-1.5 h-1.5 bg-red-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div 
                className="w-1.5 h-1.5 bg-green-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div 
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
