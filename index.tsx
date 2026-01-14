import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Failed to find the root element");
}

try {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("React Application Started");
} catch (error) {
  console.error("Startup Error:", error);
  const display = document.getElementById('error-display');
  if (display) {
    display.style.display = 'block';
    display.innerHTML = `<h1>Application Failed to Start</h1><pre>${error instanceof Error ? error.message : String(error)}</pre>`;
  }
}