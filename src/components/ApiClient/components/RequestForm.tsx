import React from 'react';
import { Send, Trash2 } from 'lucide-react';
import { HttpMethod } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { Timer } from './Timer';

interface RequestFormProps {
  url: string;
  method: HttpMethod;
  onUrlChange: (url: string) => void;
  onMethodChange: (method: HttpMethod) => void;
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
  requestStartTime: number;
}

export function RequestForm({
  url,
  method,
  onUrlChange,
  onMethodChange,
  onSubmit,
  onClear,
  isLoading,
  requestStartTime
}: RequestFormProps) {
  return (
    <div className="flex gap-4 mb-4 items-center">
      <input
        type="text"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="Enter API URL"
        className="flex-1 px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled={isLoading}
      />
      <select
        value={method}
        onChange={(e) => onMethodChange(e.target.value as HttpMethod)}
        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled={isLoading}
      >
        {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <LoadingSpinner /> : <Send size={18} />}
        Send
      </button>
      <button
        onClick={onClear}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 size={18} />
        Clear
      </button>
      {isLoading && requestStartTime > 0 && (
        <Timer startTime={requestStartTime} />
      )}
    </div>
  );
}