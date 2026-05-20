import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, Fingerprint, Eye, Award, Link, Compass, CheckCircle } from 'lucide-react';

const Eligibility = () => {
  const traits = [
    {
      icon: <ShieldAlert className="w-5 h-5 text-mrd-crimson" />,
      title: "Anti-Corruption Soch",
      desc: "An absolute zero-tolerance mindset towards systemic bribery or exploitation of national assets. Total moral transparency."
    },
    {
      icon: <Compass className="w-5 h-5 text-mrd-crimson" />,
      title: "Nation-First Thinking",
      desc: "Decisions, actions, and digital output must put the country's sovereign interests ahead of localized lobbies, polarization, or political bias."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-mrd-crimson" />,
      title: "Discipline & Unity",
      desc: "MRD operates as a synchronized node queue. Chaos and emotional outrage are rejected in favor of strategic coordinate tracking."
    },
    {
      icon: <Eye className="w-5 h-5 text-mrd-crimson" />,
      title: "Facts Over Noise",
      desc: "A strictly rational worldview. Relying only on validated data streams and rejecting emotional propaganda, bias, and clickbait media."
    },
    {
      icon: <Fingerprint className="w-5 h-5 text-mrd-crimson" />,
      title: "Anonymity Clearance",
      desc: "The choice to work silently behind digital aliases without seeking personal fame. Strategy over vanity."
    },
    {
      icon: <Link className="w-5 h-5 text-mrd-crimson" />,
      title: "Network Builder",
      desc: "Ready to coordinate and synchronize informational pipelines with other youth nodes across state lines to build national awareness."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-mrd-crimson" />,
      title: "Strategic Mindset",
      desc: "A constructive mind. Rejects cheap critique and instead designs calculated, structured logisitcal roadmaps for national solutions."
    },
    {
      icon: <Award className="w-5 h-5 text-mrd-crimson" />,
      title: "Digital Awareness",
      desc: "A solid technical understanding of how data, algorithms, and bot manipulation work in modern digital information systems."
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] text-mrd-crimson uppercase block mb-2">
            ONBOARDING PROTOCOLS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide">
            Eligibility Standard
          </h2>
          <div className="h-0.5 w-24 bg-mrd-red mx-auto mt-4" />
        </div>

        {/* Poster & Responsive Traits Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Cyber Poster Emblem */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full max-w-sm rounded border border-mrd-red/20 overflow-hidden bg-[#0c0303] shadow-crimson-glow relative group"
            >
              <div className="absolute top-2 left-2 bg-[#0c0303]/90 border border-mrd-red/20 px-2 py-0.5 rounded text-[8px] font-mono text-mrd-crimson z-10 tracking-widest uppercase">
                COHORT CRITERIA POSTER
              </div>
              <img 
                src="/poster.png" 
                alt="MRD Eligibility Criteria Official Campaign Poster" 
                className="w-full h-auto object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 150' fill='none' stroke='%238b0000' stroke-width='0.5'><rect width='100' height='150'/><text x='15' y='75' fill='%23dc143c' font-size='6'>MRD CYBER SEC</text></svg>";
                }}
              />
              <div className="p-4 border-t border-mrd-red/10 text-center font-mono">
                <span className="text-[10px] text-mrd-crimson tracking-widest uppercase">
                  "Jaal Bich Chuka Hai."
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Core Dynamic Traits Grid */}
          <div className="lg:col-span-8">
            <h3 className="text-sm font-bold font-mono text-white mb-6 uppercase tracking-widest border-b border-mrd-red/10 pb-2 text-left">
              Verifiable Traits Matrix
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {traits.map((trait, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#0c0303]/80 border border-mrd-red/10 hover:border-mrd-crimson/30 rounded p-5 hover:shadow-crimson-glow transition-all duration-300 group flex items-start text-left"
                >
                  <div className="bg-mrd-red/10 p-2.5 rounded border border-mrd-red/20 mr-4 shrink-0 group-hover:bg-mrd-crimson/10 group-hover:border-mrd-crimson/30 transition-all">
                    {trait.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono text-white mb-1.5 uppercase tracking-wide group-hover:text-mrd-crimson transition-all">
                      {trait.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                      {trait.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Eligibility;
