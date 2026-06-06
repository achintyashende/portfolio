import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const orbRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch device
  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window ||
      window.matchMedia('(hover: none)').matches ||
      navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      if (isTouch) return;
      const { clientX, clientY } = e;
      posRef.current = { x: clientX, y: clientY };

      // Dot follows instantly
      if (dotRef.current) {
        gsap.set(dotRef.current, { x: clientX, y: clientY });
      }

      // Ring follows with smooth delay
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      // Orb follows with tight delay
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    },
    [isTouch]
  );

  const handlePointerOver = useCallback(
    (e) => {
      if (isTouch) return;
      const target = e.target;

      // Check for expand cursor targets
      const expandEl = target.closest('[data-cursor="expand"]');
      if (expandEl) {
        dotRef.current?.classList.add('is-hidden');
        ringRef.current?.classList.remove('is-pointer');
        ringRef.current?.classList.add('is-expand');
        return;
      }

      // Check for interactive elements
      const interactiveEl = target.closest(
        'a, button, [data-cursor="pointer"], input[type="submit"], label[for], [role="button"]'
      );
      if (interactiveEl) {
        dotRef.current?.classList.add('is-hidden');
        ringRef.current?.classList.add('is-pointer');
        ringRef.current?.classList.remove('is-expand');
        return;
      }
    },
    [isTouch]
  );

  const handlePointerOut = useCallback(
    (e) => {
      if (isTouch) return;
      const target = e.target;

      const expandEl = target.closest('[data-cursor="expand"]');
      const interactiveEl = target.closest(
        'a, button, [data-cursor="pointer"], input[type="submit"], label[for], [role="button"]'
      );

      if (expandEl || interactiveEl) {
        dotRef.current?.classList.remove('is-hidden');
        ringRef.current?.classList.remove('is-pointer');
        ringRef.current?.classList.remove('is-expand');
      }
    },
    [isTouch]
  );

  // Hide cursor when it leaves the window
  const handleMouseLeave = useCallback(() => {
    if (dotRef.current) gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
    if (ringRef.current)
      gsap.to(ringRef.current, { opacity: 0, duration: 0.2 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (dotRef.current) gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
    if (ringRef.current)
      gsap.to(ringRef.current, { opacity: 1, duration: 0.2 });
  }, []);

  useEffect(() => {
    if (isTouch) return;

    // Hide native cursor globally
    document.documentElement.style.cursor = 'none';

    // Add all listeners
    document.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    document.addEventListener('pointerover', handlePointerOver, {
      passive: true,
    });
    document.addEventListener('pointerout', handlePointerOut, {
      passive: true,
    });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Also hide cursor on all interactive elements
    const style = document.createElement('style');
    style.id = 'custom-cursor-hide';
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.documentElement.style.cursor = '';
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );
      const existing = document.getElementById('custom-cursor-hide');
      if (existing) existing.remove();
    };
  }, [
    isTouch,
    handlePointerMove,
    handlePointerOver,
    handlePointerOut,
    handleMouseLeave,
    handleMouseEnter,
  ]);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <div className="custom-cursor" id="custom-cursor">
      <div className="cursor-glow-orb" ref={orbRef} />
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef}>
        <span className="cursor-ring__label">VIEW</span>
      </div>
    </div>
  );
}
