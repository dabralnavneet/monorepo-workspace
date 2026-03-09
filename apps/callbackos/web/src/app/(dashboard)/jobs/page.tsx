"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Building2, ExternalLink, BookmarkPlus, Filter, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dummy jobs
const JOBS = [
  { id: 1, title: "SDE II - Frontend", company: "Rippling", location: "Bangalore (Hybrid)", salary: "₹40L - ₹65L", platform: "LinkedIn", time: "2h ago", tags: ["React", "TypeScript", "Performance"] },
  { id: 2, title: "Founding UI Engineer", company: "Stealth AI Startup", location: "Remote (India)", salary: "₹30L - ₹50L + Equity", platform: "Wellfound", time: "5h ago", tags: ["Next.js", "AI/ML Integrations", "Tailwind"] },
  { id: 3, title: "Senior Software Engineer", company: "PhonePe", location: "Bangalore (Onsite)", platform: "Instahyre", time: "1d ago", tags: ["Node.js", "Microservices", "Scale"] },
  { id: 4, title: "Full Stack Engineer (React/Node)", company: "Groww", location: "Bangalore", salary: "₹25L - ₹45L", platform: "Naukri", time: "2d ago", tags: ["React Native", "Kafka", "PostgreSQL"] },
];

export default function JobsFeedPage() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Job Feed Aggregator</h1>
          <p className="text-sm text-muted-foreground">Curated listings from LinkedIn, Instahyre, Wellfound and more.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search job titles, companies, or keywords..." className="pl-10 h-10 w-full bg-background/50 backdrop-blur-sm" />
        </div>
        <div className="flex gap-2 shrink-0">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-background/50">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="instahyre">Instahyre</SelectItem>
              <SelectItem value="wellfound">Wellfound</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-background/50 h-10 px-3 border-border/50 hidden sm:flex">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {JOBS.map(job => (
          <Card key={job.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/40 transition-colors bg-background/40 hover:bg-background/80 shadow-sm group">
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between md:justify-start gap-4">
                <div className="w-12 h-12 rounded bg-muted/30 border border-border/50 shrink-0 flex items-center justify-center font-bold text-foreground">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors cursor-pointer">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1 font-medium text-foreground/80">
                      <Building2 className="w-3.5 h-3.5" /> {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                    {job.salary && (
                      <span className="text-green-500/90 font-medium bg-green-500/10 px-1.5 rounded text-xs hidden sm:inline-block">
                        {job.salary}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pl-0 md:pl-16">
                {job.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-muted font-normal text-xs">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pl-0 md:pl-6 md:border-l border-border/40">
              <div className="flex items-center gap-2 md:mb-2 text-xs text-muted-foreground w-full justify-between md:justify-end">
                <span className="font-medium text-foreground opacity-80 uppercase tracking-wider text-[10px]">{job.platform}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {job.time}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hidden sm:flex border-primary/20 text-primary hover:bg-primary/5">
                  <BookmarkPlus className="w-4 h-4 mr-1.5" /> Save
                </Button>
                <Button size="sm" className="shadow-md shadow-primary/10">
                  Quick Apply <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <div className="py-8 text-center">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Load more jobs...</Button>
        </div>
      </div>
    </div>
  );
}
