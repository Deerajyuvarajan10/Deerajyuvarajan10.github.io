import { useState, useEffect } from 'react';
import './Navbar.css';

interface NavbarProps {
  currentSection: string;
}

const Navbar = ({ currentSection }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' }
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="nav-logo" onClick={() => scrollTo('hero')}>
          <span className="logo-bracket">[</span>
          <span className="logo-text">DEERAJ</span>
          <span className="logo-bracket">]</span>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {links.map((link) => (
            <button
              key={link.id}
              className={`nav-link ${currentSection === link.id ? 'active' : ''}`}
              onClick={() => scrollTo(link.id)}
            >
              {link.name}
            </button>
          ))}
        </div>

        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
