import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_KEY
)

async function createAdmin() {
  console.log("Creating admin user...")
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: 'adityavir0025@gmail.com',
    password: 'randhawaeddie0025',
    email_confirm: true
  })

  if (error) {
    console.error("Error creating admin:", error.message)
  } else {
    console.log("Admin user created successfully:", data.user.email)
  }
}

createAdmin()
