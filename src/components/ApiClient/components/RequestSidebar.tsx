import React, { useState } from "react";
import {
  Plus,
  Folder,
  Save,
  Upload,
  Download,
  Edit2,
  Trash2,
  Sparkles
} from "lucide-react";
import { Request } from "../types";
import { RequestNameEdit } from "./RequestNameEdit";
import { ThemeToggle } from "./ThemeToggle";

interface RequestSidebarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  requests: Request[];
  activeRequestId: string | null;
  onRequestSelect: (request: Request) => void;
  onNewRequest: () => void;
  onDeleteRequest: (id: string) => void;
  onUpdateRequest: (id: string, updates: Partial<Request>) => void;
  onSaveSession: () => void;
  onImportSession: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportSession: () => void;
  onTryExample: () => void;
}

export function RequestSidebar({
  isDark,
  onThemeToggle,
  requests,
  activeRequestId,
  onRequestSelect,
  onNewRequest,
  onDeleteRequest,
  onUpdateRequest,
  onSaveSession,
  onImportSession,
  onExportSession,
  onTryExample,
}: RequestSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-800">
      <div className="p-4 border-b dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Requests
          </h2>
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
        </div>
        <button
          onClick={onNewRequest}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} />
          New Request
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {requests.map((request) => (
          <div
            key={request.id}
            className={`border-b dark:border-gray-800 ${
              request.id === activeRequestId
                ? "bg-blue-50 dark:bg-gray-800"
                : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
            onClick={() => onRequestSelect(request)}
          >
            <div className="p-3 cursor-pointer">
              <div className="flex items-center justify-between group">
                {editingId === request.id ? (
                  <RequestNameEdit
                    name={request.name}
                    onSave={(name) => {
                      onUpdateRequest(request.id, { name });
                      setEditingId(null);
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Folder size={16} />
                      <span className="truncate">{request.name}</span>
                    </div>
                    <div className="hidden group-hover:flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(request.id);
                        }}
                        className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteRequest(request.id);
                        }}
                        className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                {request.method} {request.url || "No URL"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t dark:border-gray-800 space-y-2">
        <button
          onClick={onSaveSession}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Save size={14} />
          Save Session
        </button>
        <button
          onClick={onTryExample}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Sparkles size={14} />
          Try Example
        </button>
        <div className="flex gap-2">
          <label className="flex-1">
            <input
              type="file"
              onChange={onImportSession}
              accept=".json"
              className="hidden"
            />
            <div className="flex items-center justify-center gap-2 px-4 py-2 text-sm border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <Upload size={14} />
              Import
            </div>
          </label>
          <button
            onClick={onExportSession}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>
      {/* Creator tag */}
      <div className="p-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        Created with ❤️ by{" "}
        <a
          href="https://github.com/IVainqueur"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          IVainqueur
        </a>
      </div>
    </div>
  );
}
