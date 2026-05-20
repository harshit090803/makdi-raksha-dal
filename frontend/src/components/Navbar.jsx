import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Eligibility', path: '/eligibility' },
    { name: 'Join Movement', path: '/join' },
    { name: 'Media Portal', path: '/media' },
    { name: 'Secure Tips', path: '/contact' }
  ];

  const activeStyle = "text-white border-b-2 border-mrd-crimson px-1 py-1 font-semibold tracking-wide transition-all";
  const normalStyle = "text-gray-400 hover:text-white px-1 py-1 transition-all hover:border-b-2 hover:border-mrd-red/50";

  return (
    <nav className="bg-[#080808]/90 backdrop-blur-md border-b border-mrd-red/10 sticky top-0 z-40 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="relative">
              <Shield className="w-7 h-7 text-mrd-crimson group-hover:text-mrd-brightRed transition-colors duration-300" />
              <div className="absolute inset-0 bg-mrd-crimson/20 rounded-full blur-md group-hover:bg-mrd-crimson/40 transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-[0.25em] text-white">MRD INDIA</span>
              <span className="text-[9px] font-mono tracking-[0.1em] text-mrd-crimson">JAAL BICH CHUKA HAI</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.15em] font-mono">
            {links.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => isActive ? activeStyle : normalStyle}
              >
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="text-mrd-crimson font-bold hover:text-mrd-brightRed">
                  [CONSOLE]
                </Link>
                <button 
                  onClick={logout} 
                  className="text-gray-500 hover:text-white text-[10px]"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link 
                to="/admin" 
                className="text-gray-500 hover:text-mrd-crimson transition-colors border border-mrd-red/20 px-2 py-0.5 rounded text-[10px]"
              >
                SECURE ACCESS
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0c0303] border-b border-mrd-red/20 px-4 pt-2 pb-4 space-y-3 font-mono uppercase text-xs tracking-wider">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded text-gray-300 hover:bg-mrd-red/10 hover:text-white transition-all"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="border-t border-mrd-red/10 pt-3">
            {user ? (
              <div className="flex justify-between items-center px-3">
                <Link 
                  to="/admin" 
                  onClick={() => setIsOpen(false)}
                  className="text-mrd-crimson font-bold"
                >
                  COMMAND CONSOLE
                </Link>
                <button 
                  onClick={() => { logout(); setIsOpen(false); }} 
                  className="text-gray-500 hover:text-white"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
                className="block text-center bg-mrd-red/20 hover:bg-mrd-red/40 text-white font-bold py-2 rounded border border-mrd-red/30"
              >
                SECURE CONSOLE LOGIN
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
