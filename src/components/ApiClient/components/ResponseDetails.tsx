import React from 'react';
import { ChevronDown, ChevronRight, Clock } from 'lucide-react';
import { ApiResponse } from '../types';

interface ResponseDetailsProps {
  response: ApiResponse;
  duration: number;
}

export function ResponseDetails({ response, duration }: ResponseDetailsProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="border dark:border-gray-700 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50"
      >
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span className="font-medium">Response Details</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{(duration / 1000).toFixed(2)}s</span>
          </div>
          <span>Status: {response.status}</span>
        </div>
      </button>
      
      {isOpen && (
        <div className="border-t dark:border-gray-700 p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Headers</h3>
            <pre className="whitespace-pre-wrap break-words bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border dark:border-gray-700 font-mono text-sm dark:text-gray-300">
              {JSON.stringify(response.headers, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Body</h3>
            <pre className="whitespace-pre-wrap break-words bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border dark:border-gray-700 font-mono text-sm dark:text-gray-300">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}