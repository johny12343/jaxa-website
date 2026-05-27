import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const energySystems = [
  {
    name: 'Coal Power Plant',
    buildCost: 3500,
    annualRunCost: 450,
    co2PerYear: 3500000,
    efficiency: 33,
    reliability: 85,
    lifespan: 40,
    landUse: 1,
    color: '#6B7280',
    desc: 'Burns coal to create steam, driving turbines. High CO₂ emissions and particulate pollution. Cheapest to build but devastating environmental cost.',
  },
  {
    name: 'Natural Gas',
    buildCost: 1200,
    annualRunCost: 350,
    co2PerYear: 1800000,
    efficiency: 40,
    reliability: 87,
    lifespan: 30,
    landUse: 1,
    color: '#F59E0B',
    desc: 'Cleaner than coal but still produces significant CO₂. Often used as a "bridge fuel" during transition to renewables.',
  },
  {
    name: 'Ground Solar',
    buildCost: 2000,
    annualRunCost: 50,
    co2PerYear: 20000,
    efficiency: 20,
    reliability: 25,
    lifespan: 25,
    landUse: 5,
    color: '#FFC107',
    desc: 'Solar panels on Earth\'s surface. Zero emissions during operation but limited by weather, nighttime, and requires large land areas.',
  },
  {
    name: 'Wind Power',
    buildCost: 2500,
    annualRunCost: 100,
    co2PerYear: 15000,
    efficiency: 35,
    reliability: 30,
    lifespan: 20,
    landUse: 10,
    color: '#10B981',
    desc: 'Clean energy from wind turbines. Intermittent — depends on wind conditions. Requires significant land or offshore installation.',
  },
  {
    name: 'Space Solar (SOLARIS)',
    buildCost: 12000,
    annualRunCost: 200,
    co2PerYear: 5000,
    efficiency: 90,
    reliability: 99,
    lifespan: 50,
    landUse: 0.5,
    color: '#00E5FF',
    desc: 'Solar panels in geostationary orbit. 24/7 collection, 5–10x solar intensity. Highest initial cost but unmatched long-term yield and near-zero emissions.',
  },
];

export default function EnergyArchitect() {
  const [selected, setSelected] = useState([0, 4]);

  const toggleSelect = (index) => {
    setSelected(prev => {
      if (prev.includes(index)) return prev.filter(i => i !== index);
      if (prev.length >= 3) return [...prev.slice(1), index];
      return [...prev, index];
    });
  };

  const costData = selected.map(i => ({
    name: energySystems[i].name.split(' ').slice(0, 2).join(' '),
    'Build Cost ($M)': energySystems[i].buildCost,
    'Annual Run Cost ($M)': energySystems[i].annualRunCost,
  }));

  const co2Data = selected.map(i => ({
    name: energySystems[i].name.split(' ').slice(0, 2).join(' '),
    'CO₂ (tons/yr)': energySystems[i].co2PerYear,
  }));

  const radarData = [
    { metric: 'Efficiency' },
    { metric: 'Reliability' },
    { metric: 'Lifespan' },
    { metric: 'Low Land Use' },
    { metric: 'Low Emissions' },
  ].map(d => {
    const result = { ...d };
    selected.forEach(i => {
      const s = energySystems[i];
      const name = s.name.split(' ').slice(0, 2).join(' ');
      if (d.metric === 'Efficiency') result[name] = s.efficiency;
      if (d.metric === 'Reliability') result[name] = s.reliability;
      if (d.metric === 'Lifespan') result[name] = (s.lifespan / 50) * 100;
      if (d.metric === 'Low Land Use') result[name] = Math.max(0, 100 - s.landUse * 10);
      if (d.metric === 'Low Emissions') result[name] = Math.max(0, 100 - (s.co2PerYear / 35000));
    });
    return result;
  });

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-2">Energy Architect</h2>
      <p className="text-sm text-muted-foreground mb-8">Select up to 3 energy systems to compare their costs, emissions, and performance.</p>

      {/* Energy System Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        {energySystems.map((sys, i) => (
          <button
            key={i}
            onClick={() => toggleSelect(i)}
            className={`rounded-lg p-3 text-center transition-all duration-300 border text-xs font-heading font-medium ${
              selected.includes(i)
                ? 'border-accent/60 bg-accent/10 text-accent'
                : 'border-border/30 glass-panel text-muted-foreground hover:border-border/60'
            }`}
          >
            <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ background: sys.color }} />
            {sys.name}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-10"
        >
          {/* Descriptions */}
          <div className="grid gap-3">
            {selected.map(i => (
              <div key={i} className="glass-panel rounded-lg p-4 border border-border/30">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: energySystems[i].color }} />
                  <span className="font-heading text-sm font-semibold">{energySystems[i].name}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{energySystems[i].desc}</p>
              </div>
            ))}
          </div>

          {/* Cost Comparison */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Cost Comparison ($ Millions per 1 GW)</h3>
            <div className="glass-panel rounded-xl p-4 border border-border/30" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8899AA' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#8899AA' }} />
                  <Tooltip
                    contentStyle={{ background: '#081226', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: '#F0F4F8' }}
                  />
                  <Bar dataKey="Build Cost ($M)" fill="#FFC107" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Annual Run Cost ($M)" fill="#00E5FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CO2 Comparison */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Annual CO₂ Emissions (tons per year)</h3>
            <div className="glass-panel rounded-xl p-4 border border-border/30" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={co2Data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8899AA' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#8899AA' }} />
                  <Tooltip
                    contentStyle={{ background: '#081226', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: '#F0F4F8' }}
                  />
                  <Bar dataKey="CO₂ (tons/yr)" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Performance Radar</h3>
            <div className="glass-panel rounded-xl p-4 border border-border/30" style={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#8899AA' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#556677' }} />
                  {selected.map(i => (
                    <Radar
                      key={i}
                      name={energySystems[i].name}
                      dataKey={energySystems[i].name.split(' ').slice(0, 2).join(' ')}
                      stroke={energySystems[i].color}
                      fill={energySystems[i].color}
                      fillOpacity={0.15}
                    />
                  ))}
                  <Tooltip
                    contentStyle={{ background: '#081226', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: '#F0F4F8' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}