import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from '../components/SectionHeading';
import GlowCard from '../components/GlowCard';
import StarField from '../components/StarField';
import { Rocket, Calendar, Globe, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const timeline = [
  { year: '1969', title: 'NASDA Founded', desc: 'Japan\'s National Space Development Agency established, laying the groundwork for Japan\'s space program.' },
  { year: '1970', title: 'Ohsumi Satellite', desc: 'Japan becomes the fourth country to launch a satellite into orbit — the Ohsumi, launched on a Lambda-4S rocket.' },
  { year: '1994', title: 'H-II Rocket', desc: 'Japan achieves fully domestic launch capability with the H-II, designed and built entirely with Japanese technology.' },
  { year: '2003', title: 'JAXA Formed', desc: 'Three organizations merge to form the Japan Aerospace Exploration Agency (JAXA), unifying Japan\'s space efforts.' },
  { year: '2010', title: 'Hayabusa Returns', desc: 'The Hayabusa spacecraft returns asteroid samples to Earth — the first-ever asteroid sample return mission.' },
  { year: '2015', title: 'SOLARIS Research Begins', desc: 'JAXA intensifies research into space-based solar power (SBSP) under what would become Project SOLARIS.' },
  { year: '2023', title: 'SLIM Moon Landing', desc: 'Japan\'s SLIM spacecraft achieves a precision Moon landing, making Japan the fifth country to soft-land on the Moon.' },
  { year: '2040+', title: 'SOLARIS Deployment', desc: 'Targeted timeline for operational space-based solar power station capable of powering hundreds of thousands of homes.' },
];

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-start gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} md:text-${isLeft ? 'right' : 'left'}`}
    >
      <div className={`flex-1 hidden md:block ${isLeft ? 'text-right' : 'text-left'}`}>
        {isLeft && <TimelineContent item={item} />}
      </div>
      <div className="flex flex-col items-center z-10">
        <div className="w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <div className="w-px flex-1 bg-border/50" />
      </div>
      <div className="flex-1 pb-12">
        {!isLeft && <div className="hidden md:block"><TimelineContent item={item} /></div>}
        <div className="md:hidden"><TimelineContent item={item} /></div>
        {isLeft && <div className="hidden md:block" />}
      </div>
    </motion.div>
  );
}

function TimelineContent({ item }) {
  return (
    <div>
      <span className="font-mono text-xs text-primary tracking-widest">{item.year}</span>
      <h3 className="font-heading text-lg font-semibold mt-1 mb-2">{item.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
    </div>
  );
}

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs text-accent tracking-[0.3em]">EST. 2003</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              About <span className="text-gradient-gold">JAXA</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The Japan Aerospace Exploration Agency is Japan's national space agency, responsible for space research, technology development, and the future of space-based solar energy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Calendar, label: 'Founded', value: '2003' },
            { icon: Rocket, label: 'Major Launches', value: '80+' },
            { icon: Globe, label: 'HQ Location', value: 'Tokyo, Japan' },
            { icon: Award, label: 'Notable Mission', value: 'Hayabusa 2' },
          ].map((fact, i) => {
            const Icon = fact.icon;
            return (
              <GlowCard key={i} delay={i * 0.08} className="p-6 text-center">
                <Icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="font-heading text-2xl font-bold text-primary mb-1">{fact.value}</div>
                <div className="font-mono text-xs text-muted-foreground tracking-wider uppercase">{fact.label}</div>
              </GlowCard>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            label="History"
            title="Japan's Journey to the Stars"
            description="From early rocket tests to pioneering asteroid sample returns, Japan's space program has a legacy of innovation and precision."
          />
          <div className="relative">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 text-center">
        <Link
          to="/solaris"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-heading text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors glow-gold"
        >
          Explore Project SOLARIS <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}