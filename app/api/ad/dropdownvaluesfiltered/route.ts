import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the request
    const { searchParams } = new URL(request.url);
    
    // Build the query string for the external API
    const queryParams = new URLSearchParams();
    
    // Add filter parameters if they exist
    if (searchParams.has('nictype')) {
      queryParams.append('nictype', searchParams.get('nictype')!);
    }
    if (searchParams.has('modelname')) {
      queryParams.append('modelname', searchParams.get('modelname')!);
    }
    if (searchParams.has('metertype')) {
      queryParams.append('metertype', searchParams.get('metertype')!);
    }
    if (searchParams.has('manufacturername')) {
      queryParams.append('manufacturername', searchParams.get('manufacturername')!);
    }
    
    // Construct the full URL with query parameters
    const apiUrl = `http://103.114.154.128:30808/ad/dropdownvaluesfiltered${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(apiUrl, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching filtered dropdown values:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filtered dropdown values' },
      { status: 500 }
    );
  }
} 