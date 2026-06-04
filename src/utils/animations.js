import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate characters revealing from below (clip-mask style)
 * @param {HTMLElement[]} chars - Array of character elements
 * @param {object} options - Animation options
 */
export function revealChars(chars, options = {}) {
  const {
    duration = 0.8,
    stagger = 0.03,
    ease = 'power3.out',
    delay = 0,
    y = '100%',
    onComplete,
  } = options;

  return gsap.fromTo(
    chars,
    { y, opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration,
      stagger,
      ease,
      delay,
      onComplete,
    }
  );
}

/**
 * Fade in and slide up animation
 * @param {HTMLElement|HTMLElement[]} elements - Elements to animate
 * @param {object} options - Animation options
 */
export function fadeInUp(elements, options = {}) {
  const {
    duration = 0.8,
    stagger = 0.1,
    ease = 'power3.out',
    delay = 0,
    y = 40,
    scrollTrigger,
  } = options;

  const config = {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease,
    delay,
  };

  if (scrollTrigger) {
    config.scrollTrigger = {
      trigger: scrollTrigger.trigger || elements,
      start: scrollTrigger.start || 'top 85%',
      end: scrollTrigger.end || 'bottom 20%',
      toggleActions: scrollTrigger.toggleActions || 'play none none none',
      ...scrollTrigger,
    };
  }

  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    config
  );
}

/**
 * Parallax scroll effect
 * @param {HTMLElement} element - Element to parallax
 * @param {object} options - Parallax options
 */
export function parallax(element, options = {}) {
  const {
    y = -100,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
  } = options;

  return gsap.to(element, {
    y,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
    },
  });
}

/**
 * Counter animation (e.g., for stats)
 * @param {HTMLElement} element - Element to display the count
 * @param {number} endValue - Final number
 * @param {object} options - Counter options
 */
export function animateCounter(element, endValue, options = {}) {
  const {
    duration = 2,
    decimals = 0,
    suffix = '',
    ease = 'power2.out',
    scrollTrigger: scrollTriggerOptions,
  } = options;

  const obj = { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease,
    scrollTrigger: scrollTriggerOptions
      ? {
          trigger: scrollTriggerOptions.trigger || element,
          start: scrollTriggerOptions.start || 'top 80%',
          toggleActions: 'play none none none',
          ...scrollTriggerOptions,
        }
      : undefined,
    onUpdate: () => {
      element.textContent = obj.value.toFixed(decimals) + suffix;
    },
  });
}

/**
 * Stagger reveal for grid items
 * @param {HTMLElement[]} items - Array of elements
 * @param {object} options - Animation options
 */
export function staggerReveal(items, options = {}) {
  const {
    duration = 0.6,
    stagger = 0.05,
    ease = 'power3.out',
    y = 30,
    scrollTrigger: scrollTriggerOptions,
  } = options;

  return gsap.fromTo(
    items,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: scrollTriggerOptions
        ? {
            trigger: scrollTriggerOptions.trigger || items[0]?.parentElement,
            start: scrollTriggerOptions.start || 'top 85%',
            toggleActions: 'play none none none',
            ...scrollTriggerOptions,
          }
        : undefined,
    }
  );
}

/**
 * Draw line animation (for timeline, decorative lines)
 * @param {HTMLElement} element - Line element
 * @param {object} options - Options
 */
export function drawLine(element, options = {}) {
  const {
    duration = 1,
    ease = 'power2.inOut',
    scrollTrigger: scrollTriggerOptions,
  } = options;

  return gsap.fromTo(
    element,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration,
      ease,
      transformOrigin: 'left center',
      scrollTrigger: scrollTriggerOptions
        ? {
            trigger: scrollTriggerOptions.trigger || element,
            start: scrollTriggerOptions.start || 'top 85%',
            toggleActions: 'play none none none',
            ...scrollTriggerOptions,
          }
        : undefined,
    }
  );
}
