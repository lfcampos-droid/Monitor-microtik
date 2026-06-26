import React from 'react';
import { Activity, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="glass-panel sticky top-4 z-50 flex items-center justify-between px-6 py-4 mx-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[var(--accent-primary)] rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.5)]">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)]">REN Monitor</h1>
          <p className="text-xs text-[var(--foreground)] opacity-70">NOC Operations Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Real-time indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-400">En Vivo</span>
        </div>

        {/* User Menu */}
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)]">
          <User className="w-5 h-5 text-[var(--foreground)]" />
        </button>
      </div>
    </header>
  );
}
