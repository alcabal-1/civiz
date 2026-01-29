import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!googleApiKey) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      );
    }

    // Fetch Street View image
    const streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview';
    
    const params = {
      size: '640x640',
      location: address,
      key: googleApiKey,
      fov: 90,
      pitch: 0
    };

    const response = await axios.get(streetViewUrl, {
      params,
      responseType: 'arraybuffer'
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch Street View image');
    }

    // Convert to base64 for client transmission
    const base64Image = Buffer.from(response.data).toString('base64');
    const imageDataUrl = `data:image/jpeg;base64,${base64Image}`;

    return NextResponse.json({
      success: true,
      imageData: imageDataUrl,
      address: address
    });

  } catch (error) {
    console.error('Street View API error:', error);
    
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data || error.message;
      if (errorMessage.includes('billing')) {
        return NextResponse.json(
          { error: 'Google Cloud billing not enabled' },
          { status: 402 }
        );
      } else if (errorMessage.includes('invalid') || errorMessage.includes('expired')) {
        return NextResponse.json(
          { error: 'Invalid or expired Google API key' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch Street View image' },
      { status: 500 }
    );
  }
}