import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop/>
      <App/>
      <Toaster/>
  </BrowserRouter>

)