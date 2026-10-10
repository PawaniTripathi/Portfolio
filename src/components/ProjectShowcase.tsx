import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

// ── SVG preview illustrations ─────────────────────────────────────────────────

function CollabPreview() {
  return (
    <div className="project-card__preview-inner pc-collab">
      <svg viewBox="0 0 280 158" style={{ width:'100%', height:'100%' }}>
        <rect x="8" y="8" width="118" height="142" rx="5" fill="#111c30" opacity="0.9" />
        <rect x="12" y="12" width="110" height="18" rx="3" fill="#152040" />
        <text x="17" y="24" fontFamily="IBM Plex Mono" fontSize="7" fill="#8CCBFF"># general</text>
        <rect x="12" y="34" width="110" height="11" rx="2" fill="none" />
        <text x="17" y="43" fontFamily="IBM Plex Mono" fontSize="6" fill="#69717B"># random</text>
        <text x="17" y="56" fontFamily="IBM Plex Mono" fontSize="6" fill="#69717B"># dev-ops</text>
        <rect x="134" y="8" width="138" height="142" rx="5" fill="#111c30" opacity="0.9" />
        <rect x="142" y="18" width="88" height="14" rx="3" fill="#1a2a45" />
        <text x="148" y="28" fontFamily="IBM Plex Mono" fontSize="6" fill="#A0A5AD">Hey! Ready to ship?</text>
        <rect x="184" y="40" width="80" height="14" rx="3" fill="#FF8066" opacity="0.2" />
        <text x="190" y="50" fontFamily="IBM Plex Mono" fontSize="6" fill="#FF8066">Yes! Deploying now.</text>
        <rect x="142" y="62" width="70" height="14" rx="3" fill="#1a2a45" />
        <text x="148" y="72" fontFamily="IBM Plex Mono" fontSize="6" fill="#A0A5AD">Sub-100ms ✓</text>
        <text x="200" y="128" fontFamily="IBM Plex Mono" fontSize="7" fill="#FF8066" opacity="0.6">Redis ⚡</text>
      </svg>
    </div>
  );
}

function CampusPreview() {
  return (
    <div className="project-card__preview-inner pc-campus">
      <svg viewBox="0 0 280 158" style={{ width:'100%', height:'100%' }}>
        <rect x="8" y="8" width="82" height="62" rx="5" fill="#0d1a1a" opacity="0.9" />
        <text x="16" y="24" fontFamily="Space Grotesk" fontSize="8" fill="#FF8066" fontWeight="600">Applicant</text>
        <text x="16" y="36" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#69717B">Resume ✓</text>
        <text x="16" y="46" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#69717B">Applied: 3</text>
        <circle cx="18" cy="58" r="3" fill="#7EC89A" />
        <text x="24" y="62" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#7EC89A">Active</text>
        <rect x="98" y="8" width="82" height="62" rx="5" fill="#0d1a1a" opacity="0.9" />
        <text x="106" y="24" fontFamily="Space Grotesk" fontSize="8" fill="#FF8066" fontWeight="600">Recruiter</text>
        <text x="106" y="36" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#69717B">Listings: 5</text>
        <text x="106" y="46" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#69717B">Pending: 12</text>
        <circle cx="108" cy="58" r="3" fill="#7EC89A" />
        <text x="114" y="62" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#7EC89A">Active</text>
        <rect x="8" y="80" width="262" height="70" rx="5" fill="#0d1a1a" opacity="0.9" />
        <text x="16" y="96" fontFamily="Space Grotesk" fontSize="7.5" fill="#F4F0E8" fontWeight="600">Performance Gains</text>
        <text x="16" y="112" fontFamily="IBM Plex Mono" fontSize="6" fill="#69717B">Page Load</text>
        <rect x="70" y="106" width="162" height="5" rx="2" fill="#242B32" />
        <rect x="70" y="106" width="138" height="5" rx="2" fill="#FF8066" opacity="0.55" />
        <text x="238" y="112" fontFamily="IBM Plex Mono" fontSize="6" fill="#FF8066">85%</text>
        <text x="16" y="128" fontFamily="IBM Plex Mono" fontSize="6" fill="#69717B">Tracking</text>
        <rect x="70" y="122" width="162" height="5" rx="2" fill="#242B32" />
        <rect x="70" y="122" width="112" height="5" rx="2" fill="#8CCBFF" opacity="0.45" />
        <text x="238" y="128" fontFamily="IBM Plex Mono" fontSize="6" fill="#8CCBFF">70%</text>
      </svg>
    </div>
  );
}

function WanderPreview() {
  return (
    <div className="project-card__preview-inner pc-wander">
      <svg viewBox="0 0 280 158" style={{ width:'100%', height:'100%' }}>
        <rect x="8" y="8" width="155" height="142" rx="5" fill="#150d0a" opacity="0.9" />
        {[30,50,70,90,110,130].map(y=>(
          <line key={y} x1="8" y1={y} x2="163" y2={y} stroke="#242B32" strokeWidth="0.5" />
        ))}
        {[30,60,90,120,150].map(x=>(
          <line key={x} x1={x} y1="8" x2={x} y2="150" stroke="#242B32" strokeWidth="0.5" />
        ))}
        <circle cx="65" cy="72" r="5" fill="#FF8066" opacity="0.8" />
        <circle cx="105" cy="55" r="5" fill="#8CCBFF" opacity="0.7" />
        <circle cx="88" cy="102" r="5" fill="#FF8066" opacity="0.6" />
        <line x1="65" y1="72" x2="105" y2="55" stroke="#FF8066" strokeWidth="1" strokeDasharray="3,2" opacity="0.4" />
        <line x1="105" y1="55" x2="88" y2="102" stroke="#FF8066" strokeWidth="1" strokeDasharray="3,2" opacity="0.4" />
        <text x="15" y="22" fontFamily="Space Grotesk" fontSize="7" fill="#FF8066" fontWeight="600">Destinations</text>
        <rect x="170" y="8" width="102" height="70" rx="5" fill="#150d0a" opacity="0.9" />
        <text x="178" y="23" fontFamily="Space Grotesk" fontSize="7" fill="#FF8066" fontWeight="600">AI Itinerary</text>
        <text x="178" y="35" fontFamily="IBM Plex Mono" fontSize="5" fill="#69717B">Day 1: Arrival</text>
        <text x="178" y="46" fontFamily="IBM Plex Mono" fontSize="5" fill="#69717B">Day 2: Explore</text>
        <text x="178" y="57" fontFamily="IBM Plex Mono" fontSize="5" fill="#69717B">Day 3: Museum</text>
        <rect x="178" y="63" width="85" height="8" rx="2" fill="#FF8066" opacity="0.08" />
        <text x="184" y="69.5" fontFamily="IBM Plex Mono" fontSize="4.5" fill="#FF8066">Generated by AI ✓</text>
        <rect x="170" y="86" width="102" height="50" rx="5" fill="#150d0a" opacity="0.9" />
        <text x="178" y="101" fontFamily="Space Grotesk" fontSize="7" fill="#F4F0E8" fontWeight="600">Hotel Booking</text>
        <text x="178" y="113" fontFamily="IBM Plex Mono" fontSize="5" fill="#69717B">JWT secured ✓</text>
        <text x="178" y="124" fontFamily="IBM Plex Mono" fontSize="5" fill="#69717B">50% less planning</text>
      </svg>
    </div>
  );
}

const previewMap: Record<string, React.FC> = {
  'project-preview--collab': CollabPreview,
  'project-preview--campus': CampusPreview,
  'project-preview--wander': WanderPreview,
};

export default function ProjectShowcase() {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section id="projects" className="projects section-py" ref={ref} aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Projects</p>
          <h2 id="projects-heading" className="section-title">Selected work.</h2>
        </div>

        <div className="projects__grid" role="list">
          {projects.map((project, i) => {
            const Preview = previewMap[project.previewClass];
            return (
              <motion.article
                key={project.slug}
                className="project-card"
                role="listitem"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => navigate(`/projects/${project.slug}`)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${project.slug}`)}
                aria-label={`View case study: ${project.name}`}
              >
                <span className="project-card__num">{project.num}</span>
                <div className="project-card__preview" aria-hidden="true">
                  {Preview && <Preview />}
                </div>
                <h3 className="project-card__name">{project.name}</h3>
                <p className="project-card__desc">{project.tagline}</p>
                <div className="project-card__techs" aria-label="Technologies">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-tag">+{project.technologies.length - 3}</span>
                  )}
                </div>
                <span className="project-card__action" aria-hidden="true">
                  View case study <ArrowUpRight size={12} />
                </span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
