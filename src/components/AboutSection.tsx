import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Layers, BookOpen, Cpu, User } from 'lucide-react';

// ── Portrait config ───────────────────────────────────────────────────────────
// Change PHOTO_SRC to '/images/pawani_photo.jpg' when your photo is ready.
// Use CSS only for sizing — no AI alterations will be applied.
const PHOTO_SRC: string | null = null;
const PHOTO_ALT = 'Pawani Tripathi — Full-Stack Developer';

const highlights = [
  { icon: BookOpen, title: 'CSE @ LPU', text: 'B.Tech Computer Science, CGPA 8.71. Aug 2024 – Present.' },
  { icon: Layers,   title: 'Full-Stack Dev', text: 'React, Node.js, Express, MongoDB, PostgreSQL.' },
  { icon: Cpu,      title: 'DSA & Problem-Solving', text: '100+ LeetCode problems, strong algorithmic thinking.' },
  { icon: Code2,    title: 'Real Projects', text: 'Collab Engine, CampusHire, WanderSmart — shipped and working.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="about" className="about section-py" ref={ref} aria-labelledby="about-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-label">About</p>
          <h2 id="about-heading" className="section-title">A little about how I build.</h2>
        </div>

        <div className="about__inner">
          {/* Portrait */}
          <motion.div
            className="about__portrait-wrap"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about__portrait-offset" aria-hidden="true" />
            <div
              className="about__portrait"
              role="img"
              aria-label={PHOTO_SRC ? PHOTO_ALT : 'Portrait placeholder — photo to be added'}
            >
              {PHOTO_SRC ? (
                <img src={PHOTO_SRC} alt={PHOTO_ALT} loading="lazy" />
              ) : (
                <>
                  <div className="about__portrait-ph-icon"><User size={24} /></div>
                  <span className="about__portrait-ph-label">PAWANI_PHOTO_PLACEHOLDER</span>
                </>
              )}
            </div>
            <div className="about__portrait-tag" aria-hidden="true">
              Pawani Tripathi · LPU · B.Tech CSE
            </div>
          </motion.div>

          {/* Content */}
          <div className="about__right">
            <motion.p
              className="about__intro"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              I'm pursuing Computer Science Engineering at Lovely Professional University and developing
              my skills in full-stack development. I enjoy building practical applications, working across
              frontend and backend systems, and solving problems through code.
            </motion.p>

            <div className="about__highlights">
              {highlights.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  className="about__hl"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  <div className="about__hl-icon" aria-hidden="true"><Icon size={14} /></div>
                  <div>
                    <p className="about__hl-title">{title}</p>
                    <p className="about__hl-text">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
