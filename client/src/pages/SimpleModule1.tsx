import React from "react";
import { Link } from "wouter";
import { Home } from "lucide-react";

export default function SimpleModule1() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/modules">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Home className="w-4 h-4" />
                Back to Modules
              </button>
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-4">
            Module 1: Alphabet & Numbers
          </h1>
          
          <p className="text-lg text-center text-gray-600 mb-6">
            Learn the English alphabet and numbers 1-20
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Alphabet (A-Z)</h2>
              <div className="grid grid-cols-6 gap-2 text-center">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                  <div key={letter} className="bg-white p-2 rounded border hover:bg-blue-100 cursor-pointer">
                    {letter}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Numbers (1-20)</h2>
              <div className="grid grid-cols-5 gap-2 text-center">
                {Array.from({length: 20}, (_, i) => i + 1).map(num => (
                  <div key={num} className="bg-white p-2 rounded border hover:bg-green-100 cursor-pointer">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              This is a simplified version of Module 1 to test functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}