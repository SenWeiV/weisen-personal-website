'use client';

import { motion } from 'framer-motion';

const tracks = [
  {
    label: 'Track A',
    title: 'Data Strategy / PM',
    desc: 'For Data Strategy / Data Production / Data Evaluation roles. Focus on SFT/DPO data pipelines, multi-scenario evaluation systems, and 15+ business-line delivery.',
    link: '/resume/data-strategy',
  },
  {
    label: 'Track B',
    title: 'Agent / AI-Native PM',
    desc: 'For Agent / Agent Infra / AI-Native PM roles. Focus on Multi-Agent orchestration, Tool / Skill protocols, and AI-Native product methodology.',
    link: '/resume/agent-native',
  },
];

export default function Resume() {
  return (
    <section id="resume" className="px-6 md:px-16 lg:px-24 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555]">
          — Resume
        </span>
        <h2 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.025em] leading-[1.05] text-[#E0E0E0]">
          Two tracks.<br />One operator.
        </h2>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {tracks.map((track, i) => (
          <motion.a
            key={track.label}
            href={track.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="block p-10 border border-[#2A2A2A] bg-[#151517]
                       hover:border-[#4A4A4A] hover:scale-[1.02]
                       transition-all duration-500 ease-out group"
          >
            <span className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555]">
              — {track.label}
            </span>
            <h3 className="mt-4 text-[26px] md:text-[30px] font-medium tracking-[-0.015em] text-[#E0E0E0]
                           group-hover:text-[#F0F0F0] transition-colors duration-300">
              {track.title}
            </h3>
            <p className="mt-3 text-[15px] text-[#7A7A7A] font-normal leading-[1.75] tracking-[0.005em]">
              {track.desc}
            </p>
            <span className="inline-flex items-center gap-2 mt-6 font-[var(--font-sans)] text-[14px] font-medium
                            text-[#6A6A6A] group-hover:text-[#C8C8C8] transition-colors duration-300">
              View Resume →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
