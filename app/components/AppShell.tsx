'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Settings2, 
  Target, 
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  currentPage?: string;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3, id: 'dashboard' },
  { name: 'Journal', href: '/journal', icon: BookOpen, id: 'journal' },
  { name: 'Automation', href: '/automation', icon: Target, id: 'automation' },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp, id: 'analytics' },
  { name: 'Settings', href: '/settings', icon: Settings2, id: 'settings' },
];

export function AppShell({ children, currentPage = 'dashboard' }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-border">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold text-accent">TradeSage</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-text-secondary hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "nav-item",
                    currentPage === item.id && "active"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:bg-surface lg:border-r lg:border-border">
        <div className="flex items-center p-6">
          <h1 className="text-2xl font-bold text-accent">TradeSage</h1>
        </div>
        <nav className="px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "nav-item",
                  currentPage === item.id && "active"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-surface px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-text-secondary hover:text-accent"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-accent">TradeSage</h1>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
