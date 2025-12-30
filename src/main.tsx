import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import 'aos/dist/aos.css'
import 'glightbox/dist/css/glightbox.min.css'
import 'jarallax/dist/jarallax.min.css'
import 'swiper/swiper-bundle.css'

import '@/assets/scss/theme.scss'

// Register service worker for Firebase messaging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered successfully:', registration)
    })
    .catch((error) => {
      console.log('Service Worker registration failed:', error)
    })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
