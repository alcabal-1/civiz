import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    const { address, creativePrompt } = await req.json();

    if (!address || !creativePrompt) {
      return NextResponse.json(
        { error: 'Address and creative prompt are required' },
        { status: 400 }
      );
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    // Create comprehensive prompt for DALL-E
    const fullPrompt = `Looking at this street view photograph of ${address}, create a photorealistic transformation where ${creativePrompt}.

CRITICAL REQUIREMENTS:
- PRESERVE the EXACT same building structure, architecture, and proportions
- KEEP all architectural elements in their precise locations (windows, doors, rooflines, facades)
- MAINTAIN the exact perspective, viewing angle, and composition of the original photo
- PRESERVE the surrounding context and neighboring buildings
- The building must be instantly recognizable as the same location

TRANSFORMATIONS TO APPLY:
- Add new materials, textures, or surface treatments to existing structures
- Enhance or modify lighting, atmosphere, and environmental effects
- Add decorative elements, overlays, or augmentations that don't alter the core structure
- Transform the style while keeping the underlying architecture intact
- Think of it as applying a new skin or filter to the existing building, not rebuilding it

The result should look like the same exact building has been enhanced or restyled, not replaced or reconstructed.`;

    // Generate image with DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: fullPrompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    const imageUrl = response.data[0].url;
    
    if (!imageUrl) {
      throw new Error('No image URL returned from OpenAI');
    }

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      address: address,
      prompt: creativePrompt
    });

  } catch (error) {
    console.error('DALL-E API error:', error);
    
    if (error instanceof Error) {
      // Check for specific OpenAI error types
      if (error.message.includes('rate_limit_exceeded') || error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again in a few minutes.' },
          { status: 429 }
        );
      } else if (error.message.includes('billing') || error.message.includes('insufficient_quota')) {
        return NextResponse.json(
          { error: 'OpenAI billing not configured or insufficient credits' },
          { status: 402 }
        );
      } else if (error.message.includes('invalid_api_key') || error.message.includes('authentication')) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API key' },
          { status: 401 }
        );
      } else if (error.message.includes('content_policy_violation')) {
        return NextResponse.json(
          { error: 'Content violates OpenAI policy. Please try a different vision.' },
          { status: 400 }
        );
      } else if (error.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'Request timed out. Please try again.' },
          { status: 408 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate transformed image. Please try again.' },
      { status: 500 }
    );
  }
}