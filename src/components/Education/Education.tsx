import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, BookOpen, ShieldAlert, Cpu } from 'lucide-react';
import './Education.css';

const achievements = [
  { id: 'ieee', title: 'IEEE Web Security', icon: ShieldAlert, unlocked: false },
  { id: 'nptel', title: 'NPTEL Certifications', desc: 'Python, Software Testing, IoT', icon: BookOpen, unlocked: false },
  { id: 'eyantra', title: "E-Yantra Teachers' Competition", icon: Cpu, unlocked: false },
  { id: 'pentathon', title: 'Pentathon 14th Place', desc: 'Cyber Security CTF', icon: Award, unlocked: false }
];

const Education = () => {
  const [badges, setBadges] = useState(achievements);

  const handleUnlock = (id: string, e: React.MouseEvent) => {
    const badgeIndex = badges.findIndex(b => b.id === id);
    if (!badges[badgeIndex].unlocked) {
      // Trigger pop animation & confetti
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x, y },
        colors: ['#FFD700', '#00F5FF']
      });

      setBadges(prev => 
        prev.map(b => b.id === id ? { ...b, unlocked: true } : b)
      );
    }
  };

  return (
    <section id="education" className="education-section section-container">
      <div className="section-header">
        <h2 className="text-gradient">Training & Upgrades</h2>
        <p>Acquiring new capabilities and leveling up.</p>
      </div>

      <div className="education-content">
        <div className="cards-column">
          {/* Holographic University Card */}
          <div className="holographic-card-container">
            <div className="holographic-card">
              <div className="card-glare"></div>
              <div className="edu-content">
                <div className="edu-badge">B.Tech</div>
                <h3>Sethu Institute of Technology</h3>
                <h4 className="major">AI & Data Science</h4>
                <div className="edu-meta">
                  <span>2022 - 2026</span>
                  <span className="cgpa">CGPA: 76.5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* HSC Card */}
          <div className="holographic-card-container">
            <div className="holographic-card">
              <div className="card-glare"></div>
              <div className="edu-content">
                <div className="edu-badge">HSC (12th)</div>
                <h3>Velammal Vidhyalaya Viraganoor</h3>
                <h4 className="major">Higher Secondary</h4>
                <div className="edu-meta">
                  <span>Passed out: 2022</span>
                  <span className="cgpa">Grade: 65%</span>
                </div>
              </div>
            </div>
          </div>

          {/* SSLC Card */}
          <div className="holographic-card-container">
            <div className="holographic-card">
              <div className="card-glare"></div>
              <div className="edu-content">
                <div className="edu-badge">SSLC (10th)</div>
                <h3>TVS Lakshmi School</h3>
                <h4 className="major">Secondary Education</h4>
                <div className="edu-meta">
                  <span>Passed out: 2020</span>
                  <span className="cgpa">Grade: 69%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unlockable Badges */}
        <div className="achievements-grid">
          <h3>Achievements Inventory</h3>
          <div className="badges-container">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <motion.div 
                  key={badge.id}
                  className={`achievement-badge ${badge.unlocked ? 'unlocked' : 'locked'}`}
                  onClick={(e) => handleUnlock(badge.id, e)}
                  whileHover={{ scale: badge.unlocked ? 1.05 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="badge-icon">
                    <Icon size={32} />
                  </div>
                  <div className="badge-info">
                    <h4>{badge.unlocked ? badge.title : '???'}</h4>
                    {badge.desc && badge.unlocked && <p>{badge.desc}</p>}
                    {!badge.unlocked && <p className="click-to-unlock">Click to unlock</p>}
                  </div>
                  {badge.unlocked && <div className="glow-effect"></div>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
