import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import GlowCard from '../components/GlowCard';
import StarField from '../components/StarField';
import { ExternalLink, Globe, BookOpen, FlaskConical, Newspaper } from 'lucide-react';

const sources = [
  {
    category: 'Space Agencies',
    icon: Globe,
    items: [
      { name: 'JAXA — Japan Aerospace Exploration Agency', url: 'https://global.jaxa.jp/', desc: 'Official JAXA website with mission updates, research publications, and project details including SOLARIS.' },
      { name: 'NASA — National Aeronautics and Space Administration', url: 'https://www.nasa.gov/', desc: 'NASA research papers on space-based solar power feasibility and international collaboration.' },
      { name: 'ESA — European Space Agency', url: 'https://www.esa.int/', desc: 'ESA\'s research into Clean Energy from Space and the SOLARIS initiative partnership.' },
    ],
  },
  {
    category: 'Research & Academic',
    icon: FlaskConical,
    items: [
      { name: 'JAXA SBSP Research Page', url: 'https://www.kenkai.jaxa.jp/eng/research/ssps/ssps-index.html', desc: 'JAXA\'s dedicated Space Solar Power Systems (SSPS) research overview and technical documentation.' },
      { name: 'National Space Policy Secretariat (Japan)', url: 'https://www8.cao.go.jp/space/english/index.html', desc: 'Japanese government space policy documents outlining the strategic roadmap for SBSP.' },
      { name: 'IEEE Xplore — Wireless Power Transmission', url: 'https://ieeexplore.ieee.org/', desc: 'Peer-reviewed engineering papers on microwave and laser power transmission technologies.' },
    ],
  },
  {
    category: 'Energy & Sustainability',
    icon: BookOpen,
    items: [
      { name: 'International Energy Agency (IEA)', url: 'https://www.iea.org/', desc: 'Global energy data, reports on renewable energy transitions, and clean technology analysis.' },
      { name: 'U.S. Department of Energy — Solar', url: 'https://www.energy.gov/solar', desc: 'Research on ground-based and space-based solar energy technologies and their comparative efficiencies.' },
      { name: 'IRENA — International Renewable Energy Agency', url: 'https://www.irena.org/', desc: 'Global renewable energy data, cost analyses, and policy frameworks for sustainable energy.' },
    ],
  },
  {
    category: 'News & Media',
    icon: Newspaper,
    items: [
      { name: 'Space.com', url: 'https://www.space.com/', desc: 'Space industry news covering JAXA missions, satellite technology, and space-based solar power developments.' },
      { name: 'The Japan Times — Science', url: 'https://www.japantimes.co.jp/tag/jaxa/', desc: 'English-language Japanese news covering JAXA announcements and Japan\'s energy policy.' },
      { name: 'Nikkei Asia', url: 'https://asia.nikkei.com/', desc: 'Asian business and technology news including Japan\'s clean energy initiatives and space technology investments.' },
    ],
  },
];

export default function Sources() {
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
            <span className="font-mono text-xs text-accent tracking-[0.3em]">REFERENCES</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              <span className="text-gradient-cyan">Sources</span> & Citations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              All information on this website is sourced from reputable space agencies, research institutions, and academic publications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {sources.map((group, gi) => {
            const GroupIcon = group.icon;
            return (
              <div key={gi}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <GroupIcon className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold">{group.category}</h2>
                </div>
                <div className="grid gap-4">
                  {group.items.map((item, i) => (
                    <GlowCard key={i} delay={i * 0.08} variant={gi % 2 === 0 ? 'cyan' : 'gold'} className="p-6">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-4"
                      >
                        <div>
                          <h3 className="font-heading text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                          <span className="font-mono text-xs text-accent/60 mt-2 block">{item.url}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-primary transition-colors" />
                      </a>
                    </GlowCard>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 sm:px-6 border-t border-border/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-muted-foreground/60 leading-relaxed font-mono">
            DISCLAIMER: This website was created for educational purposes as a school project. All data and claims are sourced from the organizations listed above. For the most current information, please visit the original sources directly.
          </p>
        </div>
      </section>
    </div>
  );
}