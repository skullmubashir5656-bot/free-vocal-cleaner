import { Upload, Zap, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Song",
    description: "Drag and drop any audio file (MP3, WAV, FLAC, etc.) or click to browse",
    step: "01"
  },
  {
    icon: Zap,
    title: "AI Processing",
    description: "Our advanced AI separates vocals from instrumentals in seconds",
    step: "02"
  },
  {
    icon: Download,
    title: "Download Results",
    description: "Preview and download both vocal and instrumental tracks instantly",
    step: "03"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="gradient-primary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to separate your music tracks
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines - Hidden on Mobile */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Card */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full gradient-primary flex items-center justify-center font-bold text-lg shadow-glow">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl gradient-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
