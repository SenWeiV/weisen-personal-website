'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectItem from './ProjectItem';

export default function Projects() {
  return (
    <section id="work" className="px-6 md:px-16 lg:px-24 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555]">
          — Selected Work
        </span>
        <h2 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.025em] leading-[1.05] text-[#E0E0E0]">
          What I&rsquo;m building.
        </h2>
      </motion.div>

      <div className="mt-16 border-t border-[#2A2A2A]">
        {projects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
