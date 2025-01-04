import React from 'react';
import { Send } from 'lucide-react';
import { HttpMethod } from './types';

interface RequestFormProps {
  url: string;
  method: HttpMethod;
  onUrlChange: (url: string) => void;
  onMethodChange: (method: HttpMethod) => void;
  onSubmit: () => void;
}

export function RequestForm({ url, method, onUrlChange, onMethodChange, onSubmit }: RequestFormProps) {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="Enter API URL"
        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <select
        value={method}
        onChange={(e) => onMethodChange(e.target.value as HttpMethod)}
        className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <button
        onClick={onSubmit}
        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Send size={18} />
        Send
      </button>
    </div>
  );
}