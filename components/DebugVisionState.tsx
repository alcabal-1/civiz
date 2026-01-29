// Debug component to monitor vision state changes
'use client';

import React, { useEffect } from 'react';
import { useVisionStore } from '../lib/visionStore';

export default function DebugVisionState() {
  const visions = useVisionStore((state) => state.visions);
  const updateVisionImageGeneration = useVisionStore((state) => state.updateVisionImageGeneration);
  
  useEffect(() => {
    console.log('=== Vision State Changed ===');
    visions.forEach(vision => {
      if (vision.isGenerating !== undefined) {
        console.log(`Vision ${vision.id}:`, {
          text: vision.text.substring(0, 30) + '...',
          isGenerating: vision.isGenerating,
          hasGeneratedImage: !!vision.generatedImageUrl,
          imageUrl: vision.imageUrl?.substring(0, 50) + '...',
          address: vision.address
        });
      }
    });
    console.log('========================');
  }, [visions]);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-3 rounded-lg max-w-xs">
      <h4 className="font-bold mb-2">🐛 Debug Vision State</h4>
      {visions.slice(0, 3).map(vision => (
        <div key={vision.id} className="mb-2 p-2 bg-gray-800 rounded">
          <div>ID: {vision.id.slice(-8)}</div>
          <div>Generating: {vision.isGenerating ? '🔄' : '✅'}</div>
          <div>Has Image: {vision.generatedImageUrl ? '🖼️' : '❌'}</div>
          <div>URL: {vision.imageUrl ? '✅' : '❌'}</div>
          {vision.isGenerating && (
            <button 
              onClick={() => updateVisionImageGeneration(vision.id, false, 'https://picsum.photos/800/600')}
              className="text-xs bg-red-500 px-1 py-0.5 rounded mt-1"
            >
              Force Stop
            </button>
          )}
        </div>
      ))}
    </div>
  );
}