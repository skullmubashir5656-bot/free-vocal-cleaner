-- Create storage buckets for audio uploads and processed files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('audio-uploads', 'audio-uploads', false, 104857600, ARRAY['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/m4a', 'audio/ogg', 'audio/webm', 'audio/mp3', 'audio/x-m4a']),
  ('processed-audio', 'processed-audio', false, 104857600, ARRAY['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/m4a', 'audio/ogg', 'audio/webm', 'audio/mp3', 'audio/x-m4a']);

-- RLS policies for audio-uploads bucket
CREATE POLICY "Anyone can upload audio files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'audio-uploads');

CREATE POLICY "Users can view their own uploads"
ON storage.objects
FOR SELECT
USING (bucket_id = 'audio-uploads');

CREATE POLICY "Users can delete their own uploads"
ON storage.objects
FOR DELETE
USING (bucket_id = 'audio-uploads');

-- RLS policies for processed-audio bucket
CREATE POLICY "Anyone can upload processed files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'processed-audio');

CREATE POLICY "Users can view processed files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'processed-audio');

CREATE POLICY "Users can delete processed files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'processed-audio');