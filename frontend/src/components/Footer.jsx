import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#060000] border-t border-mrd-red/10 py-10 px-4 sm:px-6 lg:px-8 select-none relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* Brand Left */}
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-mrd-crimson" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-extrabold tracking-[0.2em] text-white">MAKDI RAKSHA DAL</span>
            <span className="text-[9px] font-mono text-gray-500 uppercase">National Cyber Intelligence Node</span>
          </div>
        </div>

        {/* Dynamic Center Slogans */}
        <div className="text-center max-w-md">
          <p className="text-[10px] font-mono text-mrd-crimson uppercase tracking-[0.15em] mb-1">
            "na Right, na left, sirf national interest"
          </p>
          <p className="text-[9px] text-gray-500 leading-relaxed font-sans">
            Disclaimer: Makdi Raksha Dal (MRD) is a fictional satirical political digital activism network. It is not affiliated with real-world political organizations, extremism, or active lobbies. Made for internet political culture commentary.
          </p>
        </div>

        {/* System Logs Links Right */}
        <div className="flex space-x-6 text-[10px] font-mono tracking-widest text-gray-500 uppercase">
          <Link to="/admin" className="hover:text-mrd-crimson transition-colors">[ADMIN_PORTAL]</Link>
          <Link to="/contact" className="hover:text-mrd-crimson transition-colors">[SECURE_TIPS]</Link>
          <span>V1.0.9</span>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-mrd-red/5 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono text-gray-600">
        <span>© 2026 MRD COMMAND CORE. ALL LOGISTICS ENCRYPTED.</span>
        <span>LATENCY: 12MS / BROADCAST STATUS: ONLINE</span>
      </div>
    </footer>
  );
};

export default Footer;
