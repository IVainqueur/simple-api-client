import React from 'react';
import { Request } from '../types';
import { ResizablePanel } from './ResizablePanel';
import { RequestSidebar } from './RequestSidebar';

interface LayoutProps {
  isDark: boolean;
  onThemeToggle: () => void;
  requests: Request[];
  activeRequestId: string | null;
  onRequestSelect: (request: Request) => void;
  onNewRequest: () => void;
  onDeleteRequest: (id: string) => void;
  onSaveSession: () => void;
  onImportSession: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportSession: () => void;
  children: React.ReactNode;
}

export function Layout({
  isDark,
  onThemeToggle,
  requests,
  activeRequestId,
  onRequestSelect,
  onNewRequest,
  onDeleteRequest,
  onSaveSession,
  onImportSession,
  onExportSession,
  children
}: LayoutProps) {
  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="flex h-full">
          <ResizablePanel
            defaultWidth={250}
            minWidth={200}
            maxWidth={400}
            position="left"
            name="Sidebar"
          >
            <RequestSidebar
              isDark={isDark}
              onThemeToggle={onThemeToggle}
              requests={requests}
              activeRequestId={activeRequestId}
              onRequestSelect={onRequestSelect}
              onNewRequest={onNewRequest}
              onDeleteRequest={onDeleteRequest}
              onSaveSession={onSaveSession}
              onImportSession={onImportSession}
              onExportSession={onExportSession}
            />
          </ResizablePanel>
          
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-6 overflow-hidden">
              <div className="flex gap-3 h-full">
                <ResizablePanel
                  defaultWidth={500}
                  minWidth={300}
                  maxWidth={800}
                  position="left"
                  name="Request"
                  fillSpace
                >
                  <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 overflow-auto">
                    {Array.isArray(children) ? children[0] : null}
                  </div>
                </ResizablePanel>
                
                <ResizablePanel
                  defaultWidth={500}
                  minWidth={300}
                  maxWidth={800}
                  position="right"
                  name="Response"
                  fillSpace
                >
                  <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 overflow-auto">
                    {Array.isArray(children) ? children[1] : null}
                  </div>
                </ResizablePanel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}