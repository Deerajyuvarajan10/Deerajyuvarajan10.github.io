import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import './DexRobot.css';

const interactions = [
  {
    text: "Hi! 👋 I'm Dex. Deeraj is an AI Engineer who loves building intelligent systems!",
    animation: { rotate: [0, -20, 20, -20, 20, 0] },
    duration: 1
  },
  {
    text: "Deeraj is a wizard at Flutter. Ask him about his cross-platform apps! 📱",
    animation: { y: [0, -30, 0, -30, 0] },
    duration: 1
  },
  {
    text: "Did you know? Deeraj uses Machine Learning to solve real-world problems. 🧠",
    animation: { rotateY: [0, 360] },
    duration: 0.8
  },
  {
    text: "He built me! 🤖 I run on React, but he's also amazing at Python and Dart.",
    animation: { x: [0, -15, 15, -15, 15, 0] },
    duration: 0.6
  },
  {
    text: "If he's not coding, he's probably learning something new or drinking coffee ☕",
    animation: { rotateZ: [0, 360] },
    duration: 1
  }
];

interface DexRobotProps {
  currentSection: string;
}

const DexRobot = ({ currentSection }: DexRobotProps) => {
  const [speech, setSpeech] = useState("Hey! I'm DEX — Deeraj's AI buddy! 👋");
  const [currentAnimation, setCurrentAnimation] = useState<any>({});
  const [armAnimation, setArmAnimation] = useState<any>({ rotate: 0, originX: '30px', originY: '35px' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [interactionIndex, setInteractionIndex] = useState(0);

  // Cursor follow logic using framer-motion springs
  const springConfig = { damping: 25, stiffness: 120, mass: 1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by some amount so robot floats near cursor, not directly on it
      cursorX.set(e.clientX + 30);
      cursorY.set(e.clientY + 30);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Contextual text updates
  useEffect(() => {
    const updateSpeech = () => {
      switch (currentSection) {
        case 'hero':
          setSpeech("Hey! I'm DEX — Deeraj's AI buddy! 👋");
          break;
        case 'skills':
          setSpeech("Psst... he knows ML AND Flutter. Rare combo! 🔥");
          break;
        case 'projects':
          setSpeech("Click the cards — they explode! (in a good way) 💥");
          break;
        case 'experience':
          setSpeech("Look at that career timeline grow! 📈");
          break;
        case 'contact':
          setSpeech("Don't be shy, he doesn't bite 😄");
          break;
        default:
          break;
      }
    };
    setTimeout(updateSpeech, 0);
  }, [currentSection]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Don't trigger if they clicked a button or link (so it doesn't interfere)
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) return;

      if (isAnimating) return;
      setIsAnimating(true);
      
      // Cycle through interactions
      const interaction = interactions[interactionIndex];
      setInteractionIndex((prev) => (prev + 1) % interactions.length);
      
      setSpeech(interaction.text);
      setCurrentAnimation(interaction.animation);
      
      // Arm animations matching the gesture
      if (interactionIndex === 0) {
        // Wave
        setArmAnimation({ rotate: [0, -45, 15, -45, 15, 0], transition: { duration: 1 } });
      } else if (interactionIndex === 1) {
        // Point / Jump
        setArmAnimation({ y: [0, -20, 0, -20, 0], rotate: -45, transition: { duration: 1 } });
      } else if (interactionIndex === 2) {
        // Flip
        setArmAnimation({ rotateY: [0, 360], transition: { duration: 0.8 } });
      } else if (interactionIndex === 3) {
        // Shake
        setArmAnimation({ x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.6 } });
      } else {
        // Spin
        setArmAnimation({ rotateZ: [0, 360], transition: { duration: 1 } });
      }
      
      setTimeout(() => {
        setCurrentAnimation({});
        setArmAnimation({ rotate: 0, y: 0, x: 0, rotateY: 0, rotateZ: 0 });
        setIsAnimating(false);
        
        // Revert text after 4 seconds
        setTimeout(() => {
          setSpeech(currentSection === 'hero' ? "Hey! I'm DEX — Deeraj's AI buddy! 👋" : 
                   currentSection === 'skills' ? "Psst... he knows ML AND Flutter. Rare combo! 🔥" :
                   currentSection === 'projects' ? "Click the cards — they explode! (in a good way) 💥" :
                   currentSection === 'experience' ? "Look at that career timeline grow! 📈" :
                   "Don't be shy, he doesn't bite 😄");
        }, 4000);
      }, interaction.duration * 1000);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isAnimating, interactionIndex, currentSection]);

  return (
    <motion.div 
      className="dex-container"
      style={{
        x: cursorX,
        y: cursorY,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      <div className="speech-bubble">
        {speech}
      </div>

      <motion.div 
        className="dex-body bobbing"
        animate={currentAnimation}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      >
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Antenna */}
          <path className="antenna" d="M50 15V5" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round"/>
          <circle className="antenna-ball" cx="50" cy="5" r="3" fill="#FFD700"/>
          
          {/* Arm with Hand */}
          <motion.g animate={armAnimation} style={{ transformOrigin: '30px 35px' }}>
            <path d="M30 35 L15 35 L10 25" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <circle cx="10" cy="25" r="4" fill="#FFD700"/>
          </motion.g>

          {/* Right Arm */}
          <path d="M70 35 L85 35 L90 45" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <circle cx="90" cy="45" r="4" fill="#00F5FF"/>

          {/* Head/Body */}
          <rect x="30" y="15" width="40" height="40" rx="10" fill="#12121A" stroke="#00F5FF" strokeWidth="2"/>
          
          {/* Eyes */}
          <rect className="eye" x="38" y="25" width="8" height="6" rx="2" fill="#00F5FF"/>
          <rect className="eye" x="54" y="25" width="8" height="6" rx="2" fill="#00F5FF"/>
          
          {/* Mouth */}
          <path d="M45 40Q50 45 55 40" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Floating Thruster */}
          <path d="M40 60L50 75L60 60" fill="url(#fireGradient)" />
          <defs>
            <linearGradient id="fireGradient" x1="50" y1="60" x2="50" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD700"/>
              <stop offset="1" stopColor="#FF4500" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default DexRobot;
