import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

const contactLinks = [
  { Icon: Mail,         label: 'Email',    value: 'pawanitripathi0@gmail.com',        href: 'mailto:pawanitripathi0@gmail.com', id: 'contact-email' },
  { Icon: GithubIcon,   label: 'GitHub',   value: 'github.com/PawaniTripathi',        href: 'https://github.com/PawaniTripathi', id: 'contact-github' },
  { Icon: LinkedinIcon, label: 'LinkedIn', value: 'linkedin.com/in/pawanitripathi',   href: 'https://www.linkedin.com/in/pawanitripathi/', id: 'contact-linkedin' },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section id="contact" className="contact section-py" ref={ref} aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact__inner">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-header">
              <p className="section-label">Contact</p>
            </div>
            <h2 id="contact-heading" className="contact__cta">Have something worth building?</h2>
            <p className="contact__desc">
              I'm always happy to hear about interesting projects, opportunities, or collaborations.
              Reach out through any of the channels below.
            </p>
            <nav className="contact__links" aria-label="Contact links">
              {contactLinks.map(({ Icon, label, value, href, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  className="contact__link"
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={`${label}: ${value}`}
                >
                  <div className="contact__link-icon" aria-hidden="true">
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="contact__link-label">{label}</p>
                    <p className="contact__link-value">{value}</p>
                  </div>
                  <ArrowUpRight size={12} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Right */}
          <motion.div
            className="contact__right"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label" style={{ marginBottom: '1.25rem' }}>A note</p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              lineHeight: 1.45,
              color: 'var(--text)',
              marginBottom: '1.5rem',
            }}>
              "I'm actively looking for internship and full-time opportunities in software development."
            </p>
            <div className="contact__note">
              📍 Based in India · Open to remote and on-site roles
              <br /><br />
              Email me at{' '}
              <a href="mailto:pawanitripathi0@gmail.com" style={{ color: 'var(--coral)', fontWeight: 600 }}>
                pawanitripathi0@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
