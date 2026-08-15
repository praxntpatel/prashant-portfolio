import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ExperienceHackathons from './components/ExperienceHackathons';
import Education from './components/Education';
import Certifications from './components/Certifications';
import CodingProfiles from './components/CodingProfiles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {
  ADMIN_STORAGE_KEYS,
  defaultAboutData,
  defaultHeroData,
  defaultProfiles,
  readStorageJSON,
  writeStorageJSON,
} from './data/adminData';

const ADMIN_MODE_STORAGE_KEY = 'portfolio-admin-unlocked';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(ADMIN_MODE_STORAGE_KEY) === 'true';
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPasscodeInput, setAdminPasscodeInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [heroData, setHeroData] = useState(() => readStorageJSON(ADMIN_STORAGE_KEYS.hero, defaultHeroData));
  const [aboutData, setAboutData] = useState(() => readStorageJSON(ADMIN_STORAGE_KEYS.about, defaultAboutData));
  const [profiles, setProfiles] = useState(() => readStorageJSON(ADMIN_STORAGE_KEYS.profiles, defaultProfiles));

  const adminPasscode = import.meta.env.VITE_ADMIN_PASSCODE || '';

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_MODE_STORAGE_KEY, String(isAdminUnlocked));
    }
  }, [isAdminUnlocked]);

  useEffect(() => {
    writeStorageJSON(ADMIN_STORAGE_KEYS.hero, heroData);
  }, [heroData]);

  useEffect(() => {
    writeStorageJSON(ADMIN_STORAGE_KEYS.about, aboutData);
  }, [aboutData]);

  useEffect(() => {
    writeStorageJSON(ADMIN_STORAGE_KEYS.profiles, profiles);
  }, [profiles]);

  const unlockAdminMode = () => {
    const trimmedPasscode = adminPasscodeInput.trim();

    if (!adminPasscode) {
      setAdminError('Admin passcode is not configured. Set VITE_ADMIN_PASSCODE in your .env.local file.');
      return;
    }

    if (trimmedPasscode === adminPasscode) {
      setIsAdminUnlocked(true);
      setAdminPasscodeInput('');
      setAdminError('');
      setIsAdminModalOpen(false);
      return;
    }

    setAdminError('Incorrect passcode.');
  };

  const logoutAdminMode = () => {
    setIsAdminUnlocked(false);
    setAdminPasscodeInput('');
    setAdminError('');
    setIsAdminModalOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_MODE_STORAGE_KEY);
    }
  };

  return (
    <div className="portfolio-shell min-h-screen bg-dark-900 text-white antialiased">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="starfield" />

      <Navbar />

      <main className="relative z-10">
        <Hero isAdminUnlocked={isAdminUnlocked} heroData={heroData} setHeroData={setHeroData} />
        <About isAdminUnlocked={isAdminUnlocked} aboutData={aboutData} setAboutData={setAboutData} />
        <Skills />
        <Projects />
        <ExperienceHackathons />
        <Education />
        <Certifications />
        <CodingProfiles isAdminUnlocked={isAdminUnlocked} profiles={profiles} setProfiles={setProfiles} />
        <Contact />
      </main>

      <Footer
        isAdminUnlocked={isAdminUnlocked}
        onOpenAdmin={() => {
          setAdminError('');
          setAdminPasscodeInput('');
          setIsAdminModalOpen(true);
        }}
        onExitAdmin={logoutAdminMode}
      />

      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-top-btn"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {isAdminModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07070c]/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-purple-400/30 bg-[#0b0b14]/95 p-6 shadow-[0_25px_80px_rgba(139,92,246,0.25)]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">Admin access</p>
            <h3 className="mb-4 text-2xl font-bold text-white">Enter passcode</h3>
            <input
              type="password"
              value={adminPasscodeInput}
              onChange={(event) => setAdminPasscodeInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') unlockAdminMode();
              }}
              placeholder="Enter admin passcode"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none placeholder:text-gray-400"
              autoFocus
            />
            {adminError && <p className="mt-3 text-sm text-red-300">{adminError}</p>}
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setIsAdminModalOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-200">Cancel</button>
              <button type="button" onClick={unlockAdminMode} className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white">Unlock</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
