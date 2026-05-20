import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [showEmblem, setShowEmblem] = useState(false);

  const bootLogs = [
    { text: 'SYSTEM REBOOT INITIALIZED...', delay: 100 },
    { text: 'ESTABLISHING SECURE PROTOCOLS ON HOST C-PORT...', delay: 300 },
    { text: 'DECRYPTING MAKDI RAKSHA DAL ENCRYPTED NODE...', delay: 600 },
    { text: 'BYPASSING INDEPENDENT POLITICAL AGENDAS: [SUCCESS]', delay: 900 },
    { text: 'LOADING ROADMAP: "na Right, na left, sirf national interest"...', delay: 1200 },
    { text: 'VERIFYING SYSTEM ROADMAP AND DISCIPLINE MATRIX...', delay: 1500 },
    { text: 'LAUNCHING CONSOLE HUB...', delay: 1800 }
  ];

  useEffect(() => {
    let timers = [];
    
    // Print logs sequentially
    bootLogs.forEach((log, index) => {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, log.text]);
        if (index === bootLogs.length - 1) {
          // Reveal logo after logs complete
          setTimeout(() => {
            setShowEmblem(true);
            // End loading screen after 1.5 seconds of emblem show
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 1800);
          }, 400);
        }
      }, log.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#060000] z-50 flex flex-col items-center justify-center p-6 font-mono select-none crt-overlay overflow-hidden">
      <div className="w-full max-w-2xl h-[420px] bg-[#0c0303] border border-mrd-red/30 rounded p-6 flex flex-col justify-between shadow-crimson-glow relative">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-mrd-red/20 pb-2 mb-4 text-xs text-mrd-crimson">
          <span>MRD SECURITY SEC-SHELL V1.0.9</span>
          <div className="flex space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-mrd-red animate-pulse"></span>
            <span>SYSTEM ENCRYPTED</span>
          </div>
        </div>

        {/* Console Log Output */}
        <div className="flex-1 overflow-y-auto space-y-2 text-sm text-gray-300 scrollbar-none">
          <AnimatePresence>
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-start"
              >
                <span className="text-mrd-crimson mr-2">&gt;</span>
                <span>{log}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="w-2 h-4 bg-mrd-brightRed inline-block animate-pulse ml-4"></div>
        </div>

        {/* Emblem Fade-in */}
        <AnimatePresence>
          {showEmblem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0303]/95 rounded"
            >
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute w-72 h-72 border border-mrd-red/10 rounded-full border-dashed"
              />
              <span className="text-3xl font-extrabold text-white tracking-[0.25em] z-10 text-crimson-glow mb-2">MRD CORE</span>
              <span className="text-xs text-mrd-crimson tracking-[0.4em] z-10 uppercase">Jaal Bich Chuka Hai</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info */}
        <div className="border-t border-mrd-red/10 pt-2 text-[10px] text-gray-600 flex justify-between uppercase">
          <span>PORT: 5173 / SECURE</span>
          <span>© MRD COMMAND 2026</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
