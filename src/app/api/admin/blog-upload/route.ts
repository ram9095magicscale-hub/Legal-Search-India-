import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { uploadToCloudinary } from '@/lib/cloudinary';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export async function POST(req: Request) {
  try {
    // 1. Verify Administrative Access
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Access Denied' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin' && decoded.role !== 'staff') {
      return NextResponse.json({ error: 'Permission Denied' }, { status: 403 });
    }

    // 2. Process File Data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 3. Convert to buffer and base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // 4. Upload to Cloudinary (Blog folder)
    const cloudinaryUrl = await uploadToCloudinary(fileBase64, 'blogs');

    return NextResponse.json({ url: cloudinaryUrl }, { status: 200 });

  } catch (error: any) {
    console.error('Blog Upload API Error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
