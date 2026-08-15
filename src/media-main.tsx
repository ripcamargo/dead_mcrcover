import React from 'react'
import ReactDOM from 'react-dom/client'
import { Media } from './sections/Media'
import { Navbar } from './components/Navbar'
import { FloatingGlow } from './components/FloatingGlow'
import { Footer } from './sections/Footer'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="app-shell">
      <FloatingGlow />
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div style={{ padding: '6rem 2rem 4rem' }}>
          <Media />
        </div>
      </main>
      <Footer />
    </div>
  </React.StrictMode>,
)
