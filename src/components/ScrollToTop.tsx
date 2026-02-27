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
        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center text-t-text hover:text-mc-grass transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
        aria-label="Scroll to top"
        style={{
          background: 'var(--t-surface)',
          border: '2px solid var(--t-border)',
          boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.1), inset -1px -1px 0 rgba(0,0,0,0.25), 2px 2px 0 rgba(0,0,0,0.3)',
        }}
      >
        <ChevronUp className="w-5 h-5" strokeWidth={2.6} />
      </button>
    )
  );
};

export default ScrollToTop;
