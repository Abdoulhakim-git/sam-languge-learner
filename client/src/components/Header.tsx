import React from "react";

export function Header() {
  return (
    <header className="bg-white shadow-lg border-b-4 border-american-blue relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Niger Flag */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-8 border border-gray-300 overflow-hidden rounded flex flex-col">
              <div className="h-1/3 bg-orange-500"></div>
              <div className="h-1/3 bg-white flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <div className="h-1/3 bg-green-600"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">Niger</span>
          </div>
          
          {/* American Corner Maradi Title */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-fredoka text-american-blue">
              American Corner Maradi
            </h1>
            <p className="text-sm text-gray-600 font-medium">English Learning with Teacher Sam</p>
          </div>
          
          {/* US Flag */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">USA</span>
            <div className="w-12 h-8 border border-gray-300 overflow-hidden rounded relative">
              {/* SVG Flag for accuracy */}
              <svg className="w-full h-full" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
                {/* Red stripes background */}
                <rect width="48" height="32" fill="#B22234"/>
                
                {/* White stripes */}
                <rect x="0" y="2.5" width="48" height="2.3" fill="white"/>
                <rect x="0" y="7.1" width="48" height="2.3" fill="white"/>
                <rect x="0" y="11.7" width="48" height="2.3" fill="white"/>
                <rect x="0" y="16.3" width="48" height="2.3" fill="white"/>
                <rect x="0" y="20.9" width="48" height="2.3" fill="white"/>
                <rect x="0" y="25.5" width="48" height="2.3" fill="white"/>
                <rect x="0" y="30.1" width="48" height="1.9" fill="white"/>
                
                {/* Blue canton */}
                <rect x="0" y="0" width="19.2" height="16" fill="#3C3B6E"/>
                
                {/* Stars in accurate pattern */}
                <g fill="white">
                  {/* Row 1 - 6 stars */}
                  <text x="2" y="3" fontSize="2" textAnchor="middle">★</text>
                  <text x="5" y="3" fontSize="2" textAnchor="middle">★</text>
                  <text x="8" y="3" fontSize="2" textAnchor="middle">★</text>
                  <text x="11" y="3" fontSize="2" textAnchor="middle">★</text>
                  <text x="14" y="3" fontSize="2" textAnchor="middle">★</text>
                  <text x="17" y="3" fontSize="2" textAnchor="middle">★</text>
                  
                  {/* Row 2 - 5 stars */}
                  <text x="3.5" y="5.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="6.5" y="5.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="9.5" y="5.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="12.5" y="5.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="15.5" y="5.5" fontSize="2" textAnchor="middle">★</text>
                  
                  {/* Row 3 - 6 stars */}
                  <text x="2" y="8" fontSize="2" textAnchor="middle">★</text>
                  <text x="5" y="8" fontSize="2" textAnchor="middle">★</text>
                  <text x="8" y="8" fontSize="2" textAnchor="middle">★</text>
                  <text x="11" y="8" fontSize="2" textAnchor="middle">★</text>
                  <text x="14" y="8" fontSize="2" textAnchor="middle">★</text>
                  <text x="17" y="8" fontSize="2" textAnchor="middle">★</text>
                  
                  {/* Row 4 - 5 stars */}
                  <text x="3.5" y="10.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="6.5" y="10.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="9.5" y="10.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="12.5" y="10.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="15.5" y="10.5" fontSize="2" textAnchor="middle">★</text>
                  
                  {/* Row 5 - 6 stars */}
                  <text x="2" y="13" fontSize="2" textAnchor="middle">★</text>
                  <text x="5" y="13" fontSize="2" textAnchor="middle">★</text>
                  <text x="8" y="13" fontSize="2" textAnchor="middle">★</text>
                  <text x="11" y="13" fontSize="2" textAnchor="middle">★</text>
                  <text x="14" y="13" fontSize="2" textAnchor="middle">★</text>
                  <text x="17" y="13" fontSize="2" textAnchor="middle">★</text>
                  
                  {/* Row 6 - 5 stars */}
                  <text x="3.5" y="15.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="6.5" y="15.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="9.5" y="15.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="12.5" y="15.5" fontSize="2" textAnchor="middle">★</text>
                  <text x="15.5" y="15.5" fontSize="2" textAnchor="middle">★</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
