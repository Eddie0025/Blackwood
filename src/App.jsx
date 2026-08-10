import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import AccessModal from './components/AccessModal.jsx'

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminAccessRequests from './pages/admin/AdminAccessRequests.jsx'
import AdminJobs from './pages/admin/AdminJobs.jsx'
import AdminArticles from './pages/admin/AdminArticles.jsx'

function App() {
  const alreadySeen = sessionStorage.getItem('preloaderSeen');
  const [showPreloader, setShowPreloader] = useState(!alreadySeen)
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false)
  const location = useLocation();

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloaderSeen', 'true');
    setShowPreloader(false);
  }

  const openAccessModal = () => setIsAccessModalOpen(true);
  const closeAccessModal = () => setIsAccessModalOpen(false);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="bg-black min-h-screen">
      {showPreloader && !isAdminRoute && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      {!isAdminRoute && <AccessModal isOpen={isAccessModalOpen} onClose={closeAccessModal} />}
      {!isAdminRoute && <Header onRequestAccess={openAccessModal} />}
      <Routes>
        <Route path="/" element={<Homepage onRequestAccess={openAccessModal} />} />
        <Route path="/systems" element={<Systems onRequestAccess={openAccessModal} />} />
        <Route path="/research" element={<Research onRequestAccess={openAccessModal} />} />
        <Route path="/careers" element={<Careers onRequestAccess={openAccessModal} />} />
        <Route path="/about" element={<About onRequestAccess={openAccessModal} />} />
        <Route path="/cerebx" element={<Cerebx onRequestAccess={openAccessModal} />} />
        <Route path="/athena" element={<Athena onRequestAccess={openAccessModal} />} />
        <Route path="/nexus" element={<Nexus onRequestAccess={openAccessModal} />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="requests" element={<AdminAccessRequests />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="articles" element={<AdminArticles />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer onRequestAccess={openAccessModal} />}
    </div>
  )
}
export default App
