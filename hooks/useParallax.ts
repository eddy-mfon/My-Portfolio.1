import { useEffect, useState, useRef } from 'react';

/**
 * A hook that returns a scroll offset value multiplied by a speed factor.
 * Uses requestAnimationFrame for performance.
 * 
 * @param speed - The parallax speed. < 1 is slower than scroll, > 1 is faster. 
 *                Negative values move in reverse.
 * @returns The calculated offset in pixels.
 */
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending frame to avoid stacking updates
      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        setOffset(window.scrollY * speed);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, [speed]);

  return offset;
};