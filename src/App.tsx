import { useState } from 'react';
import ScaleVisualizer from './components/ScaleVisualizer';
import VehicleList from './components/VehicleList';
import TelemetryCards from './components/TelemetryCards';
import { rockets } from './data/rockets';

export default function App() {
  const [activeRocketId, setActiveRocketId] = useState(rockets[0].id);

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-b from-slate-900 to-black text-slate-50 selection:bg-cyan-500/30">
      
      {/* 1. Official Navigation Bar */}
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              R
            </div>
            <span className="font-semibold tracking-wide text-lg">AeroScale</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="text-cyan-400">Dashboard</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Vehicles</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Agencies</a>
            <a href="#" className="hover:text-slate-200 transition-colors">About</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 2. Hero Section */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
            Launch Vehicle Database
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Compare scale, evaluate payload capabilities, and analyze orbital telemetry for historical and modern spacecraft. Select a vehicle below to begin.
          </p>
        </header>

        {/* 3. Upgraded Dashboard Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: List */}
          <section className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Fleet Selection</h2>
                <span className="text-xs font-mono text-cyan-500/70">{rockets.length} ACTIVE</span>
              </div>
              <VehicleList activeRocketId={activeRocketId} setActiveRocketId={setActiveRocketId} />
            </div>
          </section>

          {/* Middle Column: Visualizer */}
          <section className="lg:col-span-6 bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col min-h-[600px] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 text-center mb-8 relative z-10">
              Scale Comparison
            </h2>
            <div className="flex-grow flex items-end relative z-10">
              <ScaleVisualizer activeRocketId={activeRocketId} setActiveRocketId={setActiveRocketId} />
            </div>
          </section>

          {/* Right Column: Telemetry */}
          <section className="lg:col-span-3">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Live Telemetry</h2>
              <TelemetryCards activeRocketId={activeRocketId} />
            </div>
          </section>

        </main>
      </div>
      
      {/* 4. Footer */}
      <footer className="border-t border-white/5 mt-20 py-8 text-center text-sm text-slate-600">
        <p>© {new Date().getFullYear()} AeroScale Analytics. Data is for demonstration purposes.</p>
      </footer>
    </div>
  );
}