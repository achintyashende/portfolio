import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './hooks/useGsap';

import CustomCursor from './components/CustomCursor/CustomCursor';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useSmoothScroll();
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop: Horizontal Scroll
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const getScrollAmount = () => {
          let wrapperWidth = wrapper.scrollWidth;
          return -(wrapperWidth - window.innerWidth);
        };

        const tween = gsap.to(wrapper, {
          x: getScrollAmount,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        });

        return () => {
          // Cleanup if needed
        };
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="noise-overlay"></div>
      <CustomCursor />
      <Navbar visible={true} />

      <main className="main-content" ref={containerRef}>
        <div className="horizontal-scroll-wrapper" ref={wrapperRef}>
          <Hero animate={true} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </main>
    </>
  );
}

export default App;
