import ScaleVisualizer from './components/ScaleVisualizer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <header className="mb-8 border-b border-slate-700 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Rocket Scale & Capability Dashboard</h1>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: List/Filters */}
        <section className="lg:col-span-3 border border-slate-800 rounded-xl p-4 bg-slate-800/50">
          <h2 className="text-xl font-semibold mb-4">Vehicles</h2>
          <p className="text-sm text-slate-400">List component pending...</p>
        </section>

        {/* Center Stage: Scale Visualizer */}
        <section className="lg:col-span-6 border border-slate-800 rounded-xl p-8 bg-slate-800/50 flex flex-col">
          <h2 className="text-xl font-semibold mb-8 text-center text-slate-300">Scale Comparison</h2>
          <ScaleVisualizer />
        </section>

        {/* Right Column: Telemetry/Data */}
        <section className="lg:col-span-3 border border-slate-800 rounded-xl p-4 bg-slate-800/50">
          <h2 className="text-xl font-semibold mb-4">Telemetry</h2>
          <p className="text-sm text-slate-400">Data cards pending...</p>
        </section>
      </main>
    </div>
  )
}