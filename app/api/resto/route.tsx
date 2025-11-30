/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/resto/route.ts
import { axiosAuth } from '@/api/axiosClientInstance';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const backendUrl = page ? `/api/resto?page=${page}` : '/api/resto';

    const res = await axiosAuth.get(backendUrl);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      '[API /resto] Error:',
      error?.response?.data || error.message
    );
  }
}
