import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';
import './Hero.css';

// Typewriter hook
const useTypewriter = (words: string[], speed = 100, pause = 2000) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
};

// Glitch text component
const GlitchText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split('').map((_letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        }).join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3; // Controls speed of resolution
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <h1 className="glitch-name" data-text={text}>{displayText}</h1>;
};

// 3D Background Component
const Scene = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  
  useFrame((_state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.2;
      torusRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00F5FF" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8A2BE2" />
      <Torus ref={torusRef} args={[3, 0.2, 16, 100]} position={[0, 0, -5]}>
        <meshStandardMaterial color="#12121A" wireframe={true} emissive="#00F5FF" emissiveIntensity={0.2} />
      </Torus>
    </>
  );
};

const Hero = () => {
  const titles = ["AI Engineer", "Flutter Developer", "ML Enthusiast", "Problem Solver"];
  const typewriterText = useTypewriter(titles);
  const [particles, setParticles] = useState<{left: string, top: string, animationDelay: string, animationDuration: string}[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setParticles([...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`
      })));
    }, 0);
  }, []);

  return (
    <section id="hero" className="hero-section section-container">
      <div className="canvas-container">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
      
      {/* Particles layer - simplified with CSS for performance */}
      <div className="particles-layer">
        {particles.map((style, i) => (
          <div key={i} className="particle" style={style}></div>
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-layout">
          <motion.div
            className="hero-text-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="status-badge">
              <span className="pulse-dot"></span>
              SYSTEM ONLINE
            </div>
            <GlitchText text="DEERAJ YUVARAJAN" />
            <h2 className="subtitle">
              &gt; <span className="typewriter">{typewriterText}</span><span className="cursor">|</span>
            </h2>
            <h3 className="hero-subheading">
              AI Developer | Building Scalable ML & Web Applications
            </h3>
            <p className="hero-desc">
              Specialized in NLP, React, and 3D Web Experiences.
            </p>
            
            <div className="hero-cta-group">
              <a href="#projects" className="cta-button">
                <span>VIEW PROJECTS</span>
                <span className="arrow">→</span>
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-image-section"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="profile-image-container">
              <img src="/profile.jpeg" alt="Deeraj Yuvarajan" className="profile-image" />
              <div className="profile-glow"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
