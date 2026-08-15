import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio.js';

export default function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section id="education" className="section-shell px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">EDUCATION</p>
          <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">Education</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative ml-2 space-y-8 before:absolute before:left-5 before:top-1 before:h-[calc(100%-0.5rem)] before:w-px before:bg-gradient-to-b before:from-purple-500/40 before:via-white/20 before:to-transparent"
          >
            {portfolioData.education.map((edu) => (
              <motion.div key={edu.id} variants={itemVariants} className="relative pl-12">
                <span className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/10 text-xs font-bold text-purple-200">
                  {edu.graduation ? edu.graduation.slice(-2) : edu.completion ? edu.completion.slice(-2) : '01'}
                </span>
                <div className="glass-card p-6">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-lg font-bold text-white">{edu.school}</h3>
                    <span className="text-sm font-semibold text-purple-300">{edu.graduation || edu.completion}</span>
                  </div>
                  <p className="mb-3 text-sm text-gray-400">{edu.location}</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-gray-200">{edu.degree}</p>
                    {edu.score && <p className="text-sm text-gray-400">Score: {edu.score}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
