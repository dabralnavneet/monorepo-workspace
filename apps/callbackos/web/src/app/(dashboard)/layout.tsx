"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Briefcase, 
  FileText, 
  Target, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/applications", label: "Pipeline", icon: Target },
  { href: "/resumes", label: "AI Tailoring", icon: FileText },
  { href: "/jobs", label: "Job Feed", icon: Briefcase },
  { href: "/stats", label: "Analytics", icon: BarChart3 },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-card/40 backdrop-blur-md flex flex-col hidden md:flex">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              HF
            </div>
            <span className="font-bold text-lg tracking-tight">HireFlow</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant={isActive ? "secondary" : "ghost"} 
                  className={`w-full justify-start h-10 px-3 ${isActive ? "font-semibold" : "text-muted-foreground font-normal hover:text-foreground"}`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User / Settings Footer */}
        <div className="p-4 border-t border-border/40 space-y-2">
          <Button variant="ghost" className="w-full justify-start h-10 px-3 text-muted-foreground hover:text-foreground">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
          <div className="flex items-center gap-3 px-3 py-2 mt-2">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>ND</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Navneet Dabral</p>
              <p className="text-xs text-muted-foreground truncate">user@hireflow.app</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full shrink-0 text-muted-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border/40 bg-background/80 backdrop-blur-md z-10 shrink-0">
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Logo */}
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              HF
            </div>
            <span className="font-bold tracking-tight">HireFlow</span>
          </div>
          <div className="hidden md:flex flex-1" />
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden sm:flex rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
              <Target className="mr-2 h-4 w-4" />
              Tailor Resume
            </Button>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-destructive border-[2px] border-background" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-background/50">
          {children}
        </div>
      </main>
    </div>
  );
}
