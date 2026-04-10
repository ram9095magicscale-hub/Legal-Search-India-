import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { User } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Please login first.' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { orderName, description } = await req.json();

    if (!orderName) {
      return NextResponse.json({ error: 'Order name is required' }, { status: 400 });
    }

    // Generate unique order ID
    const count = await Order.countDocuments();
    const orderId = `ORD-${Date.now().toString().slice(-6)}-${(count + 1).toString().padStart(3, '0')}`;

    const newOrder = await Order.create({
      orderId,
      orderName,
      description,
      clientId: decoded.userId,
      status: 'pending',
      progress: 0,
      remarks: [{
        text: 'Order initiated. Pending staff assignment.',
        updatedBy: decoded.userId,
        updatedAt: new Date()
      }]
    });

    return NextResponse.json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Create Order Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
