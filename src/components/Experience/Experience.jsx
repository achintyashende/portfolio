import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Briefcase } from 'lucide-react';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 'deloitte',
    company: 'DELOITTE USI',
    role: 'Software Engineer',
    duration: 'Feb 2026 - Present',
    description: 'Building scalable full-stack applications with Java and modern frontend frameworks.',
    theme: 'orange'
  },
  {
    id: 'ltimindtree',
    company: 'LTIMINDTREE',
    role: 'Graduate Engineer Trainee',
    duration: 'Nov 2025 - Jan 2026',
    description: 'Trained in SAP domain and enterprise software development methodologies.',
    theme: 'gold'
  },
  {
    id: 'zasmlabs',
    company: 'ZASMLABS',
    role: 'Full Stack Intern',
    duration: 'Jan 2024 - Jun 2024',
    description: 'Developed responsive web interfaces and integrated backend APIs.',
    theme: 'orange'
  }
];

const Experience = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      gsap.fromTo(
        '.experience-number',
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

      // Cards staggered entrance
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <span className="section-number experience-number" aria-hidden="true">
        04/
      </span>

      <div className="experience__label">
        <span className="experience__label-number">04</span>
        <span className="experience__label-text">Experience</span>
        <span className="experience__label-line" />
      </div>

      <div className="experience-timeline">
        <div className="experience__grid">
          <div className="experience-track" />
          
          {experiences.map((exp, index) => (
            <div 
              key={exp.id}
              className={`experience-node experience-node--${index % 2 === 0 ? 'top' : 'bottom'}`}
              style={{ gridColumn: index + 1 }}
              data-theme={exp.theme}
            >
              <div className="experience-dot" />
              
              <div 
                className="experience-card"
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <div className="experience-card-header">
                  <h3 className="experience-card-company">{exp.company}</h3>
                  <div className="experience-card-badge">
                    <Calendar size={14} />
                    <span>{exp.duration}</span>
                  </div>
                </div>
                
                <div className="experience-card-role">
                  <Briefcase size={16} />
                  <h4>{exp.role}</h4>
                </div>
                
                <p className="experience-card-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
