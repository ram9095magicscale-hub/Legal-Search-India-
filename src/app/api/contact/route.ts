import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Contact } from '@/models/Contact';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const { name, email, phone, service, message } = body;

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      service,
      message,
    });

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', contact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
