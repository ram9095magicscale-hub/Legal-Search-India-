import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { OTP } from '@/models/OTP';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Mock sending OTP - In production, use standard SMS/Email providers (Twilio/Nodemailer/SendGrid)
    console.log(`[MOCK EMAIL SERVICE] OTP for ${email} is ${otpCode}`);

    // Set expiry for 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60000);

    // Save to DB (override previous if exists to prevent abuse could be added)
    await OTP.create({
      email,
      otp: otpCode,
      expiresAt,
    });

    return NextResponse.json({ message: 'OTP sent successfully (check console for mock)' });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
