import React from 'react';
import { Terminal } from 'lucide-react';

interface ConsoleOutputProps {
  logs: Array<{
    type: 'log' | 'error' | 'warn';
    message: string;
    timestamp: number;
  }>;
}

export function ConsoleOutput({ logs }: ConsoleOutputProps) {
  if (logs.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Terminal size={16} className="text-gray-600" />
        <h3 className="text-sm font-medium text-gray-700">Console Output</h3>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-auto max-h-[200px]">
        {logs.map((log, index) => (
          <div
            key={`${log.timestamp}-${index}`}
            className={`whitespace-pre-wrap ${
              log.type === 'error'
                ? 'text-red-400'
                : log.type === 'warn'
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          >
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}