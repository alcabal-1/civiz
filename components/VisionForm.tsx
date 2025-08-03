// components/VisionForm.tsx
'use client';

import React, { useState } from 'react';
import { useVisionStore } from '../lib/visionStore';

export default function VisionForm() {
  const [visionText, setVisionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const submitVision = useVisionStore((state) => state.submitVision);
  const userPoints = useVisionStore((state) => state.userPoints);
  const matchCategory = useVisionStore((state) => state.matchCategory);
  
  const maxCharacters = 300;
  const remainingChars = maxCharacters - visionText.length;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (visionText.trim().length === 0 || visionText.length > maxCharacters) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitVision(visionText);
      
      // Show success feedback
      setShowSuccess(true);
      setVisionText('');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting vision:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const detectedCategory = visionText ? matchCategory(visionText) : '';
  
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Points Display */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-sm text-gray-300">Your Points:</span>
          <span className="font-bold text-lg text-white">{userPoints}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={visionText}
            onChange={(e) => setVisionText(e.target.value)}
            placeholder="Share your vision for San Francisco..."
            className="w-full p-4 pr-20 bg-black/20 backdrop-blur-md text-white placeholder-gray-400 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none transition-all duration-200"
            rows={4}
            disabled={isSubmitting}
          />
          
          {/* Character counter */}
          <div className={`absolute bottom-2 right-2 text-xs ${remainingChars < 50 ? 'text-yellow-400' : 'text-gray-400'}`}>
            {remainingChars}
          </div>
          
          {/* Category detection */}
          {detectedCategory && (
            <div className="absolute top-2 right-2 text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
              {detectedCategory}
            </div>
          )}
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting || visionText.trim().length === 0 || visionText.length > maxCharacters}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Vision'}
          </button>
        </div>
      </form>
      
      {/* Success Message */}
      {showSuccess && (
        <div className="mt-4 p-4 bg-green-500/20 backdrop-blur-md border border-green-500/50 rounded-lg text-green-300 text-center animate-fade-in">
          <p className="font-medium">✨ Vision submitted successfully!</p>
          <p className="text-sm mt-1">+3 points earned</p>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}