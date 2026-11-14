import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, Calendar, MapPin, Volume2, VolumeX, 
  ChevronRight, RotateCcw, Eye, Download, 
  ExternalLink, Clock, Wand2
} from 'lucide-react';

// ==========================================
// 1. AMBIENT WEB AUDIO SYNTHESIZER (Zero-Dependency Luxury Soundscape)
// ==========================================
class LuxuryAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.chordIndex = 0;
    // Dreamy Maj7 / Maj9 pastel chord progressions (Frequencies in Hz)
    this.chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
      [196.00, 246.94, 293.66, 392.00, 440.00], // G6
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBellNote(freq, delay = 0, duration = 4.2, volume = 0.032) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc2.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now); // Soft octave harmonic

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(volume * 0.25, now);
    osc2Gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

    osc.connect(gain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  playSparkleChime() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 987.77, 1174.66, 1318.51];
    notes.forEach((n, idx) => {
      this.playBellNote(n, idx * 0.08, 2.2, 0.04);
    });
  }

  playWaxSealSound() {
    this.init();
    this.playBellNote(392.00, 0, 1.8, 0.045);
    this.playBellNote(523.25, 0.12, 2.4, 0.05);
    this.playBellNote(659.25, 0.25, 3.0, 0.045);
  }

  startAmbient() {
    this.init();
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.triggerArpeggio();
      this.intervalId = setInterval(() => {
        if (this.isPlaying) this.triggerArpeggio();
      }, 4500);
    }
    return true;
  }

  toggleAmbient() {
    this.init();
    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      return this.startAmbient();
    }
  }

  triggerArpeggio() {
    const chord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;
    chord.forEach((freq, idx) => {
      this.playBellNote(freq, idx * 0.38, 4.3, 0.024);
    });
  }

  stopAmbient() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

const audioEngine = new LuxuryAudioEngine();

// ==========================================
// 2. LUXURY INVITATION DATA (CHENNAI MINI HALL CEREMONY)
// ==========================================
const COUPLE_DATA = {
  groomFirst: 'Adharsh',
  groom: 'Adharsh Sandeep',
  groomParents: 'S/o Mr. Reghuraman & Mrs. Vijayakumari',
  brideFirst: 'Harini',
  bride: 'Harini Suresh',
  brideParents: 'D/o Mr. Suresh & Mrs. Devika',
  familyHeader: 'Smt. & Sri. Reghuraman & Suresh Families',
  monogram: 'A & H',
  ceremonyTitle: 'Engagement Ceremony',
  dayOfWeek: 'Thursday',
  dateOnly: 'December 10, 2026',
  dateString: 'Thursday, December 10, 2026',
  shortDate: '10 . 12 . 2026',
  timeString: '6:00 PM Onwards',
  isoStart: '20261210T180000',
  isoEnd: '20261210T213000',
  targetTimestamp: new Date('2026-12-10T18:00:00+05:30').getTime(),
  venueName: 'BCS Mini Hall',
  venueSub: '61 A, P T Rajan Road, Narimedu, Madurai, Tamil Nadu 625002',
  mapsUrl: 'https://maps.app.goo.gl/wWeaTQGdWRQHxHNR8',
};

// ==========================================
// 3. SCRATCH-TO-REVEAL ("ERASE THE DATE") COMPONENT
// ==========================================
const ScratchToRevealDate = ({ onRevealComplete, isRevealed, setIsRevealed }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [sparkles, setSparkles] = useState([]);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 344, hours: 18, mins: 42, secs: 19 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, COUPLE_DATA.targetTimestamp - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, mins, secs });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Draw luxury champagne-lavender & gold metallic foil onto canvas
  const initFoilCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // 1. Metallic Champagne-Lavender & Soft Gold Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#E5D6F2');
    grad.addColorStop(0.28, '#D6C2EC');
    grad.addColorStop(0.52, '#F7F1FC');
    grad.addColorStop(0.76, '#C8A97E');
    grad.addColorStop(1, '#DFD0F0');

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // 2. Subtle Diagonal Foil Shimmer Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
    ctx.lineWidth = 1;
    for (let i = -rect.height; i < rect.width + rect.height; i += 14) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - rect.height * 0.5, rect.height);
      ctx.stroke();
    }

    // 3. Delicate Inner Border on Foil
    ctx.strokeStyle = 'rgba(110, 75, 158, 0.32)';
    ctx.lineWidth = 1.25;
    ctx.strokeRect(12, 12, rect.width - 24, rect.height - 24);

    // 4. Foil Embossed Typography Instruction
    ctx.fillStyle = '#3A2852';
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ CLICK OR DRAG TO SCRATCH FOIL ✦', rect.width / 2, rect.height / 2 - 14);

    ctx.font = 'italic 22px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#3A2852';
    ctx.fillText('Erase to Reveal Our Date', rect.width / 2, rect.height / 2 + 15);

    ctx.font = '500 9px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(58, 40, 82, 0.72)';
    ctx.fillText('SHIMMERING LAVENDER & CHAMPAGNE FOIL', rect.width / 2, rect.height / 2 + 38);

    setScratchPercent(0);
    setIsRevealed(false);
  }, [setIsRevealed]);

  useEffect(() => {
    const timer = setTimeout(initFoilCanvas, 40);
    window.addEventListener('resize', initFoilCanvas);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', initFoilCanvas);
    };
  }, [initFoilCanvas]);

  const triggerCelebrationBurst = useCallback(() => {
    audioEngine.playSparkleChime();
    const newSparkles = Array.from({ length: 22 }).map((_, i) => ({
      id: Date.now() + i,
      left: 14 + Math.random() * 72,
      top: 14 + Math.random() * 72,
      size: 11 + Math.random() * 14,
      delay: Math.random() * 0.35,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 2400);
  }, []);

  const calculateScratchedArea = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    if (!width || !height) return;

    const imageData = ctx.getImageData(0, 0, width, height).data;
    let transparentPixels = 0;
    let totalSampled = 0;

    for (let i = 3; i < imageData.length; i += 48) {
      totalSampled++;
      if (imageData[i] < 128) {
        transparentPixels++;
      }
    }

    const percent = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));
    setScratchPercent(percent);

    if (percent >= 48 && !isRevealed) {
      setIsRevealed(true);
      setScratchPercent(100);
      triggerCelebrationBurst();
      if (onRevealComplete) onRevealComplete();
    }
  }, [isRevealed, onRevealComplete, setIsRevealed, triggerCelebrationBurst]);

  const eraseAtPoint = (clientX, clientY, isNewStroke = false) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';

    const brushRadius = 32;

    if (!isNewStroke && lastPointRef.current) {
      ctx.beginPath();
      ctx.lineWidth = brushRadius * 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    const radial = ctx.createRadialGradient(x, y, brushRadius * 0.35, x, y, brushRadius);
    radial.addColorStop(0, 'rgba(0,0,0,1)');
    radial.addColorStop(0.85, 'rgba(0,0,0,0.95)');
    radial.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();

    lastPointRef.current = { x, y };
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (isRevealed) return;
    isDrawingRef.current = true;
    if (e.currentTarget.setPointerCapture && e.pointerId !== undefined) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore pointer capture errors
      }
    }
    eraseAtPoint(e.clientX, e.clientY, true);
    calculateScratchedArea();
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (!isDrawingRef.current || isRevealed) return;
    eraseAtPoint(e.clientX, e.clientY, false);
    calculateScratchedArea();
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      lastPointRef.current = null;
      calculateScratchedArea();
    }
  };

  const handleInstantReveal = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    triggerCelebrationBurst();
  };

  return (
    <div
      className="w-full flex flex-col items-center"
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Scratch Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[310px] sm:max-w-[340px] h-56 sm:h-60 rounded-2xl overflow-hidden border border-[#C3ADE6]/70 shadow-inner bg-[#FCF9FF] select-none"
      >
        {/* Revealed Date & Countdown Underneath Foil */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-[#F8F5FC] via-[#FDFBFF] to-[#EFE8F8]">
          <div className="text-[10px] uppercase tracking-[0.26em] text-[#6E4B9E] font-medium">
            {COUPLE_DATA.dayOfWeek}
          </div>
          <div className="font-serif text-2xl sm:text-3xl text-[#3A2852] tracking-wide font-medium my-0.5">
            {COUPLE_DATA.dateOnly}
          </div>
          <div className="text-[11px] font-serif italic text-[#6E4B9E] mb-2">
            Muhurtham: {COUPLE_DATA.timeString} • Chennai
          </div>

          <div className="w-10 h-[1px] bg-[#C3ADE6] mb-2.5" />

          {/* Live Countdown Matrix */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full max-w-[260px]">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.mins },
              { label: 'Secs', val: timeLeft.secs },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/90 border border-[#E4D7F5] rounded-xl py-1.5 px-1 shadow-sm"
              >
                <div className="font-serif text-base sm:text-lg text-[#3A2852] font-semibold leading-tight">
                  {String(item.val).padStart(2, '0')}
                </div>
                <div className="text-[8px] uppercase tracking-[0.18em] text-[#8E6BBF]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Shimmering Foil Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Sparkle Particle Burst Overlay */}
        {sparkles.map((sp) => (
          <div
            key={sp.id}
            style={{
              left: `${sp.left}%`,
              top: `${sp.top}%`,
              animationDelay: `${sp.delay}s`,
            }}
            className="absolute pointer-events-none animate-ping text-[#8E6BBF]"
          >
            <Sparkles size={sp.size} />
          </div>
        ))}
      </div>

      {/* Progress & Instant Reveal Controls */}
      <div className="w-full max-w-[310px] sm:max-w-[340px] flex items-center justify-between mt-2.5 px-1 text-xs text-[#6E4B9E]">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8E6BBF]" />
          <span className="tracking-wider uppercase text-[9px] font-medium">
            {isRevealed ? 'Date Unlocked ✦' : `Scratched: ${scratchPercent}%`}
          </span>
        </div>

        <div>
          {!isRevealed ? (
            <button
              type="button"
              onClick={handleInstantReveal}
              className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#6E4B9E] hover:text-[#3A2852] transition-colors font-semibold"
            >
              <Eye size={12} /> Reveal Instantly
            </button>
          ) : (
            <button
              type="button"
              onClick={initFoilCanvas}
              className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#6E4B9E] hover:text-[#3A2852] transition-colors font-semibold"
            >
              <RotateCcw size={12} /> Reset Foil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isSealOpening, setIsSealOpening] = useState(false);
  const [isDateRevealed, setIsDateRevealed] = useState(false);
  // Ambient sound is ON by default
  const [soundEnabled, setSoundEnabled] = useState(true);
  const hasAutoStartedAudio = useRef(false);

  // Swipe / Drag State for 4-Card Deck
  const [dragStartX, setDragStartX] = useState(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);

  const totalCards = 4;

  // Load Cormorant Garamond & Plus Jakarta Sans Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  // Automatically start ambient harp sound on load or first user interaction
  useEffect(() => {
    try {
      audioEngine.startAmbient();
    } catch {
      // Browser autoplay policy may wait for first interaction
    }

    const unlockAudioOnGesture = () => {
      if (!hasAutoStartedAudio.current && soundEnabled) {
        hasAutoStartedAudio.current = true;
        audioEngine.startAmbient();
      }
    };

    window.addEventListener('pointerdown', unlockAudioOnGesture, { once: true });
    window.addEventListener('touchstart', unlockAudioOnGesture, { once: true });
    window.addEventListener('keydown', unlockAudioOnGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudioOnGesture);
      window.removeEventListener('touchstart', unlockAudioOnGesture);
      window.removeEventListener('keydown', unlockAudioOnGesture);
      audioEngine.stopAmbient();
    };
  }, [soundEnabled]);

  // Card Navigation Helpers
  const goToCard = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(totalCards - 1, index));
      setCurrentCard(clamped);
    },
    [totalCards]
  );

  const nextCard = useCallback(() => {
    if (currentCard < totalCards - 1) {
      goToCard(currentCard + 1);
    }
  }, [currentCard, totalCards, goToCard]);

  const prevCard = useCallback(() => {
    if (currentCard > 0) {
      goToCard(currentCard - 1);
    }
  }, [currentCard, goToCard]);

  // Keyboard Left/Right Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard]);

  // Interactive 3D Wax Seal Opener (Card 0 -> Card 1)
  const handleOpenWaxSeal = (e) => {
    if (e) e.stopPropagation();
    audioEngine.playWaxSealSound();
    if (soundEnabled && !audioEngine.isPlaying) {
      audioEngine.startAmbient();
    }
    setIsSealOpening(true);
    setTimeout(() => {
      setIsSealOpening(false);
      setCurrentCard(1);
    }, 520);
  };

  // Ambient Sound Toggle
  const handleToggleAudio = () => {
    hasAutoStartedAudio.current = true;
    const active = audioEngine.toggleAmbient();
    setSoundEnabled(active);
  };

  // Card Swipe Gesture Handlers
  const handleDeckTouchStart = (e) => {
    if (['BUTTON', 'CANVAS', 'A'].includes(e.target.tagName)) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDeckTouchMove = (e) => {
    if (dragStartX === null) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = clientX - dragStartX;
    setDragOffsetX(Math.max(-130, Math.min(130, delta)));
  };

  const handleDeckTouchEnd = () => {
    if (dragStartX === null) return;
    if (dragOffsetX < -50 && currentCard < totalCards - 1) {
      nextCard();
    } else if (dragOffsetX > 50 && currentCard > 0) {
      prevCard();
    }
    setDragStartX(null);
    setDragOffsetX(0);
  };

  // Calendar Exporter (.ICS Download & Google Calendar Link)
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aarav and Meera//Luxury Engagement Ceremony//EN',
      'BEGIN:VEVENT',
      `DTSTART:${COUPLE_DATA.isoStart}`,
      `DTEND:${COUPLE_DATA.isoEnd}`,
      `SUMMARY:${COUPLE_DATA.groomFirst} & ${COUPLE_DATA.brideFirst}'s ${COUPLE_DATA.ceremonyTitle}`,
      'DESCRIPTION:Muhurtham, Ring Exchange & Celebratory Dinner in Chennai.',
      `LOCATION:${COUPLE_DATA.venueName}, ${COUPLE_DATA.venueSub}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aarav-Meera-Engagement-Chennai.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      `${COUPLE_DATA.groomFirst} & ${COUPLE_DATA.brideFirst} — ${COUPLE_DATA.ceremonyTitle}`
    );
    const dates = `${COUPLE_DATA.isoStart}/${COUPLE_DATA.isoEnd}`;
    const location = encodeURIComponent(`${COUPLE_DATA.venueName}, ${COUPLE_DATA.venueSub}`);
    const details = encodeURIComponent(
      'We cordially invite you to share in our joy as we exchange rings and celebrate our engagement in Chennai.'
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&location=${location}&details=${details}`;
  };

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="min-h-screen w-full bg-[#F8F5FC] text-[#3A2852] flex flex-col justify-between relative overflow-hidden select-none"
    >
      {/* Custom Luxury Editorial Typography & Animation CSS */}
      <style>{`
        .font-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        @keyframes floatPetal {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.65; }
          85% { opacity: 0.65; }
          100% { transform: translateY(105vh) translateX(42px) rotate(320deg); opacity: 0; }
        }
        .petal-anim {
          animation: floatPetal linear infinite;
        }
        .paper-grain {
          background-image: radial-gradient(rgba(142, 107, 191, 0.08) 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>

      {/* Ambient Pastel Purple / Wisteria Orbs in Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-28 -left-28 w-96 h-96 rounded-full bg-[#EFE8F8] blur-3xl" />
        <div className="absolute top-1/3 -right-28 w-96 h-96 rounded-full bg-[#E4D7F5]/80 blur-3xl" />
        <div className="absolute -bottom-28 left-1/4 w-96 h-96 rounded-full bg-[#EFE8F8] blur-3xl" />
        <div className="absolute inset-0 paper-grain" />
      </div>

      {/* Always-On Floating Pastel Lavender Botanical Petals */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
        {[
          { left: '8%', dur: '16s', delay: '0s', size: 14, color: '#D6C2EC' },
          { left: '23%', dur: '21s', delay: '3s', size: 17, color: '#E4D7F5' },
          { left: '44%', dur: '18s', delay: '6s', size: 13, color: '#B79CE0' },
          { left: '65%', dur: '22s', delay: '1.5s', size: 16, color: '#D6C2EC' },
          { left: '81%', dur: '19s', delay: '4.5s', size: 15, color: '#B79CE0' },
          { left: '92%', dur: '17s', delay: '7.5s', size: 12, color: '#E4D7F5' },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              left: p.left,
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
            className="absolute -top-10 petal-anim"
          >
            <svg width={p.size} height={p.size * 1.3} viewBox="0 0 24 32" fill="none">
              <path
                d="M12 0C18 8 24 16 18 26C14 32 10 32 6 26C0 16 6 8 12 0Z"
                fill={p.color}
                fillOpacity="0.75"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* ==========================================
          TOP MINIMALIST LUXURY HEADER
         ========================================== */}
      <header className="relative z-30 w-full max-w-lg mx-auto px-5 pt-5 pb-2 flex items-center justify-between">
        {/* Left: Monogram & Engagement Ceremony Title */}
        <button
          type="button"
          onClick={() => goToCard(0)}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#EFE8F8] border border-[#C3ADE6] flex items-center justify-center font-serif text-sm font-semibold tracking-wider text-[#3A2852] group-hover:bg-[#E4D7F5] transition-colors shadow-sm">
            A&amp;H
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#6E4B9E] font-semibold">
              {COUPLE_DATA.ceremonyTitle}
            </p>
            <p className="font-serif text-sm italic text-[#3A2852]/80">
              Chennai • October 24, 2027
            </p>
          </div>
        </button>

        {/* Right: Sound Toggle Button (On by Default) */}
        <button
          type="button"
          onClick={handleToggleAudio}
          title="Toggle Ambient Harp & Chime Music"
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[10px] tracking-widest uppercase font-medium transition-all shadow-sm ${
            soundEnabled
              ? 'bg-[#EFE8F8] border-[#B79CE0] text-[#3A2852]'
              : 'bg-white/80 border-[#E4D7F5] text-[#8E6BBF] hover:bg-[#EFE8F8]'
          }`}
        >
          {soundEnabled ? (
            <Volume2 size={14} className="animate-pulse text-[#6E4B9E]" />
          ) : (
            <VolumeX size={14} />
          )}
          <span>{soundEnabled ? 'Chimes On' : 'Muted'}</span>
        </button>
      </header>

      {/* ==========================================
          MAIN 4-CARD SWIPEABLE INVITATION DECK
         ========================================== */}
      <main
        onTouchStart={handleDeckTouchStart}
        onTouchMove={handleDeckTouchMove}
        onTouchEnd={handleDeckTouchEnd}
        onMouseDown={handleDeckTouchStart}
        onMouseMove={handleDeckTouchMove}
        onMouseUp={handleDeckTouchEnd}
        onMouseLeave={handleDeckTouchEnd}
        className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-3 w-full max-w-lg mx-auto"
      >
        <div className="relative w-full">
          {/* 3D Stacked Background Cards for Depth */}
          <div className="absolute inset-x-4 -bottom-2.5 h-6 rounded-3xl bg-[#EFE8F8]/90 border border-[#D6C2EC] -z-10 transform scale-[0.97]" />
          <div className="absolute inset-x-8 -bottom-5 h-6 rounded-3xl bg-[#E4D7F5]/75 border border-[#C3ADE6] -z-20 transform scale-[0.94]" />

          {/* Active Card Container */}
          <div
            style={{
              transform: `translateX(${dragOffsetX * 0.35}px) rotate(${dragOffsetX * 0.015}deg)`,
              transition: dragStartX === null ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
            className="w-full min-h-[530px] sm:min-h-[560px] bg-gradient-to-b from-[#FDFBFF] via-[#F8F5FC] to-[#EFE8F8]/90 backdrop-blur-md rounded-[30px] border border-[#D6C2EC] shadow-[0_22px_60px_-15px_rgba(110,75,158,0.18)] px-7 py-8 sm:px-10 sm:py-10 flex flex-col justify-between relative overflow-hidden cursor-grab active:cursor-grabbing"
          >
            {/* Delicate Inner Decorative Arch Frame */}
            <div className="pointer-events-none absolute inset-4 rounded-2xl rounded-t-[80px] sm:rounded-t-[100px] border border-[#C3ADE6]/45" />

            {/* Corner Botanical SVG Flourishes */}
            <svg
              className="pointer-events-none absolute top-4 left-4 w-11 h-11 text-[#B79CE0] opacity-65"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path d="M4 60C4 28 28 4 60 4" stroke="currentColor" strokeWidth="1" />
              <path d="M16 40C20 26 28 20 42 16" stroke="currentColor" strokeWidth="0.75" />
            </svg>
            <svg
              className="pointer-events-none absolute top-4 right-4 w-11 h-11 text-[#B79CE0] opacity-65 transform scale-x-[-1]"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path d="M4 60C4 28 28 4 60 4" stroke="currentColor" strokeWidth="1" />
              <path d="M16 40C20 26 28 20 42 16" stroke="currentColor" strokeWidth="0.75" />
            </svg>

            {/* ==========================================
                CARD 0 (FIRST PAGE): ENVELOPE COVER & INTERACTIVE WAX SEAL
               ========================================== */}
            {currentCard === 0 && (
              <div className="relative z-10 flex-1 flex flex-col items-center justify-between text-center py-3 px-2">
                {/* Top Family Header & Crest */}
                <div className="flex flex-col items-center space-y-2 mt-2 max-w-[240px] sm:max-w-[280px]">
                  <span className="text-[9px] uppercase tracking-[0.28em] text-[#8E6BBF] font-semibold">
                    Auspicious Invitation
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-[#6E4B9E] tracking-wide font-medium leading-relaxed">
                    {COUPLE_DATA.familyHeader}
                  </p>

                  {/* Delicate Botanical Crest SVG */}
                  <svg className="w-16 h-7 text-[#8E6BBF] pt-1" viewBox="0 0 120 36" fill="none">
                    <path
                      d="M10 18C35 18 45 6 60 6C75 6 85 18 110 18"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                    <circle cx="60" cy="18" r="3" fill="#C8A97E" />
                    <circle cx="42" cy="15" r="2" fill="currentColor" />
                    <circle cx="78" cy="15" r="2" fill="currentColor" />
                  </svg>
                </div>

                {/* Center Couple Monogram & Names */}
                <div className="my-auto py-2 flex flex-col items-center max-w-[260px] sm:max-w-[300px]">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#6E4B9E] leading-relaxed mb-3">
                    Cordially invite you to the Engagement Ceremony of
                  </p>

                  <h1 className="font-serif text-4xl sm:text-5xl text-[#3A2852] font-normal tracking-wide leading-tight">
                    {COUPLE_DATA.groomFirst}
                  </h1>
                  <span className="font-serif italic text-2xl sm:text-3xl text-[#8E6BBF] my-1">
                    &amp;
                  </span>
                  <h1 className="font-serif text-4xl sm:text-5xl text-[#3A2852] font-normal tracking-wide leading-tight">
                    {COUPLE_DATA.brideFirst}
                  </h1>
                </div>

                {/* Interactive 3D Lavender-Gold Wax Seal Button */}
                <div className="flex flex-col items-center space-y-2.5 mb-1">
                  <button
                    type="button"
                    onClick={handleOpenWaxSeal}
                    aria-label="Open Engagement Invitation Wax Seal"
                    className={`relative group flex items-center justify-center w-20 h-20 sm:w-22 sm:h-22 rounded-full transition-all duration-500 focus:outline-none ${
                      isSealOpening ? 'scale-125 opacity-0' : 'hover:scale-105 active:scale-95'
                    }`}
                  >
                    {/* Pulsing Aura Ring */}
                    <span className="absolute inset-0 rounded-full bg-[#B79CE0]/40 animate-ping" />
                    <span className="absolute -inset-1.5 rounded-full border border-[#C8A97E]/50 group-hover:scale-105 transition-transform" />

                    {/* 3D Metallic Lavender-Gold Wax Seal Body */}
                    <div
                      style={{
                        background:
                          'radial-gradient(circle at 32% 28%, #E4D7F5 0%, #9F7BC9 45%, #6E4B9E 85%, #4B306E 100%)',
                      }}
                      className="relative w-20 h-20 rounded-full shadow-[0_10px_25px_rgba(110,75,158,0.45),inset_0_2px_6px_rgba(255,255,255,0.55)] border-2 border-[#C8A97E]/80 flex flex-col items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-full border border-[#F8F5FC]/50 flex flex-col items-center justify-center">
                        <span className="font-serif text-base sm:text-lg text-[#FDFBFF] tracking-widest font-semibold drop-shadow">
                          A&amp;H
                        </span>
                        <span className="text-[7px] uppercase tracking-[0.22em] text-[#EFE8F8]">
                          Open
                        </span>
                      </div>
                    </div>
                  </button>

                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#6E4B9E] font-medium">
                    Tap Seal or Swipe to Open
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-[#8E6BBF]">
                    Chennai • Tamil Nadu
                  </p>
                </div>
              </div>
            )}

            {/* ==========================================
                CARD 1 (SECOND PAGE): ANNOUNCEMENT CARD (CONSTRAINED INSIDE ARCH)
               ========================================== */}
            {currentCard === 1 && (
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-4 py-4 px-3">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#6E4B9E] font-semibold max-w-[200px] sm:max-w-[240px] leading-relaxed">
                  With the Blessings of Our Parents
                </div>

                {/* Minimalist Botanical Arch Crest */}
                <div className="w-12 h-14 rounded-t-full border border-[#C3ADE6] bg-gradient-to-b from-[#EFE8F8] to-[#FDFBFF] flex items-center justify-center shadow-inner shrink-0">
                  <svg className="w-6 h-6 text-[#6E4B9E]" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M24 42V14M24 22C18 22 13 17 13 11C19 11 24 16 24 22ZM24 28C30 28 35 23 35 17C29 17 24 22 24 28ZM24 34C18 34 14 30 14 24C20 24 24 28 24 34Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Couple Full Names & Parentage Constrained Inside Arch */}
                <div className="space-y-1.5 w-full max-w-[240px] sm:max-w-[280px]">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#3A2852] font-normal leading-snug">
                      {COUPLE_DATA.groom}
                    </h2>
                    <p className="text-[10px] text-[#6E4B9E] tracking-wide mt-0.5 leading-normal">
                      {COUPLE_DATA.groomParents}
                    </p>
                  </div>

                  <div className="font-serif italic text-lg text-[#8E6BBF] py-0.5">&amp;</div>

                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#3A2852] font-normal leading-snug">
                      {COUPLE_DATA.bride}
                    </h2>
                    <p className="text-[10px] text-[#6E4B9E] tracking-wide mt-0.5 leading-normal">
                      {COUPLE_DATA.brideParents}
                    </p>
                  </div>
                </div>

                {/* Warm Invitation Prose (No Quote Box, Safely Constrained) */}
                <p className="text-[11px] sm:text-xs text-[#3A2852]/85 leading-relaxed font-normal max-w-[240px] sm:max-w-[280px]">
                  Request the honour of your presence and blessings as they exchange rings and
                  celebrate the joyous beginning of their new journey together in Chennai.
                </p>

                <button
                  type="button"
                  onClick={() => goToCard(2)}
                  className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EFE8F8] hover:bg-[#E4D7F5] border border-[#B79CE0] text-[#3A2852] text-[10px] uppercase tracking-[0.2em] font-semibold transition-all shadow-sm shrink-0"
                >
                  <span>Scratch to Reveal Date</span>
                  <ChevronRight size={14} className="text-[#6E4B9E]" />
                </button>
              </div>
            )}

            {/* ==========================================
                CARD 2 (THIRD PAGE): "ERASE THE DATE" SCRATCH-OFF FOIL CARD
               ========================================== */}
            {currentCard === 2 && (
              <div className="relative z-10 flex-1 flex flex-col items-center justify-between py-3 px-2 text-center">
                <div className="mt-1 max-w-[230px] sm:max-w-[270px]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8F8] border border-[#C3ADE6] text-[9px] uppercase tracking-[0.24em] text-[#6E4B9E] font-semibold">
                    <Wand2 size={11} /> Erase the Foil
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#3A2852] mt-2">
                    Reveal Our Date
                  </h2>
                  <p className="text-[11px] text-[#6E4B9E] mt-0.5">
                    Click or drag across the metallic foil below
                  </p>
                </div>

                {/* Interactive Scratch Canvas */}
                <div className="w-full my-auto py-2">
                  <ScratchToRevealDate
                    isRevealed={isDateRevealed}
                    setIsRevealed={setIsDateRevealed}
                  />
                </div>

                <div className="w-full flex flex-col items-center">
                  <p className="text-[11px] font-serif italic text-[#6E4B9E]">
                    {isDateRevealed
                      ? 'We look forward to celebrating with you in Chennai!'
                      : 'Scratch ~48% of the foil for an automatic sparkle reveal'}
                  </p>
                </div>
              </div>
            )}

            {/* ==========================================
                CARD 3 (FOURTH PAGE): CHENNAI MINI HALL VENUE & SINGLE CEREMONY TIME
               ========================================== */}
            {currentCard === 3 && (
              <div className="relative z-10 flex-1 flex flex-col items-center justify-between py-3 px-2 text-center">
                <div className="mt-1 max-w-[240px] sm:max-w-[280px]">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#EFE8F8] border border-[#C3ADE6] text-[9px] uppercase tracking-[0.24em] text-[#6E4B9E] font-semibold mb-1.5">
                    The Celebration
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#3A2852]">
                    Venue &amp; Timing
                  </h2>
                </div>

                {/* Venue Card & Single Starting Time Box */}
                <div className="my-auto space-y-3 w-full max-w-[300px] sm:max-w-[330px]">
                  {/* Venue Card */}
                  <div className="rounded-2xl bg-white/90 border border-[#D6C2EC] p-4 shadow-sm flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-[#EFE8F8] text-[#6E4B9E] flex items-center justify-center mb-1.5">
                      <MapPin size={15} />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#3A2852] font-medium">
                      {COUPLE_DATA.venueName}
                    </h3>
                    <p className="text-[11px] text-[#6E4B9E] leading-relaxed mt-1">
                      {COUPLE_DATA.venueSub}
                    </p>
                  </div>

                  {/* Single Starting Time Highlight Box */}
                  <div className="rounded-2xl bg-gradient-to-b from-[#EFE8F8] to-[#E4D7F5]/65 border border-[#C3ADE6] p-4 text-center shadow-sm flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-white/80 text-[#6E4B9E] flex items-center justify-center mb-1.5">
                      <Clock size={15} />
                    </div>
                    <p className="text-[9px] uppercase tracking-[0.24em] text-[#6E4B9E] font-semibold">
                      {COUPLE_DATA.dateString}
                    </p>
                    <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#3A2852] mt-0.5">
                      {COUPLE_DATA.timeString}
                    </p>
                    <p className="text-[11px] font-serif italic text-[#3A2852]/85 mt-0.5">
                      Muhurtham, Ring Exchange &amp; Celebratory Dinner
                    </p>
                  </div>
                </div>

                {/* Action Buttons: Google Maps, Google Calendar, and .ICS Invite */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2 max-w-[320px]">
                  <a
                    href={COUPLE_DATA.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#6E4B9E] hover:bg-[#583982] text-white text-[9px] uppercase tracking-wider font-medium transition-all shadow-sm"
                  >
                    <MapPin size={11} />
                    <span>Google Maps</span>
                    <ExternalLink size={10} />
                  </a>

                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#EFE8F8] border border-[#C3ADE6] text-[#3A2852] text-[9px] uppercase tracking-wider font-medium transition-all shadow-sm"
                  >
                    <Calendar size={11} className="text-[#6E4B9E]" />
                    <span>Google Calendar</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleDownloadICS}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#EFE8F8] hover:bg-[#E4D7F5] border border-[#C3ADE6] text-[#3A2852] text-[9px] uppercase tracking-wider font-medium transition-all shadow-sm"
                  >
                    <Download size={11} className="text-[#6E4B9E]" />
                    <span>.ICS Invite</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==========================================
            CENTERED ANIMATED PAGINATION DOTS ONLY
           ========================================== */}
        <div className="w-full flex items-center justify-center mt-6 mb-2">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#D6C2EC] shadow-sm">
            {Array.from({ length: totalCards }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToCard(i)}
                aria-label={`Go to card ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentCard === i
                    ? 'w-8 bg-[#6E4B9E] shadow-[0_0_8px_rgba(110,75,158,0.4)]'
                    : 'w-2 bg-[#D6C2EC] hover:bg-[#8E6BBF]'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}