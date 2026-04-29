import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const useEasterEgg = () => {
  const [isPartyTime, setIsPartyTime] = useState(false);
  
  useEffect(() => {
    let inputSequence = '';
    const secretCode = 'DEERAJ';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the new key, convert to uppercase
      inputSequence += e.key.toUpperCase();
      
      // Keep only the last N characters
      if (inputSequence.length > secretCode.length) {
        inputSequence = inputSequence.slice(1);
      }
      
      // Check for match
      if (inputSequence === secretCode) {
        setIsPartyTime(true);
        
        // Trigger confetti explosion
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#00F5FF', '#FFD700', '#8A2BE2']
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#00F5FF', '#FFD700', '#8A2BE2']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
        
        // Reset after duration
        setTimeout(() => {
          setIsPartyTime(false);
          inputSequence = '';
        }, duration);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return isPartyTime;
};

export default useEasterEgg;
