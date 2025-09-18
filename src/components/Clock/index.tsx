// src/components/Clock/index.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MdSettings } from 'react-icons/md';
import ScaleAnimated from '../ScaleAnimated';

// Tunables (spacing + motion)
const DURATION = 0.8;
const DIGIT_WIDTH_EM = 0.5; // a bit wider than before
const SEP_WIDTH_EM = 0.3; // a bit wider for ':'
const DIGIT_GAP_EM = 0.06; // horizontal breathing room for digits
const SEP_GAP_EM = 0.1; // slightly more around ':'
const CELL_HEIGHT_EM = 1.3;
const ENTER_Y = '80%';
const EXIT_Y = '-80%';

// Build fixed-width HH:MM:SS (12h or 24h)
function formatTimeString(date: Date, is24Hour: boolean): string {
  let hours = date.getHours();
  if (!is24Hour) hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

type DigitCellProps = {
  idx: number;
  ch: string;
  reduceMotion: boolean;
};

const DigitCell = React.memo(function DigitCell({ idx, ch, reduceMotion }: DigitCellProps) {
  const isSeparator = ch === ':';
  const cellWidth = isSeparator ? `${SEP_WIDTH_EM}em` : `${DIGIT_WIDTH_EM}em`;
  const cellHeight = `${CELL_HEIGHT_EM}em`;
  const mx = isSeparator ? `${SEP_GAP_EM}em` : `${DIGIT_GAP_EM}em`;

  if (reduceMotion) {
    return (
      <span
        className="relative inline-block overflow-hidden"
        style={{
          width: cellWidth,
          height: cellHeight,
          marginLeft: mx,
          marginRight: mx,
          fontVariantNumeric: 'tabular-nums' as const
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center">{ch}</span>
      </span>
    );
  }

  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{
        width: cellWidth,
        height: cellHeight,
        marginLeft: mx,
        marginRight: mx,
        fontVariantNumeric: 'tabular-nums' as const
      }}
    >
      <AnimatePresence initial={false} mode="sync">
        {/* Opacity crossfade added to make digits emerge into/vanish into darkness */}
        <motion.span
          key={`${idx}-${ch}`}
          className="absolute inset-0 flex items-center justify-center will-change-[transform,opacity]"
          initial={{ y: ENTER_Y, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: EXIT_Y, opacity: 0 }}
          transition={{ duration: DURATION, ease: 'linear' }}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        >
          {ch}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // Persisted format; default 24h
  const [is24Hour, setIs24Hour] = useState<boolean>(() => {
    const saved = localStorage.getItem('timeFormat');
    if (saved === '24') return true;
    if (saved === '12') return false;
    return true;
  });

  const [showSettings, setShowSettings] = useState(false);
  const reduceMotion = useReducedMotion();

  // Align to real seconds; re-align on visibility to avoid drift
  useEffect(() => {
    let alignTimeoutId: number | undefined;
    let intervalId: number | undefined;

    const startAligned = () => {
      const msToNext = 1000 - (Date.now() % 1000);
      alignTimeoutId = window.setTimeout(() => {
        setCurrentTime(new Date());
        intervalId = window.setInterval(() => setCurrentTime(new Date()), 1000);
      }, msToNext);
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        if (alignTimeoutId) clearTimeout(alignTimeoutId);
        if (intervalId) clearInterval(intervalId);
        setCurrentTime(new Date());
        startAligned();
      }
    };

    setCurrentTime(new Date());
    startAligned();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (alignTimeoutId) clearTimeout(alignTimeoutId);
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const timeStr = useMemo(() => formatTimeString(currentTime, is24Hour), [currentTime, is24Hour]);

  const toggleTimeFormat = () => {
    const next = !is24Hour;
    setIs24Hour(next);
    localStorage.setItem('timeFormat', next ? '24' : '12');
  };

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const chars = timeStr.split('');

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 relative">
      {/* Settings button */}
      <div className="absolute top-0 right-0">
        <ScaleAnimated>
          <button onClick={() => setShowSettings(s => !s)} className="p-2 text-ash hover:text-primary transition-colors" aria-label="Clock settings">
            <MdSettings size={20} />
          </button>
        </ScaleAnimated>
      </div>

      {/* Time format settings */}
      <AnimatePresence initial={false}>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-10 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-10"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm">24 Hour</span>
              <button
                onClick={toggleTimeFormat}
                className={`w-12 h-6 rounded-full transition-colors ${is24Hour ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                aria-label="Toggle 24 hour format"
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${is24Hour ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Date (top) */}
      <div className="text-xl text-ash capitalize">{formattedDate}</div>

      {/* Clock (center) */}
      <div
        className="flex items-center justify-center leading-none font-pacifico text-[9rem] text-primary"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {chars.map((ch, idx) => (
          <DigitCell key={idx} idx={idx} ch={ch} reduceMotion={!!reduceMotion} />
        ))}
      </div>
    </div>
  );
};

export default Clock;
