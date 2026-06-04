import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ animate }) {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const photoRef = useRef(null);
  const orbRef = useRef(null);
  
  // Create an array for the drag me text so we can animate it
  const dragMeText = "DRAG ME".split('');

  // ── Entrance Animation ──
  useEffect(() => {
    if (!animate) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Name entrance (Bottom left)
      tl.fromTo(
        '.hero-name-char',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.02 }
      );

      // Role entrance (Top right)
      tl.fromTo(
        '.hero-role-char',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.02 },
        '-=0.8'
      );

      // Photo entrance
      tl.fromTo(
        photoRef.current,
        { scale: 0.8, opacity: 0, rotation: -5 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.5)' },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  // ── Removed Draggable (Fixed Position) ──

  // ── Ambient Cursor Glow ──
  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX;
    let orbY = mouseY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      orbX += (mouseX - orbX) * 0.05;
      orbY += (mouseY - orbY) * 0.05;
      
      gsap.set(orb, { x: orbX - 300, y: orbY - 300 });
      requestAnimationFrame(render);
    };
    render();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Split text helper
  const splitText = (text, className) => {
    return text.split('').map((char, i) => (
      char === ' ' 
        ? <span key={i} className={`${className} space`}>&nbsp;</span>
        : <span key={i} className={className}>{char}</span>
    ));
  };

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      
      {/* ── Ambient Glow Orb ── */}
      <div className="hero-ambient-orb" ref={orbRef}></div>

      {/* ── Top Right: Role & Location ── */}
      <div className="hero-role-block" ref={roleRef}>
        <h2 className="hero-role-line">{splitText('SOFTWARE', 'hero-role-char')}</h2>
        <h2 className="hero-role-line">{splitText('ENGINEER', 'hero-role-char')}</h2>
        <div className="hero-location">
          <span className="hero-location-dot"></span>
          HYDERABAD, INDIA
        </div>
      </div>

      {/* ── Bottom Left: Name ── */}
      <div className="hero-name-block" ref={nameRef}>
        <h1 className="hero-name-line">{splitText('ACHINTYA', 'hero-name-char')}</h1>
        <h1 className="hero-name-line">{splitText('SHENDE', 'hero-name-char')}</h1>
      </div>

      {/* ── Interactive Scroll Indicator ── */}
      <div 
        className="hero-scroll-btn"
        onMouseEnter={() => { gsap.to('.hero-scroll-btn-icon', { x: 8, duration: 0.4, yoyo: true, repeat: -1, ease: 'power1.inOut' }) }}
        onMouseLeave={() => { gsap.killTweensOf('.hero-scroll-btn-icon'); gsap.to('.hero-scroll-btn-icon', { x: 0, duration: 0.3 }) }}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
      >
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-icon-wrap">
          <ArrowRight className="hero-scroll-btn-icon" size={24} />
        </div>
      </div>

      {/* ── Bottom Marquee ── */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-inner">
          {Array(10).fill('CRAFTING SCALABLE WEB APPLICATIONS — INNOVATING DIGITAL EXPERIENCES — ').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

    </section>
  );
}
