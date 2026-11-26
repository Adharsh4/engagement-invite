import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Calendar,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ExternalLink,
  X,
  Clock,
  Navigation,
} from 'lucide-react';

// ============================================================================
// 🛠️ ENGAGEMENT / WEDDING CONFIGURATION OBJECT (Edit details here for Vercel)
// ============================================================================
const WEDDING_CONFIG = {
  couple: {
    bride: "Harini",
    groom: "Adharsh",
    monogram: "H & A",
    crestInitial: "A",
    tagline: "Together with their families",
    invitationText:
      "Harini & Adharsh joyfully request the pleasure of your company as they celebrate their engagement and begin this beautiful new chapter surrounded by the people they love most.",
  },
  date: {
    displayDots: "10.12.2026",
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
      "Description if required. We are excited to celebrate this special occasion with you at the beautiful Mahal in Madurai, India.",
    description2:
      "We recommend arriving a little early to take in and enjoy the surroundings before the engagement begins.",
    mapsUrl: "https://maps.google.com/?q=Villa+Aurelia+Largo+di+Porta+San+Pancrazio+Rome+Italy",
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
      description:
        "A dinner filled with tasty foods and deserts.",
      icon: "dinner_cloche",
    },
  ],
  footer: {
    creditName: "The Digital Yes",
  },
};

// ============================================================================
// 🎵 ROMANTIC CLASSICAL HARP & STRINGS SYNTHESIZER (Web Audio API)
// ============================================================================
class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.step = 0;
    this.noiseBuffer = null;
    // Expressive cello & harp progression
    this.progression = [
      { bass: 146.83, notes: [293.66, 349.23, 440.0, 587.33] }, // Dm
      { bass: 116.54, notes: [233.08, 349.23, 440.0, 523.25] }, // BbMaj7
      { bass: 174.61, notes: [261.63, 349.23, 440.0, 523.25] }, // F
      { bass: 130.81, notes: [261.63, 329.63, 392.0, 523.25] }, // C
    ];
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      // Pre-generate and cache a short 0.8s looped white-noise buffer once (zero click-time lag)
      if (!this.noiseBuffer && this.ctx) {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.8);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        this.noiseBuffer = buffer;
      }
    } catch {
      // Silently ignore audio initialization errors on restricted browsers
    }
  }

  // Slow, ceremonial wax-seal unsealing, silk ribbon untie, satin rustle & extended harp glissando
  playSealChime() {
    this.init();
    if (!this.ctx) return;
    const baseTime = this.ctx.currentTime;

    // 1. Deep warm wax-seal press & unseal thud (0.00s)
    const popOsc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    popOsc.type = 'triangle';
    popOsc.frequency.setValueAtTime(145, baseTime);
    popOsc.frequency.exponentialRampToValueAtTime(38, baseTime + 0.22);
    popGain.gain.setValueAtTime(0.15, baseTime);
    popGain.gain.exponentialRampToValueAtTime(0.0001, baseTime + 0.25);
    popOsc.connect(popGain);
    popGain.connect(this.ctx.destination);
    popOsc.start(baseTime);
    popOsc.stop(baseTime + 0.26);

    // 2. Delicate crystalline wax crackle & ribbon release (0.45s)
    const crackOsc = this.ctx.createOscillator();
    const crackGain = this.ctx.createGain();
    crackOsc.type = 'sine';
    crackOsc.frequency.setValueAtTime(520, baseTime + 0.45);
    crackOsc.frequency.exponentialRampToValueAtTime(180, baseTime + 0.75);
    crackGain.gain.setValueAtTime(0.0001, baseTime + 0.45);
    crackGain.gain.linearRampToValueAtTime(0.045, baseTime + 0.5);
    crackGain.gain.exponentialRampToValueAtTime(0.0001, baseTime + 0.78);
    crackOsc.connect(crackGain);
    crackGain.connect(this.ctx.destination);
    crackOsc.start(baseTime + 0.45);
    crackOsc.stop(baseTime + 0.8);

    // 3. Extended pleated silk & Chantilly lace unfolding swoosh using cached looped buffer
    if (this.noiseBuffer) {
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = this.noiseBuffer;
      whiteNoise.loop = true;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(480, baseTime + 0.9);
      bandpass.frequency.exponentialRampToValueAtTime(1550, baseTime + 2.8);
      bandpass.frequency.exponentialRampToValueAtTime(420, baseTime + 5.8);
      bandpass.Q.setValueAtTime(2.0, baseTime + 0.9);

      const rustleGain = this.ctx.createGain();
      rustleGain.gain.setValueAtTime(0.0001, baseTime + 0.9);
      rustleGain.gain.linearRampToValueAtTime(0.02, baseTime + 2.2);
      rustleGain.gain.exponentialRampToValueAtTime(0.0001, baseTime + 5.9);

      whiteNoise.connect(bandpass);
      bandpass.connect(rustleGain);
      rustleGain.connect(this.ctx.destination);
      whiteNoise.start(baseTime + 0.9);
      whiteNoise.stop(baseTime + 6.0);
    }

    // 4. Slow, dreamy 12-note celestial harp glissando across 4.5 seconds
    const chimeNotes = [
      261.63, 293.66, 349.23, 392.0, 440.0, 523.25,
      587.33, 659.25, 698.46, 783.99, 880.0, 1046.5,
    ];
    chimeNotes.forEach((freq, idx) => {
      const startTime = baseTime + 0.65 + idx * 0.28;
      const osc = this.ctx.createOscillator();
      const overtone = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, startTime);
      filter.frequency.exponentialRampToValueAtTime(460, startTime + 3.4);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.038, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.5);

      osc.connect(filter);
      overtone.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      overtone.start(startTime);
      osc.stop(startTime + 3.6);
      overtone.stop(startTime + 3.6);
    });
  }

  // Magical ascending celestial harp arpeggio when the date is scratched & revealed
  playBloomArpeggio() {
    this.init();
    if (!this.ctx) return;
    const notes = [293.66, 349.23, 440.0, 587.33, 698.46, 880.0, 1174.66];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.05, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 2.7);
      }, idx * 75);
    });
  }

  playNote(freq, duration = 2.8, volume = 0.038, type = 'sine', attack = 0.16) {
    // Background loop muted per user preference; seal chime & bloom arpeggio remain active
    void freq;
    void duration;
    void volume;
    void type;
    void attack;
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const triggerStep = () => {
      if (!this.isPlaying) return;
      const chordIdx = Math.floor(this.step / 4) % this.progression.length;
      const noteIdx = this.step % 4;
      const chord = this.progression[chordIdx];

      if (noteIdx === 0) {
        this.playNote(chord.bass, 3.8, 0.042, 'sawtooth', 0.45);
      }
      this.playNote(chord.notes[noteIdx], 2.5, 0.034, 'sine', 0.09);

      this.step++;
    };

    triggerStep();
    this.intervalId = setInterval(triggerStep, 760);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

const audioEngine = new RomanticAudioEngine();

// ============================================================================
// ✨ REUSABLE 3D PEARL, SCROLL REVEAL & CHANTILLY LACE COMPONENTS
// ============================================================================

/** Realistic 3D Specular Pearl with GPU-Only Breathing Lustre (pauses while opening) */
const Pearl = ({ size = 10, className = '', style = {}, delay = 0, isOpening = false }) => (
  <span
    className={`luxury-pearl ${isOpening ? 'is-paused' : ''} ${className}`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}ms`,
      ...style,
    }}
  />
);

/** IntersectionObserver Scroll-Triggered GPU-Only Reveal (transform & opacity only) */
const RevealOnScroll = ({ children, className = '', delay = 0, variant = 'fade-up' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
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

/** Multi-Layered White Floral Chantilly Lace Divider (Frames Burgundy Sections) */
const ScallopedLaceDivider = ({ position = 'top', flip = false }) => {
  const isTop = position === 'top';
  return (
    <div
      className="relative w-full overflow-hidden select-none pointer-events-none leading-none z-10"
      style={{
        height: '84px',
        marginTop: isTop ? '-1px' : '0',
        marginBottom: !isTop ? '-1px' : '0',
        transform: flip ? 'rotate(180deg)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 800 130"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <pattern id="chantillyHexMesh" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 5 0 L 10 5 L 5 10 L 0 5 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.45"
              strokeOpacity="0.55"
            />
            <circle cx="5" cy="5" r="0.7" fill="#FFFFFF" fillOpacity="0.45" />
          </pattern>

          <pattern id="royalLaceScallop" width="160" height="130" patternUnits="userSpaceOnUse">
            {/* Soft built-in shadow line below scallop */}
            <path
              d="M 0 0 L 160 0 L 160 79 Q 140 101 120 79 Q 80 129 40 79 Q 20 101 0 79 Z"
              fill="rgba(24, 4, 12, 0.22)"
            />
            {/* Solid Pastel-Lavender base at seam */}
            <path
              d="M 0 0 L 160 0 L 160 28 Q 140 54 120 38 Q 80 94 40 38 Q 20 54 0 28 Z"
              fill="#E9DDF4"
            />
            {/* Delicate hexagonal Chantilly tulle mesh */}
            <path
              d="M 0 0 L 160 0 L 160 74 Q 140 96 120 74 Q 80 124 40 74 Q 20 96 0 74 Z"
              fill="url(#chantillyHexMesh)"
            />
            {/* Soft corded floral embroidery */}
            <path
              d="M 0 0 L 160 0 L 160 60 Q 140 82 120 62 Q 80 112 40 62 Q 20 82 0 60 Z"
              fill="#F7F2FC"
              fillOpacity="0.65"
            />
            {/* Eyelash fringe along scallop edge */}
            <path
              d="M 0 74 Q 20 96 40 74 Q 80 124 120 74 Q 140 96 160 74"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeDasharray="1.5 2.5"
            />
            <path
              d="M 0 60 Q 20 82 40 62 Q 80 112 120 62 Q 140 82 160 60"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeOpacity="0.92"
            />

            {/* Embroidered Central Rose Medallion */}
            <g transform="translate(80, 58)" stroke="#FFFFFF" fill="#FBF8FA" fillOpacity="0.82">
              <circle cx="0" cy="0" r="15" strokeWidth="1.4" />
              <circle cx="0" cy="0" r="9" strokeWidth="1.1" fill="#EFE5F8" />
              <circle cx="0" cy="0" r="3.8" fill="#FFFFFF" />
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
              <path d="M -32 -14 C -24 -2, -16 8, -14 0" fill="none" strokeWidth="1.2" />
              <path d="M 32 -14 C 24 -2, 16 8, 14 0" fill="none" strokeWidth="1.2" />
            </g>

            {/* Side Blossoms */}
            {[20, 140].map((bx) => (
              <g key={bx} transform={`translate(${bx}, 44)`} stroke="#FFFFFF" fill="#FFFFFF" fillOpacity="0.75">
                <circle cx="0" cy="0" r="7.5" strokeWidth="1.1" />
                <circle cx="0" cy="0" r="2.8" />
              </g>
            ))}
          </pattern>
        </defs>
        <rect x="0" y="0" width="800" height="130" fill="url(#royalLaceScallop)" />
      </svg>
    </div>
  );
};

// ============================================================================
// 🌸 PURPLE & LAVENDER BLOOMING FLOWERS + SCRATCH-TO-REVEAL DATE CARD
// ============================================================================

/** Custom SVG Purple Rose, Royal Violet & Lavender Sprig Blossoms */
const PurpleFlowerSVG = ({ variant = 0, size = 36, noShadow = false }) => {
  const shadowClass = noShadow ? '' : 'drop-shadow-md';
  if (variant % 3 === 0) {
    // Lush Multi-Petal Royal Purple Rose
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className={`overflow-visible ${shadowClass}`}>
        <defs>
          <radialGradient id="purpleRoseGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E6FF" />
            <stop offset="35%" stopColor="#D69DF2" />
            <stop offset="72%" stopColor="#9B4DCA" />
            <stop offset="100%" stopColor="#5E1B88" />
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
              fill="url(#purpleRoseGrad)"
              stroke="#F7EBFF"
              strokeWidth="0.6"
              opacity="0.92"
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
              fill="#E5C2F9"
              stroke="#6B21A8"
              strokeWidth="0.6"
            />
          ))}
          <circle cx="0" cy="0" r="5.5" fill="#FBE8FF" />
          <circle cx="0" cy="0" r="2.5" fill="#D8B4FE" />
        </g>
      </svg>
    );
  }
  if (variant % 3 === 1) {
    // Five-Petal Lavender & Amethyst Wildflower
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className={`overflow-visible ${shadowClass}`}>
        <g transform="translate(32,32)">
          {[0, 72, 144, 216, 288].map((deg) => (
            <path
              key={deg}
              d="M 0 0 C -10 -12, -12 -25, 0 -27 C 12 -25, 10 -12, 0 0 Z"
              transform={`rotate(${deg})`}
              fill="#C084FC"
              stroke="#F3E8FF"
              strokeWidth="0.9"
            />
          ))}
          {[36, 108, 180, 252, 324].map((deg) => (
            <path
              key={deg}
              d="M 0 0 C -6 -8, -7 -17, 0 -19 C 7 -17, 6 -8, 0 0 Z"
              transform={`rotate(${deg})`}
              fill="#E9D5FF"
              opacity="0.88"
            />
          ))}
          <circle cx="0" cy="0" r="4.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
        </g>
      </svg>
    );
  }
  // Botanical Lavender Sprig with Violet Buds
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={`overflow-visible ${shadowClass}`}>
      <g transform="translate(32,32) rotate(-20)">
        <path d="M 0 24 Q 2 0 0 -24" stroke="#A7F3D0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {[-18, -11, -4, 3, 10].map((y, idx) => (
          <g key={idx} transform={`translate(0, ${y})`}>
            <ellipse cx="-6" cy="-2" rx="5.5" ry="3.2" transform="rotate(-32 -6 -2)" fill="#A855F7" stroke="#F3E8FF" strokeWidth="0.6" />
            <ellipse cx="6" cy="-2" rx="5.5" ry="3.2" transform="rotate(32 6 -2)" fill="#C084FC" stroke="#F3E8FF" strokeWidth="0.6" />
            <circle cx="0" cy="-4" r="2.8" fill="#E9D5FF" />
          </g>
        ))}
      </g>
    </svg>
  );
};

/** Interactive Scratch-to-Reveal Date & Live Countdown with Purple Flower Burst */
const ScratchToRevealCountdown = ({ timeLeft, dateConfig, coupleConfig }) => {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const moveCounterRef = useRef(0);

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [bloomCycle, setBloomCycle] = useState(0);

  // Pre-computed purple flower burst particles around the revealed card
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
    { id: 13, tx: '-108px', ty: '-62px', rot: '-35deg', scale: 0.85, delay: 190, variant: 1, size: 30 },
    { id: 14, tx: '110px', ty: '-58px', rot: '28deg', scale: 0.85, delay: 210, variant: 2, size: 30 },
    { id: 15, tx: '-105px', ty: '45px', rot: '15deg', scale: 0.88, delay: 160, variant: 0, size: 32 },
    { id: 16, tx: '108px', ty: '48px', rot: '-24deg', scale: 0.88, delay: 180, variant: 1, size: 32 },
  ];

  // Corner bouquet clusters that stay anchored on the card once revealed
  const cornerBlossoms = [
    { pos: 'top-2 left-2', variant: 0, size: 36, delay: '120ms' },
    { pos: 'top-6 left-9', variant: 2, size: 28, delay: '260ms' },
    { pos: 'top-2 right-2', variant: 1, size: 36, delay: '180ms' },
    { pos: 'top-6 right-9', variant: 0, size: 28, delay: '320ms' },
    { pos: 'bottom-2 left-2', variant: 1, size: 34, delay: '220ms' },
    { pos: 'bottom-2 right-2', variant: 0, size: 34, delay: '280ms' },
  ];

  // Paint the luxury metallic pearl-gold & lavender foil cover onto the canvas
  const initFoilCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';

    // Metallic champagne-lavender foil gradient
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#DFC8D8');
    grad.addColorStop(0.28, '#F6ECF3');
    grad.addColorStop(0.5, '#D5B8CE');
    grad.addColorStop(0.75, '#F9F2F7');
    grad.addColorStop(1, '#C5A3BC');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Subtle diagonal shimmer sheen lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1;
    for (let x = -rect.height; x < rect.width + rect.height; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x - rect.height, rect.height);
      ctx.stroke();
    }

    // Ornate double inner border
    ctx.strokeStyle = 'rgba(90, 24, 58, 0.35)';
    ctx.lineWidth = 1.4;
    ctx.strokeRect(12, 12, rect.width - 24, rect.height - 24);

    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = 'rgba(90, 24, 58, 0.55)';
    ctx.strokeRect(18, 18, rect.width - 36, rect.height - 36);
    ctx.setLineDash([]);

    // Decorative central emblem on foil
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    ctx.fillStyle = 'rgba(74, 18, 34, 0.08)';
    ctx.beginPath();
    ctx.arc(cx, cy - 18, 34, 0, Math.PI * 2);
    ctx.fill();

    // Sparkle stars on foil
    const sparkles = [
      [cx - 85, cy - 55],
      [cx + 85, cy - 52],
      [cx - 95, cy + 48],
      [cx + 92, cy + 52],
      [cx, cy - 68],
    ];
    ctx.fillStyle = '#5B1B40';
    sparkles.forEach(([sx, sy]) => {
      ctx.beginPath();
      ctx.arc(sx, sy, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Editorial typography instructions on foil
    ctx.fillStyle = '#4A1222';
    ctx.font = 'italic 22px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to Reveal', cx, cy - 10);

    ctx.font = '500 10px "Montserrat", sans-serif';
    ctx.fillStyle = 'rgba(74, 18, 34, 0.8)';
    ctx.fillText('OUR SPECIAL DATE & COUNTDOWN', cx, cy + 14);

    ctx.font = '300 9px "Montserrat", sans-serif';
    ctx.fillStyle = 'rgba(74, 18, 34, 0.65)';
    ctx.fillText('Rub gently with your finger or cursor', cx, cy + 36);
  };

  useEffect(() => {
    if (!isRevealed) {
      const timer = setTimeout(initFoilCanvas, 80);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  const triggerFullReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setBloomCycle((c) => c + 1);
    audioEngine.playBloomArpeggio();
  };

  const computeScratchedPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    if (!width || !height) return;
    const imageData = ctx.getImageData(0, 0, width, height).data;
    let transparentPixels = 0;
    let totalSampled = 0;
    const stride = 32;

    for (let i = 3; i < imageData.length; i += stride) {
      totalSampled++;
      if (imageData[i] < 128) {
        transparentPixels++;
      }
    }

    const pct = Math.min(100, Math.round((transparentPixels / Math.max(1, totalSampled)) * 100));
    setScratchPercent(pct);
    if (pct >= 35) {
      triggerFullReveal();
    }
  };

  const scratchAtPoint = (clientX, clientY) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
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
  };

  const handlePointerDown = (e) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    const pt = e.touches ? e.touches[0] : e;
    lastPointRef.current = null;
    scratchAtPoint(pt.clientX, pt.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || isRevealed) return;
    const pt = e.touches ? e.touches[0] : e;
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
      {/* BLOOMING PURPLE & LAVENDER FLOWER BURST PARTICLES */}
      {isRevealed && (
        <div
          key={bloomCycle}
          className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-visible"
        >
          {flowerParticles.map((p) => (
            <div
              key={p.id}
              className="purple-flower-particle"
              style={{
                '--tx': p.tx,
                '--ty': p.ty,
                '--rot': p.rot,
                '--sc': p.scale,
                animationDelay: `${p.delay}ms`,
              }}
            >
              <PurpleFlowerSVG variant={p.variant} size={p.size} noShadow />
            </div>
          ))}
        </div>
      )}

      {/* ORNATE COUNTDOWN & REVEALED DATE CARD */}
      <div className="relative rounded-3xl bg-[#3D0D1D]/90 border border-[#F4EEF1]/30 px-5 py-9 shadow-2xl overflow-hidden">
        {/* Corner Blooming Purple Flower Clusters */}
        {isRevealed &&
          cornerBlossoms.map((cb, idx) => (
            <div
              key={`${bloomCycle}-corner-${idx}`}
              className={`absolute ${cb.pos} pointer-events-none z-20 corner-flower-pop`}
              style={{ animationDelay: cb.delay }}
            >
              <PurpleFlowerSVG variant={cb.variant} size={cb.size} />
            </div>
          ))}

        {/* Revealed Date & Rising Numbers Content */}
        <div
          className={`relative z-10 transition-all duration-1000 ${
            isRevealed
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-45 scale-95 translate-y-2'
          }`}
        >
          <p className="font-sans-clean text-[9px] tracking-[0.28em] uppercase text-[#E9D5FF] mb-1">
            Save Our Date
          </p>

          <h3
            className={`font-serif-editorial text-2xl sm:text-3xl text-[#FAF5FF] tracking-wide mb-1 ${
              isRevealed ? 'date-number-rise' : ''
            }`}
          >
            {dateConfig.displayFull}
          </h3>

          <p
            className={`font-sans-clean text-[10px] tracking-[0.18em] uppercase text-[#D8B4FE] mb-6 ${
              isRevealed ? 'date-number-rise' : ''
            }`}
            style={{ animationDelay: '140ms' }}
          >
            {dateConfig.displayTime}
          </p>

          {/* 4-Column Countdown Digits */}
          <div className="grid grid-cols-4 gap-2 max-w-[260px] mx-auto pt-2 border-t border-[#F4EEF1]/20">
            {[
              { value: timeLeft.days, label: 'DAYS', delay: '220ms' },
              { value: timeLeft.hours, label: 'HOURS', delay: '340ms' },
              { value: timeLeft.minutes, label: 'MINUTES', delay: '460ms' },
              { value: timeLeft.seconds, label: 'SECONDS', delay: '580ms' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center ${
                  isRevealed ? 'countdown-digit-pop' : ''
                }`}
                style={{ animationDelay: item.delay }}
              >
                <span className="font-serif-editorial text-3xl sm:text-4xl font-light tracking-wider text-[#FAF5FF] drop-shadow">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-sans-clean text-[8px] tracking-[0.22em] text-[#E9D5FF]/80 mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE FOIL SCRATCH CANVAS OVERLAY */}
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

      {/* Action Buttons Below Scratch Card */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        {!isRevealed ? (
          <button
            type="button"
            onClick={triggerFullReveal}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F4EEF1]/15 border border-[#E9D5FF]/40 text-[10px] font-sans-clean tracking-[0.2em] uppercase text-[#FAF5FF] hover:bg-[#F4EEF1]/25 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D8B4FE]" />
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#9333EA]/30 border border-[#D8B4FE]/50 text-[10px] font-sans-clean tracking-[0.18em] uppercase text-[#FAF5FF] hover:bg-[#9333EA]/45 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E9D5FF]" />
              <span>Bloom Purple Flowers</span>
            </button>

            <button
              type="button"
              onClick={handleResetScratchCard}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#F4EEF1]/30 text-[10px] font-sans-clean tracking-[0.16em] uppercase text-[#F4EEF1]/80 hover:bg-[#F4EEF1]/10 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Foil</span>
            </button>

            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                dateConfig.calendarTitle
              )}&dates=${dateConfig.calendarStart}/${
                dateConfig.calendarEnd
              }&details=${encodeURIComponent(
                coupleConfig.invitationText
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#F4EEF1]/35 text-[10px] font-sans-clean tracking-[0.2em] uppercase text-[#F4EEF1]/90 hover:bg-[#F4EEF1]/10 transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              Save the Date
            </a>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 🎨 BESPOKE VINTAGE LINE-ART ILLUSTRATIONS WITH MICRO-ANIMATIONS
// ============================================================================

/** 1. Ornate Crystal Chandelier with Gently Swaying Pendants & Twinkling Candles */
const ChandelierIllustration = () => (
  <svg viewBox="0 0 320 160" className="w-60 h-auto mx-auto text-[#4A1222] overflow-visible lux-float-slow">
    <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 160 2 L 160 28" strokeWidth="1.3" />
      <circle cx="160" cy="14" r="3" />
      <path d="M 148 28 Q 160 22 172 28 Z" fill="currentColor" fillOpacity="0.12" />

      {/* Central crystal baluster column */}
      <path d="M 155 28 Q 160 40 153 54 L 167 54 Q 160 40 165 28 Z" fill="currentColor" fillOpacity="0.08" />
      <ellipse cx="160" cy="62" rx="10" ry="5" fill="currentColor" fillOpacity="0.1" />
      <path d="M 152 67 Q 160 85 168 67" />
      <circle cx="160" cy="84" r="4" />
      <path d="M 160 88 L 156 102 L 160 112 L 164 102 Z" fill="currentColor" fillOpacity="0.18" />

      {/* Scrolling chandelier arms */}
      <path d="M 150 62 C 125 62, 105 42, 82 54 C 72 60, 78 72, 90 68" />
      <path d="M 150 65 C 115 75, 75 55, 48 64" />
      <path d="M 170 62 C 195 62, 215 42, 238 54 C 248 60, 242 72, 230 68" />
      <path d="M 170 65 C 205 75, 245 55, 272 64" />

      {/* Candle cups & twinkling flames */}
      {[48, 82, 118, 202, 238, 272].map((x, idx) => (
        <g key={idx}>
          <path d={`M ${x - 8} 54 Q ${x} 60 ${x + 8} 54 Z`} fill="currentColor" fillOpacity="0.15" />
          <rect x={x - 2.5} y="34" width="5" height="20" rx="1" fill="#F8F4F6" />
          <path
            d={`M ${x} 23 Q ${x - 3.8} 30 ${x} 33 Q ${x + 3.8} 30 ${x} 23 Z`}
            fill="currentColor"
            fillOpacity="0.35"
            className="lux-twinkle"
            style={{ animationDelay: `${idx * 280}ms` }}
          />
          <path d={`M ${x - 4} 58 L ${x - 6} 76 L ${x - 4} 81 L ${x - 2} 76 Z`} />
          <path d={`M ${x + 4} 58 L ${x + 2} 76 L ${x + 4} 81 L ${x + 6} 76 Z`} />
        </g>
      ))}

      {/* Draped crystal & floral swags */}
      <path d="M 48 58 Q 65 88 82 58" strokeDasharray="2 2" />
      <path d="M 82 58 Q 100 94 118 58" strokeDasharray="2 2" />
      <path d="M 118 58 Q 160 105 202 58" strokeDasharray="2 2" />
      <path d="M 202 58 Q 220 94 238 58" strokeDasharray="2 2" />
      <path d="M 238 58 Q 255 88 272 58" strokeDasharray="2 2" />

      <path d="M 65 74 Q 90 112 120 78" />
      <path d="M 120 78 Q 160 124 200 78" />
      <path d="M 200 78 Q 230 112 255 74" />

      {/* Hanging crystal prisms */}
      {[65, 92, 120, 142, 160, 178, 200, 228, 255].map((x, idx) => {
        const yTop = idx === 4 ? 110 : idx === 3 || idx === 5 ? 102 : 88;
        return (
          <g key={idx}>
            <line x1={x} y1={yTop - 10} x2={x} y2={yTop + 8} />
            <polygon
              points={`${x},${yTop + 8} ${x - 3},${yTop + 16} ${x},${yTop + 23} ${x + 3},${yTop + 16}`}
              fill="currentColor"
              fillOpacity="0.16"
            />
          </g>
        );
      })}

      {/* Etched roses along the central garland */}
      {[82, 118, 160, 202, 238].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${i === 2 ? 72 : 62})`}>
          <circle cx="0" cy="0" r="4.5" fill="#F2EAEF" />
          <circle cx="0" cy="0" r="2" />
        </g>
      ))}
    </g>
  </svg>
);

/** 2. Kissing Swans Forming a Heart with Crown & Water Ripples (Section 2) */
const SwansIllustration = () => (
  <svg viewBox="0 0 220 120" className="w-44 h-auto mx-auto text-[#4A1222] lux-float-slow">
    <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 102 18 L 105 10 L 110 16 L 115 10 L 118 18 Z" fill="currentColor" fillOpacity="0.15" />
      <circle cx="105" cy="8" r="1" fill="currentColor" />
      <circle cx="110" cy="6" r="1.3" fill="currentColor" />
      <circle cx="115" cy="8" r="1" fill="currentColor" />

      {/* Left Swan */}
      <path d="M 109 38 C 103 22, 82 22, 82 40 C 82 56, 98 68, 92 84" strokeWidth="1.4" />
      <path d="M 107 40 C 102 27, 87 28, 87 40 C 87 54, 103 66, 97 82" />
      <path d="M 109 38 L 110 42 L 106 41 Z" fill="currentColor" />
      <path
        d="M 92 82 C 74 84, 42 78, 36 62 C 46 56, 62 52, 82 64 C 66 54, 48 46, 44 36 C 58 34, 78 44, 88 60"
        fill="currentColor"
        fillOpacity="0.07"
      />
      <path d="M 52 50 Q 68 56 84 68" />
      <path d="M 46 62 Q 64 68 84 74" />
      <path d="M 36 62 C 30 72, 46 88, 92 86" />

      {/* Right Swan */}
      <path d="M 111 38 C 117 22, 138 22, 138 40 C 138 56, 122 68, 128 84" strokeWidth="1.4" />
      <path d="M 113 40 C 118 27, 133 28, 133 40 C 133 54, 117 66, 123 82" />
      <path d="M 111 38 L 110 42 L 114 41 Z" fill="currentColor" />
      <path
        d="M 128 82 C 146 84, 178 78, 184 62 C 174 56, 158 52, 138 64 C 154 54, 172 46, 176 36 C 162 34, 142 44, 132 60"
        fill="currentColor"
        fillOpacity="0.07"
      />
      <path d="M 168 50 Q 152 56 136 68" />
      <path d="M 174 62 Q 156 68 136 74" />
      <path d="M 184 62 C 190 72, 174 88, 128 86" />

      {/* Water ripples */}
      <circle cx="110" cy="84" r="5" fill="#EAE0E4" />
      <circle cx="110" cy="84" r="2" />
      <path d="M 96 86 Q 110 92 124 86" />
      <path d="M 55 94 Q 110 98 165 94" strokeWidth="0.8" />
      <path d="M 78 101 Q 110 104 142 101" strokeWidth="0.7" />
    </g>
  </svg>
);

/** 3. Classical Architectural Etching inside an Intricate Double-Oval Lace Medallion (Section 4) */
const VillaAureliaOvalIllustration = () => (
  <div className="relative w-72 sm:w-80 mx-auto my-6 lux-float-slow">
    <svg viewBox="0 0 320 390" className="w-full h-auto text-[#4A1222]">
      <defs>
        <clipPath id="villaOvalClip">
          <ellipse cx="160" cy="195" rx="112" ry="145" />
        </clipPath>
      </defs>

      {/* Outer Scalloped Lace Medallion */}
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
                strokeWidth="0.8"
                strokeOpacity="0.55"
                fill="#F7F2F5"
                fillOpacity="0.45"
              />
              <circle cx={x} cy={y} r="3" strokeWidth="0.6" strokeOpacity="0.5" />
            </g>
          );
        })}

        <ellipse
          cx="160"
          cy="195"
          rx="126"
          ry="160"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          strokeOpacity="0.7"
        />
        <ellipse
          cx="160"
          cy="195"
          rx="118"
          ry="152"
          strokeWidth="1.5"
          fill="#F4EEF1"
          fillOpacity="0.65"
        />
        <ellipse cx="160" cy="195" rx="112" ry="145" strokeWidth="1" strokeOpacity="0.85" />
      </g>

      {/* Classical Architectural Etching */}
      <g clipPath="url(#villaOvalClip)" stroke="currentColor" fill="none" strokeWidth="1">
        <path d="M 60 110 Q 110 95 160 108 T 260 105" strokeOpacity="0.25" />
        <path d="M 75 85 Q 140 72 210 88" strokeOpacity="0.2" />

        {/* Cypress Trees */}
        {[68, 82, 245, 258].map((cx, i) => (
          <path
            key={i}
            d={`M ${cx} 255 L ${cx - 6} 255 Q ${cx - 8} 190 ${cx} 145 Q ${cx + 8} 190 ${cx + 6} 255 Z`}
            fill="currentColor"
            fillOpacity="0.12"
          />
        ))}

        {/* Main Classical Facade */}
        <rect x="92" y="138" width="136" height="122" fill="#F6F0F3" strokeWidth="1.3" />
        <line x1="88" y1="138" x2="232" y2="138" strokeWidth="1.8" />
        <rect x="94" y="130" width="132" height="8" fill="#EFE7EB" />
        {[96, 120, 144, 176, 200, 224].map((x, idx) => (
          <path key={idx} d={`M ${x} 130 L ${x - 2} 123 L ${x + 2} 123 Z`} fill="currentColor" />
        ))}
        <polygon points="145,130 160,116 175,130" fill="#EFE7EB" strokeWidth="1.2" />
        <circle cx="160" cy="125" r="3" />

        <line x1="90" y1="172" x2="230" y2="172" strokeWidth="1.2" />
        <line x1="90" y1="210" x2="230" y2="210" strokeWidth="1.2" />

        {[106, 133, 160, 187, 214].map((wx, i) => (
          <g key={i}>
            <rect x={wx - 6} y="146" width="12" height="18" fill="currentColor" fillOpacity="0.1" />
            <line x1={wx} y1="146" x2={wx} y2="164" strokeWidth="0.7" />
            <polygon points={`${wx - 8},180 ${wx},175 ${wx + 8},180`} />
            <rect x={wx - 6} y="180" width="12" height="22" fill="currentColor" fillOpacity="0.12" />
            <line x1={wx} y1="180" x2={wx} y2="202" strokeWidth="0.7" />
          </g>
        ))}

        {[133, 160, 187].map((ax, i) => (
          <path
            key={i}
            d={`M ${ax - 9} 260 L ${ax - 9} 230 A 9 9 0 0 1 ${ax + 9} 230 L ${ax + 9} 260 Z`}
            fill="currentColor"
            fillOpacity="0.18"
          />
        ))}
        <rect x="100" y="224" width="12" height="22" />
        <rect x="208" y="224" width="12" height="22" />

        <path d="M 45 260 L 275 260" strokeWidth="1.4" />
        <path d="M 55 260 Q 75 248 95 260" fill="currentColor" fillOpacity="0.15" />
        <path d="M 225 260 Q 245 248 265 260" fill="currentColor" fillOpacity="0.15" />

        <path d="M 135 260 C 120 295, 85 320, 65 345" strokeDasharray="3 2" />
        <path d="M 185 260 C 200 295, 235 320, 255 345" strokeDasharray="3 2" />
        <ellipse cx="160" cy="296" rx="28" ry="9" fill="#EFE7EB" />
        <ellipse cx="160" cy="294" rx="22" ry="6" />
        <path d="M 160 294 L 160 278" />
      </g>
    </svg>
  </div>
);

/** 4. Hanging Crystal & Floral Garland (Top of "The Day" Section) */
const HangingGarlandIllustration = () => (
  <svg viewBox="0 0 400 110" className="w-full h-auto text-[#4A1222] mb-2">
    <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <path d="M 0 18 Q 50 64 100 22" />
      <path d="M 100 22 Q 150 72 200 26" />
      <path d="M 200 26 Q 250 72 300 22" />
      <path d="M 300 22 Q 350 64 400 18" />

      <path d="M 0 28 Q 50 78 100 32" strokeDasharray="2 3" />
      <path d="M 100 32 Q 150 86 200 36" strokeDasharray="2 3" />
      <path d="M 200 36 Q 250 86 300 32" strokeDasharray="2 3" />
      <path d="M 300 32 Q 350 78 400 28" strokeDasharray="2 3" />

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
                <circle cx={x} cy={yStart} r="3.5" fill="#E9DDF4" />
              </>
            )}
            <line x1={x} y1={yStart} x2={x} y2={yStart + dropLen} strokeDasharray="1 2" />
            <polygon
              points={`${x},${yStart + dropLen} ${x - 4},${yStart + dropLen + 8} ${x},${yStart + dropLen + 15} ${x + 4},${yStart + dropLen + 8}`}
              fill="currentColor"
              fillOpacity="0.16"
            />
          </g>
        );
      })}
    </g>
  </svg>
);

/** 5. Timeline Fine-Line Icons (Welcome Flutes, Ceremony Rings, Dinner Cloche) */
const TimelineIcon = ({ type }) => {
  switch (type) {
    case 'welcome_flutes':
      return (
        <svg viewBox="0 0 64 56" className="w-14 h-12 text-[#4A1222]">
          <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
            <path d="M 18 12 L 26 14 L 22 30 Q 20 33 18 29 Z" fill="currentColor" fillOpacity="0.09" />
            <line x1="20" y1="31" x2="17" y2="46" />
            <line x1="12" y1="46" x2="22" y2="46" />
            <path d="M 46 12 L 38 14 L 42 30 Q 44 33 46 29 Z" fill="currentColor" fillOpacity="0.09" />
            <line x1="44" y1="31" x2="47" y2="46" />
            <line x1="42" y1="46" x2="52" y2="46" />
            <line x1="32" y1="5" x2="32" y2="11" />
            <line x1="28" y1="8" x2="36" y2="8" />
          </g>
        </svg>
      );
    case 'ceremony_rings':
      return (
        <svg viewBox="0 0 64 56" className="w-14 h-12 text-[#4A1222]">
          <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
            <circle cx="25" cy="32" r="11" />
            <circle cx="39" cy="32" r="11" />
            <polygon points="39,16 35,21 43,21" fill="currentColor" fillOpacity="0.18" />
            <line x1="39" y1="10" x2="39" y2="13" />
            <line x1="33" y1="12" x2="35" y2="14" />
            <line x1="45" y1="12" x2="43" y2="14" />
          </g>
        </svg>
      );
    case 'dinner_cloche':
    default:
      return (
        <svg viewBox="0 0 64 56" className="w-14 h-12 text-[#4A1222]">
          <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
            <path d="M 12 36 A 20 18 0 0 1 52 36 Z" fill="currentColor" fillOpacity="0.09" />
            <circle cx="32" cy="15" r="3" />
            <ellipse cx="32" cy="37" rx="24" ry="3.5" />
            <path d="M 20 44 Q 32 41 44 44" />
          </g>
        </svg>
      );
  }
};

/** 6. Long Banquet Table Setting Illustration (Bottom of "The Day" Section) */
const BanquetTableIllustration = () => (
  <svg viewBox="0 0 400 135" className="w-full h-auto text-[#4A1222] mt-6">
    <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <line x1="0" y1="78" x2="400" y2="78" strokeWidth="1.2" />
      <line x1="0" y1="112" x2="400" y2="112" strokeWidth="1.4" />
      <path d="M 0 112 Q 35 125 70 112 Q 115 126 160 112 Q 205 126 250 112 Q 295 126 340 112 Q 370 124 400 112" />
      <line x1="70" y1="112" x2="66" y2="132" strokeOpacity="0.5" />
      <line x1="160" y1="112" x2="158" y2="132" strokeOpacity="0.5" />
      <line x1="250" y1="112" x2="252" y2="132" strokeOpacity="0.5" />
      <line x1="340" y1="112" x2="344" y2="132" strokeOpacity="0.5" />

      {/* 3-Tier Engagement Cake */}
      <g transform="translate(55, 22)">
        <ellipse cx="0" cy="54" rx="26" ry="5" fill="#F2EAEF" />
        <path d="M -8 59 L -14 67 L 14 67 L 8 59" fill="currentColor" fillOpacity="0.1" />
        <rect x="-22" y="36" width="44" height="16" rx="2" fill="#F8F4F6" />
        <path d="M -22 42 Q -11 48 0 42 Q 11 48 22 42" />
        <rect x="-15" y="22" width="30" height="14" rx="2" fill="#F8F4F6" />
        <path d="M -15 27 Q -7 32 0 27 Q 7 32 15 27" />
        <rect x="-9" y="10" width="18" height="12" rx="1.5" fill="#F8F4F6" />
        <circle cx="-4" cy="8" r="3" fill="currentColor" fillOpacity="0.2" />
        <circle cx="0" cy="7" r="3.5" fill="currentColor" fillOpacity="0.25" />
        <circle cx="4" cy="8" r="3" fill="currentColor" fillOpacity="0.2" />
      </g>

      {/* Taper Candles */}
      {[128, 222, 315, 332].map((cx, i) => {
        const h = i % 2 === 0 ? 32 : 24;
        return (
          <g key={i} transform={`translate(${cx}, ${78 - h})`}>
            <rect x="-2" y="0" width="4" height={h} fill="#F8F4F6" />
            <path
              d="M 0 -8 Q -3 -3 0 0 Q 3 -3 0 -8 Z"
              fill="currentColor"
              fillOpacity="0.35"
              className="lux-twinkle"
            />
            <path d={`M -6 ${h} L 6 ${h} L 3 ${h + 6} L -3 ${h + 6} Z`} fill="currentColor" fillOpacity="0.15" />
          </g>
        );
      })}

      {/* Glasses */}
      {[155, 195, 255, 285].map((gx, i) => (
        <g key={i} transform={`translate(${gx}, 58)`}>
          {i % 2 === 0 ? (
            <>
              <path d="M -8 0 Q 0 10 8 0 Z" fill="currentColor" fillOpacity="0.1" />
              <line x1="0" y1="5" x2="0" y2="18" />
              <ellipse cx="0" cy="18" rx="6" ry="1.8" />
            </>
          ) : (
            <>
              <path d="M -5 -4 C -6 6, 6 6, 5 -4 Z" fill="currentColor" fillOpacity="0.1" />
              <line x1="0" y1="4" x2="0" y2="18" />
              <ellipse cx="0" cy="18" rx="5" ry="1.5" />
            </>
          )}
        </g>
      ))}

      {/* Plates & Cutlery */}
      {[55, 155, 255, 355].map((px, i) => (
        <g key={i} transform={`translate(${px}, 95)`}>
          <ellipse cx="0" cy="0" rx="24" ry="8" fill="#F7F2F5" />
          <ellipse cx="0" cy="0" rx="16" ry="5" />
          <line x1="-29" y1="-5" x2="-29" y2="6" />
          <line x1="29" y1="-6" x2="29" y2="6" />
          <line x1="32" y1="-4" x2="32" y2="6" />
        </g>
      ))}
    </g>
  </svg>
);

/** 7. Intertwined Diamond Engagement / Wedding Rings (Closing Footer) */
const WeddingRingsIllustration = () => (
  <svg viewBox="0 0 160 95" className="w-32 h-auto mx-auto mb-4 text-[#4A1222] lux-float-slow">
    <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="64" cy="56" rx="28" ry="20" transform="rotate(-12 64 56)" />
      <ellipse cx="64" cy="56" rx="23" ry="15.5" transform="rotate(-12 64 56)" strokeWidth="0.9" />
      <ellipse cx="96" cy="54" rx="28" ry="20" transform="rotate(14 96 54)" />
      <ellipse cx="96" cy="54" rx="23" ry="15.5" transform="rotate(14 96 54)" strokeWidth="0.9" />
      <g transform="translate(104, 28) rotate(14)">
        <polygon points="-9,0 -5,-7 5,-7 9,0 0,10" fill="#F8F4F6" strokeWidth="1.2" />
        <polyline points="-9,0 9,0" strokeWidth="0.8" />
        <polyline points="-5,-7 -2,0 0,10 2,0 5,-7" strokeWidth="0.8" />
        <line x1="0" y1="-12" x2="0" y2="-16" />
        <line x1="-10" y1="-9" x2="-13" y2="-12" />
        <line x1="10" y1="-9" x2="13" y2="-12" />
      </g>
    </g>
  </svg>
);

// ============================================================================
// 🎀 CUTE LUXURY HERO ARCH ORNAMENTS (Satin Bow Crest & Botanical Lavender Sprigs)
// ============================================================================

/** Delicate Parisian Satin Ribbon Bow Crest with Embossed Pearl Knot */
const HeroSatinBowCrest = () => (
  <svg
    viewBox="0 0 160 74"
    className="w-32 h-auto mx-auto overflow-visible select-none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="heroBowSilk" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF9FF" />
        <stop offset="45%" stopColor="#E9D5FF" />
        <stop offset="100%" stopColor="#C9A8E8" />
      </linearGradient>
      <linearGradient id="heroBowGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F2DCAA" />
        <stop offset="55%" stopColor="#C8A878" />
        <stop offset="100%" stopColor="#9E783B" />
      </linearGradient>
      <radialGradient id="heroBowPearl" cx="32%" cy="28%" r="70%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#F3E8FF" />
        <stop offset="100%" stopColor="#B89FD4" />
      </radialGradient>
    </defs>

    {/* Flowing Tapered Ribbon Tails */}
    <path
      d="M 76 30 C 66 44, 52 56, 38 68 C 44 65, 50 64, 54 67 C 62 55, 72 44, 79 34 Z"
      fill="url(#heroBowSilk)"
      stroke="#7B58A3"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
    <path
      d="M 84 30 C 94 44, 108 56, 122 68 C 116 65, 110 64, 106 67 C 98 55, 88 44, 81 34 Z"
      fill="url(#heroBowSilk)"
      stroke="#7B58A3"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />

    {/* Left & Right Sculpted Satin Loops */}
    <path
      d="M 77 28 C 60 6, 26 8, 22 26 C 18 42, 48 44, 76 31 Z"
      fill="url(#heroBowSilk)"
      stroke="#7B58A3"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path
      d="M 83 28 C 100 6, 134 8, 138 26 C 142 42, 112 44, 84 31 Z"
      fill="url(#heroBowSilk)"
      stroke="#7B58A3"
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* Inner Satin Fold & Champagne-Gold Highlight Lines */}
    <path
      d="M 73 28 C 58 17, 38 19, 34 27 C 39 33, 56 34, 73 29"
      fill="none"
      stroke="url(#heroBowGold)"
      strokeWidth="0.85"
      strokeLinecap="round"
    />
    <path
      d="M 87 28 C 102 17, 122 19, 126 27 C 121 33, 104 34, 87 29"
      fill="none"
      stroke="url(#heroBowGold)"
      strokeWidth="0.85"
      strokeLinecap="round"
    />

    {/* Center Knot + Tiny Embossed Pearl */}
    <rect
      x="73"
      y="22"
      width="14"
      height="13"
      rx="5"
      fill="url(#heroBowSilk)"
      stroke="#7B58A3"
      strokeWidth="0.95"
    />
    <circle
      cx="80"
      cy="28.5"
      r="4.2"
      fill="url(#heroBowPearl)"
      stroke="url(#heroBowGold)"
      strokeWidth="0.85"
    />
  </svg>
);

/** Soft Translucent Pastel-Lavender Rosebud & Botanical Sprig Accent */
const HeroBotanicalSprig = ({ flip = false, className = '' }) => (
  <svg
    viewBox="0 0 110 110"
    className={`pointer-events-none select-none ${className}`}
    style={{ transform: flip ? 'scaleX(-1) rotate(-8deg)' : 'rotate(6deg)' }}
    aria-hidden="true"
  >
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Graceful Curved Botanical Stem */}
      <path d="M 18 92 C 34 74, 54 50, 88 22" stroke="#8C6BAE" strokeWidth="1.05" strokeOpacity="0.6" />
      <path d="M 38 72 C 42 52, 54 38, 66 28" stroke="#9B7BC0" strokeWidth="0.85" strokeOpacity="0.5" />
      <path d="M 48 64 C 66 60, 80 50, 92 38" stroke="#9B7BC0" strokeWidth="0.85" strokeOpacity="0.5" />

      {/* Soft Lavender Leaves */}
      <path d="M 36 74 C 24 66, 22 52, 32 48 C 40 54, 42 66, 36 74 Z" fill="#E9D5FF" fillOpacity="0.55" stroke="#8B68B0" strokeWidth="0.7" />
      <path d="M 52 56 C 46 42, 54 30, 64 32 C 66 42, 60 52, 52 56 Z" fill="#F3E8FF" fillOpacity="0.62" stroke="#8B68B0" strokeWidth="0.7" />
      <path d="M 60 58 C 72 52, 84 56, 86 64 C 76 68, 66 64, 60 58 Z" fill="#E2CCF8" fillOpacity="0.52" stroke="#8B68B0" strokeWidth="0.7" />

      {/* Translucent Pastel-Purple Watercolor Rosebud */}
      <g transform="translate(32, 74)">
        <circle cx="0" cy="0" r="11" fill="#D8B4FE" fillOpacity="0.45" />
        <circle cx="-3" cy="-2" r="7.5" fill="#E9D5FF" fillOpacity="0.72" stroke="#7B58A3" strokeWidth="0.65" />
        <circle cx="3" cy="2" r="6.5" fill="#C084FC" fillOpacity="0.38" stroke="#7B58A3" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="3" fill="#FAF5FF" fillOpacity="0.9" />
      </g>

      {/* Dainty Lavender Blossom Tips */}
      {[
        { cx: 88, cy: 22, r: 4 },
        { cx: 81, cy: 27, r: 3.4 },
        { cx: 74, cy: 33, r: 3.2 },
        { cx: 66, cy: 28, r: 3.2 },
        { cx: 92, cy: 38, r: 3.4 },
      ].map((bud, idx) => (
        <circle
          key={idx}
          cx={bud.cx}
          cy={bud.cy}
          r={bud.r}
          fill={idx % 2 === 0 ? '#D8B4FE' : '#EFE2FA'}
          fillOpacity="0.82"
          stroke="#7B58A3"
          strokeWidth="0.6"
        />
      ))}

      {/* Tiny Champagne-Gold Sparkle */}
      <path
        d="M 76 16 Q 76.6 19.4 80 20 Q 76.6 20.6 76 24 Q 75.4 20.6 72 20 Q 75.4 19.4 76 16 Z"
        fill="#C8A878"
        fillOpacity="0.85"
      />
    </g>
  </svg>
);

// ============================================================================
// 👑 HAUTE-COUTURE HAND-POURED AUBERGINE-PLUM & BRUSHED CHAMPAGNE-GOLD WAX SEAL
// ============================================================================
const ArtisanalWaxSeal = ({ monogram, stage, isUnsealing, onTriggerOpen }) => {
  // Symmetrically balanced sculptural hand-poured molten wax silhouette around (100, 100)
  const moltenWaxPath =
    'M 100 13 C 119 12.5, 137 18.5, 152 29.5 C 166 39.5, 178.5 54, 183.5 72 C 187.5 87.5, 186.5 104, 185 119.5 C 183 137.5, 173 156, 157.5 168 C 142.5 179.5, 125.5 184.5, 107.5 186.5 C 89.5 188.5, 70.5 185.5, 54 176.5 C 37.5 167.5, 23.5 152.5, 18 134 C 13 117.5, 14.5 100.5, 14.5 83.5 C 14.5 65.5, 24 46, 39.5 33.5 C 54 22, 70.5 16.5, 87.5 13.8 C 92 13.1, 96 13, 100 13 Z';

  // Softly inset raised wax lip path for realistic pillowed rim catchlight
  const raisedLipPath =
    'M 100 19 C 117.5 18.5, 133.5 24, 147 34 C 160 43.5, 171.5 56.5, 175.8 73 C 179.5 87.5, 178.5 102.5, 177.2 117.5 C 175.5 134, 166.5 151, 152 162 C 138 172.5, 122.5 177, 106.5 179 C 89.5 181, 72 178.5, 57 170 C 42 162, 29 148, 24 131 C 19.5 115.5, 20.8 100, 20.8 84.5 C 20.8 68, 29.8 50, 44 38.5 C 57 28, 72.5 22.8, 88 20.2 C 92.2 19.5, 96 19.1, 100 19 Z';

  // Whisper-thin minimalist lower-arc laurel micro-leaves symmetrically flanking the date
  const lowerArcLeaves = [
    { x: 64.5, y: 127.5, rot: -146 },
    { x: 70.5, y: 134.0, rot: -132 },
    { x: 77.5, y: 139.0, rot: -116 },
  ];

  // Parse initials & ampersand so the monogram centers cleanly in Cormorant Garamond
  const monogramParts = monogram.split('&').map((part) => part.trim());
  const leftInitial = monogramParts[0] || 'H';
  const rightInitial = monogramParts[1] || 'A';

  return (
    <button
      type="button"
      onClick={onTriggerOpen}
      aria-label="Tap Wax Seal to Slowly Unfold Invitation"
      className={`lux-artisan-seal-btn ${isUnsealing ? 'is-pressed' : ''}`}
    >
      {/* Subtle Warm Champagne-Gold Breathing Halo in Stage 0 */}
      {stage === 0 && <span className="lux-seal-halo" />}

      {/* Soft GPU-Composited Warm Glow on Press */}
      <span className={`lux-seal-press-glow ${isUnsealing ? 'is-active' : ''}`} />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible select-none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="coutureWellClip">
            <circle cx="100" cy="100" r="63.5" />
          </clipPath>

          {/* Grounded Ambient Contact Shadow (Pure gradient, zero SVG filter cost) */}
          <radialGradient id="coutureContactShadow" cx="50%" cy="50%" r="50%">
            <stop offset="52%" stopColor="#1A0618" stopOpacity="0.52" />
            <stop offset="78%" stopColor="#22081D" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#22081D" stopOpacity="0" />
          </radialGradient>

          {/* Deep Velvety Royal Aubergine-Plum Wax Base (#4E1B42 -> #36102E -> #22081D) */}
          <radialGradient id="aubergineWaxBody" cx="32%" cy="26%" r="74%" fx="27%" fy="21%">
            <stop offset="0%" stopColor="#5C224F" />
            <stop offset="28%" stopColor="#4E1B42" />
            <stop offset="62%" stopColor="#36102E" />
            <stop offset="88%" stopColor="#22081D" />
            <stop offset="100%" stopColor="#160413" />
          </radialGradient>

          {/* Satin-Matte Studio Rim Highlight (Top-Left Soft Catchlight) */}
          <radialGradient id="aubergineSatinSheen" cx="26%" cy="20%" r="54%">
            <stop offset="0%" stopColor="#F3D9EC" stopOpacity="0.24" />
            <stop offset="40%" stopColor="#B073A0" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#22081D" stopOpacity="0" />
          </radialGradient>

          {/* Raised Molten Lip Bevel Lighting */}
          <linearGradient id="aubergineLipLight" x1="14%" y1="10%" x2="86%" y2="90%">
            <stop offset="0%" stopColor="#EBCBE2" stopOpacity="0.38" />
            <stop offset="30%" stopColor="#7C3C6D" stopOpacity="0.14" />
            <stop offset="72%" stopColor="#1A0516" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0E020C" stopOpacity="0.68" />
          </linearGradient>

          {/* Cleanly Recessed Circular Brass-Die Stamped Well */}
          <radialGradient id="aubergineWellGrad" cx="62%" cy="64%" r="65%">
            <stop offset="0%" stopColor="#4A183F" />
            <stop offset="52%" stopColor="#330E2B" />
            <stop offset="86%" stopColor="#22081D" />
            <stop offset="100%" stopColor="#170414" />
          </radialGradient>

          {/* Crisp Brass-Die Recessed Bevel */}
          <linearGradient id="aubergineWellBevel" x1="14%" y1="12%" x2="86%" y2="88%">
            <stop offset="0%" stopColor="#10020E" stopOpacity="0.92" />
            <stop offset="40%" stopColor="#260921" stopOpacity="0.22" />
            <stop offset="76%" stopColor="#7A3C6D" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#D7A7CB" stopOpacity="0.42" />
          </linearGradient>

          {/* Brushed Champagne-Gold Foil Primary (#F2DCAA -> #C9A462 -> #9E783B) */}
          <linearGradient id="brushedChampagneGold" x1="12%" y1="8%" x2="88%" y2="92%">
            <stop offset="0%" stopColor="#F2DCAA" />
            <stop offset="36%" stopColor="#DFC085" />
            <stop offset="60%" stopColor="#C9A462" />
            <stop offset="84%" stopColor="#EAD19C" />
            <stop offset="100%" stopColor="#9E783B" />
          </linearGradient>

          {/* Highlight Champagne-Gold for Crisp Letterpress Monogram */}
          <linearGradient id="brushedChampagneGoldLight" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FAF0D7" />
            <stop offset="40%" stopColor="#F2DCAA" />
            <stop offset="74%" stopColor="#C9A462" />
            <stop offset="100%" stopColor="#F3E2BC" />
          </linearGradient>

          {/* Whisper-Subtle Diagonal Satin Sheen Sweep */}
          <linearGradient id="coutureSatinSweep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="44%" stopColor="#F2DCAA" stopOpacity="0" />
            <stop offset="50%" stopColor="#FAF0D7" stopOpacity="0.24" />
            <stop offset="56%" stopColor="#E8D2E2" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. GROUNDED AMBIENT CONTACT SHADOW */}
        <ellipse cx="100" cy="108" rx="87" ry="85" fill="url(#coutureContactShadow)" />

        {/* 2. HAND-POURED VELVETY AUBERGINE-PLUM MOLTEN WAX BODY */}
        <path d={moltenWaxPath} fill="url(#aubergineWaxBody)" />
        <path d={moltenWaxPath} fill="url(#aubergineSatinSheen)" />

        {/* Soft Pillowed Outer Wax Lip Bevel */}
        <path
          d={raisedLipPath}
          fill="none"
          stroke="url(#aubergineLipLight)"
          strokeWidth="4.4"
          strokeLinejoin="round"
        />
        <path
          d={moltenWaxPath}
          fill="none"
          stroke="url(#aubergineLipLight)"
          strokeWidth="1"
          opacity="0.65"
        />

        {/* 3. CLEANLY RECESSED CIRCULAR BRASS-DIE STAMPED WELL */}
        <circle
          cx="100"
          cy="100"
          r="67.5"
          fill="none"
          stroke="#753967"
          strokeWidth="1.8"
          opacity="0.26"
        />
        <circle cx="100" cy="100" r="64" fill="url(#aubergineWellGrad)" />
        <circle
          cx="100"
          cy="100"
          r="63.2"
          fill="none"
          stroke="url(#aubergineWellBevel)"
          strokeWidth="3.2"
        />

        {/* 4. BRUSHED CHAMPAGNE-GOLD DOUBLE-HAIRLINE CIRCULAR FRAME */}
        <circle
          cx="100"
          cy="100"
          r="58.5"
          fill="none"
          stroke="url(#brushedChampagneGold)"
          strokeWidth="0.95"
          opacity="0.92"
        />
        <circle
          cx="100"
          cy="100"
          r="54"
          fill="none"
          stroke="url(#brushedChampagneGold)"
          strokeWidth="0.48"
          opacity="0.64"
        />

        {/* 5. SINGLE SHARP 4-POINT DIAMOND CREST AT 12 O'CLOCK */}
        <g transform="translate(100, 56)">
          <path
            d="M 0 -5 Q 0.7 -0.7 4.2 0 Q 0.7 0.7 0 5 Q -0.7 0.7 -4.2 0 Q -0.7 -0.7 0 -5 Z"
            transform="translate(0, 0.9)"
            fill="#12020F"
            opacity="0.7"
          />
          <path
            d="M 0 -5 Q 0.7 -0.7 4.2 0 Q 0.7 0.7 0 5 Q -0.7 0.7 -4.2 0 Q -0.7 -0.7 0 -5 Z"
            fill="url(#brushedChampagneGoldLight)"
          />
        </g>

        {/* 6. MINIMALIST WHISPER-THIN LOWER-ARC LAUREL MICRO-SPRIGS */}
        <g opacity="0.82">
          <path
            d="M 81 140.5 C 70.5 136.5, 62 128.5, 58 118.5"
            fill="none"
            stroke="url(#brushedChampagneGold)"
            strokeWidth="0.65"
            strokeLinecap="round"
          />
          <path
            d="M 119 140.5 C 129.5 136.5, 138 128.5, 142 118.5"
            fill="none"
            stroke="url(#brushedChampagneGold)"
            strokeWidth="0.65"
            strokeLinecap="round"
          />
          {lowerArcLeaves.map((leaf, idx) => (
            <g key={idx}>
              <path
                d="M 0 0 C -1.7 -2.1, -1.7 -5.0, 0 -6.8 C 1.7 -5.0, 1.7 -2.1, 0 0 Z"
                transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rot})`}
                fill="url(#brushedChampagneGold)"
              />
              <path
                d="M 0 0 C -1.7 -2.1, -1.7 -5.0, 0 -6.8 C 1.7 -5.0, 1.7 -2.1, 0 0 Z"
                transform={`translate(${200 - leaf.x}, ${leaf.y}) rotate(${-leaf.rot})`}
                fill="url(#brushedChampagneGold)"
              />
            </g>
          ))}
        </g>

        {/* 7. SUBTLE WIDE-TRACKED CHAMPAGNE-GOLD DATE ENGRAVING AT BOTTOM ARC */}
        <text
          x="100"
          y="138.8"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#12020F"
          opacity="0.7"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '5.8px',
            fontWeight: 500,
            letterSpacing: '0.24em',
          }}
        >
          10 · 12 · 26
        </text>
        <text
          x="100"
          y="138"
          textAnchor="middle"
          dominantBaseline="central"
          fill="url(#brushedChampagneGoldLight)"
          opacity="0.92"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '5.8px',
            fontWeight: 500,
            letterSpacing: '0.24em',
          }}
        >
          10 · 12 · 26
        </text>

        {/* 8. SYMMETRICALLY CENTERED LETTERPRESS CHAMPAGNE-GOLD MONOGRAM ("H & A") */}
        <g>
          <text
            x="100.5"
            y="101.6"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#12020F"
            opacity="0.88"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '33px',
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            <tspan>{leftInitial}</tspan>
            <tspan
              style={{
                fontStyle: 'italic',
                fontSize: '23px',
                fontWeight: 400,
              }}
              dx="3"
              dy="1"
            >
              &amp;
            </tspan>
            <tspan dx="3" dy="-1">
              {rightInitial}
            </tspan>
          </text>
          <text
            x="99.6"
            y="99.6"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#FFFDF5"
            opacity="0.42"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '33px',
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            <tspan>{leftInitial}</tspan>
            <tspan
              style={{
                fontStyle: 'italic',
                fontSize: '23px',
                fontWeight: 400,
              }}
              dx="3"
              dy="1"
            >
              &amp;
            </tspan>
            <tspan dx="3" dy="-1">
              {rightInitial}
            </tspan>
          </text>
          <text
            x="100"
            y="100.4"
            textAnchor="middle"
            dominantBaseline="central"
            fill="url(#brushedChampagneGoldLight)"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '33px',
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            <tspan>{leftInitial}</tspan>
            <tspan
              style={{
                fontStyle: 'italic',
                fontSize: '23px',
                fontWeight: 400,
              }}
              dx="3"
              dy="1"
            >
              &amp;
            </tspan>
            <tspan dx="3" dy="-1">
              {rightInitial}
            </tspan>
          </text>
        </g>

        {/* 9. IDLE SUBTLE DIAGONAL SATIN SHEEN SWEEP */}
        {stage === 0 && (
          <g clipPath="url(#coutureWellClip)" className="pointer-events-none">
            <rect
              x="-190"
              y="20"
              width="140"
              height="160"
              fill="url(#coutureSatinSweep)"
              className="lux-seal-sheen-bar"
            />
          </g>
        )}
      </svg>
    </button>
  );
};

// ============================================================================
// 💌 MULTI-STAGE CEREMONIAL 3D PEARL, RIBBON & LACE ENVELOPE CHOREOGRAPHY
// ============================================================================
const EnvelopeIntroOverlay = ({ stage, onTriggerOpen, monogram }) => {
  // Multi-Stage Slow Royal Choreography:
  // stage 0: Idle closed envelope with silk ribbon bow & breathing wax seal
  // stage 1: Wax seal presses, glows & silk ribbons untie
  // stage 2: Top & Bottom pleated lace flaps slowly fold open in 3D space
  // stage 3: Left & Right satin wings + inner sheer lavender vellum doors part + floating petals
  // stage 4: Complete & hidden
  const isUnsealing = stage >= 1;
  const isTopBottomParting = stage >= 2;
  const isSideFlapsParting = stage >= 3;
  const isHidden = stage >= 4;

  const openingPetals = [
    { id: 1, left: '18%', top: '52%', tx: '-95px', ty: '-180px', rot: '-65deg', delay: '200ms', variant: 0, size: 32 },
    { id: 2, left: '78%', top: '48%', tx: '90px', ty: '-165px', rot: '75deg', delay: '450ms', variant: 1, size: 30 },
    { id: 3, left: '32%', top: '62%', tx: '-110px', ty: '140px', rot: '-45deg', delay: '700ms', variant: 2, size: 28 },
    { id: 4, left: '68%', top: '60%', tx: '105px', ty: '155px', rot: '55deg', delay: '950ms', variant: 0, size: 34 },
    { id: 5, left: '48%', top: '38%', tx: '0px', ty: '-210px', rot: '25deg', delay: '350ms', variant: 1, size: 36 },
    { id: 6, left: '52%', top: '68%', tx: '15px', ty: '195px', rot: '-30deg', delay: '600ms', variant: 0, size: 32 },
    { id: 7, left: '25%', top: '40%', tx: '-130px', ty: '-40px', rot: '-80deg', delay: '850ms', variant: 1, size: 26 },
    { id: 8, left: '75%', top: '42%', tx: '130px', ty: '-35px', rot: '80deg', delay: '1100ms', variant: 2, size: 28 },
  ];

  return (
    <div
      className={`lux-envelope-overlay ${isUnsealing ? 'is-opening' : ''}`}
      style={{
        pointerEvents: stage === 0 ? 'auto' : 'none',
        visibility: isHidden ? 'hidden' : 'visible',
      }}
    >
      {/* Ambient Pastel-Purple Glow & Shadow Backdrop */}
      <div
        className={`lux-envelope-backdrop ${isUnsealing ? 'is-unsealing' : ''} ${
          isSideFlapsParting ? 'is-fading' : ''
        }`}
      />

      {/* INNER SHEER PASTEL PURPLE TULLE / VELLUM CURTAIN (No backdrop-blur for 60fps) */}
      <div className={`lux-vellum-door lux-vellum-left ${isSideFlapsParting ? 'is-open' : ''}`}>
        <div
          className="w-full h-full border-r border-white/65"
          style={{
            background:
              'linear-gradient(90deg, rgba(222, 201, 242, 0.94) 0%, rgba(234, 220, 248, 0.86) 58%, rgba(246, 240, 252, 0.72) 100%)',
          }}
        />
      </div>
      <div className={`lux-vellum-door lux-vellum-right ${isSideFlapsParting ? 'is-open' : ''}`}>
        <div
          className="w-full h-full border-l border-white/65"
          style={{
            background:
              'linear-gradient(270deg, rgba(222, 201, 242, 0.94) 0%, rgba(234, 220, 248, 0.86) 58%, rgba(246, 240, 252, 0.72) 100%)',
          }}
        />
      </div>

      {/* FLOATING PASTEL PURPLE BLOSSOMS DRIFTING DURING OPENING */}
      {isTopBottomParting && !isHidden && (
        <div className="absolute inset-0 pointer-events-none z-35 overflow-hidden">
          {openingPetals.map((petal) => (
            <div
              key={petal.id}
              className="lux-opening-petal"
              style={{
                left: petal.left,
                top: petal.top,
                '--tx': petal.tx,
                '--ty': petal.ty,
                '--rot': petal.rot,
                animationDelay: petal.delay,
              }}
            >
              <PurpleFlowerSVG variant={petal.variant} size={petal.size} noShadow />
            </div>
          ))}
        </div>
      )}

      {/* LEFT PLEATED SATIN & LACE FLAP (Built-in SVG crease shadow) */}
      <div className={`lux-flap lux-flap-left ${isSideFlapsParting ? 'is-open' : ''}`}>
        <svg viewBox="0 0 200 400" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="leftSatinGrad" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#E4D7EE" />
              <stop offset="45%" stopColor="#F0E6F7" />
              <stop offset="80%" stopColor="#D6C2E6" />
              <stop offset="100%" stopColor="#C1A8D6" />
            </linearGradient>
          </defs>
          <polygon points="0,0 118,200 0,400" fill="rgba(48, 16, 76, 0.14)" />
          <polygon points="0,0 112,200 0,400" fill="url(#leftSatinGrad)" />
          <line x1="0" y1="35" x2="112" y2="200" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />
          <line x1="0" y1="90" x2="112" y2="200" stroke="#A68BBF" strokeWidth="0.9" strokeOpacity="0.45" />
          <line x1="0" y1="150" x2="112" y2="200" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.8" />
          <line x1="0" y1="250" x2="112" y2="200" stroke="#A68BBF" strokeWidth="0.9" strokeOpacity="0.45" />
          <line x1="0" y1="320" x2="112" y2="200" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />
          <path d="M 0 0 L 112 200 L 0 400" fill="none" stroke="#FBF8FE" strokeWidth="6" strokeDasharray="6 4" />
          <path d="M 0 6 L 106 200 L 0 394" fill="none" stroke="#9476B0" strokeWidth="1.2" strokeDasharray="2 3" />
        </svg>
        <Pearl size={10} style={{ top: '26%', left: '16%' }} delay={100} isOpening={isUnsealing} />
        <Pearl size={12} style={{ top: '44%', left: '28%' }} delay={400} isOpening={isUnsealing} />
        <Pearl size={9} style={{ top: '54%', left: '12%' }} delay={700} isOpening={isUnsealing} />
        <Pearl size={11} style={{ top: '68%', left: '20%' }} delay={250} isOpening={isUnsealing} />
        <Pearl size={8} style={{ top: '36%', left: '8%' }} delay={550} isOpening={isUnsealing} />
      </div>

      {/* RIGHT PLEATED SATIN & LACE FLAP (Built-in SVG crease shadow) */}
      <div className={`lux-flap lux-flap-right ${isSideFlapsParting ? 'is-open' : ''}`}>
        <svg viewBox="0 0 200 400" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="rightSatinGrad" x1="100%" y1="0%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#E4D7EE" />
              <stop offset="45%" stopColor="#F0E6F7" />
              <stop offset="80%" stopColor="#D6C2E6" />
              <stop offset="100%" stopColor="#C1A8D6" />
            </linearGradient>
          </defs>
          <polygon points="200,0 82,200 200,400" fill="rgba(48, 16, 76, 0.14)" />
          <polygon points="200,0 88,200 200,400" fill="url(#rightSatinGrad)" />
          <line x1="200" y1="35" x2="88" y2="200" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />
          <line x1="200" y1="90" x2="88" y2="200" stroke="#A68BBF" strokeWidth="0.9" strokeOpacity="0.45" />
          <line x1="200" y1="150" x2="88" y2="200" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.8" />
          <line x1="200" y1="250" x2="88" y2="200" stroke="#A68BBF" strokeWidth="0.9" strokeOpacity="0.45" />
          <line x1="200" y1="320" x2="88" y2="200" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />
          <path d="M 200 0 L 88 200 L 200 400" fill="none" stroke="#FBF8FE" strokeWidth="6" strokeDasharray="6 4" />
          <path d="M 200 6 L 94 200 L 200 394" fill="none" stroke="#9476B0" strokeWidth="1.2" strokeDasharray="2 3" />
        </svg>
        <Pearl size={10} style={{ top: '26%', right: '16%' }} delay={200} isOpening={isUnsealing} />
        <Pearl size={12} style={{ top: '44%', right: '28%' }} delay={500} isOpening={isUnsealing} />
        <Pearl size={9} style={{ top: '54%', right: '12%' }} delay={800} isOpening={isUnsealing} />
        <Pearl size={11} style={{ top: '68%', right: '20%' }} delay={350} isOpening={isUnsealing} />
        <Pearl size={8} style={{ top: '36%', right: '8%' }} delay={650} isOpening={isUnsealing} />
      </div>

      {/* BOTTOM PLEATED SATIN & CHANTILLY LACE FLAP (Built-in SVG crease shadow) */}
      <div className={`lux-flap lux-flap-bottom ${isTopBottomParting ? 'is-open' : ''}`}>
        <svg viewBox="0 0 300 300" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="bottomSatinGrad" x1="50%" y1="100%" x2="50%" y2="40%">
              <stop offset="0%" stopColor="#D5C0E5" />
              <stop offset="52%" stopColor="#EDE2F6" />
              <stop offset="100%" stopColor="#FAF6FE" />
            </linearGradient>
          </defs>
          <polygon points="0,300 150,124 300,300" fill="rgba(48, 16, 76, 0.14)" />
          <polygon points="0,300 150,132 300,300" fill="url(#bottomSatinGrad)" />
          <line x1="150" y1="132" x2="25" y2="300" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.8" />
          <line x1="150" y1="132" x2="65" y2="300" stroke="#A68BBF" strokeWidth="1.1" strokeOpacity="0.5" />
          <line x1="150" y1="132" x2="105" y2="300" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.9" />
          <line x1="150" y1="132" x2="150" y2="300" stroke="#A68BBF" strokeWidth="1" strokeOpacity="0.45" />
          <line x1="150" y1="132" x2="195" y2="300" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.9" />
          <line x1="150" y1="132" x2="235" y2="300" stroke="#A68BBF" strokeWidth="1.1" strokeOpacity="0.5" />
          <line x1="150" y1="132" x2="275" y2="300" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.8" />
          <path d="M 0 300 L 150 132 L 300 300" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeDasharray="7 4" />
          <path d="M 10 300 L 150 142 L 290 300" fill="none" stroke="#9476B0" strokeWidth="1.3" strokeDasharray="3 3" />
        </svg>
        <Pearl size={12} style={{ bottom: '38%', left: '48%' }} delay={150} isOpening={isUnsealing} />
        <Pearl size={10} style={{ bottom: '28%', left: '34%' }} delay={320} isOpening={isUnsealing} />
        <Pearl size={11} style={{ bottom: '27%', right: '32%' }} delay={480} isOpening={isUnsealing} />
        <Pearl size={9} style={{ bottom: '18%', left: '22%' }} delay={620} isOpening={isUnsealing} />
        <Pearl size={12} style={{ bottom: '19%', left: '44%' }} delay={210} isOpening={isUnsealing} />
        <Pearl size={10} style={{ bottom: '16%', right: '24%' }} delay={540} isOpening={isUnsealing} />
        <Pearl size={9} style={{ bottom: '9%', left: '56%' }} delay={790} isOpening={isUnsealing} />
        <Pearl size={10} style={{ bottom: '11%', left: '30%' }} delay={410} isOpening={isUnsealing} />
      </div>

      {/* TOP PLEATED SATIN & CHANTILLY LACE FLAP (Carries the Wax Seal Upward) */}
      <div className={`lux-flap lux-flap-top ${isTopBottomParting ? 'is-open' : ''}`}>
        <div className="relative w-full h-full">
          <svg
            viewBox="0 0 300 300"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 60%)' }}
          >
            <defs>
              <linearGradient id="topSatinGrad" x1="50%" y1="0%" x2="50%" y2="60%">
                <stop offset="0%" stopColor="#D5C0E5" />
                <stop offset="52%" stopColor="#EDE2F6" />
                <stop offset="100%" stopColor="#FBF8FF" />
              </linearGradient>
            </defs>
            <polygon points="0,0 300,0 150,178" fill="rgba(48, 16, 76, 0.16)" />
            <polygon points="0,0 300,0 150,168" fill="url(#topSatinGrad)" />
            <line x1="150" y1="168" x2="25" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.8" />
            <line x1="150" y1="168" x2="65" y2="0" stroke="#A68BBF" strokeWidth="1.1" strokeOpacity="0.5" />
            <line x1="150" y1="168" x2="105" y2="0" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.9" />
            <line x1="150" y1="168" x2="150" y2="0" stroke="#A68BBF" strokeWidth="1" strokeOpacity="0.45" />
            <line x1="150" y1="168" x2="195" y2="0" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.9" />
            <line x1="150" y1="168" x2="235" y2="0" stroke="#A68BBF" strokeWidth="1.1" strokeOpacity="0.5" />
            <line x1="150" y1="168" x2="275" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.8" />
            <path d="M 0 0 L 150 168 L 300 0" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeDasharray="7 4" />
            <path d="M 10 0 L 150 158 L 290 0" fill="none" stroke="#9476B0" strokeWidth="1.3" strokeDasharray="3 3" />
          </svg>

          {/* Studded 3D Pearls on Top Flap */}
          <Pearl size={11} style={{ top: '34%', left: '47%' }} delay={120} isOpening={isUnsealing} />
          <Pearl size={9} style={{ top: '25%', left: '32%' }} delay={290} isOpening={isUnsealing} />
          <Pearl size={12} style={{ top: '24%', right: '31%' }} delay={460} isOpening={isUnsealing} />
          <Pearl size={9} style={{ top: '14%', left: '20%' }} delay={640} isOpening={isUnsealing} />
          <Pearl size={11} style={{ top: '16%', left: '53%' }} delay={330} isOpening={isUnsealing} />
          <Pearl size={10} style={{ top: '12%', right: '22%' }} delay={510} isOpening={isUnsealing} />
          <Pearl size={8} style={{ top: '8%', left: '38%' }} delay={720} isOpening={isUnsealing} />

          {/* PASTEL LAVENDER SILK RIBBONS & HAUTE-COUTURE WAX SEAL */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-30"
            style={{ top: '52%' }}
          >
            <div className={`lux-silk-ribbon lux-silk-ribbon-left ${isUnsealing ? 'is-untied' : ''}`} />
            <div className={`lux-silk-ribbon lux-silk-ribbon-right ${isUnsealing ? 'is-untied' : ''}`} />

            {isUnsealing && <span className="lux-seal-burst" />}
            {isUnsealing && <span className="lux-seal-burst-secondary" />}

            <ArtisanalWaxSeal
              monogram={monogram}
              stage={stage}
              isUnsealing={isUnsealing}
              onTriggerOpen={onTriggerOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 🏛️ MAIN LUXURY INVITATION APPLICATION
// ============================================================================
export default function App() {
  // Multi-Stage Ceremonial Unfolding & Pastel Purple Color Morph State:
  // 0 = Closed Envelope Idle
  // 1 = Wax seal slowly presses, glows & silk ribbon unties + Pastel Purple bloom begins
  // 2 = Top & Bottom pleated lace flaps slowly fold open in 3D space
  // 3 = Left & Right satin wings + sheer lavender vellum doors part slowly
  // 4 = Envelope overlay complete & hidden
  const [introStage, setIntroStage] = useState(0);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [isPastelPurpleTheme, setIsPastelPurpleTheme] = useState(false);

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mobileShowcaseMode] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'vercel' | 'map' | null

  // Live Countdown State (Target: December 10, 2026 at 6:00 PM)
  const [timeLeft, setTimeLeft] = useState({ days: 25, hours: 17, minutes: 0, seconds: 0 });
  const timeoutsRef = useRef([]);

  const clearChoreographyTimers = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Live Countdown Timer to December 10, 2026 6:00 PM
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
      audioEngine.stop();
    };
  }, []);

  // Slow, Multi-Stage Ceremonial Unfolding + Smooth Conversion to Pastel Purple
  const handleTriggerOpenEnvelope = () => {
    if (introStage !== 0) return;
    clearChoreographyTimers();

    setIntroStage(1);
    setIsPastelPurpleTheme(true);
    audioEngine.playSealChime();
    if (!isPlayingMusic) {
      audioEngine.start();
      setIsPlayingMusic(true);
    }

    timeoutsRef.current.push(
      setTimeout(() => {
        setIntroStage(2);
      }, 1800)
    );

    timeoutsRef.current.push(
      setTimeout(() => {
        setIntroStage(3);
      }, 3200)
    );

    timeoutsRef.current.push(
      setTimeout(() => {
        setHeroRevealed(true);
      }, 6500)
    );

    timeoutsRef.current.push(
      setTimeout(() => {
        setIntroStage(4);
      }, 11200)
    );
  };

  // Replay Envelope Choreography Anytime
  const handleReplayEnvelope = () => {
    clearChoreographyTimers();
    const scrollContainer = document.getElementById('invitation-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHeroRevealed(false);
    setIsPastelPurpleTheme(false);
    setIntroStage(0);
  };

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    showToast(`${label} copied to clipboard`);
  };

  const isEnvelopeLocked = introStage < 4;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-x-hidden bg-[#1D102B] text-[#3B1E54] selection:bg-[#6B3FA0] selection:text-[#FAF5FF]">
      {/* Preload Google Fonts reliably */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500&family=Pinyon+Script&display=swap"
      />

      {/* ====================================================================
          CLEAN, GPU-COMPOSITED 60FPS LUXURY CSS
      ==================================================================== */}
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
          font-family: 'Pinyon Script', 'Great Vibes', cursive;
        }
        .font-sans-clean {
          font-family: 'Montserrat', sans-serif;
        }

        /* GPU-Composited Surface Morph via Opacity-Only Pseudo-Element */
        .bg-invitation-surface {
          position: relative;
          background-color: #EAE0E4;
          background-image:
            radial-gradient(at 50% 0%, rgba(255, 255, 255, 0.85) 0px, transparent 70%),
            radial-gradient(at 15% 50%, rgba(238, 226, 232, 0.85) 0px, transparent 60%),
            radial-gradient(at 85% 90%, rgba(212, 194, 204, 0.55) 0px, transparent 65%);
        }

        .bg-invitation-surface::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          will-change: opacity;
          background-color: #E9DDF4;
          background-image:
            radial-gradient(at 50% 0%, rgba(252, 248, 255, 0.92) 0px, transparent 68%),
            radial-gradient(at 15% 35%, rgba(226, 208, 248, 0.88) 0px, transparent 62%),
            radial-gradient(at 85% 75%, rgba(211, 187, 242, 0.78) 0px, transparent 65%),
            radial-gradient(at 50% 100%, rgba(234, 218, 250, 0.85) 0px, transparent 70%);
          transition: opacity 4200ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .bg-invitation-surface.pastel-purple-active::before {
          opacity: 1;
        }

        .bg-invitation-surface > section,
        .bg-invitation-surface > footer {
          position: relative;
          z-index: 1;
        }

        .bg-regal-burgundy {
          background: radial-gradient(circle at 50% 22%, #5D2E86 0%, #461E68 58%, #2E1147 100%);
        }

        /* 3D Specular Pearl Bead (Pure GPU transform/opacity, paused while opening) */
        .luxury-pearl {
          display: inline-block;
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
          user-select: none;
          background: radial-gradient(circle at 30% 28%, #FFFFFF 0%, #FDFBFF 26%, #EADCF5 62%, #BEA8D4 88%, #866B9E 100%);
          box-shadow:
            0 4px 8px rgba(42, 14, 68, 0.34),
            0 1px 2px rgba(42, 14, 68, 0.22),
            inset -1.5px -1.5px 3px rgba(255, 255, 255, 0.9);
          will-change: transform, opacity;
          animation: pearlBreathe 4.2s ease-in-out infinite;
        }

        .luxury-pearl.is-paused,
        .lux-envelope-overlay.is-opening .luxury-pearl {
          animation-play-state: paused;
        }

        @keyframes pearlBreathe {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.94;
          }
          50% {
            transform: translate3d(0, -1.5px, 0) scale(1.08);
            opacity: 1;
          }
        }

        /* Envelope Overlay Container */
        .lux-envelope-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100dvh;
          max-height: 100%;
          z-index: 45;
          overflow: hidden;
          perspective: 1800px;
          contain: layout style paint;
        }

        @media (min-width: 640px) {
          .phone-frame-active .lux-envelope-overlay {
            height: 100%;
            border-radius: 40px;
          }
        }

        .lux-envelope-backdrop {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(126, 78, 168, 0.28), rgba(34, 10, 56, 0.62));
          will-change: opacity;
          transition: opacity 7000ms cubic-bezier(0.45, 0, 0.2, 1);
        }
        .lux-envelope-backdrop.is-unsealing {
          opacity: 0.85;
        }
        .lux-envelope-backdrop.is-fading {
          opacity: 0;
        }

        /* Inner Sheer Pastel-Purple Vellum Doors — Pure GPU Transform & Opacity */
        .lux-vellum-door {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 51%;
          z-index: 8;
          pointer-events: none;
          will-change: transform, opacity;
          backface-visibility: hidden;
          contain: layout style paint;
          transition:
            transform 7500ms cubic-bezier(0.45, 0, 0.2, 1),
            opacity 7000ms ease-in-out;
        }
        .lux-vellum-left {
          left: 0;
          transform-origin: left center;
        }
        .lux-vellum-right {
          right: 0;
          transform-origin: right center;
        }
        .lux-vellum-left.is-open {
          transform: translate3d(-102%, 0, 0) rotateY(-18deg);
          opacity: 0;
        }
        .lux-vellum-right.is-open {
          transform: translate3d(102%, 0, 0) rotateY(18deg);
          opacity: 0;
        }

        /* Pastel Lavender Silk Ribbons */
        .lux-silk-ribbon {
          position: absolute;
          top: 50%;
          width: 190px;
          height: 24px;
          margin-top: -12px;
          background: linear-gradient(180deg, #F5EBFF 0%, #D8B4FE 52%, #B689E8 100%);
          box-shadow: 0 6px 16px rgba(59, 30, 84, 0.28), inset 0 1px 2px rgba(255, 255, 255, 0.9);
          pointer-events: none;
          z-index: -1;
          will-change: transform, opacity;
          backface-visibility: hidden;
          transition:
            transform 2200ms cubic-bezier(0.45, 0, 0.2, 1),
            opacity 2000ms ease-in-out;
        }
        .lux-silk-ribbon-left {
          right: 45%;
          border-radius: 999px 0 0 999px;
          transform-origin: right center;
        }
        .lux-silk-ribbon-right {
          left: 45%;
          border-radius: 0 999px 999px 0;
          transform-origin: left center;
        }
        .lux-silk-ribbon-left.is-untied {
          transform: translate3d(-140px, 0, 0) scaleY(0.65) rotate(-12deg);
          opacity: 0;
        }
        .lux-silk-ribbon-right.is-untied {
          transform: translate3d(140px, 0, 0) scaleY(0.65) rotate(12deg);
          opacity: 0;
        }

        /* Floating Pastel Purple Petals Drifting During Opening */
        .lux-opening-petal {
          position: absolute;
          opacity: 0;
          will-change: transform, opacity;
          backface-visibility: hidden;
          animation: openingPetalFloat 7200ms cubic-bezier(0.45, 0, 0.2, 1) forwards;
        }
        @keyframes openingPetalFloat {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.25) rotate(0deg);
          }
          22% {
            opacity: 0.95;
            transform: translate3d(calc(var(--tx) * 0.45), calc(var(--ty) * 0.45), 0) scale(1.08) rotate(calc(var(--rot) * 0.5));
          }
          75% {
            opacity: 0.85;
            transform: translate3d(var(--tx), var(--ty), 0) scale(1) rotate(var(--rot));
          }
          100% {
            opacity: 0;
            transform: translate3d(calc(var(--tx) * 1.25), calc(var(--ty) * 1.25), 0) scale(0.8) rotate(calc(var(--rot) * 1.3));
          }
        }

        /* 4 PLEATED SATIN & LACE FLAPS (GPU-Only, Zero CSS filter drop-shadow) */
        .lux-flap {
          position: absolute;
          inset: 0;
          will-change: transform, opacity;
          backface-visibility: hidden;
          contain: layout style paint;
          transition:
            transform 7500ms cubic-bezier(0.45, 0, 0.2, 1),
            opacity 7000ms ease-in-out;
        }

        .lux-flap-left {
          z-index: 15;
          transition-delay: 0ms;
        }
        .lux-flap-left.is-open {
          transform: translate3d(-108%, 0, 0) rotateY(-28deg) scale(0.96);
          opacity: 0;
        }

        .lux-flap-right {
          z-index: 15;
          transition-delay: 280ms;
        }
        .lux-flap-right.is-open {
          transform: translate3d(108%, 0, 0) rotateY(28deg) scale(0.96);
          opacity: 0;
        }

        .lux-flap-bottom {
          z-index: 22;
          transition-delay: 350ms;
        }
        .lux-flap-bottom.is-open {
          transform: translate3d(0, 108%, 0) rotateX(-24deg) scale(0.96);
          opacity: 0;
        }

        .lux-flap-top {
          z-index: 30;
          transition-delay: 0ms;
        }
        .lux-flap-top.is-open {
          transform: translate3d(0, -108%, 0) rotateX(24deg) scale(0.96);
          opacity: 0;
        }

        /* HAUTE-COUTURE HAND-POURED WAX SEAL BUTTON (~122px) */
        .lux-artisan-seal-btn {
          position: relative;
          width: 122px;
          height: 122px;
          padding: 0;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          will-change: transform;
          transition: transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .lux-artisan-seal-btn:hover {
          transform: translate3d(0, -1px, 0) scale(1.035);
        }
        .lux-artisan-seal-btn.is-pressed {
          transform: translate3d(0, 3px, 0) scale(0.92) rotate(-2.5deg);
        }

        .lux-seal-press-glow {
          position: absolute;
          inset: -16px;
          border-radius: 9999px;
          pointer-events: none;
          opacity: 0;
          will-change: opacity, transform;
          background: radial-gradient(circle, rgba(242, 220, 170, 0.62) 0%, rgba(201, 164, 98, 0.3) 45%, rgba(192, 132, 252, 0.14) 72%, transparent 88%);
          transition: opacity 900ms ease, transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
          transform: scale(0.85);
        }
        .lux-seal-press-glow.is-active {
          opacity: 1;
          transform: scale(1.22);
        }

        /* Idle Diagonal Satin Sheen Across Recessed Wax Well */
        .lux-seal-sheen-bar {
          will-change: transform, opacity;
          animation: sealSpecularGlide 5.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes sealSpecularGlide {
          0%, 62% {
            transform: translate3d(0, 0, 0);
            opacity: 0;
          }
          70% {
            opacity: 1;
          }
          94% {
            transform: translate3d(380px, 0, 0);
            opacity: 1;
          }
          100% {
            transform: translate3d(380px, 0, 0);
            opacity: 0;
          }
        }

        /* Subtle Champagne-Gold Breathing Halo & Shimmer Bursts */
        .lux-seal-halo {
          position: absolute;
          inset: -6px;
          border-radius: 9999px;
          border: 1px solid rgba(242, 220, 170, 0.65);
          will-change: transform, opacity;
          animation: sealPulseHalo 3.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          pointer-events: none;
        }
        @keyframes sealPulseHalo {
          0% {
            transform: scale(0.93);
            opacity: 0.78;
          }
          100% {
            transform: scale(1.26);
            opacity: 0;
          }
        }

        .lux-seal-burst {
          position: absolute;
          width: 160px;
          height: 160px;
          border-radius: 9999px;
          will-change: transform, opacity;
          background: radial-gradient(circle, rgba(250, 240, 215, 0.88) 0%, rgba(201, 164, 98, 0.48) 40%, rgba(192, 132, 252, 0.24) 68%, transparent 85%);
          animation: sealBurstAnim 2200ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }
        .lux-seal-burst-secondary {
          position: absolute;
          width: 176px;
          height: 176px;
          border-radius: 9999px;
          will-change: transform, opacity;
          border: 1.5px solid rgba(242, 220, 170, 0.78);
          animation: sealBurstRingAnim 2600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }
        @keyframes sealBurstAnim {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(3.2);
            opacity: 0;
          }
        }
        @keyframes sealBurstRingAnim {
          0% {
            transform: scale(0.65);
            opacity: 0.95;
          }
          100% {
            transform: scale(3.8);
            opacity: 0;
          }
        }

        /* Hero Staggered Cascade — Pure GPU Transform + Opacity (Zero blur) */
        .lux-hero-item {
          opacity: 0;
          transform: translate3d(0, 26px, 0) scale(0.97);
          will-change: transform, opacity;
          transition:
            opacity 2200ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 2200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lux-hero-item.is-revealed {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        /* Purple Flower Burst & Countdown Number Pop Animations */
        .purple-flower-particle {
          position: absolute;
          opacity: 0;
          will-change: transform, opacity;
          animation: purpleFlowerBloom 2800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes purpleFlowerBloom {
          0% {
            opacity: 0;
            transform: translate3d(0, 20px, 0) scale(0.15) rotate(0deg);
          }
          28% {
            opacity: 1;
            transform: translate3d(var(--tx), var(--ty), 0) scale(var(--sc)) rotate(var(--rot));
          }
          75% {
            opacity: 0.95;
            transform: translate3d(var(--tx), calc(var(--ty) - 10px), 0) scale(var(--sc)) rotate(calc(var(--rot) + 12deg));
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--tx), calc(var(--ty) - 22px), 0) scale(calc(var(--sc) * 0.85)) rotate(calc(var(--rot) + 20deg));
          }
        }

        .corner-flower-pop {
          opacity: 0;
          animation: cornerFlowerIn 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes cornerFlowerIn {
          0% {
            opacity: 0;
            transform: scale(0.2) rotate(-35deg);
          }
          100% {
            opacity: 0.92;
            transform: scale(1) rotate(0deg);
          }
        }

        .date-number-rise {
          animation: dateNumberRise 1100ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes dateNumberRise {
          0% {
            opacity: 0;
            transform: translate3d(0, 20px, 0) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .countdown-digit-pop {
          animation: countdownDigitPop 1000ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes countdownDigitPop {
          0% {
            opacity: 0;
            transform: translate3d(0, 26px, 0) scale(0.68);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        /* Scroll-Triggered Reveal Animations — Pure GPU Transform + Opacity */
        .lux-reveal {
          opacity: 0;
          will-change: transform, opacity;
          transition:
            opacity 1150ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1150ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .lux-reveal-fade-up {
          transform: translate3d(0, 32px, 0);
        }
        .lux-reveal-scale {
          transform: translate3d(0, 22px, 0) scale(0.95);
        }
        .lux-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        /* Continuous Gentle Floating & Candle Twinkle Animations */
        .lux-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        @keyframes floatSlow {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -5px, 0);
          }
        }

        .lux-twinkle {
          animation: candleTwinkle 2.4s ease-in-out infinite;
          transform-origin: center bottom;
        }
        @keyframes candleTwinkle {
          0%, 100% {
            opacity: 0.35;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.85;
            transform: scaleY(1.18);
          }
        }
      `}</style>

      {/* ====================================================================
          TOP FLOATING CONTROL BAR
      ==================================================================== */}
      {introStage <= 0 && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B0916]/90 backdrop-blur-md border border-[#F4EEF1]/20 text-[#F4EEF1] shadow-2xl text-xs font-sans-clean whitespace-nowrap">
          <button
            onClick={handleReplayEnvelope}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-white/15 transition cursor-pointer"
            title="Tap Wax Seal to Open"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F2D5E0]" />
            <span>Tap Seal Below</span>
          </button>
        </div>
      )}

      {/* ====================================================================
          TOAST NOTIFICATION BANNER
      ==================================================================== */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#380B1B]/95 text-[#F4EEF1] border border-[#F4EEF1]/30 shadow-2xl text-xs font-sans-clean tracking-wide flex items-center gap-2 animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-[#F2D5E0]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================
          MAIN INVITATION VIEWPORT
      ==================================================================== */}
      <div
        id="invitation-scroll-container"
        className={`relative w-full mx-auto bg-invitation-surface overflow-x-hidden ${
          isPastelPurpleTheme ? 'pastel-purple-active' : ''
        } ${
          mobileShowcaseMode
            ? 'phone-frame-active sm:max-w-[430px] sm:my-14 sm:rounded-[48px] sm:shadow-[0_30px_85px_rgba(0,0,0,0.85)] sm:border-[8px] sm:border-[#2B163D]'
            : 'max-w-xl'
        } ${
          isEnvelopeLocked
            ? 'h-[100dvh] sm:h-[844px] overflow-y-hidden'
            : 'min-h-[100dvh]'
        }`}
      >
        {/* MULTI-STAGE 3D PEARL & LACE ENVELOPE OVERLAY */}
        <EnvelopeIntroOverlay
          stage={introStage}
          onTriggerOpen={handleTriggerOpenEnvelope}
          monogram={WEDDING_CONFIG.couple.monogram}
        />

        {/* ==================================================================
            SECTION 1: MINIMALIST LUXURY STATIONERY HERO (CONCAVE GOLD FRAME)
        ================================================================== */}
        <section
          className="relative min-h-[100dvh] sm:min-h-[828px] flex flex-col items-center justify-center px-8 py-14 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 50% 34%, rgba(255, 253, 250, 0.96) 0%, rgba(251, 249, 253, 0.72) 48%, rgba(247, 242, 250, 0.92) 100%), linear-gradient(180deg, #FBF9FD 0%, #F7F2FA 55%, #F9F5FC 100%)',
          }}
        >
          {/* Subtle bottom fade blending into Section 2 */}
          <div
            className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none select-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(249, 245, 252, 0) 0%, rgba(233, 221, 244, 0.42) 100%)',
            }}
          />

          {/* Signature Double-Line Concave-Cornered Champagne-Gold Frame */}
          <div className="absolute inset-4 sm:inset-5 pointer-events-none select-none">
            {/* Connecting Outer & Inner Hairlines (Unstretched at any aspect ratio) */}
            <div className="absolute top-0 left-[20px] right-[20px] h-[1px] bg-[#C9AE7A]" />
            <div className="absolute bottom-0 left-[20px] right-[20px] h-[1px] bg-[#C9AE7A]" />
            <div className="absolute left-0 top-[20px] bottom-[20px] w-[1px] bg-[#C9AE7A]" />
            <div className="absolute right-0 top-[20px] bottom-[20px] w-[1px] bg-[#C9AE7A]" />

            <div className="absolute top-[5px] left-[24px] right-[24px] h-[1px] bg-[#DFCBA2]" />
            <div className="absolute bottom-[5px] left-[24px] right-[24px] h-[1px] bg-[#DFCBA2]" />
            <div className="absolute left-[5px] top-[24px] bottom-[24px] w-[1px] bg-[#DFCBA2]" />
            <div className="absolute right-[5px] top-[24px] bottom-[24px] w-[1px] bg-[#DFCBA2]" />

            {/* 4 Concave-Notched Quarter-Circle Corners with Nestled Gold Diamonds */}
            {[
              { pos: 'top-0 left-0', rot: '0deg' },
              { pos: 'top-0 right-0', rot: '90deg' },
              { pos: 'bottom-0 right-0', rot: '180deg' },
              { pos: 'bottom-0 left-0', rot: '270deg' },
            ].map((corner, idx) => (
              <svg
                key={idx}
                width="28"
                height="28"
                viewBox="0 0 28 28"
                className={`absolute ${corner.pos}`}
                style={{ transform: `rotate(${corner.rot})` }}
                aria-hidden="true"
              >
                {/* Outer concave quarter-circle notch */}
                <path
                  d="M 0.5 20 A 19.5 19.5 0 0 0 20 0.5"
                  fill="none"
                  stroke="#C9AE7A"
                  strokeWidth="1"
                />
                {/* Inner parallel concave quarter-circle notch */}
                <path
                  d="M 5.5 24 A 18.5 18.5 0 0 0 24 5.5"
                  fill="none"
                  stroke="#DFCBA2"
                  strokeWidth="1"
                />
                {/* Delicate gold diamond accent nestled along the concave corner */}
                <polygon
                  points="13.8,10.8 16.8,13.8 13.8,16.8 10.8,13.8"
                  fill="#C9AE7A"
                />
              </svg>
            ))}
          </div>

          {/* Staggered Editorial Stationery Content */}
          <div className="relative z-10 w-full max-w-[300px] mx-auto flex flex-col items-center justify-between text-center py-6 sm:py-8 min-h-[76dvh] sm:min-h-[710px]">
            {/* 1. Top Diamond Divider Ornament (— · ◇ · —) */}
            <div
              style={{ transitionDelay: '120ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } flex items-center justify-center gap-2`}
            >
              <span className="w-8 sm:w-9 h-[1px] bg-[#C9AE7A]/75" />
              <span className="w-1 h-1 rounded-full bg-[#C9AE7A]/80" />
              <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0" aria-hidden="true">
                <polygon
                  points="8,1 14,8 8,15 2,8"
                  fill="none"
                  stroke="#C9AE7A"
                  strokeWidth="0.95"
                />
                <polygon
                  points="8,4.6 10.9,8 8,11.4 5.1,8"
                  fill="#C9AE7A"
                  fillOpacity="0.45"
                  stroke="#C9AE7A"
                  strokeWidth="0.6"
                />
              </svg>
              <span className="w-1 h-1 rounded-full bg-[#C9AE7A]/80" />
              <span className="w-8 sm:w-9 h-[1px] bg-[#C9AE7A]/75" />
            </div>

            {/* 2. Header Tagline */}
            <div
              style={{ transitionDelay: '480ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } flex items-center justify-center gap-3 w-full mt-5`}
            >
              <span className="w-6 sm:w-8 h-[1px] bg-[#C9AE7A]/80 shrink-0" />
              <p className="font-sans-clean text-[9px] sm:text-[9.5px] tracking-[0.26em] uppercase text-[#5B4B66] whitespace-nowrap">
                {WEDDING_CONFIG.couple.tagline}
              </p>
              <span className="w-6 sm:w-8 h-[1px] bg-[#C9AE7A]/80 shrink-0" />
            </div>

            {/* 3. Bride & Groom Names + Ampersand */}
            <div
              style={{ transitionDelay: '900ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } flex flex-col items-center my-5`}
            >
              <h1 className="font-serif-editorial text-[44px] sm:text-[50px] font-normal tracking-[0.06em] text-[#2A1935] leading-none">
                {WEDDING_CONFIG.couple.bride}
              </h1>

              <div className="flex items-center justify-center gap-3.5 my-3.5">
                <span className="w-8 sm:w-10 h-[1px] bg-[#C9AE7A]/80" />
                <span className="font-serif-editorial italic text-2xl text-[#B89658] leading-none">
                  &amp;
                </span>
                <span className="w-8 sm:w-10 h-[1px] bg-[#C9AE7A]/80" />
              </div>

              <h1 className="font-serif-editorial text-[44px] sm:text-[50px] font-normal tracking-[0.06em] text-[#2A1935] leading-none">
                {WEDDING_CONFIG.couple.groom}
              </h1>
            </div>

            {/* 4. Invitation Subtitle */}
            <p
              style={{ transitionDelay: '1320ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } font-serif-editorial italic text-[15px] sm:text-[16px] text-[#5E4E69] leading-relaxed mb-6`}
            >
              Joyfully invite you to celebrate their
              <br />
              engagement
            </p>

            {/* 5. Architectural 3-Column Date & Time Grid */}
            <div
              style={{ transitionDelay: '1740ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } w-full max-w-[290px] border-y border-[#D4BC8E]/80 py-5`}
            >
              <div className="grid grid-cols-3 items-center">
                {/* Left Column: Day of Week */}
                <div className="px-1 text-center">
                  <span className="font-sans-clean text-[9px] sm:text-[9.5px] tracking-[0.22em] uppercase text-[#5B4B66]">
                    THURSDAY
                  </span>
                </div>

                {/* Center Column: Month / Day / Year */}
                <div className="border-x border-[#D4BC8E]/60 px-2 py-0.5 flex flex-col items-center justify-center">
                  <span className="font-sans-clean text-[9px] sm:text-[9.5px] tracking-[0.22em] uppercase text-[#B39154] mb-1">
                    DECEMBER
                  </span>
                  <span className="font-serif-editorial text-[34px] sm:text-[38px] leading-none text-[#2A1935] font-normal">
                    10
                  </span>
                  <span className="font-sans-clean text-[10px] tracking-[0.22em] text-[#5B4B66] mt-1">
                    2026
                  </span>
                </div>

                {/* Right Column: Time */}
                <div className="px-1 text-center">
                  <span className="font-sans-clean text-[9px] sm:text-[9.5px] tracking-[0.22em] uppercase text-[#5B4B66]">
                    6:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* 6. Venue Block */}
            <div
              style={{ transitionDelay: '2160ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } mt-6 mb-4`}
            >
              <p className="font-serif-editorial text-[26px] sm:text-[28px] text-[#2A1935] tracking-[0.04em] leading-tight">
                {WEDDING_CONFIG.venue.name}
              </p>
              <p className="font-sans-clean text-[9.5px] tracking-[0.3em] uppercase text-[#B39154] mt-1.5">
                MADURAI &middot; INDIA
              </p>
            </div>

            {/* 7. Bottom Scroll Cue */}
            <div
              style={{ transitionDelay: '2580ms' }}
              className={`lux-hero-item ${
                heroRevealed ? 'is-revealed' : ''
              } mt-4 flex flex-col items-center`}
            >
              <span className="font-sans-clean text-[8.5px] tracking-[0.32em] uppercase text-[#B59C72]">
                SCROLL
              </span>
              <span className="w-[1px] h-7 bg-gradient-to-b from-[#C9AE7A] to-transparent mt-2" />
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 2: INVITATION STATEMENT & KISSING SWANS
        ================================================================== */}
        <section className="relative px-8 pt-8 pb-16 text-center">
          <RevealOnScroll variant="scale">
            <SwansIllustration />
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#4A1222] mt-4 mb-4 leading-tight">
              Together with their
              <br />
              families
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={280}>
            <p className="font-sans-clean text-xs sm:text-[13px] leading-relaxed text-[#4A1222]/85 max-w-xs mx-auto font-light">
              {WEDDING_CONFIG.couple.invitationText}
            </p>
          </RevealOnScroll>
        </section>

        {/* ==================================================================
            SECTION 3: SCRATCH TO REVEAL THE DATE & COUNTDOWN WITH PURPLE FLOWERS
        ================================================================== */}
        <section className="relative bg-regal-burgundy text-[#F4EEF1]">
          <ScallopedLaceDivider position="top" />

          <div className="px-6 py-12 text-center overflow-hidden">
            <RevealOnScroll variant="scale">
              <h2 className="font-serif-editorial text-3xl sm:text-4xl tracking-wide mb-2 text-[#F4EEF1]">
                Countdown
              </h2>
              <p className="font-sans-clean text-[10px] tracking-[0.22em] uppercase text-[#E9D5FF]/80 mb-6">
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
            SECTION 4: LOCATION — MAHAL
        ================================================================== */}
        <section className="px-8 py-14 text-center">
          <RevealOnScroll>
            <h2 className="font-serif-editorial text-4xl text-[#4A1222] mb-2">Location</h2>
            <p className="font-script text-4xl text-[#4A1222] my-1">
              {WEDDING_CONFIG.venue.name}
            </p>
            <p className="font-sans-clean text-[10px] tracking-[0.28em] uppercase text-[#4A1222]/75 mb-6">
              {WEDDING_CONFIG.venue.cityCountry}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <p className="font-sans-clean text-xs leading-relaxed text-[#4A1222]/85 max-w-xs mx-auto mb-4 font-light">
              {WEDDING_CONFIG.venue.description1}
            </p>
            <p className="font-sans-clean text-xs leading-relaxed text-[#4A1222]/85 max-w-xs mx-auto font-light">
              {WEDDING_CONFIG.venue.description2}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={250} variant="scale">
            <VillaAureliaOvalIllustration />
          </RevealOnScroll>

          <RevealOnScroll delay={350}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <button
                onClick={() => window.open(WEDDING_CONFIG.venue.mapsUrl, '_blank')}
                className="px-8 py-3 rounded-full border border-[#4A1222]/60 text-[#4A1222] font-sans-clean text-[10px] tracking-[0.25em] uppercase hover:bg-[#4A1222] hover:text-[#F4EEF1] transition cursor-pointer"
              >
                Open Google Maps
              </button>
            </div>
          </RevealOnScroll>
        </section>

        {/* ==================================================================
            SECTION 5: THE DAY — DECEMBER 10, 2026 (3 EVENTS)
        ================================================================== */}
        <section className="pt-4 pb-8 text-center">
          <RevealOnScroll>
            <HangingGarlandIllustration />

            <div className="px-6">
              <h2 className="font-serif-editorial text-4xl text-[#4A1222] mb-1">The Day</h2>
              <p className="font-sans-clean text-[10px] tracking-[0.26em] uppercase text-[#4A1222]/80 font-medium mb-2">
                {WEDDING_CONFIG.date.displayFull}
              </p>
              <p className="font-sans-clean text-xs text-[#4A1222]/75 font-light mb-10">
                An evening of love, rings, and celebration.
              </p>
            </div>
          </RevealOnScroll>

          <div className="px-6">
            <div className="relative max-w-xs mx-auto text-left">
              <div className="absolute left-[46%] top-3 bottom-3 w-[1px] bg-[#4A1222]/35" />

              {WEDDING_CONFIG.timeline.map((item, idx) => (
                <RevealOnScroll key={idx} delay={idx * 160}>
                  <div className="relative grid grid-cols-12 items-start mb-10 last:mb-0">
                    <div className="col-span-5 flex items-center justify-end pr-3 gap-1.5">
                      <div className="shrink-0">
                        <TimelineIcon type={item.icon} />
                      </div>
                      <span className="font-serif-editorial text-base sm:text-lg text-[#4A1222] whitespace-nowrap font-medium">
                        {item.time}
                      </span>
                    </div>

                    <div className="col-span-1 flex justify-center pt-5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4A1222] ring-4 ring-[#EAE0E4]" />
                    </div>

                    <div className="col-span-6 pl-2 pt-0.5">
                      <span className="block font-sans-clean text-[8px] tracking-[0.2em] uppercase text-[#763C4E] mb-0.5">
                        {item.dateLabel}
                      </span>
                      <h3 className="font-sans-clean text-[11px] font-medium tracking-[0.18em] uppercase text-[#4A1222] mb-1">
                        {item.title}
                      </h3>
                      <p className="font-sans-clean text-[11px] leading-relaxed text-[#4A1222]/80 font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <RevealOnScroll delay={220}>
            <BanquetTableIllustration />
          </RevealOnScroll>
        </section>

        {/* ==================================================================
            FINAL SECTION: WE CAN'T WAIT TO CELEBRATE WITH YOU
        ================================================================== */}
        <footer className="px-6 pt-12 pb-16 text-center">
          <RevealOnScroll variant="scale">
            <WeddingRingsIllustration />
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <p className="font-serif-editorial text-2xl sm:text-3xl text-[#4A1222] mb-6 leading-snug">
              We can&apos;t wait to celebrate with you.
            </p>

            <p className="font-sans-clean text-xs text-[#4A1222]/75 font-light mb-2">
              With love,
            </p>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#4A1222] tracking-wide mb-3">
              {WEDDING_CONFIG.couple.bride}{' '}
              <span className="font-script text-3xl mx-1">&amp;</span>{' '}
              {WEDDING_CONFIG.couple.groom}
            </h2>

            <p className="font-sans-clean text-xs tracking-[0.2em] uppercase text-[#4A1222]/85 mb-8">
              {WEDDING_CONFIG.date.displayFull}
            </p>

            <div className="mb-8">
              <button
                type="button"
                onClick={handleReplayEnvelope}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#4A1222]/45 text-[#4A1222] font-sans-clean text-[10px] tracking-[0.22em] uppercase hover:bg-[#4A1222] hover:text-[#F4EEF1] transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Seal &amp; Envelope Opening</span>
              </button>
            </div>
          </RevealOnScroll>
        </footer>
      </div>

      {/* ====================================================================
          MODALS (Interactive Map Preview & Vercel Guide)
      ==================================================================== */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-[#F5EFF2] text-[#4A1222] border border-[#4A1222]/25 p-6 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#4A1222]/10 flex items-center justify-center hover:bg-[#4A1222]/20 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {activeModal === 'map' && (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#4A1222]/10 mx-auto flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#4A1222]" />
                </div>
                <h3 className="font-serif-editorial text-3xl">{WEDDING_CONFIG.venue.name}</h3>
                <p className="font-sans-clean text-xs text-[#4A1222]/80">
                  {WEDDING_CONFIG.venue.address}
                </p>
                <div className="p-4 rounded-2xl bg-[#EAE0E4] border border-[#4A1222]/15 text-xs font-sans-clean space-y-2 text-left">
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Welcome at 6:00 PM · Engagement Ceremony · 7:00 PM Dinner</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 shrink-0" />
                    <span>{WEDDING_CONFIG.venue.cityCountry}</span>
                  </p>
                </div>
                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={() => copyToClipboard(WEDDING_CONFIG.venue.address, 'Venue Address')}
                    className="px-4 py-2.5 rounded-full border border-[#4A1222]/40 text-[10px] font-sans-clean uppercase tracking-widest hover:bg-[#4A1222]/10 transition cursor-pointer"
                  >
                    Copy Address
                  </button>
                  <a
                    href={WEDDING_CONFIG.venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#4A1222] text-[#F4EEF1] text-[10px] font-sans-clean uppercase tracking-widest flex items-center gap-1.5 hover:bg-[#350A16] transition"
                  >
                    <span>Open Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {activeModal === 'vercel' && (
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#4A1222] text-[#F4EEF1] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif-editorial text-2xl leading-none">
                      Customize &amp; Deploy to Vercel
                    </h3>
                    <p className="font-sans-clean text-[11px] text-[#4A1222]/70">
                      Ready for instant production hosting
                    </p>
                  </div>
                </div>

                <div className="space-y-3 font-sans-clean text-xs text-[#4A1222]/85 leading-relaxed">
                  <div className="p-3 rounded-xl bg-[#EAE0E4] border border-[#4A1222]/15">
                    <p className="font-semibold text-[#4A1222] mb-1">
                      1. Edit Wedding Details in One Place
                    </p>
                    <p className="text-[11px]">
                      Open <code className="px-1 py-0.5 rounded bg-white/70">App.jsx</code> and
                      update the <code className="px-1 py-0.5 rounded bg-white/70">WEDDING_CONFIG</code>{' '}
                      object at the top of the file.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EAE0E4] border border-[#4A1222]/15">
                    <p className="font-semibold text-[#4A1222] mb-1">
                      2. Deploy to Vercel in 60 Seconds
                    </p>
                    <p className="text-[11px]">
                      Push this React project to GitHub and import it on{' '}
                      <span className="underline">vercel.com/new</span>.
                    </p>
                  </div>
                </div>

                <div className="text-right pt-1">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2 rounded-full bg-[#4A1222] text-[#F4EEF1] font-sans-clean text-[10px] uppercase tracking-widest cursor-pointer"
                  >
                    Got It
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}