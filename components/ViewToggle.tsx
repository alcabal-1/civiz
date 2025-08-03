// components/ViewToggle.tsx
'use client';

import React from 'react';
import { useVisionStore } from '../lib/visionStore';

export default function ViewToggle() {
  const viewMode = useVisionStore((state) => state.viewMode);
  const toggleViewMode = useVisionStore((state) => state.toggleViewMode);
  
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-black/20 backdrop-blur-md rounded-full p-1 border border-gray-700">
        <div className="flex gap-1">
          <button
            onClick={() => viewMode === 'city' && toggleViewMode()}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              viewMode === 'user'
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Visions
          </button>
          <button
            onClick={() => viewMode === 'user' && toggleViewMode()}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              viewMode === 'city'
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            City Visions
          </button>
        </div>
      </div>
    </div>
  );
}