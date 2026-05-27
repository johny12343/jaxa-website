import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import GlowCard from '../components/GlowCard';
import StarField from '../components/StarField';
import { Sun, Radio, Zap, Home, ArrowDown } from 'lucide-react';

const steps = [
  {
    icon: Sun,
    number: '01',
    title: 'Solar Collection in Orbit',
    desc: 'Massive solar panel arrays are deployed in geostationary orbit at 36,000 km altitude. Unlike Earth, there is no atmosphere, clouds, or nighttime to block sunlight. The panels receive direct, unfiltered solar radiation 24 hours a day.',
    detail: 'Solar intensity in space is approximately 1,361 W/m² — about 5 to 10 times stronger than average ground-level solar irradiance.',
    color: 'primary',
  },
  {
    icon: Radio,
    number: '02',
    title: 'Energy Conversion',
    desc: 'The collected solar energy is converted from DC electricity into microwave radiation (at 5.8 GHz) or laser beams. This conversion allows the energy to be transmitted wirelessly across vast distances through Earth\'s atmosphere.',
    detail: 'Microwave transmission at 5.8 GHz was chosen because this frequency passes through the atmosphere with minimal energy loss, even through clouds and rain.',
    color: 'accent',
  },
  {
    icon: Zap,
    number: '03',
    title: 'Wireless Transmission to Earth',
    desc: 'The microwave or laser beam is precisely aimed at a ground-based receiving station called a rectenna (rectifying antenna). The beam is carefully controlled to be safe and far below any harmful energy density.',
    detail: 'The power density of the microwave beam at the rectenna site would be comparable to standing in sunlight — well within safe limits for humans and wildlife.',
    color: 'primary',
  },
  {
    icon: Home,
    number: '04',
    title: 'Powering Homes & Cities',
    desc: 'The rectenna converts the received microwave energy back into electricity, which is then fed into the power grid. A single 1 GW space solar power station could power hundreds of thousands of homes with zero carbon emissions.',
    detail: 'JAXA\'s target is a 1 GW system by 2040–2050, which would be comparable to a nuclear power plant but with no fuel, no waste, and no meltdown risk.',
    color: 'accent',
  },
];

function DiagramStep({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="flex items-start gap-6">
        {/* Vertical Line + Icon */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className={`w-14 h-14 rounded-xl ${step.color === 'primary' ? 'bg-primary/10 border-primary/30' : 'bg-accent/10 border-accent/30'} border flex items-center justify-center`}>
            <step.icon className={`w-6 h-6 ${step.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
          </div>
          {index < steps.length - 1 && (
            <div className="w-px h-16 bg-gradient-to-b from-border/60 to-transparent mt-3 flex items-center justify-center">
              <ArrowDown className="w-3 h-3 text-accent/40 mt-8" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className={`font-mono text-xs tracking-widest ${step.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
              STEP {step.number}
            </span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-semibold mb-3">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
          <div className="glass-panel rounded-lg p-4">
            <span className="font-mono text-[10px] text-accent/60 tracking-widest block mb-1">TECHNICAL NOTE</span>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{step.detail}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
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
            <span className="font-mono text-xs text-accent tracking-[0.3em]">TRANSMISSION PROTOCOL</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              How <span className="text-gradient-cyan">It Works</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From sunlight in space to electricity in your home — the complete journey of orbital solar energy, step by step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Diagram Steps */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            label="Energy Path"
            title="The Transmission Journey"
            description="Follow the energy as it travels from a satellite in geostationary orbit to a power outlet on Earth."
          />
          {steps.map((step, i) => (
            <DiagramStep key={i} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Comparison"
            title="Microwave vs. Laser Transmission"
            description="JAXA is researching both methods. Each has unique advantages."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <GlowCard variant="cyan" className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Radio className="w-6 h-6 text-accent" />
                <h3 className="font-heading text-xl font-semibold">Microwave Transmission</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-accent mt-1">●</span> Operates at 5.8 GHz frequency</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">●</span> Passes through clouds and rain</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">●</span> Requires large rectenna arrays on ground</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">●</span> Very safe — lower power density than sunlight</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">●</span> JAXA's primary research focus</li>
              </ul>
            </GlowCard>
            <GlowCard variant="gold" className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-xl font-semibold">Laser Transmission</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">●</span> Uses concentrated light beams</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">●</span> Smaller receiving area needed</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">●</span> Affected by clouds and weather</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">●</span> Higher energy density per beam</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">●</span> Being explored as a secondary option</li>
              </ul>
            </GlowCard>
          </div>
        </div>
      </section>
    </div>
  );
}