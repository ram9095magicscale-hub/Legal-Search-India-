import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

// GET all users
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

    // Fetch all users sorted by latest
    const users = await User.find({}).sort({ createdAt: -1 }).select('-passwordHash');

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Fetch Users Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE a user
export async function DELETE(req: Request) {
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

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Prevent deleting self
    if (userId === decoded.userId) {
      return NextResponse.json({ error: 'Cannot delete your own admin account' }, { status: 400 });
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
