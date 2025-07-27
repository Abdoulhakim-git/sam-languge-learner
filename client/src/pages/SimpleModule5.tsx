import React from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function SimpleModule5() {
  return (
    <div className="min-h-screen bg-green-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/modules">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <ArrowLeft className="w-4 h-4" />
              Back to Modules
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-green-800">Module 5: Animals & Nature</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Module 5!</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Animals</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-4xl mb-2">🐕</div>
                  <p className="font-medium">Dog</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🐱</div>
                  <p className="font-medium">Cat</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🐦</div>
                  <p className="font-medium">Bird</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🐠</div>
                  <p className="font-medium">Fish</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Nature</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-4xl mb-2">🌳</div>
                  <p className="font-medium">Tree</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🌸</div>
                  <p className="font-medium">Flower</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🌞</div>
                  <p className="font-medium">Sun</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🌙</div>
                  <p className="font-medium">Moon</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">This is a simplified version of Module 5 for testing.</p>
            <p className="text-green-600 font-medium mt-2">✓ Module 5 is working correctly!</p>
          </div>
        </div>
      </div>
    </div>
  );
}