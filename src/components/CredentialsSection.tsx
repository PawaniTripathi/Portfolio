import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, GraduationCap, BookOpen, Trophy } from 'lucide-react';

export default function CredentialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-8% 0px' });

  const fade = (delay: number) => ({
    initial: { opacity: 0, x: -14 },
    animate: inView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="credentials" className="credentials section-py" aria-labelledby="cred-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Background</p>
          <h2 id="cred-heading" className="section-title">Education, training & achievements.</h2>
        </div>

        <div ref={ref} className="credentials__grid">
          {/* ── LEFT ── */}
          <div>
            <p className="cred-col-title"><GraduationCap size={12} style={{ marginRight: 4 }} />Education</p>
            <div className="timeline" role="list">
              <motion.div className="tl-item" role="listitem" {...fade(0.1)}>
                <div className="tl-dot" />
                <div>
                  <p className="tl-period">Aug 2024 – Present</p>
                  <p className="tl-title">B.Tech — Computer Science & Engineering</p>
                  <p className="tl-sub">Lovely Professional University · Phagwara, Punjab</p>
                  <p className="tl-desc">CGPA: 8.71</p>
                </div>
              </motion.div>
              <motion.div className="tl-item" role="listitem" {...fade(0.18)}>
                <div className="tl-dot" />
                <div>
                  <p className="tl-period">Mar 2022 – Mar 2023</p>
                  <p className="tl-title">Intermediate</p>
                  <p className="tl-sub">Dr Virendra Swarup Education Center · Kanpur, UP</p>
                  <p className="tl-desc">Percentage: 90.0%</p>
                </div>
              </motion.div>
              <motion.div className="tl-item" role="listitem" {...fade(0.26)}>
                <div className="tl-dot" />
                <div>
                  <p className="tl-period">Apr 2020 – May 2021</p>
                  <p className="tl-title">Matriculation</p>
                  <p className="tl-sub">Dr Virendra Swarup Education Center · Kanpur, UP</p>
                  <p className="tl-desc">Percentage: 96.6%</p>
                </div>
              </motion.div>
            </div>

            <p className="cred-col-title" style={{ marginTop: '2.5rem' }}><BookOpen size={12} style={{ marginRight: 4 }} />Training</p>
            <div className="timeline" role="list">
              <motion.div className="tl-item" role="listitem" {...fade(0.34)}>
                <div className="tl-dot" />
                <div>
                  <p className="tl-period">Jun 2026 – Jul 2026</p>
                  <p className="tl-title">Front-End Web Development</p>
                  <p className="tl-sub">Gokboru Tech Pvt. Ltd.</p>
                  <p className="tl-desc">
                    HTML, CSS, JavaScript, responsive web design, DOM manipulation, ES6+,
                    React.js, React Router, Hooks, Context API, Redux. Built Recipe Search and Quiz apps.
                  </p>
                  <span className="tl-badge">Certificate Awarded</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div>
            <p className="cred-col-title"><Trophy size={12} style={{ marginRight: 4 }} />Achievements</p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}>
              <div className="achievement-item">
                <div className="achievement-icon"><Trophy size={12} /></div>
                <p className="achievement-text">
                  <strong>1st position</strong> in the Tech Tussle Debate Competition at LPU, September 2025.
                </p>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon"><Award size={12} /></div>
                <p className="achievement-text">
                  <strong>100+ LeetCode problems</strong> solved since September 2025 — DSA & problem-solving proficiency.
                </p>
              </div>
            </motion.div>

            <p className="cred-col-title" style={{ marginTop: '2.5rem' }}><Award size={12} style={{ marginRight: 4 }} />Certificates</p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28 }}>
              <div className="cert-item">
                <p className="cert-name">Oracle AI Database Certified Foundations Associate</p>
                <p className="cert-org">Oracle · August 2026</p>
              </div>
              <div className="cert-item">
                <p className="cert-name">Database Management System Part 1</p>
                <p className="cert-org">Infosys Springboard · July 2026</p>
              </div>
              <div className="cert-item">
                <p className="cert-name">Programming Using C++</p>
                <p className="cert-org">Infosys Springboard · August 2025</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
