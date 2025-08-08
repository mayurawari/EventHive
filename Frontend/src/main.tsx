// [FE/frontend.md > App Entry]: Main entry point for EventHive web app
// [FE/designing.md > Colors]: UI foundation uses design system
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
