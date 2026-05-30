import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const capabilities = ["Orbital Trajectories", "Payload Telemetry", "Fleet Analytics", "Launch Economics"];
  const [capabilityIndex, setCapabilityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCapabilityIndex((prev) => (prev + 1) % capabilities.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [capabilities.length]);

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      
      {/* Dynamic Background: Rushing Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          const duration = Math.random() * 2 + 1;
          const delay = Math.random() * 2;
          return (
            <div
              key={i}
              className="absolute bg-cyan-100 rounded-full animate-star-fall shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              style={{
                width: `${size}px`,
                height: `${size * 3}px`,
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Copy & Call to Action */}
        <div className="animate-fade-up">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            AeroScale System v2.0
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Data-Driven
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Spaceflight.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mb-8">
            The most comprehensive open-source database for evaluating scale, economics, and telemetry for modern launch vehicles. 
          </p>

          <div className="h-12 mb-10 overflow-hidden relative border-l-2 border-cyan-500 pl-4">
            <span className="block text-sm text-slate-500 font-mono mb-1 uppercase tracking-widest">Simulate & Analyze</span>
            <div key={capabilityIndex} className="animate-fade-up text-xl font-semibold text-slate-200">
              {capabilities[capabilityIndex]}
            </div>
          </div>

          <Link 
            to="/dashboard" 
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-slate-950 bg-cyan-400 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-sm">
              Initialize Dashboard
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Right Column: High-Fidelity SVG Rocket VTVL Animation */}
        <div className="hidden lg:flex items-end justify-center relative h-[700px] animate-fade-up delay-200 border-b-2 border-slate-800/80 pb-6">
          
          {/* The Rocket Container (Handles Altitude Physics) */}
          <div className="relative z-20 flex flex-col items-center animate-landing-cycle w-32 origin-bottom">
            
            {/* Highly detailed vector blueprint of a multi-core heavy launch vehicle */}
            <svg viewBox="0 0 120 380" className="w-full h-auto drop-shadow-[0_25px_25px_rgba(0,0,0,0.8)] relative z-30 overflow-visible">
              <defs>
                <linearGradient id="booster-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="30%" stopColor="#f8fafc" />
                  <stop offset="70%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
                <linearGradient id="shading-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Side Booster Left */}
              <path d="M25 110 C25 110 35 130 35 150 L35 320 L15 320 L15 150 C15 130 25 110 25 110 Z" fill="url(#booster-gradient)" />
              <path d="M25 110 C25 110 35 130 35 150 L35 320 L15 320 L15 150 C15 130 25 110 25 110 Z" fill="url(#shading-gradient)" />
              <path d="M12 320 L15 340 L22 340 L20 320 Z" fill="#0f172a" />
              <path d="M28 320 L26 340 L33 340 L36 320 Z" fill="#0f172a" />
              <polygon points="15,180 35,180" stroke="#475569" strokeWidth="2" />
              <polygon points="15,280 35,280" stroke="#475569" strokeWidth="2" />
              
              {/* Side Booster Right */}
              <path d="M95 110 C95 110 105 130 105 150 L105 320 L85 320 L85 150 C85 130 95 110 95 110 Z" fill="url(#booster-gradient)" />
              <path d="M95 110 C95 110 105 130 105 150 L105 320 L85 320 L85 150 C85 130 95 110 95 110 Z" fill="url(#shading-gradient)" />
              <path d="M82 320 L85 340 L92 340 L90 320 Z" fill="#0f172a" />
              <path d="M98 320 L96 340 L103 340 L106 320 Z" fill="#0f172a" />
              <polygon points="85,180 105,180" stroke="#475569" strokeWidth="2" />
              <polygon points="85,280 105,280" stroke="#475569" strokeWidth="2" />

              {/* Center Core Interstage & Fairing */}
              <path d="M60 10 C60 10 80 40 80 90 L80 320 L40 320 L40 90 C40 40 60 10 60 10 Z" fill="url(#booster-gradient)" />
              {/* Complex shadow mask overlay for photographic depth */}
              <path d="M60 10 C60 10 80 40 80 90 L80 320 L40 320 L40 90 C40 40 60 10 60 10 Z" fill="url(#shading-gradient)" />

              {/* Grid Fins (Landing Systems) */}
              <rect x="36" y="95" width="8" height="6" fill="#334155" rx="1" />
              <rect x="76" y="95" width="8" height="6" fill="#334155" rx="1" />

              {/* United States Branding details */}
              <rect x="58" y="140" width="4" height="15" fill="#f1f5f9" />
              <rect x="58" y="143" width="4" height="2" fill="#ef4444" />
              <rect x="58" y="147" width="4" height="2" fill="#ef4444" />
              <rect x="58" y="151" width="4" height="2" fill="#3b82f6" />

              {/* Main Core Engine Structural Base */}
              <path d="M43 320 L46 345 L74 345 L77 320 Z" fill="#0f172a" />
              <rect x="49" y="345" width="6" height="8" fill="#1e293b" />
              <rect x="57" y="345" width="6" height="8" fill="#1e293b" />
              <rect x="65" y="345" width="6" height="8" fill="#1e293b" />

              {/* Landing Legs (Deployed Configuration) */}
              <path d="M40 290 L10 340 L25 345 L40 315 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <path d="M80 290 L110 340 L95 345 L80 315 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            </svg>

            {/* Exhaust Plumes (Handles Kinetic Thrust Scaling) */}
            <div className="absolute top-[92%] left-1/2 -translate-x-1/2 flex flex-col items-center w-full z-10 animate-suicide-burn mix-blend-screen pointer-events-none">
                {/* Shock diamond core */}
                <div className="w-3 h-32 bg-white rounded-full blur-[2px] absolute top-0 z-30" />
                {/* Inner intense flame */}
                <div className="w-12 h-60 bg-gradient-to-b from-cyan-100 via-blue-400 to-transparent blur-md absolute top-0 z-20" />
                {/* Outer ambient thrust */}
                <div className="w-24 h-96 bg-gradient-to-b from-blue-600 via-cyan-900 to-transparent blur-xl absolute top-0 z-10 opacity-70" />
            </div>
          </div>

          {/* Launchpad Ambient Glow */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none mix-blend-screen animate-plume-glow z-10" />

          {/* Minimalist Drone Ship / Autonomous Landing Platform */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-6 bg-slate-900 border-t-2 border-slate-700 rounded-t-lg flex justify-between px-6 pt-1 z-30 shadow-2xl">
              <div className="w-2 h-full bg-slate-800 rounded-t-sm" />
              <div className="w-8 h-2 bg-slate-700 rounded-full mt-2" />
              <div className="w-2 h-full bg-slate-800 rounded-t-sm" />
          </div>
        </div>

      </div>
    </div>
  );
}