import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MusicPlayer from './MusicPlayer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Transmission Line */}
      <div className="fixed left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent z-0 pointer-events-none" />

      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  );
}