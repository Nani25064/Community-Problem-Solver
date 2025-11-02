import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle, Users, CheckCircle } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBanner} 
          alt="Community members working together" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/75"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in leading-tight">
            Make Your Community
            <span className="block text-primary">Better Together</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in leading-relaxed">
            Report local issues, track their progress, and collaborate with neighbors to create positive change in your community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up">
            <Button size="lg" asChild className="bg-gradient-hero text-lg px-8 shadow-lg hover:shadow-xl transition-all">
              <Link to="/report-problem">Report an Issue</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 border-2">
              <Link to="/issues">Browse Issues</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-scale-in">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary-light p-2 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">1,247</div>
                  <div className="text-sm text-muted-foreground">Issues Reported</div>
                </div>
              </div>
            </div>

            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">892</div>
                  <div className="text-sm text-muted-foreground">Problems Solved</div>
                </div>
              </div>
            </div>

            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-info" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">3,421</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
