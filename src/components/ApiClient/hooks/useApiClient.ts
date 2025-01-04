import { useState } from 'react';
import axios from 'axios';
import { Request, ApiResponse } from '../types';
import { runInSandbox } from '../utils/sandbox';

export function useApiClient(activeRequest: Request | undefined) {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestStartTime, setRequestStartTime] = useState(0);
  const [processedOutput, setProcessedOutput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<Array<{ type: 'log' | 'error' | 'warn'; message: string; timestamp: number }>>([]);

  const executePreRequestCode = async () => {
    if (!activeRequest?.preRequestCode.enabled) return;

    try {
      const options = {
        method: activeRequest.method.toLowerCase(),
        headers: JSON.parse(activeRequest.headers),
        data: activeRequest.method !== 'GET' ? JSON.parse(activeRequest.body) : undefined
      };

      const { result: modifiedOptions, logs } = await runInSandbox(
        activeRequest.preRequestCode.code,
        { options },
        activeRequest.cdns
      );
      
      setConsoleLogs(logs);
      setError('');
      
      return modifiedOptions;
    } catch (error: any) {
      setError(`Pre-request code error: ${error.message}`);
      setConsoleLogs(error.logs || []);
      throw error;
    }
  };

  const executePostResponseCode = async () => {
    if (!response || !activeRequest?.postResponseCode.enabled) return;
    
    try {
      const { result, logs } = await runInSandbox(
        activeRequest.postResponseCode.code,
        response,
        activeRequest.cdns
      );
      setProcessedOutput(result);
      setConsoleLogs(logs);
      setError('');
    } catch (err: any) {
      setError(`Post-response code error: ${err.message}`);
      setConsoleLogs(err.logs || []);
    }
  };

  const handleRequest = async () => {
    if (!activeRequest) return;

    try {
      setIsLoading(true);
      setRequestStartTime(Date.now());
      setError('');
      setProcessedOutput('');
      setConsoleLogs([]);
      
      let options = {
        method: activeRequest.method.toLowerCase(),
        headers: JSON.parse(activeRequest.headers),
        data: activeRequest.method !== 'GET' ? JSON.parse(activeRequest.body) : undefined
      };

      if (activeRequest.preRequestCode.enabled) {
        try {
          options = await executePreRequestCode() || options;
        } catch (error) {
          return;
        }
      }

      const res = await axios({ url: activeRequest.url, ...options });
      const apiResponse = {
        data: res.data,
        status: res.status,
        headers: res.headers
      };
      
      setResponse(apiResponse);

      if (activeRequest.postResponseCode.enabled) {
        await executePostResponseCode();
      }
    } catch (err: any) {
      setError(`Request failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setResponse(null);
    setProcessedOutput('');
    setError('');
    setConsoleLogs([]);
  };

  return {
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
  };
}