-- Create the scholarship-docs bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('scholarship-docs', 'scholarship-docs', false)
on conflict (id) do nothing;

-- Ensure the bucket is active
update storage.buckets
set public = false
where id = 'scholarship-docs';
