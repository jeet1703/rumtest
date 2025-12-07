import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './contexts/ThemeContext'
import { LiveModeProvider } from './contexts/LiveModeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LiveModeProvider>
        <App />
      </LiveModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

