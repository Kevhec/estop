import React, { createContext, useContext, useEffect, useRef } from 'react';

type Handler = () => boolean | void;

const EscapeContext = createContext<{
  register: (handler: Handler) => () => void;
} | null>(null);

export const EscapeProvider = ({ children }: { children: React.ReactNode }) => {
  const handlers = useRef<Handler[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const top = handlers.current[handlers.current.length - 1];
        if (top) {
          const handled = top();
          if (handled) {
            e.stopPropagation()
          };
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const register = (handler: Handler) => {
    handlers.current.push(handler);
    return () => {
      handlers.current = handlers.current.filter((h) => h !== handler);
    };
  };

  return (
    <EscapeContext.Provider value={{ register }}>
      {children}
    </EscapeContext.Provider>
  );
};

export const useEscape = (onEscape: Handler, active: boolean) => {
  const ctx = useContext(EscapeContext);
  useEffect(() => {
    if (!ctx || !active) return;
    return ctx.register(onEscape);
  }, [ctx, onEscape, active]);
};