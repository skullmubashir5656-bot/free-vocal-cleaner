import { Music, Lock, Gauge, FileAudio, Wand2, Download } from "lucide-react";

const features = [
  {
    icon: Music,
    title: "All Audio Formats",
    description: "Support for MP3, WAV, FLAC, M4A, OGG, and more"
  },
  {
    icon: Gauge,
    title: "Lightning Fast",
    description: "Process songs in seconds with our optimized AI engine"
  },
  {
    icon: Wand2,
    title: "AI-Powered",
    description: "State-of-the-art deep learning for crystal clear separation"
  },
  {
    icon: Lock,
    title: "100% Private",
    description: "Your files are processed securely and deleted immediately"
  },
  {
    icon: Download,
    title: "Instant Downloads",
    description: "Preview and download both tracks right away"
  },
  {
    icon: FileAudio,
    title: "High Quality",
    description: "Preserve audio quality with lossless processing options"
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-4 bg-card/30 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Powerful <span className="gradient-primary bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for professional vocal separation
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
