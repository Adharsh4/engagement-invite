import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Calendar,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Heart
} from 'lucide-react';

// ============================================================================
// CONFIGURATION OBJECT (Preserved exactly for Harini & Adharsh)
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
// SAFE WEB AUDIO ENGINE (Sweet Music-Box, Celesta Chimes & Dreamy Ambient Loop)
// ============================================================================
class CuteMusicBoxAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isAmbientPlaying = false;
    this.intervalId = null;
    this.step = 0;
    // Soft dreamy major-7th music-box chord progression (Fmaj7 - Dm7 - Bbmaj7 - C9)
    this.progression = [
      { bass: 174.61, notes: [523.25, 659.25, 698.46, 880.0] },
      { bass: 146.83, notes: [440.0, 523.25, 659.25, 783.99] },
      { bass: 116.54, notes: [466.16, 587.33, 698.46, 880.0] },
      { bass: 130.81, notes: [523.25, 587.33, 659.25, 783.99] },
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

  // Cute heart-seal pop + sparkling celesta glissando
  playSealChime() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Cute bubbly heart-seal pop
      const popOsc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      popOsc.type = 'sine';
      popOsc.frequency.setValueAtTime(340, now);
      popOsc.frequency.exponentialRampToValueAtTime(680, now + 0.08);
      popOsc.frequency.exponentialRampToValueAtTime(220, now + 0.16);
      popGain.gain.setValueAtTime(0.08, now);
      popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      popOsc.connect(popGain);
      popGain.connect(this.ctx.destination);
      popOsc.start(now);
      popOsc.stop(now + 0.2);

      // 2. Soft paper-envelope unfold whisper
      const duration = 1.4;
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
      bandpass.frequency.setValueAtTime(750, now + 0.25);
      bandpass.frequency.exponentialRampToValueAtTime(1600, now + 0.9);
      bandpass.frequency.exponentialRampToValueAtTime(600, now + 1.55);
      bandpass.Q.setValueAtTime(1.8, now + 0.25);

      const rustleGain = this.ctx.createGain();
      rustleGain.gain.setValueAtTime(0.0001, now + 0.25);
      rustleGain.gain.linearRampToValueAtTime(0.012, now + 0.65);
      rustleGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      whiteNoise.connect(bandpass);
      bandpass.connect(rustleGain);
      rustleGain.connect(this.ctx.destination);
      whiteNoise.start(now + 0.25);
      whiteNoise.stop(now + 1.65);

      // 3. Twinkling music-box / celesta ascending cascade
      const chimeNotes = [523.25, 659.25, 783.99, 880.0, 1046.5, 1318.5, 1567.98];
      chimeNotes.forEach((freq, idx) => {
        const startTime = now + 0.18 + idx * 0.11;
        const osc = this.ctx.createOscillator();
        const bellOver = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        bellOver.type = 'triangle';
        bellOver.frequency.setValueAtTime(freq * 2, startTime);

        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(0.026, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.4);

        const overGain = this.ctx.createGain();
        overGain.gain.setValueAtTime(0.006, startTime);
        overGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45);

        osc.connect(gain);
        bellOver.connect(overGain);
        overGain.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        bellOver.start(startTime);
        osc.stop(startTime + 1.45);
        bellOver.stop(startTime + 0.5);
      });
    } catch {
      // Ignore Web Audio errors
    }
  }

  // Sparkling arpeggio when scratch card blooms with pastel flowers
  playBloomArpeggio() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1174.66, 1318.5, 1567.98];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          try {
            if (!this.ctx || this.isMuted) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.032, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 1.65);
          } catch {
            // Ignore transient audio errors
          }
        }, idx * 70);
      });
    } catch {
      // Ignore Web Audio errors
    }
  }

  playAmbientNote(freq, duration = 2.2, volume = 0.013, type = 'sine', attack = 0.04) {
    try {
      if (!this.ctx || this.isMuted) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);

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
          this.playAmbientNote(chord.bass, 3.0, 0.012, 'triangle', 0.25);
        }
        this.playAmbientNote(chord.notes[noteIdx], 2.0, 0.011, 'sine', 0.025);
        this.step += 1;
      };

      triggerStep();
      this.intervalId = setInterval(triggerStep, 860);
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

const audioEngine = new CuteMusicBoxAudioEngine();

// ============================================================================
// SCROLL REVEAL & CUTE SCALLOPED CLOUD/LACE DIVIDERS
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
      className={`cute-reveal cute-reveal-${variant} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

/** Cute Scalloped Cloud & Eyelet Lace Divider framing the Dreamy Countdown Section */
const CuteScallopCloudDivider = ({ position = 'top', flip = false }) => {
  const isTop = position === 'top';
  const uid = isTop ? 'top' : 'bottom';
  return (
    <div
      className="relative w-full overflow-hidden select-none pointer-events-none leading-none z-10"
      style={{
        height: '62px',
        marginTop: isTop ? '-1px' : '0',
        marginBottom: !isTop ? '-1px' : '0',
        transform: flip ? 'rotate(180deg)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 440 80"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(133, 94, 166, 0.18))' }}
      >
        <defs>
          <pattern id={`cuteCloudScallop-${uid}`} width="88" height="80" patternUnits="userSpaceOnUse">
            {/* Soft blush lace halo */}
            <path
              d="M 0 0 L 88 0 L 88 38 Q 66 72 44 46 Q 22 72 0 38 Z"
              fill="#F8BBD0"
              fillOpacity="0.38"
            />
            {/* Main marshmallow cloud scallop */}
            <path
              d="M 0 0 L 88 0 L 88 30 Q 66 64 44 38 Q 22 64 0 30 Z"
              fill="#FFFDFC"
            />
            {/* Delicate stitched eyelet dots */}
            <path
              d="M 4 26 Q 22 54 44 33 Q 66 54 84 26"
              fill="none"
              stroke="#E887AB"
              strokeWidth="1.2"
              strokeDasharray="2 4"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
            {/* Cute tiny eyelet hearts/dots */}
            <circle cx="22" cy="36" r="2.2" fill="#E6D4FF" />
            <circle cx="66" cy="36" r="2.2" fill="#FFEAF2" />
            <circle cx="44" cy="24" r="1.8" fill="#E887AB" fillOpacity="0.6" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="440" height="80" fill={`url(#cuteCloudScallop-${uid})`} />
      </svg>
    </div>
  );
};

// ============================================================================
// BLOOMING PASTEL SAKURA, DAISY, LAVENDER & HEART PARTICLES + SCRATCH CARD
// ============================================================================
const PastelFlowerSVG = ({ variant = 0, size = 36 }) => {
  if (variant % 4 === 0) {
    // Cute Sakura Blossom
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible drop-shadow-sm">
        <g transform="translate(32,32)">
          {[0, 72, 144, 216, 288].map((deg) => (
            <path
              key={deg}
              d="M 0 -2 C -9 -10, -11 -22, -2 -25 L 0 -21 L 2 -25 C 11 -22, 9 -10, 0 -2 Z"
              transform={`rotate(${deg})`}
              fill="#F8BBD0"
              stroke="#FFFDFC"
              strokeWidth="1.2"
            />
          ))}
          <circle cx="0" cy="0" r="6" fill="#FFF2B2" />
          <circle cx="-2" cy="-1.5" r="1.2" fill="#E887AB" />
          <circle cx="2" cy="-1" r="1.2" fill="#E887AB" />
          <circle cx="0" cy="2" r="1.2" fill="#E887AB" />
        </g>
      </svg>
    );
  }
  if (variant % 4 === 1) {
    // Cute Lavender Daisy
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible drop-shadow-sm">
        <g transform="translate(32,32)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-14"
              rx="6.2"
              ry="11"
              transform={`rotate(${deg})`}
              fill="#E6D4FF"
              stroke="#FFFDFC"
              strokeWidth="1"
            />
          ))}
          <circle cx="0" cy="0" r="7" fill="#FFE082" stroke="#FFFDFC" strokeWidth="1.2" />
        </g>
      </svg>
    );
  }
  if (variant % 4 === 2) {
    // Cute Pastel Blush Heart
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible drop-shadow-sm">
        <path
          d="M 32 52 C 29 49, 10 36, 10 22 C 10 13, 17 8, 24 8 C 28 8, 31 10.5, 32 13 C 33 10.5, 36 8, 40 8 C 47 8, 54 13, 54 22 C 54 36, 35 49, 32 52 Z"
          fill="#F48FB1"
          stroke="#FFFDFC"
          strokeWidth="2"
        />
        <ellipse cx="22" cy="18" rx="4.5" ry="2.5" transform="rotate(-30 22 18)" fill="#FFFDFC" fillOpacity="0.65" />
      </svg>
    );
  }
  // Cute Mini Lavender Sprig
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible drop-shadow-sm">
      <g transform="translate(32,32) rotate(-18)">
        <path d="M 0 22 Q 2 0 0 -22" stroke="#A6C8B0" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {[-16, -9, -2, 5].map((y, idx) => (
          <g key={idx} transform={`translate(0, ${y})`}>
            <ellipse cx="-5.5" cy="-1.5" rx="4.8" ry="3" transform="rotate(-28 -5.5 -1.5)" fill="#C9A6F2" stroke="#FFFDFC" strokeWidth="0.7" />
            <ellipse cx="5.5" cy="-1.5" rx="4.8" ry="3" transform="rotate(28 5.5 -1.5)" fill="#E6D4FF" stroke="#FFFDFC" strokeWidth="0.7" />
            <circle cx="0" cy="-3.5" r="2.8" fill="#F8BBD0" />
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
    { id: 1, tx: '-132px', ty: '-102px', rot: '-24deg', scale: 1.12, delay: 0, variant: 0, size: 42 },
    { id: 2, tx: '132px', ty: '-98px', rot: '28deg', scale: 1.08, delay: 50, variant: 1, size: 40 },
    { id: 3, tx: '-145px', ty: '-12px', rot: '-35deg', scale: 0.96, delay: 90, variant: 2, size: 34 },
    { id: 4, tx: '145px', ty: '-8px', rot: '32deg', scale: 1.0, delay: 130, variant: 3, size: 38 },
    { id: 5, tx: '-122px', ty: '86px', rot: '-18deg', scale: 1.1, delay: 80, variant: 1, size: 40 },
    { id: 6, tx: '124px', ty: '90px', rot: '22deg', scale: 1.06, delay: 110, variant: 0, size: 40 },
    { id: 7, tx: '-64px', ty: '-122px', rot: '-14deg', scale: 0.92, delay: 40, variant: 2, size: 32 },
    { id: 8, tx: '66px', ty: '-118px', rot: '16deg', scale: 0.94, delay: 70, variant: 0, size: 36 },
    { id: 9, tx: '0px', ty: '-132px', rot: '6deg', scale: 1.2, delay: 20, variant: 2, size: 38 },
    { id: 10, tx: '-70px', ty: '116px', rot: '-16deg', scale: 0.95, delay: 120, variant: 3, size: 36 },
    { id: 11, tx: '72px', ty: '115px', rot: '20deg', scale: 0.94, delay: 150, variant: 2, size: 32 },
    { id: 12, tx: '0px', ty: '124px', rot: '-6deg', scale: 1.15, delay: 90, variant: 0, size: 42 },
  ];

  const cornerBlossoms = [
    { pos: 'top-2 left-2', variant: 0, size: 30, delay: '100ms' },
    { pos: 'top-7 left-8', variant: 2, size: 20, delay: '220ms' },
    { pos: 'top-2 right-2', variant: 1, size: 30, delay: '150ms' },
    { pos: 'top-7 right-8', variant: 2, size: 20, delay: '280ms' },
    { pos: 'bottom-2 left-2', variant: 1, size: 28, delay: '200ms' },
    { pos: 'bottom-2 right-2', variant: 0, size: 28, delay: '260ms' },
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

      // Shimmering Iridescent Pastel Lavender-Pink Foil
      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, '#F5D0E6');
      grad.addColorStop(0.26, '#FFF0F6');
      grad.addColorStop(0.52, '#DFC4FA');
      grad.addColorStop(0.76, '#FCE4EC');
      grad.addColorStop(1, '#E6B4D5');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Soft diagonal pearlescent sheen stripes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.2;
      for (let x = -rect.height; x < rect.width + rect.height; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - rect.height, rect.height);
        ctx.stroke();
      }

      // Cute inner dashed border
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = 'rgba(124, 96, 140, 0.35)';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(14, 14, Math.max(1, rect.width - 28), Math.max(1, rect.height - 28));
      ctx.setLineDash([]);

      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Soft glowing heart circle backdrop
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.beginPath();
      ctx.arc(cx, cy - 12, 36, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#4A3259';
      ctx.font = 'italic 600 22px "Playfair Display", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('Scratch to Reveal ♡', cx, cy - 5);

      ctx.font = '600 9.5px "Quicksand", sans-serif';
      ctx.fillStyle = '#6E4C82';
      ctx.fillText('OUR SPECIAL DATE & COUNTDOWN', cx, cy + 20);

      ctx.font = '500 9.5px "Quicksand", sans-serif';
      ctx.fillStyle = '#8E6DA0';
      ctx.fillText('Rub gently with your finger or cursor ✨', cx, cy + 40);
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
      ctx.lineWidth = 40;

      ctx.beginPath();
      if (lastPointRef.current) {
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
      } else {
        ctx.arc(x, y, 22, 0, Math.PI * 2);
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
    <div className="relative max-w-[330px] mx-auto my-2 select-none">
      {/* Burst of Pastel Flowers & Hearts on Reveal */}
      {isRevealed && (
        <div
          key={bloomCycle}
          className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-visible"
        >
          {flowerParticles.map((p) => (
            <div
              key={p.id}
              className="pastel-flower-particle"
              style={{
                '--tx': p.tx,
                '--ty': p.ty,
                '--rot': p.rot,
                '--sc': p.scale,
                animationDelay: `${p.delay}ms`,
              }}
            >
              <PastelFlowerSVG variant={p.variant} size={p.size} />
            </div>
          ))}
        </div>
      )}

      {/* Frosted Cute Scratch Card Container */}
      <div className="relative rounded-[28px] bg-white/80 backdrop-blur-md border-2 border-white/90 px-4 py-8 shadow-[0_14px_35px_rgba(112,72,144,0.18)] overflow-hidden">
        {isRevealed &&
          cornerBlossoms.map((cb, idx) => (
            <div
              key={`${bloomCycle}-corner-${idx}`}
              className={`absolute ${cb.pos} pointer-events-none z-20 corner-flower-pop`}
              style={{ animationDelay: cb.delay }}
            >
              <PastelFlowerSVG variant={cb.variant} size={cb.size} />
            </div>
          ))}

        <div
          className={`relative z-10 transition-all duration-700 ${
            isRevealed
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-45 scale-95 translate-y-2'
          }`}
        >
          <p className="font-cute-sans text-[10px] font-semibold tracking-[0.26em] uppercase text-[#D66E98] mb-1">
            ♡ Save Our Date ♡
          </p>

          <h3
            className={`font-cute-serif text-2xl sm:text-[26px] font-semibold text-[#4A3259] tracking-wide mb-1 ${
              isRevealed ? 'date-number-rise' : ''
            }`}
          >
            {dateConfig.displayFull}
          </h3>

          <p
            className={`font-cute-sans text-[11px] font-medium tracking-[0.14em] uppercase text-[#7C608C] mb-5 ${
              isRevealed ? 'date-number-rise' : ''
            }`}
            style={{ animationDelay: '120ms' }}
          >
            {dateConfig.displayTime}
          </p>

          {/* Cute Rounded Frosted Countdown Tiles */}
          <div className="grid grid-cols-4 gap-2 max-w-[280px] mx-auto pt-3 border-t border-[#E6D4FF]">
            {[
              { value: timeLeft.days, label: 'DAYS', delay: '180ms' },
              { value: timeLeft.hours, label: 'HOURS', delay: '280ms' },
              { value: timeLeft.minutes, label: 'MINS', delay: '380ms' },
              { value: timeLeft.seconds, label: 'SECS', delay: '480ms' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#FFF5F9] to-[#F6EEFF] border border-[#F8BBD0]/70 py-2.5 px-1 shadow-sm ${
                  isRevealed ? 'countdown-digit-pop' : ''
                }`}
                style={{ animationDelay: item.delay }}
              >
                <span className="font-cute-serif text-2xl sm:text-[28px] font-bold leading-none text-[#4A3259]">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-cute-sans text-[8px] font-bold tracking-[0.16em] text-[#B5759B] mt-1.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Scratch Foil Canvas */}
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
          className={`absolute inset-0 w-full h-full z-20 cursor-grab active:cursor-grabbing transition-opacity duration-700 rounded-[26px] ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      {/* Cute Pill Action Buttons */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        {!isRevealed ? (
          <button
            type="button"
            onClick={triggerFullReveal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 border border-[#F8BBD0] text-[11px] font-cute-sans font-semibold tracking-[0.14em] uppercase text-[#5E3D72] shadow-md hover:bg-[#FFEAF2] hover:scale-[1.02] transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E887AB]" />
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 border border-[#F8BBD0] text-[10px] font-cute-sans font-semibold tracking-[0.14em] uppercase text-[#5E3D72] shadow-sm hover:bg-[#FFEAF2] transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E887AB]" />
              <span>Bloom Flowers</span>
            </button>

            <button
              type="button"
              onClick={handleResetScratchCard}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/65 border border-white/80 text-[10px] font-cute-sans font-semibold tracking-[0.12em] uppercase text-[#5E3D72] hover:bg-white/90 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-[#B58CE0]" />
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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E887AB] text-white text-[10px] font-cute-sans font-semibold tracking-[0.16em] uppercase shadow-md hover:bg-[#D9749B] transition"
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
// CUTE PASTEL ILLUSTRATIONS (Hero Arch, Fairy Lights, Lovebirds, Venue, Timeline)
// ============================================================================

/** Section 1: Soft Pastel Scalloped Arch Card Frame + Hanging Twinkling Fairy Lights */
const CuteHeroArchFrameSVG = () => (
  <svg
    viewBox="0 0 390 790"
    preserveAspectRatio="none"
    className="absolute inset-3.5 sm:inset-4 w-[calc(100%-1.75rem)] sm:w-[calc(100%-2rem)] h-[calc(100%-1.75rem)] sm:h-[calc(100%-2rem)] pointer-events-none select-none"
  >
    <defs>
      <linearGradient id="cuteArchStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8BBD0" />
        <stop offset="50%" stopColor="#D6B4F8" />
        <stop offset="100%" stopColor="#F4A7C1" />
      </linearGradient>
    </defs>

    {/* Outer rounded arch frame */}
    <path
      d="M 18 190 A 177 177 0 0 1 372 190 L 372 752 Q 372 778 346 778 L 44 778 Q 18 778 18 752 Z"
      fill="#FFFDFC"
      fillOpacity="0.6"
      stroke="url(#cuteArchStroke)"
      strokeWidth="2"
    />

    {/* Inner dainty dotted arch */}
    <path
      d="M 27 192 A 168 168 0 0 1 363 192 L 363 746 Q 363 769 340 769 L 50 769 Q 27 769 27 746 Z"
      fill="none"
      stroke="#E4A9B8"
      strokeWidth="1.15"
      strokeDasharray="3 5"
      strokeLinecap="round"
      strokeOpacity="0.75"
    />
  </svg>
);

/** Dainty Hanging Fairy Lights & Pastel Blossoms at Top of Section 1 */
const CuteFairyLightsHeaderSVG = () => (
  <svg viewBox="0 0 360 88" className="w-full max-w-[330px] h-auto mx-auto select-none overflow-visible">
    <g fill="none" strokeLinecap="round">
      {/* Gentle fairy-light wire swags */}
      <path d="M 12 10 Q 95 52 180 18 Q 265 52 348 10" stroke="#D9A0B6" strokeWidth="1.2" strokeOpacity="0.8" />
      <path d="M 30 6 Q 105 38 180 14 Q 255 38 330 6" stroke="#C5A3E8" strokeWidth="0.9" strokeDasharray="2 3" strokeOpacity="0.65" />

      {/* Hanging glowing fairy bulbs & tiny stars */}
      {[
        { x: 52, y: 26, len: 16, color: '#FFE082', star: false },
        { x: 96, y: 36, len: 22, color: '#F8BBD0', star: true },
        { x: 140, y: 30, len: 15, color: '#E6D4FF', star: false },
        { x: 180, y: 18, len: 26, color: '#FFE082', star: true },
        { x: 220, y: 30, len: 15, color: '#F8BBD0', star: false },
        { x: 264, y: 36, len: 22, color: '#E6D4FF', star: true },
        { x: 308, y: 26, len: 16, color: '#FFE082', star: false },
      ].map((b, idx) => (
        <g key={idx}>
          <line x1={b.x} y1={b.y} x2={b.x} y2={b.y + b.len} stroke="#D9A0B6" strokeWidth="0.9" strokeOpacity="0.75" />
          <circle cx={b.x} cy={b.y + b.len + 3} r="8" fill={b.color} fillOpacity="0.28" className="cute-twinkle" style={{ animationDelay: `${idx * 240}ms` }} />
          {b.star ? (
            <path
              d={`M ${b.x} ${b.y + b.len - 2} L ${b.x + 2} ${b.y + b.len + 2} L ${b.x + 6} ${b.y + b.len + 3.5} L ${b.x + 2} ${b.y + b.len + 5} L ${b.x} ${b.y + b.len + 9} L ${b.x - 2} ${b.y + b.len + 5} L ${b.x - 6} ${b.y + b.len + 3.5} L ${b.x - 2} ${b.y + b.len + 2} Z`}
              fill={b.color}
              stroke="#FFFDFC"
              strokeWidth="0.7"
              className="cute-twinkle"
              style={{ animationDelay: `${idx * 240}ms` }}
            />
          ) : (
            <circle cx={b.x} cy={b.y + b.len + 3} r="3.4" fill={b.color} stroke="#FFFDFC" strokeWidth="0.8" />
          )}
        </g>
      ))}

      {/* Cute top floral wreath cluster */}
      <g transform="translate(180, 15)">
        <ellipse cx="-16" cy="-2" rx="8" ry="4" transform="rotate(-18 -16 -2)" fill="#C6E2CE" />
        <ellipse cx="16" cy="-2" rx="8" ry="4" transform="rotate(18 16 -2)" fill="#C6E2CE" />
        <circle cx="-8" cy="0" r="5" fill="#E6D4FF" stroke="#FFFDFC" strokeWidth="0.8" />
        <circle cx="8" cy="0" r="5" fill="#F8BBD0" stroke="#FFFDFC" strokeWidth="0.8" />
        <circle cx="0" cy="-2" r="6" fill="#FFEAF2" stroke="#E887AB" strokeWidth="1" />
        <circle cx="0" cy="-2" r="2.2" fill="#FFE082" />
      </g>
    </g>
  </svg>
);

/** Section 2: Adorable Kissing Pastel Lovebirds with Blush Cheeks & Floating Heart */
const CuteLovebirdsIllustration = () => (
  <svg viewBox="0 0 240 140" className="w-52 h-auto mx-auto cute-float-slow select-none">
    <defs>
      <linearGradient id="birdLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE0EC" />
        <stop offset="100%" stopColor="#F5A9C4" />
      </linearGradient>
      <linearGradient id="birdRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EFE3FF" />
        <stop offset="100%" stopColor="#C9A8F2" />
      </linearGradient>
    </defs>

    {/* Cute pastel floral branch */}
    <path
      d="M 28 106 Q 120 96 212 106"
      fill="none"
      stroke="#C9A38D"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Little sage pastel leaves on the branch */}
    <ellipse cx="48" cy="98" rx="10" ry="4.5" transform="rotate(-24 48 98)" fill="#C5E0CD" />
    <ellipse cx="64" cy="108" rx="9" ry="4" transform="rotate(20 64 108)" fill="#D7EBD9" />
    <ellipse cx="192" cy="98" rx="10" ry="4.5" transform="rotate(24 192 98)" fill="#C5E0CD" />
    <ellipse cx="176" cy="108" rx="9" ry="4" transform="rotate(-20 176 108)" fill="#D7EBD9" />

    {/* Tiny flowers on branch ends */}
    <g transform="translate(36, 102)">
      <circle cx="0" cy="0" r="6" fill="#F8BBD0" />
      <circle cx="0" cy="0" r="2.2" fill="#FFE082" />
    </g>
    <g transform="translate(204, 102)">
      <circle cx="0" cy="0" r="6" fill="#E6D4FF" />
      <circle cx="0" cy="0" r="2.2" fill="#FFE082" />
    </g>

    {/* Floating Blush Heart between the two lovebirds */}
    <g className="cute-heartbeat" style={{ transformOrigin: '120px 34px' }}>
      <path
        d="M 120 44 C 118 42, 107 34, 107 26 C 107 20.5, 111.5 17.5, 115.5 17.5 C 117.8 17.5, 119.3 19, 120 20.8 C 120.7 19, 122.2 17.5, 124.5 17.5 C 128.5 17.5, 133 20.5, 133 26 C 133 34, 122 42, 120 44 Z"
        fill="#F06292"
        stroke="#FFFDFC"
        strokeWidth="1.4"
      />
      <ellipse cx="114.5" cy="23.5" rx="2.5" ry="1.3" transform="rotate(-30 114.5 23.5)" fill="#FFFDFC" fillOpacity="0.7" />
    </g>

    {/* Little sparkles around heart */}
    <circle cx="98" cy="22" r="1.8" fill="#E887AB" className="cute-twinkle" />
    <circle cx="142" cy="22" r="1.8" fill="#B58CE0" className="cute-twinkle" style={{ animationDelay: '400ms' }} />

    {/* LEFT CUTE LOVEBIRD (Blush Rose) */}
    <g>
      {/* Tail feathers */}
      <path d="M 65 92 L 42 104 L 48 90 L 38 92 L 58 80 Z" fill="#E887AB" />
      {/* Plump cute body */}
      <path
        d="M 62 84 C 60 64, 76 46, 94 48 C 107 49, 112 60, 112 72 C 112 90, 96 101, 78 100 C 68 99, 63 92, 62 84 Z"
        fill="url(#birdLeftGrad)"
        stroke="#FFFDFC"
        strokeWidth="1.6"
      />
      {/* Cute wing */}
      <path
        d="M 74 72 C 84 68, 96 74, 96 84 C 96 91, 84 94, 72 88 C 68 85, 69 75, 74 72 Z"
        fill="#FCE4EC"
        stroke="#E887AB"
        strokeWidth="1"
      />
      {/* Cute happy closed eye */}
      <path d="M 94 61 Q 98 57 102 61" fill="none" stroke="#4A3259" strokeWidth="1.6" strokeLinecap="round" />
      {/* Rosy blush cheek */}
      <ellipse cx="95" cy="67" rx="4.5" ry="2.6" fill="#F06292" fillOpacity="0.45" />
      {/* Cute little beak */}
      <path d="M 111 63 L 119 66 L 111 69 Z" fill="#FFB74D" stroke="#F57C00" strokeWidth="0.6" strokeLinejoin="round" />
      {/* Little feet perched */}
      <path d="M 84 100 L 84 104 M 90 100 L 90 104" stroke="#E887AB" strokeWidth="1.8" strokeLinecap="round" />
    </g>

    {/* RIGHT CUTE LOVEBIRD (Dreamy Lavender) */}
    <g>
      {/* Tail feathers */}
      <path d="M 175 92 L 198 104 L 192 90 L 202 92 L 182 80 Z" fill="#B58CE0" />
      {/* Plump cute body */}
      <path
        d="M 178 84 C 180 64, 164 46, 146 48 C 133 49, 128 60, 128 72 C 128 90, 144 101, 162 100 C 172 99, 177 92, 178 84 Z"
        fill="url(#birdRightGrad)"
        stroke="#FFFDFC"
        strokeWidth="1.6"
      />
      {/* Cute wing */}
      <path
        d="M 166 72 C 156 68, 144 74, 144 84 C 144 91, 156 94, 168 88 C 172 85, 171 75, 166 72 Z"
        fill="#F6EEFF"
        stroke="#B58CE0"
        strokeWidth="1"
      />
      {/* Cute happy closed eye */}
      <path d="M 146 61 Q 142 57 138 61" fill="none" stroke="#4A3259" strokeWidth="1.6" strokeLinecap="round" />
      {/* Rosy blush cheek */}
      <ellipse cx="145" cy="67" rx="4.5" ry="2.6" fill="#F06292" fillOpacity="0.4" />
      {/* Cute little beak */}
      <path d="M 129 63 L 121 66 L 129 69 Z" fill="#FFB74D" stroke="#F57C00" strokeWidth="0.6" strokeLinejoin="round" />
      {/* Little feet perched */}
      <path d="M 156 100 L 156 104 M 150 100 L 150 104" stroke="#B58CE0" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
);

/** Section 4: Cute Pastel Floral Arch Venue Illustration with Fairy Lights */
const CuteVenueArchIllustration = () => (
  <div className="relative w-72 sm:w-80 mx-auto my-6 cute-float-slow select-none">
    <svg viewBox="0 0 320 350" className="w-full h-auto drop-shadow-sm">
      <defs>
        <linearGradient id="pastelSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4E8FF" />
          <stop offset="55%" stopColor="#FFEAF2" />
          <stop offset="100%" stopColor="#FFFDFC" />
        </linearGradient>
        <clipPath id="cuteVenueArchClip">
          <path d="M 54 150 A 106 106 0 0 1 266 150 L 266 296 Q 266 312 250 312 L 70 312 Q 54 312 54 296 Z" />
        </clipPath>
      </defs>

      {/* Outer decorative pastel border */}
      <path
        d="M 46 150 A 114 114 0 0 1 274 150 L 274 300 Q 274 320 254 320 L 66 320 Q 46 320 46 300 Z"
        fill="#FFFDFC"
        stroke="#F8BBD0"
        strokeWidth="2"
      />
      <path
        d="M 54 150 A 106 106 0 0 1 266 150 L 266 296 Q 266 312 250 312 L 70 312 Q 54 312 54 296 Z"
        fill="url(#pastelSkyGrad)"
        stroke="#E6D4FF"
        strokeWidth="1.5"
      />

      {/* Inside Arch Scene */}
      <g clipPath="url(#cuteVenueArchClip)">
        {/* Fluffy pastel clouds */}
        <g fill="#FFFDFC" fillOpacity="0.88">
          <circle cx="92" cy="95" r="16" />
          <circle cx="108" cy="92" r="19" />
          <circle cx="124" cy="97" r="14" />
          <circle cx="208" cy="112" r="13" />
          <circle cx="222" cy="109" r="16" />
          <circle cx="236" cy="113" r="12" />
        </g>

        {/* Hanging fairy light swags inside arch */}
        <path d="M 54 110 Q 108 140 160 118 Q 212 140 266 110" fill="none" stroke="#D9A0B6" strokeWidth="1" />
        {[82, 110, 136, 160, 184, 210, 238].map((bx, i) => (
          <circle
            key={i}
            cx={bx}
            cy={i === 3 ? 119 : i === 1 || i === 5 ? 129 : 124}
            r="3"
            fill="#FFE082"
            stroke="#FFFDFC"
            strokeWidth="0.7"
            className="cute-twinkle"
            style={{ animationDelay: `${i * 220}ms` }}
          />
        ))}

        {/* Cute Pastel Mahal Pavilion */}
        <rect x="92" y="168" width="136" height="106" rx="6" fill="#FFFDFC" stroke="#D9A0B6" strokeWidth="1.5" />
        {/* Roof dome & cute finial */}
        <path d="M 118 168 Q 160 124 202 168 Z" fill="#F8BBD0" stroke="#D9A0B6" strokeWidth="1.4" />
        <path d="M 136 168 Q 160 140 184 168 Z" fill="#FFEAF2" />
        <circle cx="160" cy="136" r="4" fill="#FFE082" stroke="#D9A0B6" strokeWidth="1" />
        {/* Side mini domes */}
        <path d="M 92 168 Q 106 146 120 168 Z" fill="#E6D4FF" stroke="#C5A3E8" strokeWidth="1.2" />
        <path d="M 200 168 Q 214 146 228 168 Z" fill="#E6D4FF" stroke="#C5A3E8" strokeWidth="1.2" />

        {/* Decorative roof scallops */}
        <path
          d="M 92 174 Q 103 182 114 174 Q 125 182 136 174 Q 148 182 160 174 Q 172 182 184 174 Q 195 182 206 174 Q 217 182 228 174"
          fill="none"
          stroke="#E887AB"
          strokeWidth="1.2"
        />

        {/* Cute Arched Doorway & Windows */}
        <path
          d="M 140 274 L 140 226 A 20 20 0 0 1 180 226 L 180 274 Z"
          fill="#FFEAF2"
          stroke="#D9A0B6"
          strokeWidth="1.4"
        />
        {/* Little heart above the entrance door */}
        <path
          d="M 160 218 C 159 217, 155 214, 155 211 C 155 209, 157 208, 158.5 208 C 159.4 208, 160 208.8, 160 209.5 C 160 208.8, 160.6 208, 161.5 208 C 163 208, 165 209, 165 211 C 165 214, 161 217, 160 218 Z"
          fill="#E887AB"
        />
        {/* Side arched windows */}
        {[114, 206].map((wx, idx) => (
          <path
            key={idx}
            d={`M ${wx - 10} 248 L ${wx - 10} 214 A 10 10 0 0 1 ${wx + 10} 214 L ${wx + 10} 248 Z`}
            fill="#F6EEFF"
            stroke="#C5A3E8"
            strokeWidth="1.2"
          />
        ))}

        {/* Garden pathway & pastel bushes */}
        <ellipse cx="160" cy="296" rx="125" ry="30" fill="#DDF0E3" />
        <path d="M 142 274 L 122 316 L 198 316 L 178 274 Z" fill="#FFF7FA" />
        <circle cx="82" cy="272" r="18" fill="#C7E4D0" />
        <circle cx="238" cy="272" r="18" fill="#C7E4D0" />
        <circle cx="78" cy="268" r="4" fill="#F8BBD0" />
        <circle cx="90" cy="274" r="3.5" fill="#E6D4FF" />
        <circle cx="234" cy="267" r="4" fill="#F8BBD0" />
        <circle cx="244" cy="275" r="3.5" fill="#FFE082" />
      </g>

      {/* Cute Floral Bouquet Accents on the Outer Arch */}
      <g transform="translate(66, 76)">
        <ellipse cx="-10" cy="12" rx="11" ry="5" transform="rotate(-45 -10 12)" fill="#C5E0CD" />
        <ellipse cx="12" cy="-10" rx="11" ry="5" transform="rotate(20 12 -10)" fill="#C5E0CD" />
        <circle cx="0" cy="0" r="11" fill="#F8BBD0" stroke="#FFFDFC" strokeWidth="1.4" />
        <circle cx="0" cy="0" r="4" fill="#FFE082" />
        <circle cx="14" cy="8" r="7.5" fill="#E6D4FF" stroke="#FFFDFC" strokeWidth="1.2" />
        <circle cx="14" cy="8" r="2.6" fill="#FFF2B2" />
      </g>

      <g transform="translate(254, 76)">
        <ellipse cx="10" cy="12" rx="11" ry="5" transform="rotate(45 10 12)" fill="#C5E0CD" />
        <ellipse cx="-12" cy="-10" rx="11" ry="5" transform="rotate(-20 -12 -10)" fill="#C5E0CD" />
        <circle cx="0" cy="0" r="11" fill="#E6D4FF" stroke="#FFFDFC" strokeWidth="1.4" />
        <circle cx="0" cy="0" r="4" fill="#FFE082" />
        <circle cx="-14" cy="8" r="7.5" fill="#F8BBD0" stroke="#FFFDFC" strokeWidth="1.2" />
        <circle cx="-14" cy="8" r="2.6" fill="#FFF2B2" />
      </g>
    </svg>
  </div>
);

/** Section 5 Top: Cute Pastel Bunting & Fairy-Light Floral Garland */
const CuteBuntingGarlandSVG = () => (
  <svg viewBox="0 0 400 92" className="w-full h-auto mb-2 select-none">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Main curved string */}
      <path d="M 0 18 Q 100 66 200 26 Q 300 66 400 18" stroke="#D9A0B6" strokeWidth="1.4" />

      {/* Cute pastel bunting pennants */}
      {[
        { x: 46, y: 34, rot: 18, fill: '#FFEAF2', stroke: '#F8BBD0' },
        { x: 86, y: 44, rot: 4, fill: '#F0E4FF', stroke: '#D6B4F8' },
        { x: 126, y: 42, rot: -10, fill: '#FFF3D6', stroke: '#F7D99C' },
        { x: 164, y: 34, rot: -18, fill: '#FFEAF2', stroke: '#F8BBD0' },
        { x: 236, y: 34, rot: 18, fill: '#F0E4FF', stroke: '#D6B4F8' },
        { x: 274, y: 42, rot: 10, fill: '#FFF3D6', stroke: '#F7D99C' },
        { x: 314, y: 44, rot: -4, fill: '#FFEAF2', stroke: '#F8BBD0' },
        { x: 354, y: 34, rot: -18, fill: '#F0E4FF', stroke: '#D6B4F8' },
      ].map((p, idx) => (
        <g key={idx} transform={`translate(${p.x}, ${p.y}) rotate(${p.rot})`}>
          <path d="M -12 0 L 12 0 L 0 22 Z" fill={p.fill} stroke={p.stroke} strokeWidth="1.2" />
          <circle cx="0" cy="8" r="2" fill="#E887AB" fillOpacity="0.55" />
        </g>
      ))}

      {/* Center little blossom bow */}
      <g transform="translate(200, 26)">
        <ellipse cx="-11" cy="0" rx="7" ry="4" fill="#F8BBD0" stroke="#FFFDFC" strokeWidth="0.9" />
        <ellipse cx="11" cy="0" rx="7" ry="4" fill="#F8BBD0" stroke="#FFFDFC" strokeWidth="0.9" />
        <circle cx="0" cy="0" r="5" fill="#E887AB" stroke="#FFFDFC" strokeWidth="1" />
      </g>

      {/* Tiny twinkling fairy dots */}
      {[66, 106, 146, 254, 294, 334].map((x, idx) => (
        <circle
          key={idx}
          cx={x}
          cy={idx % 2 === 0 ? 48 : 54}
          r="2.4"
          fill="#FFE082"
          className="cute-twinkle"
          style={{ animationDelay: `${idx * 260}ms` }}
        />
      ))}
    </g>
  </svg>
);

/** Section 5 Timeline Icons — Adorable Custom Pastel SVGs */
const CuteTimelineIcon = ({ type }) => {
  switch (type) {
    case 'welcome_flutes':
      // Clinking pastel glasses with a little floating heart
      return (
        <svg viewBox="0 0 64 58" className="w-14 h-12 select-none">
          <g fill="none" stroke="#6E4C82" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            {/* Left glass */}
            <path d="M 14 14 L 26 17 L 22 33 Q 19 36 16 32 Z" fill="#FFEAF2" />
            <line x1="19" y1="34" x2="16" y2="48" />
            <line x1="11" y1="48" x2="21" y2="48" />
            {/* Right glass */}
            <path d="M 50 14 L 38 17 L 42 33 Q 45 36 48 32 Z" fill="#F0E4FF" />
            <line x1="45" y1="34" x2="48" y2="48" />
            <line x1="43" y1="48" x2="53" y2="48" />
            {/* Floating tiny heart */}
            <path
              d="M 32 16 C 31 15, 27 12, 27 9.5 C 27 7.8, 28.5 6.8, 29.8 6.8 C 30.8 6.8, 31.6 7.5, 32 8.2 C 32.4 7.5, 33.2 6.8, 34.2 6.8 C 35.5 6.8, 37 7.8, 37 9.5 C 37 12, 33 15, 32 16 Z"
              fill="#F06292"
              stroke="none"
            />
          </g>
        </svg>
      );
    case 'ceremony_rings':
      // Sparkling engagement ring nestled in a cute velvet box
      return (
        <svg viewBox="0 0 64 58" className="w-14 h-12 select-none">
          <g fill="none" stroke="#6E4C82" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            {/* Open velvet box lid */}
            <path d="M 14 26 L 17 12 Q 32 6 47 12 L 50 26 Z" fill="#F6EEFF" />
            {/* Box base */}
            <rect x="12" y="26" width="40" height="20" rx="5" fill="#F8BBD0" />
            <line x1="12" y1="32" x2="52" y2="32" stroke="#FFFDFC" strokeWidth="1.2" />
            {/* Cute engagement ring peeking out */}
            <circle cx="32" cy="27" r="7" fill="none" stroke="#E4A9B8" strokeWidth="2.2" />
            {/* Sparkly diamond */}
            <polygon points="32,14 27,19 32,23 37,19" fill="#FFFDFC" stroke="#B58CE0" strokeWidth="1.2" />
            {/* Twinkle lines */}
            <line x1="32" y1="7" x2="32" y2="10" stroke="#E887AB" />
            <line x1="23" y1="12" x2="25" y2="14" stroke="#E887AB" />
            <line x1="41" y1="12" x2="39" y2="14" stroke="#E887AB" />
          </g>
        </svg>
      );
    case 'dinner_cloche':
    default:
      // Cute pastel dinner cloche with heart-shaped steam
      return (
        <svg viewBox="0 0 64 58" className="w-14 h-12 select-none">
          <g fill="none" stroke="#6E4C82" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            {/* Cloche dome */}
            <path d="M 12 40 A 20 18 0 0 1 52 40 Z" fill="#FFEAF2" />
            <circle cx="32" cy="19" r="3" fill="#E6D4FF" />
            {/* Platter */}
            <ellipse cx="32" cy="41" rx="24" ry="3.8" fill="#FFFDFC" />
            {/* Cute heart-shaped steam rising */}
            <path
              d="M 32 13 C 31 12, 28 9.5, 28 7.5 C 28 6.2, 29.2 5.4, 30.3 5.4 C 31 5.4, 31.7 6, 32 6.6 C 32.3 6, 33 5.4, 33.7 5.4 C 34.8 5.4, 36 6.2, 36 7.5 C 36 9.5, 33 12, 32 13 Z"
              fill="#E887AB"
              stroke="none"
            />
            <path d="M 22 14 Q 20 10 23 7" stroke="#C5A3E8" strokeWidth="1.1" />
            <path d="M 42 14 Q 44 10 41 7" stroke="#C5A3E8" strokeWidth="1.1" />
          </g>
        </svg>
      );
  }
};

/** Footer: Cute Intertwined Pastel Rose-Gold Engagement Rings with Sparkles */
const CuteWeddingRingsSVG = () => (
  <svg viewBox="0 0 170 100" className="w-36 h-auto mx-auto mb-3 cute-float-slow select-none">
    <defs>
      <linearGradient id="roseGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FAD2DF" />
        <stop offset="50%" stopColor="#E4A9B8" />
        <stop offset="100%" stopColor="#C98AA6" />
      </linearGradient>
    </defs>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left ring */}
      <ellipse cx="66" cy="58" rx="27" ry="19" transform="rotate(-14 66 58)" stroke="url(#roseGoldRing)" strokeWidth="4" />
      <ellipse cx="66" cy="58" rx="22" ry="14.5" transform="rotate(-14 66 58)" stroke="#FFFDFC" strokeWidth="1" strokeOpacity="0.7" />
      {/* Right ring */}
      <ellipse cx="104" cy="56" rx="27" ry="19" transform="rotate(14 104 56)" stroke="url(#roseGoldRing)" strokeWidth="4" />
      <ellipse cx="104" cy="56" rx="22" ry="14.5" transform="rotate(14 104 56)" stroke="#FFFDFC" strokeWidth="1" strokeOpacity="0.7" />
      {/* Sparkling diamond */}
      <g transform="translate(112, 29) rotate(14)">
        <polygon points="-10,0 -5,-8 5,-8 10,0 0,11" fill="#FFFDFC" stroke="#B58CE0" strokeWidth="1.5" />
        <polyline points="-10,0 10,0" stroke="#E6D4FF" strokeWidth="1.1" />
        <polyline points="-5,-8 -2,0 0,11 2,0 5,-8" stroke="#E6D4FF" strokeWidth="1" />
      </g>
      {/* Cute sparkles & tiny heart */}
      <path d="M 114 9 L 116 14 L 121 16 L 116 18 L 114 23 L 112 18 L 107 16 L 112 14 Z" fill="#FFE082" className="cute-twinkle" />
      <path d="M 46 28 L 47.5 31.5 L 51 33 L 47.5 34.5 L 46 38 L 44.5 34.5 L 41 33 L 44.5 31.5 Z" fill="#F8BBD0" className="cute-twinkle" style={{ animationDelay: '500ms' }} />
      <path
        d="M 85 41 C 84 40, 79 36.5, 79 33.5 C 79 31.5, 80.8 30.2, 82.4 30.2 C 83.5 30.2, 84.5 31, 85 31.8 C 85.5 31, 86.5 30.2, 87.6 30.2 C 89.2 30.2, 91 31.5, 91 33.5 C 91 36.5, 86 40, 85 41 Z"
        fill="#F06292"
      />
    </g>
  </svg>
);

// ============================================================================
// CUTE PASTEL LOVE-LETTER ENVELOPE & SCULPTED HEART WAX SEAL COVER
// ============================================================================

/** Cute Sculpted Heart-Shaped Pastel Wax Seal with Molten Edges, Pearl Rim & "H ♡ A" */
const CuteHeartWaxSealSVG = ({ brideInitial, groomInitial }) => (
  <svg
    viewBox="0 0 200 200"
    className="w-[138px] h-[138px] overflow-visible select-none"
    style={{
      filter:
        'drop-shadow(0 14px 22px rgba(176, 98, 146, 0.38)) drop-shadow(0 4px 8px rgba(132, 74, 128, 0.22))',
    }}
  >
    <defs>
      {/* Organic molten heart wax clip path */}
      <clipPath id="cuteHeartWaxClip">
        <path d="M 100 180 C 86 168, 22 126, 16 74 C 12 40, 36 16, 65 18 C 82 19, 93 29, 100 41 C 107 29, 118 19, 135 18 C 164 16, 188 40, 184 74 C 178 126, 114 168, 100 180 Z" />
      </clipPath>

      {/* Glossy rose-pink & lilac outer wax gradient */}
      <radialGradient id="cuteHeartOuterGrad" cx="32%" cy="24%" r="76%">
        <stop offset="0%" stopColor="#FFD6E7" />
        <stop offset="28%" stopColor="#F6A2C4" />
        <stop offset="68%" stopColor="#DE7EA9" />
        <stop offset="100%" stopColor="#B869A4" />
      </radialGradient>

      {/* Soft recessed inner heart basin */}
      <radialGradient id="cuteHeartBasinGrad" cx="62%" cy="65%" r="72%">
        <stop offset="0%" stopColor="#F59CC0" />
        <stop offset="56%" stopColor="#E17BA6" />
        <stop offset="100%" stopColor="#B766A0" />
      </radialGradient>

      {/* Creamy rose-gold embossed text gradient */}
      <linearGradient id="creamyRoseGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFDFC" />
        <stop offset="48%" stopColor="#FFF0F5" />
        <stop offset="100%" stopColor="#FBDCE8" />
      </linearGradient>

      {/* Diagonal shimmer glint */}
      <linearGradient id="cuteSealGlint" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="44%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.58" />
        <stop offset="56%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Organic Wavy Molten Heart Outer Silhouette */}
    <path
      d="M 100 183 C 88 174, 70 160, 52 143 C 32 124, 15 101, 13 73 C 11 42, 32 16, 62 15 C 79 14, 92 25, 100 37 C 108 25, 121 14, 138 15 C 168 16, 189 42, 187 73 C 185 101, 168 124, 148 143 C 130 160, 112 174, 100 183 Z"
      fill="url(#cuteHeartOuterGrad)"
      stroke="#C46B9A"
      strokeWidth="1.2"
    />

    {/* Specular Glossy Highlight Arcs on top lobes */}
    <path
      d="M 32 62 C 33 40, 48 27, 67 27"
      fill="none"
      stroke="#FFFDFC"
      strokeWidth="4"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
    <path
      d="M 132 27 C 148 27, 160 36, 165 49"
      fill="none"
      stroke="#FFFDFC"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeOpacity="0.42"
    />

    {/* Raised Heart Rim */}
    <path
      d="M 100 166 C 86 155, 32 117, 28 73 C 25 46, 44 28, 66 29 C 80 30, 92 39, 100 51 C 108 39, 120 30, 134 29 C 156 28, 175 46, 172 73 C 168 117, 114 155, 100 166 Z"
      fill="url(#cuteHeartBasinGrad)"
      stroke="#FFDCEB"
      strokeWidth="2.2"
      strokeOpacity="0.82"
    />

    {/* Tiny Pearl Dots Around the Heart Rim */}
    <path
      d="M 100 158 C 87 147, 38 113, 35 74 C 33 50, 49 35, 67 36 C 80 37, 92 45, 100 57 C 108 45, 120 37, 133 36 C 151 35, 167 50, 165 74 C 162 113, 113 147, 100 158 Z"
      fill="none"
      stroke="#FFFDFC"
      strokeWidth="2.1"
      strokeDasharray="1.5 6.8"
      strokeLinecap="round"
      strokeOpacity="0.92"
    />

    {/* Embossed "H ♡ A" Monogram in Creamy Rose-Gold */}
    <g>
      {/* Soft debossed shadow */}
      <text
        x="73"
        y="99"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-cute-serif"
        fontSize="30"
        fontWeight="600"
        fill="#9E4A7C"
        fillOpacity="0.45"
      >
        {brideInitial}
      </text>
      <text
        x="127"
        y="99"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-cute-serif"
        fontSize="30"
        fontWeight="600"
        fill="#9E4A7C"
        fillOpacity="0.45"
      >
        {groomInitial}
      </text>

      {/* Main creamy embossed letters */}
      <text
        x="72"
        y="97.5"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-cute-serif"
        fontSize="30"
        fontWeight="600"
        fill="url(#creamyRoseGold)"
      >
        {brideInitial}
      </text>
      <text
        x="126"
        y="97.5"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-cute-serif"
        fontSize="30"
        fontWeight="600"
        fill="url(#creamyRoseGold)"
      >
        {groomInitial}
      </text>

      {/* Cute embossed mini heart in center */}
      <path
        d="M 100 107 C 98.5 105.5, 90 99, 90 93.5 C 90 90, 92.8 87.8, 95.5 87.8 C 97.4 87.8, 99 89, 100 90.6 C 101 89, 102.6 87.8, 104.5 87.8 C 107.2 87.8, 110 90, 110 93.5 C 110 99, 101.5 105.5, 100 107 Z"
        fill="url(#creamyRoseGold)"
      />
    </g>

    {/* Idle Diagonal Shimmer Glint */}
    <g clipPath="url(#cuteHeartWaxClip)" className="pointer-events-none">
      <rect
        x="-140"
        y="-40"
        width="150"
        height="280"
        fill="url(#cuteSealGlint)"
        className="cute-seal-glint-sweep"
      />
    </g>
  </svg>
);

/** Cute Pastel Satin Ribbon Bow Behind the Heart Seal */
const CuteSatinBowSVG = () => (
  <svg viewBox="0 0 220 120" className="w-[210px] h-[112px] pointer-events-none select-none overflow-visible">
    <defs>
      <linearGradient id="satinBowLoop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE0EC" />
        <stop offset="50%" stopColor="#F8BBD0" />
        <stop offset="100%" stopColor="#E496B8" />
      </linearGradient>
    </defs>
    {/* Left & right flowing ribbon tails */}
    <path d="M 96 66 C 84 86, 72 102, 54 114 L 68 112 L 72 120 C 86 106, 98 88, 106 70 Z" fill="url(#satinBowLoop)" stroke="#FFFDFC" strokeWidth="1.2" />
    <path d="M 124 66 C 136 86, 148 102, 166 114 L 152 112 L 148 120 C 134 106, 122 88, 114 70 Z" fill="url(#satinBowLoop)" stroke="#FFFDFC" strokeWidth="1.2" />

    {/* Left puffy satin bow loop */}
    <path
      d="M 104 60 C 76 34, 34 32, 32 58 C 30 82, 74 84, 104 64 Z"
      fill="url(#satinBowLoop)"
      stroke="#FFFDFC"
      strokeWidth="1.5"
    />
    <path d="M 94 61 C 74 48, 52 50, 48 60" fill="none" stroke="#FFFDFC" strokeWidth="1.4" strokeOpacity="0.65" strokeLinecap="round" />

    {/* Right puffy satin bow loop */}
    <path
      d="M 116 60 C 144 34, 186 32, 188 58 C 190 82, 146 84, 116 64 Z"
      fill="url(#satinBowLoop)"
      stroke="#FFFDFC"
      strokeWidth="1.5"
    />
    <path d="M 126 61 C 146 48, 168 50, 172 60" fill="none" stroke="#FFFDFC" strokeWidth="1.4" strokeOpacity="0.65" strokeLinecap="round" />
  </svg>
);

/** Interactive Cute Pastel Love-Letter Envelope Cover Overlay */
const CuteEnvelopeCoverOverlay = ({ stage, onTriggerOpen, couple, dateSpaced }) => {
  const isUnsealing = stage >= 1;
  const isFlapOpening = stage >= 2;
  const isSlidingAway = stage >= 3;
  const isHidden = stage >= 4;

  // Burst of floating hearts, flowers & sparkles on tap
  const celebrationBurst = [
    { id: 1, dx: '-125px', dy: '-145px', rot: '-25deg', delay: '0ms', variant: 2, size: 28 },
    { id: 2, dx: '120px', dy: '-140px', rot: '28deg', delay: '40ms', variant: 0, size: 32 },
    { id: 3, dx: '-150px', dy: '-45px', rot: '-35deg', delay: '80ms', variant: 1, size: 30 },
    { id: 4, dx: '148px', dy: '-40px', rot: '32deg', delay: '60ms', variant: 2, size: 26 },
    { id: 5, dx: '-90px', dy: '-185px', rot: '-14deg', delay: '100ms', variant: 0, size: 28 },
    { id: 6, dx: '95px', dy: '-180px', rot: '18deg', delay: '90ms', variant: 1, size: 28 },
    { id: 7, dx: '0px', dy: '-205px', rot: '6deg', delay: '30ms', variant: 2, size: 34 },
    { id: 8, dx: '-115px', dy: '70px', rot: '-20deg', delay: '110ms', variant: 3, size: 30 },
    { id: 9, dx: '118px', dy: '75px', rot: '22deg', delay: '120ms', variant: 2, size: 26 },
    { id: 10, dx: '-45px', dy: '-135px', rot: '-10deg', delay: '70ms', variant: 2, size: 22 },
    { id: 11, dx: '48px', dy: '-130px', rot: '14deg', delay: '130ms', variant: 0, size: 24 },
  ];

  return (
    <div
      className={`cute-envelope-overlay ${isSlidingAway ? 'is-sliding-away' : ''}`}
      style={{
        pointerEvents: stage === 0 ? 'auto' : 'none',
        visibility: isHidden ? 'hidden' : 'visible',
      }}
    >
      {/* Soft pastel paper backdrop with delicate scalloped lace border */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF3FF] via-[#FFF6FA] to-[#F5ECFF]">
        {/* Subtle polka-heart paper texture */}
        <svg className="absolute inset-0 w-full h-full opacity-55 pointer-events-none" viewBox="0 0 430 844" preserveAspectRatio="none">
          <defs>
            <pattern id="cuteEnvelopeDots" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="1.4" fill="#E887AB" fillOpacity="0.24" />
              <circle cx="26" cy="24" r="1.4" fill="#B58CE0" fillOpacity="0.24" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="430" height="844" fill="url(#cuteEnvelopeDots)" />
        </svg>

        {/* Delicate Scalloped Lace Inner Border */}
        <div className="absolute inset-3.5 sm:inset-4 rounded-[28px] border-2 border-dashed border-[#E8B4CC]/75 pointer-events-none" />
        <div className="absolute inset-5 sm:inset-5.5 rounded-[22px] border border-[#E6D4FF]/80 pointer-events-none" />

        {/* Cute Corner Hearts & Stars */}
        <div className="absolute top-6 left-6 text-[#E887AB]/70 cute-twinkle pointer-events-none text-sm">✦</div>
        <div className="absolute top-6 right-6 text-[#B58CE0]/70 cute-twinkle pointer-events-none text-sm" style={{ animationDelay: '500ms' }}>♡</div>
        <div className="absolute bottom-6 left-6 text-[#B58CE0]/70 cute-twinkle pointer-events-none text-sm" style={{ animationDelay: '300ms' }}>♡</div>
        <div className="absolute bottom-6 right-6 text-[#E887AB]/70 cute-twinkle pointer-events-none text-sm" style={{ animationDelay: '700ms' }}>✦</div>
      </div>

      {/* 3D Top Triangular Envelope V-Flap */}
      <div className="cute-flap-perspective">
        <div className={`cute-envelope-flap ${isFlapOpening ? 'is-open' : ''}`}>
          {/* Front of V-Flap */}
          <div className="cute-flap-face cute-flap-front">
            <svg viewBox="0 0 430 430" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="flapFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9FC" />
                  <stop offset="55%" stopColor="#FCEEF7" />
                  <stop offset="100%" stopColor="#F5E1F2" />
                </linearGradient>
              </defs>
              {/* Triangular V-Flap with soft rounded tip */}
              <path
                d="M 0 0 L 430 0 L 430 160 Q 430 175 415 188 L 236 392 Q 215 414 194 392 L 15 188 Q 0 175 0 160 Z"
                fill="url(#flapFrontGrad)"
                stroke="#EAB4CE"
                strokeWidth="1.8"
              />
              {/* Dainty stitched inner V-line */}
              <path
                d="M 16 14 L 414 14 L 414 156 L 230 374 Q 215 391 200 374 L 16 156 Z"
                fill="none"
                stroke="#D9A0B6"
                strokeWidth="1.2"
                strokeDasharray="4 5"
                strokeOpacity="0.65"
              />
            </svg>
          </div>
          {/* Inside Liner of V-Flap (visible as it unfolds upward) */}
          <div className="cute-flap-face cute-flap-back">
            <svg viewBox="0 0 430 430" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="flapLinerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F6EEFF" />
                  <stop offset="50%" stopColor="#FFEAF2" />
                  <stop offset="100%" stopColor="#F0E2FF" />
                </linearGradient>
              </defs>
              <path
                d="M 0 0 L 430 0 L 430 160 Q 430 175 415 188 L 236 392 Q 215 414 194 392 L 15 188 Q 0 175 0 160 Z"
                fill="url(#flapLinerGrad)"
                stroke="#E6D4FF"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Envelope Pocket Bottom Fold Accent Lines */}
      <svg
        viewBox="0 0 430 460"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 right-0 w-full h-[54%] pointer-events-none z-10"
      >
        <path
          d="M 0 60 L 215 210 L 430 60 L 430 460 L 0 460 Z"
          fill="#FFFDFC"
          fillOpacity="0.58"
        />
        <path
          d="M 0 60 L 215 210 L 430 60"
          fill="none"
          stroke="#E8B4CC"
          strokeWidth="1.4"
          strokeOpacity="0.55"
        />
      </svg>

      {/* Celebration Burst of Pastel Hearts & Flowers on Tap */}
      {isUnsealing && !isHidden && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          {celebrationBurst.map((item) => (
            <div
              key={item.id}
              className="cute-burst-particle"
              style={{
                '--dx': item.dx,
                '--dy': item.dy,
                '--rot': item.rot,
                animationDelay: item.delay,
              }}
            >
              <PastelFlowerSVG variant={item.variant} size={item.size} />
            </div>
          ))}
        </div>
      )}

      {/* 3-Zone Non-Overlapping Vertical Layout Over the Envelope */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between pointer-events-none">
        {/* TOP ZONE: Floating Heart Doodle, "You're Invited!" & Couple Names */}
        <div
          className={`flex-1 flex flex-col items-center justify-end pb-6 pt-10 px-8 text-center transition-all duration-600 ease-out ${
            isUnsealing ? 'opacity-0 -translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {/* Cute little floating heart & sparkle doodle */}
          <div className="flex items-center justify-center gap-2 mb-1.5 text-[#E887AB]">
            <span className="text-xs cute-twinkle">✦</span>
            <Heart className="w-4 h-4 fill-[#F8BBD0] text-[#E887AB] cute-float-slow" />
            <span className="text-xs cute-twinkle" style={{ animationDelay: '400ms' }}>✦</span>
          </div>

          <p className="font-cute-script text-[32px] sm:text-[36px] leading-none text-[#D66E98] mb-2">
            You&apos;re Invited!
          </p>

          <h1 className="font-cute-serif text-[30px] sm:text-[34px] font-semibold tracking-[0.02em] text-[#4A3259] leading-tight">
            {couple.bride}{' '}
            <span className="font-cute-script text-[32px] sm:text-[36px] text-[#E887AB] mx-1 font-normal">
              &amp;
            </span>{' '}
            {couple.groom}
          </h1>
        </div>

        {/* MIDDLE ZONE: Pastel Satin Ribbon, Bow & Sculpted Heart Wax Seal */}
        <div className="relative h-[190px] shrink-0 w-full flex items-center justify-center">
          {/* Pastel Satin Horizontal Ribbon Halves */}
          <div className={`cute-ribbon-half cute-ribbon-left ${isUnsealing ? 'is-untied' : ''}`} />
          <div className={`cute-ribbon-half cute-ribbon-right ${isUnsealing ? 'is-untied' : ''}`} />

          {/* Satin Ribbon Bow behind the seal */}
          <div
            className={`absolute flex items-center justify-center z-10 transition-all duration-600 ease-out ${
              isUnsealing ? 'opacity-0 scale-110 translate-y-2' : 'opacity-95 scale-100'
            }`}
          >
            <CuteSatinBowSVG />
          </div>

          {/* Interactive Heart-Shaped Pastel Wax Seal Button */}
          <div className="relative flex items-center justify-center z-20 pointer-events-auto">
            {stage === 0 && <span className="cute-heart-pulse-ring" />}
            {isUnsealing && <span className="cute-seal-pop-glow" />}

            <button
              type="button"
              onClick={onTriggerOpen}
              aria-label="Tap the Heart Wax Seal to Open Invitation"
              className={`cute-heart-seal-btn ${isUnsealing ? 'is-unsealing' : ''}`}
            >
              <CuteHeartWaxSealSVG
                brideInitial={couple.brideInitial}
                groomInitial={couple.groomInitial}
              />
            </button>
          </div>
        </div>

        {/* BOTTOM ZONE: Date, Location & Cute Open Pill Button */}
        <div
          className={`flex-1 flex flex-col items-center justify-start pt-5 pb-10 px-8 text-center transition-all duration-600 ease-out ${
            isUnsealing ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <p className="font-cute-serif text-xl sm:text-[22px] font-medium tracking-[0.22em] text-[#4A3259] mb-1">
            {dateSpaced}
          </p>

          <p className="font-cute-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-[#8A6D9C] mb-6">
            Madurai · India
          </p>

          <button
            type="button"
            onClick={onTriggerOpen}
            className="cute-open-pill pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F48FB1] via-[#E887AB] to-[#C996E8] text-white font-cute-sans font-semibold text-[11px] tracking-[0.14em] uppercase shadow-[0_10px_24px_rgba(232,135,171,0.4)] hover:scale-[1.04] active:scale-[0.97] transition-transform duration-300 cursor-pointer"
          >
            <span>Tap the Heart to Open</span>
            <span aria-hidden="true">✨</span>
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

  // Cute Love-Letter Opening Choreography
  const handleTriggerOpen = () => {
    if (introStage !== 0) return;
    clearChoreographyTimers();

    // Stage 1: Heart seal pops, ribbon unties, pastel hearts & flowers burst
    setIntroStage(1);
    audioEngine.playSealChime();
    audioEngine.startAmbient();
    setIsAudioOn(true);

    // Stage 2: Envelope V-flap smoothly unfolds upward in 3D
    timeoutsRef.current.push(
      setTimeout(() => {
        setIntroStage(2);
      }, 480)
    );

    // Stage 3: Envelope slides gently down & fades, revealing the invitation hero
    timeoutsRef.current.push(
      setTimeout(() => {
        setIntroStage(3);
        setHeroRevealed(true);
      }, 1220)
    );

    // Stage 4: Unlock scrolling & hide overlay
    timeoutsRef.current.push(
      setTimeout(() => {
        setIntroStage(4);
      }, 2150)
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
    showToast(playing ? 'Sweet music box chimes on ♪' : 'Audio muted');
  };

  const isCoverLocked = introStage < 4;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-x-hidden bg-pastel-dream text-[#4A3259] selection:bg-[#F8BBD0] selection:text-[#4A3259]">
      {/* Cute Romantic Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Quicksand:wght@400;500;600;700&family=Sacramento&display=swap"
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
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        /* Hide all scrollbars globally across Chrome, Safari, Firefox, Edge & mobile browsers */
        *, html, body, #root, #invitation-scroll-container {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }

        *::-webkit-scrollbar,
        html::-webkit-scrollbar,
        body::-webkit-scrollbar,
        #root::-webkit-scrollbar,
        #invitation-scroll-container::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }

        #invitation-scroll-container {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .font-cute-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-cute-script {
          font-family: 'Sacramento', cursive;
        }
        .font-cute-sans {
          font-family: 'Quicksand', sans-serif;
        }

        /* Dreamy Pastel Desktop Background */
        .bg-pastel-dream {
          background-color: #F6EEFF;
          background-image:
            radial-gradient(circle at 15% 20%, rgba(255, 214, 231, 0.72) 0%, transparent 45%),
            radial-gradient(circle at 85% 18%, rgba(230, 212, 255, 0.85) 0%, transparent 48%),
            radial-gradient(circle at 50% 85%, rgba(255, 234, 242, 0.8) 0%, transparent 55%),
            linear-gradient(135deg, #F6EEFF 0%, #FFEAF2 50%, #EFE4FF 100%);
        }

        /* Marshmallow Cream Invitation Paper */
        .bg-marshmallow-card {
          background-color: #FFFDFC;
          background-image:
            radial-gradient(at 50% 0%, rgba(255, 240, 246, 0.75) 0px, transparent 58%),
            radial-gradient(at 10% 45%, rgba(246, 238, 255, 0.65) 0px, transparent 52%),
            radial-gradient(at 92% 80%, rgba(255, 234, 242, 0.58) 0px, transparent 56%);
        }

        /* Dreamy Pastel Lavender-Plum Gradient for Countdown Section */
        .bg-pastel-lavender-dream {
          background: linear-gradient(155deg, #E8D5FF 0%, #F7D4E8 52%, #DFC6FA 100%);
        }

        /* Floating Desktop Bokeh Orbs */
        .pastel-bokeh-orb {
          position: fixed;
          border-radius: 9999px;
          filter: blur(28px);
          pointer-events: none;
          z-index: 0;
          animation: bokehFloat 9s ease-in-out infinite;
        }
        @keyframes bokehFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.06); }
        }

        /* Cute Love-Letter Envelope Overlay */
        .cute-envelope-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100dvh;
          max-height: 100%;
          z-index: 45;
          overflow: hidden;
          transition:
            transform 950ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 850ms ease;
        }
        .cute-envelope-overlay.is-sliding-away {
          transform: translateY(110px) scale(0.96);
          opacity: 0;
        }

        @media (min-width: 640px) {
          .phone-frame-active .cute-envelope-overlay {
            height: 100%;
            border-radius: 36px;
          }
        }

        /* 3D Envelope Top V-Flap */
        .cute-flap-perspective {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 52%;
          perspective: 1400px;
          z-index: 20;
          pointer-events: none;
        }
        .cute-envelope-flap {
          position: relative;
          width: 100%;
          height: 100%;
          transform-origin: top center;
          transform-style: preserve-3d;
          transition: transform 950ms cubic-bezier(0.22, 1, 0.36, 1);
          filter: drop-shadow(0 12px 18px rgba(176, 118, 158, 0.18));
        }
        .cute-envelope-flap.is-open {
          transform: rotateX(174deg);
        }
        .cute-flap-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .cute-flap-back {
          transform: rotateX(180deg);
        }

        /* Pastel Satin Ribbon Halves */
        .cute-ribbon-half {
          position: absolute;
          top: 50%;
          height: 28px;
          width: 52%;
          margin-top: -14px;
          z-index: 5;
          background: linear-gradient(180deg, #FBD3E4 0%, #F4A7C7 45%, #E887AB 100%);
          border-top: 1.5px solid rgba(255, 255, 255, 0.8);
          border-bottom: 1.5px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 6px 14px rgba(196, 112, 152, 0.22);
          transition: transform 680ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms ease;
          pointer-events: none;
        }
        .cute-ribbon-left { left: 0; }
        .cute-ribbon-right { right: 0; }
        .cute-ribbon-left.is-untied {
          transform: translateX(-105%) scaleY(0.9);
          opacity: 0;
        }
        .cute-ribbon-right.is-untied {
          transform: translateX(105%) scaleY(0.9);
          opacity: 0;
        }

        /* Heart Wax Seal Button */
        .cute-heart-seal-btn {
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
          animation: gentleHeartbeat 2.4s ease-in-out infinite;
          transition:
            transform 560ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 460ms ease 100ms,
            filter 400ms ease;
        }
        .cute-heart-seal-btn:hover {
          transform: scale(1.07);
          filter: brightness(1.05);
        }
        .cute-heart-seal-btn:active {
          transform: scale(0.94);
        }
        .cute-heart-seal-btn.is-unsealing {
          animation: none;
          transform: scale(1.22) translateY(-28px) rotate(-6deg);
          opacity: 0;
          filter: brightness(1.18);
        }

        @keyframes gentleHeartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.045); }
          28% { transform: scale(1); }
          42% { transform: scale(1.03); }
          60% { transform: scale(1); }
        }

        .cute-heartbeat {
          animation: gentleHeartbeat 2.2s ease-in-out infinite;
        }

        .cute-heart-pulse-ring {
          position: absolute;
          width: 146px;
          height: 146px;
          border-radius: 9999px;
          border: 2px solid rgba(244, 143, 177, 0.45);
          box-shadow: 0 0 26px rgba(248, 187, 208, 0.55);
          animation: cutePulseAura 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          pointer-events: none;
        }
        @keyframes cutePulseAura {
          0% { transform: scale(0.9); opacity: 0.78; }
          100% { transform: scale(1.36); opacity: 0; }
        }

        .cute-seal-pop-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 209, 227, 0.72) 42%,
            rgba(214, 180, 248, 0.4) 70%,
            transparent 85%
          );
          animation: cutePopGlow 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }
        @keyframes cutePopGlow {
          0% { transform: scale(0.55); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .cute-seal-glint-sweep {
          animation: cuteGlintSweep 4.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes cuteGlintSweep {
          0%, 56% { transform: translateX(-60px) rotate(14deg); opacity: 0; }
          66% { opacity: 1; }
          85% { transform: translateX(300px) rotate(14deg); opacity: 0.95; }
          100% { transform: translateX(320px) rotate(14deg); opacity: 0; }
        }

        .cute-burst-particle {
          position: absolute;
          opacity: 0;
          animation: cuteBurstFloat 1600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes cuteBurstFloat {
          0% { opacity: 0; transform: translate3d(0, 0, 0) scale(0.2) rotate(0deg); }
          25% { opacity: 1; transform: translate3d(calc(var(--dx) * 0.55), calc(var(--dy) * 0.55), 0) scale(1.1) rotate(var(--rot)); }
          100% { opacity: 0; transform: translate3d(var(--dx), var(--dy), 0) scale(0.75) rotate(calc(var(--rot) + 18deg)); }
        }

        .cute-open-pill {
          position: relative;
          overflow: hidden;
        }
        .cute-open-pill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -120%;
          width: 65%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
          animation: pillShimmer 3.4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes pillShimmer {
          0%, 60% { left: -120%; }
          100% { left: 165%; }
        }

        /* Hero Reveal Stagger */
        .cute-hero-item {
          opacity: 0;
          transform: translateY(18px) scale(0.97);
          filter: blur(4px);
          transition:
            opacity 850ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 850ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 850ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cute-hero-item.is-revealed {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        /* Scratch Card Blooming Pastel Flowers */
        .pastel-flower-particle {
          position: absolute;
          opacity: 0;
          animation: pastelFlowerBloom 2500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pastelFlowerBloom {
          0% { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.15) rotate(0deg); }
          26% { opacity: 1; transform: translate3d(var(--tx), var(--ty), 0) scale(var(--sc)) rotate(var(--rot)); }
          75% { opacity: 0.95; transform: translate3d(var(--tx), calc(var(--ty) - 10px), 0) scale(var(--sc)) rotate(calc(var(--rot) + 12deg)); }
          100% { opacity: 0; transform: translate3d(var(--tx), calc(var(--ty) - 22px), 0) scale(calc(var(--sc) * 0.85)) rotate(calc(var(--rot) + 20deg)); }
        }

        .corner-flower-pop {
          opacity: 0;
          animation: cornerFlowerIn 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes cornerFlowerIn {
          0% { opacity: 0; transform: scale(0.2) rotate(-30deg); }
          100% { opacity: 0.94; transform: scale(1) rotate(0deg); }
        }

        .date-number-rise {
          animation: dateNumberRise 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes dateNumberRise {
          0% { opacity: 0; transform: translateY(16px) scale(0.94); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }

        .countdown-digit-pop {
          animation: countdownDigitPop 850ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes countdownDigitPop {
          0% { opacity: 0; transform: translateY(18px) scale(0.75); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Scroll Reveal */
        .cute-reveal {
          opacity: 0;
          will-change: transform, opacity, filter;
          transition:
            opacity 950ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 950ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 950ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cute-reveal-fade-up {
          transform: translateY(28px);
          filter: blur(3px);
        }
        .cute-reveal-scale {
          transform: translateY(18px) scale(0.95);
          filter: blur(3px);
        }
        .cute-reveal.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        .cute-float-slow {
          animation: cuteFloatSlow 5s ease-in-out infinite;
        }
        @keyframes cuteFloatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .cute-twinkle {
          animation: cuteTwinkle 2.6s ease-in-out infinite;
        }
        @keyframes cuteTwinkle {
          0%, 100% { opacity: 0.45; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.14); }
        }

        .cute-bounce-heart {
          animation: cuteBounceHeart 2s ease-in-out infinite;
        }
        @keyframes cuteBounceHeart {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(5px); }
        }
      `}</style>

      {/* Soft Dreamy Floating Pastel Bokeh Background Orbs (Desktop) */}
      <div className="pastel-bokeh-orb w-72 h-72 bg-[#F8BBD0]/40 top-8 -left-16 hidden sm:block" />
      <div
        className="pastel-bokeh-orb w-80 h-80 bg-[#E6D4FF]/50 bottom-10 -right-16 hidden sm:block"
        style={{ animationDelay: '3s' }}
      />
      <div
        className="pastel-bokeh-orb w-56 h-56 bg-[#FFE0B2]/30 top-1/2 left-12 hidden md:block"
        style={{ animationDelay: '1.5s' }}
      />

      {/* Cute Pastel Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-white/95 text-[#4A3259] border border-[#F8BBD0] shadow-[0_10px_28px_rgba(148,96,158,0.22)] text-xs font-cute-sans font-semibold tracking-wide flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E887AB]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cute Floating Pastel Audio Mute/Unmute Toggle */}
      {introStage >= 3 && (
        <button
          type="button"
          onClick={handleToggleAudio}
          aria-label={isAudioOn ? 'Mute invitation audio' : 'Unmute invitation audio'}
          className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#F8BBD0] text-[#D66E98] flex items-center justify-center shadow-[0_8px_22px_rgba(180,104,154,0.25)] hover:bg-[#FFEAF2] hover:scale-105 transition cursor-pointer"
        >
          {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
        </button>
      )}

      {/* Main Rounded Mobile Invitation Card Viewport */}
      <div
        id="invitation-scroll-container"
        className={`phone-frame-active relative z-10 w-full mx-auto bg-marshmallow-card overflow-x-hidden sm:max-w-[430px] sm:my-10 sm:rounded-[40px] sm:shadow-[0_24px_75px_rgba(146,102,172,0.24)] sm:border-2 sm:border-white/90 ${
          isCoverLocked ? 'h-[100dvh] sm:h-[844px] overflow-y-hidden' : 'min-h-[100dvh] overflow-y-visible'
        }`}
      >
        {/* CUTE PASTEL LOVE-LETTER ENVELOPE & HEART WAX SEAL COVER */}
        <CuteEnvelopeCoverOverlay
          stage={introStage}
          onTriggerOpen={handleTriggerOpen}
          couple={WEDDING_CONFIG.couple}
          dateSpaced={WEDDING_CONFIG.date.displaySpaced}
        />

        {/* ==================================================================
            SECTION 1: CUTE PASTEL HERO WITH SCALLOPED ARCH & FAIRY LIGHTS
        ================================================================== */}
        <section className="relative min-h-[100dvh] sm:min-h-[828px] flex flex-col items-center justify-between px-7 py-10 sm:py-12 overflow-hidden">
          <CuteHeroArchFrameSVG />

          {/* Hanging Fairy Lights & Floral Cluster */}
          <div
            style={{ transitionDelay: '80ms' }}
            className={`cute-hero-item ${heroRevealed ? 'is-revealed' : ''} relative z-10 w-full pt-1`}
          >
            <CuteFairyLightsHeaderSVG />
          </div>

          {/* Center Couple & Date Lockup */}
          <div className="relative z-10 w-full max-w-[310px] mx-auto flex flex-col items-center justify-center text-center my-auto py-2">
            {/* Soft Tagline Pill */}
            <div
              style={{ transitionDelay: '180ms' }}
              className={`cute-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6EEFF]/80 border border-[#E6D4FF] mb-5`}
            >
              <span className="text-[10px] text-[#E887AB]">✦</span>
              <p className="font-cute-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-[#7C608C]">
                {WEDDING_CONFIG.couple.tagline}
              </p>
              <span className="text-[10px] text-[#E887AB]">✦</span>
            </div>

            {/* Couple Names Lockup with Tiny Rose-Gold Heart Divider */}
            <div
              style={{ transitionDelay: '300ms' }}
              className={`cute-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } w-full flex flex-col items-center justify-center mb-4`}
            >
              <h1 className="w-full flex flex-col items-center font-cute-serif font-semibold text-[#4A3259]">
                <span className="block text-[46px] sm:text-[54px] leading-[1.06] tracking-[0.02em] text-[#4A3259]">
                  {WEDDING_CONFIG.couple.bride}
                </span>

                <span className="my-2 flex items-center justify-center gap-3">
                  <span className="w-10 h-[1.5px] rounded-full bg-gradient-to-r from-transparent to-[#E4A9B8]" />
                  <Heart className="w-5 h-5 fill-[#F8BBD0] text-[#E887AB] cute-heartbeat" />
                  <span className="w-10 h-[1.5px] rounded-full bg-gradient-to-l from-transparent to-[#E4A9B8]" />
                </span>

                <span className="block text-[46px] sm:text-[54px] leading-[1.06] tracking-[0.02em] text-[#4A3259]">
                  {WEDDING_CONFIG.couple.groom}
                </span>
              </h1>
            </div>

            {/* Sweet Subtitle */}
            <p
              style={{ transitionDelay: '420ms' }}
              className={`cute-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } font-cute-serif italic text-[15px] sm:text-[16px] leading-relaxed text-[#7C608C] max-w-[260px] mb-6`}
            >
              Joyfully invite you to celebrate their engagement
            </p>

            {/* Cute Rounded Pastel Calendar Badge */}
            <div
              style={{ transitionDelay: '540ms' }}
              className={`cute-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } w-full max-w-[295px] rounded-[24px] bg-gradient-to-r from-[#FFF0F6] via-[#FFFDFC] to-[#F4EBFF] border border-[#F8BBD0]/85 px-4 py-3.5 shadow-[0_8px_22px_rgba(214,158,198,0.18)] mb-6`}
            >
              <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                <div className="pr-2.5 text-center">
                  <span className="font-cute-sans text-[10px] font-bold tracking-[0.16em] uppercase text-[#7C608C]">
                    Thursday
                  </span>
                </div>

                <div className="px-4 border-x border-[#F8BBD0]/75 flex flex-col items-center justify-center">
                  <span className="font-cute-sans text-[9px] font-bold tracking-[0.22em] uppercase text-[#D66E98]">
                    December
                  </span>
                  <span className="font-cute-serif font-bold text-[34px] sm:text-[38px] leading-none text-[#4A3259] my-0.5">
                    10
                  </span>
                  <span className="font-cute-sans text-[10px] font-bold tracking-[0.2em] text-[#7C608C]">
                    2026
                  </span>
                </div>

                <div className="pl-2.5 text-center">
                  <span className="font-cute-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#7C608C]">
                    6:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Venue Lockup */}
            <div
              style={{ transitionDelay: '660ms' }}
              className={`cute-hero-item ${heroRevealed ? 'is-revealed' : ''}`}
            >
              <p className="font-cute-serif text-[23px] font-semibold tracking-[0.03em] text-[#4A3259]">
                {WEDDING_CONFIG.venue.name}
              </p>
              <p className="font-cute-sans text-[10px] font-semibold tracking-[0.26em] uppercase text-[#D66E98] mt-0.5">
                Madurai · India
              </p>
            </div>
          </div>

          {/* Gentle Bouncing Heart Scroll Cue */}
          <div
            style={{ transitionDelay: '780ms' }}
            className={`cute-hero-item ${
              heroRevealed ? 'is-revealed' : ''
            } relative z-10 flex flex-col items-center gap-1 pt-2`}
          >
            <span className="font-cute-sans text-[9px] font-semibold tracking-[0.24em] uppercase text-[#9A7CAE]">
              Scroll Down
            </span>
            <Heart className="w-4 h-4 fill-[#F8BBD0] text-[#E887AB] cute-bounce-heart" />
          </div>
        </section>

        {/* ==================================================================
            SECTION 2: INVITATION STATEMENT & CUTE KISSING LOVEBIRDS
        ================================================================== */}
        <section className="relative px-8 pt-6 pb-14 text-center">
          <RevealOnScroll variant="scale">
            <CuteLovebirdsIllustration />
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <h2 className="font-cute-serif text-2xl sm:text-[28px] font-semibold text-[#4A3259] mt-3 mb-4 leading-snug">
              Together with their
              <br />
              <span className="font-cute-script text-4xl font-normal text-[#D66E98]">families</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={220}>
            <div className="rounded-[24px] bg-[#FFF8FB] border border-[#F8BBD0]/65 px-5 py-5 shadow-sm max-w-xs mx-auto">
              <p className="font-cute-sans text-[13px] leading-relaxed text-[#6E5280] font-medium">
                {WEDDING_CONFIG.couple.invitationText}
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ==================================================================
            SECTION 3: CUTE SCRATCH-TO-REVEAL DATE & LIVE COUNTDOWN
        ================================================================== */}
        <section className="relative bg-pastel-lavender-dream text-[#4A3259]">
          <CuteScallopCloudDivider position="top" />

          <div className="px-5 py-10 text-center overflow-hidden">
            <RevealOnScroll variant="scale">
              <p className="font-cute-script text-3xl text-[#B95D88] leading-none mb-1">
                Counting the days
              </p>
              <h2 className="font-cute-serif text-3xl sm:text-[34px] font-semibold tracking-wide mb-2 text-[#4A3259]">
                Countdown
              </h2>
              <p className="font-cute-sans text-[11px] font-semibold tracking-[0.16em] uppercase text-[#7C608C] mb-6">
                Scratch the Pastel Foil to Reveal Our Date ✨
              </p>

              <ScratchToRevealCountdown
                timeLeft={timeLeft}
                dateConfig={WEDDING_CONFIG.date}
                coupleConfig={WEDDING_CONFIG.couple}
              />
            </RevealOnScroll>
          </div>

          <CuteScallopCloudDivider position="bottom" flip />
        </section>

        {/* ==================================================================
            SECTION 4: LOCATION — MAHAL, MADURAI, INDIA
        ================================================================== */}
        <section className="px-8 py-14 text-center">
          <RevealOnScroll>
            <p className="font-cute-sans text-[10px] font-bold tracking-[0.24em] uppercase text-[#B58CE0] mb-1">
              ♡ Where We Celebrate ♡
            </p>
            <h2 className="font-cute-serif text-3xl sm:text-4xl font-semibold text-[#4A3259] mb-1">
              Location
            </h2>
            <p className="font-cute-script text-5xl text-[#D66E98] my-1 leading-tight">
              {WEDDING_CONFIG.venue.name}
            </p>
            <p className="font-cute-sans text-[11px] font-bold tracking-[0.22em] uppercase text-[#7C608C] mb-5">
              {WEDDING_CONFIG.venue.cityCountry}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <p className="font-cute-sans text-[13px] leading-relaxed text-[#6E5280] max-w-xs mx-auto mb-3 font-medium">
              {WEDDING_CONFIG.venue.description1}
            </p>
            <p className="font-cute-sans text-[13px] leading-relaxed text-[#6E5280] max-w-xs mx-auto font-medium">
              {WEDDING_CONFIG.venue.description2}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={220} variant="scale">
            <CuteVenueArchIllustration />
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <a
                href={WEDDING_CONFIG.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#F48FB1] to-[#C996E8] text-white font-cute-sans font-semibold text-[11px] tracking-[0.18em] uppercase shadow-[0_10px_24px_rgba(201,150,232,0.38)] hover:scale-[1.03] transition cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>Open Google Maps</span>
              </a>
            </div>
          </RevealOnScroll>
        </section>

        {/* ==================================================================
            SECTION 5: THE DAY — DECEMBER 10, 2026 (3-EVENT TIMELINE)
        ================================================================== */}
        <section className="pt-2 pb-10 text-center bg-gradient-to-b from-transparent via-[#FAF3FF]/75 to-transparent">
          <RevealOnScroll>
            <CuteBuntingGarlandSVG />

            <div className="px-6">
              <h2 className="font-cute-serif text-3xl sm:text-4xl font-semibold text-[#4A3259] mb-1">
                The Day
              </h2>
              <p className="font-cute-sans text-[11px] font-bold tracking-[0.22em] uppercase text-[#D66E98] mb-2">
                {WEDDING_CONFIG.date.displayFull}
              </p>
              <p className="font-cute-sans text-xs text-[#7C608C] font-medium mb-9">
                An evening of love, rings, and sweet celebration ♡
              </p>
            </div>
          </RevealOnScroll>

          <div className="px-5">
            <div className="relative max-w-[340px] mx-auto text-left">
              {/* Cute Vertical Dotted Pastel Line */}
              <div
                className="absolute left-[43%] top-4 bottom-4 w-0 border-l-2 border-dotted border-[#E4A9B8]"
              />

              {WEDDING_CONFIG.timeline.map((item, idx) => (
                <RevealOnScroll key={idx} delay={idx * 140}>
                  <div className="relative grid grid-cols-12 items-center mb-8 last:mb-0">
                    {/* Left: Cute Icon & Time */}
                    <div className="col-span-5 flex flex-col items-end pr-4 text-right">
                      <div className="mb-1">
                        <CuteTimelineIcon type={item.icon} />
                      </div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFEAF2] border border-[#F8BBD0]/80 font-cute-sans text-xs font-bold text-[#4A3259] whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>

                    {/* Center: Cute Heart Node */}
                    <div className="col-span-1 flex justify-center z-10">
                      <span className="w-5 h-5 rounded-full bg-white border-2 border-[#E887AB] flex items-center justify-center shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#E887AB]" />
                      </span>
                    </div>

                    {/* Right: Event Details Card */}
                    <div className="col-span-6 pl-3">
                      <div className="rounded-2xl bg-white/85 border border-[#E6D4FF] p-3.5 shadow-sm">
                        <span className="block font-cute-sans text-[8.5px] font-bold tracking-[0.16em] uppercase text-[#B58CE0] mb-0.5">
                          {item.dateLabel}
                        </span>
                        <h3 className="font-cute-serif text-[13px] font-bold tracking-[0.06em] uppercase text-[#4A3259] mb-1">
                          {item.title}
                        </h3>
                        <p className="font-cute-sans text-[11.5px] leading-relaxed text-[#6E5280] font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            FOOTER: CLOSING NOTE & REPLAY ENVELOPE BUTTON
        ================================================================== */}
        <footer className="px-6 pt-10 pb-16 text-center">
          <RevealOnScroll variant="scale">
            <CuteWeddingRingsSVG />
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <p className="font-cute-serif text-2xl sm:text-[26px] font-semibold text-[#4A3259] mb-5 leading-snug">
              We can&apos;t wait to celebrate with you.
            </p>

            <p className="font-cute-sans text-xs font-semibold text-[#9A7CAE] mb-1">
              With love,
            </p>

            <h2 className="font-cute-serif text-3xl sm:text-4xl font-semibold text-[#4A3259] tracking-wide mb-2">
              {WEDDING_CONFIG.couple.bride}{' '}
              <span className="font-cute-script text-4xl font-normal mx-1 text-[#E887AB]">
                &amp;
              </span>{' '}
              {WEDDING_CONFIG.couple.groom}
            </h2>

            <p className="font-cute-sans text-xs font-bold tracking-[0.2em] uppercase text-[#7C608C] mb-8">
              {WEDDING_CONFIG.date.displayFull}
            </p>

            <div className="mb-4">
              <button
                type="button"
                onClick={handleReplayOpening}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFF0F6] border-2 border-[#F8BBD0] text-[#5E3D72] font-cute-sans font-semibold text-[11px] tracking-[0.14em] uppercase hover:bg-[#FFE0EC] hover:scale-[1.03] transition cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#E887AB]" />
                <span>Replay Envelope &amp; Seal</span>
              </button>
            </div>
          </RevealOnScroll>
        </footer>
      </div>
    </div>
  );
}