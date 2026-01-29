# CIVIZ - AI-Powered Civic Vision Platform

CIVIZ is a Next.js application that combines civic engagement with AI-powered visualization. Users can submit their visions for improving San Francisco locations by providing an address and transformation description, which are then brought to life using Google Street View and DALL-E 3.

## Features

### 🏙️ AI-Powered Civic Visualization
- **Address Input**: Users enter any San Francisco address
- **Vision Prompt**: Describe how the location should be transformed
- **AI Generation**: Combines Google Street View with DALL-E 3 to create photorealistic transformed images
- **Real-time Feedback**: Loading states and progress indicators during image generation

### 🎯 Civic Engagement Platform
- **Category Matching**: Automatically categorizes visions (Housing, Parks, Transportation, etc.)
- **Points System**: Earn points for submitting visions and receiving likes
- **Community Views**: Toggle between personal visions and city-wide submissions
- **Interactive Collage**: Browse and like community visions

### 🛠️ Technical Features
- **Next.js 13+ App Router**: Modern React framework with server components
- **Zustand State Management**: Lightweight state management for vision data
- **Tailwind CSS**: Responsive design with custom animations
- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Comprehensive error handling for API failures

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Google Cloud Platform account with Maps API enabled
- OpenAI account with API access

### 1. Clone and Install
```bash
git clone <repository-url>
cd civiz
npm install
```

### 2. Environment Configuration
Copy the example environment file and add your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:
```env
# Google Street View API
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# OpenAI DALL-E API  
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Google Maps API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable the **Street View Static API**
4. Create an API key in **APIs & Services > Credentials**
5. Restrict the key to Street View Static API for security

### 4. OpenAI API Setup
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and add billing information
3. Generate an API key in **API Keys** section
4. Ensure you have credits for DALL-E 3 usage (~$0.040 per image)

### 5. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## How It Works

### User Workflow
1. **Enter Address**: User inputs a San Francisco location (e.g., "Golden Gate Park, SF")
2. **Describe Vision**: User describes desired transformation (e.g., "turn into a sustainable urban farm")
3. **AI Processing**: System fetches Street View image and sends to DALL-E with structured prompt
4. **Result Display**: Generated image appears in the vision collage with loading animations

### Technical Architecture

```
User Input (Address + Vision)
         ↓
    VisionForm Component
         ↓
    Zustand Store (submitVision)
         ↓
    API Route (/api/transform)
         ↓
    Google Street View API ← → OpenAI DALL-E 3
         ↓
    Generated Image URL
         ↓
    Updated Vision Store
         ↓
    VisionCollage Display
```

### API Endpoints

#### POST `/api/streetview`
Fetches Street View images for a given address.
```json
{
  "address": "Golden Gate Park, San Francisco, CA"
}
```

#### POST `/api/transform`
Generates AI-transformed images using DALL-E 3.
```json
{
  "address": "Golden Gate Park, San Francisco, CA",
  "creativePrompt": "turn it into a sustainable urban farm"
}
```

## File Structure

```
civiz/
├── app/
│   ├── api/
│   │   ├── streetview/route.ts    # Google Street View API endpoint
│   │   └── transform/route.ts     # DALL-E transformation endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── VisionForm.tsx             # Address + vision input form
│   ├── VisionCollage.tsx          # Image gallery with loading states
│   ├── CivizV0.tsx               # Main app component
│   └── [other components]
├── lib/
│   ├── visionStore.ts            # Zustand state management
│   ├── visionService.ts          # API service layer
│   └── [utilities]
└── package.json
```

## Development Notes

### Cost Considerations
- **Google Street View**: $0.007 per request
- **DALL-E 3**: ~$0.040 per image generation
- Implement rate limiting and user quotas for production

### Performance Optimizations
- Images are fetched as needed (not pre-generated)
- Loading states prevent UI blocking
- Error handling provides user-friendly feedback
- Generated images are displayed directly from OpenAI URLs

### Error Handling
The application handles various error scenarios:
- Invalid/expired API keys
- Rate limiting from both APIs
- Content policy violations (OpenAI)
- Network timeouts
- Billing/quota issues

## Contributing

### Adding New Features
1. Update the Vision interface in `lib/visionStore.ts`
2. Modify API endpoints in `app/api/`
3. Update UI components in `components/`
4. Add proper TypeScript types

### Testing Locally
1. Use real San Francisco addresses (e.g., "Union Square, SF")
2. Try various transformation prompts
3. Monitor API usage in respective dashboards
4. Test error scenarios by temporarily using invalid API keys

## Troubleshooting

### Common Issues

**"Google Maps API key not configured"**
- Check `.env.local` file exists and has correct `GOOGLE_MAPS_API_KEY`
- Ensure Street View Static API is enabled in Google Cloud Console

**"OpenAI billing not configured"**
- Add payment method to OpenAI account
- Check billing limits and current usage

**"Rate limit exceeded"**
- Wait a few minutes between requests during development
- Consider implementing request queuing for production

**Images not loading**
- Check browser console for CORS errors
- Verify API endpoints are responding correctly
- Check network tab for failed requests

## License

This project is part of a civic engagement initiative for San Francisco.