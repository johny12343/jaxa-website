import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function GlowCard({ children, className = '', variant = 'cyan', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const borderColor = variant === 'gold' ? 'border-primary/20 hover:border-primary/40' : 'border-accent/20 hover:border-accent/40';
  const glowClass = variant === 'gold' ? 'hover:glow-gold' : 'hover:glow-cyan';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-panel rounded-xl border ${borderColor} ${glowClass} transition-all duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}