
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("React Initializing...");

const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Critical: Could not find element with id 'root'");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React successfully rendered to DOM");
  } catch (error) {
    console.error("React Startup Failed:", error);
    const display = document.getElementById('error-display');
    if (display) {
      display.style.display = 'block';
      display.innerHTML = `<h1>Initialization Failed</h1><pre>${error instanceof Error ? error.stack : String(error)}</pre>`;
    }
  }
};

// Start when window is ready
if (document.readyState === 'complete') {
  startApp();
} else {
  window.addEventListener('load', startApp);
}
