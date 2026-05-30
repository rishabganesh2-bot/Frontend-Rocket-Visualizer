import { rockets } from '../data/rockets';

interface TelemetryCardsProps {
  activeRocketId: string;
}

export default function TelemetryCards({ activeRocketId }: TelemetryCardsProps) {
  const rocket = rockets.find((r) => r.id === activeRocketId);

  if (!rocket) return null;

  const maxPayload = 150000; 
  const maxThrust = 40000;

  const payloadPercent = Math.min((rocket.performance.payload_leo_kg / maxPayload) * 100, 100);
  const thrustPercent = Math.min((rocket.performance.thrust_sl_kN / maxThrust) * 100, 100);

  const fleetAvgPayload = rockets.reduce((acc, r) => acc + r.performance.payload_leo_kg, 0) / rockets.length;
  const payloadDiff = ((rocket.performance.payload_leo_kg - fleetAvgPayload) / fleetAvgPayload) * 100;
  
  const fleetAvgCost = rockets.reduce((acc, r) => acc + r.economics.cost_per_launch_usd, 0) / rockets.length;
  const costDiff = ((rocket.economics.cost_per_launch_usd - fleetAvgCost) / fleetAvgCost) * 100;

  return (
    <div key={activeRocketId} className="flex flex-col gap-6 animate-data-glitch">
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-slate-400 text-xs">Payload to LEO</span>
          <span className="font-mono text-cyan-400 text-sm">{rocket.performance.payload_leo_kg.toLocaleString()} kg</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-500" 
            style={{ width: `${payloadPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-baseline mt-4 mb-2">
          <span className="text-slate-400 text-xs">Thrust (Sea Level)</span>
          <span className="font-mono text-cyan-400 text-sm">{rocket.performance.thrust_sl_kN.toLocaleString()} kN</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500" 
            style={{ width: `${thrustPercent}%` }}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-slate-400 text-xs">Launch Cost</span>
          <span className="font-mono text-green-400 text-sm">
            ${(rocket.economics.cost_per_launch_usd / 1000000).toFixed(1)}M
          </span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-slate-400 text-xs">Architecture</span>
          {rocket.reusable ? (
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded border border-emerald-500/20">
              Reusable
            </span>
          ) : (
            <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded border border-amber-500/20">
              Expendable
            </span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">Nominal Timeline</h3>
        <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-[3px] before:w-[1px] before:bg-slate-700/50">
          {rocket.timeline.map((event, index) => (
            <div key={index} className="flex justify-between items-start pl-5 relative">
              <div className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full bg-cyan-500 ring-4 ring-[#0f172a] shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              <span className="text-slate-300 text-xs">{event.event}</span>
              <span className="font-mono text-slate-500 text-xs">T+{event.time_sec}s</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Analytics Insight</h3>
        <div className="bg-slate-900/50 rounded-lg p-3 border border-white/5 space-y-2">
          <div className="text-xs text-slate-300 leading-relaxed">
            Capacity is <span className={`font-bold ${payloadDiff >= 0 ? 'text-green-400' : 'text-amber-400'}`}>{Math.abs(payloadDiff).toFixed(0)}% {payloadDiff >= 0 ? 'above' : 'below'}</span> fleet average.
          </div>
          <div className="text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-2">
            Cost is <span className={`font-bold ${costDiff <= 0 ? 'text-green-400' : 'text-amber-400'}`}>{Math.abs(costDiff).toFixed(0)}% {costDiff <= 0 ? 'cheaper' : 'more expensive'}</span> than fleet average.
          </div>
        </div>
      </div>
      
    </div>
  );
}