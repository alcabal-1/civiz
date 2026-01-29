// components/VisionForm.tsx
'use client';

import React, { useState } from 'react';
import { useVisionStore } from '../lib/visionStore';
import { VisionService } from '../lib/visionService';

export default function VisionForm() {
  const [visionText, setVisionText] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const submitVision = useVisionStore((state) => state.submitVision);
  const userPoints = useVisionStore((state) => state.userPoints);
  const matchCategory = useVisionStore((state) => state.matchCategory);
  
  const maxCharacters = 300;
  const remainingChars = maxCharacters - visionText.length;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate prompt
    const promptValidation = VisionService.validatePrompt(visionText);
    if (!promptValidation.isValid) {
      setError(promptValidation.message || 'Invalid vision prompt');
      return;
    }
    
    // Validate address
    const addressValidation = VisionService.validateAddress(address);
    if (!addressValidation.isValid) {
      setError(addressValidation.message || 'Invalid address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await submitVision(visionText, address);
      
      // Show success feedback
      setShowSuccess(true);
      setVisionText('');
      setAddress('');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting vision:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate vision. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const detectedCategory = visionText ? matchCategory(visionText) : '';
  
  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Points Display */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
          <span className="text-xs text-gray-600">Points:</span>
          <span className="font-bold text-sm text-purple-600">{userPoints}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Address Input */}
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter San Francisco address (e.g., Golden Gate Park, SF)"
            className="w-full p-3 bg-white/60 backdrop-blur-md text-gray-800 placeholder-gray-600 rounded-lg border border-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-200 shadow-md text-sm"
            disabled={isSubmitting}
          />
        </div>

        {/* Vision Text Area */}
        <div className="relative">
          <textarea
            value={visionText}
            onChange={(e) => setVisionText(e.target.value)}
            placeholder="How should this place be transformed? (e.g., 'turn it into a vibrant community garden with solar panels')"
            className="w-full p-3 pr-16 bg-white/60 backdrop-blur-md text-gray-800 placeholder-gray-600 rounded-lg border border-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none resize-none transition-all duration-200 shadow-md text-sm"
            rows={3}
            disabled={isSubmitting}
          />
          
          {/* Character counter */}
          <div className={`absolute bottom-2 right-2 text-xs ${remainingChars < 50 ? 'text-orange-600' : 'text-gray-600'}`}>
            {remainingChars}
          </div>
          
          {/* Category detection */}
          {detectedCategory && (
            <div className="absolute top-2 right-2 text-xs bg-purple-600/80 text-white px-2 py-0.5 rounded">
              {detectedCategory}
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting || visionText.trim().length === 0 || address.trim().length === 0 || visionText.length > maxCharacters}
            className="flex-1 bg-gradient-to-r from-purple-600/90 to-blue-500/90 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-sm shadow-md"
          >
            {isSubmitting ? 'Generating AI Vision...' : 'Generate Vision'}
          </button>
        </div>
      </form>
      
      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-500/60 backdrop-blur-md border border-red-500/30 rounded-lg text-red-800 text-center text-sm">
          <p className="font-medium">❌ {error}</p>
        </div>
      )}
      
      {/* Success Message */}
      {showSuccess && (
        <div className="mt-3 p-3 bg-green-500/60 backdrop-blur-md border border-green-500/30 rounded-lg text-green-800 text-center animate-fade-in text-sm">
          <p className="font-medium">✨ AI Vision generated successfully!</p>
          <p className="text-xs mt-1">+3 points earned • Check the collage to see your transformed image</p>
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