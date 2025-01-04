import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface CdnManagerProps {
  cdns: string[];
  onCdnChange: (cdns: string[]) => void;
}

export function CdnManager({ cdns, onCdnChange }: CdnManagerProps) {
  const [newCdn, setNewCdn] = useState('');

  const handleAdd = () => {
    if (newCdn && !cdns.includes(newCdn)) {
      onCdnChange([...cdns, newCdn]);
      setNewCdn('');
    }
  };

  const handleRemove = (cdn: string) => {
    onCdnChange(cdns.filter(c => c !== cdn));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={newCdn}
          onChange={(e) => setNewCdn(e.target.value)}
          placeholder="Enter CDN URL"
          className="flex-1 px-3 py-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="space-y-2">
        {cdns.map((cdn, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <button
              onClick={() => handleRemove(cdn)}
              className="p-1 text-gray-500 hover:text-red-500"
            >
              <X size={14} />
            </button>
            <span className="font-mono truncate">{cdn}</span>
          </div>
        ))}
      </div>
    </div>
  );
}