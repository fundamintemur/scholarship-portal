-- Create applications table
create table applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  university_name text not null,
  gpa numeric(3,2) not null,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create documents table
create table documents (
  id uuid default gen_random_uuid() primary key,
  application_id uuid references public.applications(id) on delete cascade not null,
  file_path text not null,
  doc_type text check (doc_type in ('transkript', 'kimlik', 'ogrenci_belgesi')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table applications enable row level security;
alter table documents enable row level security;

-- Policies for applications
create policy "Students can view their own applications" on applications
  for select using (auth.uid() = user_id);

create policy "Students can insert their own applications" on applications
  for insert with check (auth.uid() = user_id);

create policy "Students can update their own applications" on applications
  for update using (auth.uid() = user_id);

-- Policies for documents
create policy "Students can view their own documents" on documents
  for select using (
    application_id in (select id from applications where user_id = auth.uid())
  );

create policy "Students can insert their own documents" on documents
  for insert with check (
    application_id in (select id from applications where user_id = auth.uid())
  );

-- Storage Policies for 'scholarship-docs' bucket
-- Note: You MUST create the 'scholarship-docs' bucket in the Supabase UI first!

-- Allow users to upload files to their own folder (folder name = user_id)
create policy "Users can upload their own docs" on storage.objects
  for insert with check (
    bucket_id = 'scholarship-docs' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow users to view their own docs
create policy "Users can view their own docs" on storage.objects
  for select using (
    bucket_id = 'scholarship-docs' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow admins full access (Optional, based on user roles)
create policy "Admins have full access to applications" on applications
  for all using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

create policy "Admins have full access to documents" on documents
  for all using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

create policy "Admins have full access to storage" on storage.objects
  for all using (
    bucket_id = 'scholarship-docs' and
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );
