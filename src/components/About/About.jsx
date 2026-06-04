import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the huge text
      gsap.fromTo(
        '.about-huge-line',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Entrance for right side info
      gsap.fromTo(
        '.about-stagger',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <span className="section-number about-number" aria-hidden="true">
        01/
      </span>

      <div className="about-container">
        
        {/* ── Left Column: Typography ── */}
        <div className="about-left">
          <div className="about-huge-text">
            <h2 className="about-huge-line">JAVA</h2>
            <h2 className="about-huge-line highlight-accent">FULL STACK</h2>
            <h2 className="about-huge-line">DEVELOPER</h2>
          </div>
        </div>

        {/* ── Right Column: Info ── */}
        <div className="about-right">
          
          <div className="about-profile-img-wrapper about-stagger">
            <img src="/profile.jpg" alt="Achintya Shende" className="about-profile-img" />
          </div>

          <div className="about-snippet about-stagger">
            <span className="about-snippet-icon">✦</span>
            <p className="about-snippet-text">
              Building dynamic, high-performance web applications with modern Java and MERN stacks.
            </p>
          </div>

          <p className="about-bio about-stagger">
            Analytical and driven software developer with hands-on experience in full-stack development. Proficient in Java, the MERN stack and problem-solving, I aim to leverage my technical expertise, innovative mindset, and quick learning ability to contribute to impactful projects at Deloitte while advancing my professional growth.
          </p>

        </div>

      </div>
    </section>
  );
};

export default About;
