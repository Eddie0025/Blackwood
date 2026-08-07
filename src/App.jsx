import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Careers from './pages/Careers.jsx'
import Systems from './pages/Systems.jsx'
import Research from './pages/Research.jsx'
import About from './pages/About.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Cerebx from './pages/Cerebx.jsx'
import Athena from './pages/Athena.jsx'
import Nexus from './pages/Nexus.jsx'
import Preloader from './components/Preloader.jsx'

function App() {
  const alreadySeen = sessionStorage.getItem('preloaderSeen');
  const [showPreloader, setShowPreloader] = useState(!alreadySeen)

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloaderSeen', 'true');
    setShowPreloader(false);
  }

  return (
    <div className="bg-black min-h-screen">
      {showPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/research" element={<Research />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about" element={<About />} />
        <Route path="/access" element={<Homepage />} />
        <Route path="/cerebx" element={<Cerebx />} />
        <Route path="/athena" element={<Athena />} />
        <Route path="/nexus" element={<Nexus />} />
      </Routes>
      <Footer/>
    </div>
  )
}
export default App
