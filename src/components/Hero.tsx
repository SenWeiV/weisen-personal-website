'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-6xl md:text-8xl lg:text-[140px] font-semibold tracking-[-0.03em] text-[#E0E0E0] leading-[0.9]">
          SenWei.
        </h1>
        <p className="mt-8 text-2xl md:text-3xl text-[#C8C8C8] font-medium tracking-[-0.01em]">
          AI Product Manager · Agent & Data Strategy
        </p>
        <p className="mt-4 text-[17px] md:text-[19px] text-[#8A8A8A] max-w-2xl font-normal leading-[1.75] tracking-[0.005em]">
          Building AI-Native products at Baidu — Agent platforms, multi-scenario evaluation systems, and training-data strategy across 15+ business lines.
        </p>
        <p className="mt-2 text-[15px] text-[#6A6A6A] font-normal leading-[1.75] tracking-[0.005em]">
          UCL (University College London) · MSc Architecture Design
        </p>
      </motion.div>

      <motion.div
        className="mt-12 flex gap-6 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
      >
        <a
          href="https://github.com/SenWeiV"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[#4A4A4A] rounded-full
                     font-[var(--font-sans)] text-[14px] font-medium text-[#B0B0B0]
                     hover:bg-[#E0E0E0] hover:text-[#111113] hover:border-[#E0E0E0] transition-all duration-300"
        >
          GitHub →
        </a>
        <a
          href="mailto:m13230016773@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[#4A4A4A] rounded-full
                     font-[var(--font-sans)] text-[14px] font-medium text-[#B0B0B0]
                     hover:bg-[#E0E0E0] hover:text-[#111113] hover:border-[#E0E0E0] transition-all duration-300"
        >
          Email →
        </a>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-6 md:left-16 lg:left-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="font-[var(--font-sans)] text-[12px] text-[#555] tracking-[0.2em] uppercase font-medium">
          Scroll ↓
        </span>
      </motion.div>
    </section>
  );
}
