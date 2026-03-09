"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Upload, FileText, Target, Sparkles, Wand2, Download, Copy, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ResumesTailoringPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">AI Resume Tailoring</h1>
          <p className="text-sm text-muted-foreground">Match past ATS filters by aligning your resume to the exact Job Description.</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[500px]">
        {/* Left Column: Input (JD + Source Resume) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          <Card className="p-5 flex flex-col gap-4 border-primary/20 bg-background/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Target Job Description
              </h2>
            </div>
            <div className="space-y-3 relative z-10">
              <div className="grid gap-2">
                <Label htmlFor="jd-title" className="text-xs text-muted-foreground uppercase">Job Role & Company</Label>
                <div className="flex gap-2">
                  <Input id="jd-title" placeholder="e.g. Senior Frontend Engineer" className="flex-1 bg-background" defaultValue="Senior Frontend Engineer" />
                  <Input placeholder="Razorpay" className="w-1/3 bg-background" defaultValue="Razorpay" />
                </div>
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="jd-content" className="text-xs text-muted-foreground uppercase">Job Description Content</Label>
                <Textarea 
                  id="jd-content" 
                  placeholder="Paste the full job requirements here..." 
                  className="min-h-[160px] resize-none bg-background font-mono text-xs" 
                  defaultValue="We are looking for a highly skilled Senior Frontend Engineer with 4+ years of React experience. You should have strong knowledge of TypeScript, Next.js, and modern CSS (Tailwind). Performance optimization and accessibility are key..."
                />
              </div>
            </div>
          </Card>

          <Card className="p-5 flex flex-col gap-4 border-border/50 bg-background/30 shadow-sm">
            <h2 className="font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" /> Base Resume
            </h2>
            <div className="border border-border rounded-lg p-4 bg-muted/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Navneet_SDE_Master.pdf</p>
                  <p className="text-xs text-muted-foreground">Updated 2 days ago • 142 KB</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-8 shadow-sm">Change</Button>
            </div>
          </Card>

          <Button size="lg" className="w-full gap-2 font-bold shadow-lg shadow-primary/20 h-12">
            <Wand2 className="w-5 h-5" /> Generate Tailored Resume
          </Button>
        </div>

        {/* Right Column: Output (Tailored Result) */}
        <div className="col-span-1 lg:col-span-7 h-full flex flex-col">
          <Card className="flex-1 border-border/50 shadow-sm overflow-hidden flex flex-col bg-card/40 backdrop-blur-sm">
            {/* Output Header */}
            <div className="p-5 border-b border-border/50 bg-background/50 object-cover flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Tailored Resume Output</h3>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 flex items-center gap-1.5 px-2 py-0.5 text-xs">
                    <Sparkles className="w-3 h-3" /> 89% Match
                  </Badge>
                  <span className="text-xs text-muted-foreground">Generated 10 mins ago for Razorpay</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" className="h-9 w-9 bg-background"><Copy className="h-4 w-4 text-muted-foreground"/></Button>
                <Button size="sm" variant="outline" className="h-9 bg-background gap-2"><Download className="h-4 w-4"/> PDF</Button>
              </div>
            </div>

            <Tabs defaultValue="suggestions" className="flex-1 flex flex-col">
              <div className="px-5 border-b border-border/50 bg-background/30">
                <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0">
                  <TabsTrigger value="suggestions" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-4 shadow-none font-medium">
                    AI Suggestions
                  </TabsTrigger>
                  <TabsTrigger value="content" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-4 shadow-none font-medium">
                    Preview Content
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1 p-5">
                <TabsContent value="suggestions" className="m-0 focus-visible:outline-none space-y-4">
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 text-sm list-none grid gap-3">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Added Next.js emphasis:</strong> <span className="text-muted-foreground">Moved your React experience higher and highlighted the 'App Router SSR' project to match the JD exactly.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Tailwind alignment:</strong> <span className="text-muted-foreground">Replaced "CSS Modules" mentions with "Tailwind CSS architecture" to hit keyword filters.</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-background space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" /> Missing Requirements Discovered
                    </h4>
                    <Progress value={89} className="h-1.5 mb-2 bg-muted/50 [&>div]:bg-green-500" />
                    <p className="text-xs font-mono text-muted-foreground mb-4">You are missing exactly 1 hard requirement from the JD:</p>
                    <div className="flex items-center gap-2 text-sm border-l-2 border-orange-500 pl-3 py-1 bg-orange-500/5">
                      "Experience with WebGL or Three.js" <Badge variant="outline" className="text-[10px] ml-auto">Hard to Fake</Badge>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="m-0 focus-visible:outline-none">
                  <div className="bg-background border border-border shadow-sm p-8 rounded min-h-[600px] font-sans">
                    {/* Dummy resume visual */}
                    <div className="text-center mb-8 border-b border-border pb-6">
                      <h1 className="text-2xl font-bold uppercase tracking-wider text-foreground mb-2">Navneet Dabral</h1>
                      <p className="text-sm text-muted-foreground flex justify-center gap-3">
                        <span>New Delhi, India</span> • <span>navneet@hireflow.app</span> • <span>github.com/ndabral</span>
                      </p>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-muted pb-1 mb-3">Professional Summary</h2>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        Senior Frontend Engineer with 4+ years of expertise building scalable React architectures. 
                        Specialize in Next.js, advanced state management, and Tailwind CSS. <span className="bg-primary/20 text-primary font-semibold px-1 rounded">Proven track record optimizing Next.js performance</span> for high-traffic financial applications.
                      </p>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-muted pb-1 mb-3">Experience</h2>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-sm font-bold text-foreground">SDE II, Frontend Core</h3>
                          <span className="text-xs text-muted-foreground font-mono">2023 - Present</span>
                        </div>
                        <p className="text-xs italic text-muted-foreground mb-2">Tech Startup XYZ</p>
                        <ul className="list-disc pl-4 text-sm text-foreground/80 space-y-1">
                          <li>Led migration of legacy React dashboard to <span className="text-primary font-semibold">Next.js App Router</span>, improving LCP by 45%.</li>
                          <li>Architected a custom design system entirely in <span className="bg-primary/20 text-primary font-semibold px-1 rounded">Tailwind CSS</span> consumed by 4 internal teams.</li>
                          <li>Mentored 3 junior engineers on accessibility and web performance metrics.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
