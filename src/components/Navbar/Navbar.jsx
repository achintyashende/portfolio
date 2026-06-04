import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const SCROLL_THRESHOLD = 100;

export default function Navbar({ visible }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const lastScrollY = useRef(0);
  const hasAnimatedIn = useRef(false);

  // ── Smooth scroll helper ────────────────────────
  const scrollTo = useCallback((selector) => {
    if (selector === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(selector);
      if (el) {
        // Check if we are in desktop horizontal scroll mode
        if (window.innerWidth >= 768) {
          const wrapper = document.querySelector('.horizontal-scroll-wrapper');
          if (wrapper) {
            // The vertical scroll required is the element's left offset relative to the wrapper
            // plus the wrapper's top position. 
            // In a simple pinned scenario starting at top:0, it's just el.offsetLeft.
            const targetY = el.offsetLeft;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
            return;
          }
        }
        
        // Fallback for mobile (vertical)
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // ── Handle link click ───────────────────────────
  const handleLinkClick = useCallback((e, href) => {
    e.preventDefault();
    if (mobileOpen) {
      setMobileOpen(false);
    }
    scrollTo(href);
  }, [mobileOpen, scrollTo]);

  // ── Handle logo click ──────────────────────────
  const handleLogoClick = useCallback(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
    scrollTo('#top');
  }, [mobileOpen, scrollTo]);

  // ── Entry animation (on `visible` prop) ─────────
  useEffect(() => {
    if (visible && !hasAnimatedIn.current && navRef.current) {
      hasAnimatedIn.current = true;
      gsap.fromTo(
        navRef.current,
        { y: '-100%' },
        {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            navRef.current?.classList.add('navbar--visible');
          },
        }
      );
    }
  }, [visible]);

  // ── Scroll direction detection ──────────────────
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (mobileOpen) {
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > SCROLL_THRESHOLD) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setNavHidden(true);
        } else {
          // Scrolling up
          setNavHidden(false);
        }
      } else {
        setNavHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  // ── Apply scroll-based hide/show class ──────────
  useEffect(() => {
    if (!navRef.current || !hasAnimatedIn.current) return;

    if (navHidden) {
      navRef.current.classList.add('navbar--hidden');
      navRef.current.classList.remove('navbar--visible');
    } else {
      navRef.current.classList.remove('navbar--hidden');
      navRef.current.classList.add('navbar--visible');
    }
  }, [navHidden]);

  // ── Mobile menu GSAP animation ──────────────────
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const links = mobileLinksRef.current.filter(Boolean);
    if (!menu) return;

    if (mobileOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';

      gsap.to(menu, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.fromTo(
        links,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.15,
        }
      );
    } else {
      document.body.style.overflow = '';

      gsap.to(menu, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });

      gsap.to(links, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        stagger: 0.03,
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <nav id="navbar" ref={navRef} className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        {/* ── Logo ──────────────────────────────── */}
        <span
          className="navbar__logo"
          data-cursor="pointer"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
          aria-label="Scroll to top"
        >
          ACHINTYA
        </span>

        {/* ── Desktop links ─────────────────────── */}
        <ul className="navbar__links">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.label}>
              <a
                id={`nav-link-${item.label.toLowerCase()}`}
                className="navbar__link"
                href={item.href}
                data-cursor="pointer"
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}{index < NAV_ITEMS.length - 1 ? ',' : ''}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Hamburger ─────────────────────────── */}
        <button
          id="navbar-hamburger"
          className={`navbar__hamburger${mobileOpen ? ' navbar__hamburger--active' : ''}`}
          data-cursor="pointer"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>
      </div>

      {/* ── Mobile overlay menu ──────────────── */}
      <div
        ref={mobileMenuRef}
        className={`navbar__mobile-menu${mobileOpen ? ' navbar__mobile-menu--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.label}
            ref={(el) => (mobileLinksRef.current[i] = el)}
            id={`mobile-link-${item.label.toLowerCase()}`}
            className="navbar__mobile-link"
            href={item.href}
            data-cursor="pointer"
            onClick={(e) => handleLinkClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
