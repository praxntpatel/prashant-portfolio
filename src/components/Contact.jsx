import { motion } from 'framer-motion';
import { Mail, Globe, BriefcaseBusiness, Phone } from 'lucide-react';
import { portfolioData } from '../data/portfolio.js';

export default function Contact() {
  return (
    <section id="contact" className="section-shell px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="section-label">CONTACT</p>
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">Let's Connect</h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-300">
            Interested in collaborating, discussing technology, or building something together? Let's connect!
          </p>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            <motion.a
              href={`mailto:${portfolioData.personal.email}`}
              whileHover={{ scale: 1.03 }}
              className="glass-card group p-6"
            >
              <Mail className="mx-auto mb-3 h-8 w-8 text-purple-300" />
              <p className="mb-1 text-sm text-gray-400">Email</p>
              <p className="break-all font-medium text-white group-hover:text-purple-300 transition-colors">
                {portfolioData.personal.email}
              </p>
            </motion.a>

            <motion.a
              href={`tel:${portfolioData.personal.phone}`}
              whileHover={{ scale: 1.03 }}
              className="glass-card group p-6"
            >
              <Phone className="mx-auto mb-3 h-8 w-8 text-purple-300" />
              <p className="mb-1 text-sm text-gray-400">Phone</p>
              <p className="font-medium text-white group-hover:text-purple-300 transition-colors">
                {portfolioData.personal.phone}
              </p>
            </motion.a>

            {portfolioData.social.github && (
              <motion.a
                href={portfolioData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className="glass-card group p-6"
              >
                <Globe className="mx-auto mb-3 h-8 w-8 text-purple-300" />
                <p className="mb-1 text-sm text-gray-400">GitHub</p>
                <p className="font-medium text-white group-hover:text-purple-300 transition-colors">
                  github.com/praxntpatel
                </p>
              </motion.a>
            )}

            {portfolioData.social.linkedin && (
              <motion.a
                href={portfolioData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className="glass-card group p-6"
              >
                <BriefcaseBusiness className="mx-auto mb-3 h-8 w-8 text-purple-300" />
                <p className="mb-1 text-sm text-gray-400">LinkedIn</p>
                <p className="font-medium text-white group-hover:text-purple-300 transition-colors">
                  linkedin.com/in/praxntpatel
                </p>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
