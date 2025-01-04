export function createSandbox(cdns: string[] = []): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('sandbox', 'allow-scripts');
  iframe.style.display = 'none';
  
  const cdnScripts = cdns.map(cdn => `<script src="${cdn}"></script>`).join('\n');
  
  const sandboxContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        ${cdnScripts}
        <style>
          body { margin: 0; font-family: system-ui; }
          pre { white-space: pre-wrap; word-break: break-word; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const logs = [];
          
          // Override console methods
          const originalConsole = { ...console };
          console.log = (...args) => {
            logs.push({ type: 'log', message: args.join(' '), timestamp: Date.now() });
            originalConsole.log(...args);
          };
          console.error = (...args) => {
            logs.push({ type: 'error', message: args.join(' '), timestamp: Date.now() });
            originalConsole.error(...args);
          };
          console.warn = (...args) => {
            logs.push({ type: 'warn', message: args.join(' '), timestamp: Date.now() });
            originalConsole.warn(...args);
          };

          window.addEventListener('message', function(event) {
            try {
              const { code, response } = event.data;
              const root = document.getElementById('root');
              
              // Clear previous content
              root.innerHTML = '';
              logs.length = 0;
              
              // Create a function that has access to DOM methods
              const fn = new Function('response', 'root', \`
                try {
                  \${code}
                  // Return innerHTML if no explicit return
                  return root.innerHTML;
                } catch (error) {
                  console.error(error);
                  throw error;
                }
              \`);
              
              const result = fn(response, root);
              
              window.parent.postMessage({
                type: 'result',
                success: true,
                result: result || root.innerHTML,
                logs
              }, '*');
            } catch (error) {
              window.parent.postMessage({
                type: 'result',
                success: false,
                error: error.message,
                logs
              }, '*');
            }
          });
        </script>
      </body>
    </html>
  `;
  
  iframe.srcdoc = sandboxContent;
  return iframe;
}

export function runInSandbox(code: string, response: any, cdns: string[] = []): Promise<{ result: string; logs: any[] }> {
  return new Promise((resolve, reject) => {
    const iframe = createSandbox(cdns);
    document.body.appendChild(iframe);

    const handleMessage = (event: MessageEvent) => {
      const { type, success, result, error, logs } = event.data;
      if (type === 'result') {
        window.removeEventListener('message', handleMessage);
        document.body.removeChild(iframe);
        
        if (success) {
          resolve({ result, logs });
        } else {
          reject({ error, logs });
        }
      }
    };

    window.addEventListener('message', handleMessage);

    iframe.onload = () => {
      iframe.contentWindow?.postMessage({ code, response }, '*');
    };
  });
}