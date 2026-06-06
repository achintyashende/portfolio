import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger, Draggable);

const allSkills = [
  'Java', 'JavaScript', 'C++', 'C', 'SQL',
  'React', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap',
  'Spring Boot', 'Node.js', 'Express.js',
  'MongoDB', 'MySQL',
  'AWS', 'Git', 'GitHub', 'Postman', 'VS Code'
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cloudRef = useRef(null);
  const pillsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the background number
      gsap.fromTo(
        '.skills-number',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Randomly scatter and float pills
      pillsRef.current.forEach((pill, i) => {
        if (!pill) return;
        
        // Determine spread based on screen size to prevent mobile overflow
        const isMobile = window.innerWidth < 768;
        const xRange = isMobile ? window.innerWidth * 0.25 : window.innerWidth * 0.4;
        const yRange = isMobile ? window.innerHeight * 0.25 : window.innerHeight * 0.35;

        // Initial scatter
        gsap.set(pill, {
          x: gsap.utils.random(-xRange, xRange),
          y: gsap.utils.random(-yRange, yRange),
          rotation: gsap.utils.random(-25, 25),
          scale: isMobile ? gsap.utils.random(0.7, 1.1) : gsap.utils.random(0.8, 1.3),
        });

        // Entrance animation
        gsap.from(pill, {
          opacity: 0,
          scale: 0,
          duration: 1,
          delay: i * 0.05,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        });

        // Continuous subtle drifting
        gsap.to(pill, {
          x: `+=${gsap.utils.random(-50, 50)}`,
          y: `+=${gsap.utils.random(-50, 50)}`,
          rotation: `+=${gsap.utils.random(-10, 10)}`,
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        // Make draggable
        Draggable.create(pill, {
          type: 'x,y',
          bounds: cloudRef.current,
          inertia: true,
          onPress: function() {
            gsap.to(this.target, { scale: 1.3, zIndex: 100, duration: 0.2 });
          },
          onRelease: function() {
            gsap.to(this.target, { scale: gsap.utils.random(0.9, 1.1), zIndex: 1, duration: 0.2 });
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      
      {/* ── Background Watermark ── */}
      <span className="section-number skills-number" aria-hidden="true">
        02/
      </span>

      <div className="skills-header">
        <h2 className="skills-title">DRAG & DROP SKILLS</h2>
        <p className="skills-subtitle">Interact with the tech stack</p>
      </div>

      {/* ── Draggable Tag Cloud ── */}
      <div className="skills-cloud" ref={cloudRef}>
        {allSkills.map((skill, index) => (
          <div 
            key={skill}
            className="skills-pill"
            ref={el => pillsRef.current[index] = el}
          >
            {skill}
          </div>
        ))}
      </div>

    </section>
  );
};

export default Skills;
