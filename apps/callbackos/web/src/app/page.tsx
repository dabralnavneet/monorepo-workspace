"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Send, 
  TrendingUp, 
  CheckCircle2,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              HF
            </div>
            <span className="font-bold text-xl tracking-tight">CallbackOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">Log in</Button>
            <Button className="rounded-full shadow-lg shadow-primary/20">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-purple-500 blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/30 bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              The End-to-End Interview Assistant
            </Badge>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Land Your Dream Job <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-400">
              Without the Chaos.
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AI-tailored resumes, conversion-focused pipelines, and job aggregation.
            Stop tracking rejections — start celebrating callbacks.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="h-14 px-8 rounded-full text-base font-medium group">
              Start Free Trial 
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-medium">
              View Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Floating Mockup Preview */}
      <section className="px-6 pb-32">
        <motion.div 
          className="container mx-auto max-w-6xl relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="absolute inset-0 -top-8 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 blur-xl rounded-3xl" />
          <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-2 shadow-2xl relative overflow-hidden">
            <div className="rounded-xl overflow-hidden bg-background border border-border/50 flex">
              {/* Fake Sidebar */}
              <div className="w-16 md:w-64 border-r border-border/50 bg-card/30 p-4 hidden sm:block">
                <div className="h-8 w-8 rounded bg-primary/20 mb-8" />
                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-1/2 rounded bg-muted" />
                  <div className="h-4 w-2/3 rounded bg-primary/20" />
                </div>
              </div>
              
              {/* Fake Main Content */}
              <div className="flex-1 p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">My Applications</h3>
                    <p className="text-muted-foreground text-sm">Conversion-first tracking.</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-3xl font-black text-primary">22%</div>
                    <div className="text-xs text-muted-foreground">Callback Rate 🔥</div>
                  </div>
                </div>

                {/* Fake Kanban Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Applied Column */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">Applied</span>
                      <span className="text-muted-foreground text-xs">12</span>
                    </div>
                    <Card className="p-4 bg-background border-border shadow-sm">
                      <div className="h-4 w-1/3 rounded bg-muted mb-3" />
                      <div className="h-3 w-1/2 rounded bg-muted/50 mb-4" />
                      <div className="flex items-center justify-between">
                        <div className="h-6 w-16 rounded-full bg-blue-500/10 border border-blue-500/20" />
                        <div className="h-6 w-6 rounded-full bg-muted" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-background border-border shadow-sm opacity-60">
                      <div className="h-4 w-2/3 rounded bg-muted mb-3" />
                      <div className="h-3 w-1/3 rounded bg-muted/50" />
                    </Card>
                  </div>

                  {/* Callback Column */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-primary flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Callback
                      </span>
                      <span className="text-primary text-xs">4</span>
                    </div>
                    <Card className="p-4 bg-primary/5 border-primary/20 shadow-md transform -translate-y-1 transition-transform cursor-pointer">
                      <div className="h-4 w-2/3 rounded bg-foreground mb-3" />
                      <div className="h-3 w-1/2 rounded bg-muted mb-4" />
                      <div className="flex items-center justify-between">
                        <div className="h-6 w-20 rounded-full bg-primary/20 text-[10px] flex items-center justify-center font-medium text-primary">Tech Round</div>
                        <div className="h-6 w-6 rounded-full bg-primary/40" />
                      </div>
                    </Card>
                  </div>

                  {/* Offer Column */}
                  <div className="space-y-4 hidden md:block">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-green-500">Offer 🎉</span>
                      <span className="text-green-500 text-xs">1</span>
                    </div>
                    <Card className="p-4 bg-green-500/5 border-green-500/20 shadow-sm">
                      <div className="h-4 w-1/2 rounded bg-foreground mb-3" />
                      <div className="h-3 w-2/3 rounded bg-muted mb-4" />
                      <div className="h-8 w-full rounded bg-green-500/20" />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-card/30 border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for the Modern Candidate</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to move from "Applying" to "Offer Accepted" in one unified platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<Target className="w-6 h-6 text-primary" />}
              title="AI Resume Tailoring"
              description="Paste a Job Description. Get an optimized resume instantly with a match score. Land past ATS systems easily."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              title="Conversion Tracking"
              description="No demoralizing 'rejected' columns. Focus on callbacks and momentum with our psychology-driven pipeline."
            />
            <FeatureCard 
              icon={<Briefcase className="w-6 h-6 text-primary" />}
              title="Job Aggregation"
              description="Curated listings from leading Indian boards and startups directly inside your workspace."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">HF</div>
            <span className="font-semibold text-foreground">CallbackOS</span>
          </div>
          <p>© 2026 CallbackOS. The complete interview experience platform.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="p-8 bg-background/50 border-border/50 hover:border-primary/50 transition-colors duration-300">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
