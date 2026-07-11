import React from 'react';
import { Home } from 'lucide-react';

export default function Sidebar({ sidebarOpen }) {
  return (
    <aside className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-slate-950 border-r border-slate-800 transition-all duration-300 z-40 flex flex-col ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'}`}>
      <div className="p-3">
        <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl bg-emerald-600 text-white font-medium">
          <Home size={20} className="shrink-0" />
          <span className={`transition-opacity whitespace-nowrap ${sidebarOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>Dashboard</span>
        </button>
      </div>
    </aside>
  );
}