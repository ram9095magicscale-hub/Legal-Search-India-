import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';
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
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const [totalClients, totalStaff, totalOrders, transactions] = await Promise.all([
      User.countDocuments({ role: 'client' }),
      User.countDocuments({ role: { $in: ['staff', 'admin'] } }),
      Order.countDocuments(),
      Transaction.find({ status: 'success' })
    ]);

    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);

    return NextResponse.json({
      totalClients,
      totalStaff,
      totalOrders,
      totalRevenue
    });
  } catch (error) {
    console.error('Fetch Admin Stats Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
