import { Button } from "@/components/ui/button";
import { Upload, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-waveform.jpg";

export const Hero = ({ onUploadClick }: { onUploadClick: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 waveform opacity-20" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">AI-Powered Vocal Separation</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Remove Vocals from
            <span className="block gradient-hero bg-clip-text text-transparent">
              Any Song for Free
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Separate vocals and instrumentals in seconds with AI. 
            Perfect for karaoke, remixes, and music production.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              variant="hero" 
              onClick={onUploadClick}
              className="text-lg px-8 py-6 h-auto"
            >
              <Upload className="w-5 h-5" />
              Upload a Song
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 h-auto border-primary/30 hover:border-primary/50"
            >
              Watch Demo
            </Button>
          </div>
          
          {/* Free Usage Badge */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">50 free uploads</span> — No credit card required
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
