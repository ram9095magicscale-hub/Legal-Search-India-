import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { DocumentModel } from '@/models/Document';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { docId } = await req.json();

    if (!docId) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }

    // Ensure the document belongs to the requesting user
    const doc = await DocumentModel.findOne({ _id: docId, userId: decoded.userId });
    
    if (!doc) {
      return NextResponse.json({ error: 'Document not found or unauthorized' }, { status: 404 });
    }

    await DocumentModel.findByIdAndDelete(docId);

    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Delete Document Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
