import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { DocumentModel } from '@/models/Document';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export async function POST(req: Request) {
  try {
    await dbConnect();

    // 1. Verify User from token
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // 2. Process File Data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const customName = formData.get('customName') as string;
    const category = formData.get('category') as string || 'Other';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 3. Upload to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert to base64 for Cloudinary upload
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;
    
    const { uploadToCloudinary } = await import('@/lib/cloudinary');
    const cloudinaryUrl = await uploadToCloudinary(fileBase64, 'documents');

    const newDoc = await DocumentModel.create({
      userId,
      fileName: customName || file.name,
      fileUrl: cloudinaryUrl,
      fileType: file.type,
      category,
      status: 'pending'
    });

    return NextResponse.json({ 
      message: 'Upload successful. Awaiting verification.',
      document: newDoc 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Server upload error' }, { status: 500 });
  }
}
