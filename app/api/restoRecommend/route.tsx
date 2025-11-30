/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosAuth } from '@/api/axiosClientInstance';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await axiosAuth.get('/api/resto/recommended', {
      headers: {
        Authorization: authHeader, // forward exactly
      },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error('Resto error:', error.response?.data);
    return NextResponse.json(
      { error: 'Failed to fetch' },
      { status: error.response?.status || 500 }
    );
  }
}
