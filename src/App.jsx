import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Calendar,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';

// ============================================================================
// CONFIGURATION OBJECT (Edit couple, date, venue, and timeline details here)
// ============================================================================
const WEDDING_CONFIG = {
  couple: {
    bride: "Harini",
    groom: "Adharsh",
    brideInitial: "H",
    groomInitial: "A",
    monogram: "H & A",
    tagline: "Together with their families",
    invitationText:
      "Harini & Adharsh joyfully request the pleasure of your company as they celebrate their engagement and begin this beautiful new chapter surrounded by the people they love most.",
  },
  date: {
    displayDots: "10.12.2026",
    displaySpaced: "10 · 12 · 2026",
    displayFull: "December 10, 2026",
    displayTime: "Thursday · 6:00 PM Onwards",
    isoTarget: "2026-12-10T18:00:00",
    calendarTitle: "Harini & Adharsh's Engagement Celebration — MAHAL",
    calendarStart: "20261210T180000",
    calendarEnd: "20261210T233000",
  },
  venue: {
    name: "Mahal",
    cityCountry: "Madurai, India",
    address: "Address",
    description1:
      "We are excited to celebrate this special occasion with you at the beautiful Mahal in Madurai, India.",
    description2:
      "We recommend arriving a little early to take in and enjoy the surroundings before the engagement begins.",
    mapsUrl: "https://maps.google.com/?q=Madurai+India",
  },
  timeline: [
    {
      time: "6:00 PM",
      dateLabel: "DECEMBER 10, 2026",
      title: "WELCOME",
      description:
        "Warm welcome drinks and gathering of family and friends at the mahal on December 10, 2026.",
      icon: "welcome_flutes",
    },
    {
      time: "6:30 PM",
      dateLabel: "THE EXCHANGE OF RINGS",
      title: "ENGAGEMENT CEREMONY",
      description:
        "Exchange of rings, blessings, and heartfelt vows surrounded by our dearest loved ones.",
      icon: "ceremony_rings",
    },
    {
      time: "7:00 PM",
      dateLabel: "CELEBRATORY BANQUET",
      title: "DINNER",
      description: "A dinner filled with tasty foods and desserts.",
      icon: "dinner_cloche",
    },
  ],
};

// ============================================================================
// SAFE WEB AUDIO ENGINE (Wax-Pop, Paper Rustle, Harp Glissando & Ambient Loop)
// ============================================================================
class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isAmbientPlaying = false;
    this.intervalId = null;
    this.step = 0;
    this.progression = [
      { bass: 146.83, notes: [293.66, 349.23, 440.0, 587.33] },
      { bass: 116.54, notes: [233.08, 349.23, 440.0, 523.25] },
      { bass: 174.61, notes: [261.63, 349.23, 440.0, 523.25] },
      { bass: 130.81, notes: [261.63, 329.63, 392.0, 523.25] },
    ];
  }

  init() {
    try {
      if (typeof window === 'undefined') return;
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // Gracefully ignore restricted audio environments
    }
  }

  playSealChime() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Tactile wax-seal pop
      const popOsc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      popOsc.type = 'triangle';
      popOsc.frequency.setValueAtTime(175, now);
      popOsc.frequency.exponentialRampToValueAtTime(48, now + 0.16);
      popGain.gain.setValueAtTime(0.11, now);
      popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      popOsc.connect(popGain);
      popGain.connect(this.ctx.destination);
      popOsc.start(now);
      popOsc.stop(now + 0.2);

      // 2. Soft silk ribbon & cotton cardstock swing rustle
      const duration = 2.0;
      const bufferSize = Math.max(1, Math.floor(this.ctx.sampleRate * duration));
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i += 1) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(560, now + 0.45);
      bandpass.frequency.exponentialRampToValueAtTime(1500, now + 1.35);
      bandpass.frequency.exponentialRampToValueAtTime(480, now + 2.35);
      bandpass.Q.setValueAtTime(2.0, now + 0.45);

      const rustleGain = this.ctx.createGain();
      rustleGain.gain.setValueAtTime(0.0001, now + 0.45);
      rustleGain.gain.linearRampToValueAtTime(0.016, now + 1.1);
      rustleGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      whiteNoise.connect(bandpass);
      bandpass.connect(rustleGain);
      rustleGain.connect(this.ctx.destination);
      whiteNoise.start(now + 0.45);
      whiteNoise.stop(now + 2.45);

      // 3. Ascending 8-note harp glissando
      const chimeNotes = [293.66, 349.23, 440.0, 523.25, 587.33, 698.46, 880.0, 1046.5];
      chimeNotes.forEach((freq, idx) => {
        const startTime = now + 0.35 + idx * 0.16;
        const osc = this.ctx.createOscillator();
        const overtone = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(freq * 2, startTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2100, startTime);
        filter.frequency.exponentialRampToValueAtTime(460, startTime + 1.5);

        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(0.03, startTime + 0.035);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.55);

        osc.connect(filter);
        overtone.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        overtone.start(startTime);
        osc.stop(startTime + 1.6);
        overtone.stop(startTime + 1.6);
      });
    } catch {
      // Ignore Web Audio errors
    }
  }

  playBloomArpeggio() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [293.66, 349.23, 440.0, 587.33, 698.46, 880.0, 1174.66];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          try {
            if (!this.ctx || this.isMuted) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.038, now + 0.045);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 2.1);
          } catch {
            // Ignore transient audio errors
          }
        }, idx * 75);
      });
    } catch {
      // Ignore Web Audio errors
    }
  }

  playAmbientNote(freq, duration = 2.6, volume = 0.015, type = 'sine', attack = 0.2) {
    try {
      if (!this.ctx || this.isMuted) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // Ignore transient audio errors
    }
  }

  startAmbient() {
    try {
      this.init();
      this.isMuted = false;
      if (this.isAmbientPlaying) return;
      this.isAmbientPlaying = true;

      const triggerStep = () => {
        if (!this.isAmbientPlaying || this.isMuted) return;
        const chordIdx = Math.floor(this.step / 4) % this.progression.length;
        const noteIdx = this.step % 4;
        const chord = this.progression[chordIdx];

        if (noteIdx === 0) {
          this.playAmbientNote(chord.bass, 3.4, 0.014, 'triangle', 0.38);
        }
        this.playAmbientNote(chord.notes[noteIdx], 2.3, 0.012, 'sine', 0.14);
        this.step += 1;
      };

      triggerStep();
      this.intervalId = setInterval(triggerStep, 960);
    } catch {
      // Ignore Web Audio errors
    }
  }

  stopAmbient() {
    this.isAmbientPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  toggleMute() {
    if (!this.isMuted && this.isAmbientPlaying) {
      this.isMuted = true;
      this.stopAmbient();
      return false;
    }
    this.isMuted = false;
    this.startAmbient();
    return true;
  }
}

const audioEngine = new RomanticAudioEngine();

// ============================================================================
// SCROLL REVEAL & CHANTILLY LACE DIVIDERS
// ============================================================================
const RevealOnScroll = ({ children, className = '', delay = 0, variant = 'fade-up' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`lux-reveal lux-reveal-${variant} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

/** Scalloped Chantilly Lace Divider framing the Velvet Emerald Countdown Section */
const ScallopedLaceDivider = ({ position = 'top', flip = false }) => {
  const isTop = position === 'top';
  const uid = isTop ? 'top' : 'bottom';
  return (
    <div
      className="relative w-full overflow-hidden select-none pointer-events-none leading-none z-10"
      style={{
        height: '82px',
        marginTop: isTop ? '-1px' : '0',
        marginBottom: !isTop ? '-1px' : '0',
        transform: flip ? 'rotate(180deg)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 800 130"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 5px 12px rgba(4, 18, 13, 0.48))' }}
      >
        <defs>
          <pattern id={`chantillyMesh-${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 5 0 L 10 5 L 5 10 L 0 5 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.45"
              strokeOpacity="0.58"
            />
            <circle cx="5" cy="5" r="0.7" fill="#E5CA8C" fillOpacity="0.5" />
          </pattern>

          <pattern id={`royalScallop-${uid}`} width="160" height="130" patternUnits="userSpaceOnUse">
            <path
              d="M 0 0 L 160 0 L 160 28 Q 140 54 120 38 Q 80 94 40 38 Q 20 54 0 28 Z"
              fill="#F7F5EE"
            />
            <path
              d="M 0 0 L 160 0 L 160 74 Q 140 96 120 74 Q 80 124 40 74 Q 20 96 0 74 Z"
              fill={`url(#chantillyMesh-${uid})`}
            />
            <path
              d="M 0 0 L 160 0 L 160 60 Q 140 82 120 62 Q 80 112 40 62 Q 20 82 0 60 Z"
              fill="#FCFBF7"
              fillOpacity="0.74"
            />
            <path
              d="M 0 74 Q 20 96 40 74 Q 80 124 120 74 Q 140 96 160 74"
              fill="none"
              stroke="#E5CA8C"
              strokeWidth="1.35"
              strokeDasharray="1.5 2.5"
              strokeOpacity="0.88"
            />
            <path
              d="M 0 60 Q 20 82 40 62 Q 80 112 120 62 Q 140 82 160 60"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeOpacity="0.92"
            />
            <g transform="translate(80, 58)" stroke="#FFFFFF" fill="#FDFCF9" fillOpacity="0.88">
              <circle cx="0" cy="0" r="15" strokeWidth="1.4" />
              <circle cx="0" cy="0" r="9" strokeWidth="1.1" fill="#F0EDE2" />
              <circle cx="0" cy="0" r="3.6" fill="#C8A252" stroke="none" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <ellipse
                  key={deg}
                  cx="0"
                  cy="-11"
                  rx="4.2"
                  ry="6"
                  transform={`rotate(${deg})`}
                  fill="none"
                  strokeWidth="1"
                />
              ))}
              <path d="M -32 -14 C -24 -2, -16 8, -14 0" fill="none" strokeWidth="1.1" />
              <path d="M 32 -14 C 24 -2, 16 8, 14 0" fill="none" strokeWidth="1.1" />
            </g>
            {[20, 140].map((bx) => (
              <g key={bx} transform={`translate(${bx}, 44)`} stroke="#FFFFFF" fill="#FFFFFF" fillOpacity="0.78">
                <circle cx="0" cy="0" r="7.5" strokeWidth="1.1" />
                <circle cx="0" cy="0" r="2.6" fill="#C8A252" stroke="none" />
              </g>
            ))}
          </pattern>
        </defs>
        <rect x="0" y="0" width="800" height="130" fill={`url(#royalScallop-${uid})`} />
      </svg>
    </div>
  );
};

// ============================================================================
// BLOOMING CHAMPAGNE-GOLD & JADE BOTANICAL FLOWERS & SCRATCH COUNTDOWN CARD
// ============================================================================
const EmeraldGoldFlowerSVG = ({ variant = 0, size = 36 }) => {
  if (variant % 3 === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible drop-shadow-md">
        <defs>
          <radialGradient id="champagneRoseGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="38%" stopColor="#F5E2B8" />
            <stop offset="74%" stopColor="#D4AF6A" />
            <stop offset="100%" stopColor="#8C6828" />
          </radialGradient>
        </defs>
        <g transform="translate(32,32)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-14"
              rx="9"
              ry="14"
              transform={`rotate(${deg})`}
              fill="url(#champagneRoseGrad)"
              stroke="#FFFBF0"
              strokeWidth="0.6"
              opacity="0.94"
            />
          ))}
          {[22, 82, 142, 202, 262, 322].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-8"
              rx="6.5"
              ry="10"
              transform={`rotate(${deg})`}
              fill="#F7ECCE"
              stroke="#9A7832"
              strokeWidth="0.6"
            />
          ))}
          <circle cx="0" cy="0" r="5.2" fill="#FFFDF7" />
          <circle cx="0" cy="0" r="2.4" fill="#C8A252" />
        </g>
      </svg>
    );
  }
  if (variant % 3 === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible drop-shadow-md">
        <g transform="translate(32,32)">
          {[0, 72, 144, 216, 288].map((deg) => (
            <path
              key={deg}
              d="M 0 0 C -10 -12, -12 -25, 0 -27 C 12 -25, 10 -12, 0 0 Z"
              transform={`rotate(${deg})`}
              fill="#6AB396"
              stroke="#EBF9F3"
              strokeWidth="0.9"
            />
          ))}
          {[36, 108, 180, 252, 324].map((deg) => (
            <path
              key={deg}
              d="M 0 0 C -6 -8, -7 -17, 0 -19 C 7 -17, 6 -8, 0 0 Z"
              transform={`rotate(${deg})`}
              fill="#CBEAD9"
              opacity="0.92"
            />
          ))}
          <circle cx="0" cy="0" r="4.5" fill="#E5CA8C" stroke="#9A7832" strokeWidth="0.8" />
        </g>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible drop-shadow-md">
      <g transform="translate(32,32) rotate(-20)">
        <path d="M 0 24 Q 2 0 0 -24" stroke="#E5CA8C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {[-18, -11, -4, 3, 10].map((y, idx) => (
          <g key={idx} transform={`translate(0, ${y})`}>
            <ellipse
              cx="-6"
              cy="-2"
              rx="5.5"
              ry="3.2"
              transform="rotate(-32 -6 -2)"
              fill="#3E8A6E"
              stroke="#EBF9F3"
              strokeWidth="0.6"
            />
            <ellipse
              cx="6"
              cy="-2"
              rx="5.5"
              ry="3.2"
              transform="rotate(32 6 -2)"
              fill="#6AB396"
              stroke="#EBF9F3"
              strokeWidth="0.6"
            />
            <circle cx="0" cy="-4" r="2.6" fill="#F7ECCE" />
          </g>
        ))}
      </g>
    </svg>
  );
};

const ScratchToRevealCountdown = ({ timeLeft, dateConfig, coupleConfig }) => {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const moveCounterRef = useRef(0);

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [bloomCycle, setBloomCycle] = useState(0);

  const flowerParticles = [
    { id: 1, tx: '-135px', ty: '-105px', rot: '-28deg', scale: 1.15, delay: 0, variant: 0, size: 42 },
    { id: 2, tx: '135px', ty: '-100px', rot: '32deg', scale: 1.1, delay: 60, variant: 1, size: 40 },
    { id: 3, tx: '-148px', ty: '-15px', rot: '-45deg', scale: 0.95, delay: 110, variant: 2, size: 38 },
    { id: 4, tx: '148px', ty: '-10px', rot: '40deg', scale: 1.0, delay: 150, variant: 0, size: 38 },
    { id: 5, tx: '-128px', ty: '88px', rot: '-20deg', scale: 1.12, delay: 90, variant: 1, size: 42 },
    { id: 6, tx: '128px', ty: '92px', rot: '25deg', scale: 1.08, delay: 130, variant: 2, size: 40 },
    { id: 7, tx: '-65px', ty: '-122px', rot: '-14deg', scale: 0.9, delay: 50, variant: 2, size: 34 },
    { id: 8, tx: '68px', ty: '-120px', rot: '18deg', scale: 0.92, delay: 80, variant: 0, size: 36 },
    { id: 9, tx: '0px', ty: '-132px', rot: '8deg', scale: 1.22, delay: 30, variant: 0, size: 46 },
    { id: 10, tx: '-72px', ty: '116px', rot: '-18deg', scale: 0.95, delay: 140, variant: 0, size: 36 },
    { id: 11, tx: '74px', ty: '115px', rot: '22deg', scale: 0.92, delay: 170, variant: 1, size: 36 },
    { id: 12, tx: '0px', ty: '125px', rot: '-6deg', scale: 1.16, delay: 100, variant: 1, size: 44 },
  ];

  const cornerBlossoms = [
    { pos: 'top-2 left-2', variant: 0, size: 34, delay: '120ms' },
    { pos: 'top-6 left-9', variant: 2, size: 26, delay: '260ms' },
    { pos: 'top-2 right-2', variant: 1, size: 34, delay: '180ms' },
    { pos: 'top-6 right-9', variant: 0, size: 26, delay: '320ms' },
    { pos: 'bottom-2 left-2', variant: 1, size: 32, delay: '220ms' },
    { pos: 'bottom-2 right-2', variant: 0, size: 32, delay: '280ms' },
  ];

  const initFoilCanvas = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect || rect.width <= 0 || rect.height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      if (canvas.width <= 0 || canvas.height <= 0) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';

      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, '#D8BE86');
      grad.addColorStop(0.28, '#F6F3E8');
      grad.addColorStop(0.5, '#E5CA8C');
      grad.addColorStop(0.75, '#FAF8F0');
      grad.addColorStop(1, '#C8A252');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.36)';
      ctx.lineWidth = 1;
      for (let x = -rect.height; x < rect.width + rect.height; x += 14) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - rect.height, rect.height);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(15, 51, 41, 0.34)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(12, 12, Math.max(1, rect.width - 24), Math.max(1, rect.height - 24));

      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = 'rgba(154, 120, 50, 0.65)';
      ctx.strokeRect(18, 18, Math.max(1, rect.width - 36), Math.max(1, rect.height - 36));
      ctx.setLineDash([]);

      const cx = rect.width / 2;
      const cy = rect.height / 2;

      ctx.fillStyle = 'rgba(15, 51, 41, 0.06)';
      ctx.beginPath();
      ctx.arc(cx, cy - 16, 34, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0F3329';
      ctx.font = 'italic 22px "Cormorant Garamond", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('Scratch to Reveal', cx, cy - 8);

      ctx.font = '500 9.5px "Montserrat", sans-serif';
      ctx.fillStyle = 'rgba(15, 51, 41, 0.85)';
      ctx.fillText('OUR SPECIAL DATE & COUNTDOWN', cx, cy + 16);

      ctx.font = '300 9px "Montserrat", sans-serif';
      ctx.fillStyle = 'rgba(53, 94, 82, 0.88)';
      ctx.fillText('Rub gently with your finger or cursor', cx, cy + 37);
    } catch {
      // Ignore canvas initialization issues
    }
  };

  useEffect(() => {
    if (!isRevealed) {
      const timer = setTimeout(initFoilCanvas, 120);
      window.addEventListener('resize', initFoilCanvas);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', initFoilCanvas);
      };
    }
    return undefined;
  }, [isRevealed]);

  const triggerFullReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setBloomCycle((c) => c + 1);
    audioEngine.playBloomArpeggio();
  };

  const computeScratchedPercentage = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas || canvas.width <= 0 || canvas.height <= 0) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentPixels = 0;
      let totalSampled = 0;
      const stride = 32;

      for (let i = 3; i < imageData.length; i += stride) {
        totalSampled += 1;
        if (imageData[i] < 128) transparentPixels += 1;
      }

      const pct = Math.min(100, Math.round((transparentPixels / Math.max(1, totalSampled)) * 100));
      setScratchPercent(pct);
      if (pct >= 35) {
        triggerFullReveal();
      }
    } catch {
      // Ignore canvas readback exceptions
    }
  };

  const scratchAtPoint = (clientX, clientY) => {
    if (isRevealed) return;
    try {
      const canvas = canvasRef.current;
      if (!canvas || canvas.width <= 0 || canvas.height <= 0) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect || rect.width <= 0 || rect.height <= 0) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 38;

      ctx.beginPath();
      if (lastPointRef.current) {
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
      } else {
        ctx.arc(x, y, 20, 0, Math.PI * 2);
      }
      ctx.stroke();

      lastPointRef.current = { x, y };
      moveCounterRef.current += 1;

      if (moveCounterRef.current % 5 === 0) {
        computeScratchedPercentage();
      }
    } catch {
      // Ignore transient scratch errors
    }
  };

  const handlePointerDown = (e) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    const pt = e.touches && e.touches[0] ? e.touches[0] : e;
    lastPointRef.current = null;
    scratchAtPoint(pt.clientX, pt.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || isRevealed) return;
    const pt = e.touches && e.touches[0] ? e.touches[0] : e;
    scratchAtPoint(pt.clientX, pt.clientY);
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    computeScratchedPercentage();
  };

  const handleReplayBloom = () => {
    setBloomCycle((c) => c + 1);
    audioEngine.playBloomArpeggio();
  };

  const handleResetScratchCard = () => {
    setScratchPercent(0);
    setIsRevealed(false);
  };

  return (
    <div className="relative max-w-xs mx-auto my-2 select-none">
      {isRevealed && (
        <div
          key={bloomCycle}
          className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-visible"
        >
          {flowerParticles.map((p) => (
            <div
              key={p.id}
              className="emerald-flower-particle"
              style={{
                '--tx': p.tx,
                '--ty': p.ty,
                '--rot': p.rot,
                '--sc': p.scale,
                animationDelay: `${p.delay}ms`,
              }}
            >
              <EmeraldGoldFlowerSVG variant={p.variant} size={p.size} />
            </div>
          ))}
        </div>
      )}

      <div className="relative rounded-3xl bg-[#081E17] border border-[#E5CA8C]/35 px-5 py-9 shadow-2xl overflow-hidden">
        {isRevealed &&
          cornerBlossoms.map((cb, idx) => (
            <div
              key={`${bloomCycle}-corner-${idx}`}
              className={`absolute ${cb.pos} pointer-events-none z-20 corner-flower-pop`}
              style={{ animationDelay: cb.delay }}
            >
              <EmeraldGoldFlowerSVG variant={cb.variant} size={cb.size} />
            </div>
          ))}

        <div
          className={`relative z-10 transition-all duration-1000 ${
            isRevealed
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-45 scale-95 translate-y-2'
          }`}
        >
          <p className="font-sans-clean text-[9px] tracking-[0.28em] uppercase text-[#E5CA8C] mb-1">
            Save Our Date
          </p>

          <h3
            className={`font-serif-editorial text-2xl sm:text-3xl text-[#F6F4EC] tracking-wide mb-1 ${
              isRevealed ? 'date-number-rise' : ''
            }`}
          >
            {dateConfig.displayFull}
          </h3>

          <p
            className={`font-sans-clean text-[10px] tracking-[0.18em] uppercase text-[#E5CA8C]/90 mb-6 ${
              isRevealed ? 'date-number-rise' : ''
            }`}
            style={{ animationDelay: '140ms' }}
          >
            {dateConfig.displayTime}
          </p>

          <div className="grid grid-cols-4 gap-2 max-w-[260px] mx-auto pt-3 border-t border-[#E5CA8C]/25">
            {[
              { value: timeLeft.days, label: 'DAYS', delay: '220ms' },
              { value: timeLeft.hours, label: 'HOURS', delay: '340ms' },
              { value: timeLeft.minutes, label: 'MINUTES', delay: '460ms' },
              { value: timeLeft.seconds, label: 'SECONDS', delay: '580ms' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center ${isRevealed ? 'countdown-digit-pop' : ''}`}
                style={{ animationDelay: item.delay }}
              >
                <span className="font-serif-editorial text-3xl sm:text-4xl font-light tracking-wider text-[#F6F4EC] drop-shadow">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-sans-clean text-[8px] tracking-[0.22em] text-[#E5CA8C]/85 mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <canvas
          ref={canvasRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          style={{ touchAction: 'none' }}
          className={`absolute inset-0 w-full h-full z-20 cursor-grab active:cursor-grabbing transition-opacity duration-1000 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        {!isRevealed ? (
          <button
            type="button"
            onClick={triggerFullReveal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F6F4EC]/10 border border-[#E5CA8C]/45 text-[10px] font-sans-clean tracking-[0.2em] uppercase text-[#F6F4EC] hover:bg-[#E5CA8C]/20 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5CA8C]" />
            <span>
              {scratchPercent > 0
                ? `Scratched ${scratchPercent}% · Tap to Bloom`
                : 'Tap to Instant Reveal'}
            </span>
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleReplayBloom}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C8A252]/20 border border-[#E5CA8C]/55 text-[10px] font-sans-clean tracking-[0.18em] uppercase text-[#F6F4EC] hover:bg-[#C8A252]/35 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5CA8C]" />
              <span>Bloom Flowers</span>
            </button>

            <button
              type="button"
              onClick={handleResetScratchCard}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#F6F4EC]/30 text-[10px] font-sans-clean tracking-[0.16em] uppercase text-[#F6F4EC]/85 hover:bg-[#F6F4EC]/10 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Foil</span>
            </button>

            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                dateConfig.calendarTitle
              )}&dates=${dateConfig.calendarStart}/${
                dateConfig.calendarEnd
              }&details=${encodeURIComponent(coupleConfig.invitationText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#E5CA8C]/45 text-[10px] font-sans-clean tracking-[0.2em] uppercase text-[#E5CA8C] hover:bg-[#E5CA8C]/15 transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Save the Date</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// FINE-LINE ETCHED ILLUSTRATIONS (Deep Royal Emerald #0F3329 & Gold #C8A252)
// ============================================================================

/** Architectural Stationery Frame for Section 1 Letterpress Hero */
const HeroStationeryFrameSVG = () => (
  <svg
    viewBox="0 0 380 780"
    preserveAspectRatio="none"
    className="absolute inset-4 sm:inset-5 w-[calc(100%-2rem)] sm:w-[calc(100%-2.5rem)] h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)] pointer-events-none select-none"
  >
    <g fill="none" stroke="#C8A252" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M 22 4 L 358 4 A 18 18 0 0 0 376 22 L 376 758 A 18 18 0 0 0 358 776 L 22 776 A 18 18 0 0 0 4 758 L 4 22 A 18 18 0 0 0 22 4 Z"
        strokeWidth="1"
        strokeOpacity="0.72"
      />
      <path
        d="M 27 11 L 353 11 A 14 14 0 0 0 369 27 L 369 753 A 14 14 0 0 0 353 769 L 27 769 A 14 14 0 0 0 11 753 L 11 27 A 14 14 0 0 0 27 11 Z"
        strokeWidth="0.55"
        strokeOpacity="0.48"
      />
      {[
        [17, 17],
        [363, 17],
        [17, 763],
        [363, 763],
      ].map(([cx, cy], idx) => (
        <polygon
          key={idx}
          points={`${cx},${cy - 3.5} ${cx + 3.5},${cy} ${cx},${cy + 3.5} ${cx - 3.5},${cy}`}
          fill="#C8A252"
          fillOpacity="0.65"
          stroke="none"
        />
      ))}
    </g>
  </svg>
);

/** Minimal Top Gold Diamond Ornament for Section 1 */
const HeroTopOrnamentSVG = () => (
  <svg viewBox="0 0 120 24" className="w-24 h-5 mx-auto text-[#C8A252] select-none">
    <g fill="none" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="12" x2="46" y2="12" strokeOpacity="0.65" />
      <line x1="74" y1="12" x2="112" y2="12" strokeOpacity="0.65" />
      <polygon points="60,3 67,12 60,21 53,12" strokeOpacity="0.9" />
      <polygon points="60,7.5 63.5,12 60,16.5 56.5,12" fill="currentColor" fillOpacity="0.35" stroke="none" />
      <circle cx="48" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="72" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

/** Section 2: Kissing Swans Illustration */
const SwansIllustration = () => (
  <svg viewBox="0 0 220 120" className="w-44 h-auto mx-auto text-[#0F3329] lux-float-slow">
    <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M 102 18 L 105 10 L 110 16 L 115 10 L 118 18 Z"
        stroke="#C8A252"
        fill="#C8A252"
        fillOpacity="0.2"
      />
      <circle cx="105" cy="8" r="1" fill="#C8A252" stroke="none" />
      <circle cx="110" cy="6" r="1.3" fill="#C8A252" stroke="none" />
      <circle cx="115" cy="8" r="1" fill="#C8A252" stroke="none" />

      <path d="M 109 38 C 103 22, 82 22, 82 40 C 82 56, 98 68, 92 84" strokeWidth="1.35" />
      <path d="M 107 40 C 102 27, 87 28, 87 40 C 87 54, 103 66, 97 82" />
      <path d="M 109 38 L 110 42 L 106 41 Z" fill="currentColor" />
      <path
        d="M 92 82 C 74 84, 42 78, 36 62 C 46 56, 62 52, 82 64 C 66 54, 48 46, 44 36 C 58 34, 78 44, 88 60"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <path d="M 52 50 Q 68 56 84 68" />
      <path d="M 46 62 Q 64 68 84 74" />
      <path d="M 36 62 C 30 72, 46 88, 92 86" />

      <path d="M 111 38 C 117 22, 138 22, 138 40 C 138 56, 122 68, 128 84" strokeWidth="1.35" />
      <path d="M 113 40 C 118 27, 133 28, 133 40 C 133 54, 117 66, 123 82" />
      <path d="M 111 38 L 110 42 L 114 41 Z" fill="currentColor" />
      <path
        d="M 128 82 C 146 84, 178 78, 184 62 C 174 56, 158 52, 138 64 C 154 54, 172 46, 176 36 C 162 34, 142 44, 132 60"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <path d="M 168 50 Q 152 56 136 68" />
      <path d="M 174 62 Q 156 68 136 74" />
      <path d="M 184 62 C 190 72, 174 88, 128 86" />

      <circle cx="110" cy="84" r="5" fill="#F7F5EE" stroke="#C8A252" />
      <circle cx="110" cy="84" r="2" fill="#C8A252" stroke="none" />
      <path d="M 96 86 Q 110 92 124 86" />
      <path d="M 55 94 Q 110 98 165 94" strokeWidth="0.8" strokeOpacity="0.7" />
      <path d="M 78 101 Q 110 104 142 101" strokeWidth="0.7" strokeOpacity="0.55" />
    </g>
  </svg>
);

/** Section 4: Architectural Oval Etching */
const VenueOvalIllustration = () => (
  <div className="relative w-72 sm:w-80 mx-auto my-6 lux-float-slow">
    <svg viewBox="0 0 320 390" className="w-full h-auto text-[#0F3329] drop-shadow-sm">
      <defs>
        <clipPath id="venueOvalClip">
          <ellipse cx="160" cy="195" rx="112" ry="145" />
        </clipPath>
      </defs>

      <g fill="none" stroke="currentColor">
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180;
          const x = 160 + 132 * Math.cos(angle);
          const y = 195 + 166 * Math.sin(angle);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="10"
                stroke="#C8A252"
                strokeWidth="0.75"
                strokeOpacity="0.55"
                fill="#FCFBF7"
                fillOpacity="0.68"
              />
              <circle cx={x} cy={y} r="2.8" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.45" />
            </g>
          );
        })}

        <ellipse
          cx="160"
          cy="195"
          rx="126"
          ry="160"
          stroke="#C8A252"
          strokeWidth="1.15"
          strokeDasharray="4 3"
          strokeOpacity="0.75"
        />
        <ellipse
          cx="160"
          cy="195"
          rx="118"
          ry="152"
          strokeWidth="1.4"
          fill="#FAF8F2"
          fillOpacity="0.75"
        />
        <ellipse cx="160" cy="195" rx="112" ry="145" strokeWidth="0.95" strokeOpacity="0.8" />
      </g>

      <g clipPath="url(#venueOvalClip)" stroke="currentColor" fill="none" strokeWidth="1">
        <path d="M 60 110 Q 110 95 160 108 T 260 105" strokeOpacity="0.22" />
        <path d="M 75 85 Q 140 72 210 88" strokeOpacity="0.18" />

        {[68, 82, 245, 258].map((cx, i) => (
          <path
            key={i}
            d={`M ${cx} 255 L ${cx - 6} 255 Q ${cx - 8} 190 ${cx} 145 Q ${cx + 8} 190 ${cx + 6} 255 Z`}
            fill="currentColor"
            fillOpacity="0.1"
          />
        ))}

        <rect x="92" y="138" width="136" height="122" fill="#F9F7F0" strokeWidth="1.25" />
        <line x1="88" y1="138" x2="232" y2="138" strokeWidth="1.7" />
        <rect x="94" y="130" width="132" height="8" fill="#EFECE0" />
        {[96, 120, 144, 176, 200, 224].map((x, idx) => (
          <path key={idx} d={`M ${x} 130 L ${x - 2} 123 L ${x + 2} 123 Z`} fill="#C8A252" stroke="none" />
        ))}
        <polygon points="145,130 160,116 175,130" fill="#EFECE0" strokeWidth="1.2" />
        <circle cx="160" cy="125" r="2.8" stroke="#C8A252" />

        <line x1="90" y1="172" x2="230" y2="172" strokeWidth="1.15" />
        <line x1="90" y1="210" x2="230" y2="210" strokeWidth="1.15" />

        {[106, 133, 160, 187, 214].map((wx, i) => (
          <g key={i}>
            <rect x={wx - 6} y="146" width="12" height="18" fill="currentColor" fillOpacity="0.09" />
            <line x1={wx} y1="146" x2={wx} y2="164" strokeWidth="0.7" />
            <polygon points={`${wx - 8},180 ${wx},175 ${wx + 8},180`} />
            <rect x={wx - 6} y="180" width="12" height="22" fill="currentColor" fillOpacity="0.11" />
            <line x1={wx} y1="180" x2={wx} y2="202" strokeWidth="0.7" />
          </g>
        ))}

        {[133, 160, 187].map((ax, i) => (
          <path
            key={i}
            d={`M ${ax - 9} 260 L ${ax - 9} 230 A 9 9 0 0 1 ${ax + 9} 230 L ${ax + 9} 260 Z`}
            fill="currentColor"
            fillOpacity="0.16"
          />
        ))}
        <rect x="100" y="224" width="12" height="22" />
        <rect x="208" y="224" width="12" height="22" />

        <path d="M 45 260 L 275 260" strokeWidth="1.35" />
        <path d="M 55 260 Q 75 248 95 260" fill="currentColor" fillOpacity="0.12" />
        <path d="M 225 260 Q 245 248 265 260" fill="currentColor" fillOpacity="0.12" />

        <path d="M 135 260 C 120 295, 85 320, 65 345" strokeDasharray="3 2" strokeOpacity="0.75" />
        <path d="M 185 260 C 200 295, 235 320, 255 345" strokeDasharray="3 2" strokeOpacity="0.75" />
        <ellipse cx="160" cy="296" rx="28" ry="9" fill="#EFECE0" />
        <ellipse cx="160" cy="294" rx="22" ry="6" />
        <path d="M 160 294 L 160 278" stroke="#C8A252" />
      </g>
    </svg>
  </div>
);

/** Section 5 Top: Hanging Crystal & Floral Garland */
const HangingGarlandIllustration = () => (
  <svg viewBox="0 0 400 110" className="w-full h-auto text-[#0F3329] mb-2">
    <g fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round">
      <path d="M 0 18 Q 50 64 100 22" />
      <path d="M 100 22 Q 150 72 200 26" />
      <path d="M 200 26 Q 250 72 300 22" />
      <path d="M 300 22 Q 350 64 400 18" />

      <path d="M 0 28 Q 50 78 100 32" stroke="#C8A252" strokeDasharray="2 3" />
      <path d="M 100 32 Q 150 86 200 36" stroke="#C8A252" strokeDasharray="2 3" />
      <path d="M 200 36 Q 250 86 300 32" stroke="#C8A252" strokeDasharray="2 3" />
      <path d="M 300 32 Q 350 78 400 28" stroke="#C8A252" strokeDasharray="2 3" />

      {[50, 100, 150, 200, 250, 300, 350].map((x, idx) => {
        const isPeak = idx % 2 === 1;
        const yStart = isPeak ? 24 : 52;
        const dropLen = isPeak ? 48 : 34;
        return (
          <g key={idx}>
            {isPeak && (
              <>
                <path d={`M ${x} ${yStart} C ${x - 12} ${yStart - 10}, ${x - 14} ${yStart + 6}, ${x} ${yStart + 2}`} />
                <path d={`M ${x} ${yStart} C ${x + 12} ${yStart - 10}, ${x + 14} ${yStart + 6}, ${x} ${yStart + 2}`} />
                <circle cx={x} cy={yStart} r="3.4" fill="#F7F5EE" stroke="#C8A252" />
              </>
            )}
            <line x1={x} y1={yStart} x2={x} y2={yStart + dropLen} strokeDasharray="1 2" strokeOpacity="0.7" />
            <polygon
              points={`${x},${yStart + dropLen} ${x - 4},${yStart + dropLen + 8} ${x},${yStart + dropLen + 15} ${x + 4},${yStart + dropLen + 8}`}
              fill="#C8A252"
              fillOpacity="0.22"
            />
          </g>
        );
      })}
    </g>
  </svg>
);

/** Section 5 Timeline Icons */
const TimelineIcon = ({ type }) => {
  switch (type) {
    case 'welcome_flutes':
      return (
        <svg viewBox="0 0 64 56" className="w-14 h-12 text-[#0F3329]">
          <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
            <path d="M 18 12 L 26 14 L 22 30 Q 20 33 18 29 Z" fill="#C8A252" fillOpacity="0.16" />
            <line x1="20" y1="31" x2="17" y2="46" />
            <line x1="12" y1="46" x2="22" y2="46" />
            <path d="M 46 12 L 38 14 L 42 30 Q 44 33 46 29 Z" fill="#C8A252" fillOpacity="0.16" />
            <line x1="44" y1="31" x2="47" y2="46" />
            <line x1="42" y1="46" x2="52" y2="46" />
            <line x1="32" y1="5" x2="32" y2="11" stroke="#C8A252" />
            <line x1="28" y1="8" x2="36" y2="8" stroke="#C8A252" />
          </g>
        </svg>
      );
    case 'ceremony_rings':
      return (
        <svg viewBox="0 0 64 56" className="w-14 h-12 text-[#0F3329]">
          <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
            <circle cx="25" cy="32" r="11" />
            <circle cx="39" cy="32" r="11" />
            <polygon points="39,16 35,21 43,21" fill="#C8A252" fillOpacity="0.32" stroke="#C8A252" />
            <line x1="39" y1="10" x2="39" y2="13" stroke="#C8A252" />
            <line x1="33" y1="12" x2="35" y2="14" stroke="#C8A252" />
            <line x1="45" y1="12" x2="43" y2="14" stroke="#C8A252" />
          </g>
        </svg>
      );
    case 'dinner_cloche':
    default:
      return (
        <svg viewBox="0 0 64 56" className="w-14 h-12 text-[#0F3329]">
          <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
            <path d="M 12 36 A 20 18 0 0 1 52 36 Z" fill="#C8A252" fillOpacity="0.14" />
            <circle cx="32" cy="15" r="3" stroke="#C8A252" />
            <ellipse cx="32" cy="37" rx="24" ry="3.5" />
            <path d="M 20 44 Q 32 41 44 44" />
          </g>
        </svg>
      );
  }
};

/** Section 5 Bottom: Banquet Table Setting */
const BanquetTableIllustration = () => (
  <svg viewBox="0 0 400 135" className="w-full h-auto text-[#0F3329] mt-6">
    <g fill="none" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round">
      <line x1="0" y1="78" x2="400" y2="78" strokeWidth="1.15" />
      <line x1="0" y1="112" x2="400" y2="112" strokeWidth="1.35" />
      <path d="M 0 112 Q 35 125 70 112 Q 115 126 160 112 Q 205 126 250 112 Q 295 126 340 112 Q 370 124 400 112" />
      <line x1="70" y1="112" x2="66" y2="132" strokeOpacity="0.45" />
      <line x1="160" y1="112" x2="158" y2="132" strokeOpacity="0.45" />
      <line x1="250" y1="112" x2="252" y2="132" strokeOpacity="0.45" />
      <line x1="340" y1="112" x2="344" y2="132" strokeOpacity="0.45" />

      <g transform="translate(55, 22)">
        <ellipse cx="0" cy="54" rx="26" ry="5" fill="#F7F5EE" />
        <path d="M -8 59 L -14 67 L 14 67 L 8 59" fill="currentColor" fillOpacity="0.08" />
        <rect x="-22" y="36" width="44" height="16" rx="2" fill="#FCFBF7" />
        <path d="M -22 42 Q -11 48 0 42 Q 11 48 22 42" stroke="#C8A252" />
        <rect x="-15" y="22" width="30" height="14" rx="2" fill="#FCFBF7" />
        <path d="M -15 27 Q -7 32 0 27 Q 7 32 15 27" stroke="#C8A252" />
        <rect x="-9" y="10" width="18" height="12" rx="1.5" fill="#FCFBF7" />
        <circle cx="-4" cy="8" r="3" fill="#C8A252" fillOpacity="0.28" />
        <circle cx="0" cy="7" r="3.5" fill="#C8A252" fillOpacity="0.34" />
        <circle cx="4" cy="8" r="3" fill="#C8A252" fillOpacity="0.28" />
      </g>

      {[128, 222, 315, 332].map((cx, i) => {
        const h = i % 2 === 0 ? 32 : 24;
        return (
          <g key={i} transform={`translate(${cx}, ${78 - h})`}>
            <rect x="-2" y="0" width="4" height={h} fill="#FCFBF7" />
            <path
              d="M 0 -8 Q -3 -3 0 0 Q 3 -3 0 -8 Z"
              fill="#C8A252"
              stroke="#9A7832"
              strokeWidth="0.6"
              className="lux-twinkle"
            />
            <path d={`M -6 ${h} L 6 ${h} L 3 ${h + 6} L -3 ${h + 6} Z`} fill="currentColor" fillOpacity="0.14" />
          </g>
        );
      })}

      {[155, 195, 255, 285].map((gx, i) => (
        <g key={i} transform={`translate(${gx}, 58)`}>
          {i % 2 === 0 ? (
            <>
              <path d="M -8 0 Q 0 10 8 0 Z" fill="currentColor" fillOpacity="0.08" />
              <line x1="0" y1="5" x2="0" y2="18" />
              <ellipse cx="0" cy="18" rx="6" ry="1.8" />
            </>
          ) : (
            <>
              <path d="M -5 -4 C -6 6, 6 6, 5 -4 Z" fill="currentColor" fillOpacity="0.08" />
              <line x1="0" y1="4" x2="0" y2="18" />
              <ellipse cx="0" cy="18" rx="5" ry="1.5" />
            </>
          )}
        </g>
      ))}

      {[55, 155, 255, 355].map((px, i) => (
        <g key={i} transform={`translate(${px}, 95)`}>
          <ellipse cx="0" cy="0" rx="24" ry="8" fill="#FCFBF7" />
          <ellipse cx="0" cy="0" rx="16" ry="5" stroke="#C8A252" />
          <line x1="-29" y1="-5" x2="-29" y2="6" />
          <line x1="29" y1="-6" x2="29" y2="6" />
          <line x1="32" y1="-4" x2="32" y2="6" />
        </g>
      ))}
    </g>
  </svg>
);

/** Footer: Intertwined Diamond Rings */
const WeddingRingsIllustration = () => (
  <svg viewBox="0 0 160 95" className="w-32 h-auto mx-auto mb-4 text-[#0F3329] lux-float-slow">
    <g fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="64" cy="56" rx="28" ry="20" transform="rotate(-12 64 56)" />
      <ellipse cx="64" cy="56" rx="23" ry="15.5" transform="rotate(-12 64 56)" stroke="#C8A252" strokeWidth="0.9" />
      <ellipse cx="96" cy="54" rx="28" ry="20" transform="rotate(14 96 54)" />
      <ellipse cx="96" cy="54" rx="23" ry="15.5" transform="rotate(14 96 54)" stroke="#C8A252" strokeWidth="0.9" />
      <g transform="translate(104, 28) rotate(14)">
        <polygon points="-9,0 -5,-7 5,-7 9,0 0,10" fill="#FCFBF7" stroke="#C8A252" strokeWidth="1.25" />
        <polyline points="-9,0 9,0" stroke="#C8A252" strokeWidth="0.85" />
        <polyline points="-5,-7 -2,0 0,10 2,0 5,-7" stroke="#C8A252" strokeWidth="0.85" />
        <line x1="0" y1="-12" x2="0" y2="-16" stroke="#C8A252" />
        <line x1="-10" y1="-9" x2="-13" y2="-12" stroke="#C8A252" />
        <line x1="10" y1="-9" x2="13" y2="-12" stroke="#C8A252" />
      </g>
    </g>
  </svg>
);

// ============================================================================
// SEAMLESS 3D ROYAL GATEFOLD FOLIO & SCULPTED EMERALD-GOLD WAX SEAL
// ============================================================================
const RoyalCrestFiligree = () => (
  <svg viewBox="0 0 140 36" className="w-28 h-7 text-[#C8A252] mx-auto mb-2.5 select-none">
    <g fill="none" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 10 20 C 26 20, 34 10, 48 14 C 58 17, 63 22, 70 22 C 77 22, 82 17, 92 14 C 106 10, 114 20, 130 20" />
      <path d="M 32 22 C 44 26, 56 26, 70 22 C 84 26, 96 26, 108 22" strokeOpacity="0.65" />
      <path d="M 70 4 L 74 12 L 70 18 L 66 12 Z" fill="#C8A252" fillOpacity="0.28" />
      <circle cx="70" cy="24" r="2" fill="#C8A252" stroke="none" />
      <circle cx="48" cy="14" r="1.4" fill="#C8A252" stroke="none" />
      <circle cx="92" cy="14" r="1.4" fill="#C8A252" stroke="none" />
      <circle cx="16" cy="20" r="1.2" fill="#C8A252" stroke="none" />
      <circle cx="124" cy="20" r="1.2" fill="#C8A252" stroke="none" />
    </g>
  </svg>
);

/** Debossed Damask & Outer Champagne-Gold Double-Hairline Frame */
const DoorOrnamentSVG = ({ side = 'left' }) => {
  const isRight = side === 'right';
  const patternId = `baroqueDamask-${side}`;
  return (
    <svg
      viewBox="0 0 215 844"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{ transform: isRight ? 'scaleX(-1)' : 'none' }}
    >
      <defs>
        <pattern id={patternId} width="64" height="84" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#537A6B" strokeOpacity="0.08" strokeWidth="0.9">
            <path d="M 32 6 C 42 18, 48 28, 32 42 C 16 28, 22 18, 32 6 Z" />
            <path d="M 32 42 C 42 54, 48 64, 32 78 C 16 64, 22 54, 32 42 Z" />
            <path d="M 0 42 C 12 34, 20 34, 32 42 C 44 34, 52 34, 64 42" />
            <circle cx="32" cy="24" r="3" />
            <circle cx="32" cy="60" r="3" />
          </g>
        </pattern>
      </defs>

      <rect x="0" y="0" width="215" height="844" fill={`url(#${patternId})`} />

      <g fill="none" stroke="#C8A252" strokeLinecap="round">
        <path
          d="M 215 24 L 54 24 Q 18 24 18 62 L 18 782 Q 18 820 54 820 L 215 820"
          strokeWidth="1.25"
          strokeOpacity="0.68"
        />
        <path
          d="M 215 34 L 60 34 Q 28 34 28 68 L 28 776 Q 28 810 60 810 L 215 810"
          strokeWidth="0.7"
          strokeOpacity="0.45"
        />

        <g transform="translate(18, 24)" strokeOpacity="0.75">
          <path d="M 6 42 C 6 18, 18 6, 44 6" strokeWidth="1.2" />
          <path d="M 14 28 C 14 18, 20 14, 30 14" strokeWidth="0.9" />
          <path d="M 10 10 C 20 10, 26 16, 26 26 C 16 26, 10 20, 10 10 Z" fill="#C8A252" fillOpacity="0.14" />
          <circle cx="17" cy="17" r="1.8" fill="#C8A252" stroke="none" />
        </g>

        <g transform="translate(18, 820) scale(1, -1)" strokeOpacity="0.75">
          <path d="M 6 42 C 6 18, 18 6, 44 6" strokeWidth="1.2" />
          <path d="M 14 28 C 14 18, 20 14, 30 14" strokeWidth="0.9" />
          <path d="M 10 10 C 20 10, 26 16, 26 26 C 16 26, 10 20, 10 10 Z" fill="#C8A252" fillOpacity="0.14" />
          <circle cx="17" cy="17" r="1.8" fill="#C8A252" stroke="none" />
        </g>
      </g>
    </svg>
  );
};

/** Pressed Gold & Jade Botanical Sprig Behind the Wax Seal */
const PressedBotanicalSprigSVG = () => (
  <svg
    viewBox="0 0 220 180"
    className="w-[205px] h-[165px] pointer-events-none select-none overflow-visible"
    style={{ filter: 'drop-shadow(0 6px 10px rgba(7, 26, 20, 0.22))' }}
  >
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 38 156 C 72 126, 128 72, 184 22" stroke="#C8A252" strokeWidth="1.5" />
      <path d="M 104 98 C 122 88, 144 82, 174 74" stroke="#C8A252" strokeWidth="1.05" strokeOpacity="0.85" />
      <path d="M 96 106 C 84 82, 74 60, 62 34" stroke="#C8A252" strokeWidth="1.05" strokeOpacity="0.85" />
      {[
        [152, 48, -28, 13, 6],
        [168, 34, -42, 11, 5],
        [136, 58, 18, 12, 5.5],
        [162, 76, 12, 11, 5],
        [68, 132, -52, 12, 5.5],
        [54, 144, 14, 11, 5],
        [72, 54, -75, 11, 4.8],
      ].map(([x, y, rot, rx, ry], idx) => (
        <ellipse
          key={idx}
          cx={x}
          cy={y}
          rx={rx}
          ry={ry}
          transform={`rotate(${rot} ${x} ${y})`}
          fill="#E5CA8C"
          fillOpacity="0.48"
          stroke="#9A7832"
          strokeWidth="0.9"
        />
      ))}
      {[
        [178, 28, 4.2, '#3A7D66'],
        [185, 21, 3.6, '#5CA188'],
        [174, 74, 3.6, '#4B8E76'],
        [60, 32, 3.8, '#3A7D66'],
        [44, 152, 3.5, '#3A7D66'],
      ].map(([bx, by, r, color], idx) => (
        <circle key={idx} cx={bx} cy={by} r={r} fill={color} stroke="#F7F5EE" strokeWidth="0.6" />
      ))}
    </g>
  </svg>
);

/** Sculpted 132px Royal Emerald & Champagne-Gold SVG Wax Seal */
const SculptedWaxSealSVG = ({ brideInitial, groomInitial }) => (
  <svg
    viewBox="0 0 200 200"
    className="w-[132px] h-[132px] overflow-visible select-none"
    style={{
      filter:
        'drop-shadow(0 16px 24px rgba(4, 18, 13, 0.5)) drop-shadow(0 5px 10px rgba(7, 28, 21, 0.36))',
    }}
  >
    <defs>
      <clipPath id="moltenWaxClip">
        <path d="M 104 10 C 124 8, 141 15, 156 26 C 171 37, 185 52, 189 72 C 194 91, 193 112, 186 130 C 179 149, 169 167, 151 178 C 134 189, 114 194, 93 192 C 72 190, 52 184, 36 170 C 21 156, 12 138, 9 117 C 6 96, 8 74, 17 56 C 26 37, 40 23, 59 15 C 74 9, 89 11, 104 10 Z" />
      </clipPath>

      <radialGradient id="emeraldWaxOuter" cx="32%" cy="26%" r="74%">
        <stop offset="0%" stopColor="#266E58" />
        <stop offset="28%" stopColor="#195240" />
        <stop offset="62%" stopColor="#0F392C" />
        <stop offset="90%" stopColor="#08241B" />
        <stop offset="100%" stopColor="#041610" />
      </radialGradient>

      <linearGradient id="emeraldWaxRim" x1="14%" y1="12%" x2="86%" y2="88%">
        <stop offset="0%" stopColor="#E5CA8C" stopOpacity="0.92" />
        <stop offset="22%" stopColor="#21614D" />
        <stop offset="56%" stopColor="#113F31" />
        <stop offset="86%" stopColor="#09261D" />
        <stop offset="100%" stopColor="#C8A252" stopOpacity="0.72" />
      </linearGradient>

      <radialGradient id="emeraldStampBasin" cx="65%" cy="68%" r="68%">
        <stop offset="0%" stopColor="#1B5543" />
        <stop offset="52%" stopColor="#0F382B" />
        <stop offset="88%" stopColor="#082219" />
        <stop offset="100%" stopColor="#04150F" />
      </radialGradient>

      <linearGradient id="champagneGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF6D8" />
        <stop offset="32%" stopColor="#E5CA8C" />
        <stop offset="68%" stopColor="#C8A252" />
        <stop offset="100%" stopColor="#9A7832" />
      </linearGradient>

      <linearGradient id="sealGlintSweep" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="45%" stopColor="#FFF7DE" stopOpacity="0" />
        <stop offset="50%" stopColor="#FFF7DE" stopOpacity="0.45" />
        <stop offset="55%" stopColor="#FFF7DE" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Organic Molten Wax Outer Silhouette */}
    <path
      d="M 104 10 C 124 8, 141 15, 156 26 C 171 37, 185 52, 189 72 C 194 91, 193 112, 186 130 C 179 149, 169 167, 151 178 C 134 189, 114 194, 93 192 C 72 190, 52 184, 36 170 C 21 156, 12 138, 9 117 C 6 96, 8 74, 17 56 C 26 37, 40 23, 59 15 C 74 9, 89 11, 104 10 Z"
      fill="url(#emeraldWaxOuter)"
      stroke="#051A13"
      strokeWidth="1.2"
    />

    {/* Specular Gold Ridge Highlight */}
    <path
      d="M 32 48 C 48 24, 80 14, 114 17 C 138 20, 160 32, 174 52"
      fill="none"
      stroke="#E5CA8C"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeOpacity="0.48"
    />

    {/* Raised Rolled Wax Rim */}
    <circle cx="100" cy="100" r="72" fill="url(#emeraldWaxRim)" stroke="#061E16" strokeWidth="1.2" />
    <circle cx="100" cy="100" r="67" fill="none" stroke="#E5CA8C" strokeWidth="0.9" strokeOpacity="0.42" />

    {/* Recessed Inner Stamp Basin */}
    <circle cx="100" cy="100" r="60" fill="url(#emeraldStampBasin)" stroke="#04150F" strokeWidth="2.2" />
    <circle cx="100" cy="100" r="58.5" fill="none" stroke="#E5CA8C" strokeWidth="0.7" strokeOpacity="0.42" />

    {/* Micro-Beaded Gold Pearl Ring */}
    <circle
      cx="100"
      cy="100"
      r="53"
      fill="none"
      stroke="url(#champagneGoldFoil)"
      strokeWidth="1.6"
      strokeDasharray="1.2 4.3"
      strokeLinecap="round"
      strokeOpacity="0.9"
    />

    {/* Symmetrical Botanical Laurel Wreath */}
    <g fill="none" stroke="url(#champagneGoldFoil)" strokeLinecap="round" strokeWidth="1.15">
      <path d="M 92 145 C 62 141, 49 116, 53 86 C 55 70, 66 57, 80 52" />
      <path d="M 108 145 C 138 141, 151 116, 147 86 C 145 70, 134 57, 120 52" />
      {[
        [54, 108, -26],
        [53, 93, -10],
        [56, 78, 8],
        [64, 65, 26],
        [63, 124, -44],
        [75, 136, -62],
      ].map(([lx, ly, rot], i) => (
        <ellipse
          key={`l-${i}`}
          cx={lx}
          cy={ly}
          rx="2.6"
          ry="5.2"
          transform={`rotate(${rot} ${lx} ${ly})`}
          fill="#E5CA8C"
          fillOpacity="0.45"
          strokeWidth="0.8"
        />
      ))}
      {[
        [146, 108, 26],
        [147, 93, 10],
        [144, 78, -8],
        [136, 65, -26],
        [137, 124, 44],
        [125, 136, 62],
      ].map(([lx, ly, rot], i) => (
        <ellipse
          key={`r-${i}`}
          cx={lx}
          cy={ly}
          rx="2.6"
          ry="5.2"
          transform={`rotate(${rot} ${lx} ${ly})`}
          fill="#E5CA8C"
          fillOpacity="0.45"
          strokeWidth="0.8"
        />
      ))}
      <path
        d="M 100 45 L 102.5 50.5 L 108 53 L 102.5 55.5 L 100 61 L 97.5 55.5 L 92 53 L 97.5 50.5 Z"
        fill="#E5CA8C"
        stroke="none"
      />
      <circle cx="100" cy="146" r="2.2" fill="#E5CA8C" stroke="none" />
    </g>

    {/* Cleanly Centered Monogram Strictly Inside the Inner Clear Circle */}
    <g>
      <text
        x="79.5"
        y="102.5"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-serif-editorial"
        fontSize="30"
        fontWeight="500"
        fill="#03120D"
        fillOpacity="0.72"
      >
        {brideInitial}
      </text>
      <text
        x="100.5"
        y="103.5"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-serif-editorial"
        fontStyle="italic"
        fontSize="19"
        fill="#03120D"
        fillOpacity="0.72"
      >
        &amp;
      </text>
      <text
        x="121.5"
        y="102.5"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-serif-editorial"
        fontSize="30"
        fontWeight="500"
        fill="#03120D"
        fillOpacity="0.72"
      >
        {groomInitial}
      </text>

      <text
        x="79"
        y="101"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-serif-editorial"
        fontSize="30"
        fontWeight="500"
        fill="url(#champagneGoldFoil)"
      >
        {brideInitial}
      </text>
      <text
        x="100"
        y="102"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-serif-editorial"
        fontStyle="italic"
        fontSize="19"
        fill="url(#champagneGoldFoil)"
      >
        &amp;
      </text>
      <text
        x="121"
        y="101"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-serif-editorial"
        fontSize="30"
        fontWeight="500"
        fill="url(#champagneGoldFoil)"
      >
        {groomInitial}
      </text>
    </g>

    {/* Idle Diagonal Gold Glint Sweep */}
    <g clipPath="url(#moltenWaxClip)" className="pointer-events-none">
      <rect
        x="-140"
        y="-40"
        width="160"
        height="280"
        fill="url(#sealGlintSweep)"
        className="lux-seal-glint-sweep"
      />
    </g>
  </svg>
);

/** Seamless 3D Double-Door Gatefold Cover Overlay with Strict 3-Zone Non-Overlapping Layout */
const GatefoldCoverOverlay = ({ stage, onTriggerOpen, couple, dateSpaced }) => {
  const isUnsealing = stage >= 1;
  const isDoorsOpening = stage >= 2;
  const isHidden = stage >= 4;

  const dustMotes = [
    { id: 1, left: '22%', top: '48%', dx: '-42px', dy: '-120px', size: 5, delay: '120ms', gold: true },
    { id: 2, left: '76%', top: '46%', dx: '46px', dy: '-115px', size: 4, delay: '220ms', gold: true },
    { id: 3, left: '42%', top: '54%', dx: '-25px', dy: '-145px', size: 6, delay: '80ms', gold: false },
    { id: 4, left: '58%', top: '52%', dx: '28px', dy: '-135px', size: 5, delay: '180ms', gold: true },
    { id: 5, left: '34%', top: '62%', dx: '-50px', dy: '-90px', size: 4, delay: '320ms', gold: false },
    { id: 6, left: '66%', top: '60%', dx: '52px', dy: '-95px', size: 5, delay: '280ms', gold: true },
    { id: 7, left: '50%', top: '42%', dx: '4px', dy: '-160px', size: 6, delay: '150ms', gold: true },
    { id: 8, left: '28%', top: '38%', dx: '-35px', dy: '-110px', size: 3.5, delay: '360ms', gold: true },
  ];

  return (
    <div
      className="lux-gatefold-overlay"
      style={{
        pointerEvents: stage === 0 ? 'auto' : 'none',
        visibility: isHidden ? 'hidden' : 'visible',
      }}
    >
      <div className={`lux-gatefold-backdrop ${isDoorsOpening ? 'is-clearing' : ''}`} />

      {isDoorsOpening && !isHidden && (
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
          {dustMotes.map((mote) => (
            <span
              key={mote.id}
              className="lux-dust-mote"
              style={{
                left: mote.left,
                top: mote.top,
                width: `${mote.size}px`,
                height: `${mote.size}px`,
                background: mote.gold
                  ? 'radial-gradient(circle, #FFF8E1 0%, #E5CA8C 55%, transparent 100%)'
                  : 'radial-gradient(circle, #ECFDF5 0%, #7CC7A8 55%, transparent 100%)',
                '--dx': mote.dx,
                '--dy': mote.dy,
                animationDelay: mote.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Left & Right 3D Gatefold Doors */}
      <div className="lux-gatefold-stage">
        <div className={`lux-door lux-door-left ${isDoorsOpening ? 'is-open' : ''}`}>
          <div className="lux-door-face lux-door-front lux-door-front-left">
            <DoorOrnamentSVG side="left" />
            <div className={`lux-door-shade ${isDoorsOpening ? 'is-shaded' : ''}`} />
          </div>
          <div className="lux-door-face lux-door-back">
            <div className="absolute inset-4 border border-[#E5CA8C]/30 pointer-events-none" />
            <div className="absolute inset-6 border border-[#E5CA8C]/18 pointer-events-none" />
          </div>
        </div>

        <div className={`lux-door lux-door-right ${isDoorsOpening ? 'is-open' : ''}`}>
          <div className="lux-door-face lux-door-front lux-door-front-right">
            <DoorOrnamentSVG side="right" />
            <div className={`lux-door-shade ${isDoorsOpening ? 'is-shaded' : ''}`} />
          </div>
          <div className="lux-door-face lux-door-back">
            <div className="absolute inset-4 border border-[#E5CA8C]/30 pointer-events-none" />
            <div className="absolute inset-6 border border-[#E5CA8C]/18 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Strict 3-Zone Non-Overlapping Vertical Layout */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between pointer-events-none">
        {/* 1. TOP ZONE */}
        <div
          className={`flex-1 flex flex-col items-center justify-end pb-5 pt-10 px-9 text-center transition-all duration-700 ease-out ${
            isUnsealing ? 'opacity-0 -translate-y-4 blur-[3px]' : 'opacity-100 translate-y-0'
          }`}
        >
          <RoyalCrestFiligree />

          <p className="font-sans-clean text-[8.5px] sm:text-[9px] tracking-[0.3em] uppercase text-[#355E52] mb-3 leading-relaxed">
            Together With Their Families
          </p>

          <h1 className="font-serif-editorial text-[32px] sm:text-[36px] font-normal tracking-[0.04em] text-[#0F3329] leading-tight">
            {couple.bride}{' '}
            <span className="font-serif-editorial italic text-[24px] sm:text-[26px] text-[#C8A252] mx-1.5">
              &amp;
            </span>{' '}
            {couple.groom}
          </h1>
        </div>

        {/* 2. MIDDLE ZONE (Dedicated 200px band — Zero text behind the seal) */}
        <div className="relative h-[200px] shrink-0 w-full flex items-center justify-center">
          <div className={`lux-ribbon-half lux-ribbon-left ${isUnsealing ? 'is-untied' : ''}`}>
            <div className="lux-ribbon-piping-top" />
            <div className="lux-ribbon-piping-bottom" />
          </div>
          <div className={`lux-ribbon-half lux-ribbon-right ${isUnsealing ? 'is-untied' : ''}`}>
            <div className="lux-ribbon-piping-top" />
            <div className="lux-ribbon-piping-bottom" />
          </div>

          <div
            className={`absolute flex items-center justify-center z-10 transition-all duration-700 ease-out ${
              isUnsealing
                ? 'opacity-0 scale-110 -translate-y-3 rotate-6'
                : 'opacity-95 scale-100 translate-y-0 rotate-0'
            }`}
          >
            <PressedBotanicalSprigSVG />
          </div>

          <div className="relative flex items-center justify-center z-20 pointer-events-auto">
            {stage === 0 && <span className="lux-seal-aura" />}
            {isUnsealing && <span className="lux-seal-click-glow" />}

            <button
              type="button"
              onClick={onTriggerOpen}
              aria-label="Tap the Royal Emerald and Champagne Gold Wax Seal to Open Invitation"
              className={`lux-sculpted-seal-btn ${isUnsealing ? 'is-unsealing' : ''}`}
            >
              <SculptedWaxSealSVG
                brideInitial={couple.brideInitial}
                groomInitial={couple.groomInitial}
              />
            </button>
          </div>
        </div>

        {/* 3. BOTTOM ZONE */}
        <div
          className={`flex-1 flex flex-col items-center justify-start pt-5 pb-10 px-9 text-center transition-all duration-700 ease-out ${
            isUnsealing ? 'opacity-0 translate-y-4 blur-[3px]' : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="font-serif-editorial text-xl sm:text-[22px] tracking-[0.26em] text-[#0F3329] mb-1.5">
            {dateSpaced}
          </p>

          <p className="font-sans-clean text-[9px] tracking-[0.34em] uppercase text-[#355E52]/90 mb-6">
            Madurai · India
          </p>

          <button
            type="button"
            onClick={onTriggerOpen}
            className="lux-open-capsule pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C8A252]/65 bg-[#FCFBF7]/85 backdrop-blur-sm text-[#0F3329] font-sans-clean text-[9px] tracking-[0.26em] uppercase shadow-sm hover:bg-[#0F3329] hover:text-[#F6F4EC] hover:border-[#0F3329] transition-colors duration-300 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#C8A252]" />
            <span>Tap the Seal to Open</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [introStage, setIntroStage] = useState(0);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const timeoutsRef = useRef([]);

  const clearChoreographyTimers = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  useEffect(() => {
    const target = new Date(WEDDING_CONFIG.date.isoTarget).getTime();
    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      clearChoreographyTimers();
      audioEngine.stopAmbient();
    };
  }, []);

  const handleTriggerOpen = () => {
    if (introStage !== 0) return;
    clearChoreographyTimers();

    setIntroStage(1);
    audioEngine.playSealChime();
    audioEngine.startAmbient();
    setIsAudioOn(true);

    timeoutsRef.current.push(
      setTimeout(() => {
        setIntroStage(2);
      }, 620)
    );

    timeoutsRef.current.push(
      setTimeout(() => {
        setIntroStage(3);
        setHeroRevealed(true);
      }, 1650)
    );

    timeoutsRef.current.push(
      setTimeout(() => {
        setIntroStage(4);
      }, 3000)
    );
  };

  const handleReplayOpening = () => {
    clearChoreographyTimers();
    const scrollContainer = document.getElementById('invitation-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setHeroRevealed(false);
      setIntroStage(0);
    }, 340);
  };

  const handleToggleAudio = () => {
    const playing = audioEngine.toggleMute();
    setIsAudioOn(playing);
    showToast(playing ? 'Ambient harp & chimes unmuted' : 'Audio muted');
  };

  const isCoverLocked = introStage < 4;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-x-hidden bg-[#06140F] text-[#0F3329] selection:bg-[#195240] selection:text-[#F6F4EC]">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500&family=Pinyon+Script&display=swap"
      />

      <style>{`
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: none !important;
          min-height: 100dvh;
          overflow-x: hidden;
          display: block !important;
          text-align: initial;
          -webkit-font-smoothing: antialiased;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .font-serif-editorial {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-script {
          font-family: 'Pinyon Script', cursive;
        }
        .font-sans-clean {
          font-family: 'Montserrat', sans-serif;
        }

        .bg-alabaster-stationery {
          background-color: #F7F5EE;
          background-image:
            radial-gradient(at 50% 0%, rgba(255, 253, 248, 0.94) 0px, transparent 68%),
            radial-gradient(at 14% 38%, rgba(240, 237, 226, 0.78) 0px, transparent 58%),
            radial-gradient(at 88% 76%, rgba(231, 227, 213, 0.65) 0px, transparent 62%);
        }

        .bg-velvet-emerald {
          background: radial-gradient(circle at 50% 20%, #164638 0%, #0D2C22 60%, #071A14 100%);
        }

        .lux-gatefold-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100dvh;
          max-height: 100%;
          z-index: 45;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .phone-frame-active .lux-gatefold-overlay {
            height: 100%;
            border-radius: 36px;
          }
        }

        .lux-gatefold-backdrop {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(15, 51, 41, 0.08), rgba(6, 20, 15, 0.45));
          transition: opacity 1800ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .lux-gatefold-backdrop.is-clearing {
          opacity: 0;
        }

        .lux-gatefold-stage {
          position: absolute;
          inset: 0;
          perspective: 1800px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
        }

        .lux-door {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50.6%;
          height: 100%;
          transform-style: preserve-3d;
          will-change: transform, opacity;
          transition:
            transform 1900ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 900ms ease 1100ms;
        }

        .lux-door-left {
          left: 0;
          transform-origin: left center;
        }
        .lux-door-right {
          right: 0;
          transform-origin: right center;
        }

        .lux-door-left.is-open {
          transform: rotateY(-115deg);
          opacity: 0;
        }
        .lux-door-right.is-open {
          transform: rotateY(115deg);
          opacity: 0;
        }

        .lux-door-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .lux-door-front {
          background-image:
            repeating-linear-gradient(
              0deg,
              rgba(15, 51, 41, 0.015) 0px,
              rgba(15, 51, 41, 0.015) 1px,
              transparent 1px,
              transparent 3px
            ),
            linear-gradient(180deg, #F7F5EE 0%, #F1EFE5 52%, #EAE6D8 100%);
        }

        .lux-door-front-left,
        .lux-door-front-right {
          box-shadow: none;
          transition: box-shadow 600ms ease;
        }

        .lux-door-left.is-open .lux-door-front-left {
          box-shadow: 6px 0 24px rgba(6, 20, 15, 0.16);
        }
        .lux-door-right.is-open .lux-door-front-right {
          box-shadow: -6px 0 24px rgba(6, 20, 15, 0.16);
        }

        .lux-door-back {
          transform: rotateY(180deg);
          background-color: #0D2C22;
          background-image:
            radial-gradient(at 25% 25%, rgba(200, 162, 82, 0.22) 0px, transparent 55%),
            radial-gradient(at 78% 70%, rgba(34, 108, 84, 0.34) 0px, transparent 58%),
            linear-gradient(145deg, #144032 0%, #0D2C22 60%, #061812 100%);
          box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.55);
        }

        .lux-door-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(6, 20, 15, 0.22), rgba(6, 20, 15, 0.04));
          opacity: 0;
          transition: opacity 1500ms ease;
          pointer-events: none;
        }
        .lux-door-right .lux-door-shade {
          background: linear-gradient(270deg, rgba(6, 20, 15, 0.22), rgba(6, 20, 15, 0.04));
        }
        .lux-door-shade.is-shaded {
          opacity: 1;
        }

        .lux-ribbon-half {
          position: absolute;
          top: 50%;
          height: 34px;
          width: 52%;
          margin-top: -17px;
          z-index: 5;
          background-image:
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.045) 0px,
              rgba(255, 255, 255, 0.045) 1px,
              transparent 1px,
              transparent 3px
            ),
            linear-gradient(180deg, #0E382B 0%, #1E5D49 26%, #144636 52%, #0A2B20 82%, #061C15 100%);
          box-shadow: 0 8px 18px rgba(4, 18, 13, 0.28), inset 0 1px 1px rgba(255, 245, 220, 0.28);
          transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 650ms ease;
          pointer-events: none;
        }
        .lux-ribbon-left {
          left: 0;
        }
        .lux-ribbon-right {
          right: 0;
        }
        .lux-ribbon-left.is-untied {
          transform: translateX(-105%) scaleY(0.92);
          opacity: 0;
        }
        .lux-ribbon-right.is-untied {
          transform: translateX(105%) scaleY(0.92);
          opacity: 0;
        }

        .lux-ribbon-piping-top {
          position: absolute;
          left: 0;
          right: 0;
          top: 2px;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(229, 202, 140, 0.65), #E5CA8C, rgba(229, 202, 140, 0.65));
        }
        .lux-ribbon-piping-bottom {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 2px;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(229, 202, 140, 0.65), #E5CA8C, rgba(229, 202, 140, 0.65));
        }

        .lux-sculpted-seal-btn {
          position: relative;
          background: transparent;
          border: none;
          padding: 0;
          margin: 0;
          cursor: pointer;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            transform 660ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 560ms ease 160ms,
            filter 480ms ease;
        }
        .lux-sculpted-seal-btn:hover {
          transform: scale(1.045);
          filter: brightness(1.07);
        }
        .lux-sculpted-seal-btn:active {
          transform: scale(0.95);
        }
        .lux-sculpted-seal-btn.is-unsealing {
          transform: scale(1.1) translateY(-8px);
          opacity: 0;
          filter: brightness(1.22);
        }

        .lux-seal-glint-sweep {
          animation: diagonalGlintSweep 4.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes diagonalGlintSweep {
          0%, 58% { transform: translateX(-60px) rotate(12deg); opacity: 0; }
          68% { opacity: 1; }
          86% { transform: translateX(300px) rotate(12deg); opacity: 0.9; }
          100% { transform: translateX(320px) rotate(12deg); opacity: 0; }
        }

        .lux-seal-aura {
          position: absolute;
          width: 144px;
          height: 144px;
          border-radius: 9999px;
          border: 1px solid rgba(229, 202, 140, 0.52);
          box-shadow: 0 0 24px rgba(229, 202, 140, 0.25);
          animation: sealAuraPulse 3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          pointer-events: none;
        }
        @keyframes sealAuraPulse {
          0% { transform: scale(0.93); opacity: 0.72; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        .lux-seal-click-glow {
          position: absolute;
          width: 148px;
          height: 148px;
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            rgba(255, 248, 224, 0.9) 0%,
            rgba(229, 202, 140, 0.58) 38%,
            rgba(38, 110, 88, 0.34) 66%,
            transparent 82%
          );
          animation: sealClickGlow 850ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }
        @keyframes sealClickGlow {
          0% { transform: scale(0.62); opacity: 1; }
          100% { transform: scale(2.15); opacity: 0; }
        }

        .lux-dust-mote {
          position: absolute;
          border-radius: 9999px;
          opacity: 0;
          animation: dustMoteDrift 2300ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes dustMoteDrift {
          0% { opacity: 0; transform: translate3d(0, 0, 0) scale(0.4); }
          25% { opacity: 0.95; transform: translate3d(calc(var(--dx) * 0.35), calc(var(--dy) * 0.35), 0) scale(1.1); }
          100% { opacity: 0; transform: translate3d(var(--dx), var(--dy), 0) scale(0.5); }
        }

        .lux-open-capsule {
          position: relative;
          overflow: hidden;
        }
        .lux-open-capsule::after {
          content: '';
          position: absolute;
          top: 0;
          left: -120%;
          width: 70%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(229, 202, 140, 0.45), transparent);
          animation: capsuleShimmer 3.8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes capsuleShimmer {
          0%, 62% { left: -120%; }
          100% { left: 160%; }
        }

        .lux-hero-item {
          opacity: 0;
          transform: translateY(20px) scale(0.97);
          filter: blur(5px);
          transition:
            opacity 950ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 950ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 950ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lux-hero-item.is-revealed {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        .emerald-flower-particle {
          position: absolute;
          opacity: 0;
          animation: emeraldFlowerBloom 2800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes emeraldFlowerBloom {
          0% { opacity: 0; transform: translate3d(0, 20px, 0) scale(0.15) rotate(0deg); }
          28% { opacity: 1; transform: translate3d(var(--tx), var(--ty), 0) scale(var(--sc)) rotate(var(--rot)); }
          75% { opacity: 0.95; transform: translate3d(var(--tx), calc(var(--ty) - 10px), 0) scale(var(--sc)) rotate(calc(var(--rot) + 12deg)); }
          100% { opacity: 0; transform: translate3d(var(--tx), calc(var(--ty) - 22px), 0) scale(calc(var(--sc) * 0.85)) rotate(calc(var(--rot) + 20deg)); }
        }

        .corner-flower-pop {
          opacity: 0;
          animation: cornerFlowerIn 1150ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes cornerFlowerIn {
          0% { opacity: 0; transform: scale(0.2) rotate(-35deg); }
          100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
        }

        .date-number-rise {
          animation: dateNumberRise 1050ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes dateNumberRise {
          0% { opacity: 0; transform: translateY(20px) scale(0.92); filter: blur(5px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }

        .countdown-digit-pop {
          animation: countdownDigitPop 950ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes countdownDigitPop {
          0% { opacity: 0; transform: translateY(24px) scale(0.7); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .lux-reveal {
          opacity: 0;
          will-change: transform, opacity, filter;
          transition:
            opacity 1050ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1050ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 1050ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .lux-reveal-fade-up {
          transform: translateY(32px);
          filter: blur(4px);
        }
        .lux-reveal-scale {
          transform: translateY(22px) scale(0.95);
          filter: blur(4px);
        }
        .lux-reveal.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        .lux-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .lux-twinkle {
          animation: candleTwinkle 2.4s ease-in-out infinite;
          transform-origin: center bottom;
        }
        @keyframes candleTwinkle {
          0%, 100% { opacity: 0.55; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.16); }
        }

        .lux-scroll-line {
          animation: editorialScrollPulse 2.8s ease-in-out infinite;
        }
        @keyframes editorialScrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(0.88); transform-origin: top center; }
          50% { opacity: 0.95; transform: scaleY(1); transform-origin: top center; }
        }
      `}</style>

      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 px-5 py-2 rounded-full bg-[#0D2C22]/95 text-[#F6F4EC] border border-[#E5CA8C]/35 shadow-2xl text-[11px] font-sans-clean tracking-wide flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E5CA8C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Subtle Floating Audio Mute/Unmute Toggle */}
      {introStage >= 3 && (
        <button
          type="button"
          onClick={handleToggleAudio}
          aria-label={isAudioOn ? 'Mute invitation audio' : 'Unmute invitation audio'}
          className="fixed bottom-5 right-5 z-50 w-10 h-10 rounded-full bg-[#0D2C22]/85 backdrop-blur-md border border-[#E5CA8C]/45 text-[#E5CA8C] flex items-center justify-center shadow-xl hover:bg-[#164638] transition cursor-pointer"
        >
          {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-75" />}
        </button>
      )}

      {/* Main Invitation Folio Viewport */}
      <div
        id="invitation-scroll-container"
        className={`phone-frame-active relative w-full mx-auto bg-alabaster-stationery overflow-x-hidden sm:max-w-[430px] sm:my-10 sm:rounded-[40px] sm:shadow-[0_32px_90px_rgba(0,0,0,0.85)] sm:border sm:border-[#C8A252]/40 ${
          isCoverLocked ? 'h-[100dvh] sm:h-[844px] overflow-y-hidden' : 'min-h-[100dvh]'
        }`}
      >
        {/* SEAMLESS 3D ROYAL DOUBLE-DOOR GATEFOLD COVER & WAX SEAL */}
        <GatefoldCoverOverlay
          stage={introStage}
          onTriggerOpen={handleTriggerOpen}
          couple={WEDDING_CONFIG.couple}
          dateSpaced={WEDDING_CONFIG.date.displaySpaced}
        />

        {/* ==================================================================
            SECTION 1: CLASSY EDITORIAL LETTERPRESS HERO
        ================================================================== */}
        <section className="relative min-h-[100dvh] sm:min-h-[828px] flex flex-col items-center justify-between px-8 py-14 sm:py-16 overflow-hidden">
          <HeroStationeryFrameSVG />

          <div
            style={{ transitionDelay: '100ms' }}
            className={`lux-hero-item ${heroRevealed ? 'is-revealed' : ''} relative z-10 pt-2`}
          >
            <HeroTopOrnamentSVG />
          </div>

          <div className="relative z-10 w-full max-w-[310px] mx-auto flex flex-col items-center justify-center text-center my-auto py-6">
            {/* Hairline-Flanked Eyebrow */}
            <div
              style={{ transitionDelay: '200ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } flex items-center justify-center gap-3 mb-7`}
            >
              <span className="w-6 h-[1px] bg-[#C8A252]/75 shrink-0" />
              <p className="font-sans-clean text-[8.5px] sm:text-[9px] tracking-[0.3em] uppercase text-[#355E52] whitespace-nowrap">
                {WEDDING_CONFIG.couple.tagline}
              </p>
              <span className="w-6 h-[1px] bg-[#C8A252]/75 shrink-0" />
            </div>

            {/* Cleanly Proportioned Couple Names Lockup */}
            <div
              style={{ transitionDelay: '340ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } w-full flex flex-col items-center justify-center mb-6`}
            >
              <h1 className="w-full flex flex-col items-center font-serif-editorial font-light text-[#0F3329]">
                <span className="block text-5xl sm:text-6xl font-light leading-[1.08] tracking-[0.04em] text-[#0F3329]">
                  {WEDDING_CONFIG.couple.bride}
                </span>

                <span className="my-2.5 flex items-center justify-center gap-3">
                  <span className="w-8 sm:w-10 h-[1px] bg-[#C8A252]/65" />
                  <span className="font-serif-editorial italic text-2xl leading-none text-[#C8A252] select-none">
                    &amp;
                  </span>
                  <span className="w-8 sm:w-10 h-[1px] bg-[#C8A252]/65" />
                </span>

                <span className="block text-5xl sm:text-6xl font-light leading-[1.08] tracking-[0.04em] text-[#0F3329]">
                  {WEDDING_CONFIG.couple.groom}
                </span>
              </h1>
            </div>

            {/* Italic Letterpress Subtitle */}
            <p
              style={{ transitionDelay: '480ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } font-serif-editorial italic text-[15px] sm:text-[16px] leading-relaxed text-[#355E52]/90 max-w-[250px] mb-8`}
            >
              Joyfully invite you to celebrate their engagement
            </p>

            {/* Classic 3-Column Gold-Ruled Date Lockup */}
            <div
              style={{ transitionDelay: '620ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } w-full max-w-[292px] border-y border-[#C8A252]/50 py-3.5 mb-7`}
            >
              <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                <div className="pr-3 text-center">
                  <span className="font-sans-clean text-[8.5px] sm:text-[9px] tracking-[0.26em] uppercase text-[#355E52] whitespace-nowrap">
                    Thursday
                  </span>
                </div>

                <div className="px-4 sm:px-5 border-x border-[#C8A252]/40 flex flex-col items-center justify-center">
                  <span className="font-sans-clean text-[8px] tracking-[0.3em] uppercase text-[#9A7832] whitespace-nowrap">
                    December
                  </span>
                  <span className="font-serif-editorial font-light text-[36px] sm:text-[40px] leading-none text-[#0F3329] my-0.5">
                    10
                  </span>
                  <span className="font-sans-clean text-[8.5px] tracking-[0.28em] text-[#355E52] whitespace-nowrap">
                    2026
                  </span>
                </div>

                <div className="pl-3 text-center">
                  <span className="font-sans-clean text-[8.5px] sm:text-[9px] tracking-[0.26em] uppercase text-[#355E52] whitespace-nowrap">
                    6:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Venue Lockup */}
            <div
              style={{ transitionDelay: '760ms' }}
              className={`lux-hero-item ${heroRevealed ? 'is-revealed' : ''}`}
            >
              <p className="font-serif-editorial text-[22px] sm:text-[24px] tracking-[0.06em] text-[#0F3329]">
                {WEDDING_CONFIG.venue.name}
              </p>
              <p className="font-sans-clean text-[9px] tracking-[0.34em] uppercase text-[#9A7832] mt-1">
                Madurai · India
              </p>
            </div>
          </div>

          {/* Minimal Pulsing Vertical Gold Hairline Scroll Cue */}
          <div
            style={{ transitionDelay: '900ms' }}
            className={`lux-hero-item ${
              heroRevealed ? 'is-revealed' : ''
            } relative z-10 flex flex-col items-center gap-2 pt-2`}
          >
            <span className="font-sans-clean text-[7.5px] tracking-[0.36em] uppercase text-[#9A7832]/85 pl-[0.36em]">
              Scroll
            </span>
            <span className="w-[1px] h-7 bg-gradient-to-b from-[#C8A252] to-transparent lux-scroll-line" />
          </div>
        </section>

        {/* ==================================================================
            SECTION 2: INVITATION STATEMENT & KISSING SWANS
        ================================================================== */}
        <section className="relative px-8 pt-8 pb-16 text-center">
          <RevealOnScroll variant="scale">
            <SwansIllustration />
          </RevealOnScroll>

          <RevealOnScroll delay={140}>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#0F3329] mt-4 mb-4 leading-tight">
              Together with their
              <br />
              families
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={260}>
            <p className="font-sans-clean text-xs sm:text-[13px] leading-relaxed text-[#355E52] max-w-xs mx-auto font-light">
              {WEDDING_CONFIG.couple.invitationText}
            </p>
          </RevealOnScroll>
        </section>

        {/* ==================================================================
            SECTION 3: SCRATCH-TO-REVEAL DATE & LIVE COUNTDOWN
        ================================================================== */}
        <section className="relative bg-velvet-emerald text-[#F6F4EC]">
          <ScallopedLaceDivider position="top" />

          <div className="px-6 py-12 text-center overflow-hidden">
            <RevealOnScroll variant="scale">
              <h2 className="font-serif-editorial text-3xl sm:text-4xl tracking-wide mb-2 text-[#F6F4EC]">
                Countdown
              </h2>
              <p className="font-sans-clean text-[10px] tracking-[0.24em] uppercase text-[#E5CA8C]/85 mb-6">
                Scratch the Foil Below to Reveal Our Date
              </p>

              <ScratchToRevealCountdown
                timeLeft={timeLeft}
                dateConfig={WEDDING_CONFIG.date}
                coupleConfig={WEDDING_CONFIG.couple}
              />
            </RevealOnScroll>
          </div>

          <ScallopedLaceDivider position="bottom" flip />
        </section>

        {/* ==================================================================
            SECTION 4: LOCATION — MAHAL, MADURAI, INDIA
        ================================================================== */}
        <section className="px-8 py-14 text-center">
          <RevealOnScroll>
            <h2 className="font-serif-editorial text-4xl text-[#0F3329] mb-2">Location</h2>
            <p className="font-script text-4xl text-[#0F3329] my-1">
              {WEDDING_CONFIG.venue.name}
            </p>
            <p className="font-sans-clean text-[10px] tracking-[0.28em] uppercase text-[#355E52] mb-6">
              {WEDDING_CONFIG.venue.cityCountry}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={140}>
            <p className="font-sans-clean text-xs leading-relaxed text-[#355E52] max-w-xs mx-auto mb-4 font-light">
              {WEDDING_CONFIG.venue.description1}
            </p>
            <p className="font-sans-clean text-xs leading-relaxed text-[#355E52] max-w-xs mx-auto font-light">
              {WEDDING_CONFIG.venue.description2}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={240} variant="scale">
            <VenueOvalIllustration />
          </RevealOnScroll>

          <RevealOnScroll delay={320}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <a
                href={WEDDING_CONFIG.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#0F3329]/55 text-[#0F3329] font-sans-clean text-[10px] tracking-[0.25em] uppercase hover:bg-[#0F3329] hover:text-[#F6F4EC] hover:border-[#0F3329] transition cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C8A252]" />
                <span>Open Google Maps</span>
              </a>
            </div>
          </RevealOnScroll>
        </section>

        {/* ==================================================================
            SECTION 5: THE DAY — DECEMBER 10, 2026 (3-EVENT TIMELINE)
        ================================================================== */}
        <section className="pt-4 pb-8 text-center">
          <RevealOnScroll>
            <HangingGarlandIllustration />

            <div className="px-6">
              <h2 className="font-serif-editorial text-4xl text-[#0F3329] mb-1">The Day</h2>
              <p className="font-sans-clean text-[10px] tracking-[0.26em] uppercase text-[#355E52] font-medium mb-2">
                {WEDDING_CONFIG.date.displayFull}
              </p>
              <p className="font-sans-clean text-xs text-[#355E52]/85 font-light mb-10">
                An evening of love, rings, and celebration.
              </p>
            </div>
          </RevealOnScroll>

          <div className="px-6">
            <div className="relative max-w-xs mx-auto text-left">
              <div className="absolute left-[46%] top-3 bottom-3 w-[1px] bg-gradient-to-b from-[#C8A252]/70 via-[#0F3329]/30 to-[#C8A252]/70" />

              {WEDDING_CONFIG.timeline.map((item, idx) => (
                <RevealOnScroll key={idx} delay={idx * 150}>
                  <div className="relative grid grid-cols-12 items-start mb-10 last:mb-0">
                    <div className="col-span-5 flex items-center justify-end pr-3 gap-1.5">
                      <div className="shrink-0">
                        <TimelineIcon type={item.icon} />
                      </div>
                      <span className="font-serif-editorial text-base sm:text-lg text-[#0F3329] whitespace-nowrap font-medium">
                        {item.time}
                      </span>
                    </div>

                    <div className="col-span-1 flex justify-center pt-5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0F3329] ring-[3px] ring-[#E5CA8C]/70" />
                    </div>

                    <div className="col-span-6 pl-2 pt-0.5">
                      <span className="block font-sans-clean text-[8px] tracking-[0.2em] uppercase text-[#9A7832] font-medium mb-0.5">
                        {item.dateLabel}
                      </span>
                      <h3 className="font-sans-clean text-[11px] font-medium tracking-[0.18em] uppercase text-[#0F3329] mb-1">
                        {item.title}
                      </h3>
                      <p className="font-sans-clean text-[11px] leading-relaxed text-[#355E52] font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* <RevealOnScroll delay={200}>
            <BanquetTableIllustration />
          </RevealOnScroll> */}
        </section>

        {/* ==================================================================
            FOOTER: CLOSING NOTE & REPLAY BUTTON
        ================================================================== */}
        <footer className="px-6 pt-12 pb-16 text-center">
          <RevealOnScroll variant="scale">
            <WeddingRingsIllustration />
          </RevealOnScroll>

          <RevealOnScroll delay={140}>
            <p className="font-serif-editorial text-2xl sm:text-3xl text-[#0F3329] mb-6 leading-snug">
              We can&apos;t wait to celebrate with you.
            </p>

            <p className="font-sans-clean text-xs text-[#355E52] font-light mb-2">
              With love,
            </p>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#0F3329] tracking-wide mb-3">
              {WEDDING_CONFIG.couple.bride}{' '}
              <span className="font-serif-editorial italic text-2xl sm:text-3xl mx-1.5 text-[#C8A252]">
                &amp;
              </span>{' '}
              {WEDDING_CONFIG.couple.groom}
            </h2>

            <p className="font-sans-clean text-xs tracking-[0.22em] uppercase text-[#355E52] mb-8">
              {WEDDING_CONFIG.date.displayFull}
            </p>

            <div className="mb-4">
              <button
                type="button"
                onClick={handleReplayOpening}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#0F3329]/45 text-[#0F3329] font-sans-clean text-[10px] tracking-[0.22em] uppercase hover:bg-[#0F3329] hover:text-[#F6F4EC] transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#C8A252]" />
                <span>Replay Seal &amp; Opening</span>
              </button>
            </div>
          </RevealOnScroll>
        </footer>
      </div>
    </div>
  );
}