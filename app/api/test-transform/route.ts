import { NextRequest, NextResponse } from 'next/server';

// Test endpoint that returns a mock successful response
export async function POST(req: NextRequest) {
  try {
    const { address, creativePrompt } = await req.json();

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return a mock successful response with a reliable image URL
    return NextResponse.json({
      success: true,
      imageUrl: 'https://picsum.photos/1024/1024?random=' + Date.now(),
      address: address,
      prompt: creativePrompt
    });

  } catch (error) {
    console.error('Test transform error:', error);
    
    return NextResponse.json(
      { error: 'Test endpoint failed' },
      { status: 500 }
    );
  }
}