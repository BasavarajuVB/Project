import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, returning mock data since the actual endpoint might not exist
    // In production, this would call the actual API
    const mockData = '15,847';
    
    return new NextResponse(mockData, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Error fetching total assets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch total assets' },
      { status: 500 }
    );
  }
} 