import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/models/Order';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { orderId, staffId } = await req.json();

    if (!orderId || !staffId) {
      return NextResponse.json({ error: 'Missing orderId or staffId' }, { status: 400 });
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { staffId, status: 'in-progress' },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order assigned successfully', order });
  } catch (error) {
    console.error('Assign Order Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
