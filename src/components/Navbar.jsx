import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Achievements', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0.2, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#07070c]/75 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <button
            type="button"
            className="text-left text-lg font-bold tracking-wide text-white transition-colors hover:text-purple-300"
          >
            <span className="bg-gradient-to-r from-purple-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
              Prashant Patel
            </span>
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.href.replace('#', '') ||
                (link.href === '#experience' && (activeSection === 'experience' || activeSection === 'achievements'));

              return (
                <a
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive ? 'bg-white/8 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex">
            <a
              href="#contact"
              className="rounded-full border border-purple-400/40 bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(168,85,247,0.35)] transition-transform duration-200 hover:scale-[1.02]"
            >
              Hire Me
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-gray-200 md:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t border-white/10 bg-[#0b0b14]/95 md:hidden"
        >
          <div className="mx-auto max-w-6xl space-y-2 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm text-gray-200 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Hire Me
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

