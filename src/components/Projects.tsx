'use client';

import { projects } from '@/data/projects';
import ProjectItem from './ProjectItem';

export default function Projects() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-24">
      <h2 className="text-sm text-neutral-500 uppercase tracking-widest mb-12">
        Selected Work
      </h2>
      
      <div>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))
        ) : (
          <p className="text-neutral-500 text-center py-12">
            No projects yet. Stay tuned!
          </p>
        )}
      </div>
    </section>
  );
}