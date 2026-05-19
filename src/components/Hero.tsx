import { ArrowRight, BookOpen, Wrench, BarChart2 } from 'lucide-react';

const quickLinks = [
  { icon: BookOpen, label: 'PC Parts', desc: 'Learn every component', href: '#pc-parts', color: 'text-cyan-400' },
  { icon: Wrench, label: 'Build Guides', desc: 'Step-by-step tutorials', href: '#pc-building', color: 'text-blue-400' },
  { icon: BarChart2, label: 'Comparisons', desc: 'AMD vs Intel & more', href: '#differences', color: 'text-teal-400' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          Beginner-Friendly PC Building Guide
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          Build Your Dream{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            PC
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          PCMG is your complete guide to understanding PC components, building your own rig, and
          making informed choices between hardware options.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#pc-parts"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5"
          >
            Start Learning
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#pc-building"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            Build Guide
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {quickLinks.map(({ icon: Icon, label, desc, href, color }) => (
            <a
              key={href}
              href={href}
              className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-200 hover:-translate-y-1 text-left"
            >
              <Icon className={`w-8 h-8 ${color} mb-3 group-hover:scale-110 transition-transform`} />
              <div className="text-white font-semibold mb-1">{label}</div>
              <div className="text-slate-400 text-sm">{desc}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs">
        <span>Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}
