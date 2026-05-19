import { BarChart2 } from 'lucide-react';

interface ComparisonItem {
  label: string;
  aValue: string;
  bValue: string;
  winner?: 'a' | 'b' | 'tie';
}

interface Comparison {
  id: string;
  titleA: string;
  titleB: string;
  colorA: string;
  colorB: string;
  bgA: string;
  bgB: string;
  summary: string;
  verdict: string;
  verdictWinner: 'a' | 'b' | 'context';
  rows: ComparisonItem[];
}

const comparisons: Comparison[] = [
  {
    id: 'cpu',
    titleA: 'AMD',
    titleB: 'Intel',
    colorA: 'text-red-400',
    colorB: 'text-blue-400',
    bgA: 'bg-red-500/10 border-red-500/30',
    bgB: 'bg-blue-500/10 border-blue-500/30',
    summary:
      'AMD and Intel are the two CPU manufacturers for desktop PCs. They compete closely and both offer excellent processors at every price point.',
    verdict:
      'For most users, choose AMD Ryzen for better multi-core performance and value. Choose Intel Core if you need the absolute best single-core gaming performance or are using a platform with existing Intel coolers.',
    verdictWinner: 'context',
    rows: [
      { label: 'Multi-core Performance', aValue: 'Excellent — more cores for the price', bValue: 'Great — fewer cores, slightly less value', winner: 'a' },
      { label: 'Single-core / Gaming', aValue: 'Very good', bValue: 'Marginally faster in some titles', winner: 'b' },
      { label: 'Power Efficiency', aValue: 'Very efficient (TSMC 5nm/4nm)', bValue: 'Improving with Intel 4 process', winner: 'a' },
      { label: 'Platform Cost', aValue: 'Lower overall platform cost', bValue: 'Motherboards often cost more', winner: 'a' },
      { label: 'Overclocking', aValue: 'All Ryzen CPUs unlocked', bValue: 'Only K-series CPUs unlocked', winner: 'a' },
      { label: 'Integrated Graphics', aValue: 'Most have iGPU (Radeon)', bValue: 'Strong Intel Xe iGPU', winner: 'tie' },
      { label: 'Cooler Included', aValue: 'Yes, Wraith coolers on many SKUs', bValue: 'Only on some non-K CPUs', winner: 'a' },
      { label: 'Best For', aValue: 'Productivity, streaming, multi-tasking', bValue: 'Highest FPS gaming, certain workloads', winner: 'tie' },
    ],
  },
  {
    id: 'ram',
    titleA: 'DDR4',
    titleB: 'DDR5',
    colorA: 'text-cyan-400',
    colorB: 'text-teal-400',
    bgA: 'bg-cyan-500/10 border-cyan-500/30',
    bgB: 'bg-teal-500/10 border-teal-500/30',
    summary:
      'DDR4 and DDR5 are generations of RAM. DDR5 is newer, faster, and more expensive. Your motherboard and CPU determine which generation you can use.',
    verdict:
      'If building new: DDR5 is worth it on newer platforms (AM5, Intel 12th gen+) for future-proofing and bandwidth. DDR4 is cheaper and still very capable for older platforms.',
    verdictWinner: 'context',
    rows: [
      { label: 'Speed (typical)', aValue: '2400–5000 MHz', bValue: '4800–8000+ MHz', winner: 'b' },
      { label: 'Bandwidth', aValue: '~50 GB/s', bValue: '~100+ GB/s', winner: 'b' },
      { label: 'Latency', aValue: 'Lower latency at same frequency', bValue: 'Higher latency, improving over time', winner: 'a' },
      { label: 'Price per GB', aValue: 'Very affordable', bValue: '20–40% more expensive', winner: 'a' },
      { label: 'Availability', aValue: 'Widely available everywhere', bValue: 'Common but fewer budget options', winner: 'a' },
      { label: 'Voltage', aValue: '1.2V standard', bValue: '1.1V standard (more efficient)', winner: 'b' },
      { label: 'On-die ECC', aValue: 'No', bValue: 'Yes (better stability)', winner: 'b' },
      { label: 'Future-proof', aValue: 'Being phased out', bValue: 'Current standard for new builds', winner: 'b' },
    ],
  },
  {
    id: 'storage',
    titleA: 'SSD',
    titleB: 'HDD',
    colorA: 'text-green-400',
    colorB: 'text-orange-400',
    bgA: 'bg-green-500/10 border-green-500/30',
    bgB: 'bg-orange-500/10 border-orange-500/30',
    summary:
      'SSDs use flash memory for fast, silent storage. HDDs use spinning magnetic platters for cheap, high-capacity storage. Most modern builds use both.',
    verdict:
      'Always use an NVMe SSD as your primary drive for the OS and games. Add a large HDD only if you need affordable bulk storage (photos, video archives, backups).',
    verdictWinner: 'context',
    rows: [
      { label: 'Read Speed', aValue: 'NVMe: up to 7000 MB/s, SATA: 550 MB/s', bValue: '80–160 MB/s', winner: 'a' },
      { label: 'Write Speed', aValue: 'NVMe: up to 6500 MB/s, SATA: 520 MB/s', bValue: '80–160 MB/s', winner: 'a' },
      { label: 'Price per GB', aValue: '$0.07–$0.12 per GB', bValue: '$0.02–$0.03 per GB', winner: 'b' },
      { label: 'Max Capacity', aValue: 'Up to 8TB (mainstream 1–4TB)', bValue: 'Up to 20TB (mainstream 2–8TB)', winner: 'b' },
      { label: 'Boot Time', aValue: '5–15 seconds', bValue: '30–60 seconds', winner: 'a' },
      { label: 'Noise', aValue: 'Completely silent', bValue: 'Audible spinning/clicking', winner: 'a' },
      { label: 'Shock Resistance', aValue: 'No moving parts — very durable', bValue: 'Fragile when reading/writing', winner: 'a' },
      { label: 'Lifespan', aValue: 'TBW rating (300–3000TB typically)', bValue: '3–5 years average MTBF', winner: 'tie' },
    ],
  },
];

const winnerLabel: Record<string, string> = {
  a: 'Advantage',
  b: 'Advantage',
  tie: 'Tie',
};

function ComparisonTable({ comp }: { comp: Comparison }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-3 border-b border-slate-700/50">
        <div className={`p-5 border ${comp.bgA} rounded-tl-2xl`}>
          <div className={`text-2xl font-extrabold ${comp.colorA}`}>{comp.titleA}</div>
        </div>
        <div className="p-5 bg-slate-800/60 flex items-center justify-center">
          <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">vs</span>
        </div>
        <div className={`p-5 border ${comp.bgB} rounded-tr-2xl text-right`}>
          <div className={`text-2xl font-extrabold ${comp.colorB}`}>{comp.titleB}</div>
        </div>
      </div>

      {/* Summary */}
      <div className="px-6 py-4 border-b border-slate-700/40">
        <p className="text-slate-400 text-sm leading-relaxed">{comp.summary}</p>
      </div>

      {/* Rows */}
      <div>
        {comp.rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 gap-0 ${
              i !== comp.rows.length - 1 ? 'border-b border-slate-700/30' : ''
            } hover:bg-slate-700/20 transition-colors`}
          >
            <div className={`p-4 ${row.winner === 'a' ? 'bg-green-500/5' : ''}`}>
              <p className={`text-sm ${row.winner === 'a' ? 'text-white font-medium' : 'text-slate-400'}`}>
                {row.aValue}
              </p>
            </div>
            <div className="p-4 flex items-center justify-center bg-slate-800/30">
              <span className="text-slate-500 text-xs font-medium text-center leading-tight">{row.label}</span>
            </div>
            <div className={`p-4 text-right ${row.winner === 'b' ? 'bg-green-500/5' : ''}`}>
              <p className={`text-sm ${row.winner === 'b' ? 'text-white font-medium' : 'text-slate-400'}`}>
                {row.bValue}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div className="p-6 border-t border-slate-700/50 bg-slate-800/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
            <BarChart2 className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Verdict</div>
            <p className="text-slate-300 text-sm leading-relaxed">{comp.verdict}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Differences() {
  return (
    <section id="differences" className="py-24 bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-medium mb-6">
            <BarChart2 className="w-4 h-4" />
            Comparisons
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Differences & Comparisons
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Unsure which hardware to choose? These side-by-side comparisons break down the key
            differences to help you make the right decision.
          </p>
        </div>

        <div className="space-y-8">
          {comparisons.map((comp) => (
            <div key={comp.id}>
              <ComparisonTable comp={comp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
