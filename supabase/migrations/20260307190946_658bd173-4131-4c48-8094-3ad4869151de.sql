
-- Create subscribers table
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe" ON public.subscribers
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view subscribers (admin use)
CREATE POLICY "Authenticated can view subscribers" ON public.subscribers
  FOR SELECT TO authenticated
  USING (true);

-- Add cover_image_url column to resources
ALTER TABLE public.resources ADD COLUMN cover_image_url TEXT;
