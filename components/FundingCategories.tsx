// components/FundingCategories.tsx
'use client';

import React from 'react';
import { useVisionStore } from '../lib/visionStore';
import { mockFundingCategories } from '../lib/mockFundingData';
import { DollarSign, Users, TrendingUp } from 'lucide-react';

export default function FundingCategories() {
  const getTopVisionsByCategory = useVisionStore((state) => state.getTopVisionsByCategory);
  const topVisions = getTopVisionsByCategory();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        City Funding Categories
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFundingCategories.map((category) => {
          const topVision = topVisions[category.category_name];
          
          return (
            <div
              key={category.category_name}
              className="bg-black/20 backdrop-blur-md rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500 transition-all duration-300"
            >
              {/* Vision Preview or Placeholder */}
              <div className="relative h-48 bg-gray-800">
                {topVision ? (
                  <>
                    <img
                      src={topVision.imageUrl}
                      alt={topVision.text}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm line-clamp-2">{topVision.text}</p>
                      <p className="text-xs text-gray-300 mt-1">
                        {topVision.points} points • {topVision.likes.length} likes
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No visions yet</p>
                  </div>
                )}
              </div>
              
              {/* Category Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {category.category_name}
                </h3>
                
                {/* Funding Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-1">
                      <DollarSign size={14} />
                      Total Budget
                    </span>
                    <span className="text-white font-medium">
                      {formatCurrency(category.total_budget)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-1">
                      <Users size={14} />
                      Nonprofit Funding
                    </span>
                    <span className="text-green-400 font-medium">
                      {formatCurrency(category.nonprofit_funding)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-1">
                      <TrendingUp size={14} />
                      Available Funding
                    </span>
                    <span className="text-blue-400 font-medium">
                      {formatCurrency(category.remaining_approved_funding)}
                    </span>
                  </div>
                </div>
                
                {/* Impact Metrics */}
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-xs text-gray-400 mb-2">Impact Metrics:</p>
                  <div className="space-y-1">
                    {category.impact_metrics.map((metric, index) => (
                      <p key={index} className="text-xs text-gray-300">
                        • {metric}
                      </p>
                    ))}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-500"
                      style={{
                        width: `${((category.total_budget - category.budget_deficit) / category.total_budget) * 100}%`
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {Math.round(((category.total_budget - category.budget_deficit) / category.total_budget) * 100)}% funded
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}