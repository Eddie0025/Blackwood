import { createClient } from '@supabase/supabase-js'

// Standard client for public access (obeys Row Level Security)
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Admin client for backend bypass (ignores Row Level Security)
// This should ONLY be used inside the admin dashboard or secure server environments.
export const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
)
