import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Pencil, Plus, X } from 'lucide-react';
import { SiCodeforces, SiGeeksforgeeks, SiHackerrank, SiLeetcode } from 'react-icons/si';

const iconChoices = [
  { value: 'leetcode', label: 'LeetCode' },
  { value: 'codolio', label: 'Codolio' },
  { value: 'gfg', label: 'GeeksforGeeks' },
  { value: 'hackerrank', label: 'HackerRank' },
  { value: 'codeforces', label: 'Codeforces' },
  { value: 'generic', label: 'General' },
];

function getPlatformIcon(name, iconValue) {
  const iconProps = { size: 22, className: 'shrink-0' };
  const resolvedIcon = iconValue || name;

  switch (resolvedIcon) {
    case 'leetcode':
      return <SiLeetcode {...iconProps} className="h-8 w-8 rounded-full bg-[#f89d1b]/15 p-1.5 text-[#f89d1b]" />;
    case 'codolio':
      return <Code2 {...iconProps} className="h-8 w-8 rounded-full bg-violet-500/15 p-1 text-violet-300" />;
    case 'gfg':
      return <SiGeeksforgeeks {...iconProps} className="h-8 w-8 rounded-full bg-indigo-500/15 p-1 text-indigo-300" />;
    case 'hackerrank':
      return <SiHackerrank {...iconProps} className="h-8 w-8 rounded-full bg-fuchsia-500/15 p-1 text-fuchsia-300" />;
    case 'codeforces':
      return <SiCodeforces {...iconProps} className="h-8 w-8 rounded-full bg-violet-500/15 p-1 text-violet-200" />;
    default:
      return <Sparkles {...iconProps} className="h-8 w-8 rounded-full bg-purple-500/15 p-1 text-purple-300" />;
  }
}

export default function CodingProfiles({ isAdminUnlocked = false, profiles = [], setProfiles }) {
  const [editingId, setEditingId] = useState(null);
  const [draftProfile, setDraftProfile] = useState({ name: '', href: '', icon: 'generic' });
  const [isAdding, setIsAdding] = useState(false);

  const openAddForm = () => {
    setIsAdding(true);
    setEditingId(null);
    setDraftProfile({ name: '', href: '', icon: 'generic' });
  };

  const openEditForm = (profile) => {
    setIsAdding(false);
    setEditingId(profile.id || profile.name);
    setDraftProfile({
      name: profile.name || '',
      href: profile.href || '',
      icon: profile.icon || 'generic',
    });
  };

  const saveProfile = () => {
    if (!draftProfile.name.trim() || !draftProfile.href.trim()) return;

    const nextProfile = {
      id: editingId || `${Date.now()}`,
      name: draftProfile.name.trim(),
      href: draftProfile.href.trim(),
      icon: draftProfile.icon || 'generic',
    };

    setProfiles((prev) => {
      if (editingId) {
        return prev.map((profile) => (profile.id === editingId ? { ...profile, ...nextProfile } : profile));
      }
      return [...prev, nextProfile];
    });

    setIsAdding(false);
    setEditingId(null);
    setDraftProfile({ name: '', href: '', icon: 'generic' });
  };

  const removeProfile = (profileId) => {
    setProfiles((prev) => prev.filter((profile) => (profile.id || profile.name) !== profileId));
  };

  return (
    <section id="coding-profiles" className="section-shell px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">CODING PROFILES</p>
          <div className="mb-12 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Find me online</h2>
            {isAdminUnlocked && (
              <button
                type="button"
                onClick={openAddForm}
                className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-white/5 px-4 py-2 text-sm font-semibold text-purple-200"
              >
                <Plus size={16} />
                Add profile
              </button>
            )}
          </div>

          {isAdminUnlocked && (isAdding || editingId) && (
            <div className="mb-6 rounded-2xl border border-purple-400/30 bg-[#0d0f19]/80 p-4">
              <div className="grid gap-4 md:grid-cols-3">
                <input
                  value={draftProfile.name}
                  onChange={(event) => setDraftProfile((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Platform name"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-400"
                />
                <input
                  value={draftProfile.href}
                  onChange={(event) => setDraftProfile((prev) => ({ ...prev, href: event.target.value }))}
                  placeholder="Profile URL"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-400"
                />
                <select
                  value={draftProfile.icon}
                  onChange={(event) => setDraftProfile((prev) => ({ ...prev, icon: event.target.value }))}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
                >
                  {iconChoices.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#0d0f19] text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => { setEditingId(null); setIsAdding(false); setDraftProfile({ name: '', href: '', icon: 'generic' }); }} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-gray-200">Cancel</button>
                <button type="button" onClick={saveProfile} className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-sm font-semibold text-white">Save</button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {profiles.map((profile) => (
              <motion.a
                key={profile.id || profile.name}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="glass-card group relative flex items-center gap-4 rounded-2xl p-5 text-left"
              >
                {getPlatformIcon(profile.name, profile.icon)}
                <span className="text-base font-semibold text-gray-100 transition-colors group-hover:text-purple-200">
                  {profile.name}
                </span>

                {isAdminUnlocked && (
                  <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 transition duration-200 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        openEditForm(profile);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/30 bg-white/5 text-purple-200"
                      aria-label={`Edit ${profile.name}`}
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        removeProfile(profile.id || profile.name);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 text-red-200"
                      aria-label={`Remove ${profile.name}`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
