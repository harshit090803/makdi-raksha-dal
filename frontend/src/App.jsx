import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveTicker from './components/LiveTicker';
import CursorWeb from './components/CursorWeb';
import SpiderWebBg from './components/SpiderWebBg';
import AnimatedSpider from './components/AnimatedSpider';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Eligibility from './pages/Eligibility';
import Join from './pages/Join';
import Media from './pages/Media';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <AuthProvider>
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <Router>
          <div className="relative min-h-screen bg-mrd-black text-gray-200 flex flex-col justify-between overflow-x-hidden selection:bg-mrd-crimson selection:text-white">
            
            {/* Interactive Visual Overlay Layers */}
            <CursorWeb />
            <SpiderWebBg />
            <AnimatedSpider />
            
            <div>
              {/* Live Ticker Slogans Top */}
              <LiveTicker />
              
              {/* Responsive Header Navigation */}
              <Navbar />
              
              {/* Core Page Router Content */}
              <main className="relative z-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/eligibility" element={<Eligibility />} />
                  <Route path="/join" element={<Join />} />
                  <Route path="/media" element={<Media />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </main>
            </div>

            {/* Platform Footer */}
            <Footer />
          </div>
        </Router>
      )}
    </AuthProvider>
  );
}

export default App;
