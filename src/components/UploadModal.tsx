import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X, FileAudio, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UploadModal = ({ open, onOpenChange }: UploadModalProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
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
    setProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            toast({
              title: "Processing complete!",
              description: "Your vocal and instrumental tracks are ready.",
            });
            // In a real app, you'd show download links here
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
              
              {progress === 100 && (
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" size="lg">
                    Download Vocals
                  </Button>
                  <Button variant="outline" size="lg">
                    Download Instrumental
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
