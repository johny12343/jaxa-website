import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Zap, Radio, Globe, Home, ArrowRight, RotateCcw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stages = [
  {
    id: 'collection',
    icon: Sun,
    title: 'Stage 1: Solar Collection',
    location: 'Geostationary Orbit — 36,000 km',
    description: 'Your journey begins in the vacuum of space. Massive hexagonal solar panel arrays, spanning several kilometers, unfurl in geostationary orbit. Up here, there are no clouds, no night, no atmosphere — just pure, unfiltered sunlight hitting the panels 24 hours a day.',
    stats: [
      { label: 'Solar Intensity', value: '1,361 W/m²' },
      { label: 'Collection Time', value: '24 hours/day' },
      { label: 'Panel Efficiency', value: '~40%' },
    ],
    fact: 'A single square kilometer of solar panels in space generates roughly 1.36 GW of raw solar power — enough for a million homes before transmission losses.',
    color: 'primary',
  },
  {
    id: 'conversion',
    icon: Zap,
    title: 'Stage 2: Energy Conversion',
    location: 'Satellite Power Module',
    description: 'The collected solar energy (DC electricity) is now converted into a form that can travel through space and atmosphere. Giant magnetron arrays convert the electricity into a focused microwave beam at 5.8 GHz — the optimal frequency for atmospheric penetration.',
    stats: [
      { label: 'Frequency', value: '5.8 GHz' },
      { label: 'Conversion Efficiency', value: '~85%' },
      { label: 'Beam Diameter', value: '~1 km at transmitter' },
    ],
    fact: 'The 5.8 GHz frequency was specifically chosen because it passes through clouds, rain, and atmospheric water vapor with minimal energy loss.',
    color: 'accent',
  },
  {
    id: 'transmission',
    icon: Radio,
    title: 'Stage 3: Wireless Transmission',
    location: '36,000 km through Space & Atmosphere',
    description: 'The microwave beam travels 36,000 kilometers from orbit to Earth\'s surface. It passes through the vacuum of space and then Earth\'s atmosphere, arriving at a precisely targeted area on the ground. The beam spreads slightly during its journey but remains focused enough for efficient collection.',
    stats: [
      { label: 'Travel Distance', value: '36,000 km' },
      { label: 'Travel Time', value: '~0.12 seconds' },
      { label: 'Atmospheric Loss', value: '~2%' },
    ],
    fact: 'The power density of the beam at ground level would be about 23 mW/cm² at the center — comparable to the intensity of sunlight and well within safety limits.',
    color: 'primary',
  },
  {
    id: 'receiving',
    icon: Globe,
    title: 'Stage 4: Ground Reception',
    location: 'Rectenna Array — Japan',
    description: 'On the ground, a massive rectenna (rectifying antenna) array — potentially several kilometers across — captures the incoming microwave beam. Billions of tiny dipole antennas with integrated rectifiers convert the microwaves back into DC electricity.',
    stats: [
      { label: 'Rectenna Area', value: '~3 km diameter' },
      { label: 'Reception Efficiency', value: '~80%' },
      { label: 'Output Power', value: '~1 GW' },
    ],
    fact: 'Unlike solar panels, a rectenna can be built on stilts above farmland — the microwaves pass through to the antennas while crops grow underneath, so the land serves double duty.',
    color: 'accent',
  },
  {
    id: 'powering',
    icon: Home,
    title: 'Stage 5: Powering Your Home',
    location: 'Japanese Power Grid',
    description: 'The DC electricity from the rectenna is converted to AC and fed into Japan\'s power grid. From there, it travels through transmission lines to homes, schools, hospitals, and businesses across the country — clean energy from space, powering everyday life.',
    stats: [
      { label: 'Homes Powered', value: '~300,000+' },
      { label: 'CO₂ Emissions', value: 'Near Zero' },
      { label: 'Availability', value: '24/7/365' },
    ],
    fact: 'A single 1 GW space solar power station could replace a conventional nuclear or coal power plant, providing the same output without fuel, waste, or meltdown risk.',
    color: 'primary',
  },
];

export default function SolarJourney() {
  const [currentStage, setCurrentStage] = useState(0);
  const [completed, setCompleted] = useState(false);

  const stage = stages[currentStage];
  const Icon = stage.icon;

  const advance = () => {
    if (currentStage + 1 >= stages.length) {
      setCompleted(true);
    } else {
      setCurrentStage(s => s + 1);
    }
  };

  const restart = () => {
    setCurrentStage(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel rounded-xl p-10 text-center border border-primary/20"
      >
        <Sun className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="font-heading text-3xl font-bold mb-3">Journey Complete!</h2>
        <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
          You've followed solar energy from collection in orbit all the way to powering homes in Japan. This is the future JAXA is building with Project SOLARIS.
        </p>
        <div className="glass-panel-gold rounded-lg p-4 max-w-md mx-auto mb-8 border border-primary/20">
          <p className="text-sm text-muted-foreground">
            Total journey: <span className="text-primary font-semibold">36,000 km</span> in <span className="text-primary font-semibold">0.12 seconds</span> — from sunlight in space to electricity in your wall outlet.
          </p>
        </div>
        <Button onClick={restart} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <RotateCcw className="w-4 h-4" /> Restart Journey
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-2">Solar Energy Journey</h2>
      <p className="text-sm text-muted-foreground mb-8">Follow the path of solar energy from space to your home, one stage at a time.</p>

      {/* Progress */}
      <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
        {stages.map((s, i) => {
          const SIcon = s.icon;
          return (
            <React.Fragment key={s.id}>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wide whitespace-nowrap transition-all ${
                  i === currentStage
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : i < currentStage
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground/40'
                }`}
              >
                <SIcon className="w-3 h-3" />
                <span className="hidden sm:inline">{s.title.split(':')[0]}</span>
              </div>
              {i < stages.length - 1 && (
                <ChevronRight className={`w-3 h-3 flex-shrink-0 ${i < currentStage ? 'text-primary' : 'text-muted-foreground/20'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Stage Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass-panel rounded-xl border border-border/30 overflow-hidden">
            {/* Header */}
            <div className={`p-6 border-b border-border/30 ${stage.color === 'primary' ? 'bg-primary/5' : 'bg-accent/5'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stage.color === 'primary' ? 'bg-primary/10 border-primary/30' : 'bg-accent/10 border-accent/30'
                } border`}>
                  <Icon className={`w-6 h-6 ${stage.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold">{stage.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground tracking-wide">{stage.location}</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <p className="text-muted-foreground leading-relaxed">{stage.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {stage.stats.map((stat, i) => (
                  <div key={i} className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="font-heading text-lg font-bold text-primary">{stat.value}</div>
                    <div className="font-mono text-[10px] text-muted-foreground tracking-wider mt-1 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Fact */}
              <div className="glass-panel-gold rounded-lg p-4 border border-primary/15">
                <span className="font-mono text-[10px] text-primary tracking-widest block mb-1.5">DID YOU KNOW?</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{stage.fact}</p>
              </div>
            </div>
          </div>

          {/* Next */}
          <div className="mt-6 flex justify-end">
            <Button onClick={advance} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              {currentStage + 1 >= stages.length ? 'Complete Journey' : 'Continue Journey'} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}