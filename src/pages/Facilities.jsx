const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SectionHeading from '../components/SectionHeading';
import GlowCard from '../components/GlowCard';
import StarField from '../components/StarField';
import { MapPin, Rocket, FlaskConical, Satellite, Radio } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const facilities = [
  {
    name: 'Tanegashima Space Center',
    lat: 30.4,
    lng: 131.0,
    icon: Rocket,
    desc: 'Japan\'s largest launch facility, located on a subtropical island south of Kyushu. This is where H-IIA, H-IIB, and H3 rockets launch into orbit. Future SOLARIS satellite deployments would likely launch from here.',
    role: 'Launch Operations',
  },
  {
    name: 'Tsukuba Space Center',
    lat: 36.06,
    lng: 140.13,
    icon: FlaskConical,
    desc: 'JAXA\'s primary research and development hub, located northeast of Tokyo. Home to the Space Station Integration & Promotion Center, and where much of the SOLARIS microwave transmission research takes place.',
    role: 'Research & Development',
  },
  {
    name: 'Sagamihara Campus',
    lat: 35.57,
    lng: 139.39,
    icon: Satellite,
    desc: 'JAXA\'s Institute of Space and Astronautical Science (ISAS) is located here. This campus focuses on scientific missions including deep space exploration and advanced satellite technology research.',
    role: 'Scientific Research',
  },
  {
    name: 'Kashima Space Technology Center',
    lat: 35.95,
    lng: 140.66,
    icon: Radio,
    desc: 'Home to NICT\'s space communication research. Key facility for developing and testing wireless power transmission technologies crucial to the SOLARIS project.',
    role: 'Communication & Transmission',
  },
];

export default function Facilities() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <StarField />
        <div className="absolute inset-0">
          <img
            src="https://media.db.com/images/public/6a13b9abf863de372d11244b/39d17a126_generated_74ac725e.png"
            alt="Night satellite view of the Japanese archipelago"
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
            <span className="font-mono text-xs text-accent tracking-[0.3em]">GROUND STATIONS</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              JAXA <span className="text-gradient-cyan">Facilities</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore the key research centers and launch sites across Japan that make Project SOLARIS possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Interactive Map"
            title="Mission Ground Stations"
            description="Click on markers to learn about each JAXA facility and its role in Japan's space program."
          />
          <div className="rounded-xl overflow-hidden border border-border/50 glow-cyan" style={{ height: 500 }}>
            <MapContainer
              center={[36.0, 138.0]}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap contributors &copy; CARTO'
              />
              {facilities.map((f, i) => (
                <Marker key={i} position={[f.lat, f.lng]} eventHandlers={{ click: () => setSelected(f) }}>
                  <Popup>
                    <div className="text-sm">
                      <strong>{f.name}</strong><br />
                      {f.role}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Facility Cards */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
          {facilities.map((f, i) => {
            const Icon = f.icon;
            return (
              <GlowCard key={i} delay={i * 0.1} variant={i % 2 === 0 ? 'cyan' : 'gold'} className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-primary tracking-widest">{f.role.toUpperCase()}</span>
                    <h3 className="font-heading text-lg font-semibold mt-1 mb-2">{f.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground/60 font-mono">
                      <MapPin className="w-3 h-3" />
                      {f.lat.toFixed(2)}°N, {f.lng.toFixed(2)}°E
                    </div>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}