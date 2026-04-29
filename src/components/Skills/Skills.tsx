import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css';

const skillsData = [
  // AI / ML (Inner orbit)
  { id: 1, name: 'Python', category: 'ai', angle: 0, description: 'Advanced data analysis, NLP & backend.' },
  { id: 2, name: 'ML Models', category: 'ai', angle: 120, description: 'Predictive modeling & classification.' },
  { id: 3, name: 'LLMs', category: 'ai', angle: 240, description: 'RAG, prompt engineering, API integration.' },
  
  // Frontend (Mid orbit)
  { id: 4, name: 'React.js', category: 'frontend', angle: 45, description: 'Interactive web UI & state management.' },
  { id: 5, name: 'Three.js', category: 'frontend', angle: 165, description: '3D Web Experiences & animations.' },
  { id: 6, name: 'Vite', category: 'frontend', angle: 285, description: 'Lightning-fast build tooling.' },
  
  // Tools (Outer orbit)
  { id: 7, name: 'Git/GitHub', category: 'tools', angle: 90, description: 'Version control & team collaboration.' },
  { id: 8, name: 'Node.js', category: 'tools', angle: 210, description: 'Scalable backend services & APIs.' },
  { id: 9, name: 'Docker', category: 'tools', angle: 330, description: 'Containerization & deployment.' },
];

interface SkillData {
  id: number;
  name: string;
  category: string;
  angle: number;
  description: string;
}

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const handleOrbClick = (skill: SkillData) => {
    setSelectedSkill(skill);
  };

  return (
    <section id="skills" className="skills-section section-container">
      <div className="section-header">
        <h2 className="text-gradient">Tech Constellation</h2>
        <p>My technical universe, organized by orbits.</p>
      </div>

      <div className="solar-system-container hidden-mobile">
        <div className="sun">
          <span>AI</span>
        </div>

        {/* Orbits */}
        <div className="orbit orbit-core"></div>
        <div className="orbit orbit-mid"></div>
        <div className="orbit orbit-outer"></div>

        {/* Skill Orbs */}
        {skillsData.map((skill) => {
          const orbitRadius = skill.category === 'ai' ? 120 : skill.category === 'frontend' ? 220 : 320;
          const isHovered = hoveredSkill === skill.id;
          
          return (
            <div
              key={skill.id}
              className={`skill-orb-container ${skill.category}`}
              style={{
                transform: `rotate(${skill.angle}deg) translateX(${orbitRadius}px)`,
                zIndex: isHovered ? 10 : 1
              }}
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => handleOrbClick(skill)}
            >
              <motion.div 
                className="skill-orb"
                initial={{ rotate: -skill.angle }}
                animate={{ 
                  scale: isHovered ? 1.2 : 1,
                  rotate: -skill.angle 
                }}
              >
                <span>{skill.name}</span>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Mobile Skills Grid */}
      <div className="mobile-skills-grid hidden-desktop">
        {['ai', 'frontend', 'tools'].map(cat => (
          <div key={cat} className="skill-category-group">
            <h3 className="category-title">{cat === 'ai' ? 'AI / ML' : cat === 'frontend' ? 'Frontend' : 'Tools'}</h3>
            <div className="category-cards">
              {skillsData.filter(s => s.category === cat).map(skill => (
                <div key={skill.id} className={`mobile-skill-card ${skill.category}`} onClick={() => handleOrbClick(skill)}>
                  <div className="skill-icon-placeholder">
                    {skill.name.charAt(0)}
                  </div>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <p className="skill-desc-small">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div 
            className="skill-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div 
              className="skill-modal"
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{selectedSkill.name}</h3>
              <div className="modal-orbit-badge">{selectedSkill.category.toUpperCase()}</div>
              <p>{selectedSkill.description}</p>
              <button className="close-btn" onClick={() => setSelectedSkill(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
