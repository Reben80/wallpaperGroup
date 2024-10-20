import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
// Import index.css only if it contains necessary styles
// import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
