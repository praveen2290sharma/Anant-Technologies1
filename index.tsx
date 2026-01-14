import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("App booting up...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical: Root element not found");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React Rendered Successfully");
  } catch (error) {
    console.error("React Mounting Error:", error);
    const display = document.getElementById('error-display');
    if (display) {
      display.style.display = 'block';
      display.innerHTML = `<h1>Startup Error</h1><pre>${error instanceof Error ? error.stack : String(error)}</pre>`;
    }
  }
}