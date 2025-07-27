import React from "react";
import { Play } from "lucide-react";

interface TestButtonProps {
  text: string;
  onClick: () => void;
}

export function TestButton({ text, onClick }: TestButtonProps) {
  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('TEST BUTTON CLICKED:', text);
        alert('Button clicked: ' + text);
        onClick();
      }}
      style={{
        pointerEvents: 'auto',
        zIndex: 9999,
        position: 'relative'
      }}
    >
      <Play className="w-4 h-4" />
      <span>Test: {text}</span>
    </button>
  );
}