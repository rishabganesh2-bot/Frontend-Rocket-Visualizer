import { useState } from 'react';
import { type Rocket, rockets } from '../data/rockets';

interface TrajectoryChartProps {
  activeRocketId: string;
}

interface ChartPoint {
  event: string;
  time: number;
  altitude: number; // in km
}

export default function TrajectoryChart({ activeRocketId }: TrajectoryChartProps) {
  const rocket = rockets.find((r) => r.id === activeRocketId);
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);

  if (!rocket) return null;

  // Map nominal timeline events to approximate telemetry altitudes for rendering
  const getAltitudeForEvent = (event: string): number => {
    const name = event.toLowerCase();
    if (name.includes('liftoff')) return 0;
    if (name.includes('max q')) return 12;
    if (name.includes('meco')) return 64;
    if (name.includes('separation')) return 68;
    return 35;
  };

  const points: ChartPoint[] = rocket.timeline.map((t) => ({
    event: t.event,
    time: t.time_sec,
    altitude: getAltitudeForEvent(t.event),
  }));

  // Fixed SVG Canvas view dimensions
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const maxTime = Math.max(...points.map((p) => p.time));
  const maxAltitude = 80; // Top bounding altitude box (80 km)

  // Map coordinates to fitting paths inside the SVG grid
  const svgPoints = points.map((p) => {
    const x = paddingX + (p.time / maxTime) * (width - paddingX * 2);
    const y = height - paddingY - (p.altitude / maxAltitude) * (height - paddingY * 2);
    return { ...p, x, y };
  });

  const pathD = svgPoints.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  );

  return (
    <div className="mt-8 border-t border-white/5 pt-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Estimated Ascent Profile
        </h3>
        <span className="text-[10px] font-mono text-slate-500">HOVER NODES FOR DATA</span>
      </div>

      <div className="relative bg-black/30 border border-white/5 rounded-xl p-4 overflow-hidden group">
        {/* Dynamic Telemetry Tooltip Overlay */}
        <div className={`absolute top-4 right-4 bg-slate-950/90 border border-cyan-500/20 backdrop-blur-md rounded-lg p-3 text-xs font-mono transition-opacity duration-200 ${hoveredPoint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="text-cyan-400 font-bold mb-1">{hoveredPoint?.event}</div>
          <div className="text-slate-400">Time: <span className="text-slate-200">T+{hoveredPoint?.time}s</span></div>
          <div className="text-slate-400">Altitude: <span className="text-slate-200">{hoveredPoint?.altitude} km</span></div>
        </div>

        {/* Scalable SVG Render Box */}
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Horizontal Grid Altitude Lines */}
          {[20, 40, 60, 80].map((alt) => {
            const y = height - paddingY - (alt / maxAltitude) * (height - paddingY * 2);
            return (
              <g key={alt}>
                <line 
                  x1={paddingX} 
                  y1={y} 
                  x2={width - paddingX} 
                  y2={y} 
                  className="stroke-slate-800/60 stroke-1" 
                  strokeDasharray="4 4" 
                />
                <text 
                  x={paddingX - 10} 
                  y={y + 3} 
                  className="fill-slate-600 text-[10px] font-mono" 
                  textAnchor="end"
                >
                  {alt}km
                </text>
              </g>
            );
          })}

          {/* Main X Axis Baseline */}
          <line 
            x1={paddingX} 
            y1={height - paddingY} 
            x2={width - paddingX} 
            y2={height - paddingY} 
            className="stroke-slate-800 stroke-1" 
          />
          
          {/* Profile Spline Vector Path */}
          <path 
            d={pathD} 
            fill="none" 
            className="stroke-cyan-500 stroke-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)] transition-all duration-300" 
          />

          {/* Interactive Coordinates */}
          {svgPoints.map((p, i) => {
            const isHovered = hoveredPoint?.event === p.event;
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={isHovered ? 6 : 4}
                className={`fill-slate-950 stroke-cyan-400 stroke-2 cursor-pointer transition-all duration-150 ${isHovered ? 'scale-120 shadow-lg' : ''}`}
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}

          {/* Time Limit Boundary Anchors */}
          <text x={paddingX} y={height - 10} className="fill-slate-600 text-[10px] font-mono">T+0s</text>
          <text x={width - paddingX} y={height - 10} className="fill-slate-600 text-[10px] font-mono" textAnchor="end">
            T+{maxTime}s
          </text>
        </svg>
      </div>
    </div>
  );
}