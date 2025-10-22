import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import Replicate from "https://esm.sh/replicate@0.25.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const REPLICATE_API_KEY = Deno.env.get("REPLICATE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!REPLICATE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const replicate = new Replicate({ auth: REPLICATE_API_KEY });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("fileName") as string;

    if (!file || !fileName) {
      return new Response(
        JSON.stringify({ error: "File and fileName are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing file:", fileName);

    // Upload original file to storage
    const uploadPath = `${Date.now()}-${fileName}`;
    const fileBuffer = await file.arrayBuffer();
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("audio-uploads")
      .upload(uploadPath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Failed to upload file: ${uploadError.message}`);
    }

    console.log("File uploaded successfully:", uploadData.path);

    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from("audio-uploads")
      .getPublicUrl(uploadPath);

    console.log("Starting vocal separation with Replicate...");

    // Use Replicate to separate vocals
    const output = await replicate.run(
      "cjwbw/deezer-spleeter:583719b4d6c2e81f9ce5a6a2b8f6d1e6c1c5b7d2c6b1b3f2e8c4f5a6b7c8d9e0",
      {
        input: {
          audio: urlData.publicUrl,
          stems: "vocals,accompaniment",
        },
      }
    ) as { vocals?: string; accompaniment?: string };

    console.log("Separation complete, output:", output);

    if (!output.vocals || !output.accompaniment) {
      throw new Error("Failed to process audio: No output from Replicate");
    }

    // Download and store the separated tracks
    const vocalsResponse = await fetch(output.vocals);
    const vocalsBuffer = await vocalsResponse.arrayBuffer();
    
    const instrumentalResponse = await fetch(output.accompaniment);
    const instrumentalBuffer = await instrumentalResponse.arrayBuffer();

    const timestamp = Date.now();
    const vocalsPath = `${timestamp}-vocals.wav`;
    const instrumentalPath = `${timestamp}-instrumental.wav`;

    // Upload vocals
    const { error: vocalsError } = await supabase.storage
      .from("processed-audio")
      .upload(vocalsPath, vocalsBuffer, {
        contentType: "audio/wav",
        upsert: false,
      });

    if (vocalsError) {
      console.error("Vocals upload error:", vocalsError);
      throw new Error(`Failed to upload vocals: ${vocalsError.message}`);
    }

    // Upload instrumental
    const { error: instrumentalError } = await supabase.storage
      .from("processed-audio")
      .upload(instrumentalPath, instrumentalBuffer, {
        contentType: "audio/wav",
        upsert: false,
      });

    if (instrumentalError) {
      console.error("Instrumental upload error:", instrumentalError);
      throw new Error(`Failed to upload instrumental: ${instrumentalError.message}`);
    }

    // Get signed URLs for download (valid for 1 hour)
    const { data: vocalsUrlData } = await supabase.storage
      .from("processed-audio")
      .createSignedUrl(vocalsPath, 3600);

    const { data: instrumentalUrlData } = await supabase.storage
      .from("processed-audio")
      .createSignedUrl(instrumentalPath, 3600);

    console.log("Processing complete, returning URLs");

    return new Response(
      JSON.stringify({
        vocalsUrl: vocalsUrlData?.signedUrl,
        instrumentalUrl: instrumentalUrlData?.signedUrl,
        success: true,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in separate-vocals function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred",
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
