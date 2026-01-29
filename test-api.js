// test-api.js - Simple script to test API endpoints
// Run this with: node test-api.js (while dev server is running)

const testAPI = async () => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testing CIVIZ API Integration...\n');

  // Test 1: Street View API
  console.log('1. Testing Street View API...');
  try {
    const streetViewResponse = await fetch(`${baseUrl}/api/streetview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: 'Union Square, San Francisco, CA' })
    });
    
    const streetViewResult = await streetViewResponse.json();
    console.log('✅ Street View API Status:', streetViewResponse.status);
    console.log('📍 Response:', streetViewResult.success ? 'Success - Image fetched' : `Error: ${streetViewResult.error}`);
  } catch (error) {
    console.log('❌ Street View API Error:', error.message);
  }

  console.log('\n2. Testing Transform API...');
  try {
    const transformResponse = await fetch(`${baseUrl}/api/transform`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        address: 'Union Square, San Francisco, CA',
        creativePrompt: 'transform it into a beautiful garden with sustainable features'
      })
    });
    
    const transformResult = await transformResponse.json();
    console.log('✅ Transform API Status:', transformResponse.status);
    console.log('🎨 Response:', transformResult.success ? 'Success - Image generated' : `Error: ${transformResult.error}`);
  } catch (error) {
    console.log('❌ Transform API Error:', error.message);
  }

  console.log('\n🏁 API Tests Complete!');
  console.log('\n💡 Notes:');
  console.log('- If APIs return 500/401 errors, check your .env.local file');
  console.log('- Street View requires GOOGLE_MAPS_API_KEY');
  console.log('- Transform requires OPENAI_API_KEY');
  console.log('- Success responses indicate the integration is working!');
};

testAPI().catch(console.error);