import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { DocumentModel } from '@/models/Document';
import { User } from '@/models/User';

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
    
    const [activeOrders, completedOrders, documentsCount, recentDocuments, clientInfo] = await Promise.all([
      Order.countDocuments({ clientId: decoded.userId, status: { $in: ['pending', 'in-progress'] } }),
      Order.countDocuments({ clientId: decoded.userId, status: 'completed' }),
      DocumentModel.countDocuments({ userId: decoded.userId }),
      DocumentModel.find({ userId: decoded.userId }).sort({ createdAt: -1 }).limit(3),
      User.findById(decoded.userId).populate('assignedAgent', 'name phone email photo')
    ]);

    const recentOrder = await Order.findOne({ clientId: decoded.userId })
      .sort({ updatedAt: -1 });

    return NextResponse.json({
      activeFiles: activeOrders,
      completedOrders,
      documents: documentsCount,
      recentOrder,
      recentDocuments,
      assignedAgent: clientInfo?.assignedAgent,
      progress: recentOrder ? recentOrder.progress : 0
    });
  } catch (error) {
    console.error('Fetch Client Stats Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
