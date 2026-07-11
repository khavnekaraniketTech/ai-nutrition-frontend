import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function AnalysisBox({ children }) {
  return (
    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl p-4 text-sm flex gap-3">
      <ShieldAlert className="shrink-0 text-emerald-400" size={18} />
      <div><strong>AI Diagnostic:</strong> {children}</div>
    </div>
  );
}