'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
  index: number;
}

export default function ProjectItem({ project, index }: Props) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group flex items-center justify-between py-6 border-b border-neutral-800 
                 hover:bg-neutral-900/50 px-4 -mx-4 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-6 md:gap-8">
        <span className="text-neutral-600 text-sm font-mono">{project.id}</span>
        <h3 className="text-lg md:text-xl lg:text-2xl font-light text-neutral-300 group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* 标签 - 仅在 md 及以上显示 */}
        <div className="hidden md:flex gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-neutral-500 px-2 py-1 border border-neutral-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-neutral-500 text-sm">{project.year}</span>
        <span className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
          →
        </span>
      </div>
    </motion.a>
  );
}