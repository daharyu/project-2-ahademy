/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosAuth } from '@/api/axiosClientInstance';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Forward the exact same JSON body
    const body = await request.json();

    const response = await axiosAuth.put('/api/auth/profile', body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      'Profile update failed:',
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.message || 'Update failed',
      },
      { status: error.response?.status || 500 }
    );
  }
}
