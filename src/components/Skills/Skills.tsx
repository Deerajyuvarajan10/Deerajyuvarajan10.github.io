import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css';

const skillsData = [
  // Core orbit (inner)
  { id: 1, name: 'Python', category: 'core', angle: 0, description: 'Advanced data analysis & backend.' },
  { id: 2, name: 'ML', category: 'core', angle: 120, description: 'Isolation Forest, predictive modeling.' },
  { id: 3, name: 'LLMs', category: 'core', angle: 240, description: 'RAG, Gemini integration, Prompt Eng.' },
  
  // Mid orbit
  { id: 4, name: 'Flutter', category: 'mid', angle: 45, description: 'Cross-platform mobile apps.' },
  { id: 5, name: 'React.js', category: 'mid', angle: 165, description: 'Interactive web UI & animations.' },
  { id: 6, name: 'Node.js', category: 'mid', angle: 285, description: 'Scalable backend services.' },
  
  // Outer orbit
  { id: 7, name: 'Docker', category: 'outer', angle: 90, description: 'Containerization & deployment.' },
  { id: 8, name: 'Git', category: 'outer', angle: 210, description: 'Version control & collaboration.' },
  { id: 9, name: 'FastAPI', category: 'outer', angle: 330, description: 'High-performance Python APIs.' },
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

      <div className="solar-system-container">
        <div className="sun">
          <span>AI</span>
        </div>

        {/* Orbits */}
        <div className="orbit orbit-core"></div>
        <div className="orbit orbit-mid"></div>
        <div className="orbit orbit-outer"></div>

        {/* Skill Orbs */}
        {skillsData.map((skill) => {
          const orbitRadius = skill.category === 'core' ? 120 : skill.category === 'mid' ? 220 : 320;
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
              <div className="modal-orbit-badge">{selectedSkill.category} orbit</div>
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
