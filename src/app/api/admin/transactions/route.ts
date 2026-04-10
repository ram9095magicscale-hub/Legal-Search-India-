import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { Transaction } from '@/models/Transaction';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter') || 'all';

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

    let query: any = {};
    const now = new Date();

    if (filter === 'daily') {
      query.createdAt = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
    } else if (filter === 'monthly') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      query.createdAt = { $gte: startOfMonth };
    } else if (filter === 'yearly') {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      query.createdAt = { $gte: startOfYear };
    }

    const transactions = await Transaction.find(query)
      .populate('clientId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Fetch Transactions Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
