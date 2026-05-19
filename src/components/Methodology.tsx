'use client';

import { motion } from 'framer-motion';

const principles = [
  {
    id: '01',
    title: 'Agent as First-class Citizen',
    desc: 'API / CLI First. GUI is a wrapper of the API, not the entrance. Design for Agents, then humans get a GUI for free.',
  },
  {
    id: '02',
    title: 'Specification-Driven',
    desc: 'Rubrics and Specs replace if-else hardcoded rules. Write what "good" looks like; let the LLM judge.',
  },
  {
    id: '03',
    title: 'Workflow + Agent Hybrid',
    desc: 'Determinism where it matters; Agent autonomy where it pays. AI Native is not all-Agent — it\'s the right mix.',
  },
  {
    id: '04',
    title: 'Evaluation-First',
    desc: 'Build evaluations before features. Always. Evaluation drives iteration, not the other way around.',
  },
  {
    id: '05',
    title: 'Vibe Coding',
    desc: 'Prompt-driven product development. PMs ship MVPs themselves. The product moves at the speed of intent.',
  },
  {
    id: '06',
    title: 'Capability over Feature',
    desc: 'Emergent capability beats stacked features. One foundation model replaces ten feature modules.',
  },
];

export default function Methodology() {
  return (
    <section id="methodology" className="bg-[#0D0D0F] px-6 md:px-16 lg:px-24 py-[140px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555]">
          — Methodology
        </span>
        <h2 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.025em] leading-[1.05] text-[#E0E0E0] mb-20">
          AI Native<br />Product Principles.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2A2A] border border-[#2A2A2A]">
        {principles.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="bg-[#0D0D0F] p-10 md:p-12
                       hover:bg-[#151517] hover:scale-[1.02] transition-all duration-500 ease-out"
          >
            <span className="font-[var(--font-sans)] text-[11px] font-medium text-[#555] tracking-[0.22em] uppercase">
              PRINCIPLE {p.id}
            </span>
            <h4 className="mt-5 text-[22px] md:text-[26px] font-medium text-[#E0E0E0] tracking-[-0.015em] leading-[1.2]">
              {p.title}
            </h4>
            <p className="mt-4 text-[15px] text-[#7A7A7A] font-normal leading-[1.75] tracking-[0.005em]">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
