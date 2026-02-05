import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Background from '@/components/background/Background'
import Cursor from '@/components/background/Cursor'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Background/>
    <Cursor/>
    <App />
  </StrictMode>,
)
