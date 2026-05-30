import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 bg-gradient-to-b from-slate-900 to-black text-slate-50 selection:bg-cyan-500/30 overflow-x-hidden">
        
        {/* Global Navigation */}
        <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50 animate-fade-up">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                A
              </div>
              <span className="font-semibold tracking-wide text-lg">AeroScale</span>
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
              <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link>
              <Link to="/dashboard" className="hover:text-slate-200 transition-colors">Vehicles</Link>
            </div>
          </div>
        </nav>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </div>
    </Router>
  );
}