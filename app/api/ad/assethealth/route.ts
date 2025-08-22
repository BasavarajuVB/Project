import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, returning mock data since the actual endpoint might not exist
    // In production, this would call the actual API
    const mockData = {
      healthPercentage: 94.2
    };
    
    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Error fetching asset health:', error);
    return NextResponse.json(
      { error: 'Failed to fetch asset health' },
      { status: 500 }
    );
  }
} 