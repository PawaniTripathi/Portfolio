import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Projects', href: '/#projects' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

const RESUME_PDF = '/resume/pawani_tripathi_resume.pdf';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const sections = ['home', 'projects', 'about', 'skills', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHome = location.pathname === '/';

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Pawani Tripathi — Home">
          PT<span className="navbar__logo-dot">.</span>
        </Link>

        {isHome && (
          <ul className="navbar__nav" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  className={`navbar__nav-link${activeSection === link.label.toLowerCase() ? ' active' : ''}`}
                  onClick={() => handleNav(link.href)}
                  aria-current={activeSection === link.label.toLowerCase() ? 'page' : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        <a
          href={RESUME_PDF}
          className="navbar__resume"
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label="Download resume PDF"
          id="nav-resume-btn"
        >
          Resume <ArrowUpRight size={12} />
        </a>

        {isHome && (
          <button
            className="navbar__menu-btn"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
      </div>

      {isHome && (
        <div className={`navbar__mobile-nav${mobileOpen ? ' open' : ''}`} aria-hidden={!mobileOpen}>
          {navLinks.map((link) => (
            <button key={link.label} className="navbar__mobile-link" onClick={() => handleNav(link.href)}>
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
