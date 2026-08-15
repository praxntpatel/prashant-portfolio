import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio.js';

export default function Skills() {
  const skillGroups = [
    { label: 'Languages', skills: portfolioData.skills.languages },
    { label: 'AI & Development', skills: portfolioData.skills.aiAndDevelopment },
    { label: 'Tools', skills: portfolioData.skills.tools },
    { label: 'Concepts', skills: portfolioData.skills.concepts },
    { label: 'Learning', skills: portfolioData.skills.learning },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  };

  return (
    <section id="skills" className="section-shell px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">SKILLS</p>
          <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">Skills & Expertise</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {skillGroups.map((group) => (
              <motion.div key={group.label} variants={itemVariants} className="glass-card p-5 sm:p-6">
                <h3 className="mb-4 text-lg font-semibold text-purple-300">{group.label}</h3>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-purple-400/20 bg-white/5 px-4 py-2 text-sm font-medium text-gray-100 transition-all duration-200 hover:border-purple-400/60 hover:text-purple-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
