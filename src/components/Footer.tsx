'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] px-6 md:px-16 lg:px-24 py-12">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-[var(--font-sans)] text-[13px] text-[#555]">
          © 2026 SenWei. Built with AI Native intent.
        </span>
        <div className="flex gap-6">
          <a
            href="https://github.com/SenWeiV"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[var(--font-sans)] text-[13px] text-[#555] hover:text-[#C8C8C8] transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="mailto:m13230016773@gmail.com"
            className="font-[var(--font-sans)] text-[13px] text-[#555] hover:text-[#C8C8C8] transition-colors duration-300"
          >
            Email
          </a>
          <a
            href="#hero"
            className="font-[var(--font-sans)] text-[13px] text-[#555] hover:text-[#C8C8C8] transition-colors duration-300"
          >
            Top ↑
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
