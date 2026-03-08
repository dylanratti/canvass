import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, company } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email: email.toLowerCase().trim(), company: company?.trim() || null }]);

    if (error) {
      // Handle duplicate email gracefully
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already on the list.' }, { status: 200 });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Added to waitlist.' }, { status: 200 });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
