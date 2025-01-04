import React from 'react';
import { ResponseDetails } from './ResponseDetails';
import { ConsoleOutput } from './ConsoleOutput';
import { ApiResponse } from '../types';

interface ResponsePanelProps {
  response: ApiResponse | null;
  error: string;
  processedOutput: string;
  consoleLogs: Array<{ type: 'log' | 'error' | 'warn'; message: string; timestamp: number }>;
  requestStartTime: number;
}

export function ResponsePanel({ 
  response, 
  error, 
  processedOutput, 
  consoleLogs,
  requestStartTime 
}: ResponsePanelProps) {
  if (!error && !response && !processedOutput && consoleLogs.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        Send a request to see the response
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {response && (
        <ResponseDetails
          response={response}
          duration={Date.now() - requestStartTime}
        />
      )}

      {processedOutput && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Processed Output
          </h3>
          <div
            className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            dangerouslySetInnerHTML={{ __html: processedOutput }}
          />
        </div>
      )}

      <ConsoleOutput logs={consoleLogs} />
    </div>
  );
}