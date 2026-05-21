import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Sparkles, Terminal, ToggleLeft, ToggleRight, User, AlertCircle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';

const Join = () => {
  const { API_URL } = useAuth();
  
  // Onboarding form states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [skills, setSkills] = useState('');
  const [whyJoin, setWhyJoin] = useState('');
  const [anonymousMode, setAnonymousMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"
  ];

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!username) {
      tempErrors.username = anonymousMode ? "Security alias is mandatory." : "Username is required.";
      isValid = false;
    }
    if (!state) {
      tempErrors.state = "Operational state is required.";
      isValid = false;
    }
    if (!occupation) {
      tempErrors.occupation = "Current profession details are required.";
      isValid = false;
    }
    if (!whyJoin) {
      tempErrors.whyJoin = "This parameter requires strategic alignment justification.";
      isValid = false;
    }

    if (!anonymousMode) {
      if (!name) {
        tempErrors.name = "Full name is required in standard clearance mode.";
        isValid = false;
      }
      if (!email) {
        tempErrors.email = "Active email is required for secure contact.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        tempErrors.email = "Email address is invalid.";
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/applicants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: anonymousMode ? '' : name,
          username,
          email: anonymousMode ? '' : email,
          state,
          occupation,
          skills,
          whyJoin,
          anonymousMode
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Confetti!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#dc143c', '#8b0000', '#ffffff']
        });

        setSubmitted(true);
        setStatusMessage(data.message);
      } else {
        setErrors({ form: data.error || 'Transmission aborted.' });
      }
    } catch (err) {
      setErrors({ form: 'Command core API offline. Onboarding queue halted.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative select-none transition-all duration-700 ${anonymousMode ? 'bg-[#040904] text-emerald-400 font-mono crt-overlay' : 'bg-mrd-black text-gray-200'}`}>
      
      {/* Background Web overlay */}
      <div className="max-w-2xl mx-auto">
        
        {/* Onboarding Header */}
        <div className="text-center mb-12">
          {anonymousMode ? (
            <div className="flex items-center justify-center space-x-2 text-emerald-500 mb-2">
              <Terminal className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] uppercase">ENCRYPTED COHORT ONBOARDING LAYER</span>
            </div>
          ) : (
            <span className="text-[10px] font-mono tracking-[0.3em] text-mrd-crimson uppercase block mb-2">
              RECRUITMENT PROTOCOL
            </span>
          )}
          <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-wide transition-colors ${anonymousMode ? 'text-emerald-500' : 'text-white'}`}>
            {anonymousMode ? 'SECURE_NODE_REGISTRATION' : 'Join The Movement'}
          </h2>
          <div className={`h-0.5 w-24 mx-auto mt-4 transition-colors ${anonymousMode ? 'bg-emerald-500' : 'bg-mrd-red'}`} />
        </div>

        {/* Toggle Mode Command Bar */}
        <div className={`border rounded p-4 mb-8 flex items-center justify-between transition-colors ${anonymousMode ? 'border-emerald-500/30 bg-[#020502]/60' : 'border-mrd-red/15 bg-[#0c0303]/60'}`}>
          <div className="flex items-center space-x-3 text-left">
            <Shield className={`w-5 h-5 ${anonymousMode ? 'text-emerald-500' : 'text-mrd-crimson'}`} />
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${anonymousMode ? 'text-emerald-400' : 'text-white'}`}>
                {anonymousMode ? 'ANONYMOUS MODE SHIELD: ACTIVE' : 'Public Profile Clearance'}
              </p>
              <p className={`text-[10px] ${anonymousMode ? 'text-emerald-500/70' : 'text-gray-400'}`}>
                {anonymousMode ? 'Real identities bypassed. Encrypted secure hashing verified.' : 'Standard operational mode. Registered names are public.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setAnonymousMode(!anonymousMode);
              setErrors({});
            }}
            className="focus:outline-none transition-transform active:scale-95"
          >
            {anonymousMode ? (
              <ToggleRight className="w-9 h-9 text-emerald-400" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-gray-600 hover:text-mrd-crimson" />
            )}
          </button>
        </div>

        {/* Onboarding / Encrypted Success Screen */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`border p-8 rounded text-center shadow-2xl relative ${anonymousMode ? 'border-emerald-500 bg-[#020502]/95 shadow-emerald-500/20' : 'border-mrd-red/30 bg-[#0c0303]/95 shadow-crimson-glow-strong'}`}
            >
              <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center border-2 mb-6 ${anonymousMode ? 'border-emerald-500 text-emerald-400' : 'border-mrd-crimson text-mrd-crimson'}`}>
                <Shield className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className={`text-xl font-bold uppercase tracking-widest mb-4 ${anonymousMode ? 'text-emerald-500 font-mono' : 'text-white'}`}>
                {anonymousMode ? 'QUEUE_HASH_COMPLETED' : 'Onboarding Complete'}
              </h3>
              <p className="text-xs leading-relaxed max-w-md mx-auto mb-6">
                {statusMessage || 'Your candidate profile data packet has been securely transmitted. A command supervisor will review your eligibility clearance. Access your profile via key hashes.'}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setUsername('');
                    setEmail('');
                    setState('');
                    setOccupation('');
                    setSkills('');
                    setWhyJoin('');
                  }}
                  className={`px-6 py-2.5 rounded font-mono text-[10px] font-bold uppercase tracking-widest border transition-all ${anonymousMode ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black' : 'bg-mrd-crimson/20 border-mrd-crimson text-white hover:bg-mrd-crimson'}`}
                >
                  {anonymousMode ? '[DEREGISTER_QUEUE]' : 'Submit Another Node'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`space-y-5 border rounded p-6 sm:p-8 transition-colors ${anonymousMode ? 'border-emerald-500/25 bg-[#020502]/85 shadow-emerald-500/5' : 'border-mrd-red/10 bg-[#0c0303]/85 shadow-metallic-glow'}`}
            >
              
              {/* Security Alerts */}
              {errors.form && (
                <div className={`p-3 rounded border text-xs flex items-center space-x-2 ${anonymousMode ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' : 'bg-mrd-red/10 border-mrd-red/20 text-mrd-crimson'}`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Identity Name (Bypassed in Anonymous) */}
                {!anonymousMode && (
                  <div className="flex flex-col text-left">
                    <label className="text-[9px] uppercase tracking-widest text-gray-500 mb-1.5 font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-mrd-black border border-mrd-red/15 focus:border-mrd-crimson focus:outline-none rounded px-3.5 py-2 text-xs text-white"
                      placeholder="e.g. Aravind Sharma"
                    />
                    {errors.name && <span className="text-[9px] font-mono text-mrd-crimson mt-1">{errors.name}</span>}
                  </div>
                )}

                {/* Email Node (Bypassed in Anonymous) */}
                {!anonymousMode && (
                  <div className="flex flex-col text-left">
                    <label className="text-[9px] uppercase tracking-widest text-gray-500 mb-1.5 font-mono">
                      Secure Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-mrd-black border border-mrd-red/15 focus:border-mrd-crimson focus:outline-none rounded px-3.5 py-2 text-xs text-white"
                      placeholder="aravind@mrd.in"
                    />
                    {errors.email && <span className="text-[9px] font-mono text-mrd-crimson mt-1">{errors.email}</span>}
                  </div>
                )}

                {/* Security Alias / Username */}
                <div className="flex flex-col text-left col-span-1 sm:col-span-2">
                  <label className={`text-[9px] uppercase tracking-widest mb-1.5 font-mono ${anonymousMode ? 'text-emerald-500' : 'text-gray-500'}`}>
                    {anonymousMode ? 'SECURITY_ALIAS_HASH *' : 'System Username *'}
                  </label>
                  <div className="relative flex items-center">
                    <span className={`absolute left-3.5 text-xs font-mono ${anonymousMode ? 'text-emerald-500/70' : 'text-mrd-crimson'}`}>@</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`w-full bg-mrd-black border focus:outline-none rounded pl-8 pr-3.5 py-2 text-xs ${anonymousMode ? 'border-emerald-500/20 focus:border-emerald-500 text-emerald-400 font-mono' : 'border-mrd-red/15 focus:border-mrd-crimson text-white'}`}
                      placeholder={anonymousMode ? 'phantom_core' : 'aravind_node'}
                    />
                  </div>
                  {errors.username && <span className={`text-[9px] font-mono mt-1 ${anonymousMode ? 'text-emerald-500' : 'text-mrd-crimson'}`}>{errors.username}</span>}
                </div>

                {/* State selector */}
                <div className="flex flex-col text-left">
                  <label className={`text-[9px] uppercase tracking-widest mb-1.5 font-mono ${anonymousMode ? 'text-emerald-500' : 'text-gray-500'}`}>
                    Operational State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={`bg-mrd-black border focus:outline-none rounded px-3.5 py-2 text-xs ${anonymousMode ? 'border-emerald-500/20 focus:border-emerald-500 text-emerald-400 font-mono' : 'border-mrd-red/15 focus:border-mrd-crimson text-white'}`}
                  >
                    <option value="">-- SELECT --</option>
                    {indianStates.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {errors.state && <span className={`text-[9px] font-mono mt-1 ${anonymousMode ? 'text-emerald-500' : 'text-mrd-crimson'}`}>{errors.state}</span>}
                </div>

                {/* Occupation */}
                <div className="flex flex-col text-left">
                  <label className={`text-[9px] uppercase tracking-widest mb-1.5 font-mono ${anonymousMode ? 'text-emerald-500' : 'text-gray-500'}`}>
                    Current Occupation *
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className={`bg-mrd-black border focus:outline-none rounded px-3.5 py-2 text-xs ${anonymousMode ? 'border-emerald-500/20 focus:border-emerald-500 text-emerald-400 font-mono' : 'border-mrd-red/15 focus:border-mrd-crimson text-white'}`}
                    placeholder="e.g. Cyber Security Specialist"
                  />
                  {errors.occupation && <span className={`text-[9px] font-mono mt-1 ${anonymousMode ? 'text-emerald-500' : 'text-mrd-crimson'}`}>{errors.occupation}</span>}
                </div>

                {/* Technical Skills */}
                <div className="flex flex-col text-left col-span-1 sm:col-span-2">
                  <label className={`text-[9px] uppercase tracking-widest mb-1.5 font-mono ${anonymousMode ? 'text-emerald-500' : 'text-gray-500'}`}>
                    Operational Skills (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className={`w-full bg-mrd-black border focus:outline-none rounded px-3.5 py-2 text-xs ${anonymousMode ? 'border-emerald-500/20 focus:border-emerald-500 text-emerald-400 font-mono' : 'border-mrd-red/15 focus:border-mrd-crimson text-white'}`}
                    placeholder="e.g. OSINT, Data Analysis, Fact Checking"
                  />
                </div>

                {/* Alignment parameter / Why Join */}
                <div className="flex flex-col text-left col-span-1 sm:col-span-2">
                  <label className={`text-[9px] uppercase tracking-widest mb-1.5 font-mono ${anonymousMode ? 'text-emerald-500' : 'text-gray-500'}`}>
                    ALIGNMENT STATEMENT / WHY JOIN MRD? *
                  </label>
                  <textarea
                    value={whyJoin}
                    onChange={(e) => setWhyJoin(e.target.value)}
                    rows={4}
                    className={`w-full bg-mrd-black border focus:outline-none rounded px-3.5 py-2 text-xs leading-relaxed ${anonymousMode ? 'border-emerald-500/20 focus:border-emerald-500 text-emerald-400 font-mono' : 'border-mrd-red/15 focus:border-mrd-crimson text-white'}`}
                    placeholder="Provide your ideological alignment. Why are you applying for this cohort?"
                  />
                  {errors.whyJoin && <span className={`text-[9px] font-mono mt-1 ${anonymousMode ? 'text-emerald-500' : 'text-mrd-crimson'}`}>{errors.whyJoin}</span>}
                </div>

              </div>

              {/* Submit button */}
              <div className="pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <span className={`text-[9px] font-mono flex items-center ${anonymousMode ? 'text-emerald-600' : 'text-gray-500'}`}>
                  <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                  {anonymousMode ? 'ENCRYPTED PORT EXP-7' : 'Standard clearance checked.'}
                </span>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded font-mono text-xs font-bold uppercase tracking-widest border transition-all ${anonymousMode ? 'bg-emerald-950/20 hover:bg-emerald-400 hover:text-black border-emerald-500 text-emerald-400' : 'bg-mrd-crimson hover:bg-mrd-brightRed text-white border-mrd-brightRed/30 shadow-crimson-glow hover:shadow-crimson-glow-strong'}`}
                >
                  {loading ? 'TRANSMITTING...' : anonymousMode ? '[EXECUTE_BROADCAST]' : 'Request Node Access'}
                </button>
              </div>

            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Join;
