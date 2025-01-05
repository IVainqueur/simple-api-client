import { useState, useEffect } from 'react';
import { Request, Session } from '../types';
import {
  saveRequest,
  getRequests,
  deleteRequest,
  saveSession,
  exportSession,
  importSession
} from '../utils/storage';
import exampleData from '../../../assets/example.json';

const createDefaultRequest = (): Request => ({
  id: crypto.randomUUID(),
  name: 'New Request',
  url: '',
  method: 'GET',
  headers: '{\n  "Content-Type": "application/json"\n}',
  body: '{\n\n}',
  preRequestCode: {
    code: '// Modify request options here\nreturn options;',
    enabled: false
  },
  postResponseCode: {
    code: '// Transform response here\nreturn response.data;',
    enabled: false,
    autoExecute: false
  },
  cdns: [],
  createdAt: Date.now()
});

export function useRequestManagement() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);

  useEffect(() => {
    const savedRequests = getRequests();
    setRequests(savedRequests);
    if (savedRequests.length > 0) {
      setActiveRequestId(savedRequests[0].id);
    }
  }, []);

  const handleNewRequest = () => {
    const newRequest = createDefaultRequest();
    saveRequest(newRequest);
    setRequests([...requests, newRequest]);
    setActiveRequestId(newRequest.id);
  };

  const handleDeleteRequest = (id: string) => {
    deleteRequest(id);
    setRequests(requests.filter(r => r.id !== id));
    if (activeRequestId === id) {
      setActiveRequestId(requests[0]?.id ?? null);
    }
  };

  const handleUpdateRequest = (id: string, updates: Partial<Request>) => {
    const request = requests.find(r => r.id === id);
    if (!request) return;

    const updatedRequest = { ...request, ...updates };
    saveRequest(updatedRequest);
    setRequests(requests.map(r => r.id === id ? updatedRequest : r));
  };

  const handleRequestSelect = (request: Request) => {
    setActiveRequestId(request.id);
  };

  const handleSaveSession = () => {
    const session: Session = {
      id: crypto.randomUUID(),
      name: `Session ${new Date().toLocaleString()}`,
      requests,
      codeSnippets: [],
      createdAt: Date.now()
    };
    saveSession(session);
  };

  const handleExportSession = () => {
    const session: Session = {
      id: crypto.randomUUID(),
      name: `Exported Session ${new Date().toLocaleString()}`,
      requests,
      codeSnippets: [],
      createdAt: Date.now()
    };
    
    const blob = new Blob([exportSession(session)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `api-client-session-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSession = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const session = importSession(text);
      setRequests(session.requests);
      if (session.requests.length > 0) {
        setActiveRequestId(session.requests[0].id);
      }
    } catch (err) {
      console.error('Failed to import session:', err);
    }
  };

  const handleTryExample = () => {
    const exampleRequests = exampleData.requests as Request[];
    exampleRequests.forEach(request => {
      saveRequest(request);
    });
    setRequests([...requests, ...exampleRequests]);
    if (!activeRequestId && exampleRequests.length > 0) {
      setActiveRequestId(exampleRequests[0].id);
    }
  };

  return {
    requests,
    activeRequestId,
    handleNewRequest,
    handleDeleteRequest,
    handleUpdateRequest,
    handleRequestSelect,
    handleSaveSession,
    handleImportSession,
    handleExportSession,
    handleTryExample
  };
}