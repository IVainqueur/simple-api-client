import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function CollapsibleSection({ title, isOpen, onToggle, children }: CollapsibleSectionProps) {
  return (
    <div className="border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-50"
      >
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span className="font-medium">{title}</span>
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
}