import { useState, useEffect } from 'react';
import { Menu, X, Cpu, Monitor } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'PC Parts', href: '#pc-parts' },
  { label: 'Build Guides', href: '#pc-building' },
  { label: 'Differences', href: '#differences' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="relative">
              <Cpu className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <Monitor className="w-4 h-4 text-blue-400 absolute -bottom-1 -right-1 group-hover:text-blue-300 transition-colors" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              PC<span className="text-cyan-400">MG</span>
            </span>
            <span className="hidden sm:block text-slate-400 text-sm font-medium">PC Mongolian Guide</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pc-building"
              className="ml-3 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Start Building
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-700/50">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-all"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pc-building"
              onClick={() => setOpen(false)}
              className="block mt-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg text-sm text-center transition-all"
            >
              Start Building
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
