import React from 'react';
import { ApiResponse } from './types';

interface ResponseDisplayProps {
  response: ApiResponse | null;
  processedResponse: any;
  error: string;
}

export function ResponseDisplay({ response, processedResponse, error }: ResponseDisplayProps) {
  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {response && (
        <div>
          <h2 className="font-medium text-gray-700 mb-2">Response</h2>
          <div className="p-4 bg-gray-50 border rounded-lg">
            <div className="text-sm text-gray-500 mb-2">
              Status: {response.status}
            </div>
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {processedResponse && (
        <div>
          <h2 className="font-medium text-gray-700 mb-2">Processed Output</h2>
          <div className="p-4 bg-gray-50 border rounded-lg">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {JSON.stringify(processedResponse, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}