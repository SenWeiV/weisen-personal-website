'use client';

import { motion } from 'framer-motion';

const tagGroups = [
  {
    title: 'Methodology',
    tags: ['AI Native', 'Agent-Native', 'Specification-Driven', 'Evaluation-First', 'Vibe Coding'],
  },
  {
    title: 'Capabilities',
    tags: ['Multi-Agent Orchestration', 'Tool / Skill Protocol', 'LLM-as-Judge', 'Rubric Design', 'RAG', 'Prompt Engineering'],
  },
  {
    title: 'Domain',
    tags: ['Agent Platform', 'Data Strategy', 'Evaluation System', 'SFT / DPO', 'MCP', 'Function Calling'],
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 md:px-16 lg:px-24 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555]">
          — About
        </span>
        <h2 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.025em] leading-[1.05] text-[#E0E0E0]">
          4 years building<br />AI-Native products.
        </h2>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[17px] md:text-[19px] text-[#8A8A8A] leading-[1.75] tracking-[0.005em]">
            Currently leading <strong className="font-semibold text-[#C8C8C8]">Agent platforms</strong>, <strong className="font-semibold text-[#C8C8C8]">multi-scenario evaluation systems</strong>, and <strong className="font-semibold text-[#C8C8C8]">training-data strategy</strong> at Baidu — covering medical agents, virtual-companion agents, and 15+ business lines.
          </p>
          <p className="mt-6 text-[17px] md:text-[19px] text-[#8A8A8A] leading-[1.75] tracking-[0.005em]">
            I practice an AI Native methodology: <em>Agent as a first-class citizen</em>, <em>Specification-Driven</em>, <em>Workflow + Agent hybrid</em>, <em>Evaluation-First</em>, <em>Vibe Coding</em>.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {tagGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#7A7A7A] mb-3">
                {group.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 border border-[#3A3A3A] rounded-full
                               font-[var(--font-sans)] text-[13px] font-medium text-[#A8A8A8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
