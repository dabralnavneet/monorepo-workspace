"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Flame, Target, Trophy, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverview() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Navneet! 👋</h1>
          <p className="text-muted-foreground">Here’s what’s happening with your job search today.</p>
        </div>
      </div>

      {/* Hero Metric - Conversion First Focus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-primary/5 border-primary/20 col-span-1 md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" /> Wait, you’re on fire!
              </h2>
              <p className="text-muted-foreground max-w-sm">
                Your callback rate over the last 30 days is <strong className="text-foreground">22%</strong>. That’s significantly higher than the industry average of 8%. Keep tailoring those resumes!
              </p>
            </div>
            <div className="shrink-0 text-center bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4">
              <div className="text-5xl font-black text-primary mb-1">22%</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Callback Rate</div>
            </div>
          </div>
        </Card>

        {/* Small Stats */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
              <Trophy className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">1</div>
              <div className="text-xs text-muted-foreground">Active Offer</div>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-muted-foreground">Active Pipelines</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Funnel Dropoff */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Pipeline Health</h3>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Applications Submitted (42)</span>
                <span className="text-muted-foreground">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-primary flex items-center gap-1">Callbacks Received (9) ✨</span>
                <span className="text-primary font-medium">21.4%</span>
              </div>
              <Progress value={21.4} className="h-2 bg-primary/10 [&>div]:bg-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-green-500">Offers (1) 🎉</span>
                <span className="text-green-500 font-medium">2.3%</span>
              </div>
              <Progress value={2.3} className="h-2 bg-green-500/10 [&>div]:bg-green-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Momentum</h3>
          <span className="text-sm text-primary flex items-center cursor-pointer hover:underline">
            View All <ArrowUpRight className="w-4 h-4 ml-1" />
          </span>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead className="text-right">Last Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Razorpay</TableCell>
                <TableCell className="text-muted-foreground">Senior Frontend Engineer</TableCell>
                <TableCell>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 outline-none border-none shadow-none">
                    CALLBACK ✨
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">2 hours ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Zerodha</TableCell>
                <TableCell className="text-muted-foreground">Full Stack Developer</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-blue-500/30 text-blue-500/90 bg-blue-500/5">
                    INTERVIEWING
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">Yesterday</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Flipkart</TableCell>
                <TableCell className="text-muted-foreground">SDE II</TableCell>
                <TableCell>
                  <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 outline-none border-none shadow-none">
                    OFFER 🎉
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">3 days ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Google</TableCell>
                <TableCell className="text-muted-foreground">Software Engineer, L4</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-muted-foreground bg-muted/50">
                    CLOSED
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">Last week</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
