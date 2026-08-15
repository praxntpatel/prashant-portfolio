import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio.js';

export default function ExperienceHackathons() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
  };

  return (
    <section id="experience" className="section-shell px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">EXPERIENCE</p>
          <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">Experience & Hackathons</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative ml-2 space-y-8 before:absolute before:left-5 before:top-1 before:h-[calc(100%-0.5rem)] before:w-px before:bg-gradient-to-b before:from-purple-500/40 before:via-white/20 before:to-transparent"
          >
            {portfolioData.experience.map((item) => (
              <motion.div key={item.id} variants={itemVariants} className="relative pl-12">
                <span className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/10 text-xs font-bold text-purple-200">
                  {item.year}
                </span>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold text-white">{item.position}</h3>
                  <p className="mt-1 text-sm text-gray-400">{item.organization}</p>
                  <p className="mt-3 text-sm text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}

            {portfolioData.hackathons.map((hackathon) => (
              <motion.div key={hackathon.id} variants={itemVariants} className="relative pl-12">
                <span className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/10 text-xs font-bold text-purple-200">
                  {hackathon.date ? hackathon.date.split(' ').pop() : '2026'}
                </span>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold text-white">{hackathon.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">{hackathon.organization}</p>
                  <p className="mt-3 text-sm text-gray-300">{hackathon.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
