import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { GithubIcon } from './icons';
import PhraseList, { PHRASES } from './AnimatedName';
import GridBackground from './GridBackground';
import HeroVisual from './HeroVisual';

const ROW_MARKERS = ['01', '02', '03', '04'];

const techStack = [
  { label: 'React',      abbr: 'Re', cls: 'si-react' },
  { label: 'Next.js',    abbr: 'N.', cls: 'si-next'  },
  { label: 'Node.js',    abbr: 'Nd', cls: 'si-node'  },
  { label: 'TypeScript', abbr: 'TS', cls: 'si-ts'    },
  { label: 'PostgreSQL', abbr: 'PG', cls: 'si-pg'    },
];

export default function HeroSection() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [gridReady, setGridReady] = useState(false);
  const [activePhrase, setActivePhrase] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setGridReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Cycle through phrases every 2.5 seconds
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setActivePhrase((p) => (p + 1) % PHRASES.length);
    }, 2500);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cv = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
  };
  const iv = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="hero" aria-label="Introduction">
      {/* Background grid */}
      <GridBackground animate={gridReady && !reducedMotion} />

      {/* Left row markers */}
      <div className="hero__row-markers" aria-hidden="true">
        {ROW_MARKERS.map((m) => (
          <div key={m} className="hero__row-marker">
            {m}
            <span className="hero__row-marker-sq" />
          </div>
        ))}
      </div>

      {/* Two-column content */}
      <div className="hero__content">
        {/* ── LEFT ── */}
        <motion.div
          className="hero__left"
          variants={cv}
          initial={reducedMotion ? 'visible' : 'hidden'}
          animate="visible"
        >
          {/* Hidden accessible h1 */}
          <h1 style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0 0 0 0)' }}>
            Pawani Tripathi — Full-Stack Developer
          </h1>

          {/* Label */}
          <motion.div className="hero__label" variants={iv}>
            <span className="hero__label-dot" aria-hidden="true" />
            Full-Stack Developer / CSE Student
          </motion.div>

          {/* Name */}
          <motion.div className="hero__name-block" variants={iv} aria-hidden="true">
            <span className="hero__name-line hero__name-line--white">Pawani</span>
            <span className="hero__name-line hero__name-line--coral">
              Tripathi
              <span className="hero__name-cursor" aria-hidden="true" />
            </span>
          </motion.div>

          {/* Phrase list */}
          <motion.div variants={iv}>
            <PhraseList activeIndex={activePhrase} reducedMotion={reducedMotion} />
          </motion.div>

          {/* Bio */}
          <motion.p className="hero__bio" variants={iv}>
            I build full-stack products with thoughtful interfaces and reliable engineering.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero__ctas" variants={iv}>
            <button
              className="btn-coral"
              onClick={scrollToProjects}
              id="hero-view-work-btn"
              aria-label="View my projects"
            >
              View my work
              <ArrowUpRight size={14} className="btn-arrow" />
            </button>
            <a
              href="https://github.com/PawaniTripathi"
              className="btn-dark"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-github-btn"
              aria-label="Visit Pawani Tripathi's GitHub"
            >
              <GithubIcon size={14} />
              GitHub
              <ArrowUpRight size={12} className="btn-arrow" />
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT ── */}
        <div className="hero__right" aria-hidden="true">
          <HeroVisual />
        </div>
      </div>

      {/* Bottom strip */}
      <div className="hero__strip" role="complementary" aria-label="Tech stack">
        <div className="hero__strip-inner">
          <div className="strip-loc">
            <span className="strip-loc-dot" aria-hidden="true" />
            <span className="strip-loc-text">Based in India</span>
          </div>

          <div className="strip-sep" aria-hidden="true" />
          <span className="strip-label">Tech Stack</span>

          <div className="strip-techs">
            {techStack.map((t) => (
              <div key={t.label} className="strip-tech">
                <span className={`strip-tech-icon ${t.cls}`} aria-hidden="true">{t.abbr}</span>
                {t.label}
              </div>
            ))}
          </div>

          <div className="strip-scroll" aria-hidden="true">
            <span className="strip-scroll-label">Scroll to Explore</span>
            <span className="strip-scroll-btn">
              <ChevronDown size={13} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
