import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Clock, Activity, Cpu } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: <Shield className="w-6 h-6 text-mrd-crimson" />,
      title: "Nation First",
      desc: "Every policy query, analysis node, and structural criticism must serve the collective sovereign interest of India first, ahead of all personal or localized lobbies."
    },
    {
      icon: <Cpu className="w-6 h-6 text-mrd-crimson" />,
      title: "Facts Over Noise",
      desc: "Traditional commentary is flooded with emotional noise and fake narratives. MRD counters this by verifying databases, analyzing metrics, and validating statistics."
    },
    {
      icon: <Activity className="w-6 h-6 text-mrd-crimson" />,
      title: "Strategy Over Protest",
      desc: "Standard protests block highways and disrupt public peace. We operate purely inside the digital domain, building transparent trackers and exposing propaganda streams."
    }
  ];

  const timeline = [
    { year: "2024", title: "The Noise Wave", desc: "Digital public squares flooded with coordinated bot campaigns, fabricated indices, and polarized ragebait." },
    { year: "2025", title: "MRD Conception", desc: "A cohort of cyber researchers and students design the conceptual blueprint of the 'Dal' - a structured, patriotic response queue." },
    { year: "2026", title: "The Command Hub", desc: "Deploying the secure decentralized platform, organizing active cells in 28 states to fact-check polarization and create logistical solutions." }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] text-mrd-crimson uppercase block mb-2">
            OPERATIONAL DOCTRINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide">
            Ideological Roadmap
          </h2>
          <div className="h-0.5 w-24 bg-mrd-red mx-auto mt-4" />
        </div>

        {/* Ideology Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-[#0c0303] border border-mrd-red/10 p-6 rounded hover:border-mrd-crimson/30 hover:shadow-crimson-glow transition-all duration-300"
            >
              <div className="mb-4 inline-block bg-mrd-red/10 p-3 rounded border border-mrd-red/20">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold font-mono text-white mb-2 uppercase tracking-wide">
                {card.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Manifesto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 text-left">
            <span className="text-xs font-mono text-mrd-crimson uppercase tracking-widest flex items-center mb-2">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>THE MRD THESIS</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-4 leading-tight font-sans">
              "na Right, na left, sirf national interest"
            </h3>
            <p className="text-xs text-gray-400 font-mono mb-4 leading-relaxed">
              standard political polarization works by forcing citizens to pick sides. This side-picking blinds people to objective facts. If Side A does something good, Side B must oppose it. If Side B fails, Side A celebrates. 
            </p>
            <p className="text-xs text-gray-400 font-mono leading-relaxed">
              MRD rejects this polarization. We believe in strict accountability, solution-driven roadmaps, and intelligent digital citizenship. Discipline is our weapon. Verification is our shield.
            </p>
          </div>

          <div className="lg:col-span-6 border border-mrd-red/10 bg-[#0c0303] p-8 rounded relative shadow-metallic-glow">
            <div className="absolute top-0 right-0 bg-mrd-crimson/10 border-l border-b border-mrd-red/20 px-3 py-1 font-mono text-[9px] text-mrd-crimson">
              SECURITY SHIELD ACTIVE
            </div>
            <h4 className="text-sm font-bold font-mono text-white mb-4 uppercase tracking-widest">
              Core Principles Checklist
            </h4>
            <ul className="space-y-3 font-mono text-xs text-gray-400 text-left">
              <li className="flex items-center space-x-2">
                <span className="text-mrd-crimson font-bold">✓</span>
                <span>Zero political fund collection (Not For Sale)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-mrd-crimson font-bold">✓</span>
                <span>Anonymity clearance for cyber analysts</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-mrd-crimson font-bold">✓</span>
                <span>Solution roadmap mandate prior to publishing critiques</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-mrd-crimson font-bold">✓</span>
                <span>100% digital, zero physical law disruption</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="border-t border-mrd-red/15 pt-20">
          <div className="text-left mb-12 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-mrd-crimson" />
            <span className="text-sm font-mono uppercase tracking-[0.2em] font-bold text-white">
              COHORT CHRONOLOGY
            </span>
          </div>

          <div className="relative border-l border-mrd-red/20 ml-4 pl-8 space-y-12 text-left">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Connector Dot */}
                <div className="absolute -left-12 top-0.5 bg-mrd-black border-2 border-mrd-crimson w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] text-white font-extrabold shadow-crimson-glow">
                  {idx + 1}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <span className="text-lg font-black text-mrd-crimson tracking-wider font-mono">
                    {item.year}
                  </span>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-gray-400 mt-2 font-mono leading-relaxed max-w-2xl">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
