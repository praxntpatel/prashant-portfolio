import { Globe, BriefcaseBusiness, Mail, LockKeyhole, LogOut } from 'lucide-react';
import { portfolioData } from '../data/portfolio.js';

export default function Footer({ isAdminUnlocked = false, onOpenAdmin, onExitAdmin }) {
  return (
    <footer className="border-t border-white/10 bg-[#07070c]/80 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">© 2026 {portfolioData.personal.name}</p>
            <p className="mt-1 text-xs text-gray-500">Built with React + Tailwind CSS</p>
          </div>

          <div className="flex items-center gap-5">
            {portfolioData.social.github && (
              <a
                href={portfolioData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-purple-300"
                aria-label="GitHub"
              >
                <Globe size={20} />
              </a>
            )}
            {portfolioData.social.linkedin && (
              <a
                href={portfolioData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-purple-300"
                aria-label="LinkedIn"
              >
                <BriefcaseBusiness size={20} />
              </a>
            )}
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-gray-400 transition-colors hover:text-purple-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>

            <button
              type="button"
              onClick={isAdminUnlocked ? onExitAdmin : onOpenAdmin}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-300 transition-colors hover:border-purple-400/40 hover:text-purple-200"
            >
              {isAdminUnlocked ? <LogOut size={12} /> : <LockKeyhole size={12} />}
              {isAdminUnlocked ? 'Exit Admin Mode' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
