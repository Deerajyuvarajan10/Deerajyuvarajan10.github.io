import { useEffect, useState } from 'react';
import './styles/global.css';

// Components
import CustomCursor from './components/Cursor/CustomCursor';
import Navbar from './components/Navbar/Navbar';
import DexRobot from './components/DexRobot/DexRobot';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Hooks
import useEasterEgg from './hooks/useEasterEgg';

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const isPartyTime = useEasterEgg();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simple loading screen
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Intersection Observer for sections to update DEX robot context
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => observer.observe(sec));

    return () => sections.forEach(sec => observer.unobserve(sec));
  }, []);

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0A0A0F', color: '#00F5FF', flexDirection: 'column', gap: '20px' }}>
        <div className="loader" style={{ width: '50px', height: '50px', border: '3px solid transparent', borderTopColor: '#00F5FF', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ fontFamily: 'DM Mono', letterSpacing: '2px' }}>INITIALIZING DEX...</p>
        <style>
          {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
        </style>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar currentSection={currentSection} />
      
      {/* If easter egg triggered, pass a prop or class to make DEX dance. Hide entirely on mobile. */}
      {!isMobile && (
        <div className={isPartyTime ? 'party-mode' : ''}>
          <DexRobot currentSection={isPartyTime ? 'party' : currentSection} />
        </div>
      )}

      {isPartyTime && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, color: '#FFD700', fontSize: '2rem', textAlign: 'center', pointerEvents: 'none', textShadow: '0 0 20px #FFD700' }}>
          <h2>Achievement Unlocked:</h2>
          <p>You found the secret! 🎉</p>
        </div>
      )}

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
