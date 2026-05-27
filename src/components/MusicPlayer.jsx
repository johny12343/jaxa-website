import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    const initPlayer = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: 'UfcAVejslrU',
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: 'UfcAVejslrU',
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          mute: 1,
        },
        events: {
          onReady: (e) => {
            e.target.setVolume(15);
            e.target.playVideo();
            setReady(true);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const toggle = () => {
    if (!playerRef.current) return;
    if (muted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(15);
    } else {
      playerRef.current.mute();
    }
    setMuted(!muted);
  };

  return (
    <>
      {/* Hidden YouTube player */}
      <div className="fixed -bottom-[9999px] -left-[9999px] w-1 h-1 overflow-hidden pointer-events-none">
        <div ref={containerRef} />
      </div>

      {/* Toggle Button */}
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        title={muted ? 'Unmute ambient music' : 'Mute ambient music'}
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border group ${
          !muted
            ? 'bg-accent/15 border-accent/40 hover:bg-accent/25 glow-cyan'
            : 'glass-panel border-border/40 hover:border-accent/30'
        }`}
      >
        {!muted ? (
          <Volume2 className="w-4 h-4 text-accent" />
        ) : (
          <VolumeX className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
        )}

        {/* Animated rings when playing */}
        {!muted && (
          <>
            <span className="absolute inset-0 rounded-full border border-accent/20 animate-ping" style={{ animationDuration: '2s' }} />
            <span className="absolute inset-[-4px] rounded-full border border-accent/10 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          </>
        )}
      </motion.button>
    </>
  );
}