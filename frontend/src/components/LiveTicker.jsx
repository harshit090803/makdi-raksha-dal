import React from 'react';

const LiveTicker = () => {
  const slogans = [
    "na Right, na left, sirf national interest",
    "FACTS FIRST. NOISE LAST.",
    "DISCIPLINE OVER CHAOS.",
    "CRITICISM EASY HAI. ROADMAP KAHAN HAI?",
    "NATION FIRST. POLITICS NEXT.",
    "STRONG NATION. STRONG NARRATIVE.",
    "JAAL BICH CHUKA HAI.",
    "AWARENESS IS POWER."
  ];

  // Repeat items to make loop seamless
  const scrollText = [...slogans, ...slogans].join("  •  ");

  return (
    <div className="w-full bg-[#0c0303] border-b border-mrd-red/20 py-2 overflow-hidden select-none z-30 relative font-mono text-[10px] tracking-[0.2em] text-mrd-crimson uppercase">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="mr-8">{scrollText}</span>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LiveTicker;
