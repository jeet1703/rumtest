import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { LiveModeProvider } from './contexts/LiveModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LiveModeProvider>
        <App />
      </LiveModeProvider>
    </ThemeProvider>
  </React.StrictMode>
);

