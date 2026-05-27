import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import GlowCard from '../components/GlowCard';
import StatsCounter from '../components/StatsCounter';
import StarField from '../components/StarField';
import { Sparkles, Zap, Sun, Globe, Rocket, Radio, Leaf, Clock } from 'lucide-react';

const quickFacts = [
  {
    icon: Rocket,
    fact: 'JAXA was founded on October 1, 2003, by merging three separate space organizations: NASDA, ISAS, and NAL.',
  },
  {
    icon: Sun,
    fact: 'Space solar panels receive direct sunlight 24 hours a day, 365 days a year — completely unaffected by weather, clouds, or nighttime.',
  },
  {
    icon: Globe,
    fact: 'Japan aims to power hundreds of thousands of homes with clean space solar energy by 2040–2050 through Project SOLARIS.',
  },
  {
    icon: Leaf,
    fact: 'Space-based solar power could reduce CO₂ emissions by millions of tons annually, making a significant contribution to fighting climate change.',
  },
  {
    icon: Radio,
    fact: 'Energy is beamed from space using microwaves at 5.8 GHz — the same frequency range as Wi-Fi routers, but carefully focused.',
  },
  {
    icon: Zap,
    fact: 'Solar intensity in space is 5–10 times stronger than on Earth\'s surface because there\'s no atmosphere absorbing the light.',
  },
  {
    icon: Clock,
    fact: 'A geostationary satellite orbits at exactly 36,000 km above Earth, staying fixed over one spot — perfect for continuous energy beaming.',
  },
  {
    icon: Sparkles,
    fact: 'Japan successfully tested wireless power transmission over 55 meters in 2015, a key proof-of-concept for space-to-ground energy transfer.',
  },
];

const stats = [
  { end: 2003, label: 'Year JAXA Founded', suffix: '' },
  { end: 24, label: 'Hours / Day of Solar in Space', suffix: 'hrs' },
  { end: 36000, label: 'Orbital Altitude (km)', suffix: 'km' },
  { end: 55, label: 'Meter Wireless Power Test (2015)', suffix: 'm' },
  { end: 10, label: 'Times Stronger Solar in Space', suffix: 'x' },
  { end: 1, label: 'Gigawatt Target Output', suffix: 'GW', prefix: '' },
];

export default function FunFacts() {
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
            <span className="font-mono text-xs text-primary tracking-[0.3em]">DATA ARCHIVE</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Fun <span className="text-gradient-gold">Facts</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Quick stats, surprising truths, and fascinating data about JAXA, Project SOLARIS, and the future of space-based solar power.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="py-20 border-y border-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="By The Numbers"
            title="Key Statistics"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {stats.map((s, i) => (
              <StatsCounter key={i} end={s.end} suffix={s.suffix} prefix={s.prefix} duration={1800 + i * 200} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts Grid */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Quick Facts"
            title="Did You Know?"
            description="Surprising facts about Japan's space program and the revolutionary technology behind space-based solar power."
          />
          <div className="grid sm:grid-cols-2 gap-5">
            {quickFacts.map((item, i) => {
              const Icon = item.icon;
              return (
                <GlowCard key={i} delay={i * 0.06} variant={i % 3 === 0 ? 'gold' : 'cyan'} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.fact}</p>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}