import { Cpu, Monitor, Github, Heart } from 'lucide-react';

const sections = [
  {
    title: 'Learn',
    links: [
      { label: 'PC Parts Overview', href: '#pc-parts' },
      { label: 'CPU & GPU', href: '#pc-parts' },
      { label: 'RAM & Storage', href: '#pc-parts' },
      { label: 'Cooling Systems', href: '#pc-parts' },
    ],
  },
  {
    title: 'Build Guides',
    links: [
      { label: 'Standard Build', href: '#pc-building' },
      { label: 'Water Cooling Build', href: '#pc-building' },
      { label: 'Safety Tips', href: '#pc-building' },
      { label: 'Pre-Build Checklist', href: '#pc-building' },
    ],
  },
  {
    title: 'Comparisons',
    links: [
      { label: 'AMD vs Intel', href: '#differences' },
      { label: 'DDR4 vs DDR5', href: '#differences' },
      { label: 'SSD vs HDD', href: '#differences' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4 group">
              <div className="relative">
                <Cpu className="w-7 h-7 text-cyan-400" />
                <Monitor className="w-4 h-4 text-blue-400 absolute -bottom-1 -right-1" />
              </div>
              <span className="text-white font-bold text-lg">
                PC<span className="text-cyan-400">MG</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              PC Mongolian Guide — your beginner-friendly resource for learning everything about PC components, building, and hardware comparisons.
            </p>
            <div className="flex items-center gap-1 text-slate-600 text-xs">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-current" />
              <span>for PC builders</span>
            </div>
          </div>

          {/* Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} PCMG — PC Mongolian Guide. Educational use only.
          </p>
          <div className="flex items-center gap-4 text-slate-600 text-xs">
            <span>PC Building Resource</span>
            <span>•</span>
            <span>Beginner Friendly</span>
            <span>•</span>
            <span>Free to Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
