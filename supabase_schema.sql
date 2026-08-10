-- Access Requests
create table access_requests (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  organization text not null,
  email text not null,
  message text not null,
  status text default 'new' check (status in ('new', 'reviewed', 'contacted')),
  created_at timestamptz default now()
);

-- Jobs
create table jobs (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  location text not null,
  type text not null,
  title text not null,
  is_active boolean default true,
  description text not null,
  created_at timestamptz default now()
);

-- Research Articles
create table articles (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  date text not null,
  title text not null,
  content text not null,
  is_published boolean default true,
  created_at timestamptz default now()
);

-- Row Level Security (RLS)
alter table access_requests enable row level security;
alter table jobs enable row level security;
alter table articles enable row level security;

-- Public: anyone can INSERT access requests
create policy "Anyone can submit access requests"
  on access_requests for insert with check (true);

-- Public: anyone can read active jobs
create policy "Public can read active jobs"
  on jobs for select using (is_active = true);

-- Public: anyone can read published articles
create policy "Public can read published articles"
  on articles for select using (is_published = true);

-- Note: Admin full access will be handled via the service_role key bypassing RLS.
