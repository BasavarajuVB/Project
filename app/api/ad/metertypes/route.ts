import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('http://103.114.154.128:30808/ad/metertypes', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching meter types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meter types' },
      { status: 500 }
    );
  }
} 