import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  'https://djufbejydjlvjguegzym.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdWZiZWp5ZGpsdmpndWVnenltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM2MzIzOCwiZXhwIjoyMTAxOTM5MjM4fQ.ZktCqn1QUZL1e8DJ18olcutSO_36LXkox02lsqsrdA0'
);

async function testFetch() {
  const { data, error } = await supabaseAdmin
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Fetch Error:", error);
  } else {
    console.log("Fetch Success:", data);
  }
}

testFetch();
