'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-50">
          SenWei
        </h1>
        <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-xl font-light">
          Designer & Developer crafting digital experiences
        </p>
      </motion.div>

      {/* 社交链接 */}
      <motion.div
        className="mt-12 flex gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
      >
        <a
          href="https://github.com/SenWeiV"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 hover:text-white transition-colors duration-300"
        >
          GitHub
        </a>
        <a
          href="mailto:m13230016773@gmail.com"
          className="text-neutral-500 hover:text-white transition-colors duration-300"
        >
          Email
        </a>
      </motion.div>

      {/* 向下滚动提示 */}
      <motion.div
        className="absolute bottom-12 left-6 md:left-16 lg:left-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-neutral-600 text-sm tracking-widest uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}