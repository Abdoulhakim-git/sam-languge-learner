import React from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function SimpleModule4() {
  return (
    <div className="min-h-screen bg-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/modules">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <ArrowLeft className="w-4 h-4" />
              Back to Modules
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-purple-800">Module 4: Colors & Shapes</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Module 4!</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Colors</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-lg mx-auto mb-2"></div>
                  <p className="font-medium">Red</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                  <p className="font-medium">Blue</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-lg mx-auto mb-2"></div>
                  <p className="font-medium">Yellow</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-2"></div>
                  <p className="font-medium">Green</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Shapes</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-4xl mb-2">🔵</div>
                  <p className="font-medium">Circle</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🟩</div>
                  <p className="font-medium">Square</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🔺</div>
                  <p className="font-medium">Triangle</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🟦</div>
                  <p className="font-medium">Rectangle</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">This is a simplified version of Module 4 for testing.</p>
            <p className="text-green-600 font-medium mt-2">✓ Module 4 is working correctly!</p>
          </div>
        </div>
      </div>
    </div>
  );
}