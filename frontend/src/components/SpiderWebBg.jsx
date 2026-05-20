import React from 'react';

const SpiderWebBg = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-20">
      {/* Top Left Floating Web SVG */}
      <svg
        className="absolute -top-12 -left-12 w-96 h-96 text-mrd-red/20 floating-web"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.25"
      >
        <path d="M0,0 L100,100 M0,0 L100,50 M0,0 L50,100 M0,0 L100,25 M0,0 L25,100 M0,0 L100,75 M0,0 L75,100" />
        <circle cx="0" cy="0" r="10" />
        <circle cx="0" cy="0" r="20" />
        <circle cx="0" cy="0" r="30" />
        <circle cx="0" cy="0" r="45" />
        <circle cx="0" cy="0" r="60" />
        <circle cx="0" cy="0" r="75" />
        <circle cx="0" cy="0" r="90" />
      </svg>

      {/* Bottom Right Floating Web SVG */}
      <svg
        className="absolute -bottom-16 -right-16 w-[450px] h-[450px] text-mrd-red/10 floating-web"
        style={{ animationDelay: '-6s' }}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.2"
      >
        <path d="M100,100 L0,0 M100,100 L0,50 M100,100 L50,0 M100,100 L0,25 M100,100 L25,0 M100,100 L0,75 M100,100 L75,0" />
        <circle cx="100" cy="100" r="15" />
        <circle cx="100" cy="100" r="30" />
        <circle cx="100" cy="100" r="50" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="90" />
      </svg>

      {/* Cyber Grid Base Texture Overlay */}
      <div className="absolute inset-0 cyber-grid-bg bg-repeat" />
      <div className="absolute inset-0 bg-gradient-to-t from-mrd-black via-transparent to-mrd-black opacity-90" />
    </div>
  );
};

export default SpiderWebBg;
