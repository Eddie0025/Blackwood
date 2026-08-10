import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  'https://djufbejydjlvjguegzym.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdWZiZWp5ZGpsdmpndWVnenltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM2MzIzOCwiZXhwIjoyMTAxOTM5MjM4fQ.ZktCqn1QUZL1e8DJ18olcutSO_36LXkox02lsqsrdA0'
);

async function testInsert() {
  const { data, error } = await supabaseAdmin.from('jobs').insert([{
    title: 'Test Job',
    category: 'Testing',
    location: '',
    type: 'Full-time',
    description: '',
    is_active: true
  }]);

  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log("Success:", data);
  }
}

testInsert();
