import { Snippet } from '../types';

const STORAGE_KEY = 'api-client-snippets';

export function saveSnippet(snippet: Snippet): void {
  const snippets = getSnippets();
  snippets.push(snippet);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

export function getSnippets(): Snippet[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function deleteSnippet(id: string): void {
  const snippets = getSnippets();
  const filtered = snippets.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function loadSnippet(id: string): Snippet | null {
  const snippets = getSnippets();
  return snippets.find(s => s.id === id) || null;
}