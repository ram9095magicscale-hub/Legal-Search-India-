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
    const { orderId, status, remark, progress } = await req.json();

    const order = await Order.findOne({ orderId, staffId: decoded.userId });
    if (!order) {
      return NextResponse.json({ error: 'Task not found or not assigned to you' }, { status: 404 });
    }

    // Update order
    order.status = status;
    if (progress !== undefined) order.progress = progress;
    
    if (remark) {
      order.remarks.push({
        text: remark,
        updatedBy: decoded.userId,
        updatedAt: new Date()
      });
    }

    await order.save();

    return NextResponse.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Update Task Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
