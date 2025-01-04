import React, { useState } from 'react';
import { Save, Trash2, Clock, Download } from 'lucide-react';
import { Snippet, HttpMethod, CodeSection } from '../types';
import { saveSnippet, getSnippets, deleteSnippet } from '../utils/snippetStorage';

interface SnippetManagerProps {
  onLoad: (snippet: Snippet) => void;
  getCurrentState: () => {
    url: string;
    method: HttpMethod;
    headers: string;
    body: string;
    preRequestCode: CodeSection;
    postResponseCode: CodeSection;
    cdns: string[];
  };
}

export function SnippetManager({ onLoad, getCurrentState }: SnippetManagerProps) {
  const [snippets, setSnippets] = useState<Snippet[]>(() => getSnippets());
  const [newSnippetName, setNewSnippetName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSave = () => {
    if (!newSnippetName.trim()) return;

    const state = getCurrentState();
    const snippet: Snippet = {
      id: crypto.randomUUID(),
      name: newSnippetName,
      ...state,
      createdAt: Date.now()
    };

    saveSnippet(snippet);
    setSnippets(getSnippets());
    setNewSnippetName('');
    setShowSaveDialog(false);
  };

  const handleDelete = (id: string) => {
    deleteSnippet(id);
    setSnippets(getSnippets());
  };

  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b">
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Save size={16} />
          Save Current State
        </button>

        {showSaveDialog && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newSnippetName}
              onChange={(e) => setNewSnippetName(e.target.value)}
              placeholder="Enter snippet name"
              className="flex-1 px-3 py-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSave}
              className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setShowSaveDialog(false)}
              className="px-4 py-1.5 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="divide-y">
        {snippets.map((snippet) => (
          <div key={snippet.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{snippet.name}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onLoad(snippet)}
                  className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Download size={14} />
                  Load
                </button>
                <button
                  onClick={() => handleDelete(snippet.id)}
                  className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{snippet.method} {snippet.url}</span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {new Date(snippet.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {snippets.length === 0 && (
          <div className="p-4 text-sm text-gray-500 text-center">
            No saved snippets yet
          </div>
        )}
      </div>
    </div>
  );
}