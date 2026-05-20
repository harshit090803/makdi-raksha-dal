import React from 'react';
import { Download, Shield, Eye, Image } from 'lucide-react';

const Media = () => {
  const assets = [
    {
      title: "MRD Official Emblem",
      type: "PNG Logo",
      src: "/logo.png",
      dimensions: "1024 x 1024 px",
      desc: "High-fidelity, high-resolution official Makdi Raksha Dal political command emblem."
    },
    {
      title: "Eligibility Standards Poster",
      type: "PNG Campaign Poster",
      src: "/poster.png",
      dimensions: "1080 x 1350 px",
      desc: "Sleek, high-definition digital cohort recruitment and alignment poster."
    },
    {
      title: "Cyber Command Desktop Wall",
      type: "JPG Graphic Asset",
      src: "/poster.png", // reusing poster image as visual representation
      dimensions: "1920 x 1080 px",
      desc: "Crimson-grid high-resolution command dashboard wallpaper background."
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] text-mrd-crimson uppercase block mb-2">
            Media Command Node
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide">
            Campaign Assets
          </h2>
          <div className="h-0.5 w-24 bg-mrd-red mx-auto mt-4" />
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {assets.map((asset, i) => (
            <div
              key={i}
              className="bg-[#0c0303] border border-mrd-red/10 hover:border-mrd-crimson/30 rounded overflow-hidden flex flex-col justify-between hover:shadow-crimson-glow transition-all duration-300 group"
            >
              
              {/* Asset Preview Container */}
              <div className="h-64 bg-[#060000] relative flex items-center justify-center border-b border-mrd-red/10 overflow-hidden">
                <img 
                  src={asset.src} 
                  alt={asset.title} 
                  className="max-h-full max-w-full object-contain filter brightness-90 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='%238b0000' stroke-width='0.5'><rect width='100' height='100'/><text x='15' y='50' fill='%23dc143c' font-size='6'>MRD ASSET</text></svg>";
                  }}
                />
                
                {/* Meta details badge */}
                <div className="absolute bottom-2 left-2 bg-[#0c0303]/90 border border-mrd-red/20 px-2 py-0.5 rounded text-[8px] font-mono text-gray-400 uppercase tracking-wider">
                  {asset.dimensions}
                </div>
              </div>

              {/* Asset details bottom */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-mrd-crimson">
                      {asset.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 font-sans group-hover:text-mrd-crimson transition-colors">
                    {asset.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                    {asset.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={asset.src}
                    download
                    className="w-full bg-[#060000] hover:bg-mrd-crimson border border-mrd-red/20 hover:border-mrd-brightRed text-gray-400 hover:text-white font-mono uppercase tracking-widest text-[9px] font-bold py-2.5 px-4 rounded transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Core</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Media;
