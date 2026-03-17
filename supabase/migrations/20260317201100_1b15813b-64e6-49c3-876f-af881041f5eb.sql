
-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  image_url TEXT,
  focus_areas TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT NOT NULL DEFAULT '',
  full_bio TEXT[] NOT NULL DEFAULT '{}',
  office TEXT NOT NULL DEFAULT 'Perugia',
  email TEXT NOT NULL DEFAULT '',
  linkedin TEXT NOT NULL DEFAULT '#',
  expertise TEXT[] NOT NULL DEFAULT '{}',
  highlights TEXT[] NOT NULL DEFAULT '{}',
  education TEXT[] NOT NULL DEFAULT '{}',
  publications JSONB NOT NULL DEFAULT '[]',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Team members are publicly readable"
ON public.team_members FOR SELECT TO anon, authenticated
USING (true);

-- Authenticated users can manage (admin check in app)
CREATE POLICY "Authenticated users can insert team members"
ON public.team_members FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update team members"
ON public.team_members FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete team members"
ON public.team_members FOR DELETE TO authenticated
USING (true);

-- Create storage bucket for team photos
INSERT INTO storage.buckets (id, name, public) VALUES ('team-photos', 'team-photos', true);

-- Storage policies for team photos
CREATE POLICY "Team photos are publicly readable"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'team-photos');

CREATE POLICY "Authenticated users can upload team photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'team-photos');

CREATE POLICY "Authenticated users can update team photos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'team-photos');

CREATE POLICY "Authenticated users can delete team photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'team-photos');

-- Trigger for updated_at
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
