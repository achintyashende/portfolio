import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    number: '01',
    name: 'KURSEFY',
    theme: 'magenta',
    subtitle: 'Online Learning Platform',
    description:
      'A responsive online learning platform with course enrollment, video playback, and progress tracking.',
    tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    link: 'https://github.com/achintyashende/kursefy',
  },
  {
    number: '02',
    name: 'REALTIME WHITEBOARD',
    theme: 'cyan',
    subtitle: 'Collaborative Drawing Application',
    description:
      'Real-time collaborative whiteboard enabling synchronized drawing across multiple users.',
    tags: ['React.js', 'WebSockets', 'Node.js', 'Bootstrap'],
    link: 'https://realtime-whiteboard-sharing-forntend.onrender.com',
  },
  {
    number: '03',
    name: 'GEEKLEET',
    theme: 'orange',
    subtitle: 'Coding Profile Tracker',
    description:
      'A web application to track coding profiles from LeetCode and GeeksForGeeks. View problem-solving statistics and progress in a single dashboard.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://geekleet.vercel.app/',
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each project card
      cardRefs.current.forEach((card) => {
        if (!card) return;

        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Animate background text
      gsap.fromTo(
        '.projects-number',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <span className="section-number projects-number" aria-hidden="true">
        03/
      </span>

      <div className="projects__label">
        <span className="projects__label-number">03</span>
        <span className="projects__label-text">Projects</span>
        <span className="projects__label-line" />
      </div>

      <div className="projects__list">
        {projectsData.map((project, index) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="projects__card"
            data-cursor="expand"
            data-theme={project.theme}
            id={`project-${project.number}`}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div className="projects__card-inner">
              <span className="projects__card-number">{project.number}</span>

              <div className="projects__card-details">
                <h3 className="projects__card-name">{project.name}</h3>
                <p className="projects__card-subtitle">{project.subtitle}</p>
                <p className="projects__card-description">
                  {project.description}
                </p>
                <div className="projects__card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="projects__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className="projects__card-arrow" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
