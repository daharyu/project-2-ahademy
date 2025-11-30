import { axiosAuth } from '@/api/axiosClientInstance';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // This will run when you hit /api/cart
  console.log('API route hit!');

  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log('Received items:', body);

    // TODO: forward to your real backend here

    return NextResponse.json({
      success: true,
      message: 'Item added to cart successfully',
      data: { cartItem: { id: 999, quantity: 1 } },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await axiosAuth.get('/api/cart', {
      headers: {
        Authorization: authHeader, // forward exactly
      },
    });

    return NextResponse.json(res.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Resto error:', error.response?.data);
    return NextResponse.json(
      { error: 'Failed to fetch' },
      { status: error.response?.status || 500 }
    );
  }
}
