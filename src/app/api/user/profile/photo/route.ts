import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';
import { uploadToCloudinary } from '@/lib/cloudinary';

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
    
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const photoUrl = await uploadToCloudinary(fileBase64, 'avatars');

    // Update User
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: { photo: photoUrl } },
      { new: true }
    ).select('-passwordHash');

    return NextResponse.json({
      message: 'Photo updated successfully',
      user: updatedUser,
      photoUrl
    });
  } catch (error) {
    console.error('Photo Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
