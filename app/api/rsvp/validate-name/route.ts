import { NextRequest, NextResponse } from 'next/server';
import { rsvpClient } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const nameToValidate = name.trim();

    // Check if name exists in rsvp_list table (case-insensitive)
    const { data, error } = await rsvpClient
      .from('rsvp_list')
      .select('name')
      .ilike('name', nameToValidate)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return NextResponse.json({ isValid: false });
      }
      console.error('Supabase error:', error);
      return NextResponse.json({ message: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ isValid: true, validatedName: data.name });

  } catch (error) {
    console.error('Name validation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}