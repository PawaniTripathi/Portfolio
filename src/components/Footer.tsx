import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon } from './icons';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <Link to="/" className="footer__logo" aria-label="Pawani Tripathi — Back to top">
          PT<span className="footer__logo-dot">.</span>
        </Link>
        <p className="footer__copy">© {new Date().getFullYear()} Pawani Tripathi. Built with React + Vite.</p>
        <nav className="footer__links" aria-label="Social links">
          <a href="https://github.com/PawaniTripathi" className="footer__link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon size={15} />
          </a>
          <a href="https://www.linkedin.com/in/pawanitripathi/" className="footer__link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={15} />
          </a>
          <a href="mailto:pawanitripathi0@gmail.com" className="footer__link" aria-label="Email">
            <Mail size={15} />
          </a>
        </nav>
      </div>
    </footer>
  );
}
