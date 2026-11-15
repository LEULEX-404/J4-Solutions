import { useEffect, useRef } from 'react';

export default function useScrollReveal(reducedMotion) {
  const ref = useRef(null);
  useEffect(() => {
    const elements = ref.current?.querySelectorAll('[data-reveal]') || [];
    if (reducedMotion || !window.IntersectionObserver) {
      elements.forEach((element) => element.classList.remove('reveal-pending'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => { element.classList.add('reveal-pending'); observer.observe(element); });
    return () => observer.disconnect();
  }, [reducedMotion]);
  return ref;
}
