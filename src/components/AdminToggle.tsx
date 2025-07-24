import React from 'react';
import { Settings } from 'lucide-react';

interface AdminToggleProps {
  onToggle: () => void;
}

export function AdminToggle({ onToggle }: AdminToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 p-3 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-600 text-slate-300 hover:text-slate-100 transition-all duration-200 hover:scale-110 z-50 group"
      aria-label="Toggle Admin Dashboard"
    >
      <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
    </button>
  );
}