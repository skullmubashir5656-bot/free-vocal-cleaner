import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X, FileAudio, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface ProcessedAudio {
  vocalsUrl: string;
  instrumentalUrl: string;
}

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UploadModal = ({ open, onOpenChange }: UploadModalProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedAudio, setProcessedAudio] = useState<ProcessedAudio | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('audio/')) {
      setFile(droppedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file (MP3, WAV, FLAC, etc.)",
        variant: "destructive"
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(10);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);

      setProgress(20);

      // Call edge function
      const response = await fetch(`${SUPABASE_URL}/functions/v1/separate-vocals`, {
        method: "POST",
        body: formData,
      });

      setProgress(50);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process audio");
      }

      const data = await response.json();
      
      setProgress(90);

      if (data.success && data.vocalsUrl && data.instrumentalUrl) {
        setProcessedAudio({
          vocalsUrl: data.vocalsUrl,
          instrumentalUrl: data.instrumentalUrl,
        });
        setProgress(100);
        setIsProcessing(false);
        
        toast({
          title: "Processing complete!",
          description: "Your vocal and instrumental tracks are ready for download.",
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Processing error:", error);
      setIsProcessing(false);
      setProgress(0);
      
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "Failed to separate audio. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
    setIsProcessing(false);
    setProcessedAudio(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = async (type: 'vocals' | 'instrumental') => {
    if (!processedAudio) return;
    
    try {
      const url = type === 'vocals' ? processedAudio.vocalsUrl : processedAudio.instrumentalUrl;
      const response = await fetch(url);
      const blob = await response.blob();
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${file?.name.replace(/\.[^/.]+$/, '') || 'audio'}_${type}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      
      toast({
        title: "Download started",
        description: `Downloading ${type} track...`,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "Failed to download file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upload Your Song</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
                ${isDragging 
                  ? 'border-primary bg-primary/10 scale-105' 
                  : 'border-border hover:border-primary/50 hover:bg-card/50'
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8" />
                </div>
                
                <div>
                  <p className="text-lg font-semibold mb-2">
                    Drop your audio file here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Supports MP3, WAV, FLAC, M4A, and more • Max 100MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Info */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center">
                  <FileAudio className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {!isProcessing && (
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={handleRemoveFile}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>
              
              {/* Progress */}
              {isProcessing && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Processing...</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Separating vocals and instrumentals</span>
                  </div>
                </div>
              )}
              
              {/* Action Button */}
              {!isProcessing && progress === 0 && (
                <Button 
                  variant="hero" 
                  className="w-full"
                  size="lg"
                  onClick={handleProcess}
                >
                  Start Processing
                </Button>
              )}
              
              {progress === 100 && processedAudio && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <p className="text-sm text-center font-medium text-primary">
                      ✓ Processing complete! Download your separated tracks below.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => handleDownload('vocals')}
                    >
                      Download Vocals
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => handleDownload('instrumental')}
                    >
                      Download Instrumental
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
