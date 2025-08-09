-- Create storage bucket for presentations
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('presentations', 'presentations', true, 52428800, ARRAY['application/vnd.openxmlformats-officedocument.presentationml.presentation']);

-- Create policies for presentations bucket
CREATE POLICY "Users can upload their own presentations" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'presentations' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view presentations" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'presentations');

CREATE POLICY "Users can update their own presentations" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'presentations' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own presentations" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'presentations' AND auth.uid()::text = (storage.foldername(name))[1]);