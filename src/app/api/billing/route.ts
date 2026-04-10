import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { Transaction } from '@/models/Transaction';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export async function GET() {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Fetch Orders and Transactions in parallel
    const [orders, transactions] = await Promise.all([
      Order.find({ clientId: decoded.userId }).sort({ createdAt: -1 }),
      Transaction.find({ clientId: decoded.userId }).sort({ createdAt: -1 })
    ]);

    return NextResponse.json({
      orders,
      transactions
    });
  } catch (error) {
    console.error('Fetch Billing Data Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
