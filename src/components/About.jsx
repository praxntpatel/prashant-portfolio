import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

export default function About({ isAdminUnlocked = false, aboutData, setAboutData }) {
  const [editingField, setEditingField] = useState(null);
  const [draftValue, setDraftValue] = useState('');

  const startEdit = (field, value) => {
    if (!isAdminUnlocked) return;
    setEditingField(field);
    setDraftValue(value || '');
  };

  const saveEdit = () => {
    if (!editingField) return;
    setAboutData((prev) => ({
      ...prev,
      [editingField]: draftValue || prev[editingField],
    }));
    setEditingField(null);
    setDraftValue('');
  };

  return (
    <section id="about" className="section-shell px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">ABOUT</p>
          <h2 className="mb-8 text-3xl font-bold text-white sm:text-4xl">About Me</h2>

          <div className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-300">
            {aboutData?.bio || 'Passionate Computer Science student with good foundation in Java, Python, web development, and Generative AI.'}
            {isAdminUnlocked && (
              <button
                type="button"
                onClick={() => startEdit('bio', aboutData?.bio || '')}
                className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-purple-400/30 bg-white/5 text-purple-200 align-middle"
                aria-label="Edit bio"
              >
                <Pencil size={14} />
              </button>
            )}
          </div>

          {isAdminUnlocked && editingField === 'bio' && (
            <div className="mb-6 max-w-3xl rounded-2xl border border-purple-400/30 bg-[#0d0f19]/80 p-3">
              <textarea
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none placeholder:text-gray-400"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingField(null)} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-gray-200">Cancel</button>
                <button type="button" onClick={saveEdit} className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-sm font-semibold text-white">Save</button>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="glass-card p-6">
              <h3 className="mb-2 text-sm font-semibold text-purple-400">Education</h3>
              <p className="font-medium text-gray-100">
                {aboutData?.education || 'Galgotias University'}
                {isAdminUnlocked && (
                  <button
                    type="button"
                    onClick={() => startEdit('education', aboutData?.education || '')}
                    className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/30 bg-white/5 text-purple-200 align-middle"
                    aria-label="Edit education"
                  >
                    <Pencil size={12} />
                  </button>
                )}
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="mb-2 text-sm font-semibold text-purple-400">Focus Areas</h3>
              <p className="text-sm font-medium text-gray-100">
                {aboutData?.focus || 'Software Development • AI • Web Development'}
                {isAdminUnlocked && (
                  <button
                    type="button"
                    onClick={() => startEdit('focus', aboutData?.focus || '')}
                    className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/30 bg-white/5 text-purple-200 align-middle"
                    aria-label="Edit focus"
                  >
                    <Pencil size={12} />
                  </button>
                )}
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="mb-2 text-sm font-semibold text-purple-400">Currently Learning</h3>
              <p className="text-sm font-medium text-gray-100">
                {aboutData?.learning || 'MySQL • MongoDB • AWS'}
                {isAdminUnlocked && (
                  <button
                    type="button"
                    onClick={() => startEdit('learning', aboutData?.learning || '')}
                    className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/30 bg-white/5 text-purple-200 align-middle"
                    aria-label="Edit learning"
                  >
                    <Pencil size={12} />
                  </button>
                )}
              </p>
            </div>
          </div>

          {isAdminUnlocked && editingField && editingField !== 'bio' && (
            <div className="mt-6 max-w-md rounded-2xl border border-purple-400/30 bg-[#0d0f19]/80 p-3">
              <input
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none placeholder:text-gray-400"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingField(null)} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-gray-200">Cancel</button>
                <button type="button" onClick={saveEdit} className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-sm font-semibold text-white">Save</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
