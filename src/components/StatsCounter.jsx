import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

export default function StatsCounter({ end, duration = 2000, suffix = '', prefix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      setCount(current);
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-mono text-xs text-muted-foreground mt-2 tracking-wider uppercase">{label}</div>
    </div>
  );
}