"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal, Plus, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

// Dummy data using the conversion-first application stage enum
const COLUMNS = [
  { id: "SAVED", title: "Saved", count: 4 },
  { id: "APPLYING", title: "Applying", count: 2 },
  { id: "APPLIED", title: "Applied", count: 12 },
  { id: "CALLBACK", title: "Callback ✨", count: 3 },
  { id: "INTERVIEWING", title: "Interviewing", count: 2 },
  { id: "OFFER", title: "Offer 🎉", count: 1 },
];

const CARDS = [
  { id: 1, column: "CALLBACK", company: "Razorpay", role: "Frontend Eng", callbackAt: "2d", platform: "LinkedIn", logo: "bg-blue-600" },
  { id: 2, column: "CALLBACK", company: "Stripe", role: "Software Eng", callbackAt: "4d", platform: "Careers", logo: "bg-indigo-500" },
  { id: 3, column: "INTERVIEWING", company: "Zerodha", role: "Fullstack Eng", platform: "Direct", logo: "bg-orange-500" },
  { id: 4, column: "APPLIED", company: "Cred", role: "Backend Eng", platform: "Instahyre", logo: "bg-gray-800" },
  { id: 5, column: "OFFER", company: "Flipkart", role: "SDE II", platform: "Naukri", logo: "bg-yellow-500" },
];

export default function ApplicationsPipelinePage() {
  return (
    <div className="h-full flex flex-col pt-6 pb-0 pl-6 pr-0 max-w-[100vw] overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between pr-6 gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Conversion Pipeline</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Focus on callbacks. <strong className="text-primary font-medium">✨ 22% callback rate</strong> this month.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search companies, roles..."
              className="w-full pl-8 h-9 bg-background focus-visible:ring-primary/50"
            />
          </div>
          <Button size="sm" className="h-9 gap-1 shadow-md shadow-primary/10">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Application</span>
          </Button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <ScrollArea className="flex-1 w-full whitespace-nowrap pb-6 rounded-tl-xl border-l border-t border-border/50 bg-card/30 shadow-inner">
        <div className="flex p-6 gap-6 h-full items-start min-w-max">
          {COLUMNS.map((col) => {
            const isCallback = col.id === "CALLBACK";
            const isOffer = col.id === "OFFER";
            const colCards = CARDS.filter((c) => c.column === col.id);

            return (
              <div key={col.id} className="w-80 shrink-0 flex flex-col h-full max-h-[calc(100vh-16rem)]">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 sticky top-0 bg-transparent z-10 py-1">
                  <h3 className={`font-semibold flex items-center gap-2 text-sm uppercase tracking-wider ${
                    isCallback ? 'text-primary' : isOffer ? 'text-green-500' : 'text-foreground/80'
                  }`}>
                    {col.title}
                  </h3>
                  <Badge variant="secondary" className="px-1.5 min-w-[20px] justify-center bg-background border border-border text-muted-foreground font-mono font-medium rounded-full">
                    {col.count}
                  </Badge>
                </div>

                {/* Column Body / Drop Zone */}
                <ScrollArea className="flex-1 -mx-2 px-2">
                  <div className="space-y-3 pb-4">
                    {colCards.map((card) => (
                      <Card 
                        key={card.id} 
                        className={`p-4 cursor-grab active:cursor-grabbing hover:border-foreground/30 transition-shadow hover:shadow-md ${
                          isCallback ? 'border-primary/40 bg-primary/[0.03] shadow-primary/5' : 
                          isOffer ? 'border-green-500/40 bg-green-500/[0.03] shadow-green-500/5' : 
                          'bg-background shadow-sm border-border/60'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <Badge variant="outline" className="text-[10px] uppercase font-semibold text-muted-foreground">
                            {card.platform}
                          </Badge>
                          <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2 text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-md shrink-0 flex items-center justify-center text-white font-bold text-xs ${card.logo}`}>
                            {card.company.charAt(0)}
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-bold truncate text-sm">{card.company}</p>
                            <p className="text-xs text-muted-foreground truncate">{card.role}</p>
                          </div>
                        </div>

                        {card.callbackAt && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 w-fit px-2 py-1 rounded-md">
                            <Sparkles className="h-3 w-3" />
                            Response {card.callbackAt} ago
                          </div>
                        )}
                      </Card>
                    ))}
                    
                    {/* Empty State / Add New */}
                    <div className="h-20 rounded-xl border-2 border-dashed border-border/60 bg-transparent hover:bg-muted/30 hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer text-muted-foreground hover:text-primary group">
                      <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">Add to {col.title}</span>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
