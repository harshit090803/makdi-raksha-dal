import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Terminal, MessageSquare, AlertTriangle, Send, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Contact = () => {
  const { API_URL } = useState(useAuth().API_URL);

  // Form states
  const [generalName, setGeneralName] = useState('');
  const [generalEmail, setGeneralEmail] = useState('');
  const [generalMessage, setGeneralMessage] = useState('');
  const [tipMessage, setTipMessage] = useState('');

  const [loadingGeneral, setLoadingGeneral] = useState(false);
  const [loadingTip, setLoadingTip] = useState(false);
  
  const [successGeneral, setSuccessGeneral] = useState('');
  const [successTip, setSuccessTip] = useState('');

  const [errorGeneral, setErrorGeneral] = useState('');
  const [errorTip, setErrorTip] = useState('');

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    if (!generalName || !generalEmail || !generalMessage) {
      setErrorGeneral('Please fill all required fields.');
      return;
    }
    setErrorGeneral('');
    setLoadingGeneral(true);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: generalName,
          email: generalEmail,
          type: 'General',
          message: generalMessage
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessGeneral(data.message);
        setGeneralName('');
        setGeneralEmail('');
        setGeneralMessage('');
        setTimeout(() => setSuccessGeneral(''), 5000);
      } else {
        setErrorGeneral(data.error || 'Failed to submit query.');
      }
    } catch (err) {
      setErrorGeneral('System Core API offline. Request timed out.');
    } finally {
      setLoadingGeneral(false);
    }
  };

  const handleTipSubmit = async (e) => {
    e.preventDefault();
    if (!tipMessage) {
      setErrorTip('Tip content cannot be empty.');
      return;
    }
    setErrorTip('');
    setLoadingTip(true);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'AnonymousTip',
          message: tipMessage
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessTip(data.message);
        setTipMessage('');
        setTimeout(() => setSuccessTip(''), 5000);
      } else {
        setErrorTip(data.error || 'Failed to encrypt tip.');
      }
    } catch (err) {
      setErrorTip('System Core API offline. Encrypted tip failed to dispatch.');
    } finally {
      setLoadingTip(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] text-mrd-crimson uppercase block mb-2">
            Secure Nodes
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide">
            Communications Control
          </h2>
          <div className="h-0.5 w-24 bg-mrd-red mx-auto mt-4" />
        </div>

        {/* Dual Layout: General Logs and High-Security Tip Portal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          
          {/* General Inquiries */}
          <div className="border border-mrd-red/10 bg-[#0c0303]/85 p-6 rounded shadow-metallic-glow relative">
            <div className="flex items-center space-x-2 text-white border-b border-mrd-red/10 pb-3 mb-6">
              <MessageSquare className="w-5 h-5 text-mrd-crimson" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">General Node Log</span>
            </div>

            <form onSubmit={handleGeneralSubmit} className="space-y-4">
              {errorGeneral && <p className="text-[10px] font-mono text-mrd-crimson bg-mrd-red/10 border border-mrd-red/20 p-2.5 rounded">{errorGeneral}</p>}
              {successGeneral && <p className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/30 p-2.5 rounded">{successGeneral}</p>}

              <div className="flex flex-col">
                <label className="text-[9px] uppercase tracking-widest text-gray-500 font-mono mb-1.5">Full Name *</label>
                <input 
                  type="text" 
                  value={generalName}
                  onChange={(e) => setGeneralName(e.target.value)}
                  className="bg-mrd-black border border-mrd-red/15 focus:border-mrd-crimson focus:outline-none rounded px-3 py-2 text-xs text-white" 
                  placeholder="e.g. Suresh Patil"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] uppercase tracking-widest text-gray-500 font-mono mb-1.5">Secure Email *</label>
                <input 
                  type="email" 
                  value={generalEmail}
                  onChange={(e) => setGeneralEmail(e.target.value)}
                  className="bg-mrd-black border border-mrd-red/15 focus:border-mrd-crimson focus:outline-none rounded px-3 py-2 text-xs text-white" 
                  placeholder="suresh@gmail.com"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] uppercase tracking-widest text-gray-500 font-mono mb-1.5">Transmission Payload *</label>
                <textarea 
                  value={generalMessage}
                  onChange={(e) => setGeneralMessage(e.target.value)}
                  rows={4}
                  className="bg-mrd-black border border-mrd-red/15 focus:border-mrd-crimson focus:outline-none rounded px-3 py-2 text-xs leading-relaxed text-white" 
                  placeholder="Type your transmission query..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loadingGeneral}
                  className="w-full bg-[#060000] border border-mrd-red/20 text-gray-300 hover:text-white font-mono uppercase tracking-widest text-[10px] font-bold py-3 px-6 rounded transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loadingGeneral ? 'TRANSMITTING...' : 'Transmit Query'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* High-Security Anonymous Tip Terminal */}
          <div className="border border-mrd-crimson/30 bg-[#060000] p-6 rounded shadow-crimson-glow relative overflow-hidden font-mono crt-overlay">
            
            {/* Blinking Secure Indicator */}
            <div className="absolute top-2 right-2 flex items-center space-x-2 text-[9px] text-mrd-crimson font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-mrd-brightRed animate-pulse" />
              <span>LOGS BYPASSED</span>
            </div>

            <div className="flex items-center space-x-2 text-white border-b border-mrd-red/25 pb-3 mb-6">
              <Terminal className="w-5 h-5 text-mrd-crimson animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">Encrypted Tip Node</span>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed mb-6 uppercase">
              WARNING: This is a high-security cryptographic broadcast system. Your IP, browser agents, and credentials are bypassed and NOT stored. Use this node to report narrative click-farms, bots, or media corruption.
            </p>

            <form onSubmit={handleTipSubmit} className="space-y-4">
              {errorTip && <p className="text-[10px] text-mrd-crimson border border-mrd-crimson/30 bg-[#0c0303] p-2.5 rounded">{errorTip}</p>}
              {successTip && <p className="text-[10px] text-emerald-400 border border-emerald-500/30 bg-[#020502]/60 p-2.5 rounded">{successTip}</p>}

              <div className="flex flex-col">
                <label className="text-[9px] uppercase tracking-widest text-mrd-crimson font-bold mb-1.5">Secure Message *</label>
                <textarea 
                  value={tipMessage}
                  onChange={(e) => setTipMessage(e.target.value)}
                  rows={6}
                  className="bg-mrd-black border border-mrd-crimson/25 focus:border-mrd-crimson focus:outline-none rounded px-3 py-2 text-xs leading-relaxed text-emerald-400 font-mono" 
                  placeholder="Enter encrypted OSINT / cyber tip..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loadingTip}
                  className="w-full bg-mrd-crimson hover:bg-mrd-brightRed border border-mrd-brightRed/30 text-white font-mono uppercase tracking-widest text-[10px] font-bold py-3.5 px-6 rounded transition-colors flex items-center justify-center space-x-2 shadow-crimson-glow hover:shadow-crimson-glow-strong"
                >
                  <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                  <span>{loadingTip ? 'ENCRYPTING BROADCAST...' : '[DISPATCH_TIP]'}</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Social Networks Command Bar */}
        <div className="mt-20 border-t border-mrd-red/10 pt-10 text-center">
          <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">
            Secure Communications Hub
          </h4>
          
          <div className="flex flex-wrap justify-center gap-6 font-mono text-[10px] uppercase tracking-widest">
            <a href="#discord" className="border border-mrd-red/15 hover:border-mrd-crimson/40 px-6 py-2 rounded bg-[#0c0303]/40 text-gray-400 hover:text-white transition-colors duration-300">
              DISCORD CHANNEL (Command Core)
            </a>
            <a href="https://x.com/makdirakshadal" target="_blank" rel="noopener noreferrer" className="border border-mrd-red/15 hover:border-mrd-crimson/40 px-6 py-2 rounded bg-[#0c0303]/40 text-gray-400 hover:text-white transition-colors duration-300">
              X FEED (@makdirakshadal)
            </a>
            <a href="https://instagram.com/makdirakshadal" target="_blank" rel="noopener noreferrer" className="border border-mrd-red/15 hover:border-mrd-crimson/40 px-6 py-2 rounded bg-[#0c0303]/40 text-gray-400 hover:text-white transition-colors duration-300">
              INSTAGRAM LOGS (@makdirakshadal)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
