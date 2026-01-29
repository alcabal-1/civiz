// components/VisionCollage.tsx
'use client';

import React from 'react';
import { useVisionStore } from '../lib/visionStore';
import { Heart, Loader } from 'lucide-react';
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
  
  // Debug: Log vision states
  console.log('VisionCollage - Current visions:', collageVisions.map(v => v ? {
    id: v.id,
    text: v.text.substring(0, 50) + '...',
    isGenerating: v.isGenerating,
    hasGeneratedImage: !!v.generatedImageUrl,
    imageUrl: v.imageUrl
  } : null));
  
  // Placeholder images for empty slots
  const placeholderImages = [
    { src: '/images/education-outdoor.jpg', alt: 'Outdoor education in San Francisco', category: 'Education & Youth' },
    { src: '/images/urban-farming.jpg', alt: 'Urban farming initiative', category: 'Environment & Parks' },
    { src: '/images/health-clinic.jpg', alt: 'Community health clinic', category: 'Healthcare Access' }
  ];

  // Fill empty slots with placeholders
  const visionsWithPlaceholders = [...collageVisions];
  let placeholderIndex = 0;
  while (visionsWithPlaceholders.length < 6) {
    visionsWithPlaceholders.push({
      isPlaceholder: true,
      ...placeholderImages[placeholderIndex % placeholderImages.length]
    });
    placeholderIndex++;
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
                {vision.isPlaceholder ? (
                  // Placeholder image display
                  <>
                    <img
                      src={vision.src}
                      alt={vision.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm mb-2">{vision.alt}</p>
                        <span className="text-xs text-gray-300">{vision.category}</span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-green-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Inspiration
                    </div>
                  </>
                ) : vision.isGenerating ? (
                  // Loading state for AI generation
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm">
                    <Loader className="w-8 h-8 text-purple-500 animate-spin mb-3" />
                    <p className="text-white text-sm text-center px-4 mb-2">
                      🎨 Generating AI vision...
                    </p>
                    <p className="text-gray-400 text-xs text-center px-4 line-clamp-2">
                      {vision.text}
                    </p>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-white/20 rounded-full h-1 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full animate-pulse w-3/4"></div>
                      </div>
                      <p className="text-xs text-gray-300 mt-1 text-center">
                        {vision.address}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Regular vision display
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
                        <p className="text-gray-300 text-xs mb-2">{vision.address}</p>
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
                  </>
                )}
                
                {/* Special badge for user's latest vision */}
                {viewMode === 'user' && index === 0 && vision.userId === currentUserId && !vision.isGenerating && (
                  <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    Latest
                  </div>
                )}

                {/* AI Generated badge */}
                {vision.generatedImageUrl && !vision.isGenerating && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    AI ✨
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