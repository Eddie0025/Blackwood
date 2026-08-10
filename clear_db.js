import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_KEY
)

async function clearDb() {
  console.log("Clearing all jobs...");
  const { error: jobsError } = await supabaseAdmin.from('jobs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (jobsError) console.error("Error clearing jobs:", jobsError);
  else console.log("Jobs cleared.");

  console.log("Clearing all articles...");
  const { error: articlesError } = await supabaseAdmin.from('articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (articlesError) console.error("Error clearing articles:", articlesError);
  else console.log("Articles cleared.");

  console.log("Clearing all access requests...");
  const { error: reqError } = await supabaseAdmin.from('access_requests').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (reqError) console.error("Error clearing access requests:", reqError);
  else console.log("Access requests cleared.");
}

clearDb();
