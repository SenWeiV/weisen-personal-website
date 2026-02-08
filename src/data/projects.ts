export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  link?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Personal Portal',
    description: 'A minimal personal website inspired by dagn.space',
    year: '2025',
    tags: ['Next.js', 'Design'],
    link: 'https://github.com/SenWeiV/personal-portal'
  },
  {
    id: '02',
    title: 'Project Alpha',
    description: 'An innovative tool for creative workflow',
    year: '2025',
    tags: ['React', 'TypeScript'],
    link: 'https://example.com'
  },
  {
    id: '03',
    title: 'Design System',
    description: 'A comprehensive design system for modern web apps',
    year: '2024',
    tags: ['UI/UX', 'Components'],
    link: 'https://example.com'
  }
];