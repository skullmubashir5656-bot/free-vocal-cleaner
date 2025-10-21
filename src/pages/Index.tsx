import { useState } from "react";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { UploadModal } from "@/components/UploadModal";

const Index = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Hero onUploadClick={() => setUploadModalOpen(true)} />
      
      <div id="how-it-works">
        <HowItWorks />
      </div>
      
      <div id="features">
        <Features />
      </div>
      
      <div id="pricing">
        <Pricing />
      </div>
      
      <div id="faq">
        <FAQ />
      </div>
      
      <Footer />
      
      <UploadModal 
        open={uploadModalOpen} 
        onOpenChange={setUploadModalOpen}
      />
    </div>
  );
};

export default Index;
