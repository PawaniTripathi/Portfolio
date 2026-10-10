import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectShowcase from '../components/ProjectShowcase';
import SkillsSection from '../components/SkillsSection';
import CredentialsSection from '../components/CredentialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <AboutSection />
      <ProjectShowcase />
      <SkillsSection />
      <CredentialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
