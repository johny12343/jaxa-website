import React, { useState, useEffect } from 'react';
import { Satellite } from 'lucide-react';

export default function Footer() {
  const [energyYield, setEnergyYield] = useState(1247832);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyYield(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Satellite className="w-5 h-5 text-accent" />
              <span className="font-heading text-lg font-bold">Project SOLARIS</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A research initiative by JAXA to develop space-based solar power technology, aiming to provide clean, unlimited energy to Earth by 2040–2050.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold text-primary mb-4 tracking-wider">MISSION DATA</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-mono text-xs">SIM_ENERGY_YIELD</span>
                <span className="text-accent font-mono text-xs">{energyYield.toLocaleString()} kWh</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-mono text-xs">SYS_STATUS</span>
                <span className="text-green-400 font-mono text-xs">OPERATIONAL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-mono text-xs">TARGET_YEAR</span>
                <span className="text-primary font-mono text-xs">2040</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold text-primary mb-4 tracking-wider">ACKNOWLEDGMENTS</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This educational website was created for a school project. All information sourced from JAXA, NASA, and publicly available research papers on space-based solar power.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] text-muted-foreground/60 tracking-widest">
            JAXA SOLARIS // V2.0 // SCHOOL PROJECT 2026
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/60">
            DATA SOURCES: JAXA.JP • NASA.GOV • ESA.INT
          </span>
        </div>
      </div>
    </footer>
  );
}