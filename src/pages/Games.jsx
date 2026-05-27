import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StarField from '../components/StarField';
import SectionHeading from '../components/SectionHeading';
import { Gamepad2, Zap, Rocket, BarChart3 } from 'lucide-react';
import QuizGame from '../components/games/QuizGame';
import EnergyArchitect from '../components/games/EnergyArchitect';
import SolarJourney from '../components/games/SolarJourney';

const games = [
  { id: 'quiz', label: 'JAXA Quiz', icon: Rocket, desc: 'Test your knowledge about JAXA and Project SOLARIS' },
  { id: 'energy', label: 'Energy Architect', icon: BarChart3, desc: 'Compare energy systems and build a clean grid' },
  { id: 'journey', label: 'Solar Journey', icon: Zap, desc: 'Follow solar energy from space to your home' },
];

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);

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
            <span className="font-mono text-xs text-primary tracking-[0.3em]">MISSION CONTROL</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Interactive <span className="text-gradient-gold">Games</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn by playing. Test your knowledge, build energy systems, and trace the journey of space solar power.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Game Selector */}
      {!activeGame && (
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading label="Select Mission" title="Choose Your Experience" />
            <div className="grid sm:grid-cols-3 gap-6">
              {games.map((game, i) => {
                const Icon = game.icon;
                return (
                  <motion.button
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    onClick={() => setActiveGame(game.id)}
                    className="glass-panel rounded-xl p-8 text-left border border-accent/20 hover:border-primary/40 hover:glow-gold transition-all duration-500 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2">{game.label}</h3>
                    <p className="text-sm text-muted-foreground">{game.desc}</p>
                    <div className="font-mono text-xs text-accent/60 mt-4 tracking-widest group-hover:text-accent transition-colors">
                      LAUNCH →
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Active Game */}
      {activeGame && (
        <section className="py-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setActiveGame(null)}
              className="font-mono text-xs text-accent hover:text-accent/80 transition-colors tracking-widest mb-8 block"
            >
              ← BACK TO GAMES
            </button>
            {activeGame === 'quiz' && <QuizGame />}
            {activeGame === 'energy' && <EnergyArchitect />}
            {activeGame === 'journey' && <SolarJourney />}
          </div>
        </section>
      )}
    </div>
  );
}