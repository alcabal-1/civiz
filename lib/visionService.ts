// visionService.ts - Service layer for handling vision generation workflow

export interface StreetViewResponse {
  success: boolean;
  imageData?: string;
  address?: string;
  error?: string;
}

export interface TransformResponse {
  success: boolean;
  imageUrl?: string;
  address?: string;
  prompt?: string;
  error?: string;
}

export class VisionService {
  private static instance: VisionService;

  public static getInstance(): VisionService {
    if (!VisionService.instance) {
      VisionService.instance = new VisionService();
    }
    return VisionService.instance;
  }

  async fetchStreetView(address: string): Promise<StreetViewResponse> {
    try {
      const response = await fetch('/api/streetview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error('Street View fetch error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch street view'
      };
    }
  }

  async transformImage(address: string, creativePrompt: string): Promise<TransformResponse> {
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          address, 
          creativePrompt 
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error('Image transformation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to transform image'
      };
    }
  }

  // Helper method to validate address format
  static validateAddress(address: string): { isValid: boolean; message?: string } {
    const trimmed = address.trim();
    
    if (!trimmed) {
      return { isValid: false, message: 'Address cannot be empty' };
    }
    
    if (trimmed.length < 3) {
      return { isValid: false, message: 'Address too short' };
    }
    
    if (trimmed.length > 200) {
      return { isValid: false, message: 'Address too long' };
    }
    
    return { isValid: true };
  }

  // Helper method to validate creative prompt
  static validatePrompt(prompt: string): { isValid: boolean; message?: string } {
    const trimmed = prompt.trim();
    
    if (!trimmed) {
      return { isValid: false, message: 'Vision prompt cannot be empty' };
    }
    
    if (trimmed.length < 10) {
      return { isValid: false, message: 'Please provide a more detailed vision (at least 10 characters)' };
    }
    
    if (trimmed.length > 300) {
      return { isValid: false, message: 'Vision prompt too long (max 300 characters)' };
    }
    
    return { isValid: true };
  }

  // Helper method to generate safe filename from address
  static generateSafeFilename(address: string): string {
    return address
      .replace(/[^a-zA-Z0-9\s-_]/g, '') // Remove special chars
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .toLowerCase()
      .substring(0, 50); // Limit length
  }

  // Helper method to check API key availability
  static checkApiKeysConfigured(): { streetView: boolean; openai: boolean } {
    // This would typically check environment variables in a real backend
    // For frontend, we'll just return true and let the API handle validation
    return {
      streetView: true,
      openai: true
    };
  }
}

// Export singleton instance
export const visionService = VisionService.getInstance();