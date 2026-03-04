
-- Create resources table for uploaded PDFs
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Anyone can read resources
CREATE POLICY "Resources are publicly readable"
ON public.resources FOR SELECT
USING (true);

-- Authenticated users can upload
CREATE POLICY "Authenticated users can insert resources"
ON public.resources FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = uploaded_by);

-- Users can delete their own uploads
CREATE POLICY "Users can delete their own resources"
ON public.resources FOR DELETE
TO authenticated
USING (auth.uid() = uploaded_by);

-- Create storage bucket for resource PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true);

-- Public read access
CREATE POLICY "Resource files are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'resources');

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload resources"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resources');

-- Users can delete their own uploads
CREATE POLICY "Users can delete their own resource files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resources' AND auth.uid()::text = (storage.foldername(name))[1]);
