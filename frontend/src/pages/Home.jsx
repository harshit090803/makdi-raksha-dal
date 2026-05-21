import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, FileText, Users, Eye, Target } from 'lucide-react';

const Home = () => {
  const [membersCount, setMembersCount] = useState(0);
  const [activeSloganIndex, setActiveSloganIndex] = useState(0);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  const slogans = [
    "na Right, na left, sirf national interest",
    "Facts First. Noise Last.",
    "Discipline Over Chaos.",
    "Criticism Easy Hai. Roadmap Kahan Hai?",
    "Strong Nation. Strong Narrative."
  ];

  // Increment members count occasionally to simulate dynamic registrations
  useEffect(() => {
    const interval = setInterval(() => {
      setMembersCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Slogan rotation
  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setActiveSloganIndex(prev => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(sloganInterval);
  }, []);

  const manifestoPoints = [
    { title: "National Narrative Integrity", desc: "Verifying public statistics and identifying coordinated information manipulation streams using open-source intelligence." },
    { title: "Constructive Criticism Roadmap", desc: "No complaints without proposals. Any criticism published by MRD must present a viable, calculated logistical roadmap." },
    { title: "Anti-Corruption Vigilance", desc: "Direct citizen accountability nodes to report systemic corruption without political interference." },
    { title: "Youth Policy Strategy", desc: "Engaging technical and data-driven young minds in constructive nation-building projects rather than political spam." }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-4 py-16 sm:px-6 lg:px-8 relative text-center">
      
      {/* Hero Section Container */}
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Cinematic Logo Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-36 h-36 md:w-44 md:h-44 mb-8 relative"
        >
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 bg-mrd-red/20 rounded-full blur-xl animate-pulse-glow" />
          
          <img 
            src="/logo.png" 
            alt="Makdi Raksha Dal (MRD) Official Emblem" 
            className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(139,0,0,0.5)]"
            onError={(e) => {
              // Fallback to SVG logo in case file copy hasn't finished
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc143c' stroke-width='1.5'><circle cx='12' cy='12' r='3'/><path d='M12 2v20M2 12h20M5 5l14 14M19 5L5 19'/></svg>";
            }}
          />
        </motion.div>

        {/* Primary Slogan Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4"
        >
          Jaal Bich Chuka Hai.
        </motion.h1>

        {/* Animated Subtitle Slogans */}
        <div className="h-10 mb-10 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeSloganIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-md sm:text-lg font-mono text-mrd-crimson uppercase tracking-[0.2em] font-semibold text-crimson-glow"
            >
              {slogans[activeSloganIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-md mb-16"
        >
          <Link
            to="/join"
            className="w-full sm:w-auto bg-mrd-crimson hover:bg-mrd-brightRed text-white font-mono uppercase tracking-widest text-xs font-bold py-4 px-8 rounded border border-mrd-brightRed/30 shadow-crimson-glow hover:shadow-crimson-glow-strong transition-all flex items-center justify-center space-x-2 group"
          >
            <span>Join Cyber Core</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={() => setIsManifestoOpen(true)}
            className="w-full sm:w-auto bg-[#0c0303]/90 hover:bg-mrd-red/10 text-gray-300 hover:text-white font-mono uppercase tracking-widest text-xs font-bold py-4 px-8 rounded border border-mrd-red/20 transition-all flex items-center justify-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Read Manifesto</span>
          </button>
        </motion.div>

        {/* Live Counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.9 }}
          className="grid grid-cols-2 gap-8 border-t border-mrd-red/15 pt-8 w-full max-w-lg font-mono text-left"
        >
          <div>
            <div className="flex items-center text-gray-500 text-[10px] tracking-wider uppercase mb-1">
              <Users className="w-3.5 h-3.5 text-mrd-crimson mr-1.5" />
              <span>ACTIVE COHORT</span>
            </div>
            <p className="text-2xl font-extrabold text-white text-crimson-glow tracking-wide">
              {membersCount.toLocaleString()}
            </p>
          </div>

          <div>
            <div className="flex items-center text-gray-500 text-[10px] tracking-wider uppercase mb-1">
              <Target className="w-3.5 h-3.5 text-mrd-crimson mr-1.5" />
              <span>VERIFIED SOLUTIONS</span>
            </div>
            <p className="text-2xl font-extrabold text-white tracking-wide">
              0
            </p>
          </div>
        </motion.div>

      </div>

      {/* Manifesto Overlay Modal */}
      <AnimatePresence>
        {isManifestoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-6 select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0c0303] border border-mrd-red/30 rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-crimson-glow-strong text-left relative"
            >
              {/* Decorative subtle grid */}
              <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-center border-b border-mrd-red/20 pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-6 h-6 text-mrd-crimson" />
                    <span className="text-sm font-bold tracking-widest font-mono text-white">MRD MANIFESTO CORE</span>
                  </div>
                  <button 
                    onClick={() => setIsManifestoOpen(false)}
                    className="text-xs font-mono text-gray-500 hover:text-mrd-crimson"
                  >
                    [CLOSE_X]
                  </button>
                </div>

                <h3 className="text-xl font-black uppercase text-white mb-2 tracking-wide font-sans">
                  na Right, na left, sirf national interest
                </h3>
                <p className="text-xs text-gray-400 font-mono mb-6 leading-relaxed">
                  We reject the standard political divide that creates polarization over performance. MRD operates as a coordinated technical and awareness network prioritizing accountability.
                </p>

                <div className="space-y-4">
                  {manifestoPoints.map((pt, i) => (
                    <div key={i} className="border border-mrd-red/10 bg-[#060000]/60 p-4 rounded hover:border-mrd-red/30 transition-all">
                      <h4 className="text-xs font-bold font-mono text-mrd-crimson uppercase tracking-wider mb-1">
                        0{i+1}. {pt.title}
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">{pt.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Link
                    to="/join"
                    onClick={() => setIsManifestoOpen(false)}
                    className="inline-block bg-mrd-crimson text-white text-[10px] font-mono font-bold uppercase tracking-widest px-6 py-2.5 rounded border border-mrd-brightRed/30"
                  >
                    Accept & Register Node
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;
