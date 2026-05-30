import { useState } from 'react';
import rockets from '../data/rockets.json';

export default function ScaleVisualizer() {
  // Local state to track which rocket is clicked
  const [activeRocket, setActiveRocket] = useState(rockets[0].id);

  // Find the tallest rocket in the dataset to act as the 100% height ceiling
  const maxHeight = Math.max(...rockets.map(r => r.dimensions.height_m));

  return (
    <div className="flex items-end justify-center gap-8 w-full h-[50vh] pb-4 border-b-2 border-slate-700">
      {rockets.map((rocket) => {
        // Calculate dynamic height based on the tallest vehicle
        const heightPercent = (rocket.dimensions.height_m / maxHeight) * 100;
        const isActive = activeRocket === rocket.id;
        
        // Scale the diameter for visual representation (multiplier adjusts thickness)
        const visualWidth = rocket.dimensions.diameter_m * 4; 

        return (
          <div
            key={rocket.id}
            onClick={() => setActiveRocket(rocket.id)}
            className="group flex flex-col items-center justify-end cursor-pointer h-full"
          >
            {/* Height Label */}
            <div className={`text-xs font-mono mb-2 transition-opacity ${
              isActive ? 'opacity-100 text-cyan-400' : 'opacity-0 group-hover:opacity-100 text-slate-400'
            }`}>
              {rocket.dimensions.height_m}m
            </div>

            {/* Rocket Silhouette Placeholder */}
            <div
              style={{ 
                height: `${heightPercent}%`, 
                width: `${visualWidth}px` 
              }}
              className={`rounded-t-full transition-all duration-300 ${
                isActive 
                  ? 'bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                  : 'bg-slate-600 group-hover:bg-slate-500'
              }`}
            />

            {/* Name Label */}
            <div className={`mt-4 text-sm font-bold tracking-wide transition-colors ${
              isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
            }`}>
              {rocket.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}