'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-teal-500/30 to-cyan-400/20 backdrop-blur-md border border-cyan-300/40 shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_45px_rgba(6,182,212,0.6)] transition-all duration-500 ease-in-out flex items-center justify-center text-cyan-200 hover:text-white hover:scale-110 animate-fadein"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 animate-bounce-slow" strokeWidth={2.6} />
      </button>
    )
  );
};

export default ScrollToTop;
