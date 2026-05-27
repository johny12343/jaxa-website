const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, BookOpen, Zap, ArrowRight, Satellite, Globe, Sun } from 'lucide-react';
import StarField from '../components/StarField';
import StatsCounter from '../components/StatsCounter';
import GlowCard from '../components/GlowCard';
import SectionHeading from '../components/SectionHeading';

const heroButtons = [
  { label: 'Explore Games', path: '/games', icon: Gamepad2, variant: 'primary' },
  { label: 'Fun Facts', path: '/fun-facts', icon: Zap, variant: 'secondary' },
  { label: 'Sources', path: '/sources', icon: BookOpen, variant: 'secondary' },
];

const highlights = [
  {
    icon: Satellite,
    title: 'Space-Based Solar Power',
    desc: 'Collecting solar energy in geostationary orbit where the sun shines 24 hours a day, 365 days a year, unaffected by weather or nighttime.',
    link: '/solaris',
  },
  {
    icon: Zap,
    title: 'Wireless Energy Transmission',
    desc: 'Beaming collected solar energy to Earth using high-precision microwave or laser technology, powering homes without cables from space.',
    link: '/how-it-works',
  },
  {
    icon: Globe,
    title: 'Japan Leading the Future',
    desc: 'JAXA aims to power hundreds of thousands of homes by 2040–2050, positioning Japan at the forefront of global clean energy innovation.',
    link: '/about',
  },
];

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <StarField />
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://media.db.com/images/public/6a13b9abf863de372d11244b/f79076eff_generated_2fa85c27.png"
            alt="Solar satellite array orbiting Earth above Japan"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        {/* Frame Markers */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-accent/40 tracking-widest">
          SYS://SOLARIS_V2
        </div>
        <div className="absolute top-6 right-6 font-mono text-[10px] text-accent/40 tracking-widest">
          36,000 KM GEO
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[10px] text-accent/40 tracking-widest">
          JAXA // EST. 2003
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-accent/40 tracking-widest">
          TARGET: 2040
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs text-accent tracking-[0.4em] uppercase mb-6">
              Japan Aerospace Exploration Agency
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-foreground">JAXA & Project </span>
              <span className="text-gradient-gold">SOLARIS</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-muted-foreground mt-2 block">
                Powering Earth From Space
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Japan is pioneering space-based solar power — a revolutionary technology that collects unlimited clean energy from orbit and beams it wirelessly to Earth.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {heroButtons.map((btn, i) => {
                const Icon = btn.icon;
                return (
                  <motion.div
                    key={btn.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      to={btn.path}
                      className={`group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg font-heading text-sm font-semibold tracking-wide transition-all duration-300 ${
                        btn.variant === 'primary'
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90 glow-gold'
                          : 'glass-panel text-foreground hover:border-accent/40'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {btn.label}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-5 h-8 rounded-full border border-accent/30 flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1 rounded-full bg-accent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative py-16 border-y border-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatsCounter end={2003} duration={1500} label="JAXA Founded" />
          <StatsCounter end={24} suffix="hrs" duration={1800} label="Solar Collection / Day" />
          <StatsCounter end={36000} suffix="km" duration={2200} label="Geostationary Orbit" />
          <StatsCounter end={2040} duration={2000} label="Target Deployment" />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Mission Overview"
            title="The Future of Clean Energy"
            description="Project SOLARIS represents humanity's next leap in sustainable energy, harnessing the power of our sun from the limitless expanse of space."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <GlowCard key={i} delay={i * 0.1} variant={i === 0 ? 'gold' : 'cyan'} className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{item.desc}</p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary/80 transition-colors tracking-wide"
                  >
                    LEARN MORE <ArrowRight className="w-3 h-3" />
                  </Link>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CIRCUIT IMAGE */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://media.db.com/images/public/6a13b9abf863de372d11244b/fda6c64b1_generated_b293dff2.png"
              alt="Japanese aerospace satellite circuitry macro photography"
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent flex items-center">
              <div className="px-8 sm:px-12 max-w-lg">
                <span className="font-mono text-xs text-accent tracking-widest">ENGINEERING PRECISION</span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold mt-2 mb-3">Built With Japanese Excellence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every component of the SOLARIS satellite system reflects decades of Japanese aerospace innovation, from microwave transmitters to ultra-efficient solar cells.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl p-8 sm:p-12 border border-primary/20 overflow-hidden"
            style={{ background: 'rgba(8, 18, 38, 0.75)', backdropFilter: 'blur(20px)', boxShadow: '0 0 40px rgba(255,193,7,0.07), 0 0 80px rgba(255,193,7,0.03)' }}
          >
            {/* Subtle gold corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />

            <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase mb-6 block">The Team Behind This</span>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-8">About Us</h2>

            <p className="text-muted-foreground leading-relaxed mb-5">
              My name is <span className="text-foreground font-medium">Jasraj</span> and my partner is <span className="text-foreground font-medium">Osman</span>. When we first came across Project SOLARIS and everything JAXA is working towards, we were genuinely amazed. The idea that humanity could one day power entire cities using sunlight collected from space felt like something we had never heard of before and honestly, it still does.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              From that moment we decided to give this project everything we had. We wanted to build something that did not just inform people, but actually made them feel the same excitement we felt when we first discovered it.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              We hope this website makes you look up at the sky a little differently. 🚀
            </p>

            {/* Name cards */}
            <div className="flex flex-wrap gap-4">
              {['Jasraj', 'Osman'].map((name) => (
                <div key={name} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-accent/20 bg-accent/5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="font-heading text-xs font-bold text-primary">{name[0]}</span>
                  </div>
                  <span className="font-heading text-sm font-semibold">{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <Sun className="w-10 h-10 text-primary mx-auto mb-6" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Ready to Explore?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Discover how Japan is turning science fiction into reality. Dive into interactive games, explore the science, and learn about humanity's orbital energy future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/games"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-heading text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors glow-gold"
            >
              <Gamepad2 className="w-4 h-4" /> Play Games
            </Link>
            <Link
              to="/solaris"
              className="inline-flex items-center gap-2 px-6 py-3 glass-panel rounded-lg font-heading text-sm font-semibold tracking-wide hover:border-accent/40 transition-all"
            >
              <Satellite className="w-4 h-4" /> Learn About SOLARIS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}