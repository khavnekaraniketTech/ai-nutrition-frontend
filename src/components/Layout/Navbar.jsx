import React from 'react';
import { Menu, Activity } from 'lucide-react';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-950 border-b border-slate-800 h-16 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 text-emerald-400 font-black text-xl tracking-tight">
          <Activity className="animate-pulse" />
          <span>NUTRI<span className="text-white font-medium text-lg">AI</span></span>
        </div>
      </div>
      <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center font-bold text-emerald-400">
        AI
      </div>
    </nav>
  );
}