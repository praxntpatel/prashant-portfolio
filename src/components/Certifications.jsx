import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio.js';

export default function Certifications() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section id="certifications" className="section-shell px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">CERTIFICATIONS</p>
          <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">Certifications</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {portfolioData.certifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="glass-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-purple-300">✓</div>
                  <div>
                    <h3 className="mb-1 font-semibold text-white">{cert.name}</h3>
                    <p className="text-sm text-gray-400">{cert.organization}</p>
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
