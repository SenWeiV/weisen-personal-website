'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
  index: number;
}

export default function ProjectItem({ project, index }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
      className="border-b border-[#2A2A2A]"
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="group grid grid-cols-[40px_1fr_40px] md:grid-cols-[60px_1fr_200px_60px] items-center
                   py-8 md:py-9 cursor-pointer transition-all duration-300
                   hover:pl-4"
      >
        <span className="font-[var(--font-sans)] text-[13px] font-medium text-[#555] tracking-[0.1em]">
          {project.id}
        </span>

        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-[#1E1E20] font-[var(--font-sans)] text-[11px] font-bold text-[#E0E0E0] whitespace-nowrap">
            {project.category}
          </span>
          <h3 className="text-[22px] md:text-[26px] lg:text-[30px] font-medium text-[#E0E0E0]
                         tracking-[-0.015em] leading-[1.2]
                         group-hover:text-[#F0F0F0] transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        <div className="hidden md:flex flex-col items-end gap-1">
          <div className="flex gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="font-[var(--font-sans)] text-[13px] font-medium text-[#6A6A6A]">
                {tag}
              </span>
            ))}
          </div>
          <span className="font-[var(--font-sans)] text-[12px] text-[#555]">{project.year}</span>
        </div>

        <motion.span
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl text-right text-[#4A4A4A] group-hover:text-[#C8C8C8]
                     group-hover:translate-x-2 transition-all duration-300"
        >
          →
        </motion.span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-[40px] md:pl-[60px] pr-4 max-w-2xl">
              <p className="text-[16px] md:text-[17px] text-[#A8A8A8] font-normal leading-[1.75] tracking-[0.005em]">
                {project.descEn}
              </p>
              <p className="mt-3 text-[15px] md:text-[16px] text-[#888888] font-normal leading-[1.75] tracking-[0.005em]">
                {project.descZh}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 mt-5 font-[var(--font-sans)] text-[14px] font-medium
                             text-[#6A6A6A] hover:text-[#E0E0E0] transition-colors duration-300
                             border-b border-[#3A3A3A] hover:border-[#8A8A8A] pb-0.5"
                >
                  View on GitHub →
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
