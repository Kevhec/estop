import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    containerRef.current = el;
    setMounted(true);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  if (!mounted || !containerRef.current) return null;

  return createPortal(children, containerRef.current);
};
