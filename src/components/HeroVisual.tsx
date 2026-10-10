import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const editorLines: { num: number; content: React.ReactNode }[] = [
  { num: 1, content: <><span className="tk-kw">export default function</span> <span className="tk-fn">App</span><span className="tk-pun">() {'{'}</span></> },
  { num: 2, content: <>&nbsp;&nbsp;<span className="tk-kw">return</span> <span className="tk-pun">(</span></> },
  { num: 3, content: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="tk-tag">&lt;div</span> <span className="tk-cls">className</span><span className="tk-pun">=</span><span className="tk-str">"min-h-screen"</span><span className="tk-tag">&gt;</span></> },
  { num: 4, content: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tk-tag">&lt;Hero</span> <span className="tk-tag">/&gt;</span></> },
  { num: 5, content: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="tk-tag">&lt;/div&gt;</span></> },
  { num: 6, content: <>&nbsp;&nbsp;<span className="tk-pun">);</span></> },
  { num: 7, content: <><span className="tk-pun">{'}'}</span></> },
];

const pv = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (d: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      {/* ── SVG orbital path ── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 500 520"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Main coral orbital circle */}
        <motion.circle
          cx="248" cy="255" r="120"
          fill="none"
          stroke="#FF8066"
          strokeWidth="1"
          opacity="0.18"
          strokeDasharray="754"
          strokeDashoffset="754"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Small orbital dot moving */}
        <motion.circle
          cx="248" cy="135" r="3.5"
          fill="#FF8066"
          opacity="0.6"
          animate={{ rotate: 360 }}
          style={{ originX: '248px', originY: '255px' }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        {/* Crosshairs */}
        <line x1="348" y1="120" x2="362" y2="120" stroke="#343B43" strokeWidth="1.2" />
        <line x1="355" y1="113" x2="355" y2="127" stroke="#343B43" strokeWidth="1.2" />
        <line x1="140" y1="390" x2="154" y2="390" stroke="#343B43" strokeWidth="1.2" />
        <line x1="147" y1="383" x2="147" y2="397" stroke="#343B43" strokeWidth="1.2" />
        {/* Coral squares */}
        <rect x="349" y="233" width="6" height="6" fill="#FF8066" opacity="0.45" />
        <rect x="148" y="255" width="5" height="5" fill="#FF8066" opacity="0.3" />
        {/* Small dot */}
        <circle cx="398" cy="430" r="3" fill="#FF8066" opacity="0.25" />
      </svg>

      {/* ── Tech panel ── */}
      <motion.div className="vis-tech-panel" variants={pv} initial="hidden" animate="visible" custom={0.6}>
        <div className="vis-tech-panel__header">
          <span className="vis-tech-dot" />
          Currently Exploring
        </div>
        <div className="vis-tech-panel__items">
          {['React', 'Next.js', 'TypeScript'].map((t) => (
            <span key={t} className="vis-tech-item">{t}</span>
          ))}
        </div>
      </motion.div>

      {/* ── Editor ── */}
      <motion.div className="vis-editor" variants={pv} initial="hidden" animate="visible" custom={0.85}>
        <div className="vis-editor__header">
          <div className="vis-editor__controls">
            <span className="vis-ctrl vis-ctrl--r" />
            <span className="vis-ctrl vis-ctrl--y" />
            <span className="vis-ctrl vis-ctrl--g" />
          </div>
          <div className="vis-editor__tab">
            <Code2 size={9} style={{ color: '#8CCBFF' }} />
            app.jsx
            <span className="vis-editor__tab-x">×</span>
          </div>
        </div>
        <div className="vis-editor__body">
          {editorLines.map((line) => (
            <div key={line.num} className="vis-editor-line">
              <span className="vis-ln">{line.num}</span>
              <span className="vis-code">{line.content}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Info panel ── */}
      <motion.div className="vis-info-panel" variants={pv} initial="hidden" animate="visible" custom={1.1}>
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
        {['CLEAN','CODE','SCALABLE','SYSTEMS','BETTER','PRODUCTS'].map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
    </div>
  );
}
