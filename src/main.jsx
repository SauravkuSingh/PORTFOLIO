import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Background from '@/components/background/Background'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <StrictMode>
    <Background/>
    <App />
  </StrictMode>
  </BrowserRouter>,
)
