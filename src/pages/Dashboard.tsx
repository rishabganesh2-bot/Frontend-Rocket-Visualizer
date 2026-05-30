import { useState } from 'react';
import ScaleVisualizer from '../components/ScaleVisualizer';
import VehicleList from '../components/VehicleList';
import TelemetryCards from '../components/TelemetryCards';
import TrajectoryChart from '../components/TrajectoryChart';
import { rockets } from '../data/rockets';

export default function Dashboard() {
  const [activeRocketId, setActiveRocketId] = useState(rockets[0].id);

  const avgLaunchCost = rockets.reduce((acc, r) => acc + r.economics.cost_per_launch_usd, 0) / rockets.length;
  const maxPayload = Math.max(...rockets.map(r => r.performance.payload_leo_kg));

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-b from-slate-900 to-black text-slate-50 selection:bg-cyan-500/30 pb-20 overflow-x-hidden">
      
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50 animate-fade-up">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              A
            </div>
            <span className="font-semibold tracking-wide text-lg">AeroScale</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Vehicles</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6">
        
        <header className="text-center pt-24 pb-16 relative border-b border-white/5 mb-12 animate-fade-up delay-100">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-600 drop-shadow-sm relative z-10">
            Launch Vehicle Database
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed mb-10 relative z-10">
            Compare physical scale, evaluate orbital trajectory profiles, and analyze telemetry for historical and modern spacecraft.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 relative z-10">
            <div className="bg-black/40 border border-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-xl hover:-translate-y-1 transition-transform cursor-default">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-300">Active Fleet: <span className="text-white font-mono">{rockets.length}</span></span>
            </div>
            <div className="bg-black/40 border border-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-xl hover:-translate-y-1 transition-transform cursor-default">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm font-medium text-slate-300">Max Capacity: <span className="text-white font-mono">{(maxPayload / 1000).toFixed(0)}t LEO</span></span>
            </div>
            <div className="bg-black/40 border border-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-xl hover:-translate-y-1 transition-transform cursor-default">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-slate-300">Avg Cost: <span className="text-white font-mono">${(avgLaunchCost / 1000000).toFixed(0)}M</span></span>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <section className="lg:col-span-3 flex flex-col gap-4 animate-fade-up delay-200">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-sm shadow-xl hover:border-white/20 transition-colors duration-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Fleet Selection</h2>
              </div>
              <VehicleList activeRocketId={activeRocketId} setActiveRocketId={setActiveRocketId} />
            </div>
          </section>

          <section className="lg:col-span-6 bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col relative overflow-hidden animate-fade-up delay-300 hover:border-white/20 transition-colors duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.5)] pointer-events-none animate-hud-scan z-0" />
            
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 text-center mb-8 relative z-10">
              Scale Comparison
            </h2>
            <div className="flex-grow flex items-end relative z-10">
              <ScaleVisualizer activeRocketId={activeRocketId} setActiveRocketId={setActiveRocketId} />
            </div>
            <TrajectoryChart activeRocketId={activeRocketId} /> 
          </section>

          <section className="lg:col-span-3 animate-fade-up delay-400">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-sm shadow-xl hover:border-white/20 transition-colors duration-500">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Live Telemetry</h2>
              <TelemetryCards activeRocketId={activeRocketId} />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}