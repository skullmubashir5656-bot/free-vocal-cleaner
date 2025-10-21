import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Pricing = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Start <span className="gradient-primary bg-clip-text text-transparent">Free</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get 50 free vocal separations. Sign up to continue after that.
          </p>
        </div>
        
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl rounded-3xl" />
          
          {/* Card */}
          <div className="relative bg-card border-2 border-primary/30 rounded-3xl p-8 md:p-12 shadow-glow">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold mb-2">Free Tier</h3>
                <p className="text-muted-foreground">Perfect for trying out the service</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
                  $0
                </div>
                <p className="text-sm text-muted-foreground">for 50 uploads</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                "50 free vocal separations",
                "All audio formats supported",
                "High-quality output (320kbps)",
                "Fast AI processing",
                "No credit card required",
                "Privacy guaranteed"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  <span className="font-semibold">After 50 uploads:</span> Create a free account to continue using the service. No payment required.
                </p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              variant="hero"
              className="w-full text-lg py-6 h-auto"
              onClick={() => navigate("/auth")}
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
