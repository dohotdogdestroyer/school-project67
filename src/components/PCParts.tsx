import { useState } from 'react';
import { Cpu, Monitor, MemoryStick, CircuitBoard, Zap, HardDrive, Box, Wind, ChevronDown, ChevronUp } from 'lucide-react';

interface Part {
  id: string;
  icon: React.ElementType;
  name: string;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  explanation: string;
  whatItDoes: string;
  whyImportant: string;
  keyFacts: string[];
}

const parts: Part[] = [
  {
    id: 'cpu',
    icon: Cpu,
    name: 'CPU',
    subtitle: 'Central Processing Unit',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    explanation:
      'The CPU is the brain of your computer. It processes all instructions from software and coordinates everything the computer does.',
    whatItDoes:
      'Executes billions of calculations per second, handles logic operations, manages memory access, and runs the operating system and all applications.',
    whyImportant:
      'A faster CPU means your computer can handle more tasks simultaneously and run demanding software smoothly. It directly impacts how responsive your PC feels.',
    keyFacts: ['Measured in GHz (clock speed)', 'Cores allow multitasking (4, 6, 8, 12+ cores)', 'AMD and Intel are the two main brands', 'Generates significant heat — needs cooling'],
  },
  {
    id: 'gpu',
    icon: Monitor,
    name: 'GPU',
    subtitle: 'Graphics Processing Unit',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    explanation:
      'The GPU is a specialized processor designed to handle graphics and visual output. Modern GPUs also accelerate AI and scientific computing tasks.',
    whatItDoes:
      'Renders images, video, and animations to your display. In gaming, it calculates lighting, textures, and geometry in real time to produce smooth visuals.',
    whyImportant:
      'For gaming, video editing, or 3D rendering, the GPU is often the most important component. Without a dedicated GPU, complex visuals run poorly or not at all.',
    keyFacts: ['VRAM stores textures (4GB, 8GB, 16GB+)', 'NVIDIA (GeForce) and AMD (Radeon) are the main brands', 'Requires PCIe slot on motherboard', 'Usually the most expensive component for gaming builds'],
  },
  {
    id: 'ram',
    icon: MemoryStick,
    name: 'RAM',
    subtitle: 'Random Access Memory',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    explanation:
      'RAM is your computer\'s short-term memory. It temporarily stores data that the CPU is actively using, allowing quick access without reading from slower storage.',
    whatItDoes:
      'Holds the data for currently running programs. When you open a browser, game, or app, it loads into RAM so the CPU can access it instantly.',
    whyImportant:
      'Not enough RAM causes slowdowns and crashes. More RAM lets you run more programs at once and handle larger files without performance issues.',
    keyFacts: ['Common sizes: 8GB, 16GB, 32GB, 64GB', 'DDR4 and DDR5 are current standards', 'Speed measured in MHz (e.g., 3200MHz, 6000MHz)', 'Runs in dual-channel for better performance (2 sticks)'],
  },
  {
    id: 'motherboard',
    icon: CircuitBoard,
    name: 'Motherboard',
    subtitle: 'Main Logic Board',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    explanation:
      'The motherboard is the main circuit board that connects all components together. Every part in your PC communicates through the motherboard.',
    whatItDoes:
      'Provides slots and connectors for the CPU, RAM, GPU, storage, and all peripherals. It routes power and data signals between every component.',
    whyImportant:
      'You must choose a motherboard compatible with your CPU. It determines how many RAM slots, PCIe slots, and USB ports you have, along with overclocking support.',
    keyFacts: ['Form factors: ATX (full), mATX (mid), ITX (mini)', 'Must match your CPU socket (AM5 for AMD, LGA1851 for Intel)', 'Chipset determines feature set (B650, X670, Z790, etc.)', 'Has BIOS/UEFI for system configuration'],
  },
  {
    id: 'psu',
    icon: Zap,
    name: 'PSU',
    subtitle: 'Power Supply Unit',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    explanation:
      'The PSU converts AC power from your wall outlet into the stable DC power that your PC components need to operate safely.',
    whatItDoes:
      'Delivers precise voltages (12V, 5V, 3.3V) to every component through modular or hardwired cables. It also protects against power surges.',
    whyImportant:
      'An underpowered or low-quality PSU can damage your components or cause random shutdowns. It\'s the one component you should never cheap out on.',
    keyFacts: ['Measured in watts (500W, 650W, 850W+)', '80 Plus certification = efficiency rating (Bronze, Gold, Platinum)', 'Modular PSUs reduce cable clutter', 'Calculate required wattage with an online PSU calculator'],
  },
  {
    id: 'storage',
    icon: HardDrive,
    name: 'Storage',
    subtitle: 'SSD & HDD',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    explanation:
      'Storage devices hold your operating system, applications, and files permanently — even when the PC is powered off.',
    whatItDoes:
      'SSDs use flash memory for fast data access. HDDs use spinning magnetic platters for large, affordable storage. Most builds use both: SSD for the OS, HDD for files.',
    whyImportant:
      'Your storage type heavily affects boot times and load speeds. An SSD makes your entire system feel snappier, while HDDs provide cost-effective bulk storage.',
    keyFacts: ['NVMe SSDs (M.2) are the fastest (up to 7000 MB/s)', 'SATA SSDs are slower but still fast (550 MB/s)', 'HDDs are cheap per GB but slow (100-150 MB/s)', 'Typical sizes: 500GB, 1TB, 2TB, 4TB+'],
  },
  {
    id: 'case',
    icon: Box,
    name: 'Case',
    subtitle: 'PC Chassis',
    color: 'text-slate-300',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/30',
    explanation:
      'The PC case houses and protects all your components. It also plays a major role in airflow, noise levels, and the overall look of your build.',
    whatItDoes:
      'Provides mounting points for the motherboard, drives, PSU, and fans. Manages airflow to keep components cool and organizes cable routing.',
    whyImportant:
      'A good case improves cooling efficiency and makes the building process easier. Poor airflow leads to higher temperatures and reduced component lifespan.',
    keyFacts: ['Must match motherboard form factor (ATX, mATX, ITX)', 'Look for dust filters and cable management routing', 'Tower styles: Full, Mid, Mini tower', 'Tempered glass panels for showing off your build'],
  },
  {
    id: 'cooling',
    icon: Wind,
    name: 'Cooling',
    subtitle: 'Air & Liquid Cooling',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    explanation:
      'Cooling systems remove heat from your CPU (and GPU) to prevent thermal throttling and hardware damage. Every build needs adequate cooling.',
    whatItDoes:
      'Air coolers use heatsinks and fans to dissipate heat. Liquid coolers (AIO or custom loop) use water blocks, pumps, and radiators for more efficient cooling.',
    whyImportant:
      'Without proper cooling, your CPU will throttle performance or shut down to protect itself. Good cooling allows stable performance and longer component life.',
    keyFacts: ['Air coolers: simple, reliable, no leak risk', 'AIO liquid coolers: better cooling, sleek look', 'Custom water loops: maximum cooling, complex to build', 'Thermal paste must be applied between CPU and cooler'],
  },
];

function PartCard({ part }: { part: Part }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = part.icon;

  return (
    <div
      className={`group bg-slate-800/60 border ${part.borderColor} rounded-2xl overflow-hidden transition-all duration-300 hover:bg-slate-800/80 hover:shadow-xl`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 ${part.bgColor} rounded-xl flex-shrink-0`}>
              <Icon className={`w-6 h-6 ${part.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-bold text-lg">{part.name}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 ${part.bgColor} ${part.color} rounded-full`}>
                  {part.subtitle}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{part.explanation}</p>
            </div>
          </div>
          <div className="flex-shrink-0 mt-1">
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-slate-700/50 pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className={`p-4 ${part.bgColor} rounded-xl border ${part.borderColor}`}>
              <h4 className={`text-sm font-bold ${part.color} uppercase tracking-wider mb-2`}>What It Does</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{part.whatItDoes}</p>
            </div>
            <div className="p-4 bg-slate-700/40 rounded-xl border border-slate-600/40">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Why It Matters</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{part.whyImportant}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Facts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {part.keyFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${part.color} bg-current flex-shrink-0`} />
                  <span className="text-slate-400 text-sm">{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PCParts() {
  return (
    <section id="pc-parts" className="py-24 bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
            <Cpu className="w-4 h-4" />
            Hardware Overview
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            PC Parts Explained
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every PC is made of the same core components. Click any part below to learn exactly what
            it does and why you need it.
          </p>
        </div>

        <div className="space-y-4">
          {parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      </div>
    </section>
  );
}
