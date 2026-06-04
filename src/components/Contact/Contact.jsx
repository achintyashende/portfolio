import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Briefcase, Camera, Mail, ArrowLeft } from 'lucide-react';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const pillRowRef = useRef(null);
  const orbRef = useRef(null);
  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  const platforms = [
    { id: 'github', name: 'Github', prefix: 'github.com/', suffix: '', url: 'https://github.com/achintyashende', Icon: Code },
    { id: 'linkedin', name: 'LinkedIn', prefix: 'linkedin.com/in/', suffix: '', url: 'https://linkedin.com/in/achintyashende', Icon: Briefcase },
    { id: 'instagram', name: 'Instagram', prefix: 'instagram.com/', suffix: '', url: 'https://instagram.com/achintyashende', Icon: Camera },
    { id: 'email', name: 'Email', prefix: '', suffix: '@gmail.com', url: 'mailto:achintyashende@gmail.com', Icon: Mail }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Number
      gsap.fromTo(
        '.contact-number',
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

      // Huge Headline Entrance
      gsap.fromTo(
        headlineRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Pill Buttons Stagger
      if (pillRowRef.current) {
        const pills = pillRowRef.current.querySelectorAll('.contact-pill');
        gsap.fromTo(
          pills,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // Parallax Gradient Orb
      gsap.to(orbRef.current, {
        x: '20vw',
        y: '-10vh',
        scale: 1.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'left right',
          end: 'right left',
          scrub: true,
          horizontal: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      {/* ── Gradient Orb ── */}
      <div className="contact-orb" ref={orbRef}></div>

      {/* ── Background Watermark ── */}
      <span className="section-number contact-number" aria-hidden="true">
        05/
      </span>

      <div className="contact-content">
        <h1 className="contact-headline" ref={headlineRef}>
          Let's have a chat
        </h1>

        {/* ── Creative Social Links ── */}
        <div className="contact-creative-socials">
          
          <div className="contact-wireframes-row">
            {platforms.map(p => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact-wireframe-btn ${hoveredPlatform === p.id ? 'active' : ''}`}
                onMouseEnter={() => setHoveredPlatform(p.id)}
                onMouseLeave={() => setHoveredPlatform(null)}
              >
                <p.Icon size={16} />
                {p.name}
              </a>
            ))}
          </div>

          <div className="contact-social-dynamic-centered">
            <span className="contact-dynamic-prefix">
              {hoveredPlatform ? platforms.find(p=>p.id===hoveredPlatform).prefix : ''}
            </span>
            <span className={`contact-dynamic-core ${hoveredPlatform ? 'text-gradient' : ''}`}>
              achintyashende
            </span>
            <span className="contact-dynamic-suffix">
              {hoveredPlatform ? platforms.find(p=>p.id===hoveredPlatform).suffix : ''}
            </span>
          </div>

        </div>

        <div className="contact-pill-row" ref={pillRowRef}>
          <a href="tel:+917350045035" className="contact-pill">
            +91-7350045035
          </a>
          <a 
            href="#" 
            className="contact-pill contact-pill--back"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
          >
            <ArrowLeft size={18} />
            Back
          </a>
        </div>
      </div>

      <div className="contact-footer">
        <p>&copy; {new Date().getFullYear()} Achintya Shende. All rights reserved.</p>
        <p>Built with React & GSAP.</p>
      </div>
    </section>
  );
};

export default Contact;
