import { type Rocket, rockets } from '../data/rockets';

interface VehicleListProps {
  activeRocketId: string;
  setActiveRocketId: (id: string) => void;
}

export default function VehicleList({ activeRocketId, setActiveRocketId }: VehicleListProps) {
  return (
    <div className="flex flex-col gap-2">
      {rockets.map((rocket) => {
        const isActive = rocket.id === activeRocketId;
        return (
          <button
            key={rocket.id}
            onClick={() => setActiveRocketId(rocket.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors cursor-pointer ${
              isActive 
                ? 'bg-cyan-950 border border-cyan-500 text-cyan-400' 
                : 'bg-slate-800 border border-transparent hover:bg-slate-750 text-slate-300'
            }`}
          >
            <div className="font-semibold">{rocket.name}</div>
            <div className="text-xs text-slate-400">{rocket.era}</div>
          </button>
        );
      })}
    </div>
  );
}