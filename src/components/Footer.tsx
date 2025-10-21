import { Music2 } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Music2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">VocalRemoverX</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered vocal separation for musicians, producers, and creators.
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/auth" className="hover:text-primary transition-colors">Sign Up</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 VocalRemoverX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
