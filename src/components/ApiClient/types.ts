export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiResponse {
  data: any;
  status: number;
  headers: any;
}

export interface CodeSection {
  code: string;
  enabled: boolean;
  autoExecute?: boolean;
}

export interface CodeSnippet {
  id: string;
  name: string;
  code: string;
  type: 'pre-request' | 'post-response';
  createdAt: number;
}

export interface Request {
  id: string;
  name: string;
  url: string;
  method: HttpMethod;
  headers: string;
  body: string;
  preRequestCode: CodeSection;
  postResponseCode: CodeSection;
  cdns: string[];
  createdAt: number;
}

export interface Session {
  id: string;
  name: string;
  requests: Request[];
  codeSnippets: CodeSnippet[];
  createdAt: number;
}