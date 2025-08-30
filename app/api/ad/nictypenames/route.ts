import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://103.114.154.128:30808/ad/nictypenames', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching NIC types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NIC types' },
      { status: 500 }
    );
  }
} 