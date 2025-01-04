import { Request, CodeSnippet, Session } from '../types';

const REQUESTS_KEY = 'api-client-requests';
const SNIPPETS_KEY = 'api-client-snippets';
const SESSIONS_KEY = 'api-client-sessions';
const THEME_KEY = 'api-client-theme';

// Request Storage
export function saveRequest(request: Request): void {
  const requests = getRequests();
  const index = requests.findIndex(r => r.id === request.id);
  
  if (index >= 0) {
    requests[index] = request;
  } else {
    requests.push(request);
  }
  
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

export function getRequests(): Request[] {
  const stored = localStorage.getItem(REQUESTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function deleteRequest(id: string): void {
  const requests = getRequests().filter(r => r.id !== id);
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

// Code Snippet Storage
export function saveCodeSnippet(snippet: CodeSnippet): void {
  const snippets = getCodeSnippets();
  snippets.push(snippet);
  localStorage.setItem(SNIPPETS_KEY, JSON.stringify(snippets));
}

export function getCodeSnippets(): CodeSnippet[] {
  const stored = localStorage.getItem(SNIPPETS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function deleteCodeSnippet(id: string): void {
  const snippets = getCodeSnippets().filter(s => s.id !== id);
  localStorage.setItem(SNIPPETS_KEY, JSON.stringify(snippets));
}

// Session Storage
export function saveSession(session: Session): void {
  const sessions = getSessions();
  const index = sessions.findIndex(s => s.id === session.id);
  
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function getSessions(): Session[] {
  const stored = localStorage.getItem(SESSIONS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function deleteSession(id: string): void {
  const sessions = getSessions().filter(s => s.id !== id);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function exportSession(session: Session): string {
  return JSON.stringify(session, null, 2);
}

export function importSession(data: string): Session {
  return JSON.parse(data);
}

// Theme Storage
export function saveTheme(isDark: boolean): void {
  localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
}

export function getTheme(): boolean {
  const stored = localStorage.getItem(THEME_KEY);
  return stored ? JSON.parse(stored) : false;
}