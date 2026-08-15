import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Camera, Globe, Mail, Pencil } from 'lucide-react';

const PROFILE_STORAGE_KEY = 'prashant-portfolio-profile-image';

export default function Hero({ isAdminUnlocked = false, heroData, setHeroData }) {
  const roles = heroData?.roles?.length ? heroData.roles : ['Problem Solver', 'AI Enthusiast', 'Frontend Developer', 'Software Developer'];
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [draftValue, setDraftValue] = useState('');
  const [profileImage, setProfileImage] = useState(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    return saved || '';
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const currentRole = roles[roleIndex] || '';
    const timeout = setTimeout(() => {
      setTypedText((prev) => {
        if (isDeleting) {
          const next = prev.slice(0, -1);
          if (next.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
          }
          return next;
        }

        const next = currentRole.slice(0, prev.length + 1);
        if (next === currentRole) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
        return next;
      });
    }, isDeleting ? 60 : 120);

    return () => clearTimeout(timeout);
  }, [typedText, roleIndex, isDeleting, roles]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        localStorage.setItem(PROFILE_STORAGE_KEY, result);
        setProfileImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const beginEdit = (field, value) => {
    if (!isAdminUnlocked) return;
    setEditingField(field);
    setDraftValue(value);
  };

  const saveField = () => {
    if (!editingField) return;

    if (editingField === 'name') {
      setHeroData((prev) => ({ ...prev, name: draftValue || prev.name }));
    }
    if (editingField === 'title') {
      setHeroData((prev) => ({ ...prev, title: draftValue || prev.title }));
    }
    if (editingField === 'intro') {
      setHeroData((prev) => ({ ...prev, intro: draftValue || prev.intro }));
    }
    if (editingField === 'roles') {
      const nextRoles = draftValue
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      setHeroData((prev) => ({ ...prev, roles: nextRoles.length ? nextRoles : prev.roles }));
    }

    setEditingField(null);
    setDraftValue('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' },
    },
  };

  return (
    <section id="home" className="section-shell px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="text-center lg:text-left">
          <motion.p variants={itemVariants} className="section-label text-left lg:text-left">
            HELLO, I&apos;M
          </motion.p>

          <motion.h1 variants={itemVariants} className="mb-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              {heroData?.name || 'Prashant Patel'}
            </span>
            {isAdminUnlocked && (
              <button
                type="button"
                onClick={() => beginEdit('name', heroData?.name || '')}
                className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-purple-400/30 bg-white/5 text-purple-200 align-middle"
                aria-label="Edit name"
              >
                <Pencil size={14} />
              </button>
            )}
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-5 text-xl font-semibold text-gray-200 sm:text-2xl">
            <span>{heroData?.title || 'Computer Science Student'}</span>
            {isAdminUnlocked && (
              <button
                type="button"
                onClick={() => beginEdit('title', heroData?.title || '')}
                className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-purple-400/30 bg-white/5 text-purple-200 align-middle"
                aria-label="Edit title"
              >
                <Pencil size={14} />
              </button>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6 text-lg text-gray-300 sm:text-xl">
            <span className="text-purple-300">&amp; </span>
            <span className="font-medium text-white">{typedText}</span>
            <span className="typing-cursor">|</span>
            {isAdminUnlocked && (
              <button
                type="button"
                onClick={() => beginEdit('roles', roles.join(', '))}
                className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-purple-400/30 bg-white/5 text-purple-200 align-middle"
                aria-label="Edit roles"
              >
                <Pencil size={14} />
              </button>
            )}
          </motion.div>

          <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-300 lg:mx-0">
            {heroData?.intro || 'Passionate about Java, Python, web development and Generative AI. I enjoy building practical solutions and exploring new technologies.'}
            {isAdminUnlocked && (
              <button
                type="button"
                onClick={() => beginEdit('intro', heroData?.intro || '')}
                className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-purple-400/30 bg-white/5 text-purple-200 align-middle"
                aria-label="Edit intro"
              >
                <Pencil size={14} />
              </button>
            )}
          </motion.p>

          {isAdminUnlocked && editingField && (
            <div className="mb-6 max-w-xl rounded-2xl border border-purple-400/30 bg-[#0d0f19]/80 p-3 text-left">
              <textarea
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                rows={editingField === 'intro' ? 4 : 2}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none ring-0 placeholder:text-gray-400"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingField(null)} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-gray-200">Cancel</button>
                <button type="button" onClick={saveField} className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-sm font-semibold text-white">Save</button>
              </div>
            </div>
          )}

          <motion.div variants={itemVariants} className="mb-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-[0_18px_45px_rgba(168,85,247,0.38)] transition-transform duration-200 hover:scale-[1.02]"
            >
              View My Work
              <ArrowRight size={16} />
            </a>
            <a
              href="/Prashant-Patel-Resume.pdf"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/3 px-6 py-3 font-semibold text-gray-100 transition-all duration-200 hover:border-purple-400/60 hover:text-purple-200"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 lg:justify-start">
            <a href="https://github.com/praxntpatel" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-transform duration-200 hover:-translate-y-1 hover:border-purple-400/50 hover:text-purple-300" aria-label="GitHub">
              <Globe size={20} />
            </a>
            <a href="https://linkedin.com/in/praxntpatel" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-transform duration-200 hover:-translate-y-1 hover:border-purple-400/50 hover:text-purple-300" aria-label="LinkedIn">
              <BriefcaseBusiness size={20} />
            </a>
            <a href="mailto:prashant9568201102@gmail.com" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-transform duration-200 hover:-translate-y-1 hover:border-purple-400/50 hover:text-purple-300" aria-label="Email">
              <Mail size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-end">
          <div className="hero-image-ring relative">
            {isAdminUnlocked && (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group absolute inset-0 z-20 cursor-pointer rounded-full"
                  aria-label="Upload or replace profile photo"
                >
                  <span className="absolute inset-0 rounded-full bg-black/30 opacity-0 transition duration-200 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 text-xs font-medium text-white opacity-0 transition duration-200 group-hover:opacity-100">
                    <Camera size={14} />
                    Add photo
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </>
            )}

            <div className="relative z-10 h-72 w-72 overflow-hidden rounded-full border border-white/10 shadow-[0_30px_80px_rgba(167,139,250,0.22)] sm:h-80 sm:w-80">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Prashant Patel"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#0f1220]/80 text-purple-200/80">
                  <Camera size={42} className="opacity-70" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
