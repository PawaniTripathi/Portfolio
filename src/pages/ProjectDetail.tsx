import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GithubIcon } from '../components/icons';
import { projects } from '../data/projects';
import Footer from '../components/Footer';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) document.title = `${project.name} — Pawani Tripathi`;
    return () => { document.title = 'Pawani Tripathi — Full-Stack Developer'; };
  }, [slug, project]);

  if (!project) {
    return (
      <div style={{ padding: '120px var(--px) 4rem', minHeight: '100vh', background: 'var(--bg)' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Project not found.</p>
          <button className="btn-coral" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/')}>
            <ArrowLeft size={14} /> Back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="project-detail" aria-labelledby="pd-title">
        <div className="container" style={{ paddingBottom: '4rem' }}>

          {/* Back */}
          <motion.button
            className="project-detail__back"
            onClick={() => { navigate('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 80); }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            id="pd-back-btn"
          >
            <ArrowLeft size={13} /> All projects
          </motion.button>

          {/* Header */}
          <motion.div
            className="project-detail__header"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="project-detail__num">{project.num} / 0{projects.length}</p>
            <h1 id="pd-title" className="project-detail__title">{project.name}</h1>
            <p className="project-detail__tagline">{project.tagline}</p>
          </motion.div>

          {/* Meta */}
          <motion.div
            className="project-detail__meta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
          >
            <div><p className="pdm-label">Date</p><p className="pdm-value">{project.date}</p></div>
            <div><p className="pdm-label">Type</p><p className="pdm-value">Full-Stack Application</p></div>
            <div><p className="pdm-label">Role</p><p className="pdm-value">Developer</p></div>
          </motion.div>

          {/* Body */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>

            <div className="project-detail__section">
              <h2 className="pds-title">Overview</h2>
              <div className="pds-body"><p>{project.description}</p></div>
            </div>

            <div className="project-detail__section">
              <h2 className="pds-title">The Problem</h2>
              <div className="pds-body"><p>{project.problem}</p></div>
            </div>

            <div className="project-detail__section">
              <h2 className="pds-title">The Solution</h2>
              <div className="pds-body"><p>{project.solution}</p></div>
            </div>

            <div className="project-detail__section">
              <h2 className="pds-title">Key Features</h2>
              <ul className="pds-features">
                {project.features.map((f) => (
                  <li key={f} className="pds-feature">
                    <span className="pds-bullet" aria-hidden="true" />{f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="project-detail__section">
              <h2 className="pds-title">Architecture & Implementation</h2>
              <div className="pds-body"><p>{project.architecture}</p></div>
            </div>

            <div className="project-detail__section">
              <h2 className="pds-title">Engineering Challenges</h2>
              <div className="pds-body"><p>{project.challenges}</p></div>
            </div>

            <div className="project-detail__section">
              <h2 className="pds-title">Technology Stack</h2>
              <div className="pds-techs">
                {project.technologies.map((t) => <span key={t} className="pds-tech">{t}</span>)}
              </div>
            </div>

            <div className="project-detail__section">
              <h2 className="pds-title">Reported Results</h2>
              <div className="pds-results">
                {project.results.map((r) => (
                  <div key={r.label} className="pds-result">
                    <p className="pds-result-value">{r.value}</p>
                    <p className="pds-result-label">{r.label}</p>
                  </div>
                ))}
              </div>
              <p className="pds-notice">* Results reported from development/testing — not independently verified production guarantees.</p>
            </div>

            {/* Links */}
            <div className="pds-links">
              {project.githubUrl ? (
                <a href={project.githubUrl} className="btn-dark" target="_blank" rel="noopener noreferrer" id={`${project.slug}-gh`}>
                  <GithubIcon size={13} /> GitHub <ArrowUpRight size={11} />
                </a>
              ) : (
                <span className="btn-dark" style={{ opacity: 0.4, cursor: 'default' }} title="Configure githubUrl in src/data/projects.ts">
                  <GithubIcon size={13} /> GitHub (not configured)
                </span>
              )}
              {project.liveUrl ? (
                <a href={project.liveUrl} className="btn-coral" target="_blank" rel="noopener noreferrer" id={`${project.slug}-live`}>
                  <ExternalLink size={13} /> Live Demo <ArrowUpRight size={11} />
                </a>
              ) : (
                <span className="btn-coral" style={{ opacity: 0.4, cursor: 'default' }} title="Configure liveUrl in src/data/projects.ts">
                  <ExternalLink size={13} /> Demo (not configured)
                </span>
              )}
            </div>

            {/* Prev / Next */}
            <div className="pds-nav">
              {prev ? (
                <div className="pdn-item" onClick={() => navigate(`/projects/${prev.slug}`)} onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${prev.slug}`)} tabIndex={0} role="button" aria-label={`Previous: ${prev.name}`} id="pd-prev">
                  <span className="pdn-label"><ChevronLeft size={10} style={{ display:'inline' }} /> Previous</span>
                  <span className="pdn-title">{prev.name}</span>
                </div>
              ) : <div />}
              {next ? (
                <div className="pdn-item pdn-item--next" onClick={() => navigate(`/projects/${next.slug}`)} onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${next.slug}`)} tabIndex={0} role="button" aria-label={`Next: ${next.name}`} id="pd-next">
                  <span className="pdn-label">Next <ChevronRight size={10} style={{ display:'inline' }} /></span>
                  <span className="pdn-title">{next.name}</span>
                </div>
              ) : <div />}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
