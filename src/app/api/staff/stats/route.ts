import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/models/Order';

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

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [todayTasks, pendingTasks, completedTasks] = await Promise.all([
      Order.countDocuments({ staffId: decoded.userId, createdAt: { $gte: startOfToday } }),
      Order.countDocuments({ staffId: decoded.userId, status: { $in: ['pending', 'in-progress'] } }),
      Order.countDocuments({ staffId: decoded.userId, status: 'completed' })
    ]);

    return NextResponse.json({
      todayTasks,
      pendingTasks,
      completedTasks,
      efficiency: completedTasks > 0 ? Math.round((completedTasks / (pendingTasks + completedTasks)) * 100) : 0
    });
  } catch (error) {
    console.error('Fetch Staff Stats Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
