import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2 } from 'lucide-react';

// ─── Typewriter config ────────────────────────────────────────────────────────
// Each "token" is a {text, className} pair. The typewriter reveals them char by char.
type Token = { text: string; cls: string };
type CodeLine = { tokens: Token[] };

const CODE_LINES: CodeLine[] = [
  { tokens: [{ text: 'const ', cls: 'tk-kw' }, { text: 'developer', cls: 'tk-fn' }, { text: ' = {', cls: 'tk-pun' }] },
  { tokens: [{ text: '  role', cls: 'tk-cls' }, { text: ': ', cls: 'tk-pun' }, { text: '"Full Stack Developer"', cls: 'tk-str' }, { text: ',', cls: 'tk-pun' }] },
  { tokens: [{ text: '  focus', cls: 'tk-cls' }, { text: ': [', cls: 'tk-pun' }, { text: '"React"', cls: 'tk-str' }, { text: ', ', cls: 'tk-pun' }, { text: '"Next.js"', cls: 'tk-str' }, { text: ', ', cls: 'tk-pun' }, { text: '"Node.js"', cls: 'tk-str' }, { text: '],', cls: 'tk-pun' }] },
  { tokens: [{ text: '  mindset', cls: 'tk-cls' }, { text: ': ', cls: 'tk-pun' }, { text: '"Build. Learn. Improve."', cls: 'tk-str' }] },
  { tokens: [{ text: '};', cls: 'tk-pun' }] },
  { tokens: [] },
  { tokens: [{ text: 'export default function ', cls: 'tk-kw' }, { text: 'Hero', cls: 'tk-fn' }, { text: '() {', cls: 'tk-pun' }] },
  { tokens: [{ text: '  return ', cls: 'tk-kw' }, { text: '<', cls: 'tk-tag' }, { text: 'DeveloperIntro', cls: 'tk-fn' }, { text: ' />', cls: 'tk-tag' }, { text: ';', cls: 'tk-pun' }] },
  { tokens: [{ text: '}', cls: 'tk-pun' }] },
];

// Flatten to a sequence of (lineIndex, tokenIndex, charIndex)
type CharPos = { line: number; token: number; char: number };
function buildCharSequence(): CharPos[] {
  const seq: CharPos[] = [];
  CODE_LINES.forEach((line, li) => {
    line.tokens.forEach((token, ti) => {
      for (let ci = 0; ci < token.text.length; ci++) {
        seq.push({ line: li, token: ti, char: ci });
      }
    });
  });
  return seq;
}
const CHAR_SEQ = buildCharSequence();
const TOTAL_CHARS = CHAR_SEQ.length;

const TYPING_SPEED  = 28;   // ms per char while typing
const HOLD_DURATION = 2800; // ms to hold after fully typed
const ERASE_SPEED   = 12;   // ms per char while erasing
const PAUSE_AFTER   = 500;  // ms gap before restarting

// ─── Tech cycling config ──────────────────────────────────────────────────────
const TECH_SETS = [
  ['React', 'Next.js', 'TypeScript'],
  ['Node.js', 'Express.js', 'MongoDB'],
  ['PostgreSQL', 'Prisma', 'Redis'],
];
const TECH_INTERVAL = 3000;

// ─── Panel entrance variants ──────────────────────────────────────────────────
const pv = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: (d: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(disabled: boolean) {
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'hold' | 'erasing' | 'pause'>('typing');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const tick = useCallback(() => {
    setPhase((prev) => {
      if (prev === 'typing') {
        setCharCount((c) => {
          if (c >= TOTAL_CHARS) return c;
          return c + 1;
        });
        return prev;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (disabled) { setCharCount(TOTAL_CHARS); setPhase('hold'); return; }

    const next = () => {
      setPhase((ph) => {
        if (ph === 'typing') {
          setCharCount((c) => {
            if (c < TOTAL_CHARS) {
              timer.current = setTimeout(next, TYPING_SPEED);
              return c + 1;
            }
            // Fully typed — hold
            timer.current = setTimeout(() => setPhase('hold'), 10);
            return c;
          });
        } else if (ph === 'hold') {
          timer.current = setTimeout(() => setPhase('erasing'), HOLD_DURATION);
        } else if (ph === 'erasing') {
          setCharCount((c) => {
            if (c > 0) {
              timer.current = setTimeout(next, ERASE_SPEED);
              return c - 1;
            }
            timer.current = setTimeout(() => setPhase('pause'), 10);
            return 0;
          });
        } else if (ph === 'pause') {
          timer.current = setTimeout(() => setPhase('typing'), PAUSE_AFTER);
        }
        return ph;
      });
    };

    timer.current = setTimeout(next, TYPING_SPEED);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [phase, disabled]);

  // Re-trigger hold → erasing → pause → typing transitions
  useEffect(() => {
    if (disabled) return;
    if (phase === 'hold') {
      timer.current = setTimeout(() => setPhase('erasing'), HOLD_DURATION);
      return () => { if (timer.current) clearTimeout(timer.current); };
    }
    if (phase === 'pause') {
      timer.current = setTimeout(() => {
        setCharCount(0);
        setPhase('typing');
      }, PAUSE_AFTER);
      return () => { if (timer.current) clearTimeout(timer.current); };
    }
    if (phase === 'erasing') {
      const id = setInterval(() => {
        setCharCount((c) => {
          if (c <= 0) { clearInterval(id); setPhase('pause'); return 0; }
          return c - 1;
        });
      }, ERASE_SPEED);
      return () => clearInterval(id);
    }
    if (phase === 'typing') {
      const id = setInterval(() => {
        setCharCount((c) => {
          if (c >= TOTAL_CHARS) { clearInterval(id); setPhase('hold'); return TOTAL_CHARS; }
          return c + 1;
        });
      }, TYPING_SPEED);
      return () => clearInterval(id);
    }
  }, [phase, disabled]);

  return { charCount, phase };
}

// ─── Render typed code lines ──────────────────────────────────────────────────
function renderTypedLines(charCount: number, showCursor: boolean): React.ReactNode[] {
  let remaining = charCount;
  const nodes: React.ReactNode[] = [];

  CODE_LINES.forEach((line, li) => {
    const tokenNodes: React.ReactNode[] = [];
    let cursorPlaced = false;

    line.tokens.forEach((token, ti) => {
      if (remaining <= 0) return;
      const take = Math.min(remaining, token.text.length);
      const visible = token.text.slice(0, take);
      remaining -= take;

      const isCursorHere = remaining === 0 && !cursorPlaced;
      if (isCursorHere) cursorPlaced = true;

      tokenNodes.push(
        <span key={ti} className={token.cls}>
          {visible}
          {isCursorHere && showCursor && (
            <span className="vis-cursor" aria-hidden="true">|</span>
          )}
        </span>
      );
    });

    // If this line consumed all remaining chars but cursor not placed yet
    if (remaining === 0 && !cursorPlaced && showCursor && tokenNodes.length > 0) {
      // cursor after last token on this line — append inline
    }

    nodes.push(
      <div key={li} className="vis-editor-line">
        <span className="vis-ln">{li + 1}</span>
        <span className="vis-code">
          {tokenNodes.length === 0 ? <>&nbsp;</> : tokenNodes}
        </span>
      </div>
    );
  });

  return nodes;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroVisual() {
  const prefersReduced = useReducedMotion();
  const { charCount, phase } = useTypewriter(!!prefersReduced);
  const [techSetIdx, setTechSetIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setShowCursor((s) => !s), 530);
    return () => clearInterval(id);
  }, [prefersReduced]);

  // Cycle tech set
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setTechSetIdx((i) => (i + 1) % TECH_SETS.length), TECH_INTERVAL);
    return () => clearInterval(id);
  }, [prefersReduced]);

  const currentTechs = TECH_SETS[techSetIdx];

  return (
    <div className="hero-visual" aria-hidden="true">

      {/* ── Background SVG: orbital circle + crosshairs + coral squares ── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 500 520"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Coral orbital ring */}
        <motion.circle
          cx="250" cy="265" r="118"
          fill="none"
          stroke="#FF8066"
          strokeWidth="0.85"
          opacity="0.15"
          strokeDasharray="742"
          strokeDashoffset="742"
          animate={prefersReduced ? { strokeDashoffset: 0 } : { strokeDashoffset: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Slowly rotating dot on the orbital */}
        {!prefersReduced && (
          <motion.circle
            cx="250" cy="147"
            r="3.5"
            fill="#FF8066"
            opacity="0.55"
            animate={{ rotate: 360 }}
            style={{ originX: '250px', originY: '265px' }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {/* Crosshairs */}
        <line x1="346" y1="118" x2="362" y2="118" stroke="#343B43" strokeWidth="1.2" />
        <line x1="354" y1="110" x2="354" y2="126" stroke="#343B43" strokeWidth="1.2" />
        <line x1="132" y1="396" x2="148" y2="396" stroke="#343B43" strokeWidth="1.2" />
        <line x1="140" y1="388" x2="140" y2="404" stroke="#343B43" strokeWidth="1.2" />
        {/* Coral accent squares */}
        <rect x="347" y="237" width="6" height="6" fill="#FF8066" opacity="0.4" />
        <rect x="143" y="260" width="5" height="5" fill="#FF8066" opacity="0.28" />
        <circle cx="396" cy="435" r="3" fill="#FF8066" opacity="0.2" />
        {/* Subtle second arc */}
        <circle cx="250" cy="265" r="160" fill="none" stroke="#343B43" strokeWidth="0.5" opacity="0.25" />
      </svg>

      {/* ── Tech panel — top right, floating ── */}
      <motion.div
        className="vis-tech-panel"
        variants={pv}
        initial="hidden"
        animate="visible"
        custom={0.55}
        style={{ willChange: 'transform' }}
      >
        {/* Floating loop — wraps the panel in its own motion */}
        <motion.div
          animate={prefersReduced ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="vis-tech-panel__header">
            <span className="vis-tech-dot" style={{ boxShadow: '0 0 5px #FF8066' }} />
            Currently Exploring
          </div>
          <div className="vis-tech-panel__items">
            {currentTechs.map((t, i) => (
              <motion.span
                key={t}
                className="vis-tech-item"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Code editor ── */}
      <motion.div
        className="vis-editor"
        variants={pv}
        initial="hidden"
        animate="visible"
        custom={0.82}
        whileHover={prefersReduced ? {} : { scale: 1.012, transition: { duration: 0.25 } }}
      >
        {/* Header */}
        <div className="vis-editor__header">
          <div className="vis-editor__controls">
            <span className="vis-ctrl vis-ctrl--r" />
            <span className="vis-ctrl vis-ctrl--y" />
            <span className="vis-ctrl vis-ctrl--g" />
          </div>
          <div className="vis-editor__tab">
            <Code2 size={9} style={{ color: '#8CCBFF' }} />
            hero.jsx
            <span className="vis-editor__tab-x">×</span>
          </div>
          {/* Typing status badge */}
          <div style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            opacity: 0.6,
          }}>
            {phase === 'typing' ? 'EDITING...' : phase === 'erasing' ? 'CLEARING...' : 'PAUSED'}
          </div>
        </div>

        {/* Body — typewriter rendered lines */}
        <div className="vis-editor__body" style={{ minHeight: '11rem' }}>
          {renderTypedLines(charCount, showCursor)}
          {/* trailing cursor when nothing typed yet */}
          {charCount === 0 && showCursor && (
            <div className="vis-editor-line">
              <span className="vis-ln">1</span>
              <span className="vis-code">
                <span className="vis-cursor" aria-hidden="true">|</span>
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Info panel — bottom ── */}
      <motion.div
        className="vis-info-panel"
        variants={pv}
        initial="hidden"
        animate="visible"
        custom={1.1}
        whileHover={prefersReduced ? {} : { y: -2, transition: { duration: 0.22 } }}
      >
        <div className="vis-info-panel__head">
          <span className="vis-info-panel__title">
            <span className="vis-tech-dot" />
            Ideas → Code → Products
          </span>
          <span className="vis-info-panel__arrow">↗</span>
        </div>
        <p className="vis-info-panel__text">Turning ideas into meaningful web experiences.</p>
      </motion.div>

      {/* ── Right vertical annotation ── */}
      <div className="vis-annotation">
        {['CLEAN', 'CODE', 'SCALABLE', 'SYSTEMS', 'BETTER', 'PRODUCTS'].map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
    </div>
  );
}
