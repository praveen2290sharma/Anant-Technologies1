import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("React initialization sequence started...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  const errDiv = document.getElementById('error-display');
  if (errDiv) {
    errDiv.style.display = 'block';
    errDiv.innerHTML = '<h1>Critical: Root element #root missing in index.html</h1>';
  }
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Anant Technologies Platform Loaded Successfully.");
  } catch (error) {
    console.error("Mounting Failure:", error);
    const display = document.getElementById('error-display');
    if (display) {
      display.style.display = 'block';
      display.innerHTML = `<h1>Application Boot Error</h1><pre>${error instanceof Error ? error.message : String(error)}</pre>`;
    }
  }
}