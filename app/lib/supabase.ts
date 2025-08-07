// app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Main client with default permissions
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Specialized client for RSVP submissions
export const rsvpClient = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  },
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Properly typed role setting function
export const initializeRsvpClient = async () => {
  try {
    await rsvpClient.rpc('set_role', { role: 'rsvp_writer' });
    console.log('RSVP client role set successfully');
    return true;
  } catch (error) {
    console.error('Failed to set RSVP client role:', error);
    return false;
  }
};

// Initialize immediately (optional)
initializeRsvpClient();