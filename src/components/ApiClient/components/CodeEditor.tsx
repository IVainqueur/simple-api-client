import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { Play, Code } from 'lucide-react';
import { CodeSection } from '../types';
import { formatCode } from '../utils/codeFormatter';

interface CodeEditorProps {
  label: string;
  value: CodeSection;
  onChange: (value: CodeSection) => void;
  onExecute?: () => void;
  canExecute?: boolean;
  onSaveSnippet?: () => void;
}

export function CodeEditor({ 
  label, 
  value, 
  onChange, 
  onExecute,
  canExecute = false,
  onSaveSnippet
}: CodeEditorProps) {
  const handleFormat = () => {
    try {
      const formatted = formatCode(value.code);
      onChange({ ...value, code: formatted });
    } catch (error) {
      console.error('Failed to format code:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-4">
          <button
            onClick={handleFormat}
            className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Code size={14} />
            Format
          </button>
          {onSaveSnippet && (
            <button
              onClick={onSaveSnippet}
              className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Save as Snippet
            </button>
          )}
          {onExecute && (
            <button
              onClick={onExecute}
              disabled={!canExecute}
              className={`flex items-center gap-1 px-2 py-1 text-sm ${
                canExecute 
                  ? 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <Play size={14} />
              Run
            </button>
          )}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={value.enabled}
              onChange={(e) => onChange({ ...value, enabled: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Enable</span>
          </label>
        </div>
      </div>
      <div className="flex-1 border rounded-lg overflow-hidden dark:border-gray-700">
        <CodeMirror
          value={value.code}
          height="100%"
          theme={oneDark}
          extensions={[javascript({ jsx: true })]}
          onChange={(code) => onChange({ ...value, code })}
          className="text-sm h-full"
        />
      </div>
    </div>
  );
}