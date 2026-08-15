import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio.js';

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="section-shell px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">PROJECTS</p>
          <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">Featured Projects</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={projectVariants}
                className="glass-card group p-6 sm:p-8"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-purple-300">0{index + 1}</div>
                    <h3 className="mb-2 text-2xl font-bold text-white">{project.name}</h3>
                    {project.role && <p className="text-sm text-gray-400">Role: {project.role}</p>}
                  </div>
                </div>

                <p className="mb-4 text-gray-300">{project.description}</p>
                <p className="mb-6 text-sm text-gray-400">{project.outcome}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-purple-400/20 bg-purple-500/5 px-3 py-1 text-xs font-medium text-purple-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.duration && <p className="text-xs text-gray-500">{project.duration}</p>}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
