import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './Experience.css';

const experiences = [
  {
    id: 1,
    role: "AI Developer Intern",
    company: "Dzyte Services",
    period: "Jan 2026 - Mar 2026",
    summary: "Built MyOneQR platform with Flutter + PHP + MySQL + PWA",
    learnings: ["Full-stack mobile/web integration", "Database optimization", "Cross-platform deployment strategies"]
  },
  {
    id: 2,
    role: "MERN Stack Intern",
    company: "QUEXI Technologies",
    period: "Oct 2024 - Nov 2024",
    summary: "Developed scalable web applications using MongoDB, Express, React, and Node.js.",
    learnings: ["RESTful API design", "React state management", "Backend routing and middleware"]
  }
];

interface ExperienceData {
  id: number;
  role: string;
  company: string;
  period: string;
  summary: string;
  learnings: string[];
}

const ExperienceNode = ({ exp }: { exp: ExperienceData }) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });

  return (
    <div className="timeline-node" ref={ref}>
      <div className={`heartbeat-dot ${inView ? 'active' : ''}`}></div>
      <div className="flip-card-container">
        <div className="flip-card">
          <div className="flip-card-front">
            <h3 className="role">{exp.role}</h3>
            <h4 className="company">@ {exp.company}</h4>
            <div className="period">{exp.period}</div>
            <p className="summary">{exp.summary}</p>
            <div className="hover-hint">Hover for details ⟳</div>
          </div>
          <div className="flip-card-back">
            <h4>Key Learnings</h4>
            <ul>
              {exp.learnings.map((l: string, i: number) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a horizontal scroll effect based on vertical scroll if we want,
  // but standard CSS horizontal scroll is requested ("Horizontal scrollable timeline (drag or scroll)")
  // We'll use CSS `overflow-x: auto` for simplicity and standard UX.

  return (
    <section id="experience" className="experience-section section-container">
      <div className="section-header">
        <h2 className="text-gradient">Career Timeline</h2>
        <p>Tracing the neural pathways of my professional journey.</p>
      </div>

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline-wire">
          <div className="data-flow"></div>
        </div>
        
        <div className="timeline-nodes-wrapper">
          {experiences.map((exp) => (
            <ExperienceNode key={exp.id} exp={exp} />
          ))}
          {/* Add a future node */}
          <div className="timeline-node future">
             <div className="heartbeat-dot"></div>
             <div className="flip-card-container">
               <div className="future-card">
                 <h3>Your Company?</h3>
                 <p>Loading future possibilities...</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
