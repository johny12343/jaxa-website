const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import GlowCard from '../components/GlowCard';
import StatsCounter from '../components/StatsCounter';
import StarField from '../components/StarField';
import { Sun, Zap, Shield, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: Sun,
    title: '24/7 Solar Collection',
    desc: 'Unlike ground solar panels, space-based solar panels receive direct sunlight around the clock, unblocked by clouds, night, or weather.',
  },
  {
    icon: Zap,
    title: '5–10x More Efficient',
    desc: 'Solar intensity in space is approximately 5 to 10 times stronger than on Earth\'s surface, dramatically increasing energy yield per panel.',
  },
  {
    icon: Shield,
    title: 'Zero Land Use',
    desc: 'Space-based solar power requires no terrestrial land for solar farms, preserving ecosystems and agricultural areas.',
  },
  {
    icon: Leaf,
    title: 'Massive CO₂ Reduction',
    desc: 'Project SOLARIS could significantly reduce Japan\'s carbon emissions, contributing to global climate targets and a sustainable future.',
  },
];

export default function Solaris() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <StarField />
        <div className="absolute inset-0">
          <img
            src="https://media.db.com/images/public/6a13b9abf863de372d11244b/fa4e2612b_generated_d9d6925d.png"
            alt="Space solar power station beaming energy to Earth"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs text-primary tracking-[0.3em]">JAXA INITIATIVE</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Project <span className="text-gradient-gold">SOLARIS</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A groundbreaking JAXA initiative to develop space-based solar power technology, targeting deployment by 2040–2050 to power hundreds of thousands of homes with clean orbital energy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatsCounter end={1} prefix="" suffix="GW" duration={1500} label="Target Power Output" />
          <StatsCounter end={100000} suffix="+" duration={2200} label="Homes Powered" />
          <StatsCounter end={36000} suffix="km" duration={2000} label="Orbital Altitude" />
          <StatsCounter end={10} suffix="x" duration={1800} label="Solar Intensity vs Earth" />
        </div>
      </section>

      {/* What is SOLARIS */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="The Mission"
            title="What Is Project SOLARIS?"
            description="SOLARIS is JAXA's plan to build a large-scale space-based solar power system that captures sunlight in orbit and transmits it wirelessly to receiving stations on Earth."
          />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <p className="text-muted-foreground leading-relaxed">
                Space-based solar power (SBSP) is not science fiction — it's a real technology that Japan has been researching for decades. The core idea is simple: place massive solar arrays in geostationary orbit where they receive uninterrupted sunlight, convert that energy, and beam it back to Earth using microwave or laser transmission.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Unlike ground-based solar panels that depend on weather and daylight, orbital solar panels can generate power 24 hours a day, 365 days a year. JAXA's roadmap targets a 1-gigawatt power station — enough to power a city.
              </p>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors tracking-wide"
              >
                SEE HOW IT WORKS <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden glow-cyan">
              <img
                src="https://media.db.com/images/public/6a13b9abf863de372d11244b/1d7308c3f_generated_9e93aa8a.png"
                alt="Microwave energy transmitter closeup with blue beam"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Advantages"
            title="Why Space Solar Power?"
            description="The benefits of collecting solar energy from orbit rather than the Earth's surface are transformative."
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((item, i) => {
              const Icon = item.icon;
              return (
                <GlowCard key={i} delay={i * 0.1} variant={i % 2 === 0 ? 'gold' : 'cyan'} className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
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