import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_KEY
)

const initialJobs = [
  {
    category: "AI RESEARCH",
    location: "Remote / Washington D.C.",
    type: "Full-time",
    title: "Senior Research Scientist — Autonomous Systems",
    description: "Lead research in autonomous threat detection."
  },
  {
    category: "AI RESEARCH",
    location: "Remote",
    type: "Full-time",
    title: "Machine Learning Engineer — Custom Model Training",
    description: "Develop domain-specific language models."
  },
  {
    category: "CYBERSECURITY",
    location: "Washington D.C. / On-site",
    type: "Full-time",
    title: "Principal Threat Intelligence Analyst",
    description: "Analyze zero-day pattern recognition systems."
  },
  {
    category: "ENGINEERING",
    location: "Remote",
    type: "Full-time",
    title: "Platform Engineer — AI Infrastructure",
    description: "Build robust backend services for AI."
  },
  {
    category: "ENGINEERING",
    location: "Remote",
    type: "Full-time",
    title: "Full-Stack Engineer — Intelligence Interfaces",
    description: "Create scalable frontend architectures."
  },
  {
    category: "SOLUTIONS",
    location: "Remote / Travel Required",
    type: "Full-time",
    title: "Enterprise Solutions Architect",
    description: "Design deployments for global defense corps."
  }
];

const initialArticles = [
  {
    category: "RESEARCH",
    date: "MARCH 12, 2025",
    read_time: "5 MIN READ",
    title: "The Zero-Trust Paradox: Why Perimeter Defense is Obsolete",
    content: "Detailed analysis of modern perimeter defense strategies."
  },
  {
    category: "ENGINEERING",
    date: "FEBRUARY 28, 2025",
    read_time: "8 MIN READ",
    title: "Scaling Autonomous Multi-Agent Architectures in Air-Gapped Environments",
    content: "Technical paper on deploying multi-agent systems offline."
  },
  {
    category: "INTELLIGENCE",
    date: "FEBRUARY 15, 2025",
    read_time: "6 MIN READ",
    title: "Predictive Escalation: Shifting from Reactive to Anticipatory Cyber Defense",
    content: "Case study on predictive defense methodologies."
  }
];

async function seed() {
  // console.log("Seeding jobs...");
  // const { error: jobsError } = await supabaseAdmin.from('jobs').insert(initialJobs);
  // if (jobsError) console.error("Error seeding jobs:", jobsError);
  // else console.log("Jobs seeded!");

  console.log("Seeding articles...");
  const { error: articlesError } = await supabaseAdmin.from('articles').insert(initialArticles);
  if (articlesError) console.error("Error seeding articles:", articlesError);
  else console.log("Articles seeded!");
}

seed();
