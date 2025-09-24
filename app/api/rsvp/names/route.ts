import { NextRequest, NextResponse } from 'next/server';
import { rsvpClient } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { search } = await request.json();

    if (!search || search.trim().length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const searchTerm = search.trim();

    // Search for names in the rsvp_list table
    const { data, error } = await rsvpClient
      .from('rsvp_list')
      .select('name')
      .ilike('name', `%${searchTerm}%`)
      .limit(10);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ message: 'Database error' }, { status: 500 });
    }

    const suggestions = data.map(item => item.name);
    return NextResponse.json({ suggestions });

  } catch (error) {
    console.error('Name search error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}