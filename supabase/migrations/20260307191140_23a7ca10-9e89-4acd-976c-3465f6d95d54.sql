
-- Allow users to update their own resources (for cover image changes)
CREATE POLICY "Users can update their own resources" ON public.resources
  FOR UPDATE TO authenticated
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);
