import { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = () => {
      const target = document.elementFromPoint(position.x, position.y);
      if (target) {
        const style = window.getComputedStyle(target);
        if (style.cursor === 'pointer' || target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button') {
          setIsPointer(true);
        } else {
          setIsPointer(false);
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [position.x, position.y]);

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <div
        className={`cursor-outline ${isPointer ? 'pointer' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
    </>
  );
};

export default CustomCursor;
