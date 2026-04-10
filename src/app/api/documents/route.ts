import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { DocumentModel } from '@/models/Document';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export async function GET() {
  try {
    await dbConnect();
    const cookieStore = cookies();
    const token = (await cookieStore).get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Find documents for this user
    const documents = await DocumentModel.find({ userId: decoded.userId }).sort({ createdAt: -1 });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Fetch Documents Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
