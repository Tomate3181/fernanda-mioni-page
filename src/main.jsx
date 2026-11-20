import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initStoredConsent } from './lib/consent'

// Dispara scripts de terceiros apenas se a visitante já consentiu anteriormente (LGPD)
initStoredConsent()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
