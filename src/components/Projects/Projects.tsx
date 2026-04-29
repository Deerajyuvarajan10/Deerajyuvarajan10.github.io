import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import confetti from 'canvas-confetti';
import './Projects.css';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const projects = [
  { id: 1, title: 'WattWise', desc: 'AI-Based Smart Energy Monitoring App (Flutter + Isolation Forest ML)', color: '#00FF00', theme: 'electric', githubLink: 'https://github.com/Deerajyuvarajan10/Wattwise.git', images: ['/wattwise-1.png', '/wattwise-2.png', '/wattwise-3.png', '/wattwise-4.png', '/wattwise-5.png'] },
  { id: 2, title: 'MediBot', desc: 'AI Healthcare Assistant (Flutter + Gemini LLM + OCR)', color: '#00F5FF', theme: 'medical', githubLink: 'https://github.com/Deerajyuvarajan10/MediBot.git', images: ['/medibot-1.png', '/medibot-2.png'] },
  { id: 3, title: 'Smart Plate', desc: 'Food Spoilage Detection Device (IoT Sensors)', color: '#FF8C00', theme: 'sensor', githubLink: 'https://github.com/Deerajyuvarajan10/Smart_Plate.git', images: ['/smartplate-1.jpeg', '/smartplate-2.jpeg'] },
  { id: 4, title: 'Questify', desc: 'Gamified Task Management Web App (XP system + dashboards)', color: '#8A2BE2', theme: 'gaming', githubLink: 'https://github.com/Deerajyuvarajan10/questify-task-quest.git', images: ['/questify-1.png', '/questify-2.png', '/questify-3.png'] },
  { id: 5, title: 'Step Tracker', desc: 'Step Tracker App (React Native + Expo + Accelerometer)', color: '#FF1493', theme: 'fitness', githubLink: 'https://github.com/Deerajyuvarajan10/stepTrackerApp.git', images: ['/steptracker-1.jpeg'] }
];

interface ProjectData {
  id: number;
  title: string;
  desc: string;
  color: string;
  theme: string;
  githubLink: string;
  images?: string[];
}

const ImageSlider = ({ images, color }: { images?: string[], color: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider-container" style={{ borderColor: color, boxShadow: `0 0 15px ${color}40` }}>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slider-image" />
      
      {images.length > 1 && (
        <>
          <button className="slider-btn prev" onClick={prevImage}>&#10094;</button>
          <button className="slider-btn next" onClick={nextImage}>&#10095;</button>
          <div className="slider-dots">
            {images.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                style={{ backgroundColor: idx === currentIndex ? color : 'rgba(255,255,255,0.3)' }}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ project, onClick }: { project: ProjectData, onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s ease'
    });
  };

  const handleClick = () => {
    // Particle explosion
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: [project.color, '#ffffff', '#000000']
      });
    }
    onClick();
  };

  return (
    <div 
      ref={cardRef}
      className={`project-vault ${project.theme}`}
      style={{ ...tiltStyle, '--theme-color': project.color } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="vault-door">
        <div className="vault-lock">
          <div className="lock-ring"></div>
          <div className="lock-core"></div>
        </div>
      </div>
      <div className="vault-content">
        <h3>{project.title}</h3>
        <p>Click to Access</p>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  return (
    <section id="projects" className="projects-section section-container">
      <div className="section-header">
        <h2 className="text-gradient">Secure Data Vaults</h2>
        <p>Accessing classified project files...</p>
      </div>

      <div className="projects-grid">
        {projects.map((proj) => (
          <ProjectCard 
            key={proj.id} 
            project={proj} 
            onClick={() => setActiveProject(proj)} 
          />
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div 
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              className="project-full-card"
              style={{ borderTop: `4px solid ${activeProject.color}` }}
              initial={{ scale: 0.5, y: 100, opacity: 0, rotateX: 45 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, y: 100, opacity: 0, rotateX: -45 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="card-header" style={{ color: activeProject.color }}>
                <h2>{activeProject.title}</h2>
                <button className="close-icon" onClick={() => setActiveProject(null)}>×</button>
              </div>
              <div className="card-body">
                <ImageSlider images={activeProject.images} color={activeProject.color} />
                <p className="desc">{activeProject.desc}</p>
                <div className="fake-code-block">
                  <span className="comment">// Initializing project sequence...</span>
                  <br />
                  <span className="keyword">const</span> <span className="variable">system</span> = <span className="keyword">new</span> <span className="class">AIEngine</span>();
                  <br />
                  <span className="variable">system</span>.<span className="method">deploy</span>(<span className="string">'{activeProject.title}'</span>);
                  <br />
                  <span className="comment">// Status: SUCCESS</span>
                </div>
                
                {activeProject.githubLink && (
                  <div className="project-actions">
                    <a 
                      href={activeProject.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="github-link-btn"
                    >
                      <GithubIcon size={20} />
                      <span>View Repository</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
