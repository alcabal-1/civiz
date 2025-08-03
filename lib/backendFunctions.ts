// lib/backendFunctions.ts
import { Vision } from './visionStore';
import { FundingCategory } from './mockFundingData';

// Placeholder backend functions for future integration

export const backendFunctions = {
  /**
   * Submit a vision to the backend
   * @param visionData - The vision data to submit
   * @returns Promise with the created vision including generated image
   */
  submitVision: async (visionData: {
    text: string;
    userId: string;
    category: string;
  }): Promise<Vision> => {
    // TODO: Implement actual backend call
    // 1. Send vision text to backend
    // 2. Generate DALL-E image
    // 3. Store in database
    // 4. Return complete vision object
    
    console.log('submitVision placeholder:', visionData);
    
    return {
      id: `vision-${Date.now()}`,
      text: visionData.text,
      imageUrl: 'https://via.placeholder.com/800x600',
      category: visionData.category,
      userId: visionData.userId,
      points: 3,
      likes: [],
      createdAt: new Date(),
      isShared: false
    };
  },

  /**
   * Like an image/vision
   * @param visionId - The vision ID to like
   * @param userId - The user ID who is liking
   */
  likeImage: async (visionId: string, userId: string): Promise<void> => {
    // TODO: Implement actual backend call
    // 1. Validate user hasn't already liked
    // 2. Update vision likes in database
    // 3. Award points to both users
    
    console.log('likeImage placeholder:', { visionId, userId });
  },

  /**
   * Fetch funding data from SF Open Data or CSV
   * @returns Promise with funding categories
   */
  fetchFundingData: async (): Promise<FundingCategory[]> => {
    // TODO: Implement actual data fetching
    // 1. Try SF Open Data API
    // 2. Fallback to CSV if API fails
    // 3. Transform data to match interface
    
    console.log('fetchFundingData placeholder');
    
    // For now, return mock data
    const { mockFundingCategories } = await import('./mockFundingData');
    return mockFundingCategories;
  },

  /**
   * Generate DALL-E image from vision text
   * @param prompt - The vision text to use as prompt
   * @param category - The funding category for context
   * @returns Promise with image URL
   */
  generateDalleImage: async (prompt: string, category: string): Promise<string> => {
    // TODO: Implement actual DALL-E integration
    // 1. Enhance prompt with category context
    // 2. Call OpenAI DALL-E API
    // 3. Store generated image
    // 4. Return image URL
    
    console.log('generateDalleImage placeholder:', { prompt, category });
    
    // Return placeholder for now
    return 'https://via.placeholder.com/1024x1024';
  },

  /**
   * Generate vision video with address overlay
   * @param visionId - The vision ID
   * @param address - The address to overlay
   * @returns Promise with video URL
   */
  generateVisionVideo: async (visionId: string, address: string): Promise<string> => {
    // TODO: Implement video generation
    // 1. Fetch vision data and image
    // 2. Create video with image slideshow
    // 3. Add address overlay
    // 4. Store video and return URL
    
    console.log('generateVisionVideo placeholder:', { visionId, address });
    
    // For MVP, return image URL instead
    return 'https://via.placeholder.com/1920x1080';
  },

  /**
   * Store vision data in database
   * @param vision - The complete vision object
   */
  storeVisionData: async (vision: Vision): Promise<void> => {
    // TODO: Implement database storage
    // 1. Connect to Vercel KV or chosen database
    // 2. Store vision with all metadata
    // 3. Update user points
    // 4. Update category statistics
    
    console.log('storeVisionData placeholder:', vision);
  },

  /**
   * Get top visions for current user
   * @param userId - The user ID
   * @returns Promise with array of visions
   */
  getTopUserVisions: async (userId: string): Promise<Vision[]> => {
    // TODO: Implement database query
    // 1. Query visions by userId
    // 2. Sort by points descending
    // 3. Return top visions
    
    console.log('getTopUserVisions placeholder:', userId);
    
    return [];
  },

  /**
   * Get top visions across all users
   * @param limit - Number of visions to return
   * @returns Promise with array of visions
   */
  getTopCityVisions: async (limit: number = 50): Promise<Vision[]> => {
    // TODO: Implement database query
    // 1. Query all visions
    // 2. Sort by points descending
    // 3. Return top N visions
    
    console.log('getTopCityVisions placeholder:', limit);
    
    return [];
  }
};

// API Route handlers (for Next.js API routes)
export const apiHandlers = {
  // POST /api/visions
  createVision: async (req: Request) => {
    const body = await req.json();
    const vision = await backendFunctions.submitVision(body);
    return Response.json(vision);
  },

  // POST /api/visions/:id/like
  likeVision: async (req: Request, visionId: string) => {
    const { userId } = await req.json();
    await backendFunctions.likeImage(visionId, userId);
    return Response.json({ success: true });
  },

  // GET /api/funding
  getFunding: async () => {
    const data = await backendFunctions.fetchFundingData();
    return Response.json(data);
  },

  // GET /api/visions/user/:userId
  getUserVisions: async (userId: string) => {
    const visions = await backendFunctions.getTopUserVisions(userId);
    return Response.json(visions);
  },

  // GET /api/visions/city
  getCityVisions: async () => {
    const visions = await backendFunctions.getTopCityVisions();
    return Response.json(visions);
  }
};