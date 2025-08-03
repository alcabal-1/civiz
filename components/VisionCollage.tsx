// components/VisionCollage.tsx
'use client';

import React from 'react';
import { useVisionStore } from '../lib/visionStore';
import { Heart } from 'lucide-react';
export default function VisionCollage() {
  const viewMode = useVisionStore((state) => state.viewMode);
  const currentUserId = useVisionStore((state) => state.currentUserId);
  const likeVision = useVisionStore((state) => state.likeVision);
  const getUserVisions = useVisionStore((state) => state.getUserVisions);
  const getCityVisions = useVisionStore((state) => state.getCityVisions);
  
  // Get visions based on view mode
  const visions = viewMode === 'user' ? getUserVisions() : getCityVisions();
  
  // For user view, we want to show latest vision in top-left
  const displayVisions = viewMode === 'user' && visions.length > 0
    ? [visions[0], ...visions.slice(1).sort((a, b) => b.points - a.points)]
    : visions;
  
  // Take first 6 visions for the collage
  const collageVisions = displayVisions.slice(0, 6);
  
  // Fill empty slots with placeholders
  const visionsWithPlaceholders = [...collageVisions];
  while (visionsWithPlaceholders.length < 6) {
    visionsWithPlaceholders.push(null);
  }
  
  const handleLike = (visionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    likeVision(visionId);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {visionsWithPlaceholders.map((vision, index) => (
          <div
            key={vision?.id || `placeholder-${index}`}
            className="relative group overflow-hidden rounded-lg aspect-square bg-gray-800/50 backdrop-blur-sm"
          >
            {vision ? (
              <>
                <img
                  src={vision.imageUrl}
                  alt={vision.text}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay with vision details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm mb-2 line-clamp-2">{vision.text}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-300">{vision.category}</span>
                      <button
                        onClick={(e) => handleLike(vision.id, e)}
                        className={`flex items-center gap-1 text-sm ${
                          vision.likes.includes(currentUserId)
                            ? 'text-red-500'
                            : 'text-white hover:text-red-500'
                        } transition-colors`}
                      >
                        <Heart
                          size={16}
                          className={vision.likes.includes(currentUserId) ? 'fill-current' : ''}
                        />
                        <span>{vision.points}</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Special badge for user's latest vision */}
                {viewMode === 'user' && index === 0 && vision.userId === currentUserId && (
                  <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    Latest
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-600 text-sm">No vision yet</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}