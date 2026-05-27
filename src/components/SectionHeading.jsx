import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionHeading({ label, title, description }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="text-center mb-16">
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs text-accent tracking-[0.3em] uppercase"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}