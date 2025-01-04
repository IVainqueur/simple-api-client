import React from 'react';
import { RequestForm } from './RequestForm';
import { Tabs } from './Tabs';
import { CodeEditor } from './CodeEditor';
import { CdnManager } from './CdnManager';
import { SnippetManager } from './SnippetManager';
import { HttpMethod, CodeSection } from '../types';

interface RequestPanelProps {
  url: string;
  method: HttpMethod;
  headers: string;
  body: string;
  cdns: string[];
  preRequestCode: CodeSection;
  postResponseCode: CodeSection;
  isLoading: boolean;
  requestStartTime: number;
  activeTab: string;
  onUrlChange: (url: string) => void;
  onMethodChange: (method: HttpMethod) => void;
  onHeadersChange: (headers: string) => void;
  onBodyChange: (body: string) => void;
  onCdnChange: (cdns: string[]) => void;
  onPreRequestCodeChange: (code: CodeSection) => void;
  onPostResponseCodeChange: (code: CodeSection) => void;
  onTabChange: (tab: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  onLoadSnippet: (snippet: any) => void;
  getCurrentState: () => any;
  onExecutePreRequest?: () => void;
  onExecutePostResponse?: () => void;
}

const tabs = [
  { id: 'headers', label: 'Headers' },
  { id: 'body', label: 'Body' },
  { id: 'pre-request', label: 'Pre-request' },
  { id: 'post-response', label: 'Post-response' },
  { id: 'cdns', label: 'CDNs' },
  { id: 'snippets', label: 'Snippets' },
];

export function RequestPanel(props: RequestPanelProps) {
  const renderTabContent = () => {
    switch (props.activeTab) {
      case 'headers':
        return (
          <CodeEditor
            label="Request Headers"
            value={{ code: props.headers, enabled: true }}
            onChange={(v) => props.onHeadersChange(v.code)}
          />
        );
      case 'body':
        return props.method !== 'GET' ? (
          <CodeEditor
            label="Request Body"
            value={{ code: props.body, enabled: true }}
            onChange={(v) => props.onBodyChange(v.code)}
          />
        ) : (
          <div className="p-4 text-sm text-gray-500 text-center">
            Body not available for GET requests
          </div>
        );
      case 'pre-request':
        return (
          <CodeEditor
            label="Pre-request Code"
            value={props.preRequestCode}
            onChange={props.onPreRequestCodeChange}
            onExecute={props.onExecutePreRequest}
            canExecute={props.preRequestCode.enabled}
          />
        );
      case 'post-response':
        return (
          <CodeEditor
            label="Post-response Code"
            value={props.postResponseCode}
            onChange={props.onPostResponseCodeChange}
            onExecute={props.onExecutePostResponse}
            canExecute={props.postResponseCode.enabled}
          />
        );
      case 'cdns':
        return (
          <CdnManager
            cdns={props.cdns}
            onCdnChange={props.onCdnChange}
          />
        );
      case 'snippets':
        return (
          <SnippetManager
            getCurrentState={props.getCurrentState}
            onLoad={props.onLoadSnippet}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <RequestForm
        url={props.url}
        method={props.method}
        onUrlChange={props.onUrlChange}
        onMethodChange={props.onMethodChange}
        onSubmit={props.onSubmit}
        onClear={props.onClear}
        isLoading={props.isLoading}
        requestStartTime={props.requestStartTime}
      />

      <div className="mt-6 flex-1 flex flex-col">
        <Tabs
          tabs={tabs}
          activeTab={props.activeTab}
          onTabChange={props.onTabChange}
        />
        <div className="mt-4 flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}