import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, ShieldAlert, Key, Search, Download, CheckCircle, XCircle, Users, BarChart2, MessageSquare, Terminal, Eye, Filter 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, login, logout, token, API_URL } = useAuth();

  // Login Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard states
  const [applicants, setApplicants] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('onboarding'); // onboarding, analytics, tips
  const [loadingData, setLoadingData] = useState(false);

  // Filter/Search states
  const [stateFilter, setStateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Data Function
  const fetchData = async () => {
    if (!token) return;
    setLoadingData(true);
    try {
      // Fetch Applicants
      let appUrl = `${API_URL}/applicants?`;
      if (stateFilter) appUrl += `state=${stateFilter}&`;
      if (statusFilter) appUrl += `status=${statusFilter}&`;
      if (searchQuery) appUrl += `search=${searchQuery}&`;

      const appRes = await fetch(appUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const appData = await appRes.json();
      setApplicants(appData.applicants || []);

      // Fetch Tips/Contacts
      const conRes = await fetch(`${API_URL}/contact`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const conData = await conRes.json();
      setContacts(conData.contacts || []);

    } catch (err) {
      console.error('Core API lookup failure:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, stateFilter, statusFilter, searchQuery]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please input credentials.');
      return;
    }
    setLoginError('');
    setLoggingIn(true);

    const res = await login(email, password);
    setLoggingIn(false);

    if (!res.success) {
      setLoginError(res.error || 'Access denied. Invalid command credentials.');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/applicants/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        // Refresh local applicants list
        setApplicants(prev => prev.map(a => a._id === id ? { ...a, status } : a));
      }
    } catch (err) {
      console.error('Failed to change candidate clearance status:', err);
    }
  };

  const handleExportCSV = () => {
    if (!token) return;
    // Redirect browser to download route
    window.open(`${API_URL}/applicants/export?Authorization=Bearer ${token}`, '_blank');
  };

  // Compile statistics for charts
  const getAnalyticsData = () => {
    // State breakdowns
    const states = {};
    applicants.forEach(a => {
      states[a.state] = (states[a.state] || 0) + 1;
    });
    const stateChart = Object.keys(states).map(name => ({ name, count: states[name] }));

    // Status distributions
    const statuses = { Pending: 0, Approved: 0, Rejected: 0 };
    applicants.forEach(a => {
      if (statuses[a.status] !== undefined) statuses[a.status]++;
    });
    const statusChart = Object.keys(statuses).map(name => ({ name, value: statuses[name] }));

    return { stateChart, statusChart };
  };

  const { stateChart, statusChart } = getAnalyticsData();
  const COLORS = ['#8b0000', '#dc143c', '#4a0000'];

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"
  ];

  /* ==========================================
     RENDER LOGIN LAYOUT (UNAUTHENTICATED)
     ========================================== */
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 font-mono crt-overlay select-none bg-[#060000]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-[#0c0303] border border-mrd-red/30 rounded p-6 sm:p-8 shadow-crimson-glow"
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-8 border-b border-mrd-red/20 pb-4 text-center">
            <ShieldAlert className="w-12 h-12 text-mrd-crimson animate-pulse mb-3" />
            <h2 className="text-lg font-bold text-white tracking-[0.2em] uppercase">SYSTEM COMMAND GATE</h2>
            <p className="text-[10px] text-gray-500 uppercase mt-1">RESTRICTED TO LEVEL-1 INTRUSION OFFICERS</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            {loginError && (
              <div className="p-3 rounded border border-mrd-red/30 bg-[#060000] text-xs text-mrd-crimson flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mrd-brightRed animate-ping shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="flex flex-col">
              <label className="text-[9px] uppercase tracking-widest text-mrd-crimson mb-1.5">Secure ID (Email)</label>
              <div className="relative flex items-center">
                <Key className="absolute left-3 w-4 h-4 text-mrd-red" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-mrd-black border border-mrd-red/20 focus:border-mrd-crimson focus:outline-none rounded pl-10 pr-3 py-2 text-xs text-white"
                  placeholder="admin@mrd.in"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[9px] uppercase tracking-widest text-mrd-crimson mb-1.5">Command HASH Code (Password)</label>
              <div className="relative flex items-center">
                <Key className="absolute left-3 w-4 h-4 text-mrd-red" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-mrd-black border border-mrd-red/20 focus:border-mrd-crimson focus:outline-none rounded pl-10 pr-3 py-2 text-xs text-white"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full bg-mrd-crimson hover:bg-mrd-brightRed border border-mrd-brightRed/30 text-white font-mono uppercase tracking-widest text-[10px] font-bold py-3.5 px-6 rounded transition-colors shadow-crimson-glow hover:shadow-crimson-glow-strong"
              >
                {loggingIn ? 'DECRYPTING ACCESS PATH...' : '[GATEWAY_LOG_IN]'}
              </button>
            </div>
          </form>

          {/* Seed accounts reminders for testers */}
          <div className="mt-8 border-t border-mrd-red/10 pt-4 text-center">
            <span className="text-[8px] text-gray-600 block uppercase mb-1">LOCAL DEVELOPMENT MOCK SECURITY PROFILE</span>
            <span className="text-[9px] text-gray-500 block uppercase font-sans">
              admin@mrd.in / MRDCommandCenter2026
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ==========================================
     RENDER DASHBOARD CONTROL (AUTHENTICATED)
     ========================================== */
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 select-none font-mono relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Command Console Banner */}
        <div className="border border-mrd-red/20 bg-[#0c0303] rounded p-6 mb-8 flex flex-col md:flex-row items-center justify-between shadow-crimson-glow relative overflow-hidden">
          {/* subtle scanline overlay */}
          <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />

          <div className="flex items-center space-x-4 mb-4 md:mb-0 relative z-10 text-left">
            <div className="bg-mrd-red/10 p-3 rounded border border-mrd-crimson/30">
              <Terminal className="w-8 h-8 text-mrd-crimson animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase text-white tracking-widest flex items-center">
                <span>MRD Cyber Command Console</span>
                <span className="ml-3 text-[9px] bg-mrd-crimson/20 border border-mrd-crimson/30 px-2 py-0.5 rounded text-mrd-crimson uppercase animate-pulse">LEVEL 1 Clearance</span>
              </h2>
              <p className="text-[10px] text-gray-500 uppercase mt-1">OPERATIONAL PROFILE HASH: admin@mrd.in</p>
            </div>
          </div>

          <div className="relative z-10 flex space-x-4">
            <button
              onClick={fetchData}
              className="bg-[#060000] border border-mrd-red/20 text-gray-400 hover:text-white text-[9px] uppercase tracking-wider py-2.5 px-4 rounded"
            >
              [SYNC_QUEUE]
            </button>
            <button
              onClick={logout}
              className="bg-mrd-red/20 hover:bg-mrd-red/40 border border-mrd-red/30 text-white text-[9px] uppercase tracking-wider py-2.5 px-4 rounded"
            >
              [LOG_OUT]
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex space-x-1 border-b border-mrd-red/10 mb-8 uppercase text-[10px] tracking-widest font-bold">
          <button
            onClick={() => setActiveTab('onboarding')}
            className={`px-6 py-3 border-t-2 border-x transition-colors ${activeTab === 'onboarding' ? 'border-t-mrd-crimson border-x-mrd-red/10 bg-[#0c0303] text-white' : 'border-t-transparent border-x-transparent text-gray-500 hover:text-gray-300'}`}
          >
            <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-2" />Onboarding Queue</span>
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 border-t-2 border-x transition-colors ${activeTab === 'analytics' ? 'border-t-mrd-crimson border-x-mrd-red/10 bg-[#0c0303] text-white' : 'border-t-transparent border-x-transparent text-gray-500 hover:text-gray-300'}`}
          >
            <span className="flex items-center"><BarChart2 className="w-3.5 h-3.5 mr-2" />Analytics Command</span>
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`px-6 py-3 border-t-2 border-x transition-colors ${activeTab === 'tips' ? 'border-t-mrd-crimson border-x-mrd-red/10 bg-[#0c0303] text-white' : 'border-t-transparent border-x-transparent text-gray-500 hover:text-gray-300'}`}
          >
            <span className="flex items-center"><MessageSquare className="w-3.5 h-3.5 mr-2" />Encrypted Tips ({contacts.length})</span>
          </button>
        </div>

        {/* Tab 1: Onboarding Queue */}
        {activeTab === 'onboarding' && (
          <div className="space-y-6">
            
            {/* Search and Filters panel */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-[#0c0303]/60 border border-mrd-red/10 p-4 rounded text-left">
              
              <div className="flex flex-col col-span-1 sm:col-span-2">
                <label className="text-[8px] uppercase tracking-wider text-gray-500 mb-1.5 font-bold">Search Database Keyword</label>
                <div className="relative flex items-center">
                  <Search className="absolute left-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by alias, occupation, why join..."
                    className="w-full bg-mrd-black border border-mrd-red/15 focus:border-mrd-crimson focus:outline-none rounded pl-10 pr-3 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[8px] uppercase tracking-wider text-gray-500 mb-1.5 font-bold">Operational State</label>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="bg-mrd-black border border-mrd-red/15 focus:border-mrd-crimson focus:outline-none rounded px-3 py-2.5 text-xs text-white"
                >
                  <option value="">-- ALL STATES --</option>
                  {indianStates.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[8px] uppercase tracking-wider text-gray-500 mb-1.5 font-bold">Clearance Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-mrd-black border border-mrd-red/15 focus:border-mrd-crimson focus:outline-none rounded px-3 py-2.5 text-xs text-white"
                >
                  <option value="">-- ALL STATUS --</option>
                  <option value="Pending">Pending Queue</option>
                  <option value="Approved">Approved Node</option>
                  <option value="Rejected">Rejected Node</option>
                </select>
              </div>

            </div>

            {/* Actions panel */}
            <div className="flex justify-between items-center bg-[#0c0303]/20 border border-mrd-red/5 p-4 rounded text-xs text-gray-400">
              <span>ACTIVE DATABASE MATCHES: <strong className="text-white">{applicants.length} candidates</strong></span>
              <button
                onClick={handleExportCSV}
                className="bg-mrd-crimson hover:bg-mrd-brightRed border border-mrd-brightRed/30 text-white font-mono uppercase tracking-widest text-[9px] font-bold py-2.5 px-5 rounded transition-all flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV Database</span>
              </button>
            </div>

            {/* Applicants List Grid */}
            {loadingData ? (
              <div className="py-20 text-center text-gray-500 uppercase tracking-widest text-xs">
                Scanning queue database...
              </div>
            ) : applicants.length === 0 ? (
              <div className="py-20 text-center text-gray-600 border border-dashed border-mrd-red/10 rounded">
                No cohort logs matching standard filter constraints.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {applicants.map((app) => (
                  <div
                    key={app._id}
                    className={`border rounded p-6 relative overflow-hidden transition-all text-left flex flex-col justify-between ${app.status === 'Approved' ? 'border-emerald-500/25 bg-[#030c03]/30' : app.status === 'Rejected' ? 'border-mrd-red/25 bg-[#0c0303]/30' : 'border-mrd-red/10 bg-[#0c0303]/70 hover:border-mrd-crimson/25 shadow-metallic-glow'}`}
                  >
                    
                    {/* Badge top right */}
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <span className={`text-[8px] border px-2 py-0.5 rounded font-mono uppercase tracking-wider ${app.status === 'Approved' ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20' : app.status === 'Rejected' ? 'border-mrd-red/40 text-mrd-crimson bg-mrd-red/10' : 'border-gray-600 text-gray-400 bg-gray-900/20'}`}>
                        {app.status}
                      </span>
                      {app.anonymousMode && (
                        <span className="text-[8px] border border-mrd-crimson/30 text-mrd-crimson bg-[#060000] px-2 py-0.5 rounded font-mono tracking-widest uppercase">
                          ANONYMOUS
                        </span>
                      )}
                    </div>

                    {/* Meta information */}
                    <div className="mb-4">
                      <h4 className="text-sm font-black text-white tracking-wide uppercase font-sans mb-1">
                        {app.anonymousMode ? `[SECURITY_ALIAS]: @${app.username}` : `${app.name} (@${app.username})`}
                      </h4>
                      <p className="text-[9px] text-gray-500 font-mono">
                        LOCATION: {app.state.toUpperCase()} • OCCUPATION: {app.occupation.toUpperCase()}
                      </p>
                      {!app.anonymousMode && (
                        <p className="text-[9px] text-mrd-crimson font-mono mt-0.5">
                          SECURE CONTACT: {app.email}
                        </p>
                      )}
                    </div>

                    {/* Statement payload */}
                    <div className="border border-mrd-red/5 bg-[#080808]/80 rounded p-3 mb-4">
                      <p className="text-[10px] text-gray-400 font-mono tracking-wider leading-relaxed mb-2 font-bold uppercase text-[9px] text-gray-500">
                        ALIGNMENT STATEMENT LOG:
                      </p>
                      <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
                        "{app.whyJoin}"
                      </p>
                    </div>

                    {/* Skills list */}
                    {app.skills && app.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {app.skills.map((sk, idx) => (
                          <span key={idx} className="text-[8px] bg-mrd-red/10 border border-mrd-red/15 px-2 py-0.5 rounded text-gray-400">
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Clearance Actions buttons */}
                    <div className="flex justify-between items-center border-t border-mrd-red/5 pt-4 text-[9px]">
                      <span className="text-gray-500">CREATED: {new Date(app.createdAt).toLocaleString()}</span>
                      
                      <div className="flex space-x-3">
                        {app.status !== 'Approved' && (
                          <button
                            onClick={() => handleUpdateStatus(app._id, 'Approved')}
                            className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black py-1.5 px-3 rounded flex items-center space-x-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>[APPROVE_CLEARANCE]</span>
                          </button>
                        )}
                        {app.status !== 'Rejected' && (
                          <button
                            onClick={() => handleUpdateStatus(app._id, 'Rejected')}
                            className="bg-mrd-red/10 border border-mrd-red/30 text-mrd-crimson hover:bg-mrd-crimson hover:text-white py-1.5 px-3 rounded flex items-center space-x-1"
                          >
                            <XCircle className="w-3 h-3" />
                            <span>[REJECT_NODE]</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Analytics Command */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            
            {/* Cohort Stats summary */}
            <div className="border border-mrd-red/10 bg-[#0c0303] rounded p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white border-b border-mrd-red/10 pb-3 mb-6 flex items-center">
                <BarChart2 className="w-4 h-4 text-mrd-crimson mr-2" />State Operational Command
              </h3>

              <div className="h-[280px]">
                {stateChart.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500 text-xs">No database stats available yet.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stateChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                      <XAxis dataKey="name" stroke="#555" fontSize={10} />
                      <YAxis stroke="#555" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0c0303', border: '1px solid #dc143c', color: '#fff', fontFamily: 'monospace', fontSize: 10 }}
                      />
                      <Bar dataKey="count" fill="#dc143c" barSize={25} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Verification Pie */}
            <div className="border border-mrd-red/10 bg-[#0c0303] rounded p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white border-b border-mrd-red/10 pb-3 mb-6 flex items-center">
                <ShieldAlert className="w-4 h-4 text-mrd-crimson mr-2" />Clearance Queue Breakdown
              </h3>

              <div className="h-[280px] flex items-center justify-center relative">
                {stateChart.length === 0 ? (
                  <div className="text-gray-500 text-xs">No database stats available yet.</div>
                ) : (
                  <div className="w-full h-full flex flex-col sm:flex-row items-center justify-around">
                    <div className="w-[180px] h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusChart}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={75}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {statusChart.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0c0303', border: '1px solid #dc143c', color: '#fff', fontFamily: 'monospace', fontSize: 10 }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2 font-mono text-[10px] text-gray-400">
                      {statusChart.map((e, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                          <span>{e.name.toUpperCase()}: <strong className="text-white">{e.value}</strong></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Encrypted Tips */}
        {activeTab === 'tips' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white border-b border-mrd-red/10 pb-3 flex items-center">
              <MessageSquare className="w-4 h-4 text-mrd-crimson mr-2" />Cryptographic Broadcast Logs
            </h3>

            {contacts.length === 0 ? (
              <div className="py-20 text-center text-gray-600 border border-dashed border-mrd-red/10 rounded">
                No tip packets or inquiry records registered in this session context.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {contacts.map((con) => (
                  <div
                    key={con._id}
                    className={`border p-5 rounded relative overflow-hidden transition-all shadow-metallic-glow ${con.type === 'AnonymousTip' ? 'border-mrd-crimson bg-[#060000] crt-overlay' : 'border-mrd-red/10 bg-[#0c0303]'}`}
                  >
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <span className={`text-[8px] border px-2 py-0.5 rounded font-mono tracking-widest uppercase ${con.type === 'AnonymousTip' ? 'border-mrd-crimson/50 text-mrd-crimson bg-mrd-red/10' : 'border-gray-600 text-gray-500 bg-gray-900/10'}`}>
                        {con.type === 'AnonymousTip' ? 'CRITICAL_OSINT_TIP' : 'GENERAL_INQUIRY'}
                      </span>
                    </div>

                    {/* Metadata Header */}
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-white font-mono uppercase">
                        {con.type === 'AnonymousTip' ? 'ANONYMOUS BROADCASTER ID-X' : `${con.name} (${con.email})`}
                      </h4>
                      <p className="text-[8px] text-gray-500 font-mono mt-0.5">
                        BROADCASTED: {new Date(con.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Message Payload */}
                    <div className="border border-mrd-red/5 bg-[#080808]/90 rounded p-4">
                      <p className={`text-xs leading-relaxed font-sans ${con.type === 'AnonymousTip' ? 'text-emerald-400 font-mono' : 'text-gray-300'}`}>
                        "{con.message}"
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
