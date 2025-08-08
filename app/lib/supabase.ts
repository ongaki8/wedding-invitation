// app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Client with default permissions
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for RSVP submissions
export const rsvpClient = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  },
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

export const initializeRsvpClient = () => {
  return rsvpClient;
};

initializeRsvpClient();