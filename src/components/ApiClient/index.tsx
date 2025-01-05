import { useState } from 'react';
import { Layout } from './components/Layout';
import { RequestPanel } from './components/RequestPanel';
import { ResponsePanel } from './components/ResponsePanel';
import { useApiClient } from './hooks/useApiClient';
import { useRequestManagement } from './hooks/useRequestManagement';
import { useTheme } from './hooks/useTheme';

export default function ApiClient() {
  const [activeTab, setActiveTab] = useState('headers');
  const { isDark, toggleTheme } = useTheme();
  
  const {
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
  } = useRequestManagement();

  const {
    response,
    error,
    isLoading,
    requestStartTime,
    processedOutput,
    consoleLogs,
    handleRequest,
    handleClear,
    executePreRequestCode,
    executePostResponseCode
  } = useApiClient(requests.find(r => r.id === activeRequestId));

  if (!requests.length) {
    return (
      <Layout
        isDark={isDark}
        onThemeToggle={toggleTheme}
        requests={requests}
        activeRequestId={activeRequestId}
        onRequestSelect={handleRequestSelect}
        onNewRequest={handleNewRequest}
        onDeleteRequest={handleDeleteRequest}
        onSaveSession={handleSaveSession}
        onImportSession={handleImportSession}
        onExportSession={handleExportSession}
        onUpdateRequest={handleUpdateRequest}
        onTryExample={handleTryExample}
      >
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          Create a new request to get started
        </div>
      </Layout>
    );
  }

  const activeRequest = requests.find(r => r.id === activeRequestId);
  if (!activeRequest) return null;

  return (
    <Layout
      isDark={isDark}
      onThemeToggle={toggleTheme}
      requests={requests}
      activeRequestId={activeRequestId}
      onRequestSelect={handleRequestSelect}
      onNewRequest={handleNewRequest}
      onDeleteRequest={handleDeleteRequest}
      onSaveSession={handleSaveSession}
      onImportSession={handleImportSession}
      onExportSession={handleExportSession}
      onUpdateRequest={handleUpdateRequest}
      onTryExample={handleTryExample}
    >
      <RequestPanel
        url={activeRequest.url}
        method={activeRequest.method}
        headers={activeRequest.headers}
        body={activeRequest.body}
        cdns={activeRequest.cdns}
        preRequestCode={activeRequest.preRequestCode}
        postResponseCode={activeRequest.postResponseCode}
        isLoading={isLoading}
        requestStartTime={requestStartTime}
        activeTab={activeTab}
        onUrlChange={(url) => handleUpdateRequest(activeRequest.id, { url })}
        onMethodChange={(method) => handleUpdateRequest(activeRequest.id, { method })}
        onHeadersChange={(headers) => handleUpdateRequest(activeRequest.id, { headers })}
        onBodyChange={(body) => handleUpdateRequest(activeRequest.id, { body })}
        onCdnChange={(cdns) => handleUpdateRequest(activeRequest.id, { cdns })}
        onPreRequestCodeChange={(code) => handleUpdateRequest(activeRequest.id, { preRequestCode: code })}
        onPostResponseCodeChange={(code) => handleUpdateRequest(activeRequest.id, { postResponseCode: code })}
        onTabChange={setActiveTab}
        onSubmit={handleRequest}
        onClear={handleClear}
        onExecutePreRequest={executePreRequestCode}
        onExecutePostResponse={executePostResponseCode}
        onLoadSnippet={(snippet) => {
          handleUpdateRequest(activeRequest.id, snippet);
        }}
        getCurrentState={() => activeRequest}
      />
      <ResponsePanel
        response={response}
        error={error}
        processedOutput={processedOutput}
        consoleLogs={consoleLogs}
        requestStartTime={requestStartTime}
      />
    </Layout>
  );
}