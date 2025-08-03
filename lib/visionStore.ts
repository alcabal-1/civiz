// visionStore.ts
import { create } from 'zustand';
import { POINT_VALUES } from './POINT_VALUES';
import { categoryKeywords, mockFundingCategories, FundingCategory } from './mockFundingData';

export interface Vision {
  id: string;
  text: string;
  imageUrl: string;
  category: string;
  address?: string;
  userId: string;
  points: number;
  likes: string[]; // Array of user IDs who liked
  createdAt: Date;
  isShared: boolean;
}

interface VisionStore {
  // State
  visions: Vision[];
  userPoints: number;
  currentUserId: string;
  viewMode: 'user' | 'city';
  
  // Actions
  submitVision: (text: string) => Promise<void>;
  likeVision: (visionId: string) => void;
  toggleViewMode: () => void;
  getUserVisions: () => Vision[];
  getCityVisions: () => Vision[];
  getTopVisionsByCategory: () => Record<string, Vision>;
  matchCategory: (text: string) => string;
}

// Mock DALL-E image URLs for demo
const mockImages = [
  'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
  'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800&q=80'
];

// Initialize with sample visions
const sampleVisions: Vision[] = [
  {
    id: 'sample-1',
    text: 'Transform Golden Gate Park into a sustainable urban farm with community gardens',
    imageUrl: mockImages[0],
    category: 'Parks & Recreation',
    address: 'Golden Gate Park, SF',
    userId: 'user-2',
    points: 15,
    likes: ['user-3', 'user-4'],
    createdAt: new Date(Date.now() - 3600000),
    isShared: true
  },
  {
    id: 'sample-2',
    text: 'Create 24/7 youth mentorship centers with tech training and art programs',
    imageUrl: mockImages[1],
    category: 'Community Youth Centers',
    address: 'Mission District, SF',
    userId: 'user-3',
    points: 12,
    likes: ['user-1', 'user-2'],
    createdAt: new Date(Date.now() - 7200000),
    isShared: true
  },
  {
    id: 'sample-3',
    text: 'Build affordable micro-housing units for essential workers near transit hubs',
    imageUrl: mockImages[2],
    category: 'Affordable Housing',
    address: 'SOMA, SF',
    userId: 'user-4',
    points: 18,
    likes: ['user-1', 'user-2', 'user-3'],
    createdAt: new Date(Date.now() - 10800000),
    isShared: true
  }
];

export const useVisionStore = create<VisionStore>((set, get) => ({
  visions: sampleVisions,
  userPoints: 10, // Starting points for demo
  currentUserId: 'user-1', // Mock current user
  viewMode: 'user',

  submitVision: async (text: string) => {
    const { currentUserId, matchCategory } = get();
    
    // Create new vision
    const newVision: Vision = {
      id: `vision-${Date.now()}`,
      text,
      imageUrl: mockImages[Math.floor(Math.random() * mockImages.length)],
      category: matchCategory(text),
      userId: currentUserId,
      points: POINT_VALUES.visionSubmission,
      likes: [],
      createdAt: new Date(),
      isShared: false
    };

    set((state) => ({
      visions: [newVision, ...state.visions],
      userPoints: state.userPoints + POINT_VALUES.visionSubmission
    }));
  },

  likeVision: (visionId: string) => {
    const { currentUserId } = get();
    
    set((state) => {
      const visionIndex = state.visions.findIndex(v => v.id === visionId);
      if (visionIndex === -1) return state;

      const vision = state.visions[visionIndex];
      
      // Check if already liked
      if (vision.likes.includes(currentUserId)) return state;

      const updatedVisions = [...state.visions];
      updatedVisions[visionIndex] = {
        ...vision,
        likes: [...vision.likes, currentUserId],
        points: vision.points + POINT_VALUES.imageLikeReceived
      };

      return {
        visions: updatedVisions,
        userPoints: state.userPoints + POINT_VALUES.imageLikeGiven
      };
    });
  },

  toggleViewMode: () => {
    set((state) => ({
      viewMode: state.viewMode === 'user' ? 'city' : 'user'
    }));
  },

  getUserVisions: () => {
    const { visions, currentUserId } = get();
    return visions
      .filter(v => v.userId === currentUserId)
      .sort((a, b) => b.points - a.points);
  },

  getCityVisions: () => {
    const { visions } = get();
    return visions.sort((a, b) => b.points - a.points);
  },

  getTopVisionsByCategory: () => {
    const { visions, currentUserId, viewMode } = get();
    const result: Record<string, Vision> = {};
    
    mockFundingCategories.forEach(category => {
      const categoryVisions = visions.filter(v => v.category === category.category_name);
      
      if (viewMode === 'user') {
        // First try to find user's vision in this category
        const userVision = categoryVisions.find(v => v.userId === currentUserId);
        if (userVision) {
          result[category.category_name] = userVision;
        } else {
          // Fallback to top city vision
          const topVision = categoryVisions.sort((a, b) => b.points - a.points)[0];
          if (topVision) result[category.category_name] = topVision;
        }
      } else {
        // City view - just get top vision
        const topVision = categoryVisions.sort((a, b) => b.points - a.points)[0];
        if (topVision) result[category.category_name] = topVision;
      }
    });
    
    return result;
  },

  matchCategory: (text: string) => {
    const lowerText = text.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return category;
      }
    }
    
    // Default to Parks & Recreation if no match
    return 'Parks & Recreation';
  }
}));