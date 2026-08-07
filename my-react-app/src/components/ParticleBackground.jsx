/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = ({ isDarkMode }) => {
  const [themeReady, setThemeReady] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure CSS variables have switched before completely destroying/rebuilding particles
    const timer = setTimeout(() => {
      setThemeReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  // Track the hero section's height (if the current route has one) so particles
  // start exactly where the hero's hand-drawn network SVG fades out, rather than
  // stacking two network effects on top of each other.
  useEffect(() => {
    const measure = () => {
      const hero = document.querySelector('.hero-section');
      setHeroHeight(hero ? hero.getBoundingClientRect().height : 0);
    };

    const attachResizeObserver = () => {
      const hero = document.querySelector('.hero-section');
      resizeObserverRef.current?.disconnect();
      if (hero && 'ResizeObserver' in window) {
        resizeObserverRef.current = new ResizeObserver(measure);
        resizeObserverRef.current.observe(hero);
      }
    };

    measure();
    attachResizeObserver();

    // Re-checks when routes swap the hero section in or out of the DOM
    const mutationObserver = new MutationObserver(() => {
      measure();
      attachResizeObserver();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('resize', measure);

    return () => {
      resizeObserverRef.current?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const particlesInit = useCallback(async (engine) => {
    // This loads the tsparticles package bundle, it's the easiest method for getting everything ready
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  if (!themeReady) return null;

  const maskStyle = heroHeight > 0
    ? `linear-gradient(to bottom, transparent ${heroHeight}px, black ${heroHeight + 80}px)`
    : 'none';

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        WebkitMaskImage: maskStyle,
        maskImage: maskStyle,
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false, zIndex: -1 },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              grab: {
                 distance: 140,
                 links: {
                   opacity: isDarkMode ? 0.5 : 0.8
                 }
              }
            },
          },
          particles: {
            color: {
              value: isDarkMode ? "#3498db" : "#2980b9",
            },
            links: {
              color: isDarkMode ? "#3498db" : "#2980b9",
              distance: 150,
              enable: true,
              opacity: isDarkMode ? 0.2 : 0.4,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: isDarkMode ? 0.3 : 0.6,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default ParticleBackground;