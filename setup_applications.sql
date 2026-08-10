-- 1. Create the job_applications table
create table job_applications (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references jobs(id) on delete cascade not null,
  name text not null,
  email text not null,
  number text not null,
  location text not null,
  resume_url text not null,
  created_at timestamptz default now()
);

-- Enable RLS for job_applications
alter table job_applications enable row level security;

-- Public can insert new applications
create policy "Public can submit job applications"
  on job_applications for insert with check (true);

-- Admin can read/delete applications via service_role key bypassing RLS.

-- 2. Storage Setup for Resumes
-- We need to insert a bucket into the storage.buckets table
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes', 
  'resumes', 
  true, 
  10485760, -- 10 MB limit
  array['application/pdf']
);

-- Enable RLS for the resumes bucket objects
alter table storage.objects enable row level security;

-- Public can upload PDFs to the resumes bucket
create policy "Public can upload resumes"
  on storage.objects for insert
  with check ( bucket_id = 'resumes' );

-- Public can read resumes (required so you can download them from the admin panel easily, or we can rely on admin key)
create policy "Public can read resumes"
  on storage.objects for select
  using ( bucket_id = 'resumes' );
