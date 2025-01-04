import React from 'react';
import { FileText, Code } from 'lucide-react';
import { HttpMethod } from './types';

interface RequestDetailsProps {
  method: HttpMethod;
  headers: string;
  body: string;
  code: string;
  onHeadersChange: (headers: string) => void;
  onBodyChange: (body: string) => void;
  onCodeChange: (code: string) => void;
}

export function RequestDetails({
  method,
  headers,
  body,
  code,
  onHeadersChange,
  onBodyChange,
  onCodeChange,
}: RequestDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2 text-gray-700">
          <FileText size={18} />
          <h2 className="font-medium">Headers</h2>
        </div>
        <textarea
          value={headers}
          onChange={(e) => onHeadersChange(e.target.value)}
          className="w-full h-32 px-4 py-2 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {method !== 'GET' && (
        <div>
          <div className="flex items-center gap-2 mb-2 text-gray-700">
            <FileText size={18} />
            <h2 className="font-medium">Request Body</h2>
          </div>
          <textarea
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
            className="w-full h-48 px-4 py-2 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-2 text-gray-700">
          <Code size={18} />
          <h2 className="font-medium">Transform Code</h2>
        </div>
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          className="w-full h-32 px-4 py-2 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}