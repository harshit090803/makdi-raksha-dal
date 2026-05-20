import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedSpider = () => {
  const [isCrawling, setIsCrawling] = useState(false);

  useEffect(() => {
    // Crawl once every 40 seconds
    const crawlInterval = setInterval(() => {
      setIsCrawling(true);
      // Turn off after animation duration
      setTimeout(() => {
        setIsCrawling(false);
      }, 7000); 
    }, 35000);

    // Initial crawl delay
    const initialDelay = setTimeout(() => {
      setIsCrawling(true);
      setTimeout(() => setIsCrawling(false), 7000);
    }, 10000);

    return () => {
      clearInterval(crawlInterval);
      clearTimeout(initialDelay);
    };
  }, []);

  if (!isCrawling) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-45 overflow-hidden select-none">
      {/* Crawling from bottom to top along the right edge of screen */}
      <motion.div
        initial={{ y: '100vh', x: 'calc(100vw - 12px)' }}
        animate={{ y: '-10vh' }}
        transition={{ duration: 7, ease: 'easeInOut' }}
        className="w-4 h-4 text-mrd-crimson"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-full h-full transform -rotate-90 opacity-40"
        >
          {/* Spider Body */}
          <circle cx="12" cy="10" r="2.5" fill="currentColor" />
          <circle cx="12" cy="15" r="4" fill="currentColor" />
          {/* Head */}
          <circle cx="12" cy="6" r="1.5" />
          {/* Left Legs */}
          <path d="M10,12 C7,11 6,8 5,6" />
          <path d="M9.5,14 C6.5,14 5.5,11 4.5,9" />
          <path d="M9.5,16 C6.5,17 5.5,15 4.5,13" />
          <path d="M10,18 C7,20 6,19 5,17" />
          {/* Right Legs */}
          <path d="M14,12 C17,11 18,8 19,6" />
          <path d="M14.5,14 C17.5,14 18.5,11 19.5,9" />
          <path d="M14.5,16 C17.5,17 18.5,15 19.5,13" />
          <path d="M14,18 C17,20 18,19 19,17" />
        </svg>
      </motion.div>
    </div>
  );
};

export default AnimatedSpider;
