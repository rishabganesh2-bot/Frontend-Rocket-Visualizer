// 1. We put the type right here at the top
export interface Rocket {
  id: string;
  name: string;
  era: string;
  reusable: boolean;
  dimensions: { height_m: number; diameter_m: number };
  performance: { payload_leo_kg: number; thrust_sl_kN: number };
  economics: { cost_per_launch_usd: number };
  timeline: Array<{ event: string; time_sec: number }>;
}

// 2. We export the data array using that exact type
export const rockets: Rocket[] = [
  {
    id: "saturn-v",
    name: "Saturn V",
    era: "Apollo",
    reusable: false,
    dimensions: { height_m: 110.6, diameter_m: 10.1 },
    performance: { payload_leo_kg: 140000, thrust_sl_kN: 34500 },
    economics: { cost_per_launch_usd: 1250000000 },
    timeline: [
      { event: "Liftoff", time_sec: 0 },
      { event: "Max Q", time_sec: 84 },
      { event: "S-IC MECO", time_sec: 161 },
      { event: "Stage 1 Separation", time_sec: 163 }
    ]
  },
  {
    id: "falcon-9",
    name: "Falcon 9",
    era: "Modern Commercial",
    reusable: true,
    dimensions: { height_m: 70.0, diameter_m: 3.7 },
    performance: { payload_leo_kg: 22800, thrust_sl_kN: 7607 },
    economics: { cost_per_launch_usd: 67000000 },
    timeline: [
      { event: "Liftoff", time_sec: 0 },
      { event: "Max Q", time_sec: 72 },
      { event: "MECO", time_sec: 150 },
      { event: "Stage Separation", time_sec: 153 }
    ]
  }
];